"use client";

import React from "react";
import { FaGithub, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { FiMail, FiArrowUp, FiFileText, FiMapPin } from "react-icons/fi";
import { Reveal } from "./Reveal";
import "../../styles/footer.css";

interface FooterProps {
  onCvClick?: () => void;
}

const FOOTER_LINKS = [
  { label: "Proyek", id: "projects" },
  { label: "Arsitektur", id: "architecture" },
  { label: "Pengalaman", id: "experience" },
  { label: "Keahlian", id: "skills" },
  { label: "GitHub", id: "github" },
  { label: "Metodologi", id: "workflow" },
  { label: "Kontak", id: "contact" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/erga-wanda-afriza-147564211",
    title: "LinkedIn Profile (@erga-wanda-afriza)",
    aria: "LinkedIn @erga-wanda-afriza",
    Icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/ErgaWanda",
    title: "GitHub Profile (@ErgaWanda)",
    aria: "GitHub @ErgaWanda",
    Icon: FaGithub,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6288291067259",
    title: "Chat WhatsApp (+62 882-9106-7259)",
    aria: "WhatsApp (+62 882-9106-7259)",
    Icon: FaWhatsapp,
  },
  {
    label: "Email",
    href: "mailto:ewandaafriza@gmail.com",
    title: "Email Resmi (ewandaafriza@gmail.com)",
    aria: "Email Resmi (ewandaafriza@gmail.com)",
    Icon: FiMail,
  },
];

export const Footer: React.FC<FooterProps> = ({ onCvClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="band-bleed band-bleed--ink footer">
      <div className="sheet">
        {/* ── Closing nameplate ──────────────────────────────── */}
        <Reveal className="footer__mast">
          <div className="col footer__id">
            <span className="mono">
              ewanda<span className="footer__mark">.</span>
            </span>
            <h2 className="display-xl footer__name">Erga Wanda Afriza</h2>
            <p className="footer__role">IT Developer · RDS Group</p>
          </div>

          <div className="col footer__facts">
            <span className="mono">Basis</span>
            <span className="footer__loc">
              <FiMapPin size={13} aria-hidden="true" />
              <span>Jakarta &amp; Bekasi, Indonesia</span>
            </span>
            {onCvClick && (
              <button
                type="button"
                className="btn btn--sm footer__cv"
                onClick={onCvClick}
                title="Unduh resume"
              >
                <FiFileText size={13} className="btn__icon" />
                <span>Unduh resume</span>
              </button>
            )}
          </div>
        </Reveal>

        {/* ── Quiet nav + social chips ───────────────────────── */}
        <Reveal className="footer__body" delay={90}>
          <nav className="footer__nav" aria-label="Navigasi footer">
            <span className="mono">Jelajahi</span>
            <ul className="footer__list">
              {FOOTER_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className="footer__link"
                    onClick={() => scrollTo(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="wrap-tags footer__chips">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="chip"
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={s.aria}
                title={s.title}
              >
                <s.Icon size={13} aria-hidden="true" />
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>

        {/* ── Bottom line ────────────────────────────────────── */}
        <hr className="footer__rule" />

        <div className="row row--between footer__base">
          <p className="mono footer__copy">
            <span>&copy; {currentYear} Erga Wanda Afriza</span>
            <span aria-hidden="true">•</span>
            <span className="footer__strong">Portofolio Rekayasa Sistem Digital</span>
          </p>

          <button
            type="button"
            className="btn btn--sm footer__top"
            onClick={scrollToTop}
            aria-label="Kembali ke atas halaman"
          >
            <FiArrowUp size={13} className="btn__icon" />
            <span>Kembali ke atas</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
