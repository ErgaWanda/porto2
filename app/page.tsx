"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HeroDescription } from "@/components/landing/HeroDescription";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { SkillsSection } from "@/components/landing/SkillsSection";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { CvModal } from "@/components/landing/CvModal";
import { ContactModal } from "@/components/landing/ContactModal";
import ProjectModal from "@/components/ui/ProjectModal";
import GitHubActivity from "@/components/sections/GitHubActivity";
import { TechStackMarquee } from "@/components/landing/TechStackMarquee";
import { DeveloperBentoGrid } from "@/components/landing/DeveloperBentoGrid";
import { TechArchitectureShowcase } from "@/components/landing/TechArchitectureShowcase";
import { ScrollProgressHUD } from "@/components/ui/ScrollProgressHUD";
import { projects } from "@/data/projects";
import { NavItem } from "@/components/landing/types";

export default function Home() {
  // Navigation & Modal States
  const [activeNav, setActiveNav] = useState<string>("ledger");
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

  // Navigation Items
  const navItems: NavItem[] = useMemo(
    () => [
      { id: "ledger", num: "01", label: "Telemetri", href: "#ledger" },
      { id: "architecture", num: "02", label: "Arsitektur", href: "#architecture" },
      { id: "projects", num: "03", label: "Proyek", href: "#projects" },
      { id: "experience", num: "04", label: "Pengalaman", href: "#experience" },
      { id: "skills", num: "05", label: "Keahlian", href: "#skills" },
      { id: "github", num: "06", label: "GitHub", href: "#github" },
      { id: "workflow", num: "07", label: "Metodologi", href: "#workflow" },
    ],
    []
  );

  // Lenis Smooth Scroll Reference
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock/Unlock Lenis when modals are open
  useEffect(() => {
    if (contactModalOpen || cvModalOpen || selectedProject) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [contactModalOpen, cvModalOpen, selectedProject]);

  // Smooth scroll handler
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -70, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    const targetMap: Record<string, string> = {
      ledger: "ledger",
      projects: "projects",
      architecture: "architecture",
      experience: "experience",
      skills: "skills",
      github: "github",
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
        setFormStatus({ type: "success", text: "✓ Pesan berhasil terkirim langsung ke email Erga!" });
        setTimeout(() => setFormStatus(null), 8000);
      } else {
        throw new Error("Gagal mengirim");
      }
    } catch {
      setFormStatus({ type: "error", text: "Membuka email langsung ke ewandaafriza@gmail.com..." });
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
    <div className="page">
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>

      <Navbar
        navItems={navItems}
        activeId={activeNav}
        onSelectNav={handleNavClick}
        onContactClick={() => setContactModalOpen(true)}
        onCvClick={() => setCvModalOpen(true)}
      />

      <main id="main-content" tabIndex={-1}>
        {/* ── 00 · Nameplate ─────────────────────────────────── */}
        <section id="hero" data-hue="flame" className="band-bleed hero-wrap">
          <div className="sheet">
            <div className="hero-band">
              <Hero
                onPrimaryCta={() => scrollTo("projects")}
                onSecondaryCta={() => setCvModalOpen(true)}
                primaryLabel="Jelajahi Proyek"
                secondaryLabel="Unduh CV"
                supportingText="IT Developer yang berspesialisasi membangun sistem backend scalable dan antarmuka frontend reaktif untuk produksi. Saat ini bergabung dengan RDS Group."
                onScrollDown={() => scrollTo("projects")}
              />

              <HeroDescription
                text="IT Developer di RDS Group. Riwayat rekayasa sistem mencakup platform sertifikasi nasional LSP CoachPro dan 3 sistem internal kepegawaian Pusdatin Kementerian Pertahanan RI."
                roleBadge="IT Developer"
                location="Jakarta & Bekasi, Indonesia"
              />
            </div>
          </div>
        </section>

        {/* ── 01 · Impact ledger ─────────────────────────────── */}
        <DeveloperBentoGrid
          onOpenCv={() => setCvModalOpen(true)}
          onOpenContact={() => scrollTo("contact")}
          onSelectProject={(projectId) => {
            const p = projects.find((item) => item.id === projectId);
            if (p) setSelectedProject(p);
          }}
        />

        <TechStackMarquee />

        {/* Each section owns its own band + inner .sheet, so nothing
            here may constrain the width. */}
        <TechArchitectureShowcase />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <ExperienceSection />
        <SkillsSection />
        <GitHubActivity />
        <WorkflowSection />
        <ContactSection
          contactForm={contactForm}
          setContactForm={setContactForm}
          handleContactSubmit={handleContactSubmit}
          sending={sending}
          formStatus={formStatus}
        />
      </main>

      <Footer onCvClick={() => setCvModalOpen(true)} />

      {/* ── Dialogs ──────────────────────────────────────────── */}
      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        cvUrl="/cv_erga.pdf"
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        contactForm={contactForm}
        setContactForm={setContactForm}
        handleContactSubmit={handleContactSubmit}
        sending={sending}
        formStatus={formStatus}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ScrollProgressHUD
        onScrollToTop={() => scrollTo("hero")}
        onSectionChange={setActiveNav}
      />
    </div>
  );
}
