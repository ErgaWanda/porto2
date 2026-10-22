"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

interface TextScrambleProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div" | "p";
  className?: string;
  style?: React.CSSProperties;
  durationMs?: number; // Total scramble duration in ms (default: 2600ms = ~2.6 seconds)
  triggerOnView?: boolean;
  triggerOnHover?: boolean;
  delayMs?: number; // Optional delay before starting
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!<>_#+*~";

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  as: Component = "span",
  className = "",
  style = {},
  durationMs = 2600,
  triggerOnView = true,
  triggerOnHover = true,
  delayMs = 200,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const startTime = Date.now();
    let lastGlyphUpdate = 0;
    let currentRandomGlyphs = text.split("").map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);

    const update = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Refresh random glyphs every ~45ms for a smooth matrix-feel
      if (now - lastGlyphUpdate > 45) {
        lastGlyphUpdate = now;
        currentRandomGlyphs = text.split("").map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);
      }

      // Initial 25% phase: all characters actively scramble
      // Remaining 75% phase: characters progressively lock into place from left to right
      let revealedCount = 0;
      if (progress > 0.25) {
        const resolveProgress = (progress - 0.25) / 0.75;
        // Ease-out curve for natural letter locking
        const ease = 1 - Math.pow(1 - resolveProgress, 2.5);
        revealedCount = Math.floor(ease * text.length);
      }

      const nextText = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealedCount) {
            return text[index];
          }
          return currentRandomGlyphs[index] || GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplayText(nextText);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        // Complete! Lock cleanly into the full official name
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  }, [text, durationMs, isScrambling]);

  // Initial trigger with slight delay on mount/view
  useEffect(() => {
    if (triggerOnView && inView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      const timer = setTimeout(() => {
        scramble();
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [inView, triggerOnView, scramble, delayMs]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <Component
      ref={inViewRef}
      onMouseEnter={triggerOnHover ? scramble : undefined}
      className={className}
      style={{
        display: "inline-block",
        cursor: triggerOnHover ? "pointer" : "default",
        userSelect: "none",
        ...style,
      }}
    >
      {displayText}
    </Component>
  );
};
