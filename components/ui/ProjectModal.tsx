"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiExternalLink, FiGithub, FiCheck } from "react-icons/fi";
import { Dialog } from "@/components/ui/Dialog";

export interface Project {
  id: number;
  title: string;
  subtitle?: string;
  badge?: string;
  desc: string;
  longDesc: string;
  stack: string[];
  img: string;
  screenshots: string[];
  screenshotLabels?: string[];
  url: string;
  github?: string;
  type: string;
  year: string;
  status: "live" | "archived" | "wip";
  highlights: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const STATUS: Record<Project["status"], string> = {
  live: "Produksi",
  archived: "Arsip",
  wip: "Dalam pengerjaan",
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [shot, setShot] = useState(0);

  if (!project) return null;

  const shots = project.screenshots?.length ? project.screenshots : [project.img];
  const active = shots[Math.min(shot, shots.length - 1)];
  const status = STATUS[project.status];

  return (
    <Dialog
      open={!!project}
      onClose={onClose}
      labelledBy="project-dialog-title"
      size="lg"
      title={project.title}
      meta={`${project.type} · ${project.year}`}
      footer={
        <>
          {project.github && (
            <a className="btn btn--ghost btn--sm" href={project.github} target="_blank" rel="noopener noreferrer">
              <FiGithub size={13} className="btn__icon" />
              Kode sumber
            </a>
          )}
          {project.url && project.url !== "#" && (
            <a className="btn btn--primary btn--sm" href={project.url} target="_blank" rel="noopener noreferrer">
              <FiExternalLink size={13} className="btn__icon" />
              Buka situs
            </a>
          )}
        </>
      }
    >
      <div className="pmodal">
        <div className="pmodal__lead">
          <span className="chip">
            {project.status === "live" && <span className="chip__dot" aria-hidden="true" />}
            {status}
          </span>
          {project.subtitle && <p className="pmodal__subtitle">{project.subtitle}</p>}
        </div>

        <figure className="pmodal__hero frame">
          <Image
            src={active}
            alt={`${project.title}: ${project.screenshotLabels?.[shot] ?? "tampilan proyek"}`}
            width={1200}
            height={750}
            unoptimized
            priority
          />
        </figure>

        {shots.length > 1 && (
          <div className="pmodal__thumbs" role="tablist" aria-label="Galeri tangkapan layar">
            {shots.map((s, i) => (
              <button
                key={s}
                role="tab"
                aria-selected={i === shot}
                className={`pmodal__thumb${i === shot ? " pmodal__thumb--on" : ""}`}
                onClick={() => setShot(i)}
                title={project.screenshotLabels?.[i] ?? `Tangkapan ${i + 1}`}
              >
                <Image src={s} alt="" width={160} height={100} unoptimized />
                <span className="mono">{project.screenshotLabels?.[i] ?? `0${i + 1}`}</span>
              </button>
            ))}
          </div>
        )}

        <p className="lede pmodal__desc">{project.longDesc || project.desc}</p>

        <div className="bento pmodal__cols">
          <section className="pmodal__col">
            <span className="mono mono--ink">Yang dikerjakan</span>
            <ul className="pmodal__highlights">
              {project.highlights.map((h) => (
                <li key={h}>
                  <FiCheck size={14} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="pmodal__col">
            <span className="mono mono--ink">Teknologi</span>
            <div className="wrap-tags">
              {project.stack.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
            <dl className="pmodal__facts">
              <div><dt>Tipe</dt><dd>{project.type}</dd></div>
              <div><dt>Tahun</dt><dd>{project.year}</dd></div>
              <div><dt>Status</dt><dd>{status}</dd></div>
            </dl>
          </section>
        </div>
      </div>
    </Dialog>
  );
}
