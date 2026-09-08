"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "IT Developer",
    org: "RDS Group (PT Reycom Document Solusi)",
    date: "02 SEP 2026\nSEKARANG",
    current: true,
    points: [
      "Mengembangkan dan memelihara aplikasi backend enterprise dan web services menggunakan stack C# dan .NET.",
      "Merancang dan mengintegrasikan RESTful API untuk otomatisasi alur pemrosesan dokumen digital dan integrasi sistem bisnis.",
      "Mengelola arsitektur database, optimasi query, dan menjaga performa tinggi serta keandalan layanan korporat.",
    ],
  },
  {
    role: "Full Stack Developer",
    org: "LSP CoachPro Indonesia (Maganghub Kemnaker)",
    date: "DES 2025\nJUN 2026",
    current: false,
    points: [
      "Mengembangkan platform manajemen sertifikasi end-to-end untuk program Maganghub Kemnaker, mengelola alur kerja dari pra-asesmen hingga keputusan kompetensi final.",
      "Membangun backend yang performan dan skalabel menggunakan Golang dan framework Echo, dipasangkan dengan frontend responsif menggunakan Vue.js.",
      "Mengoptimalkan penyimpanan dan caching data dengan PostgreSQL dan Redis, serta merampingkan deployment menggunakan Docker dan Nginx.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Pusdatin Kementerian Pertahanan RI",
    date: "JUN 2024\nDES 2024",
    current: false,
    points: [
      "Merancang dan mengimplementasikan serangkaian aplikasi manajemen internal menggunakan Laravel, Vue.js, dan MySQL.",
      "Mengembangkan Employee Information Portal, Activity Calendar System, dan Daily Report System untuk mendigitalisasi alur kerja internal.",
      "Meningkatkan efisiensi operasional departemen melalui sistem pelaporan digital yang menggantikan proses manual.",
    ],
  },
];

export default function ExperienceSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 85, damping: 15 },
    },
  } as const;

  return (
    <section className="section" id="pengalaman">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="section-header-line"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="t-label">Pengalaman Kerja</span>
        </motion.div>
        <motion.h2 
          className="t-h1" 
          style={{ marginBottom: "64px", marginTop: "12px" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Riwayat<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Penugasan</span>
        </motion.h2>

        <motion.div 
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.org}
              className="timeline-item"
              variants={itemVariants}
            >
              <div className="timeline-date">
                {exp.date.split("\n").map((line, li) => (
                  <span key={li} style={{ display: "block" }}>{line}</span>
                ))}
              </div>

              <div className={`timeline-dot${exp.current ? "" : " timeline-dot-dim"}`} />

              <motion.div 
                className="timeline-card"
                whileHover={{ 
                  scale: 1.01, 
                  x: 6,
                  borderColor: "var(--primary)",
                  boxShadow: "0 10px 25px rgba(99, 102, 241, 0.05)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {exp.current && (
                  <div style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <div style={{ width: 6, height: 6, background: "var(--primary)", borderRadius: "50%" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.05em", color: "var(--primary)", textTransform: "uppercase" }}>
                      Aktif
                    </span>
                  </div>
                )}

                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-org">{exp.org}</div>
                <ul className="timeline-points">
                  {exp.points.map((pt, pi) => (
                    <li key={pi} className="timeline-point">{pt}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
