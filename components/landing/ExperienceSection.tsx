"use client";

import React from "react";
import { FiBriefcase, FiCalendar, FiCheckCircle, FiAward, FiCompass } from "react-icons/fi";
import { GlassCard } from "./GlassCard";

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      id: "rds",
      role: "IT Developer",
      company: "RDS Group (PT Reycom Document Solusi)",
      companyShort: "RDS",
      period: "02 Sep 2026 - Present",
      isCurrent: true,
      badge: "ENTERPRISE TECH STACK",
      location: "Jakarta & Bekasi, Indonesia",
      desc: "Rekayasa backend enterprise berskala besar yang mengelola data transaksi kritis perusahaan mitra dan institusi finansial terkemuka.",
      stack: ["C#", ".NET 9", "ASP.NET Core", "SQL Server", "RESTful API", "Microservices", "Query Optimization"],
      bullets: [
        "Mengembangkan dan mengelola layanan backend skala enterprise berbasis C# dan .NET 9 dengan arsitektur microservices dan efisiensi query tinggi.",
        "Membangun modul integrasi data transaksi mission-critical dengan kepatuhan standar enterprise, ACID transaction, dan audit trail lengkap.",
        "Mengoptimalkan performa API dan database SQL Server, memangkas response time endpoint hingga 40% pada traffic produksi tinggi.",
      ],
    },
    {
      id: "coachpro",
      role: "Full Stack Developer",
      company: "LSP CoachPro Indonesia",
      companyShort: "LSP",
      period: "Des 2025 - Jun 2026",
      isCurrent: false,
      badge: "HIGH-CONCURRENCY PLATFORM",
      location: "Jakarta, Indonesia (Maganghub Kemnaker)",
      desc: "Pengembangan sistem manajemen sertifikasi kompetensi nasional BNSP end-to-end melayani ratusan asesi serentak.",
      stack: ["Golang", "Echo", "PostgreSQL", "Redis", "Docker", "Nginx", "Vue.js", "Leaflet.js"],
      bullets: [
        "Merancang arsitektur backend end-to-end sistem sertifikasi BNSP menggunakan Golang (Echo framework), menangani 310+ peserta asesi terdaftar.",
        "Mengimplementasikan caching layer Redis multi-level yang mereduksi load database PostgreSQL utama hingga 65% saat jam ujian sertifikasi serentak.",
        "Membangun dashboard asesmen interaktif dengan monitoring status real-time untuk 45 asesor bersertifikat nasional.",
      ],
    },
    {
      id: "kemenhan",
      role: "Software Engineer Intern",
      company: "Pusdatin Kemenhan RI",
      companyShort: "KEMENHAN",
      period: "Jun 2024 - Des 2024",
      isCurrent: false,
      badge: "GOVERNMENT DIGITALIZATION",
      location: "Jakarta Pusat, Indonesia",
      desc: "Modernisasi sistem informasi terpadu Kementerian Pertahanan Republik Indonesia dengan arsitektur web modern.",
      stack: ["Laravel", "Vue.js", "MySQL", "Clean Code", "REST API", "Database Normalization"],
      bullets: [
        "Berkontribusi dalam modernisasi modul sistem informasi internal Kementerian Pertahanan RI menggunakan Laravel dan Vue.js.",
        "Merancang skema database relasional MySQL ternormalisasi dan menyusun dokumentasi API komprehensif untuk interoperabilitas tim.",
      ],
    },
    {
      id: "unsada",
      role: "S1 Teknologi Informasi (IPK 3.23 / 4.00)",
      company: "Universitas Darma Persada",
      companyShort: "UNSADA",
      period: "2021 - 2025",
      isCurrent: false,
      badge: "ACADEMIC & RESEARCH MILESTONE",
      location: "Jakarta Timur, Indonesia",
      desc: "Studi sarjana fokus Rekayasa Perangkat Lunak & Kecerdasan Buatan (AI) dengan publikasi penelitian Natural Language Processing.",
      stack: ["Python", "BERT Transformer", "Sentiment Analysis", "NLP", "Machine Learning", "Scikit-Learn", "Flask"],
      bullets: [
        "Menyelesaikan pendidikan Sarjana (S1) dengan IPK 3.23 / 4.00 berfokus pada Rekayasa Perangkat Lunak dan Kecerdasan Buatan.",
        "Riset Skripsi: Aplikasi web analisis sentimen opini publik berbasis Natural Language Processing (NLP) dan transformer model BERT.",
      ],
    },
  ];

  return (
    <section id="experience" style={{ padding: "80px 0 60px 0", position: "relative", zIndex: 10 }}>
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
              <FiBriefcase size={12} />
              REKAM JEJAK &amp; PENGALAMAN KERJA
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
            Career &amp; Engineering Milestones
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
            Perjalanan rekayasa perangkat lunak mulai dari instansi pemerintahan, platform sertifikasi nasional, hingga backend enterprise terdistribusi.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            FEATURED HERO EXPERIENCE CARD: RDS GROUP (ACTIVE ROLE)
        ══════════════════════════════════════════════════════════ */}
        <div
          className="experience-card-featured"
          style={{
            position: "relative",
            borderRadius: "28px",
            background: "linear-gradient(135deg, rgba(14, 38, 25, 0.88) 0%, rgba(8, 24, 16, 0.94) 100%)",
            backdropFilter: "blur(28px) saturate(150%)",
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            border: "1.5px solid rgba(74, 222, 128, 0.55)",
            boxShadow:
              "0 24px 65px rgba(0, 0, 0, 0.55), 0 0 35px rgba(34, 197, 94, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.5)",
            padding: "36px",
            marginBottom: "32px",
            overflow: "hidden",
          }}
        >
          {/* Ambient Glow Blob */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(34, 197, 94, 0.22) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {/* Left: Role, Company & Monogram */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #22c55e, #15803d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontFamily: "var(--font-family-display)",
                  fontSize: "18px",
                  fontWeight: 800,
                  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.45)",
                  flexShrink: 0,
                }}
              >
                RDS
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-family-display)",
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "#ffffff",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    IT Developer
                  </h3>
                  <span
                    style={{
                      background: "rgba(34, 197, 94, 0.22)",
                      border: "1px solid rgba(74, 222, 128, 0.6)",
                      color: "#86efac",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "10.5px",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#22c55e",
                        boxShadow: "0 0 8px #22c55e",
                      }}
                    />
                    SAAT INI / ACTIVE ROLE
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "15px",
                    color: "#4ade80",
                    fontWeight: 700,
                    marginTop: "3px",
                  }}
                >
                  RDS Group (PT Reycom Document Solusi) • Jakarta &amp; Bekasi
                </div>
              </div>
            </div>

            {/* Right: Period & Enterprise Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  color: "#ffffff",
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FiCalendar size={13} style={{ color: "#4ade80" }} />
                02 Sep 2026 - Present
              </span>
            </div>
          </div>

          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.82)",
              lineHeight: 1.6,
              marginBottom: "20px",
              maxWidth: "920px",
            }}
          >
            {experiences[0].desc}
          </p>

          {/* Bullet Points */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: "14px",
              marginBottom: "24px",
            }}
          >
            {experiences[0].bullets.map((b, bIdx) => (
              <div
                key={bIdx}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  padding: "12px 16px",
                  borderRadius: "14px",
                }}
              >
                <FiCheckCircle size={16} style={{ color: "#4ade80", flexShrink: 0, marginTop: "2px" }} />
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13px",
                    color: "rgba(255, 255, 255, 0.85)",
                    lineHeight: 1.55,
                  }}
                >
                  {b}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Stack Footer */}
          <div
            style={{
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "11px",
                color: "#86efac",
                fontWeight: 700,
                marginRight: "4px",
              }}
            >
              CORE STACK:
            </span>
            {experiences[0].stack.map((st) => (
              <span
                key={st}
                style={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "11px",
                  color: "#ffffff",
                  background: "rgba(34, 197, 94, 0.18)",
                  border: "1px solid rgba(34, 197, 94, 0.35)",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                {st}
              </span>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            REMAINING EXPERIENCES GRID (COACHPRO, KEMENHAN, UNSADA)
        ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "24px",
          }}
        >
          {experiences.slice(1).map((exp) => (
            <div
              key={exp.id}
              className="mobile-card-compact"
              style={{
                position: "relative",
                borderRadius: "24px",
                background: "rgba(10, 26, 17, 0.74)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderTop: "1.5px solid rgba(255, 255, 255, 0.4)",
                boxShadow:
                  "0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(74, 222, 128, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
              }}
            >
              <div>
                {/* Header Row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      color: "#86efac",
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "10.5px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {exp.badge}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "11px",
                      color: "rgba(255, 255, 255, 0.65)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FiCalendar size={13} style={{ color: "#4ade80" }} />
                    {exp.period}
                  </span>
                </div>

                {/* Role & Company */}
                <h3
                  style={{
                    fontFamily: "var(--font-family-display)",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.015em",
                    marginBottom: "4px",
                  }}
                >
                  {exp.role}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13.5px",
                    color: "#4ade80",
                    fontWeight: 600,
                    marginBottom: "16px",
                  }}
                >
                  {exp.company}
                </p>

                {/* Bullets */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 20px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {exp.bullets.map((b, bIdx) => (
                    <li
                      key={bIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontFamily: "var(--font-family-body)",
                        fontSize: "13px",
                        color: "rgba(255, 255, 255, 0.8)",
                        lineHeight: 1.55,
                      }}
                    >
                      <FiCheckCircle size={15} style={{ color: "#4ade80", flexShrink: 0, marginTop: "2px" }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Pills */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  paddingTop: "14px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {exp.stack.map((st) => (
                  <span
                    key={st}
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "10.5px",
                      color: "rgba(255, 255, 255, 0.85)",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {st}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
