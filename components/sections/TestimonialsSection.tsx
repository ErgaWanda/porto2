const testimonials = [
  {
    text: "Erga menunjukkan kemampuan luar biasa dalam membangun sistem manajemen internal yang kami butuhkan. Proyek selesai tepat waktu dengan kualitas yang melampaui ekspektasi. Dia sangat antusias belajar teknologi baru dan cepat beradaptasi.",
    name: "Koordinator IT",
    role: "Pusdatin Kementerian Pertahanan RI",
    initial: "KIT",
  },
  {
    text: "Platform sertifikasi yang dibangun Erga menjadi tulang punggung operasional kami. Arsitektur Golang-nya sangat efisien dan skalabel, mampu menangani ribuan transaksi sertifikasi tanpa hambatan. Tim developer yang solid.",
    name: "Tim Maganghub",
    role: "LSP CoachPro Indonesia",
    initial: "TMH",
  },
  {
    text: "Kolaborasi akademik yang sangat produktif. Implementasi model BERT untuk analisis sentimen mencapai akurasi yang sangat baik dan pipeline-nya terdokumentasi dengan rapi, memudahkan penelitian lanjutan.",
    name: "Dosen Pembimbing",
    role: "Universitas Darma Persada",
    initial: "DPB",
  },
  {
    text: "Erga berhasil mengintegrasikan model XGBoost ke dalam dashboard analitik kami dengan sangat baik. Hasil perbandingan algoritma yang disajikan memberikan insight berharga untuk strategi media sosial perusahaan kami.",
    name: "Manager Digital",
    role: "PT. BRIllian Indah Gemilang",
    initial: "MDG",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section" id="ulasan">
      <div className="container">
        {/* Header */}
        <div className="section-header-line reveal">
          <span className="t-label">Ulasan</span>
        </div>
        <h2 className="t-h1 reveal reveal-delay-1" style={{ marginBottom: "48px", marginTop: "12px" }}>
          Yang Mereka<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Katakan</span>
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initial}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
