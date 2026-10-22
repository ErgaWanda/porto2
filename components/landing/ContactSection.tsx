"use client";

import React, { useState } from "react";
import {
  FiAlertCircle,
  FiCheck,
  FiCopy,
  FiInfo,
  FiMail,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import "../../styles/contact.css";

interface ContactSectionProps {
  contactForm: { name: string; email: string; subject: string; message: string };
  setContactForm: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; subject: string; message: string }>
  >;
  handleContactSubmit: (e: React.FormEvent) => Promise<void>;
  sending: boolean;
  formStatus: { type: "success" | "activation" | "error"; text: string } | null;
}

const CHANNELS = [
  {
    id: "whatsapp",
    label: "WhatsApp direct",
    value: "+62 882 9106 7259",
    href: "https://wa.me/6288291067259",
    Icon: FaWhatsapp,
  },
  {
    id: "github",
    label: "GitHub profile",
    value: "github.com/ErgaWanda",
    href: "https://github.com/ErgaWanda",
    Icon: FaGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn network",
    value: "erga-wanda-afriza",
    href: "https://linkedin.com/in/erga-wanda-afriza-147564211",
    Icon: FaLinkedin,
  },
];

const noticeClass = (type: "success" | "activation" | "error") => {
  if (type === "error") return "notice notice--error contact__notice";
  if (type === "activation") return "notice notice--info contact__notice";
  return "notice contact__notice";
};

const NoticeIcon = ({ type }: { type: "success" | "activation" | "error" }) => {
  if (type === "error") return <FiAlertCircle size={15} aria-hidden="true" />;
  if (type === "activation") return <FiInfo size={15} aria-hidden="true" />;
  return <FiCheck size={15} aria-hidden="true" />;
};

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactForm,
  setContactForm,
  handleContactSubmit,
  sending,
  formStatus,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("ewandaafriza@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" data-hue="cobalt" className="band-bleed contact">
      <div className="sheet">
        <SectionHead
          index="08"
          title={
            <>
              &ldquo;Let&apos;s build robust &amp; scalable systems together.&rdquo;
            </>
          }
          subtitle="Jalur komunikasi langsung dengan Erga. Terbuka untuk pengembangan backend Golang & Laravel, antarmuka reaktif React & Vue.js, atau proyek machine learning yang dioperasikan sampai produksi."
          meta="Direct inquiries"
        />

        <div className="contact__grid">
          {/* ── Form plate ─────────────────────────────────── */}
          <Reveal as="article" className="panel contact__form" delay={60}>
            <div className="cell__head">
              <h3 className="display-m">Kirim pesan langsung</h3>
              <span className="chip">Hubungi saya</span>
            </div>

            <p className="contact__lede">
              Pesan akan otomatis terkirim langsung ke email pribadi saya dan segera saya respons.
            </p>

            <form className="contact__form-body" onSubmit={handleContactSubmit}>
              <div className="contact__fields">
                <div className="field">
                  <label className="field__label" htmlFor="cs-name">
                    Nama lengkap *
                  </label>
                  <input
                    id="cs-name"
                    className="field__input"
                    type="text"
                    required
                    placeholder="e.g. Alex Pratama"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="cs-email">
                    Alamat email *
                  </label>
                  <input
                    id="cs-email"
                    className="field__input"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div className="field contact__field--full">
                  <label className="field__label" htmlFor="cs-subject">
                    Subjek *
                  </label>
                  <input
                    id="cs-subject"
                    className="field__input"
                    type="text"
                    required
                    placeholder="Diskusi Proyek Backend / Web App / ML"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div className="field contact__field--full">
                  <label className="field__label" htmlFor="cs-message">
                    Pesan detail *
                  </label>
                  <textarea
                    id="cs-message"
                    className="field__textarea"
                    required
                    rows={4}
                    placeholder="Tuliskan spesifikasi sistem, pertanyaan arsitektur, atau ide yang ingin dikembangkan..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn--primary contact__submit" disabled={sending}>
                <FiSend size={15} className="btn__icon" />
                <span>{sending ? "Mengirim pesan..." : "Kirim pesan sekarang"}</span>
              </button>

              {formStatus && (
                <div
                  className={noticeClass(formStatus.type)}
                  role="status"
                  aria-live="polite"
                >
                  <NoticeIcon type={formStatus.type} />
                  <span>{formStatus.text}</span>
                </div>
              )}
            </form>
          </Reveal>

          {/* ── Direct channels: collapsed-rule grid ───────── */}
          <div className="col contact__side">
            <Reveal delay={120}>
              <div className="cell__head">
                <h3 className="display-m">Saluran komunikasi langsung</h3>
                <span className="mono">Respons cepat</span>
              </div>
              <p className="contact__lede">
                Pilih jalur komunikasi langsung melalui Email, WhatsApp, atau repositori GitHub:
              </p>
            </Reveal>

            <Reveal className="bento contact__channels" delay={180}>
              <div className="contact__cell">
                <a className="contact__cell-link" href="mailto:ewandaafriza@gmail.com">
                  <span className="contact__icon">
                    <FiMail size={19} aria-hidden="true" />
                  </span>
                  <span className="contact__cell-body">
                    <span className="mono">Email resmi</span>
                    <span className="contact__value">ewandaafriza@gmail.com</span>
                  </span>
                </a>
                <button
                  type="button"
                  className="btn btn--sm contact__copy"
                  onClick={copyEmail}
                  title="Salin Alamat Email"
                  aria-label="Salin alamat email ewandaafriza@gmail.com"
                >
                  {copiedEmail ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  <span>{copiedEmail ? "Tersalin" : "Salin"}</span>
                </button>
              </div>

              {CHANNELS.map((c) => (
                <a
                  key={c.id}
                  className="contact__cell"
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <span className="contact__icon">
                    <c.Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="contact__cell-body">
                    <span className="mono">{c.label}</span>
                    <span className="contact__value">{c.value}</span>
                  </span>
                </a>
              ))}

              <div className="contact__cell contact__cell--meta">
                <div className="cell__head contact__meta-head">
                  <span className="chip">
                    <span className="chip__dot chip__dot--live" aria-hidden="true" />
                    Tersedia
                  </span>
                  <span className="mono">Status &amp; basis</span>
                </div>

                <div className="contact__facts">
                  <div className="stat">
                    <span className="stat__num">6</span>
                    <span className="stat__label">Proyek portofolio</span>
                  </div>
                  <div className="stat">
                    <span className="stat__num">Segera</span>
                    <span className="stat__label">Respons pesan</span>
                  </div>
                </div>

                <p className="contact__place">
                  <FiMapPin size={15} aria-hidden="true" />
                  <span>Jakarta &amp; Bekasi Area, Indonesia • Remote &amp; On-site Ready</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
