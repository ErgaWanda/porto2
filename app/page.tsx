"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiCpu, FiCode, FiLayers, FiMonitor, FiDatabase, FiGlobe } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  SiJavascript, SiGo, SiPython, SiKotlin, SiHtml5, SiCss,
  SiLaravel, SiCodeigniter, SiNodedotjs, SiVuedotjs, SiTailwindcss,
  SiPostgresql, SiMysql, SiRedis, SiDocker, SiNginx, SiGit, SiPostman
} from "react-icons/si";


import ProjectModal from "@/components/ui/ProjectModal";
import GitHubActivity from "@/components/sections/GitHubActivity";
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

  // Splash screen state
  const [showSplash, setShowSplash] = useState(true);
  const [splashFading, setSplashFading] = useState(false);
  
  // Testimonial index
  const [testiIdx, setTestiIdx] = useState(0);

  // Clock state
  const [jakartaTime, setJakartaTime] = useState("");


  // Tech Stack Matcher state
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);




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
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setJakartaTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse Cursor Trail Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.25) return; // limit density for performance
      
      const star = document.createElement("div");
      star.className = "cursor-star-particle";
      star.style.left = `${e.clientX}px`;
      star.style.top = `${e.clientY}px`;
      
      const colors = ["var(--accent-1)", "var(--accent-2)", "var(--accent-3)", "var(--accent-mint)"];
      star.style.color = colors[Math.floor(Math.random() * colors.length)];
      
      const size = Math.floor(Math.random() * 12) + 8;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      star.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>`;
      
      document.body.appendChild(star);
      
      setTimeout(() => {
        star.remove();
      }, 800);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);



  const isTechMatched = (name: string) => {
    if (!selectedNeed) return false;
    const lower = name.toLowerCase();
    if (selectedNeed === "ai") {
      return ["python", "bert", "naive bayes", "cnn", "random forest", "xgboost", "computer vision", "sentiment analysis"].includes(lower);
    }
    if (selectedNeed === "web") {
      return ["javascript", "vue.js", "tailwind css", "laravel", "codeigniter", "node.js", "golang", "golang (echo)", "html", "css"].includes(lower);
    }
    if (selectedNeed === "perf") {
      return ["postgresql", "mysql", "redis", "docker", "nginx", "git", "postman", "restful api", "mvc pattern"].includes(lower);
    }
    return false;
  };

  const isProjectMatched = (p: typeof projects[0]) => {
    if (!selectedNeed) return false;
    if (selectedNeed === "ai") {
      return ["ai / ml", "ai / nlp", "data science"].includes(p.type.toLowerCase());
    }
    if (selectedNeed === "web") {
      return ["web platform"].includes(p.type.toLowerCase());
    }
    if (selectedNeed === "perf") {
      return p.stack.some(tech => ["postgresql", "mysql", "redis", "docker", "nginx"].includes(tech.toLowerCase()));
    }
    return false;
  };

  useEffect(() => {
    const sections = ["beranda", "aktivitas", "karya", "keahlian", "pengalaman", "ulasan", "kontak"];
    
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
    <>
    {/* ═══ SPLASH SCREEN — SOLAR SYSTEM ═══ */}
    {showSplash && (
      <div className={`brutal-splash-overlay ${splashFading ? "splash-fade-out" : ""}`}>
        {/* Background Stars */}
        <div className="splash-stars-bg">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="y2k-star star-blink" style={{
              position: "absolute",
              width: `${6 + Math.random() * 14}px`,
              height: `${6 + Math.random() * 14}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              color: ["var(--accent-1)", "var(--accent-2)", "var(--accent-3)", "var(--accent-mint)", "#fff"][i % 5],
              animationDelay: `${Math.random() * 3}s`
            }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>
          ))}
        </div>

        {/* === SOLAR SYSTEM CONTAINER === */}
        <div className="solar-system-container">
          
          {/* Orbit Rings - scaled to fill viewport */}
          <div className="orbit-ring" style={{ width: "200px", height: "200px" }} />
          <div className="orbit-ring" style={{ width: "320px", height: "320px" }} />
          <div className="orbit-ring" style={{ width: "420px", height: "420px" }} />
          <div className="orbit-ring" style={{ width: "520px", height: "520px" }} />
          <div className="orbit-ring" style={{ width: "640px", height: "640px" }} />
          <div className="orbit-ring" style={{ width: "740px", height: "740px" }} />
          <div className="orbit-ring" style={{ width: "840px", height: "840px" }} />
          <div className="orbit-ring" style={{ width: "940px", height: "940px" }} />

          {/* ☀️ SUN (behind the card) */}
          <div className="solar-sun">
            <div className="solar-sun-glow" />
            <div className="solar-sun-core" />
          </div>

          {/* Mercury */}
          <div className="planet-orbit" style={{ width: "200px", height: "200px", animationDuration: "4s" }}>
            <div className="solar-planet" style={{ width: "14px", height: "14px", backgroundColor: "#bdc3c7", top: "-7px", left: "calc(50% - 7px)" }} />
          </div>

          {/* Venus */}
          <div className="planet-orbit" style={{ width: "320px", height: "320px", animationDuration: "7s" }}>
            <div className="solar-planet" style={{ width: "20px", height: "20px", backgroundColor: "#f4a261", top: "-10px", left: "calc(50% - 10px)" }} />
          </div>

          {/* 🌍 Earth */}
          <div className="planet-orbit" style={{ width: "420px", height: "420px", animationDuration: "10s" }}>
            <div className="solar-planet solar-earth" style={{ width: "22px", height: "22px", top: "-11px", left: "calc(50% - 11px)" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg, #3498db 40%, #2ecc71 40%, #2ecc71 60%, #3498db 60%)", border: "2.5px solid #fff" }} />
            </div>
          </div>

          {/* Mars */}
          <div className="planet-orbit" style={{ width: "520px", height: "520px", animationDuration: "14s", animationDirection: "reverse" }}>
            <div className="solar-planet" style={{ width: "18px", height: "18px", backgroundColor: "#e74c3c", top: "-9px", left: "calc(50% - 9px)" }} />
          </div>

          {/* Jupiter */}
          <div className="planet-orbit" style={{ width: "640px", height: "640px", animationDuration: "20s" }}>
            <div className="solar-planet" style={{ width: "38px", height: "38px", top: "-19px", left: "calc(50% - 19px)", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#d4a574", border: "3px solid #fff", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <div style={{ height: "4px", backgroundColor: "#c0956e", width: "100%" }} />
                <div style={{ height: "6px", backgroundColor: "#b5845a", width: "100%" }} />
                <div style={{ height: "4px", backgroundColor: "#c0956e", width: "100%" }} />
              </div>
            </div>
          </div>

          {/* 🪐 Saturn */}
          <div className="planet-orbit" style={{ width: "740px", height: "740px", animationDuration: "28s" }}>
            <div className="solar-planet" style={{ width: "32px", height: "32px", top: "-16px", left: "calc(50% - 16px)", border: "none", boxShadow: "none" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#f0c75e", border: "3px solid #fff", zIndex: 1, boxShadow: "0 0 10px rgba(240,199,94,0.5)" }} />
              <div style={{ position: "absolute", width: "55px", height: "14px", border: "2.5px solid rgba(255,255,255,0.8)", borderRadius: "50%", backgroundColor: "rgba(255,160,0,0.4)", transform: "rotate(-20deg) translate(-12px, 10px)", zIndex: 2 }} />
            </div>
          </div>

          {/* Uranus */}
          <div className="planet-orbit" style={{ width: "840px", height: "840px", animationDuration: "35s", animationDirection: "reverse" }}>
            <div className="solar-planet" style={{ width: "26px", height: "26px", backgroundColor: "#00d2d3", top: "-13px", left: "calc(50% - 13px)", boxShadow: "0 0 12px rgba(0,210,211,0.5), 3px 3px 0px rgba(0,0,0,0.5)" }} />
          </div>

          {/* Neptune */}
          <div className="planet-orbit" style={{ width: "940px", height: "940px", animationDuration: "42s" }}>
            <div className="solar-planet" style={{ width: "24px", height: "24px", backgroundColor: "#4a90e2", top: "-12px", left: "calc(50% - 12px)", boxShadow: "0 0 12px rgba(74,144,226,0.5), 3px 3px 0px rgba(0,0,0,0.5)" }} />
          </div>
        </div>

        {/* === NAME + NOTICE CARD (overlaid on solar system) === */}
        <div className="splash-overlay-content">
          <div className="brutal-splash-card">
            {/* Decorative top line */}
            <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent-1), var(--accent-3), var(--accent-mint))", opacity: 0.8 }} />

            <div style={{ padding: "40px 36px 32px" }}>
              {/* Animated Name */}
              <div className="splash-name-reveal">
                <span className="swiss-label-mono" style={{ fontSize: "11px", letterSpacing: "3px", color: "rgba(255,255,255,0.6)" }}>WELCOME TO THE PORTFOLIO OF</span>
                <h1 className="splash-name-text">
                  ERGA WANDA<br/>AFRIZA
                </h1>
                <div style={{ width: "80px", height: "3px", background: "linear-gradient(90deg, var(--accent-1), var(--accent-3))", margin: "16px auto 0", borderRadius: "2px" }} />
              </div>

              {/* Desktop Warning */}
              <div className="splash-warning-box">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "22px" }}>⚠️</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px" }}>Screen Optimization Notice</span>
                </div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", lineHeight: "1.6", color: "rgba(255,255,255,0.8)", margin: 0 }}>
                  For the ultimate neubrutalist & cosmic interactive experience, this website is best viewed on <strong style={{ color: "#fff" }}>desktop or laptop</strong> devices with a screen width of 1024px or above.
                </p>
              </div>

              {/* GOT IT Button */}
              <button
                className="brutal-btn splash-got-it-btn"
                onClick={() => {
                  setSplashFading(true);
                  setTimeout(() => setShowSplash(false), 600);
                }}
              >
                GOT IT, PROCEED 🚀
              </button>
            </div>

            {/* Decorative bottom line */}
            <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent-mint), var(--accent-1), var(--accent-3))", opacity: 0.8 }} />
          </div>
        </div>
      </div>
    )}

    <div className="brutal-layout-wrapper bg-dots-pattern">
      {/* Huge Cosmic Nebula Aura Glows */}
      <div className="cosmic-nebula" style={{ top: "10%", left: "15%", width: "450px", height: "450px", backgroundColor: "#ff007f", opacity: 0.12 }} />
      <div className="cosmic-nebula" style={{ top: "45%", right: "10%", width: "500px", height: "500px", backgroundColor: "#00f0ff", opacity: 0.10, animationDelay: "-5s" }} />
      <div className="cosmic-nebula" style={{ bottom: "10%", left: "20%", width: "400px", height: "400px", backgroundColor: "#ffd700", opacity: 0.08, animationDelay: "-10s" }} />

      {/* 1. Desktop Sticky Sidebar Navigasi */}
      <aside className="brutal-sidebar" style={{ overflow: "hidden" }}>
        
        {/* Sidebar Cosmic Decoration */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, opacity: 0.8 }}>
          {/* Mini planet float */}
          <div className="planet-float-slow" style={{ position: "absolute", top: "12px", right: "12px", width: "36px", height: "36px" }}>
            <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "var(--accent-3)", border: "2px solid var(--ink-brutal)" }} />
            {/* Ring */}
            <div style={{ position: "absolute", width: "50px", height: "12px", border: "2px solid var(--ink-brutal)", borderRadius: "50%", backgroundColor: "var(--accent-1)", transform: "rotate(-15deg) translate(-8px, 12px)" }} />
          </div>
          {/* Y2K Stars */}
          <div className="y2k-star star-blink" style={{ position: "absolute", bottom: "100px", left: "15px", width: "12px", height: "12px", color: "var(--accent-mint)" }}>
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
          </div>
          <div className="y2k-star star-blink" style={{ position: "absolute", bottom: "160px", right: "20px", width: "10px", height: "10px", color: "var(--accent-2)", animationDelay: "0.7s" }}>
            <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
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

        {/* SECTION 1: HERO / PROFILE */}
        <section id="beranda" className="brutal-section" style={{ position: "relative", overflow: "hidden" }}>
          
          {/* Cosmic Background Elements */}
          <div className="cosmic-bg-container" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
            {/* Dashed orbit ring */}
            <div className="retro-orbit-dashed orbit-rotate" style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", border: "2px dashed rgba(18, 18, 18, 0.15)", top: "-100px", left: "-100px" }} />
            
            {/* Saturn Retro Planet */}
            <div className="retro-saturn-wrapper planet-float" style={{ position: "absolute", top: "10%", right: "8%", width: "120px", height: "120px" }}>
              <div className="retro-saturn-ring" style={{ position: "absolute", width: "160px", height: "40px", border: "4px solid var(--ink-brutal)", borderRadius: "50%", backgroundColor: "var(--accent-3)", transform: "rotate(-15deg) translate(-20px, 40px)", zIndex: 2, boxShadow: "4px 4px 0px var(--ink-brutal)" }} />
              <div className="retro-saturn-ball" style={{ position: "absolute", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "var(--accent-1)", border: "4px solid var(--ink-brutal)", zIndex: 1, boxShadow: "6px 6px 0px var(--ink-brutal)" }} />
            </div>

            {/* Little Jupiter Planet */}
            <div className="retro-jupiter planet-float-slow" style={{ position: "absolute", bottom: "15%", left: "5%", width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "var(--accent-2)", border: "3px solid var(--ink-brutal)", boxShadow: "4px 4px 0px var(--ink-brutal)" }} />

            {/* Retro 4-point Stars */}
            <div className="y2k-star star-blink" style={{ position: "absolute", top: "25%", left: "45%", width: "24px", height: "24px", color: "var(--accent-1)" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>
            <div className="y2k-star star-blink" style={{ position: "absolute", bottom: "35%", right: "45%", width: "32px", height: "32px", color: "var(--accent-mint)", animationDelay: "0.8s" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>
            <div className="y2k-star star-blink" style={{ position: "absolute", top: "70%", left: "20%", width: "18px", height: "18px", color: "var(--accent-3)", animationDelay: "1.4s" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>

            {/* Shooting Stars */}
            <div className="shooting-star" style={{ top: "10%", left: "30%", animationDelay: "0s" }} />
            <div className="shooting-star" style={{ top: "20%", left: "60%", animationDelay: "2.5s" }} />
            <div className="shooting-star" style={{ top: "40%", left: "20%", animationDelay: "5s" }} />

            {/* Retro Neubrutalist Astronaut Helmet Sticker */}
            <div className="retro-astronaut float-astronaut" style={{ position: "absolute", bottom: "8%", right: "32%", width: "70px", height: "70px", zIndex: 3 }}>
              {/* Outer Helmet */}
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#ffffff", border: "3.5px solid var(--ink-brutal)", boxShadow: "5px 5px 0px var(--ink-brutal)" }}>
                {/* Visor */}
                <div style={{ position: "absolute", top: "22%", left: "15%", width: "70%", height: "45%", borderRadius: "20px", backgroundColor: "#00e1d9", border: "2.5px solid var(--ink-brutal)", overflow: "hidden" }}>
                  {/* Glass glare */}
                  <div style={{ position: "absolute", top: "10%", left: "10%", width: "50%", height: "25%", backgroundColor: "rgba(255,255,255,0.6)", borderRadius: "10px" }} />
                </div>
                {/* Antenna */}
                <div style={{ position: "absolute", top: "-15%", left: "45%", width: "8px", height: "15px", backgroundColor: "var(--ink-brutal)" }} />
                <div style={{ position: "absolute", top: "-24px", left: "38%", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "var(--accent-1)", border: "2.5px solid var(--ink-brutal)" }} />
              </div>
            </div>

            {/* Rotating Starburst Sticker Badge */}
            <div className="retro-starburst" style={{ position: "absolute", top: "45%", left: "45%", width: "80px", height: "80px", zIndex: 3, animation: "orbit-rotate 25s linear infinite" }}>
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                <path d="M50 0 L58 35 L90 20 L70 50 L100 62 L65 65 L75 95 L50 80 L25 95 L35 65 L0 62 L30 50 L10 20 L42 35 Z" fill="var(--accent-3)" stroke="var(--ink-brutal)" strokeWidth="4" />
                <text x="50" y="55" textAnchor="middle" fill="var(--ink-brutal)" fontSize="10" fontWeight="900" fontFamily="var(--font-mono)">AI/ML</text>
              </svg>
            </div>
          </div>
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

              {/* Live Developer Dashboard Widget */}
              <div className="double-layer-card" style={{ marginTop: "32px", width: "100%", maxWidth: "580px" }}>
                <div className="card-back back-accent-mint" style={{ transform: "rotate(-0.5deg)" }} />
                <div className="card-front" style={{ padding: "16px", backgroundColor: "var(--surface)", display: "flex", flexDirection: "column", gap: "12px" }}>
                  
                  {/* Status header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--ink-brutal)", paddingBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="live-pulse-dot" />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "var(--ink-brutal)" }}>
                        LIVE STATUS: ACTIVE DEVELOPING
                      </span>
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: "bold", backgroundColor: "var(--bg-brutal)", padding: "2px 8px", border: "1.5px solid var(--ink-brutal)", boxShadow: "1.5px 1.5px 0px var(--ink-brutal)" }}>
                      🕒 {jakartaTime || "16:00:00"} WIB
                    </div>
                  </div>

                  {/* Body widget info */}
                  <div className="live-dashboard-flex" style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
                    <style>{`
                      .live-dashboard-flex {
                        flex-direction: column;
                      }
                      .live-dashboard-stats-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 8px;
                      }
                      @media (min-width: 480px) {
                        .live-dashboard-flex {
                          flex-direction: row !important;
                        }
                        .live-dashboard-stats-grid {
                          flex-grow: 1;
                        }
                      }
                    `}</style>
                    
                    {/* Spotify segment */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", backgroundColor: "var(--bg-brutal)", border: "1.5px solid var(--ink-brutal)", borderRadius: "4px", flexGrow: 1, minWidth: "180px" }}>
                      <div className="spotify-visualizer" style={{ display: "flex", gap: "2.5px", alignItems: "flex-end", height: "18px" }}>
                        <span className="visualizer-bar bar-1" />
                        <span className="visualizer-bar bar-2" />
                        <span className="visualizer-bar bar-3" />
                        <span className="visualizer-bar bar-4" />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                        <span style={{ fontSize: "9px", fontFamily: "var(--font-mono)", color: "gray", fontWeight: "bold" }}>JAMMING ON SPOTIFY</span>
                        <span style={{ fontSize: "11px", fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "var(--ink-brutal)" }}>Lofi Coding Beats ☕</span>
                      </div>
                    </div>

                    {/* Stats counters */}
                    <div className="live-dashboard-stats-grid">
                      <div style={{ textAlign: "center", padding: "6px", border: "1.5px solid var(--ink-brutal)", backgroundColor: "var(--surface)" }}>
                        <div style={{ fontSize: "13px", fontWeight: "900", color: "var(--accent-1)" }}>☕ 4 Cups</div>
                        <div style={{ fontSize: "8.5px", fontFamily: "var(--font-mono)", fontWeight: "bold", color: "gray" }}>COFFEE LEVEL</div>
                      </div>
                      <div style={{ textAlign: "center", padding: "6px", border: "1.5px solid var(--ink-brutal)", backgroundColor: "var(--surface)" }}>
                        <div style={{ fontSize: "13px", fontWeight: "900", color: "var(--accent-mint)" }}>🐛 18 Squashed</div>
                        <div style={{ fontSize: "8.5px", fontFamily: "var(--font-mono)", fontWeight: "bold", color: "gray" }}>BUGS RESOLVED</div>
                      </div>
                    </div>
                  </div>
                </div>
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

        <div className="brutal-divider-stripes" />

        {/* SECTION: GITHUB ACTIVITY */}
        <GitHubActivity />

        <div className="brutal-divider-stripes" />

        {/* SECTION 3: GALERI KARYA */}
        <section id="karya" className="brutal-section" style={{ backgroundColor: "var(--surface)", color: "var(--ink-brutal)", overflow: "hidden", position: "relative" }}>
          
          {/* Cosmic Background - Earth */}
          <div className="cosmic-bg-container" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
            <div className="retro-earth planet-float-slow" style={{ position: "absolute", top: "15%", left: "4%", width: "90px", height: "90px" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#3a86c8", border: "3.5px solid var(--ink-brutal)", boxShadow: "5px 5px 0px var(--ink-brutal)", overflow: "hidden" }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                  <path d="M15,40 Q25,30 35,45 T60,35 T80,50 T95,30 L100,100 L0,100 Z" fill="#69b34c" />
                  <path d="M70,10 Q80,25 90,15 T95,5 Z" fill="#69b34c" />
                </svg>
              </div>
              
              {/* Orbiting Satellite Container */}
              <div className="retro-satellite orbit-sat" style={{ position: "absolute", width: "20px", height: "20px", top: "35px", left: "35px", zIndex: 3 }}>
                {/* Satellite Body */}
                <div style={{ width: "12px", height: "12px", borderRadius: "2px", backgroundColor: "var(--accent-1)", border: "2px solid var(--ink-brutal)" }} />
                {/* Solar Panels */}
                <div style={{ position: "absolute", top: "4px", left: "-6px", width: "6px", height: "4px", backgroundColor: "#fff", border: "1.5px solid var(--ink-brutal)" }} />
                <div style={{ position: "absolute", top: "4px", right: "-6px", width: "6px", height: "4px", backgroundColor: "#fff", border: "1.5px solid var(--ink-brutal)" }} />
              </div>
            </div>
            {/* Blinking Y2K Stars */}
            <div className="y2k-star star-blink" style={{ position: "absolute", top: "45%", left: "80%", width: "20px", height: "20px", color: "var(--accent-3)" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>
          </div>

          <div className="brutal-container" style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <span className="swiss-label-mono">[ PORTFOLIO / KARYA ]</span>
            <h2 className="karya-title">
              Building in public.<br />
              <span style={{ color: "var(--accent-1)" }}>Project highlights.</span>
            </h2>

            <div className="projects-collage">
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  className={`browser-window-card card-pos-${idx} ${isProjectMatched(p) ? "matched-highlight-project" : ""}`}
                  onClick={() => setSelectedProject(p)}
                >
                  {/* Brutalist window header */}
                  <div className="browser-window-header">
                    <div className="browser-dot dot-red" />
                    <div className="browser-dot dot-yellow" />
                    <div className="browser-dot dot-green" />
                    <div className="browser-window-title">
                      {p.url && p.url !== "#" ? p.url.replace("https://", "") : `${p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.app`}
                    </div>
                  </div>

                  {/* Browser image viewport */}
                  <div className="browser-window-viewport">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      unoptimized
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Neubrutalist Info Body */}
                  <div className="browser-window-info">
                    <span className="info-year">{p.year}</span>
                    <h3 className="info-title">{p.title}</h3>
                    <p className="info-desc">{p.desc}</p>
                    <div className="info-stack">
                      {p.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="info-tag">
                          {tech}
                        </span>
                      ))}
                      {p.stack.length > 4 && (
                        <span className="info-tag" style={{ border: "none", background: "none", boxShadow: "none", paddingLeft: 0, paddingRight: 0 }}>
                          +{p.stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="brutal-divider-stripes" />

        {/* SECTION 4: KEAHLIAN TEKNIS */}
        <section id="keahlian" className="brutal-section" style={{ position: "relative", overflow: "hidden" }}>
          
          {/* Cosmic Background - Mars */}
          <div className="cosmic-bg-container" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
            <div className="retro-mars planet-float" style={{ position: "absolute", top: "10%", right: "6%", width: "80px", height: "80px" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#e76f51", border: "3.5px solid var(--ink-brutal)", boxShadow: "5px 5px 0px var(--ink-brutal)" }}>
                <div style={{ position: "absolute", top: "20%", left: "30%", width: "16px", height: "16px", borderRadius: "50%", border: "2px solid var(--ink-brutal)", backgroundColor: "#d65d44" }} />
                <div style={{ position: "absolute", top: "60%", left: "20%", width: "12px", height: "12px", borderRadius: "50%", border: "2px solid var(--ink-brutal)", backgroundColor: "#d65d44" }} />
                <div style={{ position: "absolute", top: "45%", left: "65%", width: "18px", height: "18px", borderRadius: "50%", border: "2px solid var(--ink-brutal)", backgroundColor: "#d65d44" }} />
              </div>
              
              {/* Orbiting Satellite around Mars */}
              <div className="retro-satellite orbit-sat" style={{ position: "absolute", width: "20px", height: "20px", top: "30px", left: "30px", zIndex: 3, animationDuration: "16s" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--accent-3)", border: "2px solid var(--ink-brutal)" }} />
              </div>
            </div>
            {/* Blinking Y2K Stars */}
            <div className="y2k-star star-blink" style={{ position: "absolute", top: "75%", left: "5%", width: "24px", height: "24px", color: "var(--accent-1)", animationDelay: "0.5s" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>
            
            {/* Shooting Star */}
            <div className="shooting-star" style={{ top: "30%", left: "15%", animationDelay: "1.2s" }} />
          </div>

          <div className="brutal-grid-12" style={{ position: "relative", zIndex: 2 }}>
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

            {/* Tech Matcher Widget */}
            <div className="double-layer-card" style={{ marginBottom: "40px", width: "100%" }}>
              <div className="card-back back-accent-mint" style={{ transform: "rotate(-0.5deg)" }} />
              <div className="card-front" style={{ backgroundColor: "var(--surface)", padding: "24px" }}>
                <span className="swiss-label-mono">[ PILIH KEBUTUHAN ANDA ]</span>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", fontSize: "18px", marginTop: "6px", marginBottom: "16px", color: "var(--ink-brutal)" }}>
                  Tech Stack & Project Matcher
                </h4>
                <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px", lineHeight: "1.5" }}>
                  Klik salah satu opsi kebutuhan di bawah ini untuk melihat teknologi yang relevan dan karya yang sesuai langsung disorot pada portofolio:
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  {[
                    { id: "ai", label: "🧠 Kecerdasan Buatan (AI/ML & NLP)", color: "var(--accent-1)" },
                    { id: "web", label: "💻 Web Platform & Fullstack Dev", color: "var(--accent-3)" },
                    { id: "perf", label: "🚀 High Performance & Database/DevOps", color: "var(--accent-mint)" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedNeed(selectedNeed === btn.id ? null : btn.id)}
                      className="brutal-btn-outline"
                      style={{
                        padding: "10px 18px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        fontFamily: "var(--font-mono)",
                        backgroundColor: selectedNeed === btn.id ? btn.color : "var(--surface)",
                        color: "var(--ink-brutal)",
                        transform: selectedNeed === btn.id ? "translate(-3px, -3px)" : "none",
                        boxShadow: selectedNeed === btn.id ? "6px 6px 0px var(--ink-brutal)" : "3px 3px 0px var(--ink-brutal)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {btn.label}
                    </button>
                  ))}
                  {selectedNeed && (
                    <button
                      onClick={() => setSelectedNeed(null)}
                      style={{
                        padding: "10px 18px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        fontFamily: "var(--font-mono)",
                        border: "none",
                        background: "none",
                        color: "gray",
                        cursor: "pointer",
                      }}
                    >
                      [ Reset Sorotan ]
                    </button>
                  )}
                </div>
              </div>
            </div>

          <div style={{ marginTop: "60px", borderTop: "3px dashed var(--ink-brutal)", paddingTop: "40px" }}>
            <span className="swiss-label-mono">[ STACK / TOOLS ]</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 900, textTransform: "uppercase", fontSize: "32px", lineHeight: "1.1", marginTop: 8, marginBottom: "40px", color: "var(--ink-brutal)" }}>
              Tools I wield.<br />
              <span style={{ color: "var(--accent-1)" }}>Precision instruments for intelligent systems.</span>
            </h3>

            {/* Marquee Row 1: Languages & Backend Frameworks */}
            <div className="stack-marquee-row" style={{ borderBottom: "1px solid rgba(18, 18, 18, 0.08)", paddingBottom: "20px" }}>
              <div className="stack-marquee-content marquee-left">
                {[
                  { name: "JavaScript", icon: <SiJavascript style={{ color: "#F7DF1E" }} /> },
                  { name: "Golang", icon: <SiGo style={{ color: "#00ADD8" }} /> },
                  { name: "Python", icon: <SiPython style={{ color: "#3776AB" }} /> },
                  { name: "Kotlin", icon: <SiKotlin style={{ color: "#7F52FF" }} /> },
                  { name: "HTML", icon: <SiHtml5 style={{ color: "#E34F26" }} /> },
                  { name: "CSS", icon: <SiCss style={{ color: "#1572B6" }} /> },
                  { name: "Golang (Echo)", icon: <SiGo style={{ color: "#00ADD8" }} /> },
                  { name: "Laravel", icon: <SiLaravel style={{ color: "#FF2D20" }} /> },
                  { name: "CodeIgniter", icon: <SiCodeigniter style={{ color: "#EE4326" }} /> },
                  { name: "Node.js", icon: <SiNodedotjs style={{ color: "#339933" }} /> },
                ].concat([
                  { name: "JavaScript", icon: <SiJavascript style={{ color: "#F7DF1E" }} /> },
                  { name: "Golang", icon: <SiGo style={{ color: "#00ADD8" }} /> },
                  { name: "Python", icon: <SiPython style={{ color: "#3776AB" }} /> },
                  { name: "Kotlin", icon: <SiKotlin style={{ color: "#7F52FF" }} /> },
                  { name: "HTML", icon: <SiHtml5 style={{ color: "#E34F26" }} /> },
                  { name: "CSS", icon: <SiCss style={{ color: "#1572B6" }} /> },
                  { name: "Golang (Echo)", icon: <SiGo style={{ color: "#00ADD8" }} /> },
                  { name: "Laravel", icon: <SiLaravel style={{ color: "#FF2D20" }} /> },
                  { name: "CodeIgniter", icon: <SiCodeigniter style={{ color: "#EE4326" }} /> },
                  { name: "Node.js", icon: <SiNodedotjs style={{ color: "#339933" }} /> },
                ]).map((item, idx) => (
                  <div key={idx} className={`stack-pill ${isTechMatched(item.name) ? "matched-highlight" : ""}`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 2: Frontend & Databases & Concepts */}
            <div className="stack-marquee-row" style={{ borderBottom: "1px solid rgba(18, 18, 18, 0.08)", padding: "20px 0" }}>
              <div className="stack-marquee-content marquee-right">
                {[
                  { name: "Vue.js", icon: <SiVuedotjs style={{ color: "#4FC08D" }} /> },
                  { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
                  { name: "PostgreSQL", icon: <SiPostgresql style={{ color: "#4169E1" }} /> },
                  { name: "MySQL", icon: <SiMysql style={{ color: "#4479A1" }} /> },
                  { name: "Redis", icon: <SiRedis style={{ color: "#DC382D" }} /> },
                  { name: "Computer Vision", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Sentiment Analysis", icon: <FiCode style={{ color: "var(--ink-brutal)" }} /> },
                ].concat([
                  { name: "Vue.js", icon: <SiVuedotjs style={{ color: "#4FC08D" }} /> },
                  { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: "#06B6D4" }} /> },
                  { name: "PostgreSQL", icon: <SiPostgresql style={{ color: "#4169E1" }} /> },
                  { name: "MySQL", icon: <SiMysql style={{ color: "#4479A1" }} /> },
                  { name: "Redis", icon: <SiRedis style={{ color: "#DC382D" }} /> },
                  { name: "Computer Vision", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Sentiment Analysis", icon: <FiCode style={{ color: "var(--ink-brutal)" }} /> },
                ]).map((item, idx) => (
                  <div key={idx} className={`stack-pill ${isTechMatched(item.name) ? "matched-highlight" : ""}`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 3: ML Models & DevOps & Architecture */}
            <div className="stack-marquee-row" style={{ paddingTop: "20px" }}>
              <div className="stack-marquee-content marquee-left">
                {[
                  { name: "CNN", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Naive Bayes", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "BERT", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Random Forest", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "XGBoost", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Docker", icon: <SiDocker style={{ color: "#2496ED" }} /> },
                  { name: "Nginx", icon: <SiNginx style={{ color: "#009639" }} /> },
                  { name: "Git", icon: <SiGit style={{ color: "#F05032" }} /> },
                  { name: "Postman", icon: <SiPostman style={{ color: "#FF6C37" }} /> },
                  { name: "RESTful API", icon: <FiGlobe style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "MVC Pattern", icon: <FiLayers style={{ color: "var(--ink-brutal)" }} /> },
                ].concat([
                  { name: "CNN", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Naive Bayes", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "BERT", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Random Forest", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "XGBoost", icon: <FiCpu style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "Docker", icon: <SiDocker style={{ color: "#2496ED" }} /> },
                  { name: "Nginx", icon: <SiNginx style={{ color: "#009639" }} /> },
                  { name: "Git", icon: <SiGit style={{ color: "#F05032" }} /> },
                  { name: "Postman", icon: <SiPostman style={{ color: "#FF6C37" }} /> },
                  { name: "RESTful API", icon: <FiGlobe style={{ color: "var(--ink-brutal)" }} /> },
                  { name: "MVC Pattern", icon: <FiLayers style={{ color: "var(--ink-brutal)" }} /> },
                ]).map((item, idx) => (
                  <div key={idx} className={`stack-pill ${isTechMatched(item.name) ? "matched-highlight" : ""}`}>
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <div className="brutal-divider-stripes" />

        {/* SECTION 5: PENGALAMAN XP */}
        <section id="pengalaman" className="brutal-section" style={{ backgroundColor: "var(--surface)", position: "relative", overflow: "hidden" }}>
          
          {/* Cosmic Background - Neptune */}
          <div className="cosmic-bg-container" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
            <div className="retro-neptune planet-float-slow" style={{ position: "absolute", top: "40%", left: "4%", width: "85px", height: "85px" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#4a90e2", border: "3.5px solid var(--ink-brutal)", boxShadow: "5px 5px 0px var(--ink-brutal)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <div style={{ height: "4px", backgroundColor: "#357abd", width: "100%" }} />
                <div style={{ height: "6px", backgroundColor: "#357abd", width: "100%" }} />
                <div style={{ height: "4px", backgroundColor: "#357abd", width: "100%" }} />
              </div>
              
              {/* Orbiting space probe */}
              <div className="retro-satellite orbit-sat" style={{ position: "absolute", width: "14px", height: "14px", top: "35px", left: "35px", zIndex: 3, animationDuration: "14s" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "1px", backgroundColor: "var(--accent-2)", border: "1.5px solid var(--ink-brutal)" }} />
              </div>
            </div>
            {/* Blinking Y2K Stars */}
            <div className="y2k-star star-blink" style={{ position: "absolute", top: "15%", right: "8%", width: "22px", height: "22px", color: "var(--accent-mint)", animationDelay: "1.1s" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>
            
            {/* Shooting Star */}
            <div className="shooting-star" style={{ top: "20%", left: "40%", animationDelay: "3s" }} />

            {/* Retro Rocket Sticker */}
            <div className="retro-rocket float-astronaut" style={{ position: "absolute", top: "10%", right: "12%", width: "60px", height: "60px", zIndex: 1 }}>
              <svg viewBox="0 0 64 64" width="100%" height="100%">
                <path d="M26,45 L32,58 L38,45 Z" fill="var(--accent-1)" stroke="var(--ink-brutal)" strokeWidth="3" />
                <rect x="24" y="16" width="16" height="30" rx="8" fill="#ffffff" stroke="var(--ink-brutal)" strokeWidth="3" />
                <path d="M24,35 L12,46 L24,46 Z" fill="var(--accent-2)" stroke="var(--ink-brutal)" strokeWidth="3" />
                <path d="M40,35 L52,46 L40,46 Z" fill="var(--accent-2)" stroke="var(--ink-brutal)" strokeWidth="3" />
                <circle cx="32" cy="26" r="4" fill="#000000" />
              </svg>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
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
          </div>
        </section>

        <div className="brutal-divider-stripes" />

        {/* SECTION 6: AKADEMIK & ULASAN CLIENT */}
        <section id="ulasan" className="brutal-section" style={{ position: "relative", overflow: "hidden" }}>
          
          {/* Cosmic Background - Venus & UFO */}
          <div className="cosmic-bg-container" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
            <div className="retro-venus planet-float" style={{ position: "absolute", top: "15%", right: "8%", width: "75px", height: "75px" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#f4a261", border: "3.5px solid var(--ink-brutal)", boxShadow: "5px 5px 0px var(--ink-brutal)", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                <div style={{ height: "4px", backgroundColor: "#e76f51", width: "100%", transform: "rotate(10deg)" }} />
                <div style={{ height: "4px", backgroundColor: "#e76f51", width: "100%", transform: "rotate(10deg)" }} />
              </div>
            </div>
            {/* Blinking Y2K Stars */}
            <div className="y2k-star star-blink" style={{ position: "absolute", bottom: "25%", left: "45%", width: "20px", height: "20px", color: "var(--accent-2)" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z" /></svg>
            </div>
            
            {/* Shooting Star */}
            <div className="shooting-star" style={{ top: "45%", left: "60%", animationDelay: "2s" }} />

            {/* Retro UFO Sticker */}
            <div className="retro-ufo float-astronaut" style={{ position: "absolute", bottom: "12%", left: "4%", width: "70px", height: "50px", zIndex: 1 }}>
              <svg viewBox="0 0 64 48" width="100%" height="100%">
                <path d="M16,20 C16,8 48,8 48,20 Z" fill="#00f0ff" stroke="var(--ink-brutal)" strokeWidth="3" />
                <ellipse cx="32" cy="24" rx="28" ry="10" fill="var(--accent-mint)" stroke="var(--ink-brutal)" strokeWidth="3" />
                <circle cx="20" cy="24" r="2" fill="#fff" />
                <circle cx="32" cy="24" r="2" fill="#fff" />
                <circle cx="44" cy="24" r="2" fill="#fff" />
              </svg>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 2 }}>
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
          </div>
        </section>

        <div className="brutal-divider-stripes" />

        {/* SECTION 7: KONTAK TRANSMISI */}
        <section id="kontak" className="brutal-section" style={{ borderBottom: "none", backgroundColor: "var(--surface)", position: "relative", overflow: "hidden" }}>
          
          {/* Cosmic Background - Moon */}
          <div className="cosmic-bg-container" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
            <div className="retro-moon planet-float" style={{ position: "absolute", bottom: "10%", right: "5%", width: "70px", height: "70px" }}>
              <div style={{ position: "absolute", width: "100%", height: "100%", borderRadius: "50%", backgroundColor: "#bdc3c7", border: "3.5px solid var(--ink-brutal)", boxShadow: "4px 4px 0px var(--ink-brutal)" }}>
                <div style={{ position: "absolute", top: "15%", left: "20%", width: "12px", height: "12px", borderRadius: "50%", border: "1.5px solid var(--ink-brutal)", backgroundColor: "#95a5a6" }} />
                <div style={{ position: "absolute", top: "50%", left: "45%", width: "14px", height: "14px", borderRadius: "50%", border: "1.5px solid var(--ink-brutal)", backgroundColor: "#95a5a6" }} />
                <div style={{ position: "absolute", top: "55%", left: "15%", width: "10px", height: "10px", borderRadius: "50%", border: "1.5px solid var(--ink-brutal)", backgroundColor: "#95a5a6" }} />
              </div>
              
              {/* Orbiting landing capsule */}
              <div className="retro-satellite orbit-sat" style={{ position: "absolute", width: "12px", height: "12px", top: "25px", left: "25px", zIndex: 3, animationDuration: "10s" }}>
                <div style={{ width: "6px", height: "6px", backgroundColor: "#fff", border: "1.5px solid var(--ink-brutal)" }} />
              </div>
            </div>
            
            {/* Shooting Star */}
            <div className="shooting-star" style={{ bottom: "30%", left: "25%", animationDelay: "4.5s" }} />
          </div>

          <div className="brutal-grid-12" style={{ position: "relative", zIndex: 2 }}>
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
    </>
  );
}
