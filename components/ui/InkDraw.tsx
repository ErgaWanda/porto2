"use client";

import { useEffect } from "react";

/** Every element that owns a drawn stroke, so the ink animates on the node
 *  the reader is actually looking at rather than on its (very tall) band. */
const HOSTS = [
  ".rule", ".section__head", ".panel", ".frame", ".plate", ".tline",
  ".tline__row", ".pslab__band", ".pslab__sticker", ".pslab__stamp",
  ".hero__stack", ".ledger__list li", ".ledger__note", ".ledger__tabs",
  ".ledger__output", ".spec__bio", ".meter__scale", ".gh__foot",
  ".contact", ".footer", ".topbar", ".ink-note",
].join(", ");

/**
 * Adds `.is-drawn` just before a stroke-bearing node enters the viewport.
 * The root box grows downward so a line is already mid-stroke when it
 * becomes visible — ink that starts drawing only once it is on screen reads
 * as a glitch, not as a hand.
 */
export const InkDraw: React.FC = () => {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(HOSTS);
    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-drawn"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-drawn");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px 140px 0px", threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
};
