export default function EducationSection() {
  return (
    <section className="section" id="pendidikan">
      <div className="container">
        {/* Header */}
        <div className="section-header-line reveal">
          <span className="t-label">Pendidikan</span>
        </div>
        <h2 className="t-h1 reveal reveal-delay-1" style={{ marginBottom: "48px", marginTop: "12px" }}>
          Latar<br />
          <span style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Akademik</span>
        </h2>

        <div className="edu-card reveal reveal-delay-2">
          <div>
            <div className="t-label" style={{ marginBottom: "12px" }}>
              2021 — 2025
            </div>
            <div className="edu-inst">Universitas Darma Persada</div>
            <div className="edu-degree">
              Sarjana Teknik Informatika (S.Kom)
            </div>

            {/* Courses / highlights */}
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              {[
                "Struktur Data",
                "Algoritma & Pemrograman",
                "Machine Learning",
                "Computer Vision",
                "Pemrograman Web",
                "Basis Data",
                "Kecerdasan Buatan",
                "Rekayasa Perangkat Lunak",
              ].map((c) => (
                <span key={c} className="skill-tag">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="edu-gpa-container">
            <div className="edu-gpa">3.23</div>
            <div className="edu-gpa-label">IPK / 4.0</div>
            <div
              style={{
                marginTop: "24px",
                padding: "12px 20px",
                background: "var(--bg-sub)",
                border: "1px solid var(--border)",
                display: "inline-block",
                borderRadius: "var(--radius-sm)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--text-dim)",
                  letterSpacing: "0.05em",
                  marginBottom: "4px",
                }}
              >
                STATUS
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-bright)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Lulus 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
