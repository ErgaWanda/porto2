"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Erga menunjukkan kemampuan luar biasa dalam membangun sistem manajemen internal yang kami butuhkan. Proyek selesai tepat waktu dengan kualitas yang melampaui ekspektasi. Dia sangat antusias belajar teknologi baru dan cepat beradaptasi.",
    name: "Koordinator IT",
    role: "Pusdatin Kementerian Pertahanan RI",
    initial: "KIT",
  },
  {
    text: "Platform sertifikasi yang dibangun Erga menjadi tulang punggung operasional kami. Arsitektur Golang-nya sangat efisien dan skalabel, mampu menangani ribuan transaksi sertifikasi tanpa hambatan. Tim developer yang solid.",
    name: "Tim Maganghub",
    role: "LSP CoachPro Indonesia",
    initial: "TMH",
  },
  {
    text: "Kolaborasi akademik yang sangat produktif. Implementasi model BERT untuk analisis sentimen mencapai akurasi yang sangat baik dan pipeline-nya terdokumentasi dengan rapi, memudahkan penelitian lanjutan.",
    name: "Dosen Pembimbing",
    role: "Universitas Darma Persada",
    initial: "DPB",
  },
  {
    text: "Erga berhasil mengintegrasikan model XGBoost ke dalam dashboard analitik kami dengan sangat baik. Hasil perbandingan algoritma yang disajikan memberikan insight berharga untuk strategi media sosial perusahaan kami.",
    name: "Manager Digital",
    role: "PT. BRIllian Indah Gemilang",
    initial: "MDG",
  },
];

export default function TestimonialsSection() {
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;

  return (
    <section className="section" id="ulasan">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="section-header-line"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="t-label">Ulasan</span>
        </motion.div>
        <motion.h2 
          className="t-h1" 
          style={{ marginBottom: "48px", marginTop: "12px" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Yang Mereka<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Katakan</span>
        </motion.h2>

        <motion.div 
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.01, 
                y: -4, 
                borderColor: "var(--primary)",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.05)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
