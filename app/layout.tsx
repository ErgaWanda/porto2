import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { InkDefs } from "@/components/ui/InkDefs";
import { InkDraw } from "@/components/ui/InkDraw";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1815",
};

export const metadata: Metadata = {
  title: "Erga Wanda Afriza — IT Developer",
  description:
    "Portofolio profesional Erga Wanda Afriza — IT Developer dengan spesialisasi sistem backend scalable dan frontend responsif (Golang, Laravel, React, Vue.js, C#/.NET, PostgreSQL, Redis, Docker, AI/ML).",
  keywords: [
    "Erga Wanda Afriza",
    "IT Developer",
    "RDS Group",
    "Full Stack Developer",
    "Software Engineer",
    "Golang",
    "Echo Framework",
    "Laravel",
    "Vue.js",
    "React",
    "C#",
    ".NET",
    "Kotlin",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Nginx",
    "BERT NLP",
    "Machine Learning",
    "LSP CoachPro Indonesia",
    "Pusdatin Kemenhan",
    "Portofolio",
  ],
  authors: [{ name: "Erga Wanda Afriza" }],
  openGraph: {
    title: "Erga Wanda Afriza — IT Developer",
    description:
      "Portofolio digital Erga Wanda Afriza — IT Developer (Golang, Laravel, React, Vue.js, C#/.NET, Docker, Machine Learning).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${bricolage.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <body>
        <InkDefs />
        <InkDraw />
        {children}
      </body>
    </html>
  );
}

