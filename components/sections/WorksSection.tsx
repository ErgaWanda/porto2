"use client";
import { useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import ProjectModal, { Project } from "@/components/ui/ProjectModal";

export default function WorksSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section className="section" id="karya">
        <div className="container">
          {/* Header */}
          <div className="works-header reveal">
            <div>
              <div className="section-header-line reveal">
                <span className="t-label">Karya & Proyek</span>
              </div>
              <h2 className="t-h1 reveal reveal-delay-1" style={{ marginTop: "12px" }}>
                Proyek<br />
                <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Terpilih</span>
              </h2>
            </div>
            <div className="works-header-right reveal">
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "0.05em" }}>
                TOTAL PROYEK
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "48px", fontWeight: 800, color: "var(--primary)", lineHeight: 1 }}>
                {String(projects.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* Hint text */}
          <div className="reveal reveal-delay-2" style={{ marginBottom: "24px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em", color: "var(--muted)", display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              KLIK KARTU UNTUK DETAIL PROYEK
            </span>
          </div>

          {/* Grid */}
          <div className="works-grid">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`work-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
                aria-label={`Buka detail: ${p.title}`}
                id={`project-card-${p.id}`}
              >
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

                <div className="work-card-border" />
                <div className="work-card-corner" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
