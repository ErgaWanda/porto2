"use client";
import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static site: open mailto
    const mailto = `mailto:ewandaafriza@gmail.com?subject=${encodeURIComponent(form.subject || "Pesan dari Portfolio")}&body=${encodeURIComponent(
      `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )}`;
    window.open(mailto, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const contacts = [
    {
      label: "Email",
      value: "ewandaafriza@gmail.com",
      href: "mailto:ewandaafriza@gmail.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: "Telepon / WhatsApp",
      value: "+62 882 9106 7259",
      href: "https://wa.me/6288291067259",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
    {
      label: "GitHub",
      value: "github.com/ErgaWanda",
      href: "https://github.com/ErgaWanda",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
    },
    {
      label: "Lokasi",
      value: "Jakarta, Indonesia",
      href: "#",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="section" id="kontak">
      <div className="container">
        {/* Header */}
        <div className="section-header-line reveal">
          <span className="t-label">Kontak</span>
        </div>
        <h2 className="t-h1 reveal reveal-delay-1" style={{ marginBottom: "48px", marginTop: "12px" }}>
          Mari<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Berkolaborasi</span>
        </h2>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info reveal reveal-delay-1">
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.8, color: "var(--text-dim)", marginBottom: "8px" }}>
              Saya terbuka untuk proyek freelance, kerja sama jangka panjang,
              maupun posisi full-time. Jangan ragu menghubungi saya.
            </p>

            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="contact-item"
                style={{ display: "flex", textDecoration: "none" }}
              >
                <div className="contact-item-icon">{c.icon}</div>
                <div>
                  <div className="contact-item-label">{c.label}</div>
                  <div className="contact-item-value">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Nama</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                className="form-input"
                placeholder="Masukkan nama Anda"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                className="form-input"
                placeholder="alamat@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subjek</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                className="form-input"
                placeholder="Topik kolaborasi"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">Pesan</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                rows={5}
                placeholder="Ceritakan tentang proyek atau kebutuhan Anda..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {sent ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Transmisi Terkirim
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Kirim Transmisi
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
