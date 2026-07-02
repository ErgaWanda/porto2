"use client";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Full Stack Web Dev",
    desc: "Pembangunan aplikasi web end-to-end dari arsitektur backend hingga antarmuka frontend yang responsif. Spesialis Golang, Laravel, dan Vue.js.",
  },
  {
    num: "02",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M2 12h4M18 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: "AI & Machine Learning",
    desc: "Integrasi model ML ke dalam sistem produksi: NLP, sentiment analysis, computer vision, dan pengembangan pipeline data science end-to-end.",
  },
  {
    num: "03",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    title: "Backend & API Design",
    desc: "Perancangan dan pengembangan RESTful API yang bersih, terdokumentasi, dan skalabel. Mencakup autentikasi, otorisasi, dan integrasi layanan pihak ketiga.",
  },
  {
    num: "04",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "DevOps & Deployment",
    desc: "Konfigurasi dan deployment aplikasi ke VPS menggunakan Docker, Nginx, dan pengelolaan database PostgreSQL/Redis untuk performa produksi optimal.",
  },
  {
    num: "05",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Konsultasi Teknologi",
    desc: "Saran arsitektur dan pilihan teknologi untuk startup dan UKM. Membantu memilih stack yang tepat untuk kebutuhan bisnis dan anggaran yang ada.",
  },
  {
    num: "06",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: "Data Analytics",
    desc: "Analisis dan visualisasi data untuk pengambilan keputusan bisnis. Menggunakan Python, SQL, dan alat BI untuk mengubah data mentah menjadi wawasan actionable.",
  },
];

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;

  return (
    <section className="section" id="layanan">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="section-header-line"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="t-label">Layanan</span>
        </motion.div>
        <motion.h2 
          className="t-h1" 
          style={{ marginBottom: "48px", marginTop: "12px" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Apa Yang<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Saya Tawarkan</span>
        </motion.h2>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((s) => (
            <motion.div
              key={s.num}
              className="service-card"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                borderColor: "var(--primary)",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.05)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="service-num">{s.num}.</div>
              <div className="service-icon">{s.icon}</div>
              <div className="service-title">{s.title}</div>
              <p className="service-desc">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
