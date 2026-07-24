"use client";
import { useEffect, useRef, useState } from "react";
import { playChiptune } from "./RetroWindow";

interface TerminalWindowProps {
  onOpenWindow: (id: string) => void;
  projectsList: Array<{ id: number; title: string; type: string }>;
}

export default function TerminalWindow({ onOpenWindow, projectsList }: TerminalWindowProps) {
  const [history, setHistory] = useState<string[]>([
    "ERGA-OS [Version 2000.98.95]",
    "(C) Copyright Erga Wanda Afriza 2026. All rights reserved.",
    "",
    "Ketik 'help' untuk melihat daftar perintah yang tersedia.",
    ""
  ]);
  const [inputVal, setInputVal] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on click anywhere in terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Matrix falling code effect
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Characters (numbers, symbols, Katakana)
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@%&*+-/=<>?";
    const charArr = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array to track Y position of drops
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#39ff14"; // neon green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [matrixActive]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    const newLogs = [...history, `C:\\ERGA_OS> ${inputVal}`];
    playChiptune("click");

    switch (command) {
      case "help":
        newLogs.push(
          "Perintah yang tersedia:",
          "  help     - Menampilkan daftar perintah",
          "  about    - Menampilkan informasi profil Erga",
          "  skills   - Menampilkan keahlian teknis (Visual Stack)",
          "  projects - Menampilkan daftar karya dan proyek terpilih",
          "  contact  - Menampilkan informasi kontak resmi",
          "  matrix   - Mengaktifkan/menonaktifkan efek digital Matrix rain",
          "  clear    - Membersihkan layar konsol",
          "  open [id]- Membuka jendela portofolio (contoh: open tentang, open karya)"
        );
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "about":
        newLogs.push(
          "PROFIL ERGA WANDA AFRIZA",
          "=========================",
          "Jabatan  : Full Stack Developer & AI Engineer",
          "Lulusan  : S1 Teknik Informatika (Universitas Darma Persada, 2025)",
          "IPK      : 3.23 / 4.0",
          "Fokus    : Membangun backend yang skalabel (Golang/Laravel), frontend interaktif",
          "           (Vue.js), serta pengolahan NLP/ML untuk sistem produksi.",
          "",
          "Ketik 'open tentang' untuk melihat tampilan visual profil lengkap."
        );
        break;
      case "skills":
        newLogs.push(
          "KEAHLIAN TEKNIS (OS_STACK.DLL)",
          "==============================",
          "Fullstack(Next/Vue) [█████████████████░░] 87%",
          "Golang (Echo)      [████████████████░░░] 85%",
          "PHP (Laravel)      [█████████████████░░] 88%",
          "Vue.js             [████████████████░░░] 85%",
          "JS / TS            [███████████████░░░░] 80%",
          "Python (ML/Flask)  [███████████████░░░░] 80%",
          "PostgreSQL/MySQL   [████████████████░░░] 82%",
          "Docker / DevOps    [██████████████░░░░░] 75%",
          "NLP (BERT/Bayes)   [███████████████░░░░] 78%",
          "",
          "Ketik 'open keahlian' untuk melihat detail stack lengkap."
        );
        break;
      case "projects":
        newLogs.push("DAFTAR PROYEK TERPILIH (PROJECT_LIST.EXE)", "=========================================");
        projectsList.forEach((p) => {
          newLogs.push(`  [ID: ${p.id}] ${p.title} (${p.type})`);
        });
        newLogs.push(
          "",
          "Ketik 'open karya' untuk membuka halaman galeri proyek interaktif."
        );
        break;
      case "contact":
        newLogs.push(
          "INFORMASI KONTAK RESMI",
          "======================",
          "Email    : ewandaafriza@gmail.com",
          "Telepon  : +62 882 9106 7259",
          "GitHub   : github.com/ErgaWanda",
          "LinkedIn : linkedin.com/in/erga-wanda-afriza",
          "Lokasi   : Jakarta, Indonesia",
          "",
          "Ketik 'open kontak' untuk membuka formulir pengiriman telemetri."
        );
        break;
      case "matrix":
        setMatrixActive(!matrixActive);
        newLogs.push(
          matrixActive
            ? "Efek Matrix dinonaktifkan."
            : "Memuat modul MATRIX_RAIN.SYS... Sukses! Tekan ketik 'matrix' lagi untuk keluar."
        );
        break;
      default:
        // Check for open [id]
        if (command.startsWith("open ")) {
          const targetId = command.substring(5).trim();
          const validIds = ["beranda", "tentang", "karya", "keahlian", "pengalaman", "pendidikan", "layanan", "ulasan", "kontak"];
          
          let resolvedId = targetId;
          // Alias mappings
          if (targetId === "skills") resolvedId = "keahlian";
          if (targetId === "experience") resolvedId = "pengalaman";
          if (targetId === "education") resolvedId = "pendidikan";
          if (targetId === "services") resolvedId = "layanan";
          if (targetId === "testimonials" || targetId === "testimoni") resolvedId = "ulasan";
          if (targetId === "about") resolvedId = "tentang";
          if (targetId === "projects") resolvedId = "karya";
          if (targetId === "contact") resolvedId = "kontak";

          if (validIds.includes(resolvedId)) {
            onOpenWindow(resolvedId);
            newLogs.push(`Membuka jendela: ${resolvedId.toUpperCase()}...`);
          } else {
            newLogs.push(`Error: Jendela '${targetId}' tidak ditemukan. Ketik 'help' untuk daftar kata kunci.`);
            playChiptune("error");
          }
        } else {
          newLogs.push(`Perintah tidak dikenal: '${command}'. Ketik 'help' untuk melihat daftar.`);
          playChiptune("error");
        }
    }

    setHistory(newLogs);
    setInputVal("");
  };

  return (
    <div className="terminal-shell" onClick={handleTerminalClick} style={{ position: "relative" }}>
      {matrixActive && (
        <div className="matrix-container">
          <canvas ref={canvasRef} style={{ display: "block", opacity: 0.85 }} />
        </div>
      )}

      <div
        className="terminal-logs"
        style={{
          position: "relative",
          zIndex: 2,
          textShadow: matrixActive ? "0 0 4px #00ff00" : "none",
        }}
      >
        {history.map((line, index) => (
          <div key={index} className="terminal-line">
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="terminal-prompt-row" style={{ position: "relative", zIndex: 2 }}>
        <span className="terminal-prompt">C:\ERGA_OS&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="terminal-input"
          autoFocus
          aria-label="Terminal Input"
        />
      </form>
    </div>
  );
}
