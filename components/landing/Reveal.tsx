"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: "div" | "section" | "span" | "li" | "header" | "article";
  variant?: "rise" | "mask";
  delay?: number;
  className?: string;
  once?: boolean;
};

/**
 * Adds `.is-in` once the node enters the viewport. `rise` fades and lifts,
 * `mask` slides the child out of an overflow-hidden line.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  as: Tag = "div",
  variant = "rise",
  delay = 0,
  className = "",
  once = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const base = variant === "mask" ? "mask" : "reveal";

  return (
    <Tag
      ref={ref as never}
      className={`${base} ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};
