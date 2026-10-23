"use client";

import React, { useMemo, useState } from "react";
import { FiActivity, FiCheck, FiCopy, FiShield } from "react-icons/fi";
import { SiGo, SiLaravel, SiPython } from "react-icons/si";
import { playChime, playPop, playTactileClick } from "@/components/ui/SoundFXToggle";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import "../../styles/architecture.css";

type ArchitectureId = "golang" | "laravel" | "ai";

/* One band hue per blueprint; resolved by [data-hue] in theme.css. */
const TAB_HUE: Record<ArchitectureId, "teal" | "cobalt" | "grape"> = {
  golang: "teal",
  laravel: "cobalt",
  ai: "grape",
};

interface ArchitectureTab {
  id: ArchitectureId;
  label: string;
  badge: string;
  seal: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string; unit: string }[];
  pipelineSteps: { title: string; tech: string; desc: string }[];
  codeSnippet: string;
  codeLang: string;
  codeFile: string;
}

const ARCHITECTURE_TABS: ArchitectureTab[] = [
  {
    id: "golang",
    label: "GOLANG & REDIS CONCURRENCY",
    badge: "PRODUKSI · COACHPRO",
    seal: "Berjalan di produksi",
    icon: <SiGo size={13} />,
    title: "Backend konkurensi tinggi untuk asesmen serentak",
    subtitle: "Golang (Echo) • Redis Cache • PostgreSQL • Docker & Nginx",
    description:
      "Backend platform sertifikasi nasional LSP CoachPro yang saya rancang arsitektur API dan skema database-nya dari nol. Redis caching layer menekan response time API saat 50+ asesor melakukan peninjauan berkas secara serentak pada jam puncak asesmen.",
    metrics: [
      { label: "Participants", value: "450+", unit: "Across 12 TUK" },
      { label: "Active Assessor", value: "50+", unit: "Simultaneous Review" },
      { label: "Certificates", value: "130+", unit: "Official Issued" },
      { label: "DevOps Support", value: "Solo", unit: "Docker + Nginx di VPS" },
    ],
    pipelineSteps: [
      {
        title: "Echo HTTP Server",
        tech: "Golang + Echo",
        desc: "Satu goroutine ringan per request untuk melayani akses serentak asesor dan admin.",
      },
      {
        title: "RESTful API Design",
        tech: "Kontrak API",
        desc: "Endpoint sertifikasi, jadwal uji, dan verifikasi berkas dengan skema response konsisten.",
      },
      {
        title: "In-Memory Cache",
        tech: "Redis",
        desc: "Menekan pembacaan berat ke database utama saat sesi asesmen puncak.",
      },
      {
        title: "Relational Persistence",
        tech: "PostgreSQL",
        desc: "Skema data asesi, asesor, skema sertifikasi, dan sertifikat ternormalisasi.",
      },
      {
        title: "Container & Reverse Proxy",
        tech: "Docker + Nginx",
        desc: "Deployment dan maintenance mandiri di VPS tanpa tim DevOps khusus.",
      },
    ],
    codeLang: "go",
    codeFile: "assessment_handler.go",
    codeSnippet: `// CoachPro Assessment Concurrency Handler
package handler

import (
    "context"
    "net/http"
    "time"

    "github.com/labstack/echo/v4"
)

func (h *AssessmentHandler) SubmitAssessment(c echo.Context) error {
    ctx, cancel := context.WithTimeout(c.Request().Context(), 3*time.Second)
    defer cancel()

    var req AssessmentPayload
    if err := c.Bind(&req); err != nil {
        return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid payload"})
    }

    // Concurrent cache invalidation + database commit
    errChan := make(chan error, 1)
    go func() {
        errChan <- h.service.ProcessSubmission(ctx, &req)
    }()

    select {
    case err := <-errChan:
        if err != nil { return c.JSON(http.StatusInternalServerError, err.Error()) }
        return c.JSON(http.StatusOK, echo.Map{"status": "CONFIRMED"})
    case <-ctx.Done():
        return c.JSON(http.StatusGatewayTimeout, echo.Map{"error": "Execution timeout"})
    }
}`,
  },
  {
    id: "laravel",
    label: "LARAVEL MVC INTERNAL SYSTEMS",
    badge: "KEMENHAN RI · 3 SISTEM",
    seal: "Diterapkan lintas departemen",
    icon: <SiLaravel size={13} />,
    title: "Tiga sistem kepegawaian dalam satu pola MVC",
    subtitle: "Laravel • Vue.js • MySQL • RESTful API • MVC Pattern",
    description:
      "Tiga sistem manajemen internal yang saya rancang dan bangun selama 6 bulan magang di Pusdatin Kementerian Pertahanan RI: portal data pegawai, kalender kegiatan terpadu, dan sistem laporan harian, semuanya menggantikan proses manual berbasis kertas.",
    metrics: [
      { label: "Internal Systems", value: "3", unit: "Modul kepegawaian" },
      { label: "Internship", value: "6 bln", unit: "Jun – Des 2024" },
      { label: "Coverage", value: "Multi", unit: "Departemen & lintas unit" },
      { label: "Frontend", value: "Vue.js", unit: "Reactive dashboard" },
    ],
    pipelineSteps: [
      {
        title: "Route & Controller",
        tech: "Laravel MVC",
        desc: "Pemisahan lapisan routing, controller, dan model untuk tiga modul berbeda.",
      },
      {
        title: "Data Layer",
        tech: "MySQL",
        desc: "Struktur data kepegawaian, jadwal dinas, dan laporan harian terelasi.",
      },
      {
        title: "Interface",
        tech: "Vue.js",
        desc: "Antarmuka reaktif untuk input, pencarian, dan monitoring data pegawai.",
      },
      {
        title: "Real-time Scheduling",
        tech: "Kalender Kegiatan",
        desc: "Sinkronisasi penjadwalan acara dinas untuk menekan konflik jadwal.",
      },
      {
        title: "Automated Reporting",
        tech: "Laporan Harian",
        desc: "Menghapus paperwork manual dan mempercepat evaluasi atasan.",
      },
    ],
    codeLang: "php",
    codeFile: "ActivityController.php",
    codeSnippet: `// Sinkronisasi jadwal kegiatan lintas departemen
class ActivityController extends Controller
{
    public function sync(Request $request, Activity $activity): JsonResponse
    {
        $validated = $request->validate([
            'department_id' => 'required|exists:departments,id',
            'scheduled_at'  => 'required|date',
        ]);

        $activity->update($validated + ['synced_at' => now()]);

        return response()->json([
            'status' => 'SYNCED',
            'id'     => $activity->id,
        ]);
    }
}`,
  },
  {
    id: "ai",
    label: "NLP & MACHINE LEARNING",
    badge: "RISET & MODEL PREDIKTIF",
    seal: "Skripsi & riset independen",
    icon: <SiPython size={13} />,
    title: "Klasifikasi sentimen dan benchmark model prediktif",
    subtitle: "Python • BERT (Transformers) • Naive Bayes • Random Forest vs XGBoost",
    description:
      "Riset pemrosesan bahasa alami pada teks opini publik Bahasa Indonesia: fine-tuning model BERT untuk menangkap nuansa konteks yang lolos dari klasifier sederhana, pipeline Naive Bayes pada penelitian skripsi, dan benchmark head-to-head Random Forest melawan XGBoost untuk prediksi engagement.",
    metrics: [
      { label: "Deep Learning", value: "BERT", unit: "Fine-tuned transformer" },
      { label: "Skripsi S1", value: "Naive Bayes", unit: "UNSADA · IPK 3.23" },
      { label: "Benchmark", value: "RF vs XGB", unit: "Prediksi engagement" },
      { label: "Visualisasi", value: "Vue.js", unit: "Dashboard tren sentimen" },
    ],
    pipelineSteps: [
      {
        title: "Text Preprocessing",
        tech: "RegEx & Stopwords",
        desc: "Case folding, normalisasi slang Bahasa Indonesia, dan stemming.",
      },
      {
        title: "Dataset Collection",
        tech: "Web Scraping",
        desc: "Pipeline pengambilan teks opini publik dari sumber online untuk dilabeli.",
      },
      {
        title: "Tokenization",
        tech: "HuggingFace Transformers",
        desc: "Sub-word token splitting, attention mask, dan padding ke batch tetap.",
      },
      {
        title: "Contextual Encoder",
        tech: "BERT",
        desc: "Self-attention menghasilkan embedding yang mempertahankan konteks kalimat.",
      },
      {
        title: "Classification Head",
        tech: "Softmax",
        desc: "Probabilitas sentimen positif, netral, negatif keluar dalam format JSON.",
      },
    ],
    codeLang: "python",
    codeFile: "bert_sentiment.py",
    codeSnippet: `# BERT Inference Pipeline for Indonesian Sentiment Analysis
import torch
from transformers import BertTokenizer, BertForSequenceClassification

class SentimentClassifier:
    def __init__(self, model_path: str, device: str = "cuda" if torch.cuda.is_available() else "cpu"):
        self.device = device
        self.tokenizer = BertTokenizer.from_pretrained(model_path)
        self.model = BertForSequenceClassification.from_pretrained(model_path).to(self.device)
        self.model.eval()

    @torch.no_grad()
    def predict(self, text: str) -> dict:
        inputs = self.tokenizer(
            text, return_tensors="pt", truncation=True, max_length=128, padding="max_length"
        ).to(self.device)

        logits = self.model(**inputs).logits
        probs = torch.softmax(logits, dim=-1).squeeze().tolist()
        labels = ["negative", "neutral", "positive"]

        return {
            "prediction": labels[int(torch.argmax(logits, dim=-1))],
            "confidence": max(probs),
            "distribution": dict(zip(labels, probs))
        }`,
  },
];

/* Comments → strings → decorators → keywords → calls, first match wins. */
const TOKEN_PATTERN =
  /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(@[A-Za-z_][\w.]*)|\b(public|private|protected|internal|readonly|async|await|class|record|return|func|package|import|from|def|self|this|null|true|false|None|if|else|elif|for|range|select|case|defer|go|new|var|const|using|namespace|throw|try|catch|switch|in|is|as|task|string)\b|([A-Za-z_]\w*(?=\())/g;

function highlightCode(code: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const scanner = new RegExp(TOKEN_PATTERN.source, "g");
  let cursor = 0;
  let seq = 0;
  let match: RegExpExecArray | null;

  while ((match = scanner.exec(code)) !== null) {
    if (match.index > cursor) nodes.push(code.slice(cursor, match.index));
    const className = match[1]
      ? "tok-com"
      : match[2]
      ? "tok-str"
      : match[4]
      ? "tok-key"
      : "tok-fn";
    nodes.push(
      <span key={`tok-${seq++}`} className={className}>
        {match[0]}
      </span>
    );
    cursor = match.index + match[0].length;
  }

  if (cursor < code.length) nodes.push(code.slice(cursor));
  return nodes;
}

export const TechArchitectureShowcase: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<ArchitectureId>("golang");
  const [copiedCode, setCopiedCode] = useState(false);

  const activeTab =
    ARCHITECTURE_TABS.find((t) => t.id === activeTabId) || ARCHITECTURE_TABS[0];

  const highlightedCode = useMemo(
    () => highlightCode(activeTab.codeSnippet),
    [activeTab.codeSnippet]
  );

  const stackTags = activeTab.subtitle.split(" • ");

  const copyCode = () => {
    playChime();
    navigator.clipboard.writeText(activeTab.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section
      id="architecture"
      data-hue={TAB_HUE[activeTab.id]}
      className="band-bleed arch-band"
    >
      <div className="sheet">
        <SectionHead
          index="02"
          title="Arsitektur sistem & rekayasa kode"
          subtitle="Blueprint teknis dari sistem yang benar-benar saya bangun: backend konkurensi Golang + Redis untuk platform sertifikasi nasional, tiga sistem internal Laravel di Pusdatin Kemenhan, dan pipeline NLP serta machine learning berbasis Python."
          meta="Arsitektur Sistem & Blueprint Produksi"
        />

        {/* ── Blueprint selector ─────────────────────────── */}
        <div
          className="panel panel--pad-sm panel--plate arch__tabs"
          role="tablist"
          aria-label="Pilih blueprint arsitektur"
        >
          {ARCHITECTURE_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                id={`arch-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="arch-sheet"
                className={isActive ? "arch-tab arch-tab--on" : "arch-tab"}
                onClick={() => {
                  playPop();
                  setActiveTabId(tab.id);
                }}
                onMouseEnter={() => playTactileClick(700, 0.02)}
              >
                <span className="arch-tab__icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id="arch-sheet"
          role="tabpanel"
          aria-labelledby={`arch-tab-${activeTab.id}`}
        >
          <Reveal className="bento arch">
            {/* ── Identity + metrics ─────────────────────── */}
            <article key={`head-${activeTab.id}`} className="arch__head">
              <div className="cell__head">
                <div className="row row--tight">
                  <span className="chip chip--ink">{activeTab.badge}</span>
                  <span className="mono mono--ink">{activeTab.codeLang}</span>
                </div>
                <span className="chip arch__seal">
                  <FiShield size={13} />
                  <span>{activeTab.seal}</span>
                </span>
              </div>

              <h3 className="display-l arch__title"><span className="hl">{activeTab.title}</span></h3>

              <p className="lede arch__desc">{activeTab.description}</p>

              <div className="wrap-tags arch__tags">
                {stackTags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="arch__stats">
                {activeTab.metrics.map((m) => (
                  <div key={m.label} className="stat arch-metric">
                    <span className="stat__label">{m.label}</span>
                    <span className="stat__num">{m.value}</span>
                    <span className="mono arch-metric__unit">{m.unit}</span>
                  </div>
                ))}
              </div>
            </article>

            {/* ── Pipeline flow ──────────────────────────── */}
            <article key={`flow-${activeTab.id}`} className="arch__pipeline">
              <div className="cell__head">
                <span className="mono mono--ink arch__flow-label">
                  <FiActivity size={13} />
                  Pipeline execution flow
                </span>
                <span className="chip">
                  <span className="chip__dot chip__dot--live" aria-hidden="true" />
                  Alur sistem
                </span>
              </div>

              {activeTab.pipelineSteps.map((step, idx) => (
                <div key={step.title} className="arch-step">
                  <span className="arch-step__num">{idx + 1}</span>
                  <div className="arch-step__body">
                    <h4 className="arch-step__title">{step.title}</h4>
                    <span className="tag">{step.tech}</span>
                    <p className="arch-step__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </article>

            {/* ── Source terminal ────────────────────────── */}
            <article key={`term-${activeTab.id}`} className="term arch__term">
              <div className="term__bar">
                <span className="term__dot" aria-hidden="true" />
                <span className="term__dot term__dot--acid" aria-hidden="true" />
                <span className="term__dot term__dot--moss" aria-hidden="true" />
                <span className="arch__file">{activeTab.codeFile}</span>

                <button
                  type="button"
                  className={
                    copiedCode ? "arch__copy arch__copy--done" : "arch__copy"
                  }
                  onClick={copyCode}
                  title="Salin kode arsitektur"
                  aria-label="Salin cuplikan kode arsitektur"
                >
                  {copiedCode ? <FiCheck size={12} /> : <FiCopy size={12} />}
                  <span>{copiedCode ? "Copied" : "Copy"}</span>
                </button>

                <span className="tag arch__lang">{activeTab.codeLang}</span>
              </div>

              <div className="term__body">
                <pre>
                  <code>{highlightedCode}</code>
                </pre>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
