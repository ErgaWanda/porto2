"use client";

import React from "react";
import { FiArrowRight, FiDownload, FiArrowDown } from "react-icons/fi";
import { TextScramble } from "@/components/ui/TextScramble";
import { InkNote } from "@/components/ui/InkNote";
import { playPop, playTactileClick } from "@/components/ui/SoundFXToggle";
import { Reveal } from "./Reveal";
import { HeroProps } from "./types";

const STACK = [
  "Golang", "Laravel", "React", "Vue.js", "C#/.NET", "PostgreSQL", "Redis", "Docker",
];

export const Hero: React.FC<HeroProps> = ({
  onPrimaryCta,
  onSecondaryCta,
  primaryLabel = "Jelajahi Proyek",
  secondaryLabel = "Unduh CV",
  supportingText,
  onScrollDown,
}) => {
  return (
    <header className="hero">
      <Reveal as="div">
        <span className="eyebrow">
          <span className="chip__dot chip__dot--live" aria-hidden="true" />
          Aktif sebagai IT Developer di RDS Group
        </span>
      </Reveal>

      <h1 className="display-xl hero__name">
        <Reveal variant="mask" as="span">
          <span>
            <TextScramble text="Erga Wanda" durationMs={2200} delayMs={120} triggerOnHover={false} />
          </span>
        </Reveal>
        <Reveal variant="mask" as="span" delay={110}>
          <span>
            <span className="mark">
              <TextScramble text="Afriza." durationMs={2600} delayMs={420} triggerOnHover={false} />
            </span>
          </span>
        </Reveal>
      </h1>

      <Reveal delay={220}>
        <p className="lede hero__lede">{supportingText}</p>
      </Reveal>

      <Reveal delay={300} className="row hero__cta">
        <button
          className="btn btn--primary"
          onClick={() => { playPop(); onPrimaryCta?.(); }}
          onMouseEnter={() => playTactileClick(750, 0.02)}
        >
          <span>{primaryLabel}</span>
          <FiArrowRight size={15} className="btn__icon" />
        </button>

        <button
          className="btn btn--ghost"
          onClick={() => { playPop(); onSecondaryCta?.(); }}
          onMouseEnter={() => playTactileClick(650, 0.02)}
        >
          <FiDownload size={14} className="btn__icon" />
          <span>{secondaryLabel}</span>
        </button>

        {onScrollDown && (
          <button
            className="btn btn--ghost btn--sm hero__scroll"
            onClick={onScrollDown}
            aria-label="Gulir ke bagian proyek"
          >
            <span>Gulir</span>
            <FiArrowDown size={12} className="btn__icon" />
          </button>
        )}
      </Reveal>

      <Reveal delay={380}>
        <div className="hero__stack">
          <span className="mono">Inti</span>
          <div className="wrap-tags">
            {STACK.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </Reveal>

      <InkNote className="hero-note" label="spesifikasi lengkap" />
    </header>
  );
};
