"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const shapes = [
    "M 150 280 Q 300 80 500 200 Q 700 320 650 500 Q 600 680 380 700 Q 160 720 100 500 Q 40 280 150 280 Z",
    "M 200 250 Q 380 60 560 220 Q 740 380 680 560 Q 620 740 400 720 Q 180 700 120 500 Q 60 300 200 250 Z",
    "M 120 300 Q 280 100 480 240 Q 680 380 640 560 Q 600 740 380 700 Q 160 660 100 460 Q 40 260 120 300 Z",
    "M 180 260 Q 360 80 540 230 Q 720 380 660 540 Q 600 700 380 720 Q 160 740 100 520 Q 40 300 180 260 Z",
    "M 150 280 Q 300 80 500 200 Q 700 320 650 500 Q 600 680 380 700 Q 160 720 100 500 Q 40 280 150 280 Z",
  ];

  const shapes2 = [
    "M 500 200 Q 680 80 760 260 Q 840 440 720 580 Q 600 720 440 660 Q 280 600 260 440 Q 240 280 500 200 Z",
    "M 520 180 Q 700 60 780 250 Q 860 440 730 570 Q 600 700 450 640 Q 300 580 270 430 Q 240 280 520 180 Z",
    "M 480 220 Q 660 100 740 270 Q 820 440 700 580 Q 580 720 430 650 Q 280 580 260 430 Q 240 280 480 220 Z",
    "M 500 200 Q 680 80 760 260 Q 840 440 720 580 Q 600 720 440 660 Q 280 600 260 440 Q 240 280 500 200 Z",
  ];

  const [isCVOpen, setIsCVOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 90, damping: 15 },
    },
  } as const;

  return (
    <section className="hero" id="beranda" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background vector morphing shapes */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none", zIndex: 0 }}>
        <svg viewBox="0 0 1000 1000" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={shapes[0]}
            animate={{ d: shapes }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            fill="url(#grad1)"
          />
          <motion.path
            d={shapes2[0]}
            animate={{ d: shapes2 }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            fill="url(#grad2)"
          />
        </svg>
      </div>

      {/* Background overlay */}
      <div className="hero-bg" style={{ zIndex: 1 }}>
        <div className="hero-bg-overlay" />
      </div>

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-inner">
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status */}
            <motion.div className="hero-status" variants={itemVariants}>
              <div className="hero-status-dot" />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Tersedia Untuk Kolaborasi
              </span>
            </motion.div>

            {/* Sub-label */}
            <motion.div 
              style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-dim)", letterSpacing: "0.05em", textTransform: "uppercase" }}
              variants={itemVariants}
            >
              Portofolio Digital — 2026
            </motion.div>

            {/* Name */}
            <motion.h1 className="hero-name" variants={itemVariants}>
              Erga <span className="hero-name-accent">Wanda Afriza</span>
            </motion.h1>

            {/* Title */}
            <motion.div className="hero-title" variants={itemVariants}>
              <span className="hero-title-text" style={{ color: "var(--text-bright)", fontWeight: 600 }}>Full Stack Developer</span>
              <div className="hero-title-sep" style={{ backgroundColor: "var(--primary)" }} />
              <span className="hero-title-text" style={{ color: "var(--text-bright)", fontWeight: 600 }}>AI Engineer</span>
            </motion.div>

            {/* Description */}
            <motion.p className="hero-desc" variants={itemVariants}>
              Profesional teknologi serba-guna yang menggabungkan keahlian
              sebagai Full Stack Developer dan AI Engineer. Spesialis dalam
              membangun arsitektur web end-to-end dan mengintegrasikan model
              machine learning ke dalam solusi produksi yang andal.
            </motion.p>

            {/* CTAs */}
            <motion.div className="hero-actions" variants={itemVariants}>
              <motion.a 
                href="#karya" 
                className="btn btn-primary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
                Lihat Karya
              </motion.a>
              <motion.button
                onClick={() => setIsCVOpen(true)}
                className="btn btn-ghost"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: "6px" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Lihat & Unduh CV
              </motion.button>
            </motion.div>

            {/* Meta Stats */}
            <motion.div className="hero-meta" variants={itemVariants}>
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
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
          >
            <motion.div 
              className="hero-visual-frame"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src="/images/erga_photo.jpeg"
                alt="Erga Wanda Afriza"
                fill
                priority
                className="hero-visual-img"
                style={{ objectFit: "cover" }}
                unoptimized
              />
              <div className="hero-visual-border" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isCVOpen && (
          <div 
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              boxSizing: "border-box"
            }}
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCVOpen(false)}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(4px)"
              }}
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="modal-panel"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "800px",
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                zIndex: 10,
                overflow: "hidden"
              }}
            >
              {/* Title Bar */}
              <div 
                className="modal-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 20px"
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 800 }}>
                  ● ● ●  CV_VIEWER.EXE
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <a 
                    href="/cv_erga.pdf" 
                    download 
                    className="btn"
                    style={{
                      padding: "4px 12px",
                      fontSize: "12px",
                      background: "var(--primary)",
                      color: "#000000",
                      border: "2px solid #000000",
                      boxShadow: "2px 2px 0px 0px #000000",
                      cursor: "pointer"
                    }}
                  >
                    Unduh CV
                  </a>
                  <button 
                    onClick={() => setIsCVOpen(false)}
                    className="btn"
                    style={{
                      padding: "4px 12px",
                      fontSize: "12px",
                      background: "#ffffff",
                      color: "#000000",
                      border: "2px solid #000000",
                      boxShadow: "2px 2px 0px 0px #000000",
                      cursor: "pointer"
                    }}
                  >
                    Tutup [X]
                  </button>
                </div>
              </div>

              {/* PDF Preview Frame */}
              <div style={{ flex: 1, background: "#ffffff", position: "relative" }}>
                <iframe 
                  src="/cv_erga.pdf" 
                  width="100%" 
                  height="100%" 
                  style={{ border: "none" }}
                  title="CV Preview"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
