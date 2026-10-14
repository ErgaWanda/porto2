"use client";

import React, { useState } from "react";
import { FiMail, FiMapPin, FiSend, FiCheck, FiMessageSquare, FiCopy } from "react-icons/fi";
import { FaWhatsapp, FaGithub } from "react-icons/fa";
import { GlassCard } from "./GlassCard";
import { GlassButton } from "./GlassButton";

interface ContactSectionProps {
  contactForm: { name: string; email: string; subject: string; message: string };
  setContactForm: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; subject: string; message: string }>
  >;
  handleContactSubmit: (e: React.FormEvent) => Promise<void>;
  sending: boolean;
  formStatus: { type: "success" | "activation" | "error"; text: string } | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactForm,
  setContactForm,
  handleContactSubmit,
  sending,
  formStatus,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("ewandaafriza@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" style={{ padding: "80px 0 100px 0", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span
              style={{
                background: "rgba(34, 197, 94, 0.18)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                color: "#4ade80",
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                letterSpacing: "0.04em",
              }}
            >
              <FiMessageSquare size={12} />
              PUSAT KOMUNIKASI &amp; DISKUSI
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Let&apos;s Build Something Resilient
          </h2>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "14.5px",
              color: "rgba(255, 255, 255, 0.72)",
              marginTop: "8px",
              marginBottom: 0,
              maxWidth: "600px",
            }}
          >
            Siap untuk berdiskusi mengenai proyek enterprise, arsitektur C# .NET/Golang, konsultasi AI, atau peluang kolaborasi strategis.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "28px",
          }}
        >
          {/* Left: Modern Direct Contact Form */}
          <div
            className="contact-card-glass"
            style={{
              borderRadius: "26px",
              background: "rgba(10, 26, 17, 0.78)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.42)",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
              padding: "36px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "21px",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.015em",
                  margin: 0,
                }}
              >
                Kirim Pesan Langsung
              </h3>
            </div>
            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "13.5px",
                color: "rgba(255, 255, 255, 0.75)",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              Pesan akan otomatis terkirim langsung ke email pribadi saya dan segera saya balas.
            </p>

            <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "rgba(255, 255, 255, 0.8)",
                    marginBottom: "6px",
                    letterSpacing: "0.03em",
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
                    background: "rgba(6, 18, 12, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "14px",
                    padding: "13px 18px",
                    color: "#ffffff",
                    fontFamily: "var(--font-family-body)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#22c55e";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
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
                    letterSpacing: "0.03em",
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
                    background: "rgba(6, 18, 12, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "14px",
                    padding: "13px 18px",
                    color: "#ffffff",
                    fontFamily: "var(--font-family-body)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#22c55e";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
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
                    letterSpacing: "0.03em",
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
                    background: "rgba(6, 18, 12, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "14px",
                    padding: "13px 18px",
                    color: "#ffffff",
                    fontFamily: "var(--font-family-body)",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#22c55e";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
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
                    letterSpacing: "0.03em",
                  }}
                >
                  PESAN DETAIL *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan spesifikasi sistem, pertanyaan arsitektur, atau ide yang ingin dikembangkan..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(6, 18, 12, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "14px",
                    padding: "13px 18px",
                    color: "#ffffff",
                    fontFamily: "var(--font-family-body)",
                    fontSize: "14px",
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#22c55e";
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary-green"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "6px",
                  padding: "14px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  cursor: sending ? "not-allowed" : "pointer",
                  opacity: sending ? 0.7 : 1,
                }}
              >
                <FiSend size={15} />
                <span>{sending ? "Mengirimkan Pesan..." : "Kirim Pesan Sekarang"}</span>
              </button>

              {formStatus && (
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background:
                      formStatus.type === "success"
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(239, 68, 68, 0.2)",
                    border: `1px solid ${
                      formStatus.type === "success" ? "#22c55e" : "#ef4444"
                    }`,
                    color: formStatus.type === "success" ? "#4ade80" : "#fca5a5",
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {formStatus.text}
                </div>
              )}
            </form>
          </div>

          {/* Right: Direct Interactive Channels */}
          <div
            className="contact-card-glass"
            style={{
              borderRadius: "26px",
              background: "rgba(10, 26, 17, 0.78)",
              backdropFilter: "blur(28px) saturate(140%)",
              WebkitBackdropFilter: "blur(28px) saturate(140%)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.42)",
              boxShadow:
                "0 20px 50px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "21px",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.015em",
                  marginBottom: "8px",
                }}
              >
                Saluran Komunikasi Langsung
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "13.5px",
                  color: "rgba(255, 255, 255, 0.75)",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}
              >
                Pilih saluran favorit Anda untuk respon cepat melalui WhatsApp, Email, atau eksplorasi kode di GitHub:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Official Email */}
                <div
                  style={{
                    position: "relative",
                    padding: "16px 20px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease",
                  }}
                  className="group hover:border-emerald-500/50"
                >
                  <a
                    href="mailto:ewandaafriza@gmail.com"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      textDecoration: "none",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "rgba(34, 197, 94, 0.2)",
                        border: "1px solid rgba(34, 197, 94, 0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#4ade80",
                      }}
                    >
                      <FiMail size={19} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-family-mono)",
                          fontSize: "10.5px",
                          color: "#86efac",
                          fontWeight: 700,
                        }}
                      >
                        EMAIL RESMI
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-family-body)",
                          fontSize: "14.5px",
                          fontWeight: 700,
                          color: "#ffffff",
                        }}
                      >
                        ewandaafriza@gmail.com
                      </div>
                    </div>
                  </a>

                  <button
                    onClick={copyEmail}
                    title="Salin Alamat Email"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                      padding: "8px",
                      color: copiedEmail ? "#4ade80" : "#ffffff",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      fontFamily: "var(--font-family-mono)",
                    }}
                  >
                    {copiedEmail ? <FiCheck size={14} /> : <FiCopy size={14} />}
                    <span>{copiedEmail ? "Tersalin" : "Salin"}</span>
                  </button>
                </div>

                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/6288291067259"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "16px 20px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(34, 197, 94, 0.2)",
                      border: "1px solid rgba(34, 197, 94, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#4ade80",
                    }}
                  >
                    <FaWhatsapp size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10.5px",
                        color: "#86efac",
                        fontWeight: 700,
                      }}
                    >
                      WHATSAPP DIRECT
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "14.5px",
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      +62 882 9106 7259
                    </div>
                  </div>
                </a>

                {/* GitHub Profile */}
                <a
                  href="https://github.com/ErgaWanda"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "16px 20px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.12)",
                      border: "1px solid rgba(255, 255, 255, 0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                    }}
                  >
                    <FaGithub size={20} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10.5px",
                        color: "rgba(255, 255, 255, 0.65)",
                        fontWeight: 700,
                      }}
                    >
                      GITHUB PROFILE
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "14.5px",
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      github.com/ErgaWanda
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Availability Pill & Location Card */}
            <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: "14px",
                  background: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid rgba(34, 197, 94, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#22c55e",
                    boxShadow: "0 0 8px #22c55e",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#86efac",
                  }}
                >
                  Tersedia untuk Project Baru &amp; Peluang Engineering
                </span>
              </div>

              <div
                style={{
                  padding: "12px 18px",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <FiMapPin size={16} style={{ color: "#4ade80", flexShrink: 0 }} />
                <div style={{ fontFamily: "var(--font-family-body)", fontSize: "12.5px", color: "rgba(255, 255, 255, 0.85)" }}>
                  Bekasi &amp; Jakarta, Indonesia • On-site &amp; Remote Ready
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
