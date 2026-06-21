const experiences = [
  {
    role: "Full Stack Developer",
    org: "LSP CoachPro Indonesia (Maganghub Kemnaker)",
    date: "DES 2025\nSEKARANG",
    current: true,
    points: [
      "Mengembangkan platform manajemen sertifikasi end-to-end untuk program Maganghub Kemnaker, mengelola alur kerja dari pra-asesmen hingga keputusan kompetensi final.",
      "Membangun backend yang performan dan skalabel menggunakan Golang dan framework Echo, dipasangkan dengan frontend responsif menggunakan Vue.js.",
      "Mengoptimalkan penyimpanan dan caching data dengan PostgreSQL dan Redis, serta merampingkan deployment menggunakan Docker dan Nginx.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Pusdatin Kementerian Pertahanan RI",
    date: "JUN 2024\nDES 2024",
    current: false,
    points: [
      "Merancang dan mengimplementasikan serangkaian aplikasi manajemen internal menggunakan Laravel, Vue.js, dan MySQL.",
      "Mengembangkan Employee Information Portal, Activity Calendar System, dan Daily Report System untuk mendigitalisasi alur kerja internal.",
      "Meningkatkan efisiensi operasional departemen melalui sistem pelaporan digital yang menggantikan proses manual.",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section className="section" id="pengalaman">
      <div className="container">
        {/* Header */}
        <div className="section-header-line reveal">
          <span className="t-label">Pengalaman Kerja</span>
        </div>
        <h2 className="t-h1 reveal reveal-delay-1" style={{ marginBottom: "64px", marginTop: "12px" }}>
          Riwayat<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Penugasan</span>
        </h2>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <div
              key={exp.org}
              className={`timeline-item reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="timeline-date">
                {exp.date.split("\n").map((line, li) => (
                  <span key={li} style={{ display: "block" }}>{line}</span>
                ))}
              </div>

              <div className={`timeline-dot${exp.current ? "" : " timeline-dot-dim"}`} />

              <div className="timeline-card">
                {exp.current && (
                  <div style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    <div style={{ width: 6, height: 6, background: "var(--primary)", borderRadius: "50%" }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.05em", color: "var(--primary)", textTransform: "uppercase" }}>
                      Aktif
                    </span>
                  </div>
                )}

                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-org">{exp.org}</div>
                <ul className="timeline-points">
                  {exp.points.map((pt, pi) => (
                    <li key={pi} className="timeline-point">{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
