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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          ref={overlayRef}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          className="brutal-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <style>{`
            .brutal-modal-overlay {
              position: fixed;
              inset: 0;
              z-index: 1000;
              background: rgba(0, 0, 0, 0.85);
              backdrop-filter: blur(4px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }
            
            .brutal-modal-panel {
              width: 100%;
              max-width: 960px;
              max-height: 85vh;
              background-color: var(--bg-card);
              border: 1px solid var(--border-color);
              display: flex;
              flex-direction: column;
              overflow: hidden;
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
            }
            
            .brutal-modal-header {
              padding: 16px 24px;
              border-bottom: 1px solid var(--border-color);
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: var(--bg-card);
            }
            
            .brutal-modal-body {
              padding: 28px;
              box-sizing: border-box;
            }
            
            .brutal-scroll::-webkit-scrollbar {
              width: 6px;
            }
            .brutal-scroll::-webkit-scrollbar-track {
              background: var(--bg-dark);
            }
            .brutal-scroll::-webkit-scrollbar-thumb {
              background: var(--border-color);
              border-radius: 3px;
            }
            .brutal-scroll::-webkit-scrollbar-thumb:hover {
              background: var(--accent-red);
            }
            
            .brutal-tag {
              font-family: var(--font-mono);
              font-size: 10px;
              font-weight: 500;
              padding: 4px 10px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid var(--border-color);
              color: var(--text-primary);
              text-transform: uppercase;
              border-radius: 4px;
            }

            .brutal-info-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 8px;
              margin-bottom: 8px;
              border-bottom: 1px solid var(--border-color);
            }
            
            .modal-grid-layout {
              display: grid;
              grid-template-columns: 1fr;
              gap: 32px;
            }
            
            @media (min-width: 768px) {
              .modal-grid-layout {
                grid-template-columns: 1fr 280px;
              }
            }
          `}</style>

          {/* Modal Panel */}
          <motion.div 
            className="brutal-modal-panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
             {/* Header */}
            <div className="brutal-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="swiss-label-mono" style={{ color: "var(--accent-red)", fontWeight: "bold" }}>
                  STATUS // {project.status.toUpperCase()}
                </span>
                <div style={{ width: 1, height: 16, background: "var(--border-color)" }} />
                <span className="swiss-label-mono" style={{ color: "var(--text-secondary)", fontWeight: "bold" }}>
                  {project.type} // {project.year}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Tutup"
                style={{
                  width: 32,
                  height: 32,
                  border: "1px solid var(--border-color)",
                  background: "transparent",
                  color: "var(--text-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.backgroundColor = "var(--accent-red)";
                  e.currentTarget.style.borderColor = "var(--accent-red)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "var(--border-color)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="brutal-scroll" data-lenis-prevent style={{ overflowY: "auto", flex: 1, backgroundColor: "var(--bg-dark)" }}>
              
              {/* Hero Banner image */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", background: "#000", overflow: "hidden", borderBottom: "1px solid var(--border-color)" }}>
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover", opacity: 0.85 }}
                  unoptimized
                />
              </div>

              {/* Content Area */}
              <div className="brutal-modal-body">
                
                {/* Title and subtitle */}
                <div style={{ marginBottom: 28 }}>
                  <span className="swiss-label-mono" style={{ color: "var(--accent-red)" }}>PROJECT ARCHIVE</span>
                  <h2 style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    marginTop: 4,
                  }}>
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-secondary)", marginTop: 6, fontWeight: 500 }}>
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* Grid info */}
                <div className="modal-grid-layout">
                  
                  {/* Left: Desc + Highlights */}
                  <div>
                    {/* Desc */}
                    <div style={{ marginBottom: 30 }}>
                      <h4 className="swiss-label-mono" style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
                        Deskripsi Proyek
                      </h4>
                      <p className="swiss-text" style={{ fontSize: "14px", color: "var(--text-secondary)", textAlign: "justify", lineHeight: 1.6 }}>
                        {project.longDesc}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div style={{ marginBottom: 30 }}>
                      <h4 className="swiss-label-mono" style={{ color: "var(--text-secondary)", marginBottom: 10 }}>
                        Poin-Poin Utama
                      </h4>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0 }}>
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 14,
                              color: "var(--text-primary)",
                              paddingLeft: 18,
                              position: "relative",
                              lineHeight: 1.5,
                            }}
                          >
                            <span style={{ position: "absolute", left: 0, color: "var(--accent-red)" }}>✦</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
                      {project.url && project.url !== "#" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ textDecoration: "none" }}
                        >
                          Kunjungi Live
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline"
                          style={{ textDecoration: "none" }}
                        >
                          GitHub Repo
                        </a>
                      )}
                    </div>

                    {/* Screenshots */}
                    {project.screenshots.length > 0 && (
                      <div>
                        <h4 className="swiss-label-mono" style={{ color: "var(--text-secondary)", marginBottom: 12 }}>
                          Dokumentasi Visual ({project.screenshots.length})
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                          {project.screenshots.map((ss, i) => {
                            const label = project.screenshotLabels?.[i];
                            return (
                              <div key={i} style={{ border: "1px solid var(--border-color)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-card)", marginBottom: "8px" }}>
                                {/* Window Title Bar */}
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "10px 14px",
                                  backgroundColor: "var(--bg-dark)",
                                  borderBottom: "1px solid var(--border-color)"
                                }}>
                                  <div style={{ display: "flex", gap: "6px" }}>
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#eab308" }} />
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                                  </div>
                                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "500", color: "var(--text-muted)" }}>
                                    {label ? `IMG_VIEWER // ${label.split(" — ")[0].toUpperCase()}` : `IMAGE_${i+1}.PNG`}
                                  </span>
                                  <div style={{ width: "42px" }} />
                                </div>
                                
                                {/* Image Body */}
                                <div style={{ position: "relative", width: "100%" }}>
                                  <Image
                                    src={ss}
                                    alt={label ?? `Screenshot ${i + 1}`}
                                    width={800}
                                    height={480}
                                    style={{
                                      width: "100%",
                                      height: "auto",
                                      display: "block",
                                      transition: "opacity 0.3s"
                                    }}
                                    unoptimized
                                  />
                                </div>

                                {label && (
                                  <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)" }}>
                                    <span className="swiss-label-mono" style={{ fontSize: 10, color: "var(--text-secondary)" }}>
                                      {label.toUpperCase()}
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

                  {/* Right Column: Meta + Tech */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    
                    {/* Tech stack */}
                    <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, padding: 20 }}>
                      <h5 className="swiss-label-mono" style={{ color: "var(--text-secondary)", marginBottom: 12 }}>
                        Tech Stack
                      </h5>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {project.stack.map((t) => (
                          <span key={t} className="brutal-tag" style={{ border: "1px solid var(--border-color)", background: "rgba(255,255,255,0.02)" }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: 8, padding: 20 }}>
                      <h5 className="swiss-label-mono" style={{ color: "var(--text-secondary)", marginBottom: 12 }}>
                        Info Proyek
                      </h5>
                      {[
                        { label: "Kategori", value: project.type },
                        { label: "Tahun", value: project.year },
                        { label: "Status", value: project.status },
                      ].map((item) => (
                        <div key={item.label} className="brutal-info-row" style={{ borderBottom: "1px solid var(--border-color)" }}>
                          <span className="swiss-label-mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>{item.label}</span>
                          <span className="swiss-label-mono" style={{ fontSize: 11, color: "var(--text-primary)", fontWeight: "bold" }}>{item.value}</span>
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
