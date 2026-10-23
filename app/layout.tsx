import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { InkDefs } from "@/components/ui/InkDefs";
import { InkDraw } from "@/components/ui/InkDraw";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],

  variable: "--font-display",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],

  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],

  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1815",
};

/* Netlify injects URL / DEPLOY_PRIME_URL at build time. Without a base, the
   absolute OG URLs degrade to relative paths and chat previews show no image. */
const siteUrl =
  process.env.URL ?? process.env.DEPLOY_PRIME_URL ?? "http://localhost:3000";

const title = "Erga Wanda Afriza: IT Developer";
const ogImage = "/images/og.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description:
    "Portofolio profesional Erga Wanda Afriza, IT Developer dengan spesialisasi sistem backend scalable dan frontend responsif (Golang, Laravel, React, Vue.js, C#/.NET, PostgreSQL, Redis, Docker, AI/ML).",
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
    title,
    description:
      "Portofolio digital Erga Wanda Afriza, IT Developer (Golang, Laravel, React, Vue.js, C#/.NET, Docker, Machine Learning).",
    type: "website",
    locale: "id_ID",
    siteName: "Erga Wanda Afriza: Portofolio",
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Erga Wanda Afriza: IT Developer di RDS Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "IT Developer di RDS Group, backend Golang & Laravel, frontend React & Vue, AI/ML.",
    images: [ogImage],
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

