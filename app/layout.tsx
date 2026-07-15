import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erga Wanda Afriza — Full Stack Developer & AI Engineer",
  description:
    "Portofolio digital Erga Wanda Afriza — Fullstack Developer & AI Engineer yang berpengalaman dalam membangun arsitektur web end-to-end dan mengintegrasikan model machine learning ke dalam aplikasi produksi.",
  keywords: [
    "Erga Wanda Afriza",
    "Full Stack Developer",
    "AI Engineer",
    "Golang",
    "Vue.js",
    "Laravel",
    "Machine Learning",
    "Portofolio",
  ],
  authors: [{ name: "Erga Wanda Afriza" }],
  openGraph: {
    title: "Erga Wanda Afriza — Full Stack Developer & AI Engineer",
    description:
      "Portofolio digital Erga Wanda Afriza — membangun sistem web yang andal dan cerdas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Space+Grotesk:wght@400;500;600;700;800&family=Archivo+Black&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
