"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FiMenu, FiX, FiFileText } from "react-icons/fi";
import { PillNav } from "./PillNav";
import { NavbarProps } from "./types";

export const Navbar: React.FC<NavbarProps> = ({
  navItems,
  activeId,
  onSelectNav,
  onContactClick,
  onCvClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSpyId, setActiveSpyId] = useState(activeId || "features");

  // Track window size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track scroll position for sticky floating state + scroll-spy
  useEffect(() => {
    const sectionMap: Record<string, string> = {
      projects: "features",
      experience: "product",
      skills: "about",
      github: "reviews",
      workflow: "workflow",
      contact: "contact",
    };
    const sectionIds = ["projects", "experience", "skills", "github", "workflow", "contact"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 45);

      // Scroll spy logic
      if (scrollY < 180) {
        setActiveSpyId("features");
        return;
      }

      const scrollTrigger = scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollTrigger) {
          setActiveSpyId(sectionMap[sectionIds[i]] || sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onSelectNav(id);
    setActiveSpyId(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className={`navbar-fixed-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <header className={`iphone-notch-navbar ${isScrolled ? "scrolled" : ""}`}>
        {/* ── Top Center: iPhone Hardware Sensors (Speaker Grill + Front Camera Lens + Activity Pulse) ── */}
        <div className="notch-hardware-bar">
          <div className="notch-camera-dot" title="TrueDepth Camera">
            <span className="notch-camera-glint" />
          </div>
          <div className="notch-speaker-grill" />
          <div className="notch-activity-dot" title="Live System Active">
            <span className="notch-activity-pulse" />
          </div>
        </div>

        {/* ── Main Notch Content Row ────────────────────────────── */}
        <div className="notch-content-row">
          {/* ── Left: Reference Brand "ewanda." + Avatar Photo ────── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "#ffffff",
            }}
            aria-label="Erga Wanda Afriza"
          >
            <div
              style={{
                width: isScrolled ? "30px" : "34px",
                height: isScrolled ? "30px" : "34px",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
                border: "2px solid #22c55e",
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.45)",
                flexShrink: 0,
                transition: "all 0.25s ease",
              }}
            >
              <Image
                src="/images/erga_photo.jpeg"
                alt="Erga Wanda"
                fill
                style={{ objectFit: "cover", objectPosition: "center 22%" }}
                unoptimized
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: isScrolled ? "19px" : "21px",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#ffffff",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                  transition: "all 0.25s ease",
                }}
              >
                ewanda<span style={{ color: "#22c55e" }}>.</span>
              </span>
              <span
                className="nav-rds-badge"
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "9.5px",
                  color: "#86efac",
                  fontWeight: 700,
                  background: "rgba(10, 36, 20, 0.75)",
                  border: "1px solid rgba(74, 222, 128, 0.45)",
                  padding: "2px 7px",
                  borderRadius: "9999px",
                  letterSpacing: "0.02em",
                }}
              >
                RDS Group
              </span>
            </div>
          </a>

          {/* ── Center: Pill-shaped Glass Nav (Desktop) ─────────── */}
          <div
            className="nav-desktop-container"
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PillNav
              navItems={navItems}
              activeId={activeSpyId}
              onSelectNav={handleLinkClick}
            />
          </div>

          {/* ── Right: Action Buttons (Desktop) ─────────────────── */}
          <div
            className="nav-desktop-container"
            style={{
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={onCvClick}
              style={{
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                borderRadius: "9999px",
                padding: isScrolled ? "6px 13px" : "7px 15px",
                color: "#ffffff",
                fontFamily: "var(--font-family-body)",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
              }}
              title="Pratinjau CV"
            >
              <FiFileText size={13} style={{ color: "#4ade80" }} />
              <span>Curriculum Vitae</span>
            </button>

            <button
              onClick={onContactClick}
              className="btn-primary-green"
              style={{
                padding: isScrolled ? "6px 18px" : "7px 22px",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Contact
            </button>
          </div>

          {/* ── Mobile Hamburger Button ─────────────────────────── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-mobile-btn"
            aria-label="Buka Menu"
            style={{
              display: "flex",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.16)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.32)",
              color: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              zIndex: 60,
            }}
          >
            {mobileMenuOpen ? <FiX size={17} /> : <FiMenu size={17} />}
          </button>
        </div>

        {/* ── Mobile Menu Dropdown / Drawer ───────────────────── */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: 0,
              right: 0,
              background: "rgba(8, 24, 15, 0.96)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "20px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
              zIndex: 100,
            }}
          >
            {navItems.map((item) => {
              const active = item.id === activeSpyId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={active ? "liquid-glass-active" : ""}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: active ? undefined : "transparent",
                    color: active ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                    border: active ? undefined : "1px solid transparent",
                    borderRadius: "14px",
                    padding: "12px 16px",
                    fontFamily: "var(--font-family-body)",
                    fontSize: "14.5px",
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.25s ease",
                  }}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#4ade80",
                        boxShadow: "0 0 8px #22c55e",
                      }}
                    />
                  )}
                </button>
              );
            })}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "6px",
                paddingTop: "10px",
                borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <button
                onClick={() => {
                  onContactClick();
                  setMobileMenuOpen(false);
                }}
                className="btn-primary-green"
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "9999px",
                  fontSize: "13.5px",
                }}
              >
                Contact / Hubungi Saya
              </button>

              <button
                onClick={() => {
                  onCvClick();
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "9999px",
                  padding: "11px",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  cursor: "pointer",
                }}
              >
                Curriculum Vitae (PDF)
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
