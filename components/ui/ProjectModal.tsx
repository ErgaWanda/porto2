"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

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

const getTechBadgeStyle = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("c#") || t.includes(".net") || t.includes("asp") || t.includes("sql server")) {
    return { bg: "#BAE6FD", text: "#0369A1" }; // Azure Sky
  }
  if (t.includes("vue") || t.includes("react") || t.includes("frontend") || t.includes("html") || t.includes("css") || t.includes("motion") || t.includes("tailwind")) {
    return { bg: "#BBF7D0", text: "#047857" }; // Tactical Emerald
  }
  if (t.includes("ai") || t.includes("ml") || t.includes("vision") || t.includes("cnn") || t.includes("bert") || t.includes("python") || t.includes("nlp")) {
    return { bg: "#FED7AA", text: "#9A3412" }; // Beacon Orange
  }
  if (t.includes("golang") || t.includes("docker") || t.includes("redis") || t.includes("nginx") || t.includes("postgres") || t.includes("git")) {
    return { bg: "#E2E8F0", text: "#0F172A" }; // Gunmetal Slate
  }
  if (t.includes("laravel") || t.includes("php")) {
    return { bg: "#FEF08A", text: "#78350F" }; // Amber Gold
  }
  return { bg: "#E2E8F0", text: "#1E293B" }; // Clean Steel
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
              background: rgba(15, 23, 42, 0.78);
              backdrop-filter: blur(6px);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            
            .brutal-modal-panel {
              width: 100%;
              max-width: 940px;
              max-height: 88vh;
              background-color: #FFFFFF;
              border: 3.5px solid #000000;
              border-radius: 18px;
              display: flex;
              flex-direction: column;
              overflow: hidden;
              box-shadow: 8px 8px 0px #38BDF8, 16px 16px 0px #000000;
              color: #0F172A;
            }
            
            .brutal-modal-header {
              padding: 12px 22px;
              border-bottom: 3px solid #000000;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background-color: #E0F2FE;
            }
            
            .brutal-modal-body {
              padding: 26px 28px;
              box-sizing: border-box;
            }
            
            .brutal-scroll::-webkit-scrollbar {
              width: 7px;
            }
            .brutal-scroll::-webkit-scrollbar-track {
              background: #F1F5F9;
            }
            .brutal-scroll::-webkit-scrollbar-thumb {
              background: #38BDF8;
              border: 1.5px solid #000000;
              border-radius: 4px;
            }
            .brutal-scroll::-webkit-scrollbar-thumb:hover {
              background: #0284C7;
            }
            
            .brutal-tag-modal {
              font-family: var(--font-cartoon);
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 0.02em;
              padding: 4px 12px;
              background: #E0F2FE;
              border: 2px solid #000000;
              color: #0369A1;
              border-radius: 8px;
              box-shadow: 2px 2px 0px #000000;
              display: inline-flex;
              align-items: center;
              gap: 4px;
            }

            .brutal-info-row-modal {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-bottom: 8px;
              margin-bottom: 8px;
              border-bottom: 1.5px solid #E2E8F0;
            }
            
            .modal-grid-layout {
              display: grid;
              grid-template-columns: 1fr;
              gap: 28px;
            }
            
            @media (min-width: 768px) {
              .modal-grid-layout {
                grid-template-columns: 1fr 270px;
              }
            }
          `}</style>

          {/* Modal Panel */}
          <motion.div 
            className="brutal-modal-panel"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
          >
            {/* Header */}
            <div className="brutal-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#38BDF8", border: "1.5px solid #000", display: "inline-block" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#2DD4BF", border: "1.5px solid #000", display: "inline-block" }} />
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#F43F5E", border: "1.5px solid #000", display: "inline-block" }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", color: "#0284C7", fontWeight: 800, fontSize: "11px", marginLeft: "4px" }}>
                  SPESIFIKASI // {project.status.toUpperCase()}
                </span>
                <span style={{ color: "#94A3B8" }}>|</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "#475569", fontWeight: 700, fontSize: "10.5px" }}>
                  {project.type} // {project.year}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Tutup"
                style={{
                  padding: "5px 14px",
                  border: "2px solid #000000",
                  background: "#FEE2E2",
                  color: "#991B1B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: "11px",
                  fontFamily: "var(--font-cartoon)",
                  borderRadius: "9999px",
                  boxShadow: "2.5px 2.5px 0px #000000",
                  transition: "all 0.15s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translate(-2px, -2px)";
                  e.currentTarget.style.backgroundColor = "#EF4444";
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.boxShadow = "4px 4px 0px #000000";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translate(0px, 0px)";
                  e.currentTarget.style.backgroundColor = "#FEE2E2";
                  e.currentTarget.style.color = "#991B1B";
                  e.currentTarget.style.boxShadow = "2.5px 2.5px 0px #000000";
                }}
              >
                ✕ TUTUP
              </button>
            </div>

            {/* Scrollable body */}
            <div className="brutal-scroll" data-lenis-prevent style={{ overflowY: "auto", flex: 1, backgroundColor: "#FFFFFF" }}>
              
              {/* Hero Banner image */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", background: "#E2E8F0", overflow: "hidden", borderBottom: "3px solid #000000" }}>
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>

              {/* Content Area */}
              <div className="brutal-modal-body">
                
                {/* Title and subtitle */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
                    <span className="brutal-sticker brutal-sticker-yellow" style={{ fontSize: "10px", padding: "3px 10px" }}>
                      ⭐ PROYEK TERPILIH
                    </span>
                    <span className="brutal-sticker" style={{ fontSize: "10px", padding: "3px 10px", background: "#F1F5F9" }}>
                      TAHUN {project.year}
                    </span>
                  </div>
                  <h2 style={{
                    fontFamily: "var(--font-cartoon-title)",
                    fontSize: "clamp(26px, 4vw, 36px)",
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.15,
                    letterSpacing: "0.01em",
                    marginTop: 4,
                  }}>
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#475569", marginTop: 6, fontWeight: 500 }}>
                      {project.subtitle}
                    </p>
                  )}
                </div>

                {/* Grid info */}
                <div className="modal-grid-layout">
                  
                  {/* Left: Desc + Highlights + Screenshots */}
                  <div>
                    {/* Desc */}
                    <div style={{ marginBottom: 26 }}>
                      <h4 style={{ fontFamily: "var(--font-cartoon)", fontSize: "14px", fontWeight: 700, color: "#0284C7", marginBottom: 8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Deskripsi Proyek
                      </h4>
                      <p style={{ fontSize: "14px", color: "#334155", textAlign: "justify", lineHeight: 1.65 }}>
                        {project.longDesc}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div style={{ marginBottom: 26 }}>
                      <h4 style={{ fontFamily: "var(--font-cartoon)", fontSize: "14px", fontWeight: 700, color: "#0284C7", marginBottom: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Poin-Poin Utama
                      </h4>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0 }}>
                        {project.highlights.map((h, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: 13.5,
                              color: "#1E293B",
                              paddingLeft: 20,
                              position: "relative",
                              lineHeight: 1.55,
                            }}
                          >
                            <span style={{ position: "absolute", left: 0, color: "#0284C7", fontWeight: "bold" }}>◈</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
                      {project.url && project.url !== "#" && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-beach-cyan"
                          style={{ textDecoration: "none" }}
                        >
                          Kunjungi Live ↗
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-beach-white"
                          style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
                        >
                          <FaGithub style={{ fontSize: "14px" }} />
                          GitHub Repo ↗
                        </a>
                      )}
                    </div>

                    {/* Screenshots */}
                    {project.screenshots.length > 0 && (
                      <div>
                        <h4 style={{ fontFamily: "var(--font-cartoon)", fontSize: "14px", fontWeight: 700, color: "#0284C7", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          Dokumentasi Visual ({project.screenshots.length})
                        </h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                          {project.screenshots.map((ss, i) => {
                            const label = project.screenshotLabels?.[i];
                            return (
                              <div key={i} style={{ border: "2.5px solid #000000", borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", backgroundColor: "#FFFFFF", boxShadow: "4px 4px 0px #000000", marginBottom: "8px" }}>
                                {/* Window Title Bar */}
                                <div style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "8px 14px",
                                  backgroundColor: "#F1F5F9",
                                  borderBottom: "2px solid #000000"
                                }}>
                                  <div style={{ display: "flex", gap: "6px" }}>
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444", border: "1px solid #000" }} />
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#eab308", border: "1px solid #000" }} />
                                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", border: "1px solid #000" }} />
                                  </div>
                                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "700", color: "#64748B" }}>
                                    {label ? `VIEWER // ${label.split(" — ")[0].toUpperCase()}` : `IMAGE_${i+1}.PNG`}
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
                                    }}
                                    unoptimized
                                  />
                                </div>

                                {label && (
                                  <div style={{ padding: "10px 14px", borderTop: "2px solid #000000", background: "#F8FAFC", color: "#0F172A" }}>
                                    <span style={{ fontFamily: "var(--font-cartoon)", fontSize: 11, color: "#334155", fontWeight: 700 }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    
                    {/* Tech stack */}
                    <div style={{ backgroundColor: "#FFFFFF", border: "2.5px solid #000000", borderRadius: 12, padding: 18, boxShadow: "4px 4px 0px #000000" }}>
                      <h5 style={{ fontFamily: "var(--font-cartoon)", fontSize: "13px", fontWeight: 700, color: "#0284C7", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Tech Stack
                      </h5>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {project.stack.map((t) => {
                          const tStyle = getTechBadgeStyle(t);
                          return (
                            <span 
                              key={t} 
                              className="brutal-tag-modal"
                              style={{
                                backgroundColor: tStyle.bg,
                                color: tStyle.text,
                              }}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div style={{ backgroundColor: "#FFFFFF", border: "2.5px solid #000000", borderRadius: 12, padding: 18, boxShadow: "4px 4px 0px #000000" }}>
                      <h5 style={{ fontFamily: "var(--font-cartoon)", fontSize: "13px", fontWeight: 700, color: "#0284C7", marginBottom: 12, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        Info Proyek
                      </h5>
                      {[
                        { label: "Kategori", value: project.type },
                        { label: "Tahun", value: project.year },
                        { label: "Status", value: project.status },
                      ].map((item) => (
                        <div key={item.label} className="brutal-info-row-modal">
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#64748B", fontWeight: 700 }}>{item.label}</span>
                          <span style={{ fontFamily: "var(--font-cartoon)", fontSize: 12, color: "#0F172A", fontWeight: 700 }}>{item.value}</span>
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
