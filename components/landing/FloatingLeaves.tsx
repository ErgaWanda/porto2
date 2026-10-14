"use client";

import React from "react";
import Image from "next/image";

export const FloatingLeaves: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="floating-leaves-container"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 25,
        overflow: "hidden",
      }}
    >
      {/* ── Left Eucalyptus Branch (Draping from left border) ── */}
      <div className="animate-leaf-1 leaf-decor-left">
        <Image
          src="/images/eucalyptus_left.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
          priority
          unoptimized
        />
      </div>

      {/* ── Right Eucalyptus Branch (Framing top-right edge) ─── */}
      <div className="animate-leaf-2 leaf-decor-right">
        <Image
          src="/images/eucalyptus_right.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </div>
    </div>
  );
};
