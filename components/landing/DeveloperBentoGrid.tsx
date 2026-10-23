"use client";

import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiClock, FiCopy, FiCheck, FiAward, FiShield, FiZap } from "react-icons/fi";
import { SiGoland, SiLaravel, SiPython } from "react-icons/si";
import { playChime, playPop } from "@/components/ui/SoundFXToggle";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

interface DeveloperBentoGridProps {
  onOpenCv: () => void;
  onOpenContact: () => void;
  onSelectProject: (projectId: number) => void;
}

const FLAGSHIP_STATS = [
  { value: "450+", label: "Asesi" },
  { value: "50+", label: "Asesor" },
  { value: "12", label: "TUK" },
  { value: "130+", label: "Sertifikat" },
];

const FLAGSHIP_STACK = ["Golang (Echo)", "Vue.js", "PostgreSQL", "Redis", "Docker", "Nginx"];

const KEMHAN_SYSTEMS = [
  { name: "Portal Data Pegawai", note: "Digitalisasi arsip kepegawaian" },
  { name: "Kalender Kegiatan Terpadu", note: "Sinkronisasi jadwal lintas departemen" },
  { name: "Sistem Laporan Harian", note: "Pengganti berkas manual berbasis kertas" },
];

const CREDS = [
  { label: "S.Kom · IPK 3.23 / 4.00", org: "Universitas Darma Persada", Icon: FiAward },
  { label: "Maganghub Kemnaker", org: "Full Stack Developer · LSP CoachPro", Icon: FiShield },
  { label: "Riset NLP & Machine Learning", org: "Skripsi Naive Bayes · riset BERT", Icon: FiZap },
];

type Lang = "go" | "laravel" | "python";

const SNIPPETS: Record<Lang, { tab: string; icon: React.ReactNode; code: string; output: string }> = {
  go: {
    tab: "Golang",
    icon: <SiGoland size={13} />,
    code: `// High-concurrency worker pool
func ProcessAssessment(ctx context.Context, asesiID int) error {
    ctx, cancel := context.WithTimeout(ctx, 15*time.Millisecond)
    defer cancel()
    return redis.HSet(ctx, "session", asesiID, "VERIFIED").Err()
}`,
    output: "Redis cache menahan bacaan PostgreSQL saat asesor serentak",
  },
  laravel: {
    tab: "Laravel",
    icon: <SiLaravel size={13} />,
    code: `// Sinkronisasi jadwal kegiatan lintas departemen
public function sync(Request $request, Activity $activity): JsonResponse
{
    $activity->update([
        ...$request->validated(),
        'synced_at' => now(),
    ]);

    return response()->json(['status' => 'SYNCED', 'id' => $activity->id]);
}`,
    output: "3 sistem internal kepegawaian Pusdatin · Laravel + MySQL",
  },
  python: {
    tab: "Python",
    icon: <SiPython size={13} />,
    code: `# BERT sentiment inference
tokenizer = AutoTokenizer.from_pretrained(model_path)
logits = model(**tokenizer(text, return_tensors="pt"))
sentiment = torch.argmax(logits, dim=1).item()`,
    output: "Sentimen opini publik terklasifikasi per dokumen teks",
  },
};

function useWibClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export const DeveloperBentoGrid: React.FC<DeveloperBentoGridProps> = ({
  onOpenCv,
  onSelectProject,
}) => {
  const clock = useWibClock();
  const [lang, setLang] = useState<Lang>("go");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    playChime();
    navigator.clipboard?.writeText(SNIPPETS[lang].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="ledger" data-hue="sun" className="band-bleed">
      <div className="sheet">
        <SectionHead
          index="01"
          title="Rekam jejak & telemetri"
          subtitle="Sistem yang berjalan di produksi, lengkap dengan angka operasional nyata dan potongan kode sumbernya."
          meta="Data Operasional"
        />

        <Reveal className="bento ledger">
          {/* ── Flagship ─────────────────────────────────── */}
          <article className="ledger__flagship">
            <div className="cell__head">
              <div className="row row--tight">
                <span className="chip chip--ink">Unggulan</span>
                <span className="chip">
                  <span className="chip__dot" aria-hidden="true" />
                  Produksi
                </span>
              </div>
              <span className="mono">2025 - 2026</span>
            </div>

            <h3 className="display-l ledger__title">
              LSP CoachPro Certification Management System
            </h3>

            <p className="lede ledger__desc">
              Arsitektur sistem sertifikasi nasional yang dibangun seorang diri: verifikasi
              berkas, penjadwalan uji serentak di 12 TUK, hingga penerbitan 130+ sertifikat
              kompetensi.
            </p>

            <div className="ledger__stats">
              {FLAGSHIP_STATS.map((s) => (
                <div key={s.label} className="stat">
                  <span className="stat__num">{s.value}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="ledger__foot">
              <div className="wrap-tags">
                {FLAGSHIP_STACK.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <button className="btn btn--sm" onClick={() => { playPop(); onSelectProject(1); }}>
                Buka studi kasus
                <FiArrowUpRight size={13} className="btn__icon" />
              </button>
            </div>
          </article>

          {/* ── Kemhan ───────────────────────────────────── */}
          <article className="ledger__kemhan">
            <div className="cell__head">
              <span className="chip">Pusdatin · Kemhan RI</span>
              <span className="mono">2024</span>
            </div>

            <h3 className="display-m">Tiga sistem internal kepegawaian</h3>

            <ul className="ledger__list">
              {KEMHAN_SYSTEMS.map((s) => (
                <li key={s.name}>
                  <span className="ledger__list-name">{s.name}</span>
                  <span className="mono">{s.note}</span>
                </li>
              ))}
            </ul>

            <p className="ledger__note">
              Menggantikan alur manual berbasis kertas lintas departemen selama masa magang
              6 bulan. Stack: Laravel, Vue.js, MySQL.
            </p>
          </article>

          {/* ── Clock ────────────────────────────────────── */}
          <aside className="ledger__clock">
            <div className="row row--tight">
              <FiClock size={13} />
              <span className="mono mono--ink">Waktu setempat</span>
            </div>
            <span className="ledger__time">{clock || "--:--:--"}</span>
            <span className="mono">Bekasi, Jawa Barat</span>
          </aside>

          {/* ── Terminal ─────────────────────────────────── */}
          <article className="ledger__term">
            <div className="ledger__tabs" role="tablist" aria-label="Bahasa pemrograman">
              {(Object.keys(SNIPPETS) as Lang[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={lang === k}
                  className={`ledger__tab${lang === k ? " ledger__tab--on" : ""}`}
                  onClick={() => setLang(k)}
                >
                  {SNIPPETS[k].icon}
                  {SNIPPETS[k].tab}
                </button>
              ))}
              <button className="ledger__copy" onClick={copy} aria-label="Salin kode">
                {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                {copied ? "Tersalin" : "Salin"}
              </button>
            </div>

            <div className="term__body">
              <pre>{SNIPPETS[lang].code}</pre>
            </div>

            <div className="ledger__output">
              <span className="chip__dot" aria-hidden="true" />
              {SNIPPETS[lang].output}
            </div>
          </article>

          {/* ── Credentials ──────────────────────────────── */}
          <aside className="ledger__creds">
            <span className="mono mono--ink">Kredensial</span>
            <ul className="ledger__creds-list">
              {CREDS.map((c) => (
                <li key={c.label}>
                  <c.Icon size={14} />
                  <div className="col">
                    <span className="ledger__creds-label">{c.label}</span>
                    <span className="mono">{c.org}</span>
                  </div>
                </li>
              ))}
            </ul>
            <button className="btn btn--ink btn--sm btn--block" onClick={onOpenCv}>
              Unduh CV
            </button>
          </aside>
        </Reveal>
      </div>
    </section>
  );
};
