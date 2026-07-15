"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiCpu, FiCode, FiLayers, FiMonitor } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// Frameworks & Libraries imports from user list
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import SplitType from "split-type";
import gsap from "gsap";
import { animate as animeAnimate } from "animejs";

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



  // Scroll spy & Mobile nav states
  const [activeSection, setActiveSection] = useState("beranda");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

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
    if (document.querySelector(".projects-grid-layout .double-layer-card")) {
      animeAnimate(".projects-grid-layout .double-layer-card", {
        translateY: [60, 0],
        opacity: [0, 1],
        delay: ((el: any, i: number) => 500 + i * 150) as any,
        duration: 1200,
        ease: "outExpo",
      });
    }

    return () => {
      lenis.destroy();
      split.revert();
    };
  }, []);

  useEffect(() => {
    const sections = ["beranda", "karya", "keahlian", "pengalaman", "ulasan", "kontak"];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-40% 0px -40% 0px",
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  // Confetti trigger on contact submit
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/ewandaafriza@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject || "Pesan Kontak Portofolio",
          message: contactForm.message
        })
      });

      if (response.ok) {
        // Clear form
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setSent(true);

        // Fire Swiss flag colors confetti (Red & White)
        const duration = 2.5 * 1000;
        const end = Date.now() + duration;
        (function frame() {
          confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#e32b25", "#ffffff"] });
          confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#e32b25", "#ffffff"] });
          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());

        setTimeout(() => setSent(false), 5000);
      } else {
        throw new Error("Gagal mengirim lewat API");
      }
    } catch (err) {
      console.warn("API Error. Menggunakan Fallback Mailto...", err);
      // Fallback: open mailto
      const mailto = `mailto:ewandaafriza@gmail.com?subject=${encodeURIComponent(
        contactForm.subject || "Pesan dari Portfolio Swiss Style"
      )}&body=${encodeURIComponent(
        `Nama: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
      )}`;
      window.open(mailto, "_blank");
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } finally {
      setSending(false);
    }
  };

  const nextTestimonial = () => {
    setTestiIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestiIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };



  return (
    <div className="brutal-layout-wrapper bg-dots-pattern">
      {/* 1. Desktop Sticky Sidebar Navigasi */}
      <aside className="brutal-sidebar">
        <div>


          {/* Name & Title */}
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "28px", lineHeight: "1.1", textTransform: "uppercase", marginBottom: "4px" }}>
            Erga Wanda
          </h2>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", color: "var(--accent-1)", letterSpacing: "1px", marginBottom: "12px" }}>
            FULL STACK DEV // AI ENG
          </div>

          {/* Status Box */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", border: "2px solid var(--ink-brutal)", backgroundColor: "var(--surface)", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "bold", marginBottom: "16px", width: "100%", boxSizing: "border-box" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10B981", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            [ AVAILABLE FOR HIRE ]
          </div>



          {/* Nav Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {[
              { id: "beranda", label: "Beranda & Profil" },
              { id: "karya", label: "Galeri Proyek" },
              { id: "keahlian", label: "Spesifikasi Skill" },
              { id: "pengalaman", label: "Kronologi Karir" },
              { id: "ulasan", label: "Akademik & Review" },
              { id: "kontak", label: "Kirim Transmisi" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`brutal-nav-link ${activeSection === item.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer with Social Links */}
        <div style={{ borderTop: "2px solid var(--ink-brutal)", paddingTop: "20px", marginTop: "20px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="https://github.com/ErgaWanda" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline" style={{ padding: "8px", flex: 1, minWidth: "40px", textAlign: "center" }} title="GitHub">
              <FiGithub style={{ fontSize: "18px" }} />
            </a>
            <a href="https://linkedin.com/in/erga-wanda-afriza" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline" style={{ padding: "8px", flex: 1, minWidth: "40px", textAlign: "center" }} title="LinkedIn">
              <FiLinkedin style={{ fontSize: "18px" }} />
            </a>
            <a href="https://wa.me/6288291067259" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline" style={{ padding: "8px", flex: 1, minWidth: "40px", textAlign: "center" }} title="WhatsApp">
              <FaWhatsapp style={{ fontSize: "18px", color: "#25D366" }} />
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Header */}
      <header className="brutal-mobile-header">
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "18px", textTransform: "uppercase" }}>
          ERGA W. AFRIZA
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: "bold" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981", display: "inline-block" }} />
          ONLINE
        </div>
      </header>

      {/* 3. Mobile FAB for menu */}
      <button className="brutal-mobile-fab" onClick={() => setMobileNavOpen(true)}>
        ☰
      </button>

      {/* 4. Mobile Bottom Sheet Menu (AnimatePresence) */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="brutal-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.div
              className="brutal-bottom-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "18px", textTransform: "uppercase" }}>NAVIGASI</span>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  style={{ width: "32px", height: "32px", border: "2px solid var(--ink-brutal)", backgroundColor: "var(--accent-1)", fontWeight: "bold", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {[
                  { id: "beranda", label: "Beranda & Profil" },
                  { id: "karya", label: "Galeri Proyek" },
                  { id: "keahlian", label: "Spesifikasi Skill" },
                  { id: "pengalaman", label: "Kronologi Karir" },
                  { id: "ulasan", label: "Akademik & Review" },
                  { id: "kontak", label: "Kirim Transmisi" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`brutal-nav-link ${activeSection === item.id ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileNavOpen(false);
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div style={{ borderTop: "2px solid var(--ink-brutal)", paddingTop: "16px" }}>
                <div style={{ display: "flex", gap: "10px" }}>
                  <a href="https://github.com/ErgaWanda" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline" style={{ padding: "10px", flex: 1, textAlign: "center" }}>
                    <FiGithub style={{ fontSize: "18px", verticalAlign: "middle", marginRight: "6px" }} /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/erga-wanda-afriza" target="_blank" rel="noopener noreferrer" className="brutal-btn-outline" style={{ padding: "10px", flex: 1, textAlign: "center" }}>
                    <FiLinkedin style={{ fontSize: "18px", verticalAlign: "middle", marginRight: "6px" }} /> LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Main Content Area */}
      <main className="brutal-main">
        {/* Giant horizontal scrolling marquee (CSS marquee scroll) */}
        <div className="swiss-marquee-container" style={{ marginTop: 0 }}>
          <div className="swiss-marquee-content">
            <span>ERGA WANDA AFRIZA // FULL STACK DEVELOPER // AI ENGINEER // INFORMATIKA UNSADA 2025 //</span>
            <span>ERGA WANDA AFRIZA // FULL STACK DEVELOPER // AI ENGINEER // INFORMATIKA UNSADA 2025 //</span>
          </div>
        </div>

        {/* SECTION 1: HERO / PROFILE */}
        <section id="beranda" className="brutal-section" style={{ position: "relative" }}>
          {/* Rotating path badge for extra wow factor */}
          <div style={{ position: "absolute", top: "24px", right: "40px", width: "80px", height: "80px", zIndex: 10 }} className="rotating-badge hidden md:block">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <defs>
                <path id="circlePathHero" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text fill="var(--ink-brutal)" fontSize="6" fontWeight="bold" letterSpacing="0.8">
                <textPath xlinkHref="#circlePathHero">
                  ERGA WANDA AFRIZA • FULL STACK DEVELOPER • AI ENGINEER •
                </textPath>
              </text>
            </svg>
          </div>

          <div className="brutal-grid-12">
            <div className="brutal-col-7" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span className="swiss-label-mono" style={{ color: "var(--accent-1)", display: "inline-block", marginBottom: "8px" }}>
                [ SPESIFIKASI PROFIL ]
              </span>
              <h1 className="giant-title" id="giant-hero-title" style={{ marginTop: 4, marginBottom: 20 }}>
                Erga Wanda Afriza
              </h1>
              
              {/* Typewriter subtext */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "18px", fontWeight: "bold", color: "var(--ink-brutal)", letterSpacing: "1px", marginBottom: 24 }}>
                <span>{roleText}</span>
                <Cursor cursorColor="var(--accent-1)" />
              </div>

              <p className="swiss-text" style={{ fontSize: "16px", color: "var(--ink-brutal)", textAlign: "justify", maxWidth: "580px", marginBottom: "32px", lineHeight: "1.7" }}>
                Saya menggabungkan kekuatan arsitektur API terdistribusi (Golang/Laravel) dengan kecerdasan komputasi model bahasa (NLP/BERT). Mengutamakan kejelasan grid, efisiensi kode, dan integrasi sirkuit AI produksi.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button className="brutal-btn" onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}>
                  Lihat Proyek <FiArrowUpRight style={{ marginLeft: 6 }} />
                </button>
                <button className="brutal-btn-outline" onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}>
                  Hubungi Saya
                </button>
                <button className="brutal-btn-outline" onClick={() => setCvOpen(true)} style={{ backgroundColor: "var(--accent-3)" }}>
                  Preview CV
                </button>
              </div>
            </div>

            {/* Right side: Photo Poster with Double Layer */}
            <div className="brutal-col-5" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.1}
                style={{ width: "100%", maxWidth: "320px" }}
              >
                <div className="double-layer-card" style={{ width: "100%", aspectRatio: "1/1", transform: "rotate(2deg)" }}>
                  <div className="card-back back-accent-1" style={{ transform: "rotate(-1.5deg)" }} />
                  <div className="card-front" style={{ overflow: "hidden" }}>
                    <Image
                      src="/images/erga_photo.jpeg"
                      alt="Erga Wanda"
                      width={320}
                      height={320}
                      priority
                      unoptimized
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                </div>
              </Tilt>
            </div>
          </div>
        </section>



        {/* SECTION 3: GALERI KARYA */}
        <section id="karya" className="brutal-section" style={{ backgroundColor: "var(--surface)" }}>
          <span className="swiss-label-mono">[ ARSIP KARYA ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 28, borderColor: "var(--ink-brutal)" }}>
            Katalog Proyek Terpilih
          </h2>

          <div className="projects-grid-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "28px" }}>
            <style>{`
              @media (min-width: 768px) {
                .projects-grid-layout {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
            `}</style>
            {projects.map((p, idx) => (
              <div key={p.id} className="double-layer-card" style={{ height: "100%" }} onClick={() => setSelectedProject(p)}>
                {/* Alternate colors for project card backs */}
                <div className={`card-back ${idx % 3 === 0 ? "back-accent-3" : idx % 3 === 1 ? "back-accent-1" : "back-accent-2"}`} />
                
                <div className="card-front" style={{ cursor: "pointer", display: "flex", flexDirection: "column", padding: "0px", overflow: "hidden" }}>
                  {/* Project Image */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderBottom: "3px solid var(--ink-brutal)" }}>
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      unoptimized
                      style={{ objectFit: "cover", filter: "grayscale(10%)" }}
                    />
                    <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
                      <span style={{ backgroundColor: "var(--accent-3)", color: "var(--ink-brutal)", border: "2px solid var(--ink-brutal)", padding: "4px 8px", fontSize: "10px", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                        {p.type.toUpperCase()}
                      </span>
                      {p.status === "live" && (
                        <span style={{ backgroundColor: "var(--accent-mint)", color: "#fff", border: "2px solid var(--ink-brutal)", padding: "4px 8px", fontSize: "10px", fontWeight: "bold", fontFamily: "var(--font-mono)" }}>
                          LIVE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", color: "var(--accent-1)" }}>
                        {p.year}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 900, textTransform: "uppercase", lineHeight: "1.2", marginBottom: "8px", color: "var(--ink-brutal)" }}>
                      {p.title}
                    </h3>
                    <p className="swiss-text" style={{ fontSize: "14px", color: "#444", marginBottom: "16px", flex: 1, textAlign: "justify" }}>
                      {p.desc}
                    </p>
                    
                    {/* Stack List */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", borderTop: "2px solid #eaeaea", paddingTop: "12px", marginTop: "auto" }}>
                      {p.stack.slice(0, 4).map((tech) => (
                        <span key={tech} style={{ fontFamily: "var(--font-mono)", fontSize: "10px", padding: "3px 6px", border: "1.5px solid var(--ink-brutal)", backgroundColor: "var(--bg-brutal)" }}>
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 4 && (
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", padding: "3px 6px", color: "gray" }}>
                          +{p.stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: KEAHLIAN TEKNIS */}
        <section id="keahlian" className="brutal-section">
          <div className="brutal-grid-12">
            {/* Left Col */}
            <div className="brutal-col-7">
              <span className="swiss-label-mono">[ CAP KEMAMPUAN ]</span>
              <h2 className="swiss-h2" style={{ borderBottom: "none", paddingBottom: 0, marginTop: 4 }}>
                Spesifikasi Keahlian Teknis
              </h2>
              <p className="swiss-text" style={{ marginTop: 12, marginBottom: 28, color: "var(--ink-brutal)", fontSize: "16px" }}>
                Penguasaan bahasa pemrograman, kerangka kerja, dan infrastruktur komputasi berdasarkan persentase jam produksi riil:
              </p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { icon: <FiMonitor />, title: "Fullstack Web Development", desc: "Integrasi Next.js/Vue.js interaktif dengan API modern (Golang/Laravel)" },
                  { icon: <FiCode />, title: "Backend Engine", desc: "Golang & Laravel API terdistribusi dengan clean architecture" },
                  { icon: <FiCpu />, title: "AI Pipelines", desc: "Model NLP, BERT, dan machine learning sirkuit produksi" },
                  { icon: <FiLayers />, title: "DevOps & DB", desc: "Docker container, Redis caching, Nginx proxy, VPS deployment" },
                ].map((item, idx) => (
                  <div key={idx} className="double-layer-card">
                    <div className="card-back back-accent-mint" style={{ transform: idx % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)" }} />
                    <div className="card-front" style={{ padding: "16px", backgroundColor: "var(--surface)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "20px", color: "var(--accent-1)" }}>{item.icon}</span>
                        <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", fontSize: "16px" }}>{item.title}</h4>
                      </div>
                      <p style={{ fontSize: "13px", color: "#555" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Progress Bars */}
            <div className="brutal-col-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="double-layer-card">
                <div className="card-back back-accent-3" style={{ transform: "rotate(1deg)" }} />
                <div className="card-front" style={{ backgroundColor: "var(--surface)", padding: "28px" }}>
                  {[
                    { name: "Fullstack (Next.js / Vue / TS)", pct: 87, color: "var(--accent-1)" },
                    { name: "Golang (Echo Framework)", pct: 85, color: "var(--accent-2)" },
                    { name: "PHP (Laravel / CodeIgniter)", pct: 88, color: "var(--accent-1)" },
                    { name: "Vue.js / TypeScript", pct: 85, color: "var(--accent-3)" },
                    { name: "Python (Machine Learning & NLP)", pct: 80, color: "var(--accent-2)" },
                    { name: "DevOps (Docker / Nginx / VPS)", pct: 75, color: "var(--ink-brutal)" },
                    { name: "Database (PostgreSQL / Redis)", pct: 82, color: "var(--accent-mint)" },
                  ].map((skill) => (
                    <div key={skill.name} className="swiss-progress-wrapper" style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: "bold" }}>
                        <span>{skill.name.toUpperCase()}</span>
                        <span>{skill.pct}%</span>
                      </div>
                      <div className="swiss-progress-bg" style={{ height: "18px", border: "2px solid var(--ink-brutal)", backgroundColor: "var(--bg-brutal)" }}>
                        {/* stripes-bar added here for animating striped look on hover */}
                        <div className="swiss-progress-bar stripes-bar" style={{ width: `${skill.pct}%`, backgroundColor: skill.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Peta Stack Teknologi Lengkap dari CV */}
          <div style={{ marginTop: "48px", borderTop: "3px dashed var(--ink-brutal)", paddingTop: "40px" }}>
            <span className="swiss-label-mono">[ INVENTARIS TEKNOLOGI ]</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", fontSize: "22px", marginTop: 6, marginBottom: "28px", color: "var(--ink-brutal)" }}>
              Peta Stack Keahlian Lengkap
            </h3>
            
            <div className="skills-categories-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
              <style>{`
                @media (min-width: 640px) {
                  .skills-categories-grid {
                    grid-template-columns: repeat(2, 1fr) !important;
                  }
                }
                @media (min-width: 1024px) {
                  .skills-categories-grid {
                    grid-template-columns: repeat(3, 1fr) !important;
                  }
                }
              `}</style>
              
              {[
                {
                  title: "Programming Languages",
                  color: "back-accent-1",
                  skills: ["JavaScript", "Golang", "Python", "Kotlin", "HTML", "CSS"]
                },
                {
                  title: "Backend & Frameworks",
                  color: "back-accent-2",
                  skills: ["Golang (Echo)", "Laravel", "CodeIgniter", "Node.js"]
                },
                {
                  title: "Frontend & UI",
                  color: "back-accent-3",
                  skills: ["Vue.js", "Tailwind CSS"]
                },
                {
                  title: "Databases & Caching",
                  color: "back-accent-mint",
                  skills: ["PostgreSQL", "MySQL", "Redis"]
                },
                {
                  title: "AI & Machine Learning",
                  color: "back-accent-1",
                  skills: ["Computer Vision", "Sentiment Analysis", "CNN", "Naive Bayes", "BERT", "Random Forest", "XGBoost"]
                },
                {
                  title: "DevOps & Architecture",
                  color: "back-accent-2",
                  skills: ["Docker", "Nginx", "Git", "Postman", "RESTful API", "MVC Pattern"]
                }
              ].map((cat, idx) => (
                <div key={idx} className="double-layer-card" style={{ height: "100%" }}>
                  <div className={`card-back ${cat.color}`} style={{ transform: idx % 2 === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)" }} />
                  <div className="card-front" style={{ backgroundColor: "var(--surface)", padding: "20px", display: "flex", flexDirection: "column", height: "100%", boxSizing: "border-box" }}>
                    <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", fontSize: "14px", marginBottom: "16px", borderBottom: "3px solid var(--ink-brutal)", paddingBottom: "6px" }}>
                      {cat.title}
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            padding: "4px 8px",
                            border: "1.5px solid var(--ink-brutal)",
                            backgroundColor: "var(--bg-brutal)",
                            fontWeight: "bold",
                            boxShadow: "1.5px 1.5px 0px var(--ink-brutal)",
                            textTransform: "uppercase"
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: PENGALAMAN XP */}
        <section id="pengalaman" className="brutal-section" style={{ backgroundColor: "var(--surface)" }}>
          <span className="swiss-label-mono">[ KRONOLOGI KARIR ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 36, borderColor: "var(--ink-brutal)" }}>
            Pengalaman Kerja
          </h2>

          <div className="swiss-timeline-list" style={{ position: "relative" }}>
            {/* Vertical timeline connector */}
            <div style={{ position: "absolute", left: "24px", top: "10px", bottom: "10px", width: "4px", backgroundColor: "var(--ink-brutal)" }} />

            {[
              {
                time: "2025 - SEKARANG",
                role: "Full Stack Developer",
                company: "LSP CoachPro Indonesia (Kemnaker)",
                desc: "Membangun platform sertifikasi BNSP Maganghub Kemnaker untuk memproses 310+ peserta sertifikasi, 45 asesor, dan 6 skema uji kompetensi secara otomatis, terintegrasi dengan backend Golang (Echo), PostgreSQL, dan caching Redis."
              },
              {
                time: "JUN - DES 2024",
                role: "Software Engineer Intern",
                company: "Pusdatin Kementerian Pertahanan RI",
                desc: "Merancang dan meluncurkan Employee Information Portal, Daily Activity Journal, dan Daily Report Management menggunakan kerangka Laravel dan Vue.js untuk merestrukturisasi manajemen birokrasi pertahanan."
              }
            ].map((exp, idx) => (
              <div key={idx} style={{ display: "flex", gap: "24px", marginBottom: "32px", position: "relative" }}>
                {/* Timeline node */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: "3px solid var(--ink-brutal)", backgroundColor: idx === 0 ? "var(--accent-1)" : "var(--accent-3)", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "18px", boxShadow: "2px 2px 0px var(--ink-brutal)" }}>
                    💼
                  </div>
                </div>

                {/* Content Card with Double Layer */}
                <div className="double-layer-card" style={{ flex: 1 }}>
                  <div className="card-back back-accent-mint" style={{ transform: idx === 0 ? "rotate(0.5deg)" : "rotate(-0.5deg)" }} />
                  <div className="card-front" style={{ backgroundColor: "var(--bg-brutal)", padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", fontSize: "18px" }}>{exp.role}</h3>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", padding: "3px 8px", backgroundColor: "var(--ink-brutal)", color: "#fff", fontWeight: "bold" }}>
                        {exp.time}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", color: "var(--accent-2)", marginBottom: "12px" }}>
                      {exp.company.toUpperCase()}
                    </p>
                    <p className="swiss-text" style={{ color: "var(--ink-brutal)", textAlign: "justify", fontSize: "14px" }}>
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: AKADEMIK & ULASAN CLIENT */}
        <section id="ulasan" className="brutal-section">
          <span className="swiss-label-mono">[ VALIDASI PENDIDIKAN & TESTIMONI ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 28, borderColor: "var(--ink-brutal)" }}>
            Akademik & Review Klien
          </h2>

          <div className="brutal-grid-12">
            {/* Left degree card - Double Layer */}
            <div className="brutal-col-7">
              <div className="double-layer-card" style={{ height: "100%" }}>
                <div className="card-back back-accent-2" style={{ transform: "rotate(1deg)" }} />
                <div className="card-front" style={{ backgroundColor: "var(--accent-3)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <span className="swiss-label-mono" style={{ color: "var(--ink-brutal)" }}>SARJANA TEKNIK INFORMATIKA</span>
                    <h3 style={{ fontSize: "24px", fontWeight: 900, textTransform: "uppercase", margin: "8px 0 16px 0", fontFamily: "var(--font-display)", lineHeight: "1.1" }}>
                      Universitas Darma Persada
                    </h3>
                    <p className="swiss-text" style={{ color: "var(--ink-brutal)", fontSize: "15px", marginBottom: "20px", textAlign: "justify" }}>
                      Lulus Sidang Yudisium Tahun 2025 dengan fokus komputasi Kecerdasan Buatan dan NLP. Proyek akhir mengimplementasikan model evaluasi sentimen mutakhir berbasis model BERT Transformers.
                    </p>
                  </div>
                  <div style={{ display: "inline-flex", padding: "10px 20px", background: "var(--ink-brutal)", color: "#fff", fontWeight: "bold", fontFamily: "var(--font-mono)", fontSize: "13px", border: "2px solid var(--ink-brutal)", alignSelf: "flex-start", boxShadow: "4px 4px 0px #fff" }}>
                    IPK KELULUSAN: 3.23 / 4.0
                  </div>
                </div>
              </div>
            </div>

            {/* Right Testimonial box - Double Layer */}
            <div className="brutal-col-5">
              <div className="double-layer-card" style={{ height: "100%" }}>
                <div className="card-back back-accent-1" style={{ transform: "rotate(-1deg)" }} />
                <div className="card-front" style={{ padding: "30px", backgroundColor: "var(--surface)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <span className="swiss-label-mono" style={{ color: "var(--accent-1)" }}>KATA KLIEN</span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="brutal-btn-outline" style={{ width: "32px", height: "32px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={prevTestimonial}>&lt;</button>
                        <button className="brutal-btn-outline" style={{ width: "32px", height: "32px", padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={nextTestimonial}>&gt;</button>
                      </div>
                    </div>
                    <p className="swiss-text" style={{ fontStyle: "italic", fontSize: "15px", color: "var(--ink-brutal)", lineHeight: "1.6", marginBottom: "20px" }}>
                      "{testimonials[testiIdx].text}"
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "16px", borderTop: "2px solid #eaeaea" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      border: "3px solid var(--ink-brutal)",
                      background: "var(--accent-1)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "bold",
                      boxShadow: "2px 2px 0px var(--ink-brutal)"
                    }}>
                      {testimonials[testiIdx].initial}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 900, textTransform: "uppercase", fontFamily: "var(--font-display)" }}>{testimonials[testiIdx].name}</h4>
                      <p style={{ fontSize: "11px", color: "#666", fontFamily: "var(--font-mono)" }}>{testimonials[testiIdx].role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: KONTAK TRANSMISI */}
        <section id="kontak" className="brutal-section" style={{ borderBottom: "none", backgroundColor: "var(--surface)" }}>
          <span className="swiss-label-mono">[ HUBUNGAN KOLABORASI ]</span>
          <h2 className="swiss-h2" style={{ marginTop: 4, marginBottom: 28, borderColor: "var(--ink-brutal)" }}>
            Kirim Pesan Transmisi
          </h2>

          <div className="brutal-grid-12">
            <div className="brutal-col-7">
              <form onSubmit={handleContactSubmit} className="brutal-card" style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor: "var(--bg-brutal)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label className="swiss-label-mono" style={{ fontSize: "11px", display: "block", marginBottom: "8px", color: "var(--ink-brutal)" }}>NAMA LENGKAP</label>
                    <input
                      type="text"
                      placeholder="Contoh: Erga Wanda"
                      className="swiss-input"
                      style={{ border: "2px solid var(--ink-brutal)", padding: "12px", background: "#fff" }}
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="swiss-label-mono" style={{ fontSize: "11px", display: "block", marginBottom: "8px", color: "var(--ink-brutal)" }}>ALAMAT EMAIL</label>
                    <input
                      type="email"
                      placeholder="nama@perusahaan.com"
                      className="swiss-input"
                      style={{ border: "2px solid var(--ink-brutal)", padding: "12px", background: "#fff" }}
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="swiss-label-mono" style={{ fontSize: "11px", display: "block", marginBottom: "8px", color: "var(--ink-brutal)" }}>SUBJEK PESAN</label>
                  <input
                    type="text"
                    placeholder="Topik Diskusi"
                    className="swiss-input"
                    style={{ border: "2px solid var(--ink-brutal)", padding: "12px", background: "#fff" }}
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="swiss-label-mono" style={{ fontSize: "11px", display: "block", marginBottom: "8px", color: "var(--ink-brutal)" }}>DETAIL KEBUTUHAN ANDA</label>
                  <textarea
                    placeholder="Tulis pesan lengkap..."
                    className="swiss-textarea"
                    rows={6}
                    style={{ border: "2px solid var(--ink-brutal)", padding: "12px", background: "#fff", resize: "none" }}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="brutal-btn"
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: 10,
                    opacity: sending ? 0.7 : 1,
                    cursor: sending ? "not-allowed" : "pointer"
                  }}
                >
                  <FiMail style={{ fontSize: "16px" }} />
                  {sending ? "MENGIRIM PESAN..." : sent ? "TRANSMISI BERHASIL TERKIRIM!" : "KIRIM SEKARANG"}
                </button>
              </form>
            </div>

            <div className="brutal-col-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div className="double-layer-card">
                <div className="card-back back-accent-2" style={{ transform: "rotate(-1.5deg)" }} />
                <div className="card-front" style={{ backgroundColor: "var(--accent-2)", color: "#fff", padding: "30px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", fontSize: "20px", marginBottom: "12px", color: "#fff" }}>Informasi Kontak</h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "20px", color: "rgba(255,255,255,0.9)" }}>
                    Silakan kirim pesan melalui formulir transmisi di samping untuk mendiskusikan peluang kolaborasi, proyek, atau integrasi AI.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                    <div>📧 ewandaafriza@gmail.com</div>
                    <div>📱 +62 882 9106 7259</div>
                    <div>📍 Jakarta, Indonesia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Swiss Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Swiss CV Inline Preview Modal */}
      {cvOpen && (
        <div className="swiss-modal-overlay" onClick={() => setCvOpen(false)}>
          <div className="swiss-modal-panel" style={{ maxWidth: "960px", height: "88vh", borderWidth: "4px" }} onClick={(e) => e.stopPropagation()}>
            <div className="swiss-modal-header" style={{ borderBottomWidth: "3px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span className="swiss-label-mono" style={{ color: "var(--accent-1)" }}>DOKUMEN RESMI</span>
                <div style={{ width: 2, height: 16, background: "var(--ink-brutal)" }} />
                <span className="swiss-label-mono" style={{ color: "var(--ink-brutal)" }}>CURRICULUM VITAE</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <a
                  href="/CV-8_ErgaWandaAfriza.pdf"
                  download="CV_ErgaWandaAfriza.pdf"
                  className="brutal-btn"
                  style={{ padding: "6px 12px", fontSize: "11px", textDecoration: "none" }}
                >
                  Download
                </a>
                <button
                  onClick={() => setCvOpen(false)}
                  style={{
                    width: 32,
                    height: 32,
                    border: "3px solid var(--ink-brutal)",
                    background: "transparent",
                    color: "var(--ink-brutal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontWeight: "900",
                    fontSize: "14px",
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
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontFamily: "var(--font-mono)", fontSize: "14px", color: "var(--ink-brutal)", background: "var(--bg-brutal)" }}>
                  MEMUAT DOKUMEN CV...
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CSS custom keyframe animations */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
