"use client";
import { useState, useEffect } from "react";

export default function Taskbar() {
  const [time, setTime] = useState("");
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const date = new Date();
      let hours = String(date.getHours()).padStart(2, "0");
      let minutes = String(date.getMinutes()).padStart(2, "0");
      let seconds = String(date.getSeconds()).padStart(2, "0");
      setTime(`${hours}:${minutes}:${seconds}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setStartMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Listen to clicks outside to close start menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".retro-taskbar")) {
        setStartMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="retro-taskbar">
      <button className="start-btn" onClick={() => setStartMenuOpen(!startMenuOpen)} aria-label="Menu Mulai">
        <span className="start-icon">🍊</span>
        START
      </button>

      {startMenuOpen && (
        <div className="start-menu">
          <div className="start-menu-sidebar">
            <span>ERGA.OS v2.6</span>
          </div>
          <div className="start-menu-items">
            <button onClick={() => scrollToSection("beranda")} className="start-menu-item">
              <span>🏠</span> BERANDA.EXE
            </button>
            <button onClick={() => scrollToSection("tentang")} className="start-menu-item">
              <span>👤</span> TENTANG.SYS
            </button>
            <button onClick={() => scrollToSection("karya")} className="start-menu-item">
              <span>💻</span> KARYA.DLL
            </button>
            <button onClick={() => scrollToSection("keahlian")} className="start-menu-item">
              <span>🛠️</span> SKILLS.SYS
            </button>
            <button onClick={() => scrollToSection("pengalaman")} className="start-menu-item">
              <span>💼</span> EXPERIENCE.CFG
            </button>
            <button onClick={() => scrollToSection("pendidikan")} className="start-menu-item">
              <span>🎓</span> EDUCATION.DAT
            </button>
            <button onClick={() => scrollToSection("layanan")} className="start-menu-item">
              <span>⚙️</span> SERVICES.INI
            </button>
            <button onClick={() => scrollToSection("kontak")} className="start-menu-item">
              <span>✉️</span> CONTACT.BAT
            </button>
          </div>
        </div>
      )}

      {/* Task buttons for large screens */}
      <div className="taskbar-tasks">
        <button onClick={() => scrollToSection("beranda")} className="task-tab">🏠 BERANDA</button>
        <button onClick={() => scrollToSection("tentang")} className="task-tab">👤 TENTANG</button>
        <button onClick={() => scrollToSection("karya")} className="task-tab">💻 KARYA</button>
        <button onClick={() => scrollToSection("keahlian")} className="task-tab">🛠️ KEAHLIAN</button>
        <button onClick={() => scrollToSection("kontak")} className="task-tab">✉️ KONTAK</button>
      </div>

      <div className="taskbar-clock">
        <span className="clock-icon">⏰</span>
        {time}
      </div>
    </div>
  );
}
