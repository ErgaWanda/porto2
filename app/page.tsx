"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

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
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 15 }
    }
  };

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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

  // Stepper process data
  const processSteps = [
    {
      num: "01",
      title: "DISCOVER",
      desc: "Understanding goals, audience, and project requirements.",
      icon: (
        <svg style={{ width: "14px", height: "14px", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      )
    },
    {
      num: "02",
      title: "IDEATE",
      desc: "Planning, wireframing, and creating the right concept.",
      icon: (
        <svg style={{ width: "14px", height: "14px", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      num: "03",
      title: "DESIGN",
      desc: "Crafting visual design with a focus on user experience.",
      icon: (
        <svg style={{ width: "14px", height: "14px", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      num: "04",
      title: "DEVELOP",
      desc: "Building fast, responsive, and high-performing websites.",
      icon: (
        <svg style={{ width: "14px", height: "14px", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      num: "05",
      title: "DELIVER",
      desc: "Testing, optimizing, and launching with perfection.",
      icon: (
        <svg style={{ width: "14px", height: "14px", color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    }
  ];

  // Displayed projects list
  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  // Complete Skills list grouped by category from CV PDF
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["JavaScript", "Golang", "Python", "Kotlin", "HTML", "CSS"]
    },
    {
      title: "Backend & Frameworks",
      skills: ["Golang (Echo)", "Laravel", "CodeIgniter", "Node.js"]
    },
    {
      title: "Frontend & Styling",
      skills: ["Vue.js", "Tailwind CSS"]
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "MySQL", "Redis"]
    },
    {
      title: "AI & Machine Learning",
      skills: ["Computer Vision", "Sentiment Analysis", "CNN", "Naive Bayes", "BERT", "Random Forest", "XGBoost"]
    },
    {
      title: "DevOps & Architecture",
      skills: ["Docker", "Nginx", "Git", "Postman", "RESTful API", "MVC Pattern"]
    }
  ];

  return (
    <div className="relative min-h-screen text-white bg-[#070708] font-body selection:bg-[#E21E26] selection:text-white">
      {/* 1. Header / Navbar */}
      <header className="navbar">
        <div className="container-premium navbar-content">
          <div className="navbar-left">
            <span className="navbar-left-role">FULL STACK DEVELOPER</span>
            <span className="navbar-left-title">AI ENGINEER</span>
          </div>
          <div className="navbar-right">
            AVAILABLE FOR HIRE <span style={{ color: "var(--accent-red)", marginLeft: "4px" }}>✦</span>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="hero">
        {/* Giant Red Outline text in background */}
        <div className="hero-bg-text">
          <div className="hero-bg-text-inner">
            PORTFOLIO
          </div>
        </div>

        <div className="container-premium relative z-10">
          <div className="hero-grid">
            {/* Left Info Column */}
            <motion.div 
              className="hero-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="hero-greeting" variants={fadeInLeft}>
                Hello, I'm
              </motion.span>
              <motion.h1 className="hero-name" variants={fadeInLeft}>
                ERGA<br />WANDA
              </motion.h1>
              <motion.div className="hero-subtitle" variants={fadeInLeft}>
                FULL STACK DEVELOPER & AI ENGINEER
              </motion.div>
              <motion.p className="hero-desc" variants={fadeInLeft}>
                I architect and build end-to-end web applications and integrate advanced Machine Learning models (BERT, NLP, CV) into practical, user-facing products. Skilled in Golang, Laravel, Vue.js, and Docker.
              </motion.p>
              
              {/* Worldwide location link */}
              <motion.div className="font-mono" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "white" }} variants={fadeInLeft}>
                <FiGlobe style={{ color: "var(--accent-red)", fontSize: "14px" }} className="animate-spin-slow" />
                AVAILABLE WORLDWIDE
              </motion.div>
            </motion.div>

            {/* Center Portrait Image Column */}
            <motion.div 
              className="hero-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.25 }}
            >
              <div className="portrait-frame" style={{ border: "none", background: "transparent", backgroundColor: "transparent", boxShadow: "none", borderRadius: "0", overflow: "hidden" }}>
                <Image
                  src="/images/erga_photo_nobg.png"
                  alt="Erga Wanda Afriza"
                  fill
                  priority
                  unoptimized
                  className="portrait-image"
                />
                {/* Subtle elegant gradient mask at bottom */}
                <div className="portrait-mask" />
              </div>
            </motion.div>

            {/* Right Stats & Badge Column */}
            <motion.div 
              className="hero-right"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Spinning Badge */}
              <motion.div className="badge-container" variants={fadeInRight}>
                <svg viewBox="0 0 100 100" className="animate-spin-slow" style={{ width: "100%", height: "100%" }}>
                  <defs>
                    <path id="circlePathHero" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
                  </defs>
                  <text fill="#9E9EA4" fontSize="7.2" fontWeight="600" letterSpacing="0.6px" className="font-mono uppercase" style={{ textTransform: "uppercase" }}>
                    <textPath xlinkHref="#circlePathHero">
                      • TURNING IDEAS INTO POWERFUL DIGITAL EXPERIENCES
                    </textPath>
                  </text>
                </svg>
                {/* Central Star Icon */}
                <div style={{ position: "absolute", color: "var(--accent-red)", fontSize: "20px" }}>✦</div>
              </motion.div>

              {/* Stacked Stats */}
              <motion.div className="stats-list" variants={fadeInRight}>
                <div className="stat-item">
                  <span className="stat-number">3+</span>
                  <span className="stat-label">YEARS EXPERIENCE</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">PROJECTS DELIVERED</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">SUCCESS RATE</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Selected Projects Section */}
      <section className="projects-section">
        <div className="container-premium">
          {/* Header row */}
          <div className="projects-header">
            <h2 className="title-section">SELECTED PROJECTS</h2>
            <div className="projects-header-line" />
            <button 
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="projects-toggle-btn"
            >
              {showAllProjects ? "COLLAPSE PROJECTS" : "VIEW ALL PROJECTS"} <span style={{ fontSize: "16px" }}>→</span>
            </button>
          </div>

          {/* Cards Grid */}
          <motion.div 
            className="projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {displayedProjects.map((p, idx) => (
              <motion.div 
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className="project-card"
                variants={fadeInUp}
              >
                {/* Visual Card Image */}
                <div className="project-thumbnail-wrapper">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    unoptimized
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Card footer details matching design */}
                <div className="project-card-footer">
                  {/* Big red number */}
                  <span className="project-index">
                    0{idx + 1}
                  </span>
                  
                  {/* Title details */}
                  <div className="project-meta">
                    <h3 className="project-title">
                      {p.title.split(" — ")[0]}
                    </h3>
                    <p className="project-category">
                      {p.type}
                    </p>
                  </div>

                  {/* Arrow indicator horizontal long */}
                  <span className="project-arrow">
                    <svg style={{ width: "24px", height: "12px" }} fill="none" viewBox="0 0 24 12" stroke="currentColor" strokeWidth="1.5">
                      <line x1="0" y1="6" x2="22" y2="6" />
                      <polyline points="17,1 22,6 17,11" />
                    </svg>
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Experience & Skills Section */}
      <section className="info-section">
        <div className="container-premium">
          <motion.div 
            className="info-grid-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            {/* Left Column: Experience */}
            <motion.div variants={fadeInLeft}>
              <h3 className="title-section" style={{ fontSize: "20px", marginBottom: "32px" }}>PROFESSIONAL EXPERIENCE</h3>
              
              <div style={{ marginBottom: "16px" }}>
                <h4 className="subtitle-red" style={{ marginBottom: "20px" }}>WORK & INTERNSHIP HISTORY</h4>
                <div className="edu-list" style={{ gap: "32px" }}>
                  
                  {/* LSP CoachPro */}
                  <div className="edu-item">
                    <div className="edu-header">
                      <span className="edu-title" style={{ fontSize: "14px", fontWeight: "800" }}>Full Stack Developer</span>
                      <span className="edu-date">December 2025 - June 2026</span>
                    </div>
                    <p className="edu-school" style={{ color: "var(--accent-red)", fontWeight: "500" }}>LSP CoachPro Indonesia (Maganghub Kemnaker Program)</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Architected and developed an end-to-end certification management platform from scratch, digitizing the full workflow from pre-assessment to final competency decisions for a national government training program.
                      </li>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Built a scalable backend with Golang and PostgreSQL, implementing Redis caching to noticeably reduce API response time and support concurrent access during peak usage.
                      </li>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Deployed and maintained the production system using Docker and Nginx on a VPS, ensuring stable, continuous uptime for end users.
                      </li>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Designed a responsive Vue.js interface that streamlined the certification review process for administrators and assessors.
                      </li>
                    </ul>
                  </div>

                  {/* Pusdatin Kemenhan */}
                  <div className="edu-item">
                    <div className="edu-header">
                      <span className="edu-title" style={{ fontSize: "14px", fontWeight: "800" }}>Software Engineer Intern</span>
                      <span className="edu-date">June 2024 - December 2024</span>
                    </div>
                    <p className="edu-school" style={{ color: "var(--accent-red)", fontWeight: "500" }}>Pusdatin, Ministry of Defense of the Republic of Indonesia</p>
                    <ul style={{ listStyleType: "disc", paddingLeft: "20px", marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Designed and delivered 3 internal management systems (Employee Information Portal, Activity Calendar, Daily Report System) within a 6-month internship using Laravel, Vue.js, and MySQL.
                      </li>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Digitized employee record management across multiple departments, replacing manual, paper-based processes and speeding up data retrieval.
                      </li>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Implemented real-time synchronization for departmental event scheduling, reducing manual coordination and minimizing scheduling conflicts.
                      </li>
                      <li style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                        Automated daily activity reporting, replacing manual paperwork and improving the speed and accuracy of supervisor evaluations.
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* Right Column: Education & Skills */}
            <motion.div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: "40px" }} variants={fadeInRight}>
              <div>
                <h3 className="title-section" style={{ fontSize: "20px", marginBottom: "32px" }}>EDUCATION</h3>
                <h4 className="subtitle-red" style={{ marginBottom: "16px" }}>ACADEMIC BACKGROUND</h4>
                <div className="edu-list">
                  <div className="edu-item">
                    <div className="edu-header">
                      <span className="edu-title" style={{ fontSize: "13px", fontWeight: "800" }}>Bachelor of Information Technology</span>
                      <span className="edu-date">2021 - 2025</span>
                    </div>
                    <p className="edu-school">Darma Persada University</p>
                    <p style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", marginTop: "4px" }}>GPA: 3.23 / 4.00</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="title-section" style={{ fontSize: "20px", marginBottom: "20px" }}>SKILLS</h3>
                <h4 className="subtitle-red" style={{ marginBottom: "20px" }}>CORE COMPETENCIES</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {skillCategories.map((cat) => (
                    <div key={cat.title}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                        {cat.title}
                      </div>
                      <div className="skills-badge-list" style={{ marginTop: 0 }}>
                        {cat.skills.map((skill) => (
                          <span key={skill} className="pill-badge" style={{ padding: "6px 12px", fontSize: "10px" }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 5. Work Process & Testimonial Section */}
      <section className="info-section" style={{ paddingTop: "0" }}>
        <div className="container-premium">
          <motion.div 
            className="info-grid-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            {/* Left Column: Work Process */}
            <motion.div variants={fadeInLeft}>
              <h3 className="title-section" style={{ fontSize: "20px", marginBottom: "32px" }}>WORK PROCESS</h3>
              <div className="process-timeline">
                {/* Connecting line */}
                <div className="process-timeline-line" />
                
                {processSteps.map((step) => (
                  <div key={step.num} className="process-step">
                    <div className="process-step-num">
                      {step.num}
                    </div>
                    <div className="process-step-circle">
                      {step.icon}
                    </div>
                    <div className="process-step-content">
                      <h4 className="process-step-title">
                        {step.title}
                      </h4>
                      <p className="process-step-desc">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Quote Card */}
            <motion.div style={{ display: "flex", alignItems: "stretch" }} variants={fadeInRight}>
              <div className="signature-card">
                <div>
                  <div className="signature-card-quote-icon">“</div>
                  <p className="signature-card-text">
                    Good design is not just how it looks, but how it works.
                  </p>
                </div>
                <div className="signature-card-footer">
                  <span className="signature-card-name">Erga Wanda</span>
                  <span className="signature-card-tag">LET'S CREATE SOMETHING GREAT TOGETHER.</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

          </div>
        </div>
      </section>

      {/* 6. Footer / Let's Work Together Section */}
      <footer className="footer">
        <div className="container-premium">
          <div className="footer-grid">
            {/* Left CTA block */}
            <div className="footer-left">
              <h2 className="footer-title">
                LET'S WORK<br />TOGETHER <span style={{ color: "var(--accent-red)" }}>✦</span>
              </h2>
              <p className="footer-desc">
                I'm currently open for new projects and collaborations. Let's create something amazing that drives results.
              </p>
              
              {/* Call-to-action button opening contact modal */}
              <button 
                onClick={() => setContactModalOpen(true)}
                className="btn-freelance"
              >
                <div className="btn-freelance-circle">
                  <span className="btn-freelance-arrow">
                    <svg style={{ width: "12px", height: "12px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <polyline points="14,4 22,12 14,20" />
                    </svg>
                  </span>
                </div>
                AVAILABLE FOR FREELANCE
              </button>
            </div>

            {/* Middle Contact Info column */}
            <div className="contact-list">
              <a 
                href="mailto:ewandaafriza@gmail.com" 
                className="contact-item-row"
              >
                <div className="contact-item-circle">
                  <FiMail />
                </div>
                <span className="contact-item-text">ewandaafriza@gmail.com</span>
              </a>

              <a 
                href="https://github.com/ErgaWanda" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-item-row"
              >
                <div className="contact-item-circle">
                  <FiGlobe />
                </div>
                <span className="contact-item-text">github.com/ErgaWanda</span>
              </a>

              <a 
                href="https://wa.me/6288291067259" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-item-row"
              >
                <div className="contact-item-circle">
                  <FaWhatsapp />
                </div>
                <span className="contact-item-text">+62 882 9106 7259</span>
              </a>

              <div className="contact-item-row" style={{ cursor: "default" }}>
                <div className="contact-item-circle">
                  <FiMapPin />
                </div>
                <span className="contact-item-text">Jakarta, Indonesia</span>
              </div>
            </div>

            {/* Right Laptop Mockup Column */}
            <div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", justifyContent: "center" }}>
                {/* Mug */}
                <div style={{
                  width: "36px",
                  height: "44px",
                  backgroundColor: "#111113",
                  border: "1px solid var(--border-color)",
                  borderRadius: "4px 4px 8px 8px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "4px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                  flexShrink: 0
                }}>
                  {/* Mug Handle */}
                  <div style={{
                    width: "10px",
                    height: "22px",
                    border: "1px solid var(--border-color)",
                    borderLeft: "none",
                    borderRadius: "0 8px 8px 0",
                    position: "absolute",
                    right: "-9px",
                    top: "10px"
                  }} />
                  {/* Letter R */}
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: "900", color: "var(--text-muted)", letterSpacing: "0" }}>R</span>
                </div>

                {/* Laptop Device */}
                <div className="laptop-device" style={{ width: "240px", flexShrink: 0 }}>
                  <div className="laptop-screen" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "12px" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "15px", color: "#FFF", lineHeight: "1.1", textTransform: "uppercase", textAlign: "center" }}>
                      WE<br />DESIGN<br /><span style={{ color: "var(--accent-red)" }}>DIGITAL</span><br />EXPERIENCES
                    </div>
                    {/* Screen Glare overlay */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to tr, transparent, rgba(255,255,255,0.03), transparent)", pointerEvents: "none" }} />
                  </div>
                  <div className="laptop-keyboard-base">
                    <div className="laptop-keyboard-notch" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 6. Projects Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* 7. Contact Form Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactModalOpen(false)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", maxWidth: "480px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column" }}
            >
              {/* Modal header */}
              <div style={{ borderBottom: "1px solid var(--border-color)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#070708" }}>
                <div className="font-mono" style={{ fontSize: "11px", color: "white", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FiMail style={{ color: "var(--accent-red)" }} /> SEND MESSAGE
                </div>
                <button 
                  onClick={() => setContactModalOpen(false)}
                  style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1px solid var(--border-color)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "var(--text-secondary)", transition: "all 0.2s" }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--accent-red)"; e.currentTarget.style.backgroundColor = "var(--accent-red)"; e.currentTarget.style.color = "white"; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                >
                  ✕
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleContactSubmit} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "9px", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>FULL NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Erga Wanda"
                    className="form-input-premium"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "9px", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="form-input-premium"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "9px", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>SUBJECT</label>
                  <input
                    type="text"
                    required
                    placeholder="Discussion Subject"
                    className="form-input-premium"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="font-mono" style={{ display: "block", fontSize: "9px", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>MESSAGE</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write details of your ideas or collaboration needs..."
                    className="form-input-premium"
                    style={{ resize: "none" }}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <div style={{ marginTop: "8px" }}>
                  <button 
                    type="submit" 
                    disabled={sending}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {sending ? "SENDING..." : "SEND MESSAGE NOW"}
                  </button>
                </div>

                <AnimatePresence>
                  {sent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="submit-success-text"
                    >
                      ✓ MESSAGE SENT SUCCESSFULLY! THANK YOU.
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
