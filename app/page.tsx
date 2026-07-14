"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiCpu, FiCode, FiLayers } from "react-icons/fi";

// Frameworks & Libraries imports from user list
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import SplitType from "split-type";
import gsap from "gsap";
import { animate as animeAnimate } from "animejs";

import Taskbar from "@/components/layout/Taskbar";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects } from "@/data/projects";

// Client testimonials
const testimonials = [
  {
    text: "Erga menunjukkan kemampuan luar biasa dalam membangun sistem manajemen internal yang kami butuhkan. Proyek selesai tepat waktu dengan kualitas yang melampaui ekspektasi. Dia sangat antusias belajar teknologi baru.",
    name: "Koordinator IT",
    role: "Pusdatin Kementerian Pertahanan RI",
    initial: "KIT",
  },
  {
    text: "Platform sertifikasi yang dibangun Erga menjadi tulang punggung operasional kami. Arsitektur Golang-nya sangat efisien dan skalabel, mampu menangani ribuan transaksi sertifikasi tanpa hambatan.",
    name: "Tim Maganghub",
    role: "LSP CoachPro Indonesia",
    initial: "TMH",
  },
  {
    text: "Kolaborasi akademik yang sangat produktif. Implementasi model BERT untuk analisis sentimen mencapai akurasi yang sangat baik dan pipeline-nya terdokumentasi dengan rapi.",
    name: "Dosen Pembimbing",
    role: "Universitas Darma Persada",
    initial: "DPB",
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [cvOpen, setCvOpen] = useState(false);
  const [cvPdfUrl, setCvPdfUrl] = useState<string>("");
  
  // Testimonial index
  const [testiIdx, setTestiIdx] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  // Typewriter hook for role rotation
  const [roleText] = useTypewriter({
    words: ["FULL STACK DEVELOPER", "AI ENGINEER", "SYSTEM ARCHITECT"],
    loop: 0,
    delaySpeed: 2000,
  });

  useEffect(() => {
    if (cvOpen) {
      fetch("/CV-8_ErgaWandaAfriza.pdf")
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setCvPdfUrl(url);
        })
        .catch((err) => console.error("Error creating PDF blob:", err));
    } else {
      if (cvPdfUrl) {
        URL.revokeObjectURL(cvPdfUrl);
        setCvPdfUrl("");
      }
    }
  }, [cvOpen]);

  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
    });

    // 3. Initialize SplitType + GSAP for Giant Title
    const split = new SplitType("#giant-hero-title", { types: "words,chars" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 80,
      stagger: 0.04,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.2,
    });

    // 4. Initialize Anime.js staggered reveal on project cards
    animeAnimate(".swiss-project-card", {
      translateY: [60, 0],
      opacity: [0, 1],
      delay: ((el: any, i: number) => 500 + i * 150) as any,
      duration: 1200,
      ease: "outExpo",
    });

    return () => {
      lenis.destroy();
      split.revert();
    };
  }, []);

  // Confetti trigger on contact submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Fire Swiss flag colors confetti (Red & White)
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#e32b25", "#ffffff"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#e32b25", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    const mailto = `mailto:ewandaafriza@gmail.com?subject=${encodeURIComponent(
      contactForm.subject || "Pesan dari Portfolio Swiss Style"
    )}&body=${encodeURIComponent(
      `Nama: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
    )}`;
    window.open(mailto, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const nextTestimonial = () => {
    setTestiIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestiIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* Giant horizontal scrolling marquee (CSS marquee scroll) */}
      <div className="swiss-marquee-container">
        <div className="swiss-marquee-content">
          <span>ERGA WANDA AFRIZA // FULL STACK DEVELOPER // AI ENGINEER // INFORMATIKA UNSADA 2025 //</span>
          <span>ERGA WANDA AFRIZA // FULL STACK DEVELOPER // AI ENGINEER // INFORMATIKA UNSADA 2025 //</span>
        </div>
      </div>

      {/* Grid container */}
      <div className="swiss-grid-container">

        {/* PANEL 1: HERO / PROFILE */}
        <section
          id="beranda"
          className="swiss-panel"
          style={{ borderTop: "none" }}
        >
          <div className="swiss-split-2">
            {/* Left Header */}
            <div>
              <span className="swiss-label-mono" style={{ color: "var(--color-swiss-red)" }}>
                [ SPESIFIKASI PROFIL ]
              </span>
              <h1 className="giant-title" id="giant-hero-title" style={{ marginTop: 10, marginBottom: 20 }}>
                Erga Wanda Afriza
              </h1>
              
              {/* Typewriter subtext */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "16px", fontWeight: "bold", color: "var(--color-swiss-dark)", letterSpacing: "1px", marginBottom: 24 }}>
                <span>{roleText}</span>
                <Cursor cursorColor="#e32b25" />
              </div>

              <p className="swiss-text" style={{ fontSize: "17px", color: "var(--color-swiss-dark)", textAlign: "justify", maxWidth: "480px" }}>
                Saya menggabungkan kekuatan arsitektur API terdistribusi (Golang/Laravel) dengan kecerdasan komputasi model bahasa (NLP/BERT). Mengutamakan kejelasan grid, efisiensi kode, dan integrasi sirkuit AI produksi.
              </p>
            </div>

            {/* Right Poster Block */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
              {/* react-parallax-tilt wrapper for 3D mouse tilt poster */}
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.15}
                glareColor="#ffffff"
                style={{ width: "100%", maxWidth: "320px", marginBottom: 24 }}
              >
                <div className="swiss-photo-poster">
                  <Image
                    src="/images/erga_photo.jpeg"
                    alt="Erga Wanda Afriza"
                    width={320}
                    height={320}
                    priority
                    unoptimized
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: 12,
                    left: 12,
                    background: "var(--color-swiss-red)",
                    color: "#fff",
                    padding: "4px 8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    fontWeight: "bold"
                  }}>
                    ERGA.OS.V3.0
                  </div>
                </div>
              </Tilt>

              <div style={{ display: "flex", gap: 12, width: "100%", flexWrap: "wrap" }}>
                <button className="swiss-btn" onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}>
                  Lihat Proyek <FiArrowUpRight style={{ marginLeft: 6 }} />
                </button>
                <button className="swiss-btn-outline" onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}>
                  Hubungi
                </button>
                <button className="swiss-btn-outline" onClick={() => setCvOpen(true)}>
                  Preview CV
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 2: PORTFOLIO KARYA */}
        <section
          id="karya"
          className="swiss-panel"
        >
          <span className="swiss-label-mono">[ ARSIP KARYA ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 28 }}>
            Katalog Proyek Terpilih
          </h2>

          <div className="swiss-split-2">
            {projects.map((p) => (
              <div
                key={p.id}
                className="swiss-project-card"
                onClick={() => setSelectedProject(p)}
              >
                <Image
                  src={p.img}
                  alt={p.title}
                  className="swiss-project-card-img"
                  width={500}
                  height={320}
                  unoptimized
                />
                <div className="swiss-project-info">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <span className="swiss-label-mono" style={{ color: "var(--color-swiss-red)", fontSize: 10 }}>
                      {p.type.toUpperCase()}
                    </span>
                    <span className="swiss-label-mono" style={{ fontSize: 10, color: "var(--color-swiss-grey)" }}>
                      {p.year}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "20px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    marginBottom: 8
                  }}>
                    {p.title}
                  </h3>
                  <p className="swiss-text" style={{ fontSize: "14px", marginTop: "auto" }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PANEL 3: KEAHLIAN TEKNIS */}
        <section
          id="keahlian"
          className="swiss-panel"
          data-aos="fade-up"
        >
          <div className="swiss-split-2">
            {/* Left Header */}
            <div>
              <span className="swiss-label-mono">[ CAP KEMAMPUAN ]</span>
              <h2 className="swiss-h2" style={{ borderBottom: "none", paddingBottom: 0, marginTop: 4 }}>
                Spesifikasi Keahlian Teknis
              </h2>
              <p className="swiss-text" style={{ marginTop: 12, maxWidth: "380px" }}>
                Penguasaan bahasa dan infrastruktur komputasi berdasarkan persentase jam produksi riil:
              </p>
              
              <div style={{ display: "flex", gap: "28px", marginTop: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FiCode style={{ color: "var(--color-swiss-red)", fontSize: "18px" }} />
                  <span className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)" }}>Backend echo</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FiCpu style={{ color: "var(--color-swiss-red)", fontSize: "18px" }} />
                  <span className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)" }}>AI Pipelines</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FiLayers style={{ color: "var(--color-swiss-red)", fontSize: "18px" }} />
                  <span className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)" }}>Devops stack</span>
                </div>
              </div>
            </div>

            {/* Right progress bars */}
            <div>
              {[
                { name: "Golang (Echo Framework)", pct: 85 },
                { name: "PHP (Laravel / CodeIgniter)", pct: 88 },
                { name: "Vue.js / TypeScript", pct: 85 },
                { name: "Python (Machine Learning & NLP)", pct: 80 },
                { name: "DevOps (Docker / Nginx / VPS)", pct: 75 },
                { name: "Database (PostgreSQL / Redis)", pct: 82 },
              ].map((skill) => (
                <div key={skill.name} className="swiss-progress-wrapper">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                    <span>{skill.name.toUpperCase()}</span>
                    <span>{skill.pct}%</span>
                  </div>
                  <div className="swiss-progress-bg">
                    <div className="swiss-progress-bar" style={{ width: `${skill.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PANEL 4: PENGALAMAN XP */}
        <section
          id="pengalaman"
          className="swiss-panel"
          data-aos="fade-up"
        >
          <span className="swiss-label-mono">[ KRONOLOGI KARIR ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 28 }}>
            Pengalaman Kerja
          </h2>

          <div className="swiss-timeline-list">
            <div className="swiss-timeline-row">
              <div className="swiss-label-mono" style={{ color: "var(--color-swiss-red)", fontSize: "14px" }}>
                2025 - SEKARANG
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "900", textTransform: "uppercase" }}>Full Stack Developer</h3>
                <p className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)", fontSize: "11px", margin: "4px 0 10px 0" }}>
                  LSP CoachPro Indonesia (Kemnaker)
                </p>
                <p className="swiss-text" style={{ textAlign: "justify" }}>
                  Membangun platform sertifikasi BNSP Maganghub Kemnaker untuk memproses 310+ peserta sertifikasi, 45 asesor, dan 6 skema uji kompetensi secara otomatis, terintegrasi dengan backend Golang (Echo), PostgreSQL, dan caching Redis.
                </p>
              </div>
            </div>

            <div className="swiss-timeline-row">
              <div className="swiss-label-mono" style={{ color: "var(--color-swiss-red)", fontSize: "14px" }}>
                JUN - DES 2024
              </div>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "900", textTransform: "uppercase" }}>Software Engineer Intern</h3>
                <p className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)", fontSize: "11px", margin: "4px 0 10px 0" }}>
                  Pusdatin Kementerian Pertahanan RI
                </p>
                <p className="swiss-text" style={{ textAlign: "justify" }}>
                  Merancang dan meluncurkan Employee Information Portal, Daily Activity Journal, dan Daily Report Management menggunakan kerangka Laravel dan Vue.js untuk merestrukturisasi manajemen birokrasi pertahanan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PANEL 5: AKADEMIK & ULASAN CLIENT */}
        <section
          id="ulasan"
          className="swiss-panel"
          data-aos="fade-up"
        >
          <span className="swiss-label-mono">[ VALIDASI PENDIDIKAN & TESTIMONI ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 28 }}>
            Akademik & Review
          </h2>

          <div className="swiss-split-2">
            
            {/* S1 Degree block */}
            <div style={{ border: "2px solid var(--color-swiss-dark)", padding: "30px", background: "var(--bg-swiss-cream)" }}>
              <span className="swiss-label-mono" style={{ color: "var(--color-swiss-red)" }}>SARJANA TEKNIK INFORMATIKA</span>
              <h3 style={{ fontSize: "20px", fontWeight: "900", textTransform: "uppercase", margin: "8px 0" }}>
                Universitas Darma Persada
              </h3>
              <p className="swiss-text" style={{ marginBottom: 16 }}>
                Lulus Sidang Yudisium Tahun 2025 dengan fokus komputasi Kecerdasan Buatan dan NLP.
              </p>
              <div style={{ display: "inline-flex", padding: "8px 16px", background: "var(--color-swiss-dark)", color: "var(--bg-swiss-cream)", fontWeight: "bold", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                IPK KELULUSAN: 3.23
              </div>
            </div>

            {/* Testimonial slider block */}
            <div className="swiss-testi-box">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <span className="swiss-label-mono" style={{ color: "var(--color-swiss-red)" }}>KATA KLIEN</span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button className="testimonial-nav-btn" style={{ borderColor: "var(--color-swiss-dark)", background: "transparent", color: "var(--color-swiss-dark)", width: 24, height: 24 }} onClick={prevTestimonial}>&lt;</button>
                    <button className="testimonial-nav-btn" style={{ borderColor: "var(--color-swiss-dark)", background: "transparent", color: "var(--color-swiss-dark)", width: 24, height: 24 }} onClick={nextTestimonial}>&gt;</button>
                  </div>
                </div>
                <p className="swiss-text" style={{ fontStyle: "italic", fontSize: "14px", color: "var(--color-swiss-dark)" }}>
                  "{testimonials[testiIdx].text}"
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, paddingTop: 12, borderTop: "1.5px solid var(--color-swiss-light)" }}>
                <div style={{
                  width: 30,
                  height: 30,
                  border: "2px solid var(--color-swiss-dark)",
                  background: "var(--color-swiss-red)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "bold"
                }}>
                  {testimonials[testiIdx].initial}
                </div>
                <div>
                  <h4 style={{ fontSize: "12px", fontWeight: "900", textTransform: "uppercase" }}>{testimonials[testiIdx].name}</h4>
                  <p style={{ fontSize: "10px", color: "var(--color-swiss-grey)" }}>{testimonials[testiIdx].role}</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* PANEL 6: KONTAK TRANSMISI */}
        <section
          id="kontak"
          className="swiss-panel"
          style={{ borderBottom: "none" }}
          data-aos="fade-up"
        >
          <span className="swiss-label-mono">[ HUBUNGAN KOLABORASI ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 28 }}>
            Kirim Pesan Transmisi
          </h2>

          <form onSubmit={handleContactSubmit} className="contact-form-glass" style={{ gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="swiss-label-mono" style={{ fontSize: 10, display: "block", marginBottom: 6 }}>NAMA LENGKAP</label>
                <input
                  type="text"
                  placeholder="Contoh: Erga Wanda"
                  className="swiss-input"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="swiss-label-mono" style={{ fontSize: 10, display: "block", marginBottom: 6 }}>ALAMAT EMAIL</label>
                <input
                  type="email"
                  placeholder="nama@perusahaan.com"
                  className="swiss-input"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="swiss-label-mono" style={{ fontSize: 10, display: "block", marginBottom: 6 }}>SUBJEK PESAN</label>
                <input
                  type="text"
                  placeholder="Topik Diskusi"
                  className="swiss-input"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <label className="swiss-label-mono" style={{ fontSize: 10, display: "block", marginBottom: 6 }}>DETAIL KEBUTUHAN ANDA</label>
                <textarea
                  placeholder="Tulis pesan lengkap..."
                  className="swiss-textarea"
                  rows={5}
                  style={{ flex: 1, resize: "none" }}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="swiss-btn" style={{ width: "100%", display: "flex", gap: 10 }}>
                <FiMail style={{ fontSize: "16px" }} />
                {sent ? "TRANSMISI DIKIRIM (MAILTO)" : "KIRIM SEKARANG"}
              </button>
            </div>
          </form>
        </section>

      </div>

      {/* macOS Swiss Style Header */}
      <Taskbar />

      {/* Swiss Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Swiss CV Inline Preview Modal */}
      {cvOpen && (
        <div className="swiss-modal-overlay" onClick={() => setCvOpen(false)}>
          <div className="swiss-modal-panel" style={{ maxWidth: "960px", height: "88vh" }} onClick={(e) => e.stopPropagation()}>
            <div className="swiss-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="swiss-label-mono" style={{ color: "var(--color-swiss-red)" }}>DOKUMEN RESMI</span>
                <div style={{ width: 1.5, height: 16, background: "var(--color-swiss-dark)" }} />
                <span className="swiss-label-mono" style={{ color: "var(--color-swiss-dark)" }}>CURRICULUM VITAE</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <a
                  href="/CV-8_ErgaWandaAfriza.pdf"
                  download="CV_ErgaWandaAfriza.pdf"
                  className="swiss-btn"
                  style={{ padding: "8px 16px", fontSize: "11px", textDecoration: "none" }}
                >
                  Download CV
                </a>
                <button
                  onClick={() => setCvOpen(false)}
                  style={{
                    width: 32,
                    height: 32,
                    border: "2px solid var(--color-swiss-dark)",
                    background: "transparent",
                    color: "var(--color-swiss-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontWeight: "900",
                    fontSize: "14px",
                    transition: "all 0.15s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--color-swiss-red)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-swiss-red)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--color-swiss-dark)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-swiss-dark)";
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="swiss-modal-body" data-lenis-prevent style={{ padding: 0, flex: 1, height: "100%", background: "#ffffff" }}>
              {cvPdfUrl ? (
                <iframe
                  src={cvPdfUrl}
                  width="100%"
                  height="100%"
                  style={{ border: "none", width: "100%", height: "100%", display: "block" }}
                />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--color-swiss-dark)", background: "var(--bg-swiss-cream)" }}>
                  MEMUAT DOKUMEN CV...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
