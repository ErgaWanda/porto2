"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  const info = [
    { label: "Email", value: "ewandaafriza@gmail.com" },
    { label: "Telepon", value: "+62 882 9106 7259" },
    { label: "GitHub", value: "github.com/ErgaWanda" },
    { label: "Lokasi", value: "Jakarta, Indonesia" },
    { label: "Pendidikan", value: "S1 Teknik Informatika" },
    { label: "Status", value: "Tersedia untuk hire" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;

  return (
    <section className="section" id="tentang">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header-line"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="t-label">Tentang Saya</span>
        </motion.div>

        <motion.div 
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Image */}
          <motion.div 
            className="about-img-frame"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Image
              src="/images/erga_photo.jpeg"
              alt="Erga Wanda Afriza"
              width={340}
              height={440}
              className="about-img"
              unoptimized
            />
            <div className="about-img-tag">
              <div className="t-label" style={{ marginBottom: "4px" }}>Profil Pengembang</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                Erga W. Afriza
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "0.05em", marginTop: "2px" }}>
                FS-DEV // AI-ENG
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="about-content">
            <motion.div variants={itemVariants}>
              <h2 className="t-h1" style={{ marginBottom: "24px" }}>
                Membangun Sistem<br />
                <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Yang Bekerja.</span>
              </h2>
              <p className="about-profile-text">
                Saya adalah profesional teknologi yang menggabungkan keahlian Full Stack Development
                dengan kecerdasan buatan. Lulusan Teknik Informatika Universitas Darma Persada (2025)
                dengan IPK 3.23/4.0, berpengalaman membangun sistem enterprise dari konsep hingga
                deployment produksi.
              </p>
              <p className="about-profile-text" style={{ marginTop: "16px" }}>
                Keahlian saya mencakup membangun API backend yang skalabel menggunakan Golang dan
                Laravel, mengembangkan antarmuka yang responsif dengan Vue.js, serta menerapkan
                model machine learning — mulai dari NLP dengan BERT hingga Computer Vision dengan CNN
                — ke dalam aplikasi nyata yang digunakan oleh pengguna sehari-hari.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div className="about-stats" variants={itemVariants}>
              {[
                { value: "7+", label: "Proyek Selesai" },
                { value: "2+", label: "Tahun Xp" },
                { value: "3", label: "Stack Utama" },
              ].map((s) => (
                <motion.div 
                  key={s.label} 
                  className="about-stat"
                  whileHover={{ scale: 1.05, borderColor: "var(--primary)", backgroundColor: "rgba(99, 102, 241, 0.03)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="about-stat-value">{s.value}</div>
                  <div className="about-stat-label">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Info Grid */}
            <motion.div className="about-info-grid" variants={itemVariants}>
              {info.map((item) => (
                <motion.div 
                  key={item.label} 
                  className="about-info-item"
                  whileHover={{ scale: 1.02, borderColor: "var(--primary)" }}
                >
                  <div>
                    <div className="about-info-label">{item.label}</div>
                    <div className="about-info-value">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
