"use client";

import React from "react";
import { FiBriefcase, FiCalendar, FiCheck, FiMapPin } from "react-icons/fi";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { InkNote } from "@/components/ui/InkNote";
import "@/styles/experience.css";

type Experience = {
  id: string;
  role: string;
  company: string;
  companyShort: string;
  period: string;
  isCurrent: boolean;
  badge: string;
  location: string;
  desc: string;
  stack: string[];
  bullets: string[];
};

const EXPERIENCES: Experience[] = [
  {
    id: "rds",
    role: "IT Developer",
    company: "RDS Group",
    companyShort: "RDS",
    period: "Juli 2026 – Sekarang",
    isCurrent: true,
    badge: "PERAN SAAT INI // RDS GROUP",
    location: "Indonesia",
    desc: "Peran profesional saat ini sebagai IT Developer di RDS Group, bertanggung jawab pada pengembangan dan pemeliharaan aplikasi serta infrastruktur TI perusahaan.",
    stack: [],
    bullets: [],
  },
  {
    id: "coachpro",
    role: "Full Stack Developer",
    company: "LSP CoachPro Indonesia (Maganghub Kemnaker)",
    companyShort: "LSP",
    period: "Desember 2025 – Juni 2026",
    isCurrent: false,
    badge: "SOLE FULL STACK DEVELOPER // PRODUCTION CORE",
    location: "Jakarta, Indonesia",
    desc: "Bertanggung jawab penuh merancang, membangun, dan men-deploy platform sertifikasi manajemen dari awal (from scratch), mendigitalkan seluruh alur asesmen untuk program pelatihan pemerintah nasional.",
    stack: ["Golang (Echo)", "Vue.js", "PostgreSQL", "Redis", "Docker", "Nginx", "Tailwind CSS", "VPS"],
    bullets: [
      "Mendukung 50+ jadwal aktif, 50+ asesor, dan 450+ peserta (asesi) di 12 tempat uji kompetensi (TUK), memproses 450+ evaluasi kompetensi dan menerbitkan 130+ sertifikat.",
      "Membangun backend scalable dengan Golang dan PostgreSQL, mengimplementasikan Redis caching untuk mereduksi response time API dan mendukung konkurensi 50+ asesor serentak saat jam puncak.",
      "Men-deploy dan memelihara sistem produksi secara mandiri menggunakan Docker dan Nginx di VPS, memastikan uptime stabil untuk 450+ pengguna aktif tanpa tim DevOps khusus.",
      "Merancang antarmuka Vue.js responsif yang mengefisiensikan alur peninjauan sertifikasi bagi administrator dan asesor, memangkas waktu review manual secara drastis.",
    ],
  },
  {
    id: "kemenhan",
    role: "Software Engineer Intern",
    company: "Pusdatin, Kementerian Pertahanan Republik Indonesia",
    companyShort: "KEMENHAN",
    period: "Juni 2024 – Desember 2024",
    isCurrent: false,
    badge: "MINISTRY OF DEFENSE // 3 SYSTEMS",
    location: "Jakarta Pusat, Indonesia",
    desc: "Merancang dan membangun 3 sistem manajemen internal (Portal Data Karyawan, Kalender Kegiatan Terpadu, dan Sistem Laporan Harian) dalam periode magang 6 bulan.",
    stack: ["Laravel", "Vue.js", "MySQL", "RESTful API", "MVC Pattern"],
    bullets: [
      "Mendigitalkan pengelolaan data kepegawaian lintas departemen, menggantikan proses manual berbasis kertas dan mempercepat pencarian data.",
      "Mengimplementasikan sinkronisasi real-time untuk penjadwalan kegiatan kedinasan departemen, mengurangi koordinasi manual dan meminimalkan konflik jadwal.",
      "Mengotomasi pelaporan aktivitas harian, menggantikan berkas manual dan meningkatkan kecepatan serta akurasi evaluasi atasan.",
    ],
  },
  {
    id: "unsada",
    role: "S1 Teknologi Informasi (IPK 3.23 / 4.00)",
    company: "Universitas Darma Persada",
    companyShort: "UNSADA",
    period: "2021 – 2025",
    isCurrent: false,
    badge: "S1 TI // IPK 3.23 // S.KOM",
    location: "Jakarta Timur, Indonesia",
    desc: "Menyelesaikan pendidikan Sarjana Teknologi Informasi dengan IPK 3.23 / 4.00. Penelitian skripsi membangun pipeline analisis sentimen opini publik terhadap kampus, dari web scraping hingga dashboard visualisasi.",
    stack: ["Python", "Naive Bayes", "NLP", "Machine Learning", "BERT", "Vue.js"],
    bullets: [
      "Lulus Sarjana Teknologi Informasi (S.Kom) dari Universitas Darma Persada dengan IPK 3.23 / 4.00.",
      "Skripsi: pipeline web scraping dan klasifikasi Naive Bayes atas teks opini publik, divisualkan melalui dashboard interaktif Vue.js.",
    ],
  },
];

/** "A // B" badge copy reads better as two chips than one long one. */
function badgeFlags(badge: string): string[] {
  return badge
    .split("//")
    .map((part) => part.trim())
    .filter(Boolean);
}

const Wins: React.FC<{ bullets: string[] }> = ({ bullets }) => (
  <ul className="tline__list">
    {bullets.map((bullet) => (
      <li key={bullet}>
        <FiCheck size={14} className="tline__check" aria-hidden="true" />
        <span className="tline__win">{bullet}</span>
      </li>
    ))}
  </ul>
);

const TimelineRow: React.FC<{ exp: Experience; order: number }> = ({ exp, order }) => {
  const isLead = exp.isCurrent;

  return (
    <article className={`tline__row${isLead ? " tline__row--current" : ""}`}>
      <span className="tline__tick" aria-hidden="true">
        {String(order).padStart(2, "0")}
      </span>

      {isLead && <InkNote className="tline-note" variant="down" label="entri terbaru" />}

      <div className="tline__body">
        <div className="tline__head">
          <div className="tline__id">
            <span className="mono mono--signal tline__code">
              <FiBriefcase size={12} className="tline__code-ico" aria-hidden="true" />
              {exp.companyShort}
            </span>
            <h3 className="display-m tline__role"><span className="hl">{exp.role}</span></h3>
            <span className="tline__org">{exp.company}</span>
          </div>

          <div className="tline__when">
            <span className="mono mono--ink tline__period">
              <FiCalendar size={12} className="tline__cal" aria-hidden="true" />
              {exp.period}
            </span>
            <span className="tline__loc">
              <FiMapPin size={12} className="tline__pin" aria-hidden="true" />
              {exp.location}
            </span>
          </div>
        </div>

        <div className="row row--tight tline__flags">
          {badgeFlags(exp.badge).map((flag, i) => (
            <span key={flag} className={`chip${isLead && i === 0 ? " chip--ink" : ""}`}>
              {flag}
            </span>
          ))}
        </div>

        <p className="lede tline__desc">{exp.desc}</p>

        {exp.bullets.length > 0 &&
          (isLead ? (
            <div className="panel panel--pad-sm panel--surface2 panel--plate tline__wins">
              <Wins bullets={exp.bullets} />
            </div>
          ) : (
            <Wins bullets={exp.bullets} />
          ))}

        {exp.stack.length > 0 && (
          <div className="wrap-tags tline__stack">
            {exp.stack.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" data-hue="teal" className="band-bleed">
      <div className="sheet">
        <SectionHead
          index="04"
          title="Pengalaman kerja & rekam jejak"
          subtitle="Rekam jejak profesional sejak 2024: sistem backend scalable, platform sertifikasi nasional berkonkurensi tinggi, dan digitalisasi sistem kementerian."
          meta="Pengalaman kerja // career milestones"
        />

        <Reveal className="tline">
          {EXPERIENCES.map((exp, i) => (
            <TimelineRow key={exp.id} exp={exp} order={i + 1} />
          ))}
        </Reveal>
      </div>
    </section>
  );
};
