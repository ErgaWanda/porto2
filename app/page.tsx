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
  const [formStatus, setFormStatus] = useState<{ type: "success" | "activation" | "error"; text: string } | null>(null);
  const [isTagDragging, setIsTagDragging] = useState(false);

  // Athletic / Volt Neon Lab - Full Name: Erga Wanda Afriza
  const nameWord1 = [{ char: "E" }, { char: "R" }, { char: "G" }, { char: "A" }];
  const nameWord2 = [{ char: "W" }, { char: "A" }, { char: "N" }, { char: "D" }, { char: "A" }];
  const nameWord3 = [{ char: "A" }, { char: "F" }, { char: "R" }, { char: "I" }, { char: "Z" }, { char: "A" }];
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleOceanClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest(".draggable-ocean-letter") || target.closest(".draggable-techwear-tag")) {
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
    setFormStatus(null);

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
          message: contactForm.message,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && (data.success === "true" || data.success === true)) {
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setFormStatus({
          type: "success",
          text: "✓ PESAN BERHASIL TERKIRIM LANGSUNG KE GMAIL ERGA!"
        });
        setTimeout(() => setFormStatus(null), 8000);
      } else if (data?.message?.toLowerCase().includes("activation")) {
        setFormStatus({
          type: "activation",
          text: "⚠️ FORM MEMERLUKAN AKTIVASI: Cek inbox/spam Gmail ewandaafriza@gmail.com lalu klik link 'Activate Form'!"
        });
      } else {
        throw new Error(data?.message || "Gagal mengirim pesan via FormSubmit");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn("FormSubmit Error. Using Fallback Mailto...", errMsg);
      setFormStatus({
        type: "error",
        text: "Membuka draft email langsung ke ewandaafriza@gmail.com..."
      });
      const mailto = `mailto:ewandaafriza@gmail.com?subject=${encodeURIComponent(
        contactForm.subject || "Message from Portfolio"
      )}&body=${encodeURIComponent(
        `Nama: ${contactForm.name}\nEmail: ${contactForm.email}\n\nPesan:\n${contactForm.message}`
      )}`;
      window.open(mailto, "_blank");
      setTimeout(() => setFormStatus(null), 8000);
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
              <span className="navbar-brand-name">ERGA WANDA AFRIZA</span>
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

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
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
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================
          HERO SECTION: ATHLETIC / VOLT NEON LAB (LIGHT NEUBRUTALISM)
          Techwear Brutalist Precision, Volt Lime Accents & Raw Typography
          ============================================================ */}
      <section
        className="ocean-hero-canvas"
        id="about"
        onClick={handleOceanClick}
        style={{ marginTop: "-56px", paddingTop: "80px", cursor: "pointer", position: "relative", overflowX: "hidden" }}
      >
        {/* Technical Corner Crosshairs (Techwear Spec Marks) */}
        <div className="techwear-crosshair" style={{ top: "90px", left: "20px" }}>+ [LAB-01]</div>
        <div className="techwear-crosshair" style={{ top: "90px", right: "20px" }}>+ [SCALE: 100%]</div>

        {/* Interactive Kinetic Volt Ripple Rings on Click */}
        {ripples.map((rip) => (
          <motion.div
            key={rip.id}
            initial={{ scale: 0, opacity: 0.95 }}
            animate={{ scale: 4.5, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: rip.y - 25,
              left: rip.x - 25,
              width: 50,
              height: 50,
              borderRadius: "50%",
              border: "3px solid #CCFF00",
              boxShadow: "0 0 16px rgba(204, 255, 0, 0.85), inset 0 0 8px rgba(0, 0, 0, 0.3)",
              pointerEvents: "none",
              zIndex: 7,
            }}
          />
        ))}


        {/* ============================================================
            DRAGGABLE TECHWEAR CARABINER & ZIP-TIE TAG (Industrial Artifact)
            High-contrast athletic techwear tag with barcode & ribbon
            ============================================================ */}
        <div
          className="anim-tag-cruise"
          style={{
            position: "absolute",
            top: "305px",
            left: "8%",
            zIndex: 45,
            pointerEvents: "auto",
            animationPlayState: isTagDragging ? "paused" : "running",
          }}
        >
          <motion.div
            drag
            dragElastic={0.25}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
            onDragStart={() => setIsTagDragging(true)}
            onDragEnd={() => setIsTagDragging(false)}
            whileHover={{ scale: 1.16, cursor: "grab" }}
            whileDrag={{ scale: 1.28, rotate: -8, cursor: "grabbing" }}
            className="draggable-techwear-tag"
            style={{
              cursor: "grab",
              touchAction: "none",
              userSelect: "none",
              display: "inline-block",
              padding: "6px",
            }}
            title="Seret tag industrial ini kemana saja di lab! 🏷️"
          >
            <div className="anim-tag-float" style={{ position: "relative", display: "inline-block", pointerEvents: "none" }}>
              {/* Tactical Spec Tag Floating Over Carabiner */}
              <div
                style={{
                  position: "absolute",
                  top: "-34px",
                  left: "14px",
                  whiteSpace: "nowrap",
                  fontSize: "10px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 800,
                  transform: isTagDragging ? "rotate(-4deg) scale(1.06)" : "rotate(1deg)",
                  pointerEvents: "none",
                  zIndex: 50,
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                  backgroundColor: isTagDragging ? "#CCFF00" : "#0A0A0A",
                  color: isTagDragging ? "#000000" : "#FFFFFF",
                  border: "2px solid #000000",
                  boxShadow: "3px 3px 0px #000000",
                  padding: "3px 8px",
                  borderRadius: "3px",
                }}
              >
                <span>{isTagDragging ? "⚡ [KINETIC DISPLACEMENT ACTIVE]" : "🏷️ [TECHWEAR LAB TAG // DRAGGABLE]"}</span>
              </div>

              {/* Industrial Techwear Tag SVG (Carabiner, Volt Ribbon & Barcode) */}
              <svg width="120" height="66" viewBox="0 0 120 66" fill="none" style={{ filter: "drop-shadow(4px 6px 0px #000000)", pointerEvents: "none" }}>
                {/* Matte Black Carabiner Clasp Loop */}
                <rect x="6" y="16" width="22" height="34" rx="7" fill="#0A0A0A" stroke="#000000" strokeWidth="2.5" />
                <rect x="12" y="22" width="10" height="22" rx="4" fill="#F8FAFC" stroke="#000000" strokeWidth="1.5" />
                {/* Carabiner Gate Spring (Silver) */}
                <rect x="22" y="24" width="4" height="18" fill="#E2E8F0" stroke="#000000" strokeWidth="1.2" />

                {/* Industrial Techwear Tag Main Body (Volt Neon Lime) */}
                <rect x="26" y="10" width="88" height="46" rx="4" fill="#CCFF00" stroke="#000000" strokeWidth="2.5" />

                {/* Metal Grommet Eyelet */}
                <circle cx="34" cy="33" r="4.5" fill="#E2E8F0" stroke="#000000" strokeWidth="2" />
                <circle cx="34" cy="33" r="2" fill="#0A0A0A" />

                {/* Inner White Technical Label */}
                <rect x="42" y="15" width="67" height="36" rx="2" fill="#FFFFFF" stroke="#000000" strokeWidth="1.8" />

                {/* Barcode Lines */}
                <line x1="46" y1="20" x2="46" y2="34" stroke="#000000" strokeWidth="2" />
                <line x1="50" y1="20" x2="50" y2="34" stroke="#000000" strokeWidth="1" />
                <line x1="53" y1="20" x2="53" y2="34" stroke="#000000" strokeWidth="2.5" />
                <line x1="58" y1="20" x2="58" y2="34" stroke="#000000" strokeWidth="1" />
                <line x1="62" y1="20" x2="62" y2="34" stroke="#000000" strokeWidth="3" />
                <line x1="68" y1="20" x2="68" y2="34" stroke="#000000" strokeWidth="1" />

                {/* Technical Micro Text */}
                <text x="46" y="44" fontFamily="var(--font-mono)" fontSize="7" fontWeight="900" fill="#0A0A0A">C# .NET ARCH</text>
                <text x="74" y="26" fontFamily="var(--font-mono)" fontSize="7" fontWeight="900" fill="#CCFF00">RDS</text>
                <rect x="73" y="19" width="30" height="9" rx="1.5" fill="#0A0A0A" />
                <text x="76" y="26" fontFamily="var(--font-mono)" fontSize="6.5" fontWeight="900" fill="#CCFF00">2026-LAB</text>
                <text x="74" y="44" fontFamily="var(--font-mono)" fontSize="6" fontWeight="800" fill="#64748B">SPEC: 01</text>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* ============================================================
            HERO MAIN HEADLINE (Centered Draggable Letters!)
            High-Impact Athletic Volt Neon Palette & Hard Shadows
            ============================================================ */}
        <div className="container-premium relative z-10 text-center" style={{ paddingTop: "26px", paddingBottom: "36px" }}>

          {/* Centered Draggable Interactive Letters: ERGA WANDA AFRIZA */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "24px", userSelect: "none" }}>

            {/* Tactical Athletic Drag Hint Badge */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: "#CCFF00",
                color: "#000000",
                border: "2.5px solid #000000",
                boxShadow: "3.5px 3.5px 0px #000000",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 900,
                letterSpacing: "0.04em",
                padding: "6px 14px",
                borderRadius: "4px",
                marginBottom: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>⚡</span>
              <span>[&quot;DRAG &amp; TOSS LETTERS&quot; // KINETIC PERFORMANCE LAB]</span>
              <span>⚡</span>
            </motion.div>

            {/* Row 1: E R G A   +   W A N D A */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              columnGap: "clamp(16px, 3.5vw, 42px)",
              rowGap: "6px",
              marginBottom: "8px",
            }}>
              {/* Word 1: ERGA */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(2px, 0.7vw, 6px)" }}>
                {nameWord1.map((item, index) => (
                  <motion.span
                    key={`erga-${index}`}
                    drag
                    dragConstraints={{ left: -140, right: 140, top: -90, bottom: 90 }}
                    dragElastic={0.4}
                    dragTransition={{ bounceStiffness: 350, bounceDamping: 18 }}
                    whileHover={{ scale: 1.15, rotate: (index % 2 === 0 ? 6 : -6), cursor: "grab" }}
                    whileDrag={{ scale: 1.3, rotate: (index % 2 === 0 ? 12 : -12), cursor: "grabbing", zIndex: 60 }}
                    className="draggable-ocean-letter"
                  >
                    {item.char}
                  </motion.span>
                ))}
              </div>

              {/* Word 2: WANDA */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(2px, 0.7vw, 6px)" }}>
                {nameWord2.map((item, index) => (
                  <motion.span
                    key={`wanda-${index}`}
                    drag
                    dragConstraints={{ left: -140, right: 140, top: -90, bottom: 90 }}
                    dragElastic={0.4}
                    dragTransition={{ bounceStiffness: 350, bounceDamping: 18 }}
                    whileHover={{ scale: 1.15, rotate: (index % 2 === 0 ? -6 : 6), cursor: "grab" }}
                    whileDrag={{ scale: 1.3, rotate: (index % 2 === 0 ? -12 : 12), cursor: "grabbing", zIndex: 60 }}
                    className="draggable-ocean-letter"
                  >
                    {item.char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Row 2: A F R I Z A */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "clamp(2px, 0.7vw, 6px)" }}>
              {nameWord3.map((item, index) => (
                <motion.span
                  key={`afriza-${index}`}
                  drag
                  dragConstraints={{ left: -140, right: 140, top: -90, bottom: 90 }}
                  dragElastic={0.4}
                  dragTransition={{ bounceStiffness: 350, bounceDamping: 18 }}
                  whileHover={{ scale: 1.15, rotate: (index % 2 === 0 ? 6 : -6), cursor: "grab" }}
                  whileDrag={{ scale: 1.3, rotate: (index % 2 === 0 ? 12 : -12), cursor: "grabbing", zIndex: 60 }}
                  className="draggable-ocean-letter"
                >
                  {item.char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(13px, 3.5vw, 17px)",
              fontWeight: 600,
              lineHeight: 1.6,
              color: "#1E293B",
              maxWidth: "640px",
              margin: "0 auto 26px auto",
              padding: "0 8px",
            }}
          >
            <strong style={{ color: "#0A0A0A", fontWeight: 800 }}>IT Developer di RDS Group</strong> dengan spesialisasi <strong style={{ color: "#000000", background: "#CCFF00", padding: "1px 6px", borderRadius: "4px", border: "1.5px solid #000000" }}>C# dan .NET</strong>. Merancang arsitektur backend berkecepatan tinggi, sistem terdistribusi mission-critical, dan integrasi cerdas AI dengan latensi minimal dan keandalan tanpa kompromi.
          </motion.p>

          {/* Action Buttons (High-Voltage Neubrutalist) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "12px", padding: "0 8px" }}
          >
            <a href="#projects" style={{
              background: "#CCFF00",
              color: "#000000",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 800,
              border: "2.5px solid #000000",
              boxShadow: "4px 4px 0px #000000",
              borderRadius: "6px",
              padding: "10px 22px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              textDecoration: "none",
            }}>
              ↓ Lihat Proyek
            </a>

            <button
              onClick={() => setContactModalOpen(true)}
              style={{
                background: "#FFFFFF",
                color: "#000000",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 800,
                border: "2.5px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                borderRadius: "6px",
                padding: "10px 22px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
              }}
            >
              ✉ Hubungi Saya
            </button>

            <a
              href="https://github.com/ErgaWanda"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#0A0A0A",
                color: "#FFFFFF",
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                fontWeight: 800,
                border: "2.5px solid #000000",
                boxShadow: "4px 4px 0px #000000",
                borderRadius: "6px",
                padding: "10px 22px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <FaGithub style={{ fontSize: "16px" }} />
              GitHub ↗
            </a>
          </motion.div>
        </div>

        {/* ============================================================
            TECHNICAL MEASUREMENT & SPEC DECK (Bottom Transition)
            Millimeter Ruler Graduation Band + Off-White Lab Plaque
            ============================================================ */}
        <div style={{ position: "relative", width: "100%", maxWidth: "100vw", zIndex: 10, overflowX: "hidden" }}>

          {/* Precision Millimeter Ruler Graduation Band */}
          <div className="millimeter-ruler-band" />

          {/* Technical Lab Spec Deck Ground */}
          <div className="lab-spec-deck">
            <div className="container-premium" style={{ position: "relative" }}>

              {/* Lab Deck Elements Flex Bar */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}>

                {/* 1. Left: Product Spec Barcode ID - Hidden on small mobile */}
                <div className="hidden sm:flex" style={{ alignItems: "center", gap: "10px" }}>
                  <svg width="46" height="28" viewBox="0 0 46 28" fill="none">
                    <line x1="2" y1="2" x2="2" y2="26" stroke="#000" strokeWidth="3" />
                    <line x1="8" y1="2" x2="8" y2="26" stroke="#000" strokeWidth="1.5" />
                    <line x1="12" y1="2" x2="12" y2="26" stroke="#000" strokeWidth="2.5" />
                    <line x1="17" y1="2" x2="17" y2="26" stroke="#000" strokeWidth="1" />
                    <line x1="21" y1="2" x2="21" y2="26" stroke="#000" strokeWidth="3.5" />
                    <line x1="28" y1="2" x2="28" y2="26" stroke="#000" strokeWidth="1" />
                    <line x1="32" y1="2" x2="32" y2="26" stroke="#000" strokeWidth="2.5" />
                    <line x1="38" y1="2" x2="38" y2="26" stroke="#000" strokeWidth="1.5" />
                    <line x1="43" y1="2" x2="43" y2="26" stroke="#000" strokeWidth="2" />
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#64748B", fontWeight: 800 }}>SPEC NUMBER</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#0A0A0A", fontWeight: 900 }}>#02-09-2026 / RDS</span>
                  </div>
                </div>

                {/* 2. Center: High-Contrast Athletic Command Plaque */}
                <div style={{ flex: "1 1 280px", maxWidth: "520px", margin: "0 auto", width: "100%" }}>
                  <div style={{
                    background: "#FFFFFF",
                    border: "3px solid #000000",
                    boxShadow: "5px 5px 0px #000000",
                    borderRadius: "6px",
                    padding: "10px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                  }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#CCFF00", border: "1.5px solid #000000", display: "inline-block" }} className="anim-volt-pulse" />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 900, color: "#0A0A0A", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      IT DEVELOPER @ RDS GROUP
                    </span>
                    <span style={{ color: "#CBD5E1" }}>|</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 800, color: "#0A0A0A" }}>
                      02 SEP 2026 - PRESENT
                    </span>
                    <span style={{
                      background: "#CCFF00",
                      color: "#000000",
                      fontSize: "9px",
                      fontWeight: 900,
                      fontFamily: "var(--font-mono)",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      border: "1.5px solid #000000",
                    }}>
                      C# &amp; .NET 9
                    </span>
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
                    <span style={{ marginLeft: "6px" }}>FILOSOFI REKAYASA // ERGA WANDA AFRIZA</span>
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
                    ⚡ © 2026 ERGA WANDA AFRIZA • IT DEVELOPER @ RDS GROUP
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
                  {formStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        padding: "12px 14px",
                        background: formStatus.type === "success" ? "#DCFCE7" : formStatus.type === "activation" ? "#FEF3C7" : "#FEE2E2",
                        border: `2px solid ${formStatus.type === "success" ? "#16A34A" : formStatus.type === "activation" ? "#D97706" : "#DC2626"}`,
                        borderRadius: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        fontWeight: 800,
                        color: formStatus.type === "success" ? "#166534" : formStatus.type === "activation" ? "#92400E" : "#991B1B",
                        textAlign: "center",
                        lineHeight: 1.5,
                        boxShadow: "3px 3px 0px #000000"
                      }}
                    >
                      {formStatus.text}
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
