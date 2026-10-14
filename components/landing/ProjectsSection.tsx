"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FiArrowUpRight, FiLayers, FiExternalLink, FiCode, FiEye } from "react-icons/fi";
import { projects } from "@/data/projects";
import { GlassCard } from "./GlassCard";

interface ProjectsSectionProps {
  onSelectProject: (project: (typeof projects)[0]) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "Semua Proyek", count: projects.length },
    {
      id: "Web Platform",
      label: "Web Platform",
      count: projects.filter((p) => p.type === "Web Platform").length,
    },
    {
      id: "AI & ML",
      label: "AI & ML",
      count: projects.filter((p) => p.type.includes("AI") || p.type.includes("NLP")).length,
    },
    {
      id: "Data Science",
      label: "Data Science",
      count: projects.filter((p) => p.type === "Data Science").length,
    },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    if (selectedCategory === "Web Platform") return projects.filter((p) => p.type === "Web Platform");
    if (selectedCategory === "AI & ML")
      return projects.filter((p) => p.type.includes("AI") || p.type.includes("NLP"));
    if (selectedCategory === "Data Science") return projects.filter((p) => p.type === "Data Science");
    return projects;
  }, [selectedCategory]);

  const getTechStyle = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes("c#") || t.includes(".net") || t.includes("sql server")) {
      return { bg: "rgba(34, 197, 94, 0.16)", border: "rgba(34, 197, 94, 0.38)", text: "#86efac" };
    }
    if (
      t.includes("golang") ||
      t.includes("echo") ||
      t.includes("redis") ||
      t.includes("docker") ||
      t.includes("nginx") ||
      t.includes("postgres")
    ) {
      return { bg: "rgba(14, 165, 233, 0.16)", border: "rgba(14, 165, 233, 0.38)", text: "#7dd3fc" };
    }
    if (
      t.includes("python") ||
      t.includes("bert") ||
      t.includes("nlp") ||
      t.includes("ml") ||
      t.includes("ai") ||
      t.includes("xgboost") ||
      t.includes("scikit")
    ) {
      return { bg: "rgba(245, 158, 11, 0.16)", border: "rgba(245, 158, 11, 0.38)", text: "#fde047" };
    }
    if (
      t.includes("vue") ||
      t.includes("react") ||
      t.includes("typescript") ||
      t.includes("tailwind") ||
      t.includes("framer")
    ) {
      return { bg: "rgba(168, 85, 247, 0.16)", border: "rgba(168, 85, 247, 0.38)", text: "#d8b4fe" };
    }
    return { bg: "rgba(255, 255, 255, 0.1)", border: "rgba(255, 255, 255, 0.22)", text: "#ffffff" };
  };

  return (
    <section id="projects" style={{ padding: "80px 0 60px 0", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          <div>
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
                <FiCode size={12} />
                PROYEK &amp; REKAYASA SISTEM
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
              Featured Engineering Works
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
              Kumpulan sistem produksi nyata, arsitektur backend enterprise, riset Machine Learning, dan platform berskala nasional.
            </p>
          </div>

          {/* Modern Category Filter Pills */}
          <div
            className="no-scrollbar"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(8, 22, 14, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "5px",
              borderRadius: "9999px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              maxWidth: "100%",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={active ? "liquid-glass-active" : "liquid-glass-inactive"}
                  style={{
                    borderRadius: "9999px",
                    padding: "8px 16px",
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13px",
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    whiteSpace: "nowrap",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>{cat.label}</span>
                  <span
                    style={{
                      background: active
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(255, 255, 255, 0.1)",
                      color: active ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                      fontSize: "10.5px",
                      fontFamily: "var(--font-family-mono)",
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: "9999px",
                    }}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 310px), 1fr))",
            gap: "24px",
          }}
        >
          {filteredProjects.map((p) => {
            const isLive = p.status.toLowerCase() === "live";
            return (
              <div
                key={p.id}
                onClick={() => onSelectProject(p)}
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  background: "rgba(10, 26, 17, 0.76)",
                  backdropFilter: "blur(24px) saturate(140%)",
                  WebkitBackdropFilter: "blur(24px) saturate(140%)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  borderTop: "1.5px solid rgba(255, 255, 255, 0.45)",
                  boxShadow:
                    "0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition:
                    "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease",
                }}
                className="project-card-interactive group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 26px 65px rgba(0, 0, 0, 0.55), 0 0 30px rgba(34, 197, 94, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.45)";
                  e.currentTarget.style.borderColor = "rgba(74, 222, 128, 0.55)";
                  e.currentTarget.style.background = "rgba(12, 32, 21, 0.88)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 18px 45px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.25)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.18)";
                  e.currentTarget.style.background = "rgba(10, 26, 17, 0.76)";
                }}
              >
                {/* Project Image Banner Container */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "230px",
                    overflow: "hidden",
                    background: "#06120b",
                  }}
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    unoptimized
                  />
                  {/* Frosted vignette overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(10, 26, 17, 0.98) 0%, rgba(10, 26, 17, 0.4) 55%, rgba(0,0,0,0.15) 100%)",
                    }}
                  />

                  {/* Top Badges Row */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      right: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    <span
                      style={{
                        background: "rgba(6, 18, 12, 0.82)",
                        backdropFilter: "blur(14px)",
                        WebkitBackdropFilter: "blur(14px)",
                        border: "1px solid rgba(255, 255, 255, 0.22)",
                        color: "#ffffff",
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        padding: "4px 10px",
                        borderRadius: "8px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{p.type}</span>
                      <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>•</span>
                      <span>{p.year}</span>
                    </span>

                    <span
                      style={{
                        background: isLive
                          ? "rgba(34, 197, 94, 0.22)"
                          : "rgba(255, 255, 255, 0.15)",
                        border: isLive
                          ? "1px solid rgba(34, 197, 94, 0.45)"
                          : "1px solid rgba(255, 255, 255, 0.25)",
                        color: isLive ? "#86efac" : "rgba(255, 255, 255, 0.85)",
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10px",
                        fontWeight: 800,
                        padding: "4px 10px",
                        borderRadius: "9999px",
                        letterSpacing: "0.04em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {isLive && (
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "#22c55e",
                            boxShadow: "0 0 8px #22c55e",
                          }}
                        />
                      )}
                      {p.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Quick Preview Hover Indicator (Bottom-Right of Image) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "14px",
                      zIndex: 2,
                      background: "rgba(10, 28, 18, 0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      borderRadius: "9999px",
                      padding: "4px 10px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "#4ade80",
                      fontSize: "11px",
                      fontFamily: "var(--font-family-mono)",
                      fontWeight: 600,
                    }}
                  >
                    <FiEye size={12} />
                    <span>{p.screenshots.length} Screenshots</span>
                  </div>
                </div>

                {/* Project Card Content */}
                <div
                  style={{
                    padding: "24px 26px 26px 26px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Title + Action Arrow */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-family-display)",
                          fontSize: "19px",
                          fontWeight: 700,
                          color: "#ffffff",
                          letterSpacing: "-0.015em",
                          lineHeight: 1.35,
                          margin: 0,
                        }}
                      >
                        {p.title}
                      </h3>
                      <div
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.22)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#4ade80",
                          flexShrink: 0,
                          transition: "all 0.2s ease",
                        }}
                      >
                        <FiArrowUpRight size={17} />
                      </div>
                    </div>

                    {/* Subtitle / Organisation */}
                    {p.subtitle && (
                      <p
                        style={{
                          fontFamily: "var(--font-family-mono)",
                          fontSize: "11.5px",
                          color: "#86efac",
                          fontWeight: 600,
                          margin: "0 0 12px 0",
                          lineHeight: 1.4,
                        }}
                      >
                        {p.subtitle}
                      </p>
                    )}

                    {/* Short Description */}
                    <p
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "13.5px",
                        color: "rgba(255, 255, 255, 0.78)",
                        lineHeight: 1.6,
                        margin: "0 0 20px 0",
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>

                  <div>
                    {/* Color-Coded Tech Pills */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "18px",
                      }}
                    >
                      {p.stack.slice(0, 5).map((tech) => {
                        const style = getTechStyle(tech);
                        return (
                          <span
                            key={tech}
                            style={{
                              fontFamily: "var(--font-family-mono)",
                              fontSize: "10.5px",
                              fontWeight: 600,
                              color: style.text,
                              background: style.bg,
                              border: `1px solid ${style.border}`,
                              padding: "3px 9px",
                              borderRadius: "6px",
                              letterSpacing: "0.01em",
                            }}
                          >
                            {tech}
                          </span>
                        );
                      })}
                      {p.stack.length > 5 && (
                        <span
                          style={{
                            fontFamily: "var(--font-family-mono)",
                            fontSize: "10.5px",
                            fontWeight: 700,
                            color: "#4ade80",
                            background: "rgba(34, 197, 94, 0.16)",
                            border: "1px solid rgba(34, 197, 94, 0.35)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          +{p.stack.length - 5}
                        </span>
                      )}
                    </div>

                    {/* Footer Interactive Action Link */}
                    <div
                      style={{
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-family-body)",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          color: "#4ade80",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Detail Proyek &amp; Arsitektur &rarr;
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-family-mono)",
                          fontSize: "11px",
                          color: "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        ID: #{String(p.id).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
