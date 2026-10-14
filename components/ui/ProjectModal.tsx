"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  FiX,
  FiExternalLink,
  FiCheckCircle,
  FiLayers,
  FiCalendar,
  FiCheck,
  FiEye,
  FiTag,
} from "react-icons/fi";

export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  badge?: string;
  desc: string;
  longDesc: string;
  stack: string[];
  img: string;
  screenshots: string[];
  screenshotLabels?: string[];
  url: string;
  github?: string;
  type: string;
  year: string;
  highlights: string[];
  status: "live" | "archived" | "wip";
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const getTechBadgeStyle = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("c#") || t.includes(".net") || t.includes("asp") || t.includes("sql server")) {
    return { bg: "rgba(34, 197, 94, 0.16)", text: "#86efac", border: "rgba(34, 197, 94, 0.38)" };
  }
  if (
    t.includes("golang") ||
    t.includes("echo") ||
    t.includes("redis") ||
    t.includes("docker") ||
    t.includes("nginx") ||
    t.includes("postgres")
  ) {
    return { bg: "rgba(14, 165, 233, 0.16)", text: "#7dd3fc", border: "rgba(14, 165, 233, 0.38)" };
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
    return { bg: "rgba(245, 158, 11, 0.16)", text: "#fde047", border: "rgba(245, 158, 11, 0.38)" };
  }
  if (
    t.includes("vue") ||
    t.includes("react") ||
    t.includes("typescript") ||
    t.includes("tailwind") ||
    t.includes("motion")
  ) {
    return { bg: "rgba(168, 85, 247, 0.16)", text: "#d8b4fe", border: "rgba(168, 85, 247, 0.38)" };
  }
  return { bg: "rgba(255, 255, 255, 0.1)", text: "#ffffff", border: "rgba(255, 255, 255, 0.22)" };
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          className="glass-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <style>{`
            .glass-modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 1100;
              background: rgba(4, 14, 8, 0.76);
              backdrop-filter: blur(28px) saturate(140%);
              -webkit-backdrop-filter: blur(28px) saturate(140%);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }

            .glass-modal-panel {
              width: 100%;
              max-width: 980px;
              max-height: 90vh;
              background: rgba(10, 26, 17, 0.88);
              backdrop-filter: blur(36px) saturate(160%);
              -webkit-backdrop-filter: blur(36px) saturate(160%);
              border: 1px solid rgba(255, 255, 255, 0.25);
              border-top: 1.5px solid rgba(255, 255, 255, 0.55);
              border-radius: 28px;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              box-shadow: 0 35px 100px rgba(0, 0, 0, 0.7),
                          0 0 35px rgba(34, 197, 94, 0.22),
                          inset 0 1px 2px rgba(255, 255, 255, 0.45);
              color: #ffffff;
            }

            .glass-modal-header {
              padding: 16px 24px;
              background: rgba(255, 255, 255, 0.08);
              border-bottom: 1px solid rgba(255, 255, 255, 0.14);
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-shrink: 0;
            }

            .glass-modal-body {
              padding: 28px 32px 36px 32px;
              box-sizing: border-box;
            }

            .glass-scroll {
              overflow-y: auto;
              flex: 1;
            }
            .glass-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .glass-scroll::-webkit-scrollbar-track {
              background: rgba(6, 18, 12, 0.6);
            }
            .glass-scroll::-webkit-scrollbar-thumb {
              background: rgba(34, 197, 94, 0.4);
              border-radius: 9999px;
            }
            .glass-scroll::-webkit-scrollbar-thumb:hover {
              background: rgba(34, 197, 94, 0.7);
            }

            .glass-close-btn {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 7px 16px;
              background: rgba(255, 255, 255, 0.1);
              color: rgba(255, 255, 255, 0.85);
              border: 1px solid rgba(255, 255, 255, 0.25);
              border-radius: 9999px;
              cursor: pointer;
              font-family: var(--font-family-mono);
              font-size: 11.5px;
              font-weight: 700;
              transition: all 0.2s ease;
            }
            .glass-close-btn:hover {
              background: rgba(239, 68, 68, 0.2);
              border-color: rgba(239, 68, 68, 0.5);
              color: #fca5a5;
            }

            .glass-info-card {
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid rgba(255, 255, 255, 0.16);
              border-radius: 18px;
              padding: 20px;
            }

            .glass-section-heading {
              font-family: var(--font-family-mono);
              font-size: 11px;
              font-weight: 700;
              color: #4ade80;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              display: flex;
              align-items: center;
              gap: 6px;
              margin-bottom: 12px;
            }

            .glass-modal-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 32px;
            }
            @media (min-width: 820px) {
              .glass-modal-grid {
                grid-template-columns: 1fr 280px;
              }
            }

            @media (max-width: 640px) {
              .glass-modal-overlay {
                padding: 10px;
              }
              .glass-modal-panel {
                max-height: 94vh;
                border-radius: 20px;
              }
              .glass-modal-body {
                padding: 20px 18px;
              }
            }
          `}</style>

          {/* Modal Panel Container */}
          <motion.div
            className="glass-modal-panel"
            initial={{ opacity: 0, y: 35, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
          >
            {/* Header Bar */}
            <div className="glass-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "rgba(34, 197, 94, 0.2)",
                    border: "1px solid rgba(34, 197, 94, 0.45)",
                    color: "#86efac",
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "10.5px",
                    fontWeight: 700,
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
                      boxShadow: "0 0 6px #22c55e",
                    }}
                  />
                  {project.status.toUpperCase()}
                </span>
                <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>|</span>
                <span
                  style={{
                    fontFamily: "var(--font-family-mono)",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontWeight: 600,
                    fontSize: "11px",
                  }}
                >
                  {project.type} • TAHUN {project.year}
                </span>
              </div>

              {/* Close Button */}
              <button onClick={onClose} aria-label="Tutup" className="glass-close-btn">
                <FiX size={14} />
                <span>TUTUP</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="glass-scroll" data-lenis-prevent>
              {/* Hero Banner Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/8",
                  background: "#08160e",
                  overflow: "hidden",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.14)",
                }}
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10, 26, 17, 0.95) 0%, rgba(10, 26, 17, 0.3) 50%, transparent 100%)",
                  }}
                />
              </div>

              {/* Content Area */}
              <div className="glass-modal-body">
                {/* Title & Subtitle */}
                <div style={{ marginBottom: "26px" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      marginBottom: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        padding: "3px 12px",
                        background: "rgba(34, 197, 94, 0.2)",
                        color: "#4ade80",
                        border: "1px solid rgba(34, 197, 94, 0.4)",
                        borderRadius: "9999px",
                      }}
                    >
                      {project.badge ?? "⭐ FEATURED ENGINEERING"}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        padding: "3px 12px",
                        background: "rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.75)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        borderRadius: "9999px",
                      }}
                    >
                      ID #{String(project.id).padStart(2, "0")}
                    </span>
                  </div>

                  <h2
                    style={{
                      fontFamily: "var(--font-family-display)",
                      fontSize: "clamp(24px, 4vw, 34px)",
                      fontWeight: 800,
                      color: "#ffffff",
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                      margin: "4px 0 6px 0",
                    }}
                  >
                    {project.title}
                  </h2>

                  {project.subtitle && (
                    <p
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "14.5px",
                        color: "#86efac",
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* 2-Column Responsive Bento Grid */}
                <div className="glass-modal-grid">
                  {/* Left Column: Long Description, Highlights, Action Buttons, Visual Screenshots */}
                  <div>
                    {/* Detailed Description */}
                    <div style={{ marginBottom: "26px" }}>
                      <h4 className="glass-section-heading">
                        <FiLayers size={13} />
                        Deskripsi &amp; Arsitektur Proyek
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-family-body)",
                          fontSize: "14px",
                          color: "rgba(255, 255, 255, 0.85)",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {project.longDesc}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div style={{ marginBottom: "28px" }}>
                      <h4 className="glass-section-heading">
                        <FiCheckCircle size={13} />
                        Poin-Poin Pencapaian &amp; Fitur Kunci
                      </h4>
                      <ul
                        style={{
                          listStyle: "none",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "10px",
                              fontFamily: "var(--font-family-body)",
                              fontSize: "13.5px",
                              color: "rgba(255, 255, 255, 0.82)",
                              lineHeight: 1.55,
                            }}
                          >
                            <FiCheck
                              size={15}
                              style={{ color: "#4ade80", flexShrink: 0, marginTop: "3px" }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action CTA Buttons */}
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "36px",
                        flexWrap: "wrap",
                      }}
                    >
                      {project.url && project.url !== "#" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary-green"
                          style={{
                            padding: "10px 24px",
                            fontSize: "13.5px",
                            textDecoration: "none",
                          }}
                        >
                          <FiExternalLink size={15} />
                          <span>Kunjungi Live Platform</span>
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary-glass"
                          style={{
                            padding: "10px 22px",
                            fontSize: "13.5px",
                            textDecoration: "none",
                          }}
                        >
                          <FaGithub size={15} />
                          <span>GitHub Repository</span>
                        </a>
                      )}
                    </div>

                    {/* Screenshots Gallery */}
                    {project.screenshots.length > 0 && (
                      <div>
                        <h4 className="glass-section-heading">
                          <FiEye size={13} />
                          Dokumentasi Visual &amp; Antarmuka ({project.screenshots.length})
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                          {project.screenshots.map((ss, i) => {
                            const label = project.screenshotLabels?.[i];
                            return (
                              <div
                                key={i}
                                style={{
                                  borderRadius: "16px",
                                  overflow: "hidden",
                                  border: "1px solid rgba(255, 255, 255, 0.16)",
                                  background: "rgba(6, 18, 12, 0.8)",
                                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
                                }}
                              >
                                {/* Window Bar */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "10px 16px",
                                    background: "rgba(255, 255, 255, 0.08)",
                                    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                                  }}
                                >
                                  <div style={{ display: "flex", gap: "6px" }}>
                                    <span
                                      style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#ef4444",
                                      }}
                                    />
                                    <span
                                      style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#f59e0b",
                                      }}
                                    />
                                    <span
                                      style={{
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        backgroundColor: "#22c55e",
                                      }}
                                    />
                                  </div>
                                  <span
                                    style={{
                                      fontFamily: "var(--font-family-mono)",
                                      fontSize: "10px",
                                      fontWeight: 600,
                                      color: "rgba(255, 255, 255, 0.6)",
                                    }}
                                  >
                                    {label
                                      ? `SCREENSHOT // ${label.split(" — ")[0].toUpperCase()}`
                                      : `IMAGE_${i + 1}.PNG`}
                                  </span>
                                  <div style={{ width: "30px" }} />
                                </div>

                                {/* Image Body */}
                                <div style={{ position: "relative", width: "100%" }}>
                                  <Image
                                    src={ss}
                                    alt={label ?? `Screenshot ${i + 1}`}
                                    width={900}
                                    height={520}
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      display: "block",
                                    }}
                                    unoptimized
                                  />
                                </div>

                                {label && (
                                  <div
                                    style={{
                                      padding: "10px 16px",
                                      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                                      background: "rgba(10, 26, 17, 0.8)",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "var(--font-family-mono)",
                                        fontSize: "11px",
                                        color: "rgba(255, 255, 255, 0.8)",
                                        lineHeight: 1.5,
                                        display: "block",
                                      }}
                                    >
                                      {label}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Tech Stack & Metadata Cards */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {/* Tech Stack Card */}
                    <div className="glass-info-card">
                      <h5 className="glass-section-heading">
                        <FiTag size={13} />
                        Tech Stack
                      </h5>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {project.stack.map((t) => {
                          const tStyle = getTechBadgeStyle(t);
                          return (
                            <span
                              key={t}
                              style={{
                                fontFamily: "var(--font-family-mono)",
                                fontSize: "10.5px",
                                fontWeight: 600,
                                padding: "4px 9px",
                                borderRadius: "6px",
                                backgroundColor: tStyle.bg,
                                color: tStyle.text,
                                border: `1px solid ${tStyle.border}`,
                              }}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="glass-info-card">
                      <h5 className="glass-section-heading">
                        <FiCalendar size={13} />
                        Info Proyek
                      </h5>
                      {[
                        { label: "Kategori", value: project.type },
                        { label: "Tahun", value: project.year },
                        { label: "Status", value: project.status.toUpperCase() },
                        {
                          label: "Dokumentasi",
                          value: `${project.screenshots.length} Screenshots`,
                        },
                      ].map((item, idx) => (
                        <div
                          key={item.label}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0",
                            borderBottom:
                              idx < 3 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-family-mono)",
                              fontSize: "11px",
                              color: "rgba(255, 255, 255, 0.55)",
                            }}
                          >
                            {item.label}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-family-mono)",
                              fontSize: "12px",
                              fontWeight: 700,
                              color: item.label === "Status" ? "#4ade80" : "#ffffff",
                            }}
                          >
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
