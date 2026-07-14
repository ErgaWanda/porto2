"use client";
import { useEffect, useState } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export default function Taskbar() {
  const [activeSection, setActiveSection] = useState("beranda");

  const navItems: NavItem[] = [
    { id: "beranda", label: "Profil", icon: "👤" },
    { id: "karya", label: "Karya", icon: "💻" },
    { id: "keahlian", label: "Skills", icon: "🛠️" },
    { id: "pengalaman", label: "Karir", icon: "💼" },
    { id: "ulasan", label: "Review", icon: "💬" },
    { id: "kontak", label: "Kontak", icon: "✉️" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Offset scroll by header height (60px)
      const yOffset = -60; 
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <header className="swiss-header">
      {/* Brand logo area */}
      <div className="swiss-header-brand" style={{ cursor: "pointer" }} onClick={() => handleClick("beranda")}>
        ERGA WANDA AFRIZA
      </div>

      {/* Navigation items */}
      <nav className="swiss-header-nav">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`swiss-nav-item ${isActive ? "active" : ""}`}
            >
              <span style={{ fontSize: "14px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Social Link: GitHub */}
        <a
          href="https://github.com/ErgaWanda"
          target="_blank"
          rel="noopener noreferrer"
          className="swiss-nav-item"
          aria-label="GitHub"
        >
          <FiGithub style={{ fontSize: "15px" }} />
          <span className="hide-mobile-social">GitHub</span>
        </a>

        {/* Social Link: LinkedIn */}
        <a
          href="https://linkedin.com/in/erga-wanda-afriza"
          target="_blank"
          rel="noopener noreferrer"
          className="swiss-nav-item"
          aria-label="LinkedIn"
        >
          <FiLinkedin style={{ fontSize: "15px" }} />
          <span className="hide-mobile-social">LinkedIn</span>
        </a>

        {/* Social Link: WhatsApp */}
        <a
          href="https://wa.me/6288291067259"
          target="_blank"
          rel="noopener noreferrer"
          className="swiss-nav-item"
          aria-label="WhatsApp"
        >
          <FaWhatsapp style={{ fontSize: "15px", color: "#25D366" }} />
          <span className="hide-mobile-social">WhatsApp</span>
        </a>
      </nav>

      <style>{`
        @media (max-width: 990px) {
          .hide-mobile-social {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
