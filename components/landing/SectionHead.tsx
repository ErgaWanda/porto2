"use client";

import React from "react";
import { Reveal } from "./Reveal";

type SectionHeadProps = {
  index: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
};

/** Editorial section header: [num] Title …………… meta, over a heavy rule. */
export const SectionHead: React.FC<SectionHeadProps> = ({
  index,
  title,
  subtitle,
  meta,
  actions,
}) => {
  return (
    <header className="section__head">
      <Reveal className="section__lead">
        <span className="section__num">{index}</span>
        <h2 className="section__title">{title}</h2>
      </Reveal>

      <div className="section__aside">
        {subtitle && <p className="section__sub">{subtitle}</p>}
        {meta && <span className="section__meta">{meta}</span>}
        {actions}
      </div>
    </header>
  );
};
