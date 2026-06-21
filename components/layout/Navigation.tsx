"use client";
import { useEffect, useRef, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Tentang", href: "#tentang" },
    { label: "Karya", href: "#karya" },
    { label: "Keahlian", href: "#keahlian" },
    { label: "Pengalaman", href: "#pengalaman" },
    { label: "Layanan", href: "#layanan" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <a href="#" className="nav-logo" aria-label="Home">
              <div className="nav-logo-mark">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 22 22 22" />
                </svg>
              </div>
              <div>
                <span className="nav-logo-text">E.W.Afriza</span>
                <span className="nav-logo-sub">FULL STACK DEVELOPER</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <ul className="nav-links">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="mailto:ewandaafriza@gmail.com"
              className="nav-cta"
            >
              Hubungi
            </a>

            {/* Mobile Hamburger */}
            <button
              className={`nav-mobile-btn${mobileOpen ? " open" : ""}`}
              aria-label="Menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile-menu${mobileOpen ? " open" : ""}`}>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="nav-link"
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a
          href="mailto:ewandaafriza@gmail.com"
          className="nav-cta"
          style={{ marginTop: "8px", display: "inline-block" }}
          onClick={() => setMobileOpen(false)}
        >
          Hubungi
        </a>
      </div>
    </>
  );
}
