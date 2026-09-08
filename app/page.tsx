"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import { FaWhatsapp, FaGithub } from "react-icons/fa";

import ProjectModal from "@/components/ui/ProjectModal";
import { projects } from "@/data/projects";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Masculine, high-contrast, bold athletic ocean palette
  const nameRow1 = [
    { char: "E", color: "#FFFFFF" },
    { char: "R", color: "#38BDF8" },
    { char: "G", color: "#FACC15" },
    { char: "A", color: "#FFFFFF" },
  ];
  const nameRow2 = [
    { char: "W", color: "#38BDF8" },
    { char: "A", color: "#FACC15" },
    { char: "N", color: "#FFFFFF" },
    { char: "D", color: "#38BDF8" },
    { char: "A", color: "#FACC15" },
  ];
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleOceanClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest(".draggable-ocean-letter") || target.closest(".draggable-duck")) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now() + Math.random(), x, y };
    setRipples((prev) => [...prev.slice(-8), newRipple]);
  };

  const categories = ["ALL", "Web Platform", "AI & ML", "Data Science"];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "ALL": return { bg: "#FACC15", text: "#000000" }; // Caution Yellow
      case "Web Platform": return { bg: "#38BDF8", text: "#020B14" }; // Electric Cyan
      case "AI & ML": return { bg: "#F97316", text: "#000000" }; // Beacon Orange
      case "Data Science": return { bg: "#10B981", text: "#022C22" }; // Tactical Emerald
      default: return { bg: "#FACC15", text: "#000000" };
    }
  };

  const getTechBadgeStyle = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes("c#") || t.includes(".net") || t.includes("asp") || t.includes("sql server")) {
      return { bg: "#BAE6FD", text: "#0369A1" }; // Azure Sky
    }
    if (t.includes("vue") || t.includes("react") || t.includes("frontend") || t.includes("html") || t.includes("css") || t.includes("motion") || t.includes("tailwind")) {
      return { bg: "#BBF7D0", text: "#047857" }; // Tactical Emerald
    }
    if (t.includes("ai") || t.includes("ml") || t.includes("vision") || t.includes("cnn") || t.includes("bert") || t.includes("python") || t.includes("nlp")) {
      return { bg: "#FED7AA", text: "#9A3412" }; // Beacon Orange
    }
    if (t.includes("golang") || t.includes("docker") || t.includes("redis") || t.includes("nginx") || t.includes("postgres") || t.includes("git")) {
      return { bg: "#E2E8F0", text: "#0F172A" }; // Gunmetal Slate
    }
    if (t.includes("laravel") || t.includes("php")) {
      return { bg: "#FEF08A", text: "#78350F" }; // Amber Gold
    }
    return { bg: "#E2E8F0", text: "#1E293B" }; // Steel
  };

  const projectCardThemes = [
    { headerBg: "#E0F2FE", dotColor: "#0284C7", badgeBg: "#BAE6FD", badgeText: "#0369A1", shadow: "#0284C7" },
    { headerBg: "#FEF3C7", dotColor: "#D97706", badgeBg: "#FDE68A", badgeText: "#92400E", shadow: "#D97706" },
    { headerBg: "#DCFCE7", dotColor: "#059669", badgeBg: "#A7F3D0", badgeText: "#065F46", shadow: "#059669" },
    { headerBg: "#FFEDD5", dotColor: "#EA580C", badgeBg: "#FED7AA", badgeText: "#9A3412", shadow: "#EA580C" },
    { headerBg: "#E2E8F0", dotColor: "#334155", badgeBg: "#CBD5E1", badgeText: "#0F172A", shadow: "#0F172A" },
  ];

  const filteredProjects = selectedCategory === "ALL"
    ? projects
    : projects.filter((p) => {
        if (selectedCategory === "Web Platform") return p.type === "Web Platform";
        if (selectedCategory === "AI & ML") return p.type.includes("AI") || p.type.includes("NLP");
        if (selectedCategory === "Data Science") return p.type === "Data Science";
        return true;
      });

  const getCardSpanClass = (id: number, isFiltered: boolean) => {
    if (isFiltered) return "masonry-span-6";
    switch (id) {
      case 1: return "masonry-span-8";
      case 2: return "masonry-span-4";
      case 3: return "masonry-span-5";
      case 4: return "masonry-span-7";
      case 5: return "masonry-span-12";
      default: return "masonry-span-6";
    }
  };

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
          subject: contactForm.subject || "Portfolio Contact Message",
          message: contactForm.message
        })
      });

      if (response.ok) {
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setSent(true);
        setTimeout(() => setSent(false), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.warn("API Error. Using Fallback Mailto...", err);
      const mailto = `mailto:ewandaafriza@gmail.com?subject=${encodeURIComponent(
        contactForm.subject || "Message from Portfolio"
      )}&body=${encodeURIComponent(
        `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\n${contactForm.message}`
      )}`;
      window.open(mailto, "_blank");
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } finally {
      setSending(false);
    }
  };

  // Stepper process data (Curated Coastal Pastel Accents)
  const processSteps = [
    {
      num: "01",
      title: "DISCOVER",
      span: "masonry-span-4",
      desc: "Memahami tujuan bisnis, kebutuhan pengguna, dan dekonstruksi sistem secara komprehensif.",
      badge: "⚓ SCOPING TAHAP AWAL",
      headerBg: "#E0F2FE",
      badgeBg: "#BAE6FD",
      badgeText: "#0369A1",
    },
    {
      num: "02",
      title: "IDEATE",
      span: "masonry-span-4",
      desc: "Merancang arsitektur sistem, skema database relasional, dan spesifikasi API berkinerja tinggi.",
      badge: "🧭 BLUEPRINT SISTEM",
      headerBg: "#FEF3C7",
      badgeBg: "#FDE68A",
      badgeText: "#92400E",
    },
    {
      num: "03",
      title: "DESIGN",
      span: "masonry-span-4",
      desc: "Mendesain antarmuka Neubrutalist yang tegas, kontras tinggi, dan nyaman bagi pengguna.",
      badge: "🎨 UI/UX DESIGN",
      headerBg: "#DCFCE7",
      badgeBg: "#BBF7D0",
      badgeText: "#047857",
    },
    {
      num: "04",
      title: "DEVELOP",
      span: "masonry-span-6",
      desc: "Membangun sistem backend enterprise dengan C# .NET / Golang, clean architecture, dan caching.",
      badge: "⚡ ENTERPRISE STACK",
      headerBg: "#FFEDD5",
      badgeBg: "#FED7AA",
      badgeText: "#9A3412",
    },
    {
      num: "05",
      title: "DELIVER",
      span: "masonry-span-6",
      desc: "Deployment containerized via Docker dan Nginx, pengujian menyeluruh, dan pemantauan performa.",
      badge: "🚢 SIAP PRODUKSI",
      headerBg: "#E2E8F0",
      badgeBg: "#CBD5E1",
      badgeText: "#0F172A",
    }
  ];

  return (
    <div className="relative min-h-screen text-[#0F172A] bg-[#F8FAFC] font-body selection:bg-[#38BDF8] selection:text-[#020B14]" style={{ overflowX: "hidden", maxWidth: "100vw" }}>
      
      {/* ============================================================
          TACTICAL NEUBRUTALIST NAVBAR — PURE CSS RESPONSIVE (NO TAILWIND)
          ============================================================ */}
      <header className="tactical-navbar-wrapper">
        <div className="tactical-navbar">

          {/* Brand Logo — always visible */}
          <a href="#about" className="navbar-brand">
            <div className="navbar-logo-badge">EW</div>
            <div className="navbar-brand-text">
              <span className="navbar-brand-name">ERGA WANDA</span>
              <span className="navbar-brand-role">IT DEV @ RDS GROUP</span>
            </div>
          </a>

          {/* Desktop nav links — hidden on mobile via CSS */}
          <nav className="navbar-desktop">
            <a href="#projects" className="tactical-nav-link">Proyek</a>
            <a href="#experience" className="tactical-nav-link">Pengalaman</a>
            <a href="#skills" className="tactical-nav-link">Keahlian</a>
            <a href="#process" className="tactical-nav-link">Alur Kerja</a>
            <a href="#contact" className="tactical-nav-link">Kontak</a>
          </nav>

          {/* Desktop CTA buttons — hidden on mobile via CSS */}
          <div className="navbar-desktop navbar-actions">
            <button
              onClick={() => setContactModalOpen(true)}
              className="btn-beach-cyan"
              style={{ padding: "7px 16px", fontSize: "12px", boxShadow: "2.5px 2.5px 0px #000" }}
            >
              ✉ Hubungi Saya
            </button>
            <a
              href="https://github.com/ErgaWanda"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-beach-dark"
              style={{ padding: "7px 12px", fontSize: "12px", boxShadow: "2.5px 2.5px 0px #000" }}
              aria-label="GitHub Profile"
            >
              <FaGithub style={{ fontSize: "15px" }} />
            </a>
          </div>

          {/* Hamburger button — hidden on desktop via CSS */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-mobile navbar-hamburger"
            aria-label="Toggle Navigation Menu"
            style={{
              background: mobileMenuOpen ? "#EF4444" : "#FACC15",
              color: mobileMenuOpen ? "#FFFFFF" : "#000000",
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* ============================================================
          MOBILE DRAWER — FIXED OVERLAY (outside header, no layout shift)
          ============================================================ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay — tap to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 190,
                background: "rgba(0,0,0,0.3)",
              }}
            />
            {/* The actual drawer panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 280, damping: 24 }}
              className="mobile-nav-drawer"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  { label: "Proyek Pilihan", href: "#projects", icon: "🚀", badge: "PORTFOLIO" },
                  { label: "Pengalaman Kerja", href: "#experience", icon: "💼", badge: "RDS GROUP" },
                  { label: "Keahlian Teknis", href: "#skills", icon: "🛠️", badge: "5 PILAR" },
                  { label: "Alur Kerja", href: "#process", icon: "⚡", badge: "METODOLOGI" },
                  { label: "Hubungi Saya", href: "#contact", icon: "✉️", badge: "KONTAK" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-item"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span style={{
                      fontSize: "9px",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 800,
                      background: "#E2E8F0",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      border: "1px solid #000",
                    }}>
                      {item.badge}
                    </span>
                  </a>
                ))}
              </div>

              {/* Mobile CTA */}
              <div style={{ borderTop: "2px solid #000000", paddingTop: "12px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }}
                  className="btn-beach-cyan"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  ✉ Kirim Pesan
                </button>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <a href="https://wa.me/6288291067259" target="_blank" rel="noopener noreferrer"
                    className="btn-beach-white" style={{ justifyContent: "center", fontSize: "12px", padding: "8px 10px" }}>
                    <FaWhatsapp style={{ color: "#16A34A", fontSize: "14px" }} />
                    WhatsApp
                  </a>
                  <a href="https://github.com/ErgaWanda" target="_blank" rel="noopener noreferrer"
                    className="btn-beach-dark" style={{ justifyContent: "center", fontSize: "12px", padding: "8px 10px" }}>
                    <FaGithub style={{ fontSize: "14px" }} />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ============================================================
          HERO SECTION: VIBRANT TROPICAL OCEAN & SUNNY BEACH SHORE
          Direct reference from user screenshot (ryhndastra.site style)
          ============================================================ */}
      <section 
        className="ocean-hero-canvas" 
        id="about" 
        onClick={handleOceanClick}
        style={{ marginTop: "-56px", paddingTop: "80px", cursor: "pointer", position: "relative", overflowX: "hidden" }}
      >
        {/* Interactive Water Ripple Rings on Click */}
        {ripples.map((rip) => (
          <motion.div
            key={rip.id}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: 4.2, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: rip.y - 25,
              left: rip.x - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "2.5px solid rgba(255, 255, 255, 0.9)",
              boxShadow: "0 0 14px rgba(56, 189, 248, 0.8)",
              pointerEvents: "none",
              zIndex: 7,
            }}
          />
        ))}

        {/* Animated Flying Seagulls in Sky/Sea */}
        <div className="anim-seagull" style={{ position: "absolute", top: "110px", left: "12%", zIndex: 5, pointerEvents: "none" }}>
          <svg width="44" height="22" viewBox="0 0 50 25" fill="none">
            <path d="M2 18 C12 6, 22 10, 25 18 C28 10, 38 6, 48 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <div className="anim-seagull" style={{ position: "absolute", top: "160px", right: "18%", zIndex: 5, pointerEvents: "none", animationDelay: "3s" }}>
          <svg width="32" height="16" viewBox="0 0 50 25" fill="none" opacity="0.85">
            <path d="M2 18 C12 6, 22 10, 25 18 C28 10, 38 6, 48 18" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Animated Leaping Dolphin / Fish in the Sea */}
        <div className="anim-dolphin" style={{ position: "absolute", top: "270px", right: "12%", zIndex: 6, pointerEvents: "none" }}>
          <svg width="60" height="42" viewBox="0 0 60 42" fill="none">
            <path d="M5 26 C15 10, 35 5, 52 16 C45 20, 38 25, 30 25 C25 30, 20 32, 12 30 C15 28, 18 25, 12 25 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <path d="M30 11 L36 2 L38 12 Z" fill="#0284C7" />
            <circle cx="46" cy="15" r="1.5" fill="#020B14" />
            <circle cx="8" cy="30" r="1.5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="12" cy="34" r="2" fill="#FFFFFF" opacity="0.6" />
          </svg>
        </div>

        {/* Rising Ocean Bubbles */}
        <div className="anim-bubble-1" style={{ position: "absolute", bottom: "160px", left: "20%", zIndex: 6, pointerEvents: "none" }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(56,189,248,0.3))", border: "1px solid rgba(255,255,255,0.7)" }} />
        </div>
        <div className="anim-bubble-2" style={{ position: "absolute", bottom: "180px", left: "24%", zIndex: 6, pointerEvents: "none" }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(56,189,248,0.3))", border: "1px solid rgba(255,255,255,0.7)" }} />
        </div>
        <div className="anim-bubble-3" style={{ position: "absolute", bottom: "150px", right: "24%", zIndex: 6, pointerEvents: "none" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(56,189,248,0.3))", border: "1px solid rgba(255,255,255,0.7)" }} />
        </div>

        {/* ============================================================
            DRAGGABLE CRUSING RUBBER DUCK (Directly on the water, no box!)
            ============================================================ */}
        <motion.div
          drag
          dragConstraints={{ left: -30, right: 300, top: -100, bottom: 150 }}
          dragElastic={0.25}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
          whileHover={{ scale: 1.2, cursor: "grab" }}
          whileDrag={{ scale: 1.35, rotate: -10, cursor: "grabbing", zIndex: 100 }}
          className="anim-duck-cruise draggable-duck"
          style={{
            position: "absolute",
            top: "330px",
            left: "9%",
            zIndex: 25,
            touchAction: "none",
            userSelect: "none",
          }}
          title="Seret bebek ini kemana saja di lautan! 🐤"
        >
          <div className="anim-duck" style={{ position: "relative", display: "inline-block" }}>
            {/* Cute Cartoon Speech Bubble Floating Over Duck */}
            <div 
              className="comic-bubble" 
              style={{ 
                position: "absolute", 
                top: "-34px", 
                left: "22px", 
                whiteSpace: "nowrap",
                fontSize: "11px",
                transform: "rotate(-4deg)",
                pointerEvents: "none",
                zIndex: 30,
              }}
            >
              <span>Kwek! Seret aku yuk 🦆</span>
            </div>

            <svg width="54" height="48" viewBox="0 0 48 44" fill="none" style={{ filter: "drop-shadow(0 6px 14px rgba(2, 44, 80, 0.45))" }}>
              {/* Expanding water ripples around swimming duck */}
              <ellipse cx="24" cy="38" rx="20" ry="4" fill="rgba(255, 255, 255, 0.55)" />
              <ellipse cx="24" cy="38" rx="14" ry="2.5" fill="rgba(255, 255, 255, 0.9)" />
              
              {/* Rubber duck body */}
              <ellipse cx="24" cy="27" rx="17" ry="11" fill="#FACC15" stroke="#000000" strokeWidth="2.2" />
              {/* Duck head */}
              <circle cx="17" cy="16" r="11" fill="#FACC15" stroke="#000000" strokeWidth="2.2" />
              {/* Duck eye */}
              <circle cx="14" cy="14" r="2.4" fill="#000000" />
              <circle cx="15" cy="13" r="0.8" fill="#FFFFFF" />
              {/* Duck orange beak */}
              <path d="M7 16 C1 16, 0 20, 6 21 Z" fill="#F97316" stroke="#000000" strokeWidth="1.8" />
              {/* Duck wing */}
              <path d="M23 23 C30 22, 34 27, 28 32 C23 33, 20 28, 23 23 Z" fill="#EAB308" stroke="#000000" strokeWidth="1.8" />
              {/* Tail tuft */}
              <path d="M39 24 C44 21, 43 28, 38 29 Z" fill="#FACC15" stroke="#000000" strokeWidth="1.8" />
            </svg>
          </div>
        </motion.div>

        {/* Animated Rolling Ocean Wave Belt 1 (Upper Ocean Swells) */}
        <div style={{ position: "absolute", top: "135px", left: 0, width: "200%", height: "50px", pointerEvents: "none", zIndex: 3, opacity: 0.38, overflow: "hidden" }}>
          <div className="anim-wave-flow-1" style={{ width: "200%", display: "flex" }}>
            <svg viewBox="0 0 1200 40" fill="none" preserveAspectRatio="none" style={{ width: "50%", height: "30px", flexShrink: 0 }}>
              <path d="M0,20 Q150,2 300,20 T600,20 T900,20 T1200,20" stroke="#FFFFFF" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            </svg>
            <svg viewBox="0 0 1200 40" fill="none" preserveAspectRatio="none" style={{ width: "50%", height: "30px", flexShrink: 0 }}>
              <path d="M0,20 Q150,2 300,20 T600,20 T900,20 T1200,20" stroke="#FFFFFF" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Animated Rolling Ocean Wave Belt 2 (Mid Ocean Rolling Swells with Foam) */}
        <div style={{ position: "absolute", top: "245px", left: 0, width: "200%", height: "65px", pointerEvents: "none", zIndex: 3, opacity: 0.6, overflow: "hidden" }}>
          <div className="anim-wave-flow-2" style={{ width: "200%", display: "flex" }}>
            <svg viewBox="0 0 1200 50" fill="none" preserveAspectRatio="none" style={{ width: "50%", height: "38px", flexShrink: 0 }}>
              <path d="M0,25 C100,5 200,45 300,25 C400,5 500,45 600,25 C700,5 800,45 900,25 C1000,5 1100,45 1200,25" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M0,30 C100,10 200,50 300,30 C400,10 500,50 600,30 C700,10 800,50 900,30 C1000,10 1100,50 1200,30" stroke="rgba(56, 189, 248, 0.65)" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <svg viewBox="0 0 1200 50" fill="none" preserveAspectRatio="none" style={{ width: "50%", height: "38px", flexShrink: 0 }}>
              <path d="M0,25 C100,5 200,45 300,25 C400,5 500,45 600,25 C700,5 800,45 900,25 C1000,5 1100,45 1200,25" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M0,30 C100,10 200,50 300,30 C400,10 500,50 600,30 C700,10 800,50 900,30 C1000,10 1100,50 1200,30" stroke="rgba(56, 189, 248, 0.65)" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Animated Rolling Ocean Wave Belt 3 (Lower Breaking Waves near Duck) */}
        <div style={{ position: "absolute", top: "355px", left: 0, width: "200%", height: "65px", pointerEvents: "none", zIndex: 3, opacity: 0.72, overflow: "hidden" }}>
          <div className="anim-wave-flow-3" style={{ width: "200%", display: "flex" }}>
            <svg viewBox="0 0 1200 50" fill="none" preserveAspectRatio="none" style={{ width: "50%", height: "42px", flexShrink: 0 }}>
              <path d="M0,20 C80,38 180,5 280,22 C380,38 480,5 580,22 C680,38 780,5 880,22 C980,38 1080,5 1200,20" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <path d="M20,24 C100,42 160,10 260,26 M320,24 C400,42 460,10 560,26 M620,24 C700,42 760,10 860,26" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <svg viewBox="0 0 1200 50" fill="none" preserveAspectRatio="none" style={{ width: "50%", height: "42px", flexShrink: 0 }}>
              <path d="M0,20 C80,38 180,5 280,22 C380,38 480,5 580,22 C680,38 780,5 880,22 C980,38 1080,5 1200,20" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <path d="M20,24 C100,42 160,10 260,26 M320,24 C400,42 460,10 560,26 M620,24 C700,42 760,10 860,26" stroke="rgba(255,255,255,0.75)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Sunlight Glimmer / Water Highlights */}
        <div className="anim-glimmer" style={{ position: "absolute", top: "185px", left: "26%", zIndex: 4, pointerEvents: "none" }}>
          <svg width="42" height="16" viewBox="0 0 42 16" fill="none">
            <ellipse cx="21" cy="7" rx="19" ry="3.5" fill="rgba(255, 255, 255, 0.7)" />
            <ellipse cx="15" cy="12" rx="8" ry="1.8" fill="rgba(255, 255, 255, 0.5)" />
          </svg>
        </div>
        <div className="anim-glimmer" style={{ position: "absolute", top: "275px", right: "30%", zIndex: 4, pointerEvents: "none", animationDelay: "1.8s" }}>
          <svg width="48" height="18" viewBox="0 0 48 18" fill="none">
            <ellipse cx="24" cy="8" rx="21" ry="4" fill="rgba(255, 255, 255, 0.75)" />
            <ellipse cx="32" cy="14" rx="10" ry="2" fill="rgba(255, 255, 255, 0.6)" />
          </svg>
        </div>

        {/* Drifting Red & White Lifebuoy Ring (Pelampung) 🛟 */}
        <div className="anim-buoy" style={{ position: "absolute", top: "220px", right: "7%", zIndex: 6, pointerEvents: "none" }}>
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" style={{ filter: "drop-shadow(0 4px 10px rgba(2, 44, 80, 0.45))" }}>
            <circle cx="23" cy="23" r="19" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
            <circle cx="23" cy="23" r="9" fill="#0369A1" stroke="#000000" strokeWidth="2" />
            {/* Red quarters */}
            <path d="M23 4 A19 19 0 0 1 37 10 L31 16 A9 9 0 0 0 23 14 Z" fill="#EF4444" />
            <path d="M37 36 A19 19 0 0 1 23 42 L23 32 A9 9 0 0 0 31 30 Z" fill="#EF4444" />
            <path d="M9 36 A19 19 0 0 1 4 23 L14 23 A9 9 0 0 0 15 30 Z" fill="#EF4444" />
            <path d="M4 23 A19 19 0 0 1 10 9 L16 16 A9 9 0 0 0 14 23 Z" fill="#EF4444" />
            {/* Grab rope */}
            <circle cx="23" cy="23" r="21" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="5 3" />
          </svg>
        </div>

        {/* Floating Message in a Glass Bottle 🍾 */}
        <div className="anim-bottle" style={{ position: "absolute", top: "370px", left: "5%", zIndex: 6, pointerEvents: "none" }}>
          <svg width="42" height="42" viewBox="0 0 40 40" fill="none" style={{ filter: "drop-shadow(0 4px 8px rgba(2, 44, 80, 0.35))" }}>
            {/* Cork */}
            <rect x="25" y="6" width="6" height="5" rx="1.5" fill="#B45309" stroke="#000" strokeWidth="1.2" />
            {/* Bottle neck */}
            <path d="M24 10 L28 10 L25 18 L19 18 Z" fill="rgba(186, 230, 253, 0.85)" stroke="#000" strokeWidth="1.5" />
            {/* Bottle body */}
            <ellipse cx="16" cy="24" rx="12" ry="7" transform="rotate(-30 16 24)" fill="rgba(186, 230, 253, 0.75)" stroke="#000" strokeWidth="1.8" />
            {/* Secret parchment roll inside */}
            <rect x="10" y="21" width="10" height="4" rx="1" transform="rotate(-30 10 21)" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />
            {/* Glass reflection */}
            <path d="M12 18 C16 14, 20 18, 22 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
          </svg>
        </div>

        {/* School of Cute Swimming Tropical Fish (🐟 🐠) */}
        <div className="anim-fish-school" style={{ position: "absolute", top: "305px", left: "0%", zIndex: 5, pointerEvents: "none" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {/* Fish 1 */}
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none">
              <path d="M3 8 C8 3, 16 3, 21 8 C16 13, 8 13, 3 8 Z" fill="#F97316" stroke="#000" strokeWidth="1" />
              <path d="M21 8 L24 4 L24 12 Z" fill="#F97316" stroke="#000" strokeWidth="1" />
              <circle cx="7" cy="7" r="1" fill="#000" />
            </svg>
            {/* Fish 2 */}
            <svg width="18" height="12" viewBox="0 0 24 16" fill="none" style={{ marginTop: "8px" }}>
              <path d="M3 8 C8 3, 16 3, 21 8 C16 13, 8 13, 3 8 Z" fill="#FACC15" stroke="#000" strokeWidth="1" />
              <path d="M21 8 L24 4 L24 12 Z" fill="#FACC15" stroke="#000" strokeWidth="1" />
              <circle cx="7" cy="7" r="1" fill="#000" />
            </svg>
            {/* Fish 3 */}
            <svg width="20" height="14" viewBox="0 0 24 16" fill="none" style={{ marginTop: "-6px" }}>
              <path d="M3 8 C8 3, 16 3, 21 8 C16 13, 8 13, 3 8 Z" fill="#2DD4BF" stroke="#000" strokeWidth="1" />
              <path d="M21 8 L24 4 L24 12 Z" fill="#2DD4BF" stroke="#000" strokeWidth="1" />
              <circle cx="7" cy="7" r="1" fill="#000" />
            </svg>
          </div>
        </div>

        {/* ============================================================
            HERO MAIN HEADLINE (Centered Draggable Letters!)
            ============================================================ */}
        <div className="container-premium relative z-10 text-center" style={{ paddingTop: "30px", paddingBottom: "40px" }}>
          
          {/* Centered Draggable Interactive Letters: ERGA WANDA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "26px", userSelect: "none" }}>
            
            {/* Playful Cartoon Floating Drag Hint */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="comic-sticker"
              style={{
                background: "#FEF08A",
                color: "#0F172A",
                border: "2.5px solid #000000",
                boxShadow: "3px 3px 0px #000000",
                fontSize: "11.5px",
                marginBottom: "18px",
                transform: "rotate(-1deg)",
              }}
            >
              <span>✨</span>
              <span>Coba seret &amp; lempar setiap huruf di bawah!</span>
              <span>🌊</span>
            </motion.div>

            {/* Row 1: E R G A (Compact, Snug Gap!) */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(2px, 0.8vw, 6px)", marginBottom: "4px" }}>
              {nameRow1.map((item, index) => (
                <motion.span
                  key={`char-1-${index}`}
                  drag
                  dragConstraints={{ left: -140, right: 140, top: -90, bottom: 90 }}
                  dragElastic={0.4}
                  dragTransition={{ bounceStiffness: 350, bounceDamping: 18 }}
                  whileHover={{ scale: 1.15, rotate: (index % 2 === 0 ? 6 : -6), cursor: "grab" }}
                  whileDrag={{ scale: 1.3, rotate: (index % 2 === 0 ? 12 : -12), cursor: "grabbing", zIndex: 60 }}
                  className="draggable-ocean-letter"
                  style={{ color: item.color }}
                >
                  {item.char}
                </motion.span>
              ))}
            </div>

            {/* Row 2: W A N D A (Compact, Snug Gap!) */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(2px, 0.8vw, 6px)" }}>
              {nameRow2.map((item, index) => (
                <motion.span
                  key={`char-2-${index}`}
                  drag
                  dragConstraints={{ left: -140, right: 140, top: -90, bottom: 90 }}
                  dragElastic={0.4}
                  dragTransition={{ bounceStiffness: 350, bounceDamping: 18 }}
                  whileHover={{ scale: 1.15, rotate: (index % 2 === 0 ? -6 : 6), cursor: "grab" }}
                  whileDrag={{ scale: 1.3, rotate: (index % 2 === 0 ? -12 : 12), cursor: "grabbing", zIndex: 60 }}
                  className="draggable-ocean-letter"
                  style={{ color: item.color }}
                >
                  {item.char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle Description (Cartoon Neubrutalism) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(13px, 3.5vw, 18px)",
              fontWeight: 600,
              lineHeight: 1.6,
              color: "#FFFFFF",
              maxWidth: "600px",
              margin: "0 auto 24px auto",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              padding: "0 8px",
            }}
          >
            <strong>IT Developer di RDS Group</strong> dengan spesialisasi <strong>C# dan .NET</strong>. Membangun platform web skalabel, arsitektur backend enterprise, dan sistem cerdas berbasis AI.
          </motion.p>

          {/* Action Buttons (Neubrutalist Pill Buttons) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px", padding: "0 8px" }}
          >
            <a href="#projects" className="btn-beach-cyan">
              ↓ Lihat Proyek
            </a>

            <button 
              onClick={() => setContactModalOpen(true)}
              className="btn-beach-white"
            >
              ✉ Hubungi Saya
            </button>

            <a 
              href="https://github.com/ErgaWanda" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-beach-dark"
            >
              <FaGithub style={{ fontSize: "16px" }} />
              GitHub ↗
            </a>
          </motion.div>
        </div>

        {/* ============================================================
            WAVE WASH & WARM SANDY BEACH SHORE (Bottom 40% of Hero)
            With Palm Tree, Wooden Boat, Crab, Surfboard, Umbrella & Job Badge
            ============================================================ */}
        <div style={{ position: "relative", width: "100%", maxWidth: "100vw", zIndex: 10, overflowX: "hidden" }}>
          
          {/* Wave Foam Border (Where Ocean Meets Sand) */}
          <div style={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
            <svg viewBox="0 0 1440 90" fill="none" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "70px" }}>
              {/* Outer wave crest */}
              <path 
                d="M0,35 C320,65 520,10 760,42 C1000,74 1220,15 1440,38 L1440,90 L0,90 Z" 
                fill="#FDF3E3" 
              />
              {/* White wave foam edge */}
              <path 
                d="M0,32 C320,62 520,7 760,39 C1000,71 1220,12 1440,35" 
                stroke="#FFFFFF" 
                strokeWidth="7" 
                strokeLinecap="round" 
              />
              <path 
                d="M0,28 C340,58 540,5 780,36 C1020,68 1240,10 1440,32" 
                stroke="rgba(255, 255, 255, 0.45)" 
                strokeWidth="4" 
              />
            </svg>
          </div>

          {/* Sandy Beach Ground */}
          <div style={{
            background: "linear-gradient(180deg, #FDF3E3 0%, #FCE8C9 40%, #F8D9A8 100%)",
            color: "#0F172A",
            padding: "20px 24px 60px 24px",
            position: "relative",
            boxShadow: "inset 0 10px 25px rgba(217, 119, 6, 0.08)",
          }}>
            <div className="container-premium" style={{ position: "relative" }}>
              
              {/* Beach Illustration Elements Flex Bar */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "16px",
                minHeight: "150px",
              }}>
                
                {/* 1. Left: Tropical Palm Tree 🌴 (Hidden on mobile & tablet) */}
                <div className="hidden lg:flex" style={{ flexDirection: "column", alignItems: "center" }}>
                  <svg width="100" height="150" viewBox="0 0 100 150" fill="none">
                    {/* Palm Trunk */}
                    <path d="M48 150 C44 110, 52 75, 42 45" stroke="#92400E" strokeWidth="8" strokeLinecap="round" />
                    <path d="M47 130 L52 132 M46 105 L51 107 M47 80 L52 82 M45 60 L50 62" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
                    {/* Coconuts */}
                    <circle cx="40" cy="45" r="4.5" fill="#78350F" />
                    <circle cx="46" cy="46" r="4.5" fill="#0B2545" opacity="0.2" />
                    <circle cx="45" cy="48" r="4.5" fill="#78350F" />
                    {/* Palm Leaves */}
                    <path d="M42 45 C25 25, 5 35, 2 48" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
                    <path d="M42 45 C35 15, 20 8, 8 16" stroke="#16A34A" strokeWidth="5.5" strokeLinecap="round" />
                    <path d="M42 45 C45 10, 60 5, 75 14" stroke="#22C55E" strokeWidth="6" strokeLinecap="round" />
                    <path d="M42 45 C58 20, 80 25, 96 38" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
                    <path d="M42 45 C55 35, 75 50, 88 64" stroke="#15803D" strokeWidth="5" strokeLinecap="round" />
                    {/* Shadow on sand */}
                    <ellipse cx="50" cy="148" rx="24" ry="4" fill="rgba(180, 83, 9, 0.2)" />
                  </svg>
                </div>

                {/* 2. Center: Classic Wooden Boat 🛶 + Current Role Badge (Full Responsive) */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", flex: "1 1 200px", maxWidth: "420px", width: "100%", margin: "0 auto" }}>
                  
                  {/* Wooden Canoe Boat SVG */}
                  <svg width="180" height="52" viewBox="0 0 240 65" fill="none" style={{ maxWidth: "100%", width: "80%" }}>
                    {/* Boat shadow */}
                    <ellipse cx="120" cy="60" rx="90" ry="5" fill="rgba(180, 83, 9, 0.25)" />
                    {/* Boat Hull */}
                    <path d="M25 25 L50 56 L190 56 L215 25 Z" fill="#FDE047" stroke="#A16207" strokeWidth="2.5" />
                    {/* Inside floor */}
                    <path d="M35 25 L55 50 L185 50 L205 25 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                    {/* Mast / Paddle */}
                    <line x1="120" y1="5" x2="120" y2="58" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Life ring circle */}
                    <circle cx="140" cy="38" r="7" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" />
                    <circle cx="140" cy="38" r="3" fill="#FEF08A" />
                  </svg>

                  {/* High Contrast Neubrutalist Job Stamp Resting on Beach */}
                  <div style={{
                    background: "#FFFFFF",
                    border: "3px solid #000000",
                    boxShadow: "4px 4px 0px #000000",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "460px",
                  }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#0284C7", display: "inline-block" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 800, color: "#0F172A", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      IT DEVELOPER @ RDS GROUP
                    </span>
                    <span style={{ color: "#CBD5E1" }}>|</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, color: "#0369A1" }}>
                      02 SEP 2026 - PRESENT
                    </span>
                    <span style={{
                      background: "#0284C7",
                      color: "#FFFFFF",
                      fontSize: "9px",
                      fontWeight: 800,
                      fontFamily: "var(--font-mono)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}>
                      C# &amp; .NET
                    </span>
                  </div>
                </div>

                {/* 3. Right: Surfboard, Beach Umbrella & Cute Crab 🦀 (Hidden on mobile only) */}
                <div className="hidden md:flex" style={{ alignItems: "flex-end", gap: "12px" }}>
                  
                  {/* Beach Umbrella & Lounger SVG */}
                  <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
                    {/* Umbrella pole */}
                    <line x1="45" y1="35" x2="35" y2="85" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Umbrella canopy */}
                    <path d="M15 35 C15 15, 75 15, 75 35 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
                    <path d="M35 18 C30 25, 25 35, 25 35 L45 35 L45 15 Z" fill="#FFFFFF" />
                    <path d="M55 18 C60 25, 65 35, 65 35 L45 35 L45 15 Z" fill="#FFFFFF" />
                    {/* Beach lounger chair */}
                    <line x1="50" y1="80" x2="80" y2="80" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
                    <line x1="50" y1="80" x2="42" y2="68" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
                    <line x1="55" y1="80" x2="55" y2="86" stroke="#475569" strokeWidth="2" />
                    <line x1="75" y1="80" x2="75" y2="86" stroke="#475569" strokeWidth="2" />
                  </svg>

                  {/* Surfboard sticking in sand */}
                  <div style={{
                    width: "18px",
                    height: "65px",
                    borderRadius: "9999px 9999px 4px 4px",
                    background: "linear-gradient(180deg, #38BDF8 0%, #0284C7 50%, #F59E0B 100%)",
                    border: "2px solid #000000",
                    boxShadow: "3px 3px 0px #000000",
                    transform: "rotate(8deg)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{ width: "2px", height: "45px", background: "#FFFFFF" }} />
                  </div>

                  {/* Cute Animated Red Crab 🦀 */}
                  <div className="anim-crab" style={{ marginBottom: "6px" }}>
                    <svg width="42" height="30" viewBox="0 0 45 32" fill="none">
                      {/* Crab body */}
                      <ellipse cx="22" cy="18" rx="11" ry="8" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
                      {/* Crab eyes */}
                      <circle cx="17" cy="9" r="2.5" fill="#FFFFFF" stroke="#991B1B" strokeWidth="1" />
                      <circle cx="17" cy="9" r="1.2" fill="#000000" />
                      <circle cx="27" cy="9" r="2.5" fill="#FFFFFF" stroke="#991B1B" strokeWidth="1" />
                      <circle cx="27" cy="9" r="1.2" fill="#000000" />
                      {/* Crab claws */}
                      <path d="M12 15 C6 11, 4 4, 9 6 C12 8, 14 13, 12 15 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />
                      <path d="M32 15 C38 11, 40 4, 35 6 C32 8, 30 13, 32 15 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />
                      {/* Legs */}
                      <path d="M13 22 L7 27 M14 24 L9 30 M31 22 L37 27 M30 24 L35 30" stroke="#991B1B" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BRIGHT COASTAL BODY (SECTIONS 1 - 5: ALL LIGHT THEME!)
          Clean, sunny, vibrant Neubrutalism matching the beach aesthetic
          ============================================================ */}
      <div className="coastal-light-body" style={{ background: "#F8FAFC", color: "#0F172A", paddingTop: "40px" }}>

        {/* ============================================================
            SECTION 1: PROYEK PILIHAN (BRIGHT NEUBRUTALISM)
            ============================================================ */}
        <section className="relative z-10" id="projects" style={{ padding: "30px 0 50px 0" }}>
          <div className="container-premium">
            
            {/* Section Header Box (Light Theme) */}
            <div className="brutal-section-title-box">
              <div>
                <div style={{ fontFamily: "var(--font-cartoon)", fontSize: "12px", color: "#0284C7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                  // PORTOFOLIO &amp; KARYA UNGGULAN
                </div>
                <h2 style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "clamp(34px, 5vw, 48px)", letterSpacing: "0.02em", margin: 0, lineHeight: 1.1, color: "#0F172A" }}>
                  PROYEK <span style={{ color: "#0284C7" }}>PILIHAN</span>
                </h2>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span className="brutal-sticker brutal-sticker-yellow">
                  💥 {filteredProjects.length} PROYEK AKTIF
                </span>
                <span className="brutal-sticker" style={{ background: "#FFFFFF", border: "2.5px solid #000000", color: "#0F172A" }}>
                  🔍 KLIK KARTU UNTUK SPESIFIKASI
                </span>
              </div>
            </div>

            {/* Filter Category Tabs (Cartoon Neubrutalism) */}
            <div className="filter-tabs-wrapper">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const catTheme = getCategoryColor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`filter-tab-btn ${isActive ? "active" : ""}`}
                    style={isActive ? {
                      backgroundColor: catTheme.bg,
                      color: catTheme.text,
                      boxShadow: "4px 4px 0px #000000",
                      borderColor: "#000000",
                    } : undefined}
                  >
                    {cat === "ALL" ? `Semua Proyek (${projects.length})` : cat}
                  </button>
                );
              })}
            </div>

            {/* Responsive Card Grid with Varied Spans (Light Cards) */}
            <motion.div 
              className="masonry-container"
              layout
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, idx) => {
                  const isFiltered = selectedCategory !== "ALL";
                  const spanClass = getCardSpanClass(p.id, isFiltered);
                  const isFlagship = p.id === 1 && !isFiltered;
                  const isWideBanner = p.id === 5 && !isFiltered;
                  const cardTheme = projectCardThemes[(p.id - 1) % projectCardThemes.length];

                  return (
                    <motion.div 
                      layout
                      key={p.id}
                      className={`${spanClass} brutal-light-card`}
                      onClick={() => setSelectedProject(p)}
                      variants={fadeInUp}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 100, damping: 18 }}
                    >
                      {/* Top Window Titlebar */}
                      <div className="brutal-light-header" style={{ background: cardTheme.headerBg }}>
                        <div className="brutal-window-dots">
                          <span className="brutal-dot" style={{ backgroundColor: cardTheme.dotColor, width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                          <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                          <span className="brutal-dot" style={{ backgroundColor: "#4ADE80", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                          <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "11px", color: "#0F172A" }}>
                            PROJ-0{p.id}
                          </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "8.5px",
                            fontWeight: 800,
                            letterSpacing: "0.04em",
                            padding: "3px 8px",
                            borderRadius: "4px",
                            background: cardTheme.badgeBg,
                            color: cardTheme.badgeText,
                            border: "1.5px solid #000000",
                          }}>
                            {p.type}
                          </span>

                          {p.status === "live" ? (
                            <span style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "8.5px",
                              fontWeight: 800,
                              letterSpacing: "0.06em",
                              padding: "3px 8px",
                              borderRadius: "3px",
                              background: "#38BDF8",
                              color: "#020B14",
                              border: "1.5px solid #000000",
                              boxShadow: "1.5px 1.5px 0px #000000",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px"
                            }}>
                              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#0284C7", display: "inline-block" }} />
                              LIVE
                            </span>
                          ) : (
                            <span style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "8.5px",
                              fontWeight: 800,
                              letterSpacing: "0.05em",
                              padding: "3px 8px",
                              borderRadius: "3px",
                              background: "#FFFFFF",
                              color: "#475569",
                              border: "1.5px solid #000000",
                            }}>
                              STUDI KASUS
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Visual Media Showcase */}
                      <div style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: isFlagship ? "16/9" : isWideBanner ? "21/9" : p.id === 2 ? "4/3" : "16/10",
                        maxHeight: isWideBanner ? "300px" : isFlagship ? "360px" : "260px",
                        overflow: "hidden",
                        borderBottom: "2.5px solid #000000",
                        backgroundColor: "#E2E8F0",
                      }}>
                        <Image
                          src={p.img}
                          alt={p.title}
                          fill
                          unoptimized
                          style={{ objectFit: "cover", objectPosition: "top center" }}
                          className="transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      {/* Card Content Details (Light Theme Typography) */}
                      <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                            <h3 style={{
                              fontFamily: "var(--font-cartoon)",
                              fontSize: isFlagship ? "22px" : "18px",
                              fontWeight: 700,
                              color: "#0F172A",
                              letterSpacing: "0.01em",
                              lineHeight: 1.25,
                            }}>
                              {p.title}
                            </h3>
                            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#0284C7", fontWeight: 800 }}>
                              {p.year}
                            </span>
                          </div>

                          <p style={{
                            fontSize: "13px",
                            color: "#334155",
                            lineHeight: 1.6,
                            marginBottom: "16px",
                          }}>
                            {p.desc}
                          </p>

                          {/* Large Card Highlights Preview (Flagship & Wide Banner only) */}
                          {(isFlagship || isWideBanner) && p.highlights && (
                            <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
                              {p.highlights.slice(0, 2).map((hl, hli) => (
                                <div key={hli} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#1E293B" }}>
                                  <span style={{ color: "#0284C7", fontWeight: "bold" }}>◈</span>
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div>
                          {/* Stack badges with intelligent colors */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                            {p.stack.slice(0, isFlagship || isWideBanner ? 6 : 4).map((tech) => {
                              const tStyle = getTechBadgeStyle(tech);
                              return (
                                <span 
                                  key={tech}
                                  className="brutal-light-pill"
                                  style={{
                                    backgroundColor: tStyle.bg,
                                    color: tStyle.text,
                                  }}
                                >
                                  {tech}
                                </span>
                              );
                            })}
                            {p.stack.length > (isFlagship || isWideBanner ? 6 : 4) && (
                              <span style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "#64748B", alignSelf: "center", fontWeight: 700 }}>
                                +{p.stack.length - (isFlagship || isWideBanner ? 6 : 4)}
                              </span>
                            )}
                          </div>

                          {/* Action Row */}
                          <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderTop: "2px solid #E2E8F0",
                            paddingTop: "14px",
                          }}>
                            <span style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              fontWeight: 800,
                              color: "#0284C7",
                              letterSpacing: "0.06em",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}>
                              Eksplorasi Spesifikasi ➔
                            </span>

                            {p.url && p.url !== "#" && (
                              <a
                                href={p.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="btn-beach-cyan"
                                style={{ padding: "5px 14px", fontSize: "11px", boxShadow: "2px 2px 0px #000" }}
                              >
                                Kunjungi Situs ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: PENGALAMAN KERJA & PENDIDIKAN (BRIGHT NEUBRUTALISM)
            ============================================================ */}
        <section className="relative z-10" id="experience" style={{ padding: "40px 0" }}>
          <div className="container-premium">
            
            {/* Section Header Box */}
            <div className="brutal-section-title-box">
              <div>
                <div style={{ fontFamily: "var(--font-cartoon)", fontSize: "12px", color: "#0284C7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                  // REKAM JEJAK PROFESIONAL &amp; AKADEMIS
                </div>
                <h2 style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "clamp(34px, 5vw, 48px)", letterSpacing: "0.02em", margin: 0, lineHeight: 1.1, color: "#0F172A" }}>
                  PENGALAMAN &amp; <span style={{ color: "#0284C7" }}>PENDIDIKAN</span>
                </h2>
              </div>

              <div className="brutal-sticker brutal-sticker-teal">
                ⚡ KARIER &amp; PENDIDIKAN
              </div>
            </div>

            {/* Responsive Bento Grid Layout */}
            <motion.div 
              className="masonry-container"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Bento Card 1 (Span 7): RDS Group (FEATURED CURRENT ROLE) */}
              <motion.div 
                className="masonry-span-7 brutal-light-card-featured"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#E0F2FE" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot brutal-dot-cyan" />
                    <span className="brutal-dot brutal-dot-teal" />
                    <span className="brutal-dot brutal-dot-coral" />
                    <span style={{ marginLeft: "6px" }}>PEKERJAAN UTAMA // AKTIF</span>
                  </div>
                  <span className="brutal-sticker brutal-sticker-cyan" style={{ padding: "2px 8px", fontSize: "8.5px" }}>
                    PERUSAHAAN SAAT INI
                  </span>
                </div>

                <div style={{ padding: "26px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                    <div>
                      <span className="brutal-sticker" style={{ background: "#F1F5F9", border: "2px solid #000", color: "#0F172A", marginBottom: "10px" }}>
                        💼 RDS GROUP (PT REYCOM DOCUMENT SOLUSI)
                      </span>
                      <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "24px", fontWeight: 700, color: "#0F172A" }}>
                        IT Developer
                      </h3>
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#020B14",
                      background: "#38BDF8",
                      border: "2px solid #000000",
                      padding: "5px 12px",
                      borderRadius: "4px",
                      boxShadow: "3px 3px 0px #000000",
                      whiteSpace: "nowrap",
                    }}>
                      02 SEP 2026 - PRESENT
                    </span>
                  </div>

                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", color: "#0284C7", fontWeight: 800, marginBottom: "14px" }}>
                    TECH STACK: C# • .NET 8 • ASP.NET CORE • SQL SERVER • DOCUMENT AUTOMATION
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13.5px", color: "#334155", lineHeight: 1.6 }}>
                      <span style={{ color: "#0284C7", fontWeight: "bold", marginTop: "2px" }}>◈</span>
                      <span>Mengembangkan dan mengelola arsitektur backend enterprise, web services, dan workflow otomasi pemrosesan dokumen menggunakan <strong>C# dan .NET</strong>.</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13.5px", color: "#334155", lineHeight: 1.6 }}>
                      <span style={{ color: "#0284C7", fontWeight: "bold", marginTop: "2px" }}>◈</span>
                      <span>Merancang dan mengintegrasikan RESTful APIs yang aman, berkecepatan tinggi, dan andal untuk platform otomasi dokumen bisnis.</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13.5px", color: "#334155", lineHeight: 1.6 }}>
                      <span style={{ color: "#0284C7", fontWeight: "bold", marginTop: "2px" }}>◈</span>
                      <span>Melakukan optimasi query database relasional, manajemen indexing, dan menjaga reliabilitas sistem transaksi bervolume tinggi.</span>
                    </li>
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "20px", paddingTop: "14px", borderTop: "2px solid #E2E8F0" }}>
                    {["C#", ".NET 8", "ASP.NET Core", "SQL Server", "RESTful API", "MVC Pattern", "Otomasi Dokumen"].map((tag) => {
                      const tStyle = getTechBadgeStyle(tag);
                      return (
                        <span key={tag} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Bento Card 2 (Span 5): LSP CoachPro */}
              <motion.div 
                className="masonry-span-5 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#DCFCE7" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#16A34A", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#38BDF8", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>SERTIFIKASI BNSP</span>
                  </div>
                  <span style={{ color: "#166534", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>MAGANGHUB</span>
                </div>

                <div style={{ padding: "24px 26px" }}>
                  <span className="brutal-sticker brutal-sticker-teal" style={{ marginBottom: "10px" }}>
                    ⚡ LSP COACHPRO INDONESIA
                  </span>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>
                      Full Stack Developer
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#64748B", fontWeight: 700 }}>
                      DES 2025 - JUN 2026
                    </span>
                  </div>

                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#0D9488", fontWeight: 800, marginBottom: "12px" }}>
                    TECH: GOLANG • ECHO • REDIS • POSTGRESQL • DOCKER
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#334155", lineHeight: 1.55 }}>
                      <span style={{ color: "#0D9488", fontWeight: "bold" }}>◈</span>
                      <span>Membangun platform manajemen sertifikasi BNSP dari nol, mendigitalisasi workflow pra-asesmen hingga keputusan kompetensi.</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#334155", lineHeight: 1.55 }}>
                      <span style={{ color: "#0D9488", fontWeight: "bold" }}>◈</span>
                      <span>Mengimplementasikan in-memory caching Redis pada backend Golang Echo untuk menangani traffic bersamaan pada jam sibuk.</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#334155", lineHeight: 1.55 }}>
                      <span style={{ color: "#0D9488", fontWeight: "bold" }}>◈</span>
                      <span>Deploy dan pemeliharaan container Docker serta Nginx reverse proxy pada Linux VPS.</span>
                    </li>
                  </ul>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "18px", paddingTop: "12px", borderTop: "2px solid #E2E8F0" }}>
                    {["Golang", "Echo", "Redis", "PostgreSQL", "Docker", "Nginx"].map((tag) => {
                      const tStyle = getTechBadgeStyle(tag);
                      return (
                        <span key={tag} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Bento Card 3 (Span 6): Pusdatin Kemhan */}
              <motion.div 
                className="masonry-span-6 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#EDE9FE" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#8B5CF6", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#38BDF8", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>KEMENTERIAN PERTAHANAN RI</span>
                  </div>
                  <span style={{ color: "#5B21B6", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>PUSDATIN</span>
                </div>

                <div style={{ padding: "24px 26px" }}>
                  <span className="brutal-sticker brutal-sticker-cyan" style={{ marginBottom: "10px" }}>
                    🏛️ PUSDATIN KEMENHAN RI
                  </span>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>
                      Software Engineer Intern
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#64748B", fontWeight: 700 }}>
                      JUN 2024 - DES 2024
                    </span>
                  </div>

                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#6D28D9", fontWeight: 800, marginBottom: "12px" }}>
                    TECH: LARAVEL • VUE.JS • MYSQL • RESTFUL SERVICES
                  </p>

                  <p style={{ fontSize: "13px", color: "#334155", lineHeight: 1.6, marginBottom: "14px" }}>
                    Merancang dan meluncurkan 3 sistem manajemen internal (Portal Informasi Pegawai, Kalender Kegiatan, dan Sistem Laporan Harian) selama 6 bulan masa magang, menggantikan pencatatan fisik manual dengan sistem terintegrasi.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Laravel", "Vue.js", "MySQL", "REST API", "Database Relasional"].map((tag) => {
                      const tStyle = getTechBadgeStyle(tag);
                      return (
                        <span key={tag} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Bento Card 4 (Span 6): Education & Degree */}
              <motion.div 
                className="masonry-span-6 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#FEF3C7" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#F59E0B", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#4ADE80", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>AKADEMIK // GELAR</span>
                  </div>
                  <span className="brutal-sticker brutal-sticker-yellow" style={{ padding: "2px 8px", fontSize: "9px" }}>
                    IPK: 3.23 / 4.00
                  </span>
                </div>

                <div style={{ padding: "24px 26px" }}>
                  <span className="brutal-sticker" style={{ background: "#FFFFFF", border: "2px solid #000", color: "#0F172A", marginBottom: "10px" }}>
                    🎓 UNIVERSITAS DARMA PERSADA
                  </span>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "20px", fontWeight: 700, color: "#0F172A" }}>
                      Sarjana Teknologi Informasi (S1)
                    </h3>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#64748B", fontWeight: 700 }}>
                      2021 - 2025
                    </span>
                  </div>

                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#92400E", fontWeight: 800, marginBottom: "12px" }}>
                    SPESIALISASI: REKAYASA PERANGKAT LUNAK &amp; MACHINE LEARNING
                  </p>

                  <p style={{ fontSize: "13px", color: "#334155", lineHeight: 1.6, marginBottom: "14px" }}>
                    Menyelesaikan penelitian skripsi di bidang Deep Learning dan Computer Vision untuk klasifikasi penyakit daun tanaman, menggabungkan teori komputasi ilmiah dengan implementasi model siap pakai.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Software Engineering", "Machine Learning", "Neural Networks", "Data Structures", "Algorithms"].map((tag) => {
                      const tStyle = getTechBadgeStyle(tag);
                      return (
                        <span key={tag} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: KEAHLIAN & TECH STACK (BRIGHT NEUBRUTALISM)
            ============================================================ */}
        <section className="relative z-10" id="skills" style={{ padding: "40px 0" }}>
          <div className="container-premium">
            
            {/* Section Header Box */}
            <div className="brutal-section-title-box">
              <div>
                <div style={{ fontFamily: "var(--font-cartoon)", fontSize: "12px", color: "#0284C7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                  // KOMPETENSI TEKNIS &amp; BAHASA PEMROGRAMAN
                </div>
                <h2 style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "clamp(34px, 5vw, 48px)", letterSpacing: "0.02em", margin: 0, lineHeight: 1.1, color: "#0F172A" }}>
                  KEAHLIAN &amp; <span style={{ color: "#0284C7" }}>TECH STACK</span>
                </h2>
              </div>

              <div className="brutal-sticker brutal-sticker-yellow">
                🛠️ 5 PILAR UTAMA
              </div>
            </div>

            {/* Responsive Bento Grid Layout */}
            <motion.div 
              className="masonry-container"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* 1. Backend */}
              <motion.div 
                className="masonry-span-4 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#E0F2FE" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#0284C7", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#4ADE80", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>01 // BACKEND</span>
                  </div>
                  <span style={{ color: "#0369A1", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>UTAMA</span>
                </div>

                <div style={{ padding: "22px 24px" }}>
                  <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "19px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
                    BACKEND ENTERPRISE
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: 1.55, marginBottom: "16px" }}>
                    Layanan backend, konkurensi, arsitektur microservices, dan integrasi API skala enterprise.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["C#", ".NET 8", "ASP.NET Core", "Golang (Echo)", "Laravel", "Node.js", "RESTful API", "MVC"].map((tech) => {
                      const tStyle = getTechBadgeStyle(tech);
                      return (
                        <span key={tech} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 2. Frontend */}
              <motion.div 
                className="masonry-span-4 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#DCFCE7" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#16A34A", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#38BDF8", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>02 // FRONTEND</span>
                  </div>
                  <span style={{ color: "#166534", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>UI/UX</span>
                </div>

                <div style={{ padding: "22px 24px" }}>
                  <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "19px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
                    FRONTEND MODERN
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: 1.55, marginBottom: "16px" }}>
                    Desain Neubrutalist, antarmuka responsif, komponen modular, dan interaksi dinamis.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Vue.js", "JavaScript (ES6+)", "TypeScript", "Tailwind CSS", "HTML5", "CSS3 / Vanilla", "Framer Motion"].map((tech) => {
                      const tStyle = getTechBadgeStyle(tech);
                      return (
                        <span key={tech} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 3. Database */}
              <motion.div 
                className="masonry-span-4 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#FFEDD5" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#EA580C", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#38BDF8", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>03 // DATABASE</span>
                  </div>
                  <span style={{ color: "#C2410C", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>DATA</span>
                </div>

                <div style={{ padding: "22px 24px" }}>
                  <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "19px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
                    BASIS DATA &amp; CACHE
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "#475569", lineHeight: 1.55, marginBottom: "16px" }}>
                    Integritas data ACID, strategi caching, optimasi query bervolume tinggi, dan pemodelan relasional.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["PostgreSQL", "SQL Server", "MySQL", "Redis Cache", "Query Tuning", "Indexing"].map((tech) => {
                      const tStyle = getTechBadgeStyle(tech);
                      return (
                        <span key={tech} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 4. AI & ML */}
              <motion.div 
                className="masonry-span-6 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#FFEDD5" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#EA580C", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#38BDF8", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>04 // KECERDASAN BUATAN</span>
                  </div>
                  <span style={{ color: "#9A3412", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>AI &amp; ML</span>
                </div>

                <div style={{ padding: "24px 26px" }}>
                  <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "19px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
                    AI &amp; MACHINE LEARNING
                  </h3>
                  <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
                    Implementasi model machine learning, Natural Language Processing untuk analisis sentimen, serta Convolutional Neural Networks untuk Computer Vision.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Computer Vision", "Sentiment Analysis", "CNN", "BERT", "Naive Bayes", "Random Forest", "XGBoost", "Python"].map((tech) => {
                      const tStyle = getTechBadgeStyle(tech);
                      return (
                        <span key={tech} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* 5. DevOps */}
              <motion.div 
                className="masonry-span-6 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#E2E8F0" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#334155", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#38BDF8", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>05 // INFRASTRUKTUR</span>
                  </div>
                  <span style={{ color: "#0F172A", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>DEVOPS</span>
                </div>

                <div style={{ padding: "24px 26px" }}>
                  <h3 style={{ fontFamily: "var(--font-cartoon)", fontSize: "19px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
                    DEVOPS &amp; INFRASTRUKTUR
                  </h3>
                  <p style={{ fontSize: "13px", color: "#475569", lineHeight: 1.6, marginBottom: "16px" }}>
                    Containerization dengan Docker, konfigurasi reverse proxy Nginx, version control Git, dan best practice arsitektur bersih untuk keandalan server.
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Docker", "Nginx", "Git / GitHub", "Postman", "Linux VPS", "Clean Architecture", "CI/CD"].map((tech) => {
                      const tStyle = getTechBadgeStyle(tech);
                      return (
                        <span key={tech} className="brutal-light-pill" style={{ backgroundColor: tStyle.bg, color: tStyle.text }}>
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: ALUR KERJA & PROSES (BRIGHT NEUBRUTALISM)
            ============================================================ */}
        <section className="relative z-10" id="process" style={{ padding: "40px 0" }}>
          <div className="container-premium">
            
            {/* Section Header Box */}
            <div className="brutal-section-title-box">
              <div>
                <div style={{ fontFamily: "var(--font-cartoon)", fontSize: "12px", color: "#0284C7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 700 }}>
                  // PROTOKOL REKAYASA &amp; PIPELINE PENGEMBANGAN
                </div>
                <h2 style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "clamp(34px, 5vw, 48px)", letterSpacing: "0.02em", margin: 0, lineHeight: 1.1, color: "#0F172A" }}>
                  ALUR KERJA &amp; <span style={{ color: "#0284C7" }}>METODOLOGI</span>
                </h2>
              </div>

              <div className="brutal-sticker brutal-sticker-yellow">
                🚀 5 TAHAP UTAMA
              </div>
            </div>

            {/* Responsive Bento Grid Layout */}
            <motion.div 
              className="masonry-container"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {processSteps.map((step, sIdx) => (
                <motion.div 
                  key={step.num}
                  className={`${step.span} brutal-light-card`}
                  variants={fadeInUp}
                >
                  <div className="brutal-light-header" style={{ background: step.headerBg }}>
                    <div className="brutal-window-dots">
                      <span className="brutal-dot" style={{ backgroundColor: step.badgeText, width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                      <span className="brutal-dot" style={{ backgroundColor: "#FDE047", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                      <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>TAHAP-{step.num}</span>
                    </div>
                    <span style={{ color: step.badgeText, fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10.5px" }}>0{sIdx + 1}/05</span>
                  </div>

                  <div style={{ padding: "22px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <h3 style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "24px", color: "#0F172A", lineHeight: 1, letterSpacing: "0.02em" }}>
                          {step.title}
                        </h3>
                        <span style={{ fontFamily: "var(--font-cartoon-title)", fontSize: "28px", color: step.badgeText, opacity: 0.35, lineHeight: 1 }}>
                          #{step.num}
                        </span>
                      </div>

                      <p style={{ fontSize: "13px", color: "#334155", lineHeight: 1.6, marginBottom: "16px" }}>
                        {step.desc}
                      </p>
                    </div>

                    <span 
                      className="brutal-sticker" 
                      style={{ 
                        background: step.badgeBg, 
                        color: step.badgeText, 
                        border: "2px solid #000000",
                        boxShadow: "2.5px 2.5px 0px #000000",
                        width: "fit-content", 
                        fontSize: "9.5px",
                        fontWeight: 800,
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Philosophy Card (Span 12) */}
              <motion.div 
                className="masonry-span-12 brutal-light-card-featured"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#FEF3C7" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot brutal-dot-cyan" />
                    <span className="brutal-dot brutal-dot-teal" />
                    <span className="brutal-dot brutal-dot-coral" />
                    <span style={{ marginLeft: "6px" }}>FILOSOFI REKAYASA // ERGA WANDA</span>
                  </div>
                  <span className="brutal-sticker brutal-sticker-cyan" style={{ padding: "2px 8px", fontSize: "8.5px" }}>
                    PRINSIP KERJA
                  </span>
                </div>

                <div style={{
                  padding: "32px 36px",
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "20px",
                  alignItems: "center",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: "48px", color: "#0284C7", lineHeight: 0.5 }}>
                      “
                    </div>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(16px, 2.3vw, 22px)",
                      fontWeight: 700,
                      lineHeight: 1.55,
                      color: "#0F172A",
                      letterSpacing: "-0.01em",
                    }}>
                      Arsitektur software yang baik ibarat rekayasa laut dalam: tenang di permukaan, namun kokoh menahan tekanan beban tinggi tanpa ruang bagi kegagalan.
                    </p>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderTop: "2px solid #E2E8F0", paddingTop: "16px" }}>
                      <div>
                        <div style={{ fontFamily: "var(--font-signature)", fontSize: "32px", color: "#0284C7" }}>
                          Erga Wanda Afriza
                        </div>
                        <div style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", color: "#475569", letterSpacing: "0.06em", fontWeight: 700 }}>
                          IT DEVELOPER @ RDS GROUP • SOFTWARE ENGINEER
                        </div>
                      </div>

                      <div className="brutal-sticker brutal-sticker-cyan">
                        ⚓ DIBANGUN DENGAN KETAHANAN
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: HUBUNGI SAYA / FOOTER (BRIGHT NEUBRUTALISM)
            ============================================================ */}
        <footer className="footer" id="contact" style={{ paddingTop: "30px", paddingBottom: "60px", background: "#F1F5F9", borderTop: "3px solid #000000" }}>
          <div className="container-premium">
            
            <motion.div 
              className="masonry-container"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Bento Card 1 (Span 7): Direct Message Invitation */}
              <motion.div 
                className="masonry-span-7 brutal-light-card-featured"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#E0F2FE" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot brutal-dot-cyan" />
                    <span className="brutal-dot brutal-dot-teal" />
                    <span className="brutal-dot brutal-dot-coral" />
                    <span style={{ marginLeft: "6px" }}>KOLABORASI TEKNIS // SALURAN TERBUKA</span>
                  </div>
                  <span style={{ color: "#0369A1", fontWeight: 800 }}>STATUS: SIAP RESPON</span>
                </div>

                <div style={{ padding: "32px 30px", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                  <div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "14px" }}>
                      <span className="brutal-sticker brutal-sticker-cyan">
                        ⚓ ERGA WANDA AFRIZA
                      </span>
                      <span className="brutal-sticker brutal-sticker-teal">
                        🌊 RDS GROUP IT DEVELOPER
                      </span>
                    </div>

                    <h2 style={{
                      fontFamily: "var(--font-cartoon-title)",
                      fontSize: "clamp(32px, 4.5vw, 48px)",
                      lineHeight: 1.1,
                      fontWeight: 700,
                      color: "#0F172A",
                      marginBottom: "16px",
                    }}>
                      MARI BERKOLABORASI &amp; BANGUN <span style={{ color: "#0284C7" }}>SISTEM ANDAL</span>
                    </h2>

                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.65, marginBottom: "26px", maxWidth: "560px" }}>
                      Saat ini aktif di RDS Group dan terbuka untuk konsultasi teknis, pengembangan web aplikasi skala penuh, serta kemitraan rekayasa sistem.
                    </p>
                  </div>

                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
                      <button 
                        onClick={() => setContactModalOpen(true)}
                        className="btn-beach-cyan"
                      >
                        <FiMail style={{ fontSize: "14px" }} />
                        Kirim Pesan Langsung ➔
                      </button>

                      <a 
                        href="https://wa.me/6288291067259"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-beach-white"
                      >
                        <FaWhatsapp style={{ fontSize: "14px", color: "#25D366" }} />
                        WhatsApp Langsung ↗
                      </a>
                    </div>

                    <div style={{
                      paddingTop: "14px",
                      borderTop: "2px solid #E2E8F0",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10.5px",
                      color: "#64748B",
                      fontWeight: 700,
                    }}>
                      ESTIMASI RESPON: &lt; 12 JAM // SALURAN KOMUNIKASI RESMI
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bento Card 2 (Span 5): Tactical Communication Channels */}
              <motion.div 
                className="masonry-span-5 brutal-light-card"
                variants={fadeInUp}
              >
                <div className="brutal-light-header" style={{ background: "#FEF3C7" }}>
                  <div className="brutal-window-dots">
                    <span className="brutal-dot" style={{ backgroundColor: "#F59E0B", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#38BDF8", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span className="brutal-dot" style={{ backgroundColor: "#22C55E", width: 9, height: 9, borderRadius: "50%", border: "1.5px solid #000" }} />
                    <span style={{ marginLeft: "6px", fontFamily: "var(--font-mono)", fontWeight: 800 }}>KONTAK RESMI</span>
                  </div>
                  <span style={{ color: "#92400E", fontWeight: 800, fontFamily: "var(--font-mono)", fontSize: "10px" }}>TERHUBUNG</span>
                </div>

                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "space-between", height: "100%" }}>
                  <a 
                    href="mailto:ewandaafriza@gmail.com"
                    className="brutal-light-card"
                    style={{ padding: "14px 18px", border: "2px solid #000000", boxShadow: "3px 3px 0px #000000", textDecoration: "none", display: "flex", alignItems: "center", gap: "14px", background: "#FFFFFF" }}
                  >
                    <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#E0F2FE", border: "2px solid #000", color: "#0369A1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold" }}>
                      <FiMail />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "#0369A1", fontWeight: 800, textTransform: "uppercase" }}>EMAIL UTAMA</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "#0F172A", fontWeight: 800 }}>ewandaafriza@gmail.com</div>
                    </div>
                  </a>

                  <a 
                    href="https://github.com/ErgaWanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-light-card"
                    style={{ padding: "14px 18px", border: "2px solid #000000", boxShadow: "3px 3px 0px #000000", textDecoration: "none", display: "flex", alignItems: "center", gap: "14px", background: "#FFFFFF" }}
                  >
                    <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#0F172A", border: "2px solid #000", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px" }}>
                      <FaGithub />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "#0284C7", fontWeight: 800, textTransform: "uppercase" }}>REPOSITORI GITHUB RESMI</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "#0F172A", fontWeight: 800 }}>github.com/ErgaWanda</div>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/6288291067259"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-light-card"
                    style={{ padding: "14px 18px", border: "2px solid #000000", boxShadow: "3px 3px 0px #000000", textDecoration: "none", display: "flex", alignItems: "center", gap: "14px", background: "#FFFFFF" }}
                  >
                    <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#DCFCE7", border: "2px solid #000", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold" }}>
                      <FaWhatsapp />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "#166534", fontWeight: 800, textTransform: "uppercase" }}>WHATSAPP RESMI</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "#0F172A", fontWeight: 800 }}>+62 882 9106 7259</div>
                    </div>
                  </a>

                  <div 
                    className="brutal-light-card"
                    style={{ padding: "14px 18px", border: "2px solid #000000", boxShadow: "3px 3px 0px #000000", display: "flex", alignItems: "center", gap: "14px", background: "#FFFFFF" }}
                  >
                    <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "#FEF3C7", border: "2px solid #000", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>
                      <FiMapPin />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", color: "#92400E", fontWeight: 800, textTransform: "uppercase" }}>LOKASI BASIS</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "#0F172A", fontWeight: 800 }}>Bekasi &amp; Jakarta, Indonesia</div>
                    </div>
                  </div>

                  <div style={{
                    padding: "10px 14px",
                    background: "#FFFFFF",
                    border: "2px solid #000000",
                    boxShadow: "3px 3px 0px #000000",
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#0F172A",
                    textAlign: "center",
                    marginTop: "6px",
                  }}>
                    ⚓ © 2026 ERGA WANDA AFRIZA • IT DEVELOPER @ RDS GROUP
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </footer>

      </div>

      {/* ============================================================
          PROJECT DETAILS MODAL
          ============================================================ */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* ============================================================
          TACTICAL NEUBRUTALIST CONTACT MODAL (LIGHT THEME)
          ============================================================ */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactModalOpen(false)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(6px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="brutal-light-card"
              style={{ width: "100%", maxWidth: "500px", padding: 0, border: "3px solid #000000", boxShadow: "8px 8px 0px #38BDF8, 14px 14px 0px #000000", background: "#FFFFFF" }}
            >
              {/* Modal header */}
              <div className="brutal-light-header" style={{ background: "#E0F2FE" }}>
                <div className="brutal-window-dots">
                  <span className="brutal-dot brutal-dot-cyan" />
                  <span className="brutal-dot brutal-dot-teal" />
                  <span className="brutal-dot brutal-dot-coral" />
                  <span style={{ marginLeft: "6px", color: "#0F172A" }}>KIRIM PESAN LANGSUNG</span>
                </div>
                <button 
                  onClick={() => setContactModalOpen(false)}
                  style={{
                    background: "#FFFFFF",
                    border: "2px solid #000000",
                    boxShadow: "2px 2px 0px #000",
                    color: "#0F172A",
                    padding: "3px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  ✕ TUTUP
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleContactSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", background: "#FFFFFF" }}>
                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "10px", color: "#0284C7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 800 }}>
                    NAMA LENGKAP *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    className="form-input-premium"
                    style={{ border: "2px solid #000000", background: "#F8FAFC", color: "#0F172A" }}
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "10px", color: "#0284C7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 800 }}>
                    ALAMAT EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    className="form-input-premium"
                    style={{ border: "2px solid #000000", background: "#F8FAFC", color: "#0F172A" }}
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "10px", color: "#0284C7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 800 }}>
                    SUBJEK PESAN *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Diskusi Proyek / Kemitraan Sistem"
                    className="form-input-premium"
                    style={{ border: "2px solid #000000", background: "#F8FAFC", color: "#0F172A" }}
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "10px", color: "#0284C7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px", fontWeight: 800 }}>
                    DETAIL PESAN *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan kebutuhan proyek, arsitektur yang dibutuhkan, atau ide kolaborasi..."
                    className="form-input-premium"
                    style={{ resize: "none", border: "2px solid #000000", background: "#F8FAFC", color: "#0F172A" }}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: "6px" }}>
                  <button 
                    type="submit" 
                    disabled={sending}
                    className="btn-beach-cyan"
                    style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}
                  >
                    {sending ? "MENGIRIMKAN..." : "KIRIM PESAN SEKARANG ➔"}
                  </button>
                </div>

                <AnimatePresence>
                  {sent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        padding: "10px",
                        background: "#DCFCE7",
                        border: "2px solid #16A34A",
                        borderRadius: "4px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "10.5px",
                        fontWeight: 800,
                        color: "#166534",
                        textAlign: "center",
                      }}
                    >
                      ✓ PESAN BERHASIL TERKIRIM! TERIMA KASIH.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
