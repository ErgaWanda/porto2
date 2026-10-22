import React from "react";

type InkNoteProps = {
  label: string;
  variant?: "right" | "down";
  className?: string;
};

const PATHS = {
  right: {
    body: "M3 33 C 26 6, 58 46, 97 17",
    head: "M84 9 L 99 16 L 89 31",
    box: "0 0 104 42",
  },
  down: {
    body: "M15 3 C 3 21, 41 17, 33 43",
    head: "M23 31 L 34 45 L 42 29",
    box: "0 0 48 50",
  },
};

/**
 * A margin note: the kind of arrow a person draws on a printed sheet.
 * The stroke is text-free so it can take the ink displacement filter, and
 * `pathLength` lets every variant trace in over the same distance.
 */
export const InkNote: React.FC<InkNoteProps> = ({
  label,
  variant = "right",
  className = "",
}) => {
  const p = PATHS[variant];
  return (
    <span className={`ink-note ink-note--${variant} ${className}`.trim()}>
      <svg
        className="ink-note__stroke"
        viewBox={p.box}
        aria-hidden="true"
        focusable="false"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="ink-note__body" d={p.body} pathLength={100} />
        <path className="ink-note__head" d={p.head} pathLength={100} />
      </svg>
      <span className="ink-note__label">{label}</span>
    </span>
  );
};
