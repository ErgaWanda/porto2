"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const morphRef = useRef<SVGPathElement>(null);
  const morphRef2 = useRef<SVGPathElement>(null);

  const shapes = [
    "M 150 280 Q 300 80 500 200 Q 700 320 650 500 Q 600 680 380 700 Q 160 720 100 500 Q 40 280 150 280 Z",
    "M 200 250 Q 380 60 560 220 Q 740 380 680 560 Q 620 740 400 720 Q 180 700 120 500 Q 60 300 200 250 Z",
    "M 120 300 Q 280 100 480 240 Q 680 380 640 560 Q 600 740 380 700 Q 160 660 100 460 Q 40 260 120 300 Z",
    "M 180 260 Q 360 80 540 230 Q 720 380 660 540 Q 600 700 380 720 Q 160 740 100 520 Q 40 300 180 260 Z",
  ];

  const shapes2 = [
    "M 500 200 Q 680 80 760 260 Q 840 440 720 580 Q 600 720 440 660 Q 280 600 260 440 Q 240 280 500 200 Z",
    "M 520 180 Q 700 60 780 250 Q 860 440 730 570 Q 600 700 450 640 Q 300 580 270 430 Q 240 280 520 180 Z",
    "M 480 220 Q 660 100 740 270 Q 820 440 700 580 Q 580 720 430 650 Q 280 580 260 430 Q 240 280 480 220 Z",
    "M 500 200 Q 680 80 760 260 Q 840 440 720 580 Q 600 720 440 660 Q 280 600 260 440 Q 240 280 500 200 Z",
  ];

  useEffect(() => {
    let frame = 0;
    let t = 0;
    const step = () => {
      t += 0.004;
      const idx = Math.floor(t) % shapes.length;
      const next = (idx + 1) % shapes.length;
      // simple lerp not possible with path strings, use animation approach
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="hero" id="beranda">
      {/* Background overlay */}
      <div className="hero-bg">
        <div className="hero-bg-overlay" />
      </div>

      {/* Content */}
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            {/* Status */}
            <div className="hero-status">
              <div className="hero-status-dot" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Tersedia Untuk Kolaborasi
              </span>
            </div>

            {/* Sub-label */}
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Portofolio Digital — 2026
            </div>

            {/* Name */}
            <h1 className="hero-name">
              Erga <span className="hero-name-accent">Wanda Afriza</span>
            </h1>

            {/* Title */}
            <div className="hero-title">
              <span className="hero-title-text">Full Stack Developer</span>
              <div className="hero-title-sep" />
              <span className="hero-title-text">AI Engineer</span>
            </div>

            {/* Description */}
            <p className="hero-desc">
              Profesional teknologi serba-guna yang menggabungkan keahlian
              sebagai Full Stack Developer dan AI Engineer. Spesialis dalam
              membangun arsitektur web end-to-end dan mengintegrasikan model
              machine learning ke dalam solusi produksi yang andal.
            </p>

            {/* CTAs */}
            <div className="hero-actions">
              <a href="#karya" className="btn btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "4px" }}>
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
                Lihat Karya
              </a>
              <a
                href="/cv_erga.pdf"
                download
                className="btn btn-ghost"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "4px" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Unduh CV
              </a>
            </div>

            {/* Meta Stats */}
            <div className="hero-meta">
              <div className="hero-meta-item">
                <div className="hero-meta-value">7+</div>
                <div className="hero-meta-label">Proyek Selesai</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-value">2+</div>
                <div className="hero-meta-label">Tahun Pengalaman</div>
              </div>
              <div className="hero-meta-item">
                <div className="hero-meta-value">3.23</div>
                <div className="hero-meta-label">IPK / 4.0</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hero-visual">
            <div className="hero-visual-frame">
              <Image
                src="/images/about_portrait.png"
                alt="Erga Wanda Afriza"
                fill
                priority
                className="hero-visual-img"
                style={{ objectFit: "cover" }}
                unoptimized
              />
              <div className="hero-visual-border" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
