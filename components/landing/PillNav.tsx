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
        padding: "4px 6px",
        gap: "4px",
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
              borderRadius: "9999px",
              padding: "7px 18px",
              fontFamily: "var(--font-family-body)",
              fontSize: "13.5px",
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            {isActive && (
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
