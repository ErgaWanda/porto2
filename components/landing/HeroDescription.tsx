"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HeroDescriptionProps } from "./types";

export const HeroDescription: React.FC<HeroDescriptionProps> = ({
  text = "Halo! Saya Erga, IT Developer di PT Reycom Document Solusi (RDS Group). Berfokus pada rekayasa backend enterprise C# .NET 9, arsitektur microservices, konkurensi Golang, performa database tinggi, serta integrasi AI & Machine Learning praktis.",
  roleBadge = "IT DEVELOPER @ RDS GROUP",
  location = "Jakarta & Bekasi, Indonesia",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(8, 26, 16, 0.65)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255, 255, 255, 0.32)",
        borderTop: "1.5px solid rgba(255, 255, 255, 0.55)",
        borderLeft: "1.5px solid rgba(255, 255, 255, 0.55)",
        borderRadius: "24px",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "13px",
        width: "100%",
        maxWidth: "540px",
        boxSizing: "border-box",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.55)",
      }}
    >
      {/* ── Profile Header: Avatar Photo + Identity ────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <div
          style={{
            width: "68px",
            height: "68px",
            borderRadius: "18px",
            position: "relative",
            overflow: "hidden",
            border: "2.5px solid #22c55e",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(34, 197, 94, 0.4)",
            flexShrink: 0,
            background: "#0a1f14",
          }}
        >
          <Image
            src="/images/erga_photo.jpeg"
            alt="Erga Wanda Afriza"
            fill
            style={{ objectFit: "cover", objectPosition: "center 22%" }}
            priority
            unoptimized
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <h3
              style={{
                fontFamily: "var(--font-family-display)",
                fontSize: "18px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.02em",
                margin: 0,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
              }}
            >
              Erga Wanda Afriza, S.Kom.
            </h3>
          </div>

          <div
            style={{
              fontFamily: "var(--font-family-mono)",
              fontSize: "11px",
              color: "#86efac",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              letterSpacing: "0.02em",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
              }}
            />
            <span>{roleBadge}</span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "11.5px",
              color: "rgba(255, 255, 255, 0.78)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{location}</span>
            <span>•</span>
            <span style={{ color: "#4ade80", fontWeight: 600 }}>IPK 3.23 / 4.00</span>
          </div>
        </div>
      </div>

      {/* ── Perkenalan Diri (Bio Narasi) ────────────────────── */}
      <p
        style={{
          fontFamily: "var(--font-family-body)",
          fontSize: "13.5px",
          color: "rgba(255, 255, 255, 0.95)",
          lineHeight: 1.55,
          letterSpacing: "-0.01em",
          margin: 0,
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
        }}
      >
        {text}
      </p>

      {/* ── Key Metrics Pills Row ───────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          paddingTop: "6px",
          borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <span
          style={{
            background: "rgba(34, 197, 94, 0.24)",
            border: "1px solid rgba(74, 222, 128, 0.5)",
            color: "#86efac",
            fontFamily: "var(--font-family-mono)",
            fontSize: "10.5px",
            fontWeight: 700,
            padding: "4px 11px",
            borderRadius: "9999px",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          ⚡ 7+ Proyek Enterprise
        </span>

        <span
          style={{
            background: "rgba(255, 255, 255, 0.16)",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            color: "#ffffff",
            fontFamily: "var(--font-family-mono)",
            fontSize: "10.5px",
            fontWeight: 700,
            padding: "4px 11px",
            borderRadius: "9999px",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          💼 2+ Tahun Pengalaman
        </span>

        <span
          style={{
            background: "rgba(255, 255, 255, 0.16)",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            color: "#ffffff",
            fontFamily: "var(--font-family-mono)",
            fontSize: "10.5px",
            fontWeight: 700,
            padding: "4px 11px",
            borderRadius: "9999px",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          🎓 S1 Teknologi Informasi
        </span>
      </div>
    </motion.div>
  );
};
