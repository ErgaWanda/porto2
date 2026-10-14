"use client";

import React from "react";
import { NavItem } from "./types";

interface PillNavProps {
  navItems: NavItem[];
  activeId: string;
  onSelectNav: (id: string) => void;
}

export const PillNav: React.FC<PillNavProps> = ({
  navItems,
  activeId,
  onSelectNav,
}) => {
  return (
    <nav
      className="glass-pill-nav"
      aria-label="Navigasi Utama"
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px",
        gap: "3px",
        height: "38px",
        boxSizing: "border-box",
        background: "rgba(8, 24, 15, 0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.22)",
        borderRadius: "9999px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
      }}
    >
      {navItems.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            onClick={() => onSelectNav(item.id)}
            className={isActive ? "liquid-glass-active" : "liquid-glass-inactive"}
            style={{
              height: "32px",
              padding: "0 16px",
              boxSizing: "border-box",
              borderRadius: "9999px",
              fontFamily: "var(--font-family-body)",
              fontSize: "13px",
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
