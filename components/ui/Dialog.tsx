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
  const scrimRef = useRef<HTMLDivElement>(null);
  const scrimPress = useRef<{ x: number; y: number } | null>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    const y = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.cssText;
    /* Safari ignores body{overflow:hidden} as a lock: the document still pans,
       so a touch drag inside the dialog is eaten by the page scroller and the
       dialog body never moves. Taking the body out of flow at its own offset is
       the lock Safari does honour, and the offset is what keeps the page from
       jumping to the top behind the scrim. */
    html.style.overflow = "hidden";
    body.style.cssText += ";position:fixed;top:-" + y + "px;left:0;right:0;width:100%;overflow:hidden";
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevHtml;
      body.style.cssText = prevBody;
      /* globals.css sets html{scroll-behavior:smooth}, which also hijacks
         scrollTo — the page then re-animates from 0 and lands mid-flight,
         hundreds of pixels off. Instant, and inside this task: waiting a frame
         paints the restored document at the top first. */
      window.scrollTo({ top: y, behavior: "instant" });
    };
  }, [open]);

  if (!open) return null;

  return (
    <motion.div
      ref={scrimRef}
      className="scrim"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      /* iOS dispatches click on the nearest common ancestor when a drag starts
         and ends on different nodes, so a flick that begins in the body and
         leaves over the scrim closes the dialog — which reads to the user as
         "the popup won't scroll". Only a press that starts and ends on the bare
         scrim, without travelling, counts as a dismiss. */
      onPointerDown={(e) => {
        scrimPress.current =
          e.target === scrimRef.current ? { x: e.clientX, y: e.clientY } : null;
      }}
      onClick={(e) => {
        const press = scrimPress.current;
        scrimPress.current = null;
        if (!press || e.target !== scrimRef.current) return;
        if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > 12) return;
        onClose();
      }}
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
