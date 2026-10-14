"use client";

import React, { useEffect } from "react";
import { FiX, FiSend, FiMail } from "react-icons/fi";
import { GlassButton } from "./GlassButton";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactForm: { name: string; email: string; subject: string; message: string };
  setContactForm: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; subject: string; message: string }>
  >;
  handleContactSubmit: (e: React.FormEvent) => Promise<void>;
  sending: boolean;
  formStatus: { type: "success" | "activation" | "error"; text: string } | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  contactForm,
  setContactForm,
  handleContactSubmit,
  sending,
  formStatus,
}) => {
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
          maxWidth: "560px",
          background: "rgba(14, 28, 20, 0.94)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.15) inset",
          padding: "clamp(18px, 4vw, 28px)",
          color: "#ffffff",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#22c55e",
              }}
            >
              <FiMail size={18} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "18px",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Let&apos;s Talk / Kirim Pesan
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "11px",
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: 0,
                }}
              >
                Respon Cepat &lt; 12 Jam • ewandaafriza@gmail.com
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            aria-label="Tutup Modal"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "6px",
              }}
            >
              NAMA LENGKAP *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Pratama"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "11px 14px",
                color: "#ffffff",
                fontFamily: "var(--font-family-body)",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "6px",
              }}
            >
              ALAMAT EMAIL *
            </label>
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "11px 14px",
                color: "#ffffff",
                fontFamily: "var(--font-family-body)",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "6px",
              }}
            >
              SUBJEK *
            </label>
            <input
              type="text"
              required
              placeholder="Diskusi Proyek C# .NET / AI"
              value={contactForm.subject}
              onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "11px 14px",
                color: "#ffffff",
                fontFamily: "var(--font-family-body)",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.8)",
                marginBottom: "6px",
              }}
            >
              PESAN DETAIL *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Tuliskan spesifikasi sistem atau pesan yang ingin disampaikan..."
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              style={{
                width: "100%",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                padding: "11px 14px",
                color: "#ffffff",
                fontFamily: "var(--font-family-body)",
                fontSize: "14px",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            disabled={sending}
            icon={<FiSend size={15} />}
            style={{ width: "100%", justifyContent: "center", marginTop: "4px" }}
          >
            {sending ? "Mengirimkan Pesan..." : "Kirim Sekarang"}
          </GlassButton>

          {formStatus && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "8px",
                background: formStatus.type === "success" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
                border: `1px solid ${formStatus.type === "success" ? "#22c55e" : "#ef4444"}`,
                color: formStatus.type === "success" ? "#4ade80" : "#fca5a5",
                fontFamily: "var(--font-family-body)",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {formStatus.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
