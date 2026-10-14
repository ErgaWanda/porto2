"use client";

import React from "react";
import { FeatureCardProps } from "./types";
import { GlassCard } from "./GlassCard";

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, onClick }) => {
  const isChart = feature.icon === "chart";

  return (
    <GlassCard
      onClick={onClick}
      hoverEffect={true}
      style={{
        padding: "16px 20px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "155px",
        flex: "1 1 140px",
        minWidth: "140px",
        boxSizing: "border-box",
        background: "rgba(8, 26, 16, 0.62)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255, 255, 255, 0.32)",
        borderTop: "1.5px solid rgba(255, 255, 255, 0.55)",
        boxShadow: "0 18px 45px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.5)",
      }}
    >
      {/* ── Top: Title & Description & Metric ──────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <h4
            style={{
              fontFamily: "var(--font-family-display)",
              fontSize: "15px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              margin: 0,
              lineHeight: 1.2,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            {feature.title}
          </h4>
          {feature.metric && (
            <span
              style={{
                fontFamily: "var(--font-family-mono)",
                fontSize: "10px",
                fontWeight: 700,
                color: "#4ade80",
                background: "rgba(34, 197, 94, 0.2)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                padding: "2px 7px",
                borderRadius: "9999px",
                letterSpacing: "0.03em",
              }}
            >
              {feature.metric}
            </span>
          )}
        </div>
        <p
          style={{
            fontFamily: "var(--font-family-body)",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.82)",
            lineHeight: 1.45,
            margin: 0,
            textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          {feature.description}
        </p>
      </div>

      {/* ── Bottom: High-Contrast Luminous Graphic ──────────── */}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: isChart ? "flex-start" : "center",
          height: "48px",
          position: "relative",
        }}
      >
        {isChart ? (
          /* Minimalist Bar Chart Graphic with glowing trend line */
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <svg
              viewBox="0 0 160 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              {/* Vertical Frosted Bars */}
              <rect x="8" y="34" width="18" height="26" rx="4" fill="rgba(34, 197, 94, 0.25)" stroke="rgba(74, 222, 128, 0.6)" strokeWidth="1" />
              <rect x="38" y="42" width="18" height="18" rx="4" fill="rgba(34, 197, 94, 0.25)" stroke="rgba(74, 222, 128, 0.6)" strokeWidth="1" />
              <rect x="68" y="26" width="18" height="34" rx="4" fill="rgba(34, 197, 94, 0.3)" stroke="rgba(74, 222, 128, 0.65)" strokeWidth="1" />
              <rect x="98" y="10" width="18" height="50" rx="4" fill="rgba(34, 197, 94, 0.35)" stroke="rgba(74, 222, 128, 0.7)" strokeWidth="1" />
              <rect x="128" y="4" width="18" height="56" rx="4" fill="rgba(34, 197, 94, 0.45)" stroke="rgba(74, 222, 128, 0.8)" strokeWidth="1" />

              {/* Glowing Trend Wave Line */}
              <path
                d="M 8 38 Q 46 48, 76 30 T 146 6"
                stroke="#4ade80"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                filter="drop-shadow(0 0 6px rgba(74, 222, 128, 0.8))"
              />
            </svg>
          </div>
        ) : (
          /* Minimalist Padlock Graphic */
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shackle */}
              <path
                d="M 18 24 V 17 C 18 10.37 23.37 5 30 5 C 36.63 5 42 10.37 42 17 V 24"
                stroke="#ffffff"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                filter="drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))"
              />
              {/* Body */}
              <rect
                x="12"
                y="24"
                width="36"
                height="30"
                rx="8"
                fill="rgba(34, 197, 94, 0.3)"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="1.5"
              />
              {/* Keyhole */}
              <circle cx="30" cy="36" r="3.5" fill="#4ade80" filter="drop-shadow(0 0 4px #4ade80)" />
              <path
                d="M 28.5 37 L 27.5 45 H 32.5 L 31.5 37 Z"
                fill="#4ade80"
              />
            </svg>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
