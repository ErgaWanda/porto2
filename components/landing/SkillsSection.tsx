"use client";

import React from "react";
import { FiCloud, FiCpu, FiDatabase, FiLayout, FiServer } from "react-icons/fi";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import "@/styles/skills.css";

const STEPS = 5;

type SkillGroup = {
  num: string;
  pillar: string;
  title: string;
  level: string;
  /** Ordinal self-assessment, 1–5, mapped from `level`. */
  rank: number;
  /** Muted ground for the lower band only; `undefined` keeps --surface. */
  tone?: "stone" | "moss";
  icon: React.ReactNode;
  span: 4 | 6;
  desc: string;
  skills: string[];
};

const SKILL_GROUPS: SkillGroup[] = [
  {
    num: "01",
    pillar: "BACKEND & FRAMEWORKS",
    title: "Backend Engineering",
    level: "HIGH CONCURRENCY",
    rank: 5,
    icon: <FiServer size={22} />,
    span: 4,
    desc: "Layanan backend scalable, RESTful API performa tinggi, konkurensi goroutines, dan arsitektur pola MVC.",
    skills: ["Golang (Echo)", "Laravel", "CodeIgniter", "Node.js", "C# / ASP.NET", "Kotlin"],
  },
  {
    num: "02",
    pillar: "FRONTEND & UI/UX",
    title: "Frontend Engineering",
    level: "REACTIVE & MODULAR",
    rank: 5,
    icon: <FiLayout size={22} />,
    span: 4,
    desc: "Antarmuka responsif modern, arsitektur modular, reusable components, dan token-based CSS styling.",
    skills: ["React", "Vue.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Design Tokens", "Vite"],
  },
  {
    num: "03",
    pillar: "DATABASES & CACHING",
    title: "Basis Data & In-Memory Cache",
    level: "LOW LATENCY",
    rank: 4,
    icon: <FiDatabase size={22} />,
    span: 4,
    desc: "Manajemen data relasional terstruktur, skema database ternormalisasi, dan layer caching memori berkecepatan tinggi.",
    skills: ["PostgreSQL", "MySQL", "Redis", "Database Schema Design", "Query Optimization"],
  },
  {
    num: "04",
    pillar: "AI & MACHINE LEARNING",
    title: "AI & Machine Learning",
    level: "NLP & PREDICTIVE ML",
    rank: 4,
    tone: "stone",
    icon: <FiCpu size={22} />,
    span: 6,
    desc: "Pemrosesan bahasa alami (NLP BERT, Naive Bayes), benchmark model prediktif (Random Forest, XGBoost), dan computer vision.",
    skills: ["Python", "BERT", "Random Forest", "XGBoost", "Naive Bayes", "Sentiment Analysis", "CNN", "Computer Vision"],
  },
  {
    num: "05",
    pillar: "DEVOPS & ARCHITECTURE",
    title: "DevOps & Deployment",
    level: "CONTAINERIZED & VPS",
    rank: 4,
    tone: "moss",
    icon: <FiCloud size={22} />,
    span: 6,
    desc: "Containerization mandiri dengan Docker, reverse proxy Nginx, version control Git, dan deployment VPS tanpa tim DevOps khusus.",
    skills: ["Docker", "Nginx", "Git", "Postman", "VPS Deployment", "RESTful API Design", "MVC Pattern"],
  },
];

const SkillCell: React.FC<{ group: SkillGroup }> = ({ group }) => {
  const classes = [
    "skill",
    group.span === 6 ? "skill--wide" : null,
    group.tone ? `skill--${group.tone}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes}>
      <div className="cell__head">
        <div className="skill__stamp">
          <span className="skill__num">{group.num}</span>
          <span className="mono">{group.pillar}</span>
        </div>
        <span className="skill__icon" aria-hidden="true">
          {group.icon}
        </span>
      </div>

      <h3 className="display-m skill__title"><span className="hl">{group.title}</span></h3>
      <p className="lede skill__desc">{group.desc}</p>

      <div className="skill__foot">
        <div className="meter">
          <div className="meter__scale" aria-hidden="true">
            <span
              className="meter__fill"
              style={{ ["--pct" as string]: `${(group.rank / STEPS) * 100}%` }}
            />
          </div>
          <div className="meter__row">
            <span className="mono">{group.level}</span>
            <span className="mono mono--signal meter__rank">
              {group.rank}/{STEPS}
            </span>
          </div>
        </div>

        <hr className="rule" />

        <div className="wrap-tags skill__tags">
          {group.skills.map((skill) => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" data-hue="grape" className="band-bleed">
      <div className="sheet">
        <SectionHead
          index="05"
          title="Keahlian & penguasaan teknologi"
          subtitle="Matriks keterampilan yang dipetakan langsung dari CV: bahasa pemrograman, framework backend, database relasional & in-memory cache, antarmuka reaktif, machine learning, hingga deployment mandiri."
          meta="Technical capabilities // core stack"
        />

        <Reveal className="bento skills">
          {SKILL_GROUPS.map((group) => (
            <SkillCell key={group.num} group={group} />
          ))}
        </Reveal>
      </div>
    </section>
  );
};
