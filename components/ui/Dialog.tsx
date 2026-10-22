"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

/** Scrim + plate dialog: escapes, scrim-clicks and focus are handled here. */
export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  labelledBy,
  title,
  meta,
  footer,
  children,
  size = "md",
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <motion.div
      className="scrim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`dialog dialog--${size}`}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog__head">
          <div className="dialog__heading">
            <h2 id={labelledBy} className="display-m dialog__title">
              {title}
            </h2>
            {meta && <span className="mono">{meta}</span>}
          </div>
          <button className="dialog__close" onClick={onClose} aria-label="Tutup dialog">
            <FiX size={17} />
          </button>
        </div>

        <div className="dialog__body">{children}</div>

        {footer && <div className="dialog__foot">{footer}</div>}
      </motion.div>
    </motion.div>
  );
};
