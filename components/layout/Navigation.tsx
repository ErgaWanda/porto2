"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      <motion.nav 
        className={`nav${scrolled ? " scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <motion.a 
              href="#" 
              className="nav-logo" 
              aria-label="Home"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="nav-logo-mark">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 2 22 22 22" />
                </svg>
              </div>
              <div>
                <span className="nav-logo-text">E.W.Afriza</span>
                <span className="nav-logo-sub">FULL STACK DEVELOPER</span>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <ul className="nav-links">
              {links.map((l, index) => (
                <li 
                  key={l.href} 
                  style={{ position: "relative" }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <a
                    href={l.href}
                    className="nav-link"
                    onClick={() => setMobileOpen(false)}
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    {l.label}
                  </a>
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="navHover"
                      className="nav-hover-pill"
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        borderRadius: "var(--radius-sm)",
                        zIndex: 1,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.a
              href="mailto:ewandaafriza@gmail.com"
              className="nav-cta"
              whileHover={{ scale: 1.05, backgroundColor: "var(--text-bright)", color: "var(--bg)", borderColor: "var(--text-bright)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Hubungi
            </motion.a>

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
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="nav-mobile-menu"
            style={{ display: "flex", zIndex: 99 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="mailto:ewandaafriza@gmail.com"
              className="nav-cta"
              style={{ marginTop: "8px", display: "inline-block" }}
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05 }}
            >
              Hubungi
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
