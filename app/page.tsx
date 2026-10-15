"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HeroDescription } from "@/components/landing/HeroDescription";
import { FeatureCard } from "@/components/landing/FeatureCard";
import { FloatingLeaves } from "@/components/landing/FloatingLeaves";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { SkillsSection } from "@/components/landing/SkillsSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { CvModal } from "@/components/landing/CvModal";
import { ContactModal } from "@/components/landing/ContactModal";
import { GlassCard } from "@/components/landing/GlassCard";
import ProjectModal from "@/components/ui/ProjectModal";
import GitHubActivity from "@/components/sections/GitHubActivity";
import { projects } from "@/data/projects";
import { NavItem, FeatureItem } from "@/components/landing/types";

export default function Home() {
  // Navigation & Modal States
  const [activeNav, setActiveNav] = useState<string>("features");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "activation" | "error";
    text: string;
  } | null>(null);

  // Navigation Items (Portfolio Focused)
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "features", label: "Proyek", href: "#projects" },
      { id: "product", label: "Pengalaman", href: "#experience" },
      { id: "about", label: "Keahlian", href: "#skills" },
      { id: "reviews", label: "GitHub", href: "#github" },
      { id: "workflow", label: "Alur Kerja", href: "#workflow" },
    ],
    []
  );

  // Bottom-Right Feature Cards Data (Engineering Competencies)
  const heroFeatures: FeatureItem[] = useMemo(
    () => [
      {
        id: "feat-backend",
        title: "Backend Enterprise",
        description: "C# .NET 9, Golang & SQL Tuning performa tinggi.",
        icon: "chart",
        metric: "7+ PROYEK",
      },
      {
        id: "feat-architecture",
        title: "Clean Architecture",
        description: "ACID compliance, Docker & decoupled microservices.",
        icon: "lock",
        metric: "ENTERPRISE",
      },
    ],
    []
  );

  // Smooth scroll handler
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    const targetMap: Record<string, string> = {
      features: "projects",
      product: "experience",
      about: "skills",
      reviews: "github",
      workflow: "workflow",
    };
    const targetId = targetMap[id];
    if (targetId) scrollTo(targetId);
  };

  // Keyboard navigation & Esc handler for modals
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactModalOpen(false);
        setCvModalOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Form submission handler via FormSubmit API
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setFormStatus(null);
    try {
      const response = await fetch("https://formsubmit.co/ajax/ewandaafriza@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          subject: contactForm.subject || "Pesan dari Portofolio Digital",
          message: contactForm.message,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data && (data.success === "true" || data.success === true)) {
        setContactForm({ name: "", email: "", subject: "", message: "" });
        setFormStatus({ type: "success", text: "✓ Pesan berhasil terkirim ke email Erga!" });
        setTimeout(() => setFormStatus(null), 8000);
      } else {
        throw new Error("Gagal mengirim");
      }
    } catch {
      setFormStatus({ type: "error", text: "Membuka draft email langsung ke ewandaafriza@gmail.com..." });
      const mailto = `mailto:ewandaafriza@gmail.com?subject=${encodeURIComponent(
        contactForm.subject || "Portofolio Inquiries"
      )}&body=${encodeURIComponent(
        `Nama: ${contactForm.name}\nEmail: ${contactForm.email}\n\nPesan:\n${contactForm.message}`
      )}`;
      window.open(mailto, "_blank");
      setTimeout(() => setFormStatus(null), 8000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        backgroundColor: "#08140c",
        color: "#ffffff",
        fontFamily: "var(--font-family-body)",
      }}
    >
      {/* ═══════════════════════════════════════════════════════
          FLOATING STICKY GLASS NAVBAR (Follows across all sections)
      ═══════════════════════════════════════════════════════ */}
      <Navbar
        navItems={navItems}
        activeId={activeNav}
        onSelectNav={handleNavClick}
        onContactClick={() => setContactModalOpen(true)}
        onCvClick={() => setCvModalOpen(true)}
      />

      {/* ═══════════════════════════════════════════════════════
          FULL-SCREEN SUNLIT CLASSICAL GARDEN BACKGROUND
      ═══════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Background photo */}
        <div
          style={{
            position: "absolute",
            inset: "-10px",
            backgroundImage: "url('/images/lush_garden_bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            filter: "brightness(0.82) contrast(1.15) saturate(1.22)",
            transform: "scale(1.02)",
          }}
        />

        {/* Ambient atmospheric vignette with deep emerald tones */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 65% 15%, rgba(255, 255, 230, 0.22) 0%, transparent 60%),
              radial-gradient(circle at 50% 35%, rgba(6, 26, 16, 0.35) 0%, rgba(2, 10, 6, 0.65) 100%),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 0%, rgba(2, 14, 8, 0.55) 100%)
            `,
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          1. CENTRAL FLOATING GLASS VIEWPORT FRAME (HERO FOLD)
          Enclosing Hero + Side-by-Side Feature Cards
      ═══════════════════════════════════════════════════════ */}
      <div className="glass-viewport-frame">
        {/* Internal Creamy Frosted Garden Backdrop with Rich Contrast */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            backgroundImage: "url('/images/lush_garden_bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            filter: "blur(24px) brightness(0.90) contrast(1.10) saturate(1.20)",
            transform: "scale(1.04)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Translucent Frosted Glass Tint with Luminous Sunlit Sheen */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(145deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.06) 45%, rgba(6, 26, 14, 0.32) 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Volumetric sunbeams shining down */}
        <div className="volumetric-sunbeams" />

        {/* Realistic Eucalyptus foliage overlapping headline and frame */}
        <FloatingLeaves />

        {/* Main Hero Fold Inside the Glass Window */}
        <main
          className="hero-viewport-main"
          style={{
            position: "relative",
            zIndex: 10,
            minHeight: "min(calc(100vh - 160px), 820px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* 12-Column Hero Grid: Left Staggered Headline, Right Narrative + Dual Cards */}
          <div
            className="hero-grid-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "36px",
              alignItems: "flex-start",
            }}
          >
            {/* Left Column: Oversized Staggered Headline, Dual CTAs, Architectural Bottom Box */}
            <div
              className="hero-col-left"
              style={{
                gridColumn: "span 7",
              }}
            >
              <Hero
                headlineMain="Erga Wanda Afriza"
                onPrimaryCta={() => scrollTo("projects")}
                onSecondaryCta={() => setCvModalOpen(true)}
                primaryLabel="Lihat Proyek"
                secondaryLabel="Unduh CV"
                supportingText="• IT Developer @ RDS Group. Mengembangkan sistem enterprise andal C# .NET 9, arsitektur microservices, dan skalabilitas tinggi."
                onScrollDown={() => scrollTo("projects")}
              />
            </div>

            {/* Right Column: Hero Narrative + TWO SIDE-BY-SIDE FEATURE CARDS */}
            <div
              className="hero-col-right"
              style={{
                gridColumn: "span 5",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "4px",
              }}
            >
              {/* Architectural Top-Left Bracket Narrative Box */}
              <HeroDescription
                text="IT Developer di RDS Group (PT Reycom Document Solusi). Berfokus pada rekayasa backend enterprise C# .NET 9, arsitektur microservices, konkurensi Golang, database berkecepatan tinggi, serta integrasi AI & Machine Learning praktis."
                roleBadge="IT DEVELOPER @ RDS GROUP"
                location="Jakarta & Bekasi, Indonesia"
              />

              {/* TWO FEATURE CARDS SIDE-BY-SIDE AT BOTTOM RIGHT */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "18px",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                {heroFeatures.map((feat) => (
                  <FeatureCard
                    key={feat.id}
                    feature={feat}
                    onClick={() => scrollTo("skills")}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ═══════════════════════════════════════════════════════
          INTERACTIVE SECTIONS: PROJECTS, EXPERIENCE, SKILLS
      ═══════════════════════════════════════════════════════ */}
      <div
        className="main-sections-wrapper"
        style={{ maxWidth: "1400px", margin: "40px auto 0 auto", padding: "0 24px" }}
      >
        {/* Projects Section (Features) */}
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

        {/* Experience & Career Milestones Section (Product) */}
        <ExperienceSection />

        {/* Skills & Technical Competencies Section (About) */}
        <SkillsSection />

        {/* GitHub Activity Section (Reviews / Telemetry) */}
        <section
          id="github"
          style={{
            padding: "80px 0 60px 0",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <GlassCard
              style={{
                padding: "36px 32px",
                borderRadius: "28px",
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(32px) saturate(140%)",
                WebkitBackdropFilter: "blur(32px) saturate(140%)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderTop: "1.5px solid rgba(255, 255, 255, 0.55)",
                boxShadow: "0 25px 70px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.4)",
              }}
            >
              <GitHubActivity />
            </GlassCard>
          </div>
        </section>

        {/* Workflow & Engineering Philosophy (Workflow) */}
        <WorkflowSection />

        {/* Contact Section */}
        <ContactSection
          contactForm={contactForm}
          setContactForm={setContactForm}
          handleContactSubmit={handleContactSubmit}
          sending={sending}
          formStatus={formStatus}
        />

        {/* Semantic Footer */}
        <Footer onCvClick={() => setCvModalOpen(true)} />
      </div>

      {/* ═══════════════════════════════════════════════════════
          MODALS & DIALOGS (CV, DIRECT CONTACT, PROJECT DETAILS)
      ═══════════════════════════════════════════════════════ */}

      {/* CV PDF Viewer Modal */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        cvUrl="/cv_erga.pdf"
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        contactForm={contactForm}
        setContactForm={setContactForm}
        handleContactSubmit={handleContactSubmit}
        sending={sending}
        formStatus={formStatus}
      />

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
