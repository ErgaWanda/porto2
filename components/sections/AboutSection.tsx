"use client";
import Image from "next/image";

export default function AboutSection() {
  const info = [
    { label: "Email", value: "ewandaafriza@gmail.com" },
    { label: "Telepon", value: "+62 882 9106 7259" },
    { label: "GitHub", value: "github.com/ErgaWanda" },
    { label: "Lokasi", value: "Jakarta, Indonesia" },
    { label: "Pendidikan", value: "S1 Teknik Informatika" },
    { label: "Status", value: "Tersedia untuk hire" },
  ];

  return (
    <section className="section" id="tentang">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-line reveal">
          <span className="t-label">Tentang Saya</span>
        </div>

        <div className="about-grid reveal">
          {/* Image */}
          <div className="about-img-frame">
            <Image
              src="/images/about_portrait.png"
              alt="Erga Wanda Afriza"
              width={340}
              height={440}
              className="about-img"
              unoptimized
            />
            <div className="about-img-tag">
              <div className="t-label" style={{ marginBottom: "4px" }}>Profil Pengembang</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text-bright)", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                Erga W. Afriza
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", letterSpacing: "0.05em", marginTop: "2px" }}>
                FS-DEV // AI-ENG
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content">
            <div>
              <h2 className="t-h1" style={{ marginBottom: "24px" }}>
                Membangun Sistem<br />
                <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Yang Bekerja.</span>
              </h2>
              <p className="about-profile-text">
                Saya adalah profesional teknologi yang menggabungkan keahlian Full Stack Development
                dengan kecerdasan buatan. Lulusan Teknik Informatika Universitas Darma Persada (2025)
                dengan IPK 3.23/4.0, berpengalaman membangun sistem enterprise dari konsep hingga
                deployment produksi.
              </p>
              <p className="about-profile-text" style={{ marginTop: "16px" }}>
                Keahlian saya mencakup membangun API backend yang skalabel menggunakan Golang dan
                Laravel, mengembangkan antarmuka yang responsif dengan Vue.js, serta menerapkan
                model machine learning — mulai dari NLP dengan BERT hingga Computer Vision dengan CNN
                — ke dalam aplikasi nyata yang digunakan oleh pengguna sehari-hari.
              </p>
            </div>

            {/* Stats */}
            <div className="about-stats reveal reveal-delay-1">
              {[
                { value: "7+", label: "Proyek Selesai" },
                { value: "2+", label: "Tahun Xp" },
                { value: "3", label: "Stack Utama" },
              ].map((s) => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-value">{s.value}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Info Grid */}
            <div className="about-info-grid reveal reveal-delay-2">
              {info.map((item) => (
                <div key={item.label} className="about-info-item">
                  <div>
                    <div className="about-info-label">{item.label}</div>
                    <div className="about-info-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
