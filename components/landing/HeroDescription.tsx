"use client";

import React from "react";
import Image from "next/image";
import { FiMapPin } from "react-icons/fi";
import { HeroDescriptionProps } from "./types";
import { Reveal } from "./Reveal";

const STATS = [
  { value: "RDS", label: "IT Developer saat ini" },
  { value: "6", label: "Proyek portofolio" },
];

export const HeroDescription: React.FC<HeroDescriptionProps> = ({
  text = "IT Developer di RDS Group. Riwayat rekayasa sistem mencakup platform sertifikasi nasional LSP CoachPro dan 3 sistem internal kepegawaian Pusdatin Kementerian Pertahanan RI.",
  roleBadge = "IT Developer",
  location = "Jakarta & Bekasi, Indonesia",
}) => {
  return (
    <Reveal delay={140} className="spec">
      <div className="spec__inner">
        <div className="spec__head">
          <figure className="spec__portrait">
            <Image
              src="/images/erga_photo.jpeg"
              alt="Potret Erga Wanda Afriza"
              width={92}
              height={116}
              unoptimized
              priority
            />
          </figure>

          <div className="col spec__id">
            <span className="mono mono--signal">{roleBadge}</span>
            <h2 className="display-m">Erga Wanda Afriza</h2>
            <span className="spec__loc">
              <FiMapPin size={12} />
              {location}
            </span>
          </div>
        </div>

        <div className="bento g2 spec__stats">
          {STATS.map((s) => (
            <div key={s.label} className="spec__stat">
              <span className="stat__num">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="spec__bio">{text}</p>

        <div className="spec__foot">
          <span className="mono">IPK 3.23 — S.Kom</span>
          <span className="mono">Universitas Darma Persada</span>
        </div>
      </div>
    </Reveal>
  );
};
