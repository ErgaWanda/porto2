"use client";
import { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";

interface RetroWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  width?: string;
  height?: string;
  soundEnabled?: boolean;
}

// Browser 8-bit sound generator using Web Audio API
export function playChiptune(type: "open" | "close" | "minimize" | "click" | "error") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === "open") {
      // Ascending retro scale
      osc.type = "square";
      osc.frequency.setValueAtTime(261.63, now); // C4
      osc.frequency.setValueAtTime(329.63, now + 0.08); // E4
      osc.frequency.setValueAtTime(392.00, now + 0.16); // G4
      osc.frequency.setValueAtTime(523.25, now + 0.24); // C5
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === "close") {
      // Descending scale
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(392.00, now); // G4
      osc.frequency.setValueAtTime(311.13, now + 0.08); // Eb4
      osc.frequency.setValueAtTime(220.00, now + 0.16); // A3
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === "minimize") {
      // Quick slide down
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === "click") {
      // Tiny pop
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "error") {
      // Low dual warning buzzer
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.setValueAtTime(118, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.error("Audio error:", e);
  }
}

export default function RetroWindow({
  id,
  title,
  isOpen,
  isActive,
  onClose,
  onMinimize,
  onFocus,
  children,
  initialX = 40,
  initialY = 80,
  width = "640px",
  height = "auto",
  soundEnabled = true,
}: RetroWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragControls = useDragControls();

  // Check if screen is mobile size to disable drag & auto-maximize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsMaximized(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Play sound when window opens
  useEffect(() => {
    if (isOpen && soundEnabled) {
      playChiptune("open");
    }
  }, [isOpen, soundEnabled]);

  const handleClose = () => {
    if (soundEnabled) playChiptune("close");
    onClose();
  };

  const handleMinimize = () => {
    if (soundEnabled) playChiptune("minimize");
    onMinimize();
  };

  const handleToggleMaximize = () => {
    if (soundEnabled) playChiptune("click");
    if (!isMobile) {
      setIsMaximized(!isMaximized);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.15 }}
      drag={!isMaximized && !isMobile ? true : false}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{ left: -100, right: 1000, top: 0, bottom: 600 }}
      onPointerDown={onFocus}
      className={`win-border retro-window ${isMaximized ? "maximized" : ""}`}
      style={{
        width: isMaximized ? "100%" : width,
        height: isMaximized ? "100%" : height,
        maxHeight: isMaximized ? "100%" : "80vh",
        left: isMaximized ? 0 : initialX,
        top: isMaximized ? 32 : initialY,
        zIndex: isActive ? 500 : 100,
        position: isMaximized ? "fixed" : "absolute",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title Bar */}
      <div className={`retro-titlebar ${isActive ? "" : "inactive"}`} onPointerDown={(e) => dragControls.start(e)} onDoubleClick={handleToggleMaximize}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
          <span>📂</span>
          <span style={{ textTransform: "uppercase" }}>{title}</span>
        </div>
        <div className="titlebar-controls" onPointerDown={(e) => e.stopPropagation()}>
          <button className="titlebar-btn" onClick={handleMinimize} title="Minimize">
            _
          </button>
          <button className="titlebar-btn" onClick={handleToggleMaximize} title="Maximize" disabled={isMobile}>
            {isMaximized ? "⧉" : "▢"}
          </button>
          <button className="titlebar-btn" onClick={handleClose} title="Close" style={{ fontWeight: "bold", background: "var(--neon-pink)", color: "#fff" }}>
            X
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="retro-menu-bar">
        <span className="retro-menu-item" onClick={() => soundEnabled && playChiptune("click")}>File</span>
        <span className="retro-menu-item" onClick={() => soundEnabled && playChiptune("click")}>Edit</span>
        <span className="retro-menu-item" onClick={() => soundEnabled && playChiptune("click")}>View</span>
        <span className="retro-menu-item" onClick={() => soundEnabled && playChiptune("click")}>Help</span>
      </div>

      {/* Body Area */}
      <div className="retro-window-body scroll-container" style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </div>
    </motion.div>
  );
}
