"use client";
import { useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WorksSection from "@/components/sections/WorksSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import EducationSection from "@/components/sections/EducationSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  /* ── Scroll Reveal ───────────────────────────────────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Section Divider component ───────────────────────────── */
  const Divider = ({ num }: { num: string }) => (
    <div
      style={{
        padding: "0 var(--sp-xl)",
        margin: "0 auto",
        maxWidth: "var(--max-width)",
        opacity: 0.1,
      }}
    >
      <div style={{ height: "1px", background: "var(--border)" }} />
    </div>
  );

  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <Divider num="01" />
        <AboutSection />
        <Divider num="02" />
        <WorksSection />
        <Divider num="03" />
        <SkillsSection />
        <Divider num="04" />
        <ExperienceSection />
        <Divider num="05" />
        <EducationSection />
        <Divider num="06" />
        <ServicesSection />
        <Divider num="07" />
        <TestimonialsSection />
        <Divider num="08" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
