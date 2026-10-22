import React from "react";

/**
 * Displacement filters that turn machine-straight CSS geometry into lines a
 * hand actually drew. Referenced from CSS as `filter: url(#ink-line)`.
 *
 * Two rules this file exists to enforce:
 *  - Never reference these from an element that contains type. Displacement
 *    warps every pixel it is given, glyphs included, and the result reads as
 *    a blur filter over the copy. Frames go on text-free pseudo-elements.
 *  - Every region is far larger than the shape it holds. The default
 *    `-10% -10% 120% 120%` is a few pixels on a 7px-tall rule, which cuts
 *    the displacement off flat at the edge — the stroke looks cropped, not
 *    drawn. Paired `seed`s keep neighbouring strokes from wobbling in
 *    lockstep, which is the one pattern that would give the trick away.
 */

type Brush = {
  id: string;
  seed: number;
  /** Low along the stroke, high across it: long bows, tight tooth.
   *  Flipped on the `-v` brushes, which bend rails instead of rules. */
  freq: string;
  scale: number;
  box: [string, string, string, string];
};

const BRUSHES: Brush[] = [
  { id: "ink-line", seed: 3, freq: "0.013 0.05", scale: 6, box: ["-3%", "-650%", "106%", "1400%"] },
  { id: "ink-line-b", seed: 23, freq: "0.011 0.06", scale: 5, box: ["-3%", "-650%", "106%", "1400%"] },
  { id: "ink-line-v", seed: 17, freq: "0.05 0.012", scale: 5.5, box: ["-620%", "-3%", "1340%", "106%"] },
  { id: "ink-line-v-b", seed: 43, freq: "0.06 0.011", scale: 4.5, box: ["-620%", "-3%", "1340%", "106%"] },
  { id: "ink-frame", seed: 8, freq: "0.012 0.022", scale: 7, box: ["-12%", "-16%", "124%", "132%"] },
  { id: "ink-frame-b", seed: 31, freq: "0.016 0.019", scale: 5.5, box: ["-12%", "-16%", "124%", "132%"] },
  { id: "ink-chip", seed: 13, freq: "0.085 0.12", scale: 2.8, box: ["-34%", "-60%", "168%", "220%"] },
  { id: "ink-chip-b", seed: 41, freq: "0.1 0.14", scale: 2.2, box: ["-34%", "-60%", "168%", "220%"] },
];

export const InkDefs: React.FC = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    <defs>
      {BRUSHES.map((b) => (
        <filter
          key={b.id}
          id={b.id}
          x={b.box[0]}
          y={b.box[1]}
          width={b.box[2]}
          height={b.box[3]}
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency={b.freq} numOctaves={2} seed={b.seed} result="tooth" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="tooth"
            scale={b.scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      ))}
    </defs>
  </svg>
);
