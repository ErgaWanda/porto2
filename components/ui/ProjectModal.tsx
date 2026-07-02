"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface Project {
  id: number;
  title: string;
  subtitle?: string;
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

  const statusColor =
    project?.status === "live"
      ? "var(--success)"
      : project?.status === "wip"
      ? "var(--primary)"
      : "var(--text-dim)";

  const statusLabel =
    project?.status === "live" ? "Live" : project?.status === "wip" ? "WIP" : "Archived";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <style>{`
            .modal-scroll::-webkit-scrollbar { width: 4px; }
            .modal-scroll::-webkit-scrollbar-track { background: var(--bg); }
            .modal-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
            .modal-tab { font-family: var(--font-display); font-size: 12px; font-weight: 600; padding: 10px 20px; color: var(--text); border: 1px solid transparent; cursor: pointer; background: none; transition: all 0.2s; }
            .modal-tab:hover { color: var(--text-bright); }
            .modal-tab.active { color: var(--primary); border-color: var(--border); background: rgba(99, 102, 241, 0.05); }
            .ss-thumb { cursor: pointer; border: 1px solid var(--border); overflow: hidden; transition: border-color 0.2s; flex-shrink: 0; border-radius: var(--radius-sm); }
            .ss-thumb:hover { border-color: var(--primary); }
            .ss-thumb.selected { border-color: var(--primary); }

            .modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 200;
              background: rgba(3, 3, 3, 0.9);
              backdrop-filter: blur(16px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }
            @media (max-width: 768px) {
              .modal-overlay {
                padding: 12px;
              }
            }

            .modal-panel {
              width: 100%;
              max-width: 1000px;
              max-height: 90vh;
              background: var(--bg-sub);
              border: 1px solid var(--border);
              display: flex;
              flex-direction: column;
              position: relative;
              overflow: hidden;
              border-radius: var(--radius-lg);
            }
            @media (max-width: 768px) {
              .modal-panel {
                max-height: 95vh;
                border-radius: var(--radius-md);
              }
            }

            .modal-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 20px 28px;
              border-bottom: 1px solid var(--border);
              flex-shrink: 0;
            }
            @media (max-width: 768px) {
              .modal-header {
                padding: 16px 20px;
              }
            }

            .modal-hero-banner {
              position: relative;
              width: 100%;
              aspect-ratio: 16/7;
              background: var(--bg);
              overflow: hidden;
            }
            @media (max-width: 768px) {
              .modal-hero-banner {
                aspect-ratio: 16/10;
              }
            }

            .modal-hero-title-overlay {
              position: absolute;
              bottom: 24px;
              left: 28px;
              right: 28px;
              z-index: 2;
            }
            @media (max-width: 768px) {
              .modal-hero-title-overlay {
                bottom: 16px;
                left: 20px;
                right: 20px;
              }
            }

            .modal-body-content {
              padding: 28px 28px 32px;
            }
            @media (max-width: 768px) {
              .modal-body-content {
                padding: 20px 20px 24px;
              }
            }

            .modal-grid {
              display: grid;
              grid-template-columns: 1fr 320px;
              gap: 32px;
            }
            @media (max-width: 768px) {
              .modal-grid {
                grid-template-columns: 1fr;
                gap: 24px;
              }
            }
          `}</style>

          {/* Modal Panel */}
          <motion.div 
            className="modal-panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
          >
            {/* Header */}
            <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, background: statusColor, borderRadius: "50%" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", color: statusColor, textTransform: "uppercase" }}>
                {statusLabel}
              </span>
            </div>
            <div style={{ width: 1, height: 16, background: "var(--border)" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {project.type} • {project.year}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Tutup"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "rgba(255, 255, 255, 0.02)",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: 14,
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-bright)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text-bright)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.05)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.02)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div className="modal-scroll" style={{ overflowY: "auto", flex: 1 }}>
          {/* Hero image */}
          <div className="modal-hero-banner">
            <Image
              src={project.img}
              alt={project.title}
              fill
              style={{ objectFit: "cover", filter: "saturate(0.8) brightness(0.7)" }}
              unoptimized
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, var(--bg-sub) 100%)",
              zIndex: 1,
            }} />

            {/* Title overlay */}
            <div className="modal-hero-title-overlay">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--primary)", letterSpacing: "0.05em", marginBottom: 8, textTransform: "uppercase" }}>
                Proyek {String(project.id).padStart(2, "0")}
              </div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                color: "var(--text-bright)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}>
                {project.title}
              </h2>
              {project.subtitle && (
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text)", marginTop: 6 }}>
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Content area */}
          <div className="modal-body-content">

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              {project.url && project.url !== "#" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "4px" }}>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                  Kunjungi Live
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ textDecoration: "none" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "4px" }}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                  GitHub Repo
                </a>
              )}
            </div>

            {/* Two-column layout */}
            <div className="modal-grid">

              {/* Left: Description + Screenshots */}
              <div>
                {/* Overview */}
                <div style={{ marginBottom: 32 }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--text-bright)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
                    Deskripsi Proyek
                  </h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.8, color: "var(--text)" }}>
                    {project.longDesc}
                  </p>
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: 32 }}>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--text-bright)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
                    Fitur Utama
                  </h4>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: 14,
                          color: "var(--text)",
                          paddingLeft: 18,
                          position: "relative",
                          lineHeight: 1.6,
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "var(--primary)" }}>•</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Screenshots */}
                {project.screenshots.length > 0 && (
                  <div>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--text-bright)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>
                      Screenshot Tampilan ({project.screenshots.length})
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {project.screenshots.map((ss, i) => {
                        const label = project.screenshotLabels?.[i];
                        return (
                          <div key={i} style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border)" }}>
                            {/* Image */}
                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                overflow: "hidden",
                                background: "var(--bg)",
                              }}
                            >
                              {/* Index badge */}
                              <div style={{
                                position: "absolute",
                                top: 12, left: 12,
                                padding: "4px 10px",
                                background: "rgba(5, 5, 5, 0.8)",
                                fontFamily: "var(--font-mono)",
                                fontSize: 10,
                                color: "var(--text-bright)",
                                zIndex: 1,
                                backdropFilter: "blur(4px)",
                                borderRadius: "4px",
                                border: "1px solid var(--border)",
                              }}>
                                SS {String(i + 1).padStart(2, "0")}
                              </div>
                              <Image
                                src={ss}
                                alt={label ?? `Screenshot ${i + 1} — ${project.title}`}
                                width={700}
                                height={400}
                                style={{ width: "100%", height: "auto", display: "block" }}
                                unoptimized
                              />
                            </div>
                            {/* Caption */}
                            {label && (
                              <div style={{
                                padding: "12px 16px",
                                background: "var(--bg-sub)",
                                borderTop: "1px solid var(--border)",
                              }}>
                                <span style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: 13,
                                  color: "var(--text)",
                                  lineHeight: 1.5,
                                }}>
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

              {/* Right: Meta */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Tech Stack */}
                <div style={{
                  padding: "20px",
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                }}>
                  <h5 style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text-bright)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 14 }}>
                    Tech Stack
                  </h5>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          padding: "4px 10px",
                          background: "var(--bg)",
                          border: "1px solid var(--border)",
                          color: "var(--text)",
                          borderRadius: "4px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Info */}
                <div style={{
                  padding: "20px",
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                }}>
                  <h5 style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "var(--text-bright)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 14 }}>
                    Informasi
                  </h5>
                  {[
                    { label: "Kategori", value: project.type },
                    { label: "Tahun", value: project.year },
                    { label: "Status", value: statusLabel },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: 10,
                        marginBottom: 10,
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-dim)" }}>
                        {item.label}
                      </span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--text-bright)", textTransform: "uppercase" }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Live link large */}
                {project.url && project.url !== "#" && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 20px",
                      background: "var(--primary)",
                      border: "1px solid var(--primary)",
                      textDecoration: "none",
                      transition: "all 0.25s",
                      borderRadius: "var(--radius-md)",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--primary)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Kunjungi Live Website
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "var(--text-bright)" }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                )}
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
