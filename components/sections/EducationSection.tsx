"use client";
import { motion } from "framer-motion";

export default function EducationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  } as const;

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 150, damping: 12 },
    },
  } as const;

  return (
    <section className="section" id="pendidikan">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="section-header-line"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="t-label">Pendidikan</span>
        </motion.div>
        <motion.h2 
          className="t-h1" 
          style={{ marginBottom: "48px", marginTop: "12px" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Latar<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Akademik</span>
        </motion.h2>

        <motion.div 
          className="edu-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          whileHover={{ 
            borderColor: "var(--primary)",
            boxShadow: "0 10px 30px rgba(99, 102, 241, 0.06)",
            y: -2
          }}
        >
          <div>
            <div className="t-label" style={{ marginBottom: "12px" }}>
              2021 — 2025
            </div>
            <div className="edu-inst">Universitas Darma Persada</div>
            <div className="edu-degree">
              Sarjana Teknik Informatika (S.Kom)
            </div>

            {/* Courses / highlights */}
            <motion.div
              style={{
                marginTop: "24px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Struktur Data",
                "Algoritma & Pemrograman",
                "Machine Learning",
                "Computer Vision",
                "Pemrograman Web",
                "Basis Data",
                "Kecerdasan Buatan",
                "Rekayasa Perangkat Lunak",
              ].map((c) => (
                <motion.span 
                  key={c} 
                  className="skill-tag"
                  variants={tagVariants}
                  whileHover={{ scale: 1.05, borderColor: "var(--primary)", backgroundColor: "rgba(99, 102, 241, 0.03)" }}
                >
                  {c}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="edu-gpa-container">
            <div className="edu-gpa">3.23</div>
            <div className="edu-gpa-label">IPK / 4.0</div>
            <motion.div
              style={{
                marginTop: "24px",
                padding: "12px 20px",
                background: "var(--bg-sub)",
                border: "1px solid var(--border)",
                display: "inline-block",
                borderRadius: "var(--radius-sm)",
              }}
              whileHover={{ borderColor: "var(--accent)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--text-dim)",
                  letterSpacing: "0.05em",
                  marginBottom: "4px",
                }}
              >
                STATUS
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-bright)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Lulus 2025
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
