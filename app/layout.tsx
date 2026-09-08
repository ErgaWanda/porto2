import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Erga Wanda Afriza — IT Developer & Software Engineer",
  description:
    "Portofolio digital Erga Wanda Afriza — IT Developer di RDS Group dengan spesialisasi C# & .NET, serta berpengalaman dalam Full Stack Development dan AI Engineering.",
  keywords: [
    "Erga Wanda Afriza",
    "IT Developer",
    "RDS Group",
    "C#",
    ".NET",
    "ASP.NET Core",
    "Software Engineer",
    "Full Stack Developer",
    "Golang",
    "Vue.js",
    "Laravel",
    "Machine Learning",
    "Portofolio",
  ],
  authors: [{ name: "Erga Wanda Afriza" }],
  openGraph: {
    title: "Erga Wanda Afriza — IT Developer & Software Engineer",
    description:
      "Portofolio digital Erga Wanda Afriza — IT Developer @ RDS Group (C#, .NET, Full Stack & AI).",
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
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700;800&family=Titan+One&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;700;800&family=Alex+Brush&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
