"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { HeroProps } from "./types";

export const Hero: React.FC<HeroProps> = ({
  headlineMain = "Engineering Systems That Scale.",
  onPrimaryCta,
  onSecondaryCta,
  primaryLabel = "Lihat Proyek",
  secondaryLabel = "Unduh CV",
  supportingText = "• Rekayasa backend enterprise C# .NET 9, arsitektur microservices, dan performa tinggi untuk platform digital skala bisnis nyata.",
  onScrollDown,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* ── Top: Staggered Oversized Headline & Dual CTA Buttons ─ */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      >
        {/* Role Badge Above Headline */}
        <div style={{ marginBottom: "18px" }}>
          <span
            style={{
              background: "rgba(10, 36, 20, 0.7)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(74, 222, 128, 0.45)",
              color: "#86efac",
              fontFamily: "var(--font-family-mono)",
              fontSize: "11px",
              fontWeight: 700,
              padding: "5px 14px",
              borderRadius: "9999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
              }}
            />
            <span>FULL STACK &amp; ENTERPRISE IT DEVELOPER</span>
          </span>
        </div>

        {/* Staggered Name Headline (Rhythmic Left-Right-Left matching reference) */}
        <h1
          style={{
            fontFamily: "var(--font-family-display)",
            fontSize: "clamp(3.2rem, 7.2vw, 6.5rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            margin: 0,
            marginBottom: "28px",
            textShadow: "0 8px 32px rgba(0, 0, 0, 0.6), 0 2px 8px rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Line 1: Erga (left aligned) */}
          <span style={{ display: "block" }}>Erga</span>

          {/* Line 2: Wanda (staggered to the right) */}
          <span
            style={{
              display: "block",
              paddingLeft: "clamp(16px, 5.5vw, 110px)",
              marginTop: "2px",
            }}
          >
            Wanda
          </span>

          {/* Line 3: Afriza. (left aligned, glowing mint green) */}
          <span
            style={{
              display: "block",
              marginTop: "2px",
              color: "#86efac",
              textShadow: "0 0 35px rgba(34, 197, 94, 0.45), 0 6px 25px rgba(0, 0, 0, 0.7)",
            }}
          >
            Afriza.
          </span>
        </h1>

        {/* Action Button Row: Aligned directly under Afriza. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          {/* Filled Green Primary Pill CTA */}
          <button
            onClick={onPrimaryCta}
            className="btn-primary-green"
            style={{
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{primaryLabel}</span>
            <FiArrowRight size={15} />
          </button>

          {/* Frosted Glass Outlined Secondary Pill CTA */}
          <button
            onClick={onSecondaryCta}
            className="btn-secondary-glass"
            style={{
              padding: "12px 22px",
              fontSize: "14px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FiDownload size={14} style={{ color: "#4ade80" }} />
            <span>{secondaryLabel}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
