"use client";

import React from "react";
import {
  SiDotnet, SiGo, SiDocker, SiPostgresql, SiRedis, SiPython,
  SiKotlin, SiMysql, SiNodedotjs, SiTailwindcss, SiPostman, SiCodeigniter,
  SiNextdotjs, SiVuedotjs, SiNginx, SiGit, SiLaravel,
} from "react-icons/si";

const TECH = [
  { name: "Golang · Echo", icon: <SiGo size={14} /> },
  { name: "C# · ASP.NET", icon: <SiDotnet size={14} /> },
  { name: "Laravel", icon: <SiLaravel size={14} /> },
  { name: "CodeIgniter", icon: <SiCodeigniter size={14} /> },
  { name: "Node.js", icon: <SiNodedotjs size={14} /> },
  { name: "Kotlin", icon: <SiKotlin size={14} /> },
  { name: "PostgreSQL", icon: <SiPostgresql size={14} /> },
  { name: "MySQL", icon: <SiMysql size={14} /> },
  { name: "Redis", icon: <SiRedis size={14} /> },
  { name: "React · Vite", icon: <SiNextdotjs size={14} /> },
  { name: "Vue.js", icon: <SiVuedotjs size={14} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={14} /> },
  { name: "Python · BERT", icon: <SiPython size={14} /> },
  { name: "Docker", icon: <SiDocker size={14} /> },
  { name: "Nginx", icon: <SiNginx size={14} /> },
  { name: "Postman", icon: <SiPostman size={14} /> },
  { name: "Git", icon: <SiGit size={14} /> },
];

/** Ink band that scrolls the production stack. Duplicated once for a seamless loop. */
export const TechStackMarquee: React.FC = () => {
  const run = [...TECH, ...TECH];

  return (
    <div className="marquee" aria-label="Teknologi yang digunakan di produksi">
      <div className="marquee__track" aria-hidden="true">
        {run.map((t, i) => (
          <span key={`${t.name}-${i}`} className="marquee__item">
            {t.icon}
            {t.name}
            <span className="marquee__sep" />
          </span>
        ))}
      </div>
      <span className="visually-hidden">
        {TECH.map((t) => t.name).join(", ")}
      </span>
    </div>
  );
};
