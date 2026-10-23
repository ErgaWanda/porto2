"use client";

import React from "react";
import { FiCheck, FiCompass, FiCode, FiLayers, FiSend, FiCpu, FiGitBranch } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import "@/styles/workflow.css";

// Sentence-case heading text lives in the data; the leading
// "NN //" is already rendered as the rail number.
const headingOf = (title: string) => title.split("//")[1]?.trim() || title;

export const WorkflowSection: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const steps = [
    {
      num: "01",
      title: "Analisis Kebutuhan",
      badge: "Rekayasa Kebutuhan",
      desc: "Memahami tujuan bisnis, dekonstruksi spesifikasi sistem, dan kalkulasi beban data sebelum mulai coding.",
      deliverable: "PRD & Analisis Kebutuhan",
      accent: "var(--tint-sand)",
      icon: <FiCompass size={20} />,
    },
    {
      num: "02",
      title: "Desain Arsitektur & Skema Database",
      badge: "Arsitektur Sistem",
      desc: "Merancang skema database relasional, kontrak RESTful API, dan arsitektur MVC yang terstruktur sebelum tulis kode.",
      deliverable: "ERD & Kontrak API",
      accent: "var(--tint-sky)",
      highlight: true,
      icon: <FiLayers size={20} />,
    },
    {
      num: "03",
      title: "Desain Antarmuka Reaktif",
      badge: "Prototipe UI",
      desc: "Mendesain antarmuka responsif dengan umpan balik interaktif yang konsisten di perangkat mobile maupun desktop.",
      deliverable: "Komponen Reaktif & UI Flow",
      accent: "var(--tint-clay)",
      icon: <FiCpu size={20} />,
    },
    {
      num: "04",
      title: "Implementasi Kode & Pengujian",
      badge: "Arsitektur Bersih & Uji",
      desc: "Eksekusi backend Golang (Echo) dan Laravel bersama caching Redis, RESTful API, serta struktur kode yang rapi.",
      deliverable: "Clean Architecture & Unit Tests",
      accent: "var(--tint-moss)",
      icon: <FiCode size={20} />,
    },
    {
      num: "05",
      title: "Pengujian & Rilis Produksi",
      badge: "Deployment & Uptime",
      desc: "Deployment containerized dengan Docker dan reverse proxy Nginx di VPS, dipelihara mandiri untuk menjaga stabilitas produksi.",
      deliverable: "Dockerized & Live Production",
      accent: "var(--tint-stone)",
      icon: <FiSend size={20} />,
    },
  ];

  return (
    <section id="workflow" data-hue="rose" ref={ref} className="band-bleed">
      <div className="sheet">
        <SectionHead
          index="07"
          title="Alur kerja & metodologi rekayasa"
          subtitle="Standar proses rekayasa perangkat lunak dari analisis kebutuhan, perancangan arsitektur, hingga deployment produksi yang stabil."
          actions={
            <span className="chip">
              <FiGitBranch size={11} />
              Metodologi &amp; Standar Rekayasa
            </span>
          }
        />

        {/* ── Numbered editorial sequence ──────────────────── */}
        <div className={`bento workflow__steps${inView ? " workflow__steps--in" : ""}`}>
          <span className="workflow__line" aria-hidden="true" />

          {steps.map((step, i) => (
            <Reveal key={step.num} as="article" delay={i * 90} className={`workflow__step${step.highlight ? " workflow__step--highlight" : ""}`}>
              <span className="mono mono--ink workflow__num">{step.num}</span>

              <div className="workflow__body">
                <div className="workflow__head">
                  <div className="workflow__titles">
                    <span className="chip">{step.badge}</span>
                    <h3 className="display-m workflow__title">{headingOf(step.title)}</h3>
                  </div>
                  <span
                    className="workflow__glyph"
                    style={{ ["--wf-accent" as string]: step.accent }}
                  >
                    {step.icon}
                  </span>
                </div>

                <p className="workflow__desc">{step.desc}</p>

                <div className="workflow__deliver">
                  <FiCheck size={14} />
                  <span className="mono mono--ink">{step.deliverable}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Engineering philosophy ───────────────────────── */}
        <Reveal className="workflow__creed panel panel--plate panel--sand" delay={120}>
          <span className="workflow__quote-mark" aria-hidden="true">
            &rdquo;
          </span>

          <div className="workflow__creed-text">
            <span className="chip">Prinsip Rekayasa Sistem</span>
            <p className="lede workflow__quote">
              Kode yang handal bukan sekadar berjalan tanpa error, melainkan arsitektur yang
              dirancang untuk skalabilitas tinggi, efisiensi konkurensi, dan keandalan sistem jangka
              panjang.
            </p>
          </div>

          <div className="workflow__author">
            <span className="chip__dot" aria-hidden="true" />
            <div className="col">
              <span className="workflow__author-name">Standar Rekayasa</span>
              <span className="mono">IT Developer · RDS Group</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
