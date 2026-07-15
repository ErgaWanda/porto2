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
              background: rgba(0, 0, 0, 0.6);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
            }
            
            .brutal-modal-panel {
              width: 100%;
              max-width: 960px;
              max-height: 85vh;
              background-color: var(--bg-brutal);
              border: 3px solid var(--ink-brutal);
              display: flex;
              flex-direction: column;
              overflow: hidden;
              box-shadow: 12px 12px 0 var(--ink-brutal);
            }
            
            .brutal-modal-header {
              padding: 16px 24px;
              border-bottom: 3px solid var(--ink-brutal);
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: var(--accent-3); /* Bright yellow header */
            }
            
            .brutal-modal-body {
              padding: 28px;
              box-sizing: border-box;
            }
            
            .brutal-scroll::-webkit-scrollbar {
              width: 8px;
            }
            .brutal-scroll::-webkit-scrollbar-track {
              background: var(--bg-brutal);
            }
            .brutal-scroll::-webkit-scrollbar-thumb {
              background: var(--ink-brutal);
              border: 2px solid var(--bg-brutal);
            }
            
            .brutal-tag {
              font-family: var(--font-mono);
              font-size: 11px;
              font-weight: 700;
              padding: 5px 10px;
              background: var(--surface);
              border: 2px solid var(--ink-brutal);
              color: var(--ink-brutal);
              text-transform: uppercase;
            }

            .brutal-info-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 8px;
              margin-bottom: 8px;
              border-bottom: 2px solid #eaeaea;
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
                <span className="swiss-label-mono" style={{ color: "var(--accent-1)", fontWeight: "bold" }}>
                  STATUS // {project.status.toUpperCase()}
                </span>
                <div style={{ width: 2, height: 16, background: "var(--ink-brutal)" }} />
                <span className="swiss-label-mono" style={{ color: "var(--ink-brutal)", fontWeight: "bold" }}>
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
                  border: "2px solid var(--ink-brutal)",
                  background: "var(--accent-1)",
                  color: "var(--ink-brutal)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: "900",
                  fontFamily: "var(--font-display)",
                  boxShadow: "2px 2px 0 var(--ink-brutal)",
                  transition: "all 0.1s",
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable body */}
            <div className="brutal-scroll" data-lenis-prevent style={{ overflowY: "auto", flex: 1, backgroundColor: "var(--bg-brutal)" }}>
              
              {/* Hero Banner image (Grayscale Swiss style but with brutalist border) */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", background: "var(--ink-brutal)", overflow: "hidden", borderBottom: "3px solid var(--ink-brutal)" }}>
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
                  <span className="swiss-label-mono" style={{ color: "var(--accent-2)" }}>ARSIP PROYEK RESMI</span>
                  <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 4vw, 44px)",
                    fontWeight: 900,
                    color: "var(--ink-brutal)",
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    marginTop: 4,
                  }}>
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#555", marginTop: 6, fontWeight: 500 }}>
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
                      <h4 className="swiss-label-mono" style={{ color: "var(--ink-brutal)", marginBottom: 8 }}>
                        Deskripsi Proyek
                      </h4>
                      <p className="swiss-text" style={{ fontSize: "15px", color: "var(--ink-brutal)", textAlign: "justify", lineHeight: 1.6 }}>
                        {project.longDesc}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div style={{ marginBottom: 30 }}>
                      <h4 className="swiss-label-mono" style={{ color: "var(--ink-brutal)", marginBottom: 10 }}>
                        Poin-Poin Utama
                      </h4>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0 }}>
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: 14,
                              color: "var(--ink-brutal)",
                              paddingLeft: 18,
                              position: "relative",
                              lineHeight: 1.5,
                            }}
                          >
                            <span style={{ position: "absolute", left: 0, color: "var(--accent-1)" }}>■</span>
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
                          className="brutal-btn"
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
                          className="brutal-btn-outline"
                          style={{ textDecoration: "none" }}
                        >
                          GitHub Repo
                        </a>
                      )}
                    </div>

                    {/* Screenshots */}
                    {project.screenshots.length > 0 && (
                      <div>
                        <h4 className="swiss-label-mono" style={{ color: "var(--ink-brutal)", marginBottom: 12 }}>
                          Dokumentasi Visual ({project.screenshots.length})
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                          {project.screenshots.map((ss, i) => {
                            const label = project.screenshotLabels?.[i];
                            return (
                              <div key={i} className="double-layer-card" style={{ transform: i % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)", marginBottom: "8px" }}>
                                <div className="card-back back-accent-2" />
                                <div className="card-front" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                                  {/* Window Title Bar */}
                                  <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "8px 12px",
                                    backgroundColor: "#e4e4e7",
                                    borderBottom: "3px solid var(--ink-brutal)"
                                  }}>
                                    <div style={{ display: "flex", gap: "6px" }}>
                                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#ef4444", border: "1.5px solid var(--ink-brutal)" }} />
                                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#eab308", border: "1.5px solid var(--ink-brutal)" }} />
                                      <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#22c55e", border: "1.5px solid var(--ink-brutal)" }} />
                                    </div>
                                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "bold", color: "#666" }}>
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
                                        filter: "grayscale(30%)",
                                        transition: "filter 0.3s"
                                      }}
                                      onMouseOver={(e) => { e.currentTarget.style.filter = "grayscale(0%)"; }}
                                      onMouseOut={(e) => { e.currentTarget.style.filter = "grayscale(30%)"; }}
                                      unoptimized
                                    />
                                  </div>

                                  {label && (
                                    <div style={{ padding: "10px 14px", borderTop: "3px solid var(--ink-brutal)", background: "var(--surface)", color: "var(--ink-brutal)" }}>
                                      <span className="swiss-label-mono" style={{ fontSize: 10 }}>
                                        {label.toUpperCase()}
                                      </span>
                                    </div>
                                  )}
                                </div>
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
                    <div className="brutal-card" style={{ backgroundColor: "var(--surface)" }}>
                      <h5 className="swiss-label-mono" style={{ color: "var(--ink-brutal)", marginBottom: 12 }}>
                        Tech Stack
                      </h5>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {project.stack.map((t) => (
                          <span key={t} className="brutal-tag">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="brutal-card" style={{ backgroundColor: "var(--surface)" }}>
                      <h5 className="swiss-label-mono" style={{ color: "var(--ink-brutal)", marginBottom: 12 }}>
                        Info Proyek
                      </h5>
                      {[
                        { label: "Kategori", value: project.type },
                        { label: "Tahun", value: project.year },
                        { label: "Status", value: project.status },
                      ].map((item) => (
                        <div key={item.label} className="brutal-info-row">
                          <span className="swiss-label-mono" style={{ fontSize: 10, color: "#666" }}>{item.label}</span>
                          <span className="swiss-label-mono" style={{ fontSize: 11, color: "var(--ink-brutal)", fontWeight: "bold" }}>{item.value}</span>
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
