"use client";
import Footer from "@/components/layout/Footer";
import Taskbar from "@/components/layout/Taskbar";
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
  /* ── Section Divider component ───────────────────────────── */
  const Divider = () => (
    <div
      style={{
        padding: "0 var(--sp-xl)",
        margin: "64px auto",
        maxWidth: "var(--max-width)",
      }}
    >
      <div style={{ borderTop: "4px solid #000000" }} />
    </div>
  );

  return (
    <>
      <main>
        <HeroSection />
        <Divider />
        <AboutSection />
        <Divider />
        <WorksSection />
        <Divider />
        <SkillsSection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <EducationSection />
        <Divider />
        <ServicesSection />
        <Divider />
        <TestimonialsSection />
        <Divider />
        <ContactSection />
      </main>
      <Footer />
      <Taskbar />
    </>
  );
}
