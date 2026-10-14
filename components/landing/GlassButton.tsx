"use client";

import React from "react";
import { GlassButtonProps } from "./types";

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  style = {},
  icon,
  ariaLabel,
  type = "button",
  disabled = false,
}) => {
  const getButtonClass = () => {
    switch (variant) {
      case "primary":
        return "btn-primary-green";
      case "secondary":
        return "btn-secondary-glass";
      case "ghost":
        return "btn-secondary-glass";
      default:
        return "btn-primary-green";
    }
  };

  const combinedClass = `${getButtonClass()} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={combinedClass}
        aria-label={ariaLabel}
        style={style}
      >
        {icon && <span style={{ display: "inline-flex", alignItems: "center" }}>{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      aria-label={ariaLabel}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {icon && <span style={{ display: "inline-flex", alignItems: "center" }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
