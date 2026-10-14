"use client";

import React from "react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiArrowUp, FiFileText, FiMapPin } from "react-icons/fi";

interface FooterProps {
  onCvClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCvClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        marginTop: "48px",
        borderRadius: "28px 28px 0 0",
        background: "rgba(6, 20, 13, 0.78)",
        backdropFilter: "blur(28px) saturate(140%)",
        WebkitBackdropFilter: "blur(28px) saturate(140%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.22)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
        borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow:
          "0 -15px 50px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 24px 28px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* ── Main Clean Modern Row ────────────────────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {/* Brand Info */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "22px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>ewanda</span>
              <span style={{ color: "#22c55e" }}>.</span>
              <span
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  color: "#86efac",
                  background: "rgba(34, 197, 94, 0.18)",
                  border: "1px solid rgba(34, 197, 94, 0.35)",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  letterSpacing: "0.04em",
                }}
              >
                RDS GROUP
              </span>
            </div>
            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "13.5px",
                color: "rgba(255, 255, 255, 0.72)",
                margin: "6px 0 0 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <span>Erga Wanda Afriza — IT Developer &amp; Software Engineer</span>
              <span style={{ color: "rgba(255, 255, 255, 0.25)" }}>•</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "rgba(255, 255, 255, 0.6)" }}>
                <FiMapPin size={11} style={{ color: "#38bdf8" }} />
                <span>Jakarta &amp; Bekasi, Indonesia</span>
              </span>
            </p>
          </div>

          {/* Social Links & Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* GitHub */}
            <a
              href="https://github.com/ErgaWanda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub @ErgaWanda"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22c55e";
                e.currentTarget.style.color = "#4ade80";
                e.currentTarget.style.background = "rgba(34, 197, 94, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              title="GitHub Profile (@ErgaWanda)"
            >
              <FaGithub size={15} />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6288291067259"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22c55e";
                e.currentTarget.style.color = "#4ade80";
                e.currentTarget.style.background = "rgba(34, 197, 94, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              title="WhatsApp Direct"
            >
              <FaWhatsapp size={15} />
            </a>

            {/* Email */}
            <a
              href="mailto:ewandaafriza@gmail.com"
              aria-label="Kirim Email"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22c55e";
                e.currentTarget.style.color = "#4ade80";
                e.currentTarget.style.background = "rgba(34, 197, 94, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              title="Email Resmi (ewandaafriza@gmail.com)"
            >
              <FiMail size={15} />
            </a>

            {/* CV Modal Trigger */}
            {onCvClick && (
              <button
                onClick={onCvClick}
                style={{
                  background: "rgba(255, 255, 255, 0.09)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  borderRadius: "9999px",
                  padding: "7px 14px",
                  color: "#ffffff",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.09)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.22)";
                }}
              >
                <FiFileText size={12} style={{ color: "#4ade80" }} />
                <span>Lihat CV</span>
              </button>
            )}

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              style={{
                background: "rgba(34, 197, 94, 0.14)",
                border: "1px solid rgba(34, 197, 94, 0.35)",
                borderRadius: "9999px",
                padding: "7px 14px",
                color: "#86efac",
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#22c55e";
                e.currentTarget.style.borderColor = "#22c55e";
                e.currentTarget.style.color = "#041408";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(34, 197, 94, 0.14)";
                e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.35)";
                e.currentTarget.style.color = "#86efac";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FiArrowUp size={12} />
              <span>Atas</span>
            </button>
          </div>
        </div>

        {/* ── Semantic Quick Nav Links Row ────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            paddingTop: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Nav Items */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Proyek", id: "projects" },
              { label: "Pengalaman", id: "experience" },
              { label: "Keahlian", id: "skills" },
              { label: "GitHub", id: "github" },
              { label: "Alur Kerja", id: "workflow" },
              { label: "Kontak", id: "contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "rgba(255, 255, 255, 0.72)",
                  fontFamily: "var(--font-family-body)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4ade80")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.72)")}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Copyright & Info */}
          <div
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.5)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>&copy; {currentYear} Erga Wanda Afriza</span>
            <span>•</span>
            <span>Next.js &amp; React Glassmorphism</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
