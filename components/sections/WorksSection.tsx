"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectModal, { Project } from "@/components/ui/ProjectModal";

export default function WorksSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;

  return (
    <>
      <section className="section" id="karya">
        <div className="container">
          {/* Header */}
          <div className="works-header">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-header-line">
                <span className="t-label">Karya & Proyek</span>
              </div>
              <h2 className="t-h1" style={{ marginTop: "12px" }}>
                Proyek<br />
                <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Terpilih</span>
              </h2>
            </motion.div>
            <motion.div 
              className="works-header-right"
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
                TOTAL PROYEK
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>
                {String(projects.length).padStart(2, "0")}
              </div>
            </motion.div>
          </div>

          {/* Hint text */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ marginBottom: "24px" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              KLIK KARTU UNTUK DETAIL PROYEK
            </span>
          </motion.div>

          {/* Grid */}
          <motion.div 
            className="works-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {projects.map((p, i) => (
              <motion.button
                key={p.id}
                onClick={p.status === "wip" ? undefined : () => setSelected(p)}
                className="work-card"
                variants={cardVariants}
                whileHover={p.status === "wip" ? { scale: 1.01, y: -4 } : { scale: 1.01, y: -6 }}
                whileTap={p.status === "wip" ? {} : { scale: 0.99 }}
                aria-label={p.status === "wip" ? p.title : `Buka detail: ${p.title}`}
                id={`project-card-${p.id}`}
                style={{ originY: 0, cursor: p.status === "wip" ? "default" : "pointer" }}
              >
                {p.status === "wip" ? (
                  <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", padding: "24px", boxSizing: "border-box", gap: "16px", textAlign: "left" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="work-tag">{p.type}</span>
                      <span className="work-tag" style={{ background: "var(--accent)", color: "#ffffff", borderColor: "#000000" }}>ON PROGRESS</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--text-bright)", marginTop: "12px", lineHeight: 1.3 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--text-dim)", lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                    <div className="work-card-stack" style={{ marginTop: "auto", fontSize: "12px", color: "var(--text-dim)", fontFamily: "var(--font-mono)", paddingTop: "12px" }}>
                      {p.stack.join(" · ")}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Image Wrapper */}
                    <div className="work-card-img-wrapper">
                      {/* Type tag */}
                      <div className="work-card-tag-bar">
                        <span className="work-tag">{p.type}</span>
                        {p.status === "live" && (
                          <span className="work-tag" style={{ color: "var(--cyan)", borderColor: "var(--cyan-dim)" }}>Live</span>
                        )}
                      </div>

                      {/* Click hint icon */}
                      <div className="card-expand-icon">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                      </div>

                      {/* Image */}
                      <Image
                        src={p.img}
                        alt={p.title}
                        width={800}
                        height={500}
                        className="work-card-img"
                        unoptimized
                      />

                      {/* Hover overlay */}
                      <div className="work-card-overlay" />
                    </div>

                    {/* Info Panel */}
                    <div className="work-card-info-panel">
                      <div className="work-card-title-row">
                        <span className="work-card-title">{p.title}</span>
                        <span className="work-card-arrow">→</span>
                      </div>
                      <div className="work-card-stack">{p.stack.slice(0, 4).join(" · ")}{p.stack.length > 4 ? " ···" : ""}</div>
                    </div>
                  </>
                )}

                <div className="work-card-border" />
                <div className="work-card-corner" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
