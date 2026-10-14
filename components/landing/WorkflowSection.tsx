"use client";

import React from "react";
import { FiCheck, FiCompass, FiCode, FiLayers, FiSend, FiCpu, FiGitBranch } from "react-icons/fi";
import { GlassCard } from "./GlassCard";

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Discover",
      badge: "SCOPING TAHAP AWAL",
      desc: "Memahami tujuan bisnis, kebutuhan pengguna, dan dekonstruksi sistem secara komprehensif sebelum coding.",
      deliverable: "PRD & Analisis Kebutuhan",
      icon: <FiCompass size={20} style={{ color: "#4ade80" }} />,
    },
    {
      num: "02",
      title: "Ideate",
      badge: "BLUEPRINT ARSITEKTUR",
      desc: "Merancang arsitektur sistem, skema database relasional ACID, dan spesifikasi API berkinerja tinggi.",
      deliverable: "ERD & API Contract Spec",
      icon: <FiLayers size={20} style={{ color: "#4ade80" }} />,
    },
    {
      num: "03",
      title: "Design",
      badge: "UI/UX DESIGN",
      desc: "Mendesain antarmuka responsif dengan mikro-interaksi presisi yang nyaman bagi pengguna di setiap layar.",
      deliverable: "Komponen Reaktif & UX Flow",
      icon: <FiCpu size={20} style={{ color: "#4ade80" }} />,
    },
    {
      num: "04",
      title: "Develop",
      badge: "ENTERPRISE STACK",
      desc: "Membangun sistem backend enterprise dengan C# .NET / Golang, clean architecture, dan caching Redis.",
      deliverable: "Clean Architecture & Tests",
      icon: <FiCode size={20} style={{ color: "#4ade80" }} />,
    },
    {
      num: "05",
      title: "Deliver",
      badge: "SIAP PRODUKSI",
      desc: "Deployment containerized via Docker dan Nginx, pengujian menyeluruh, dan monitoring performa aktif.",
      deliverable: "Dockerized & Live Production",
      icon: <FiSend size={20} style={{ color: "#4ade80" }} />,
    },
  ];

  return (
    <section id="workflow" style={{ padding: "80px 0 60px 0", position: "relative", zIndex: 10 }}>
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
              <FiGitBranch size={12} />
              METODOLOGI &amp; ALUR KERJA
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
            Engineering Workflow &amp; Delivery
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
            Standar metodologi berorientasi hasil yang menjamin keandalan arsitektur, kepatuhan jadwal, dan kemudahan skalabilitas kode.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="workflow-card-glass"
              style={{
                borderRadius: "22px",
                background: "rgba(10, 26, 17, 0.76)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderTop: "1.5px solid rgba(255, 255, 255, 0.4)",
                boxShadow:
                  "0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                padding: "26px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "14px",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "rgba(74, 222, 128, 0.5)";
                e.currentTarget.style.boxShadow =
                  "0 24px 60px rgba(0, 0, 0, 0.5), 0 0 25px rgba(34, 197, 94, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.boxShadow =
                  "0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)";
              }}
            >
              <div>
                {/* Step Top Bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "26px",
                      fontWeight: 800,
                      color: "#4ade80",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {step.num}
                  </span>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "12px",
                      background: "rgba(34, 197, 94, 0.16)",
                      border: "1px solid rgba(34, 197, 94, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "9.5px",
                    fontWeight: 700,
                    color: "rgba(255, 255, 255, 0.6)",
                    display: "block",
                    marginBottom: "6px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {step.badge}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-family-display)",
                    fontSize: "19px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.015em",
                    marginBottom: "8px",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.76)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Output Deliverable Tag */}
              <div
                style={{
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FiCheck size={13} style={{ color: "#4ade80", flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "10.5px",
                    color: "#86efac",
                    fontWeight: 600,
                  }}
                >
                  {step.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════
            ENGINEERING PHILOSOPHY QUOTE CARD
        ══════════════════════════════════════════════════════════ */}
        <div
          className="workflow-card-glass"
          style={{
            position: "relative",
            borderRadius: "26px",
            background: "linear-gradient(135deg, rgba(14, 34, 22, 0.88) 0%, rgba(8, 22, 14, 0.94) 100%)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            border: "1px solid rgba(255, 255, 255, 0.22)",
            borderTop: "1.5px solid rgba(255, 255, 255, 0.45)",
            boxShadow:
              "0 22px 60px rgba(0, 0, 0, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
            padding: "36px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
            overflow: "hidden",
          }}
        >
          {/* Ambient Quotation Mark Decor */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "40px",
              fontFamily: "serif",
              fontSize: "140px",
              lineHeight: 1,
              color: "rgba(34, 197, 94, 0.08)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            &rdquo;
          </div>

          <div style={{ maxWidth: "820px", position: "relative", zIndex: 1 }}>
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#4ade80",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "10px",
                letterSpacing: "0.04em",
              }}
            >
              PRINSIP &amp; FILOSOFI REKAYASA SISTEM
            </span>
            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "16px",
                color: "#ffffff",
                lineHeight: 1.65,
                margin: 0,
                fontStyle: "italic",
              }}
            >
              &ldquo;Kode yang baik bukan sekadar berjalan tanpa bug, melainkan arsitektur yang mudah dipahami,
              tahan terhadap lonjakan traffic, serta adaptif terhadap evolusi bisnis masa depan.&rdquo;
            </p>
          </div>

          {/* Author Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "10px 18px",
              borderRadius: "9999px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-family-display)",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                Erga Wanda Afriza
              </div>
              <div
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "10.5px",
                  color: "#86efac",
                }}
              >
                IT Developer @ RDS Group
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
