"use client";

import React, { useEffect } from "react";
import { FiDownload, FiX, FiFileText } from "react-icons/fi";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl?: string;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, cvUrl = "/cv_erga.pdf" }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(8px, 2.5vw, 20px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "920px",
          height: "85vh",
          background: "rgba(14, 28, 20, 0.92)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 24px",
            background: "rgba(255, 255, 255, 0.08)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#22c55e",
              }}
            >
              <FiFileText size={16} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-family-display)", fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                Curriculum Vitae — Erga Wanda Afriza
              </div>
              <div style={{ fontFamily: "var(--font-family-mono)", fontSize: "11px", color: "rgba(255, 255, 255, 0.6)" }}>
                Dokumen Resmi • S1 Informatika (IPK 3.23) • IT Developer RDS Group
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <a
              href="/cv_erga.pdf"
              download
              className="btn-primary-green"
              style={{
                padding: "8px 18px",
                fontSize: "12px",
                textDecoration: "none",
              }}
            >
              <FiDownload size={14} />
              <span>Unduh PDF</span>
            </a>

            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              aria-label="Tutup Modal"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>

        {/* Body PDF viewer */}
        <div style={{ flex: 1, background: "#050b07", position: "relative" }}>
          <iframe
            src="/cv_erga.pdf"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Curriculum Vitae Erga Wanda Afriza"
          />
        </div>
      </div>
    </div>
  );
};
