"use client";

import React from "react";
import { FiSend, FiLoader, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Dialog } from "@/components/ui/Dialog";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactForm: { name: string; email: string; subject: string; message: string };
  setContactForm: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; subject: string; message: string }>
  >;
  handleContactSubmit: (e: React.FormEvent) => Promise<void> | void;
  sending: boolean;
  formStatus: { type: "success" | "activation" | "error"; text: string } | null;
}

const FIELD = "Kontak cepat";

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  contactForm,
  setContactForm,
  handleContactSubmit,
  sending,
  formStatus,
}) => {
  const set = (key: keyof ContactModalProps["contactForm"]) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setContactForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      labelledBy="contact-dialog-title"
      size="sm"
      title="Kirim pesan langsung"
      meta={FIELD}
    >
      <p className="modal__intro">
        Punya peran atau proyek yang cocok? Tulis singkat saja — saya balas paling lama satu hari kerja.
      </p>

      <form onSubmit={handleContactSubmit} className="modal__form">
        <div className="field">
          <label className="field__label" htmlFor="cm-name">Nama</label>
          <input
            id="cm-name"
            className="field__input"
            value={contactForm.name}
            onChange={set("name")}
            placeholder="Nama Anda"
            required
            autoComplete="name"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="cm-email">Email</label>
          <input
            id="cm-email"
            type="email"
            className="field__input"
            value={contactForm.email}
            onChange={set("email")}
            placeholder="nama@perusahaan.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="cm-subject">Subjek</label>
          <input
            id="cm-subject"
            className="field__input"
            value={contactForm.subject}
            onChange={set("subject")}
            placeholder="Kerja sama / lowongan IT Developer"
          />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="cm-message">Pesan</label>
          <textarea
            id="cm-message"
            className="field__textarea"
            value={contactForm.message}
            onChange={set("message")}
            placeholder="Ceritakan sedikit tentang peran atau proyeknya…"
            required
          />
        </div>

        {formStatus && (
          <p
            role="status"
            className={`notice ${
              formStatus.type === "error"
                ? "notice--error"
                : formStatus.type === "activation"
                  ? "notice--info"
                  : ""
            }`}
          >
            {formStatus.type === "success" ? <FiCheckCircle size={15} /> : <FiAlertCircle size={15} />}
            {formStatus.text}
          </p>
        )}

        <div className="dialog__foot--inline">
          <button type="button" className="btn btn--ghost btn--sm" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn btn--primary" disabled={sending}>
            {sending ? <FiLoader size={14} className="btn__icon" /> : <FiSend size={13} className="btn__icon" />}
            {sending ? "Mengirim…" : "Kirim pesan"}
          </button>
        </div>
      </form>
    </Dialog>
  );
};
