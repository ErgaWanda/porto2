"use client";
import { useEffect, useRef } from "react";

const categories = [
  {
    title: "Bahasa & Framework Backend",
    icon: "⬡",
    skills: [
      { name: "Golang (Echo Framework)", pct: 85 },
      { name: "PHP (Laravel / CodeIgniter)", pct: 88 },
      { name: "Node.js", pct: 72 },
      { name: "Python (Backend & ML)", pct: 80 },
    ],
  },
  {
    title: "Frontend & UI",
    icon: "◈",
    skills: [
      { name: "Vue.js", pct: 85 },
      { name: "JavaScript / TypeScript", pct: 80 },
      { name: "HTML / CSS", pct: 90 },
    ],
  },
  {
    title: "Database & DevOps",
    icon: "▣",
    skills: [
      { name: "PostgreSQL / MySQL", pct: 82 },
      { name: "Redis", pct: 70 },
      { name: "Docker", pct: 75 },
      { name: "Git / Postman", pct: 88 },
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "◎",
    skills: [
      { name: "Machine Learning (Scikit-learn)", pct: 80 },
      { name: "NLP (BERT, Naive Bayes)", pct: 78 },
      { name: "Computer Vision (CNN)", pct: 72 },
      { name: "Sentiment Analysis", pct: 82 },
    ],
  },
];

const techTags = [
  "RESTful API", "MVC Pattern", "Third-Party API", "Microservices",
  "Nginx", "VPS Deployment", "Random Forest", "XGBoost",
  "Transformers", "Kotlin", "Android",
];

export default function SkillsSection() {
  const barRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLDivElement;
            const pct = el.getAttribute("data-pct");
            if (pct) el.style.setProperty("--skill-pct", pct + "%");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    barRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  let refIdx = 0;

  return (
    <section className="section" id="keahlian">
      <div className="container">
        {/* Header */}
        <div className="section-header-line reveal">
          <span className="t-label">Keahlian Teknis</span>
        </div>
        <h2 className="t-h1 reveal reveal-delay-1" style={{ marginBottom: "48px", marginTop: "12px" }}>
          Stack &<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kemampuan</span>
        </h2>

        <div className="skills-grid">
          {categories.map((cat, ci) => (
            <div
              key={cat.title}
              className={`skills-category reveal reveal-delay-${Math.min(ci + 1, 4)}`}
            >
              <div className="skills-category-title">
                <span style={{ color: "var(--amber)", fontFamily: "var(--font-mono)" }}>
                  {cat.icon}
                </span>
                {cat.title}
              </div>

              {cat.skills.map((skill) => {
                const idx = refIdx++;
                return (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-pct">{skill.pct}%</span>
                    </div>
                    <div
                      className="skill-bar"
                      ref={(el) => {
                        if (el) barRefs.current[idx] = el;
                      }}
                      data-pct={skill.pct}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Tech tag cloud */}
        <div className="reveal reveal-delay-2" style={{ marginTop: "48px" }}>
          <div className="t-label" style={{ marginBottom: "16px", color: "var(--muted-bright)" }}>
            Teknologi Tambahan
          </div>
          <div className="skill-tag-cloud">
            {techTags.map((tag) => (
              <span key={tag} className="skill-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
