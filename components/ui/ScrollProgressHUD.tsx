"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { SoundFXToggle, playPop } from "./SoundFXToggle";

// Must stay in document order: the scroll loop below keeps the last entry
// whose offsetTop is above the trigger line, so an out-of-order entry wins wrongly.
const SECTIONS = [
  { id: "hero", label: "Beranda" },
  { id: "ledger", label: "Telemetri" },
  { id: "architecture", label: "Arsitektur" },
  { id: "projects", label: "Proyek" },
  { id: "experience", label: "Pengalaman" },
  { id: "skills", label: "Keahlian" },
  { id: "github", label: "GitHub" },
  { id: "workflow", label: "Metodologi" },
  { id: "contact", label: "Kontak" },
];

interface ScrollProgressHUDProps {
  onScrollToTop?: () => void;
  onSectionChange?: (id: string) => void;
}

export const ScrollProgressHUD: React.FC<ScrollProgressHUDProps> = ({
  onScrollToTop,
  onSectionChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y > 140);

      const trigger = y + 280;
      let current = SECTIONS[0];
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= trigger) current = s;
      }
      onSectionChange?.(current.id);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onSectionChange]);

  const handleTop = useCallback(() => {
    playPop();
    if (onScrollToTop) onScrollToTop();
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [onScrollToTop]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="hud"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SoundFXToggle />

          <button type="button" className="icon-btn" onClick={handleTop} aria-label="Kembali ke atas">
            <FiArrowUp size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
