"use client";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
  } as const;

  const tagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  } as const;

  return (
    <section className="section" id="keahlian">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="section-header-line"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="t-label">Keahlian Teknis</span>
        </motion.div>
        <motion.h2 
          className="t-h1" 
          style={{ marginBottom: "48px", marginTop: "12px" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stack &<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Kemampuan</span>
        </motion.h2>

        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              className="skills-category"
              variants={cardVariants}
              whileHover={{ 
                borderColor: "var(--primary)",
                boxShadow: "0 10px 25px rgba(99, 102, 241, 0.05)",
                y: -3
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="skills-category-title">
                <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                  {cat.icon}
                </span>
                {cat.title}
              </div>

              {cat.skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        height: "100%",
                        background: "linear-gradient(90deg, var(--primary), var(--accent))",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Tech tag cloud */}
        <motion.div 
          style={{ marginTop: "48px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="t-label" style={{ marginBottom: "16px", color: "var(--text-bright)" }}>
            Teknologi Tambahan
          </div>
          <motion.div 
            className="skill-tag-cloud"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techTags.map((tag) => (
              <motion.span 
                key={tag} 
                className="skill-tag"
                variants={tagVariants}
                whileHover={{ scale: 1.05, borderColor: "var(--primary)", backgroundColor: "rgba(99, 102, 241, 0.05)" }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
