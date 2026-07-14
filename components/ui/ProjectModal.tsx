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
          className="swiss-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <style>{`
            .swiss-scroll::-webkit-scrollbar { width: 5px; }
            .swiss-scroll::-webkit-scrollbar-track { background: var(--bg-swiss-cream); }
            .swiss-scroll::-webkit-scrollbar-thumb { background: var(--color-swiss-dark); }
            
            .swiss-tag {
              font-family: var(--font-mono);
              font-size: 11px;
              font-weight: 700;
              padding: 5px 10px;
              background: transparent;
              border: 1.5px solid var(--color-swiss-dark);
              color: var(--color-swiss-dark);
              text-transform: uppercase;
            }

            .swiss-info-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 8px;
              margin-bottom: 8px;
              border-bottom: 1.5px solid var(--color-swiss-light);
            }
          `}</style>

          {/* Modal Swiss Panel */}
          <motion.div 
            className="swiss-modal-panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            {/* Header */}
            <div className="swiss-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="swiss-label-mono" style={{ color: "var(--color-swiss-red)" }}>
                  STATUS // {project.status.toUpperCase()}
                </span>
                <div style={{ width: 1.5, height: 16, background: "var(--color-swiss-dark)" }} />
                <span className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)" }}>
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
                  border: "2px solid var(--color-swiss-dark)",
                  background: "transparent",
                  color: "var(--color-swiss-dark)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "900",
                  fontFamily: "var(--font-display)",
                  transition: "all 0.15s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--color-swiss-red)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-swiss-red)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-swiss-dark)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-swiss-dark)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="swiss-scroll" data-lenis-prevent style={{ overflowY: "auto", flex: 1 }}>
              
              {/* Hero Banner image (Grayscale Swiss style) */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", background: "var(--color-swiss-dark)", overflow: "hidden", borderBottom: "2px solid var(--color-swiss-dark)" }}>
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover", opacity: 0.85, filter: "grayscale(1) contrast(1.1)" }}
                  unoptimized
                />
              </div>

              {/* Content Area */}
              <div className="swiss-modal-body">
                
                {/* Title and subtitle */}
                <div style={{ marginBottom: 28 }}>
                  <span className="swiss-label-mono">PROYEK RENCANA</span>
                  <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 4vw, 44px)",
                    fontWeight: 900,
                    color: "var(--color-swiss-dark)",
                    lineHeight: 0.95,
                    textTransform: "uppercase",
                    letterSpacing: "-0.04em",
                    marginTop: 4,
                  }}>
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-swiss-grey)", marginTop: 6, fontWeight: 500 }}>
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* Grid info */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "40px" }}>
                  
                  {/* Left: Desc + Highlights */}
                  <div>
                    {/* Desc */}
                    <div style={{ marginBottom: 30 }}>
                      <h4 className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)", marginBottom: 8 }}>
                        Deskripsi Proyek
                      </h4>
                      <p className="swiss-text" style={{ fontSize: "15px", color: "var(--color-swiss-dark)", textAlign: "justify" }}>
                        {project.longDesc}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div style={{ marginBottom: 30 }}>
                      <h4 className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)", marginBottom: 10 }}>
                        Poin-Poin Utama
                      </h4>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 14,
                              color: "var(--color-swiss-grey)",
                              paddingLeft: 18,
                              position: "relative",
                              lineHeight: 1.5,
                            }}
                          >
                            <span style={{ position: "absolute", left: 0, color: "var(--color-swiss-red)" }}>■</span>
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
                          className="swiss-btn"
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
                          className="swiss-btn-outline"
                          style={{ textDecoration: "none" }}
                        >
                          GitHub Repo
                        </a>
                      )}
                    </div>

                    {/* Screenshots */}
                    {project.screenshots.length > 0 && (
                      <div>
                        <h4 className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)", marginBottom: 12 }}>
                          Dokumentasi Visual ({project.screenshots.length})
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                          {project.screenshots.map((ss, i) => {
                            const label = project.screenshotLabels?.[i];
                            return (
                              <div key={i} style={{ border: "2px solid var(--color-swiss-dark)", background: "var(--color-swiss-dark)" }}>
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
                                      filter: "grayscale(1)",
                                      transition: "filter 0.3s"
                                    }}
                                    onMouseOver={(e) => { e.currentTarget.style.filter = "grayscale(0)"; }}
                                    onMouseOut={(e) => { e.currentTarget.style.filter = "grayscale(1)"; }}
                                    unoptimized
                                  />
                                </div>
                                {label && (
                                  <div style={{ padding: "10px 14px", borderTop: "2px solid var(--color-swiss-dark)", background: "var(--bg-swiss-cream)", color: "var(--color-swiss-dark)" }}>
                                    <span className="swiss-label-mono" style={{ fontSize: 10 }}>
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
                    <div style={{ padding: 20, border: "2px solid var(--color-swiss-dark)", background: "var(--bg-swiss-cream)" }}>
                      <h5 className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)", marginBottom: 12 }}>
                        Tech Stack
                      </h5>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {project.stack.map((t) => (
                          <span key={t} className="swiss-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div style={{ padding: 20, border: "2px solid var(--color-swiss-dark)", background: "var(--bg-swiss-cream)" }}>
                      <h5 className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)", marginBottom: 12 }}>
                        Info Proyek
                      </h5>
                      {[
                        { label: "Kategori", value: project.type },
                        { label: "Tahun", value: project.year },
                        { label: "Status", value: project.status },
                      ].map((item) => (
                        <div key={item.label} className="swiss-info-row">
                          <span className="swiss-label-mono" style={{ fontSize: 10, color: "var(--color-swiss-grey)" }}>{item.label}</span>
                          <span className="swiss-label-mono" style={{ fontSize: 11, color: "var(--color-swiss-dark)", fontWeight: "bold" }}>{item.value}</span>
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
