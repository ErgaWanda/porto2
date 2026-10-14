"use client";

import React from "react";
import { FiServer, FiLayout, FiDatabase, FiCpu, FiCloud, FiCheck } from "react-icons/fi";

export const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      num: "01",
      pillar: "ARCHITECTURE",
      title: "Backend Enterprise",
      level: "PRODUCTION READY",
      desc: "Layanan terdistribusi, arsitektur RESTful API performa tinggi, dan transaksi mission-critical berbasis ACID.",
      gradient: "linear-gradient(135deg, rgba(34, 197, 94, 0.25), rgba(16, 185, 129, 0.1))",
      borderGlow: "rgba(34, 197, 94, 0.45)",
      iconColor: "#4ade80",
      icon: <FiServer size={22} />,
      span: "span 4",
      skills: ["C#", ".NET 8/9", "ASP.NET Core", "Golang (Echo)", "Laravel", "Node.js", "RESTful API", "MVC", "Microservices"],
    },
    {
      num: "02",
      pillar: "INTERFACES",
      title: "Frontend Modern",
      level: "DAILY DRIVER",
      desc: "Antarmuka reaktif fluid, mikro-interaksi presisi 60 FPS, dan pengalaman pengguna modular yang intuitif.",
      gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(147, 51, 234, 0.1))",
      borderGlow: "rgba(168, 85, 247, 0.45)",
      iconColor: "#c084fc",
      icon: <FiLayout size={22} />,
      span: "span 4",
      skills: ["Vue.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion", "Next.js", "Responsive UI"],
    },
    {
      num: "03",
      pillar: "PERSISTENCE",
      title: "Basis Data & Cache",
      level: "PERFORMANCE TUNED",
      desc: "Manajemen data ACID terpercaya, pemodelan relasional, tuning query, dan caching memori performa tinggi.",
      gradient: "linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(6, 182, 212, 0.1))",
      borderGlow: "rgba(14, 165, 233, 0.45)",
      iconColor: "#38bdf8",
      icon: <FiDatabase size={22} />,
      span: "span 4",
      skills: ["PostgreSQL", "SQL Server", "MySQL", "Redis Cache", "Query Tuning", "Database Indexing", "ACID Compliance"],
    },
    {
      num: "04",
      pillar: "INTELLIGENCE",
      title: "AI & Machine Learning",
      level: "ACADEMIC RESEARCH",
      desc: "Riset dan implementasi Natural Language Processing, text mining komparatif, dan transformer neural networks.",
      gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.1))",
      borderGlow: "rgba(245, 158, 11, 0.45)",
      iconColor: "#fbbf24",
      icon: <FiCpu size={22} />,
      span: "span 6",
      skills: ["Python", "BERT Transformer", "Sentiment Analysis", "NLP", "Computer Vision", "CNN", "Random Forest", "Scikit-Learn"],
    },
    {
      num: "05",
      pillar: "INFRASTRUCTURE",
      title: "DevOps & Cloud",
      level: "CONTAINERIZED",
      desc: "Workflow automasi, containerization mandiri via Docker, reverse proxy Nginx, dan arsitektur kode bersih.",
      gradient: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(13, 148, 136, 0.1))",
      borderGlow: "rgba(20, 184, 166, 0.45)",
      iconColor: "#2dd4bf",
      icon: <FiCloud size={22} />,
      span: "span 6",
      skills: ["Docker", "Nginx", "Git / GitHub", "Postman", "Linux VPS", "Clean Architecture", "CI/CD", "Containerization"],
    },
  ];

  return (
    <section id="skills" style={{ padding: "80px 0 60px 0", position: "relative", zIndex: 10 }}>
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
              <FiCpu size={12} />
              KEAHLIAN &amp; SPESIFIKASI TEKNIS
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
            Technical Competencies &amp; Stack
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
            Pilar keahlian teknis terstruktur yang menopang siklus rekayasa sistem enterprise dari core backend hingga antarmuka pengguna.
          </p>
        </div>

        {/* 12-Column Responsive Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: "24px",
          }}
        >
          {skillCategories.map((cat) => (
            <div
              key={cat.num}
              className="skills-card-glass"
              style={{
                borderRadius: "24px",
                background: "rgba(10, 26, 17, 0.76)",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderTop: "1.5px solid rgba(255, 255, 255, 0.42)",
                boxShadow:
                  "0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = cat.borderGlow;
                e.currentTarget.style.boxShadow = `0 24px 60px rgba(0, 0, 0, 0.5), 0 0 25px ${cat.borderGlow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                e.currentTarget.style.boxShadow =
                  "0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)";
              }}
            >
              {/* Top ambient color tint */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "80px",
                  background: cat.gradient,
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Header Icon + Pillar Number & Level Badge */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: "rgba(10, 26, 17, 0.9)",
                      border: `1.5px solid ${cat.borderGlow}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: cat.iconColor,
                      boxShadow: `0 6px 18px rgba(0, 0, 0, 0.35)`,
                    }}
                  >
                    {cat.icon}
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: "rgba(255, 255, 255, 0.55)",
                        display: "block",
                        letterSpacing: "0.06em",
                      }}
                    >
                      // PILLAR {cat.num} • {cat.pillar}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "9.5px",
                        fontWeight: 800,
                        color: cat.iconColor,
                        background: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        marginTop: "4px",
                        display: "inline-block",
                      }}
                    >
                      {cat.level}
                    </span>
                  </div>
                </div>

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
                  {cat.title}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13.5px",
                    color: "rgba(255, 255, 255, 0.78)",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  {cat.desc}
                </p>
              </div>

              {/* Skill Badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "7px",
                  position: "relative",
                  zIndex: 1,
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "11px",
                      color: "#ffffff",
                      background: "rgba(255, 255, 255, 0.09)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontWeight: 600,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {s}
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
