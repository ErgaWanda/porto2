"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCardProps } from "./types";

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  style = {},
  onClick,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card-base ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={
        hoverEffect
          ? {
              y: -4,
              scale: 1.01,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      style={{
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};
