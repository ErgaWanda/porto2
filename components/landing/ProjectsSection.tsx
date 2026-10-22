"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import {
  FiArrowUpRight,
  FiEye,
  FiFileText,
  FiGithub,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { playPop } from "@/components/ui/SoundFXToggle";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { projects } from "@/data/projects";
import type { Project } from "@/components/ui/ProjectModal";
import "../../styles/projects.css";

interface ProjectsSectionProps {
  onSelectProject: (project: (typeof projects)[0]) => void;
}

/* Animated counter for the category chips */
const AnimatedCounter: React.FC<{ value: number; inView: boolean }> = ({ value, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const startValue = 0;
    const duration = 600;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (value - startValue) * ease));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [value, inView]);

  return <span>{count}</span>;
};

/* Tech tint map: saturated pastels become the muted theme tints,
   expressed as classes instead of inline colour objects. */
const getTechClass = (tech: string): string => {
  const t = tech.toLowerCase();
  if (t.includes("c#") || t.includes(".net") || t.includes("sql server")) {
    return "proj-tag--sand";
  }
  if (
    t.includes("golang") ||
    t.includes("echo") ||
    t.includes("redis") ||
    t.includes("docker") ||
    t.includes("nginx") ||
    t.includes("postgres")
  ) {
    return "proj-tag--sky";
  }
  if (
    t.includes("python") ||
    t.includes("bert") ||
    t.includes("nlp") ||
    t.includes("ml") ||
    t.includes("ai") ||
    t.includes("xgboost") ||
    t.includes("scikit")
  ) {
    return "proj-tag--clay";
  }
  if (
    t.includes("vue") ||
    t.includes("react") ||
    t.includes("typescript") ||
    t.includes("tailwind") ||
    t.includes("framer")
  ) {
    return "proj-tag--moss";
  }
  return "proj-tag--stone";
};

/* Column spans on the 12-track bento. Every row sums to 12 so the
   collapsed hairline rule never opens an ink hole. */
const LAYOUTS: Record<number, number[]> = {
  1: [12],
  2: [8, 4],
  3: [6, 3, 3],
  4: [8, 4, 4, 8],
  5: [8, 4, 4, 4, 4],
  6: [8, 4, 4, 8, 6, 6],
};

const spansFor = (count: number): number[] => {
  if (LAYOUTS[count]) return LAYOUTS[count];
  if (count <= 0) return [];
  const out: number[] = [];
  for (let i = 0; i < count; i += 2) out.push(8, 4);
  out.length = count;
  if (count % 2 === 1) out[count - 1] = 12;
  return out;
};

interface ProjectCardItemProps {
  project: (typeof projects)[0];
  onSelect: () => void;
  getTechClass: (tech: string) => string;
  bentoSpan?: number;
  isWideCard?: boolean;
}

const ProjectCardItem: React.FC<ProjectCardItemProps> = ({
  project: p,
  onSelect,
  getTechClass: techClass,
  bentoSpan = 6,
  isWideCard = false,
}) => {
  const isLive = p.status.toLowerCase() === "live";

  const cardProps = {
    role: "button" as const,
    tabIndex: 0,
    "aria-label": p.title,
    onClick: onSelect,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect();
      }
    },
  };

  const head = (
    <div className="cell__head">
      <div className="row row--tight">
        <span className="chip">{p.type}</span>
        {isLive ? (
          <span className="chip">
            <span className="chip__dot chip__dot--live" aria-hidden="true" />
            Live
          </span>
        ) : (
          <span className="chip">Arsip</span>
        )}
      </div>
      <span className="mono">{p.year}</span>
    </div>
  );

  const media = (
    <span className="mono proj-shots">
      <FiEye size={12} />
      {p.screenshots.length} screenshots
    </span>
  );

  const body = (
    <>
      <h3 className="display-m proj-title">{p.title}</h3>

      {p.subtitle && <p className="proj-sub">{p.subtitle}</p>}

      <p className="proj-desc">{p.desc}</p>

      {isWideCard && p.highlights && p.highlights.length > 0 && (
        <div className="proj-spotlight">
          <span className="mono">Sorotan</span>
          <span className="proj-spotlight__text">{p.highlights[0]}</span>
        </div>
      )}

      <div className="wrap-tags proj-tags">
        {p.stack.slice(0, 5).map((tech) => (
          <span key={tech} className={`tag ${techClass(tech)}`}>
            {tech}
          </span>
        ))}
        {p.stack.length > 5 && <span className="tag proj-tag--more">+{p.stack.length - 5}</span>}
      </div>
    </>
  );

  const foot = (
    <div className="proj-foot">
      <span className="mono mono--ink proj-go">
        Inspect project details
        <FiArrowUpRight size={13} />
      </span>
      <span className="mono">Spec #{String(p.id).padStart(2, "0")}</span>
    </div>
  );

  return (
    <article className={`proj-cell proj-cell--s${bentoSpan}`} {...cardProps}>
      {head}

      <div className={`frame frame--duotone proj-media${isWideCard ? " proj-media--wide" : ""}`}>
        <Image src={p.img} alt={p.title} fill unoptimized sizes="(max-width: 1000px) 100vw, 33vw" />
        {media}
      </div>

      {body}
      {foot}
    </article>
  );
};

/* One hue per slab: the spectrum is what makes a wall of case
   studies read as a system instead of noise. */
const SLAB_HUES = ["flame", "cobalt", "teal", "grape", "sun", "rose", "moss"] as const;
const SLAB_STATUS: Record<Project["status"], string> = {
  live: "Produksi",
  archived: "Arsip",
  wip: "Dalam pengerjaan",
};

const ProjectSlab: React.FC<{
  project: Project;
  index: number;
  onOpenGallery: () => void;
}> = ({ project: p, index, onOpenGallery }) => {
  const hue = SLAB_HUES[index % SLAB_HUES.length];
  const shots = p.screenshots?.length ?? 0;
  const live = p.url && p.url !== "#";

  return (
    <article
      className={`pslab${index === 0 ? " pslab--lead" : ""}`}
      data-hue={hue}
    >
      <header className="pslab__band">
        <span className="pslab__num" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="pslab__band-id">
          <span className="mono pslab__kind">{p.type}</span>
          <h3 className="pslab__title"><span className="hl">{p.title}</span></h3>
        </div>
        <span className="pslab__stamp">
          {SLAB_STATUS[p.status]} / {p.year}
        </span>
      </header>

      <div className="pslab__media">
        <Image
          src={p.img}
          alt={`Tampilan ${p.title}`}
          fill
          unoptimized
          sizes="100vw"
        />
        <span className="pslab__sticker">{p.badge ?? SLAB_STATUS[p.status]}</span>
      </div>

      <div className="pslab__cols">
        <div className="pslab__body">
          {p.subtitle && <p className="pslab__sub">{p.subtitle}</p>}

          <p className="pslab__lede">{p.desc}</p>
          <p className="pslab__long">{p.longDesc}</p>

          <div className="wrap-tags pslab__tags">
            {p.stack.map((tech) => (
              <span key={tech} className={`tag ${getTechClass(tech)}`}>
                {tech}
              </span>
            ))}
          </div>

          <div className="row row--tight pslab__cta">
            {live && (
              <a className="btn btn--primary btn--sm" href={p.url} target="_blank" rel="noopener noreferrer">
                Kunjungi situs
                <FiArrowUpRight size={13} className="btn__icon" />
              </a>
            )}
            {p.github && (
              <a className="btn btn--sm" href={p.github} target="_blank" rel="noopener noreferrer">
                <FiGithub size={13} className="btn__icon" />
                Kode sumber
              </a>
            )}
            {shots > 0 && (
              <button type="button" className="btn btn--ink btn--sm" onClick={onOpenGallery}>
                <FiEye size={13} className="btn__icon" />
                Buka detail
              </button>
            )}
          </div>
        </div>

        {p.highlights?.length > 0 && (
          <aside className="pslab__aside">
            <span className="mono pslab__aside-label">
              <FiList size={12} aria-hidden="true" />
              Yang dikerjakan
            </span>
            <ul className="pslab__highs">
              {p.highlights.map((h, i) => (
                <li key={h}>
                  <span className="pslab__highs-num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {shots > 1 && (
        <div className="pslab__shots">
          <span className="mono pslab__shots-label">
            <FiEye size={12} aria-hidden="true" />
            {shots} halaman
          </span>
          <div className="pslab__shots-track">
            {p.screenshots.map((s, i) => (
              <button
                key={s}
                type="button"
                className="pslab__shot"
                onClick={onOpenGallery}
                title={p.screenshotLabels?.[i]}
                aria-label={p.screenshotLabels?.[i] ?? `Buka tangkapan layar ${i + 1}`}
              >
                <Image src={s} alt="" width={288} height={180} unoptimized sizes="176px" />
                <span className="pslab__shot-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"open" | "grid">("open");

  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  const categories = [
    { id: "ALL", label: "SEMUA PROYEK", count: projects.length },
    {
      id: "Web Platform",
      label: "WEB & ENTERPRISE",
      count: projects.filter((p) => p.type === "Web Platform").length,
    },
    {
      id: "AI & ML",
      label: "AI & MACHINE LEARNING",
      count: projects.filter((p) => p.type.includes("AI") || p.type.includes("NLP")).length,
    },
    {
      id: "Data Science",
      label: "DATA SCIENCE",
      count: projects.filter((p) => p.type === "Data Science").length,
    },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    if (selectedCategory === "Web Platform") return projects.filter((p) => p.type === "Web Platform");
    if (selectedCategory === "AI & ML")
      return projects.filter((p) => p.type.includes("AI") || p.type.includes("NLP"));
    if (selectedCategory === "Data Science") return projects.filter((p) => p.type === "Data Science");
    return projects;
  }, [selectedCategory]);

  const spans = useMemo(() => spansFor(filteredProjects.length), [filteredProjects.length]);

  const toolbar = (
    <div className="panel panel--pad-sm panel--plate col proj-toolbar">
      <div className="row row--tight proj-toolbar__row" role="tablist" aria-label="Mode Tampilan Portofolio">
        <button
          type="button"
          role="tab"
          aria-selected={viewMode === "open"}
          className={`chip proj-filter${viewMode === "open" ? " chip--ink" : ""}`}
          onClick={() => {
            playPop();
            setViewMode("open");
          }}
        >
          <FiFileText size={12} />
          Semua terbuka
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={viewMode === "grid"}
          className={`chip proj-filter${viewMode === "grid" ? " chip--ink" : ""}`}
          onClick={() => {
            playPop();
            setViewMode("grid");
          }}
        >
          <FiGrid size={12} />
          Bento grid
        </button>
      </div>

      <hr className="rule" />

      <div className="row row--tight proj-toolbar__row" role="tablist" aria-label="Filter Kategori Portofolio">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              type="button"
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              className={`chip proj-filter${isSelected ? " chip--ink" : ""}`}
              onClick={() => {
                playPop();
                setSelectedCategory(cat.id);
              }}
            >
              <span>{cat.label}</span>
              <span className="proj-filter__count">
                <AnimatedCounter value={cat.count} inView={headerInView} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="projects" className="band-bleed">
      <div className="sheet">
        <div ref={headerRef}>
          <SectionHead
            index="03"
            title="Proyek pilihan & rekayasa sistem"
            subtitle="Kumpulan sistem yang saya bangun sendiri dari nol: backend konkurensi Golang + Redis, antarmuka React & Vue.js, sistem internal Laravel, hingga model machine learning yang diuji pada data nyata."
            meta="Portofolio // Selected works"
            actions={toolbar}
          />
        </div>

        {viewMode === "grid" ? (
          <Reveal className="bento proj-grid">
            {filteredProjects.map((p, idx) => {
              const span = spans[idx] ?? 6;
              return (
                <ProjectCardItem
                  key={p.id}
                  project={p}
                  onSelect={() => onSelectProject(p)}
                  getTechClass={getTechClass}
                  bentoSpan={span}
                  isWideCard={span >= 8}
                />
              );
            })}
          </Reveal>
        ) : (
          <div className="pslab-list">
            {filteredProjects.map((p, idx) => (
              <Reveal key={p.id} className="pslab-row">
                <ProjectSlab project={p} index={idx} onOpenGallery={() => onSelectProject(p)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
