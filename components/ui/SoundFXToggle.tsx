"use client";

import React, { useState, useEffect } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

function engine(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!audioCtx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      audioCtx = new Ctor();
    }
    if (audioCtx.state === "suspended") void audioCtx.resume();
    return audioCtx;
  } catch {
    return null;
  }
}

export const playTactileClick = (freq = 820, duration = 0.035) => {
  if (!soundEnabled) return;
  const ctx = engine();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + duration);
  gain.gain.setValueAtTime(0.045, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playPop = () => playTactileClick(600, 0.04);

export const playChime = () => {
  if (!soundEnabled) return;
  const ctx = engine();
  if (!ctx) return;
  const now = ctx.currentTime;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + i * 0.06);
    gain.gain.setValueAtTime(0.03, now + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.14);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.14);
  });
};

const KEY = "porto_sound_enabled";

export const SoundFXToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(KEY) !== "true") return;
    soundEnabled = true;
    setEnabled(true);
  }, []);

  const toggle = () => {
    const next = !enabled;
    soundEnabled = next;
    setEnabled(next);
    localStorage.setItem(KEY, String(next));
    if (next) playChime();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`icon-btn${enabled ? " icon-btn--on" : ""}`}
      aria-pressed={enabled}
      title={enabled ? "Nonaktifkan efek suara" : "Aktifkan efek suara"}
      aria-label={enabled ? "Efek suara aktif" : "Efek suara nonaktif"}
    >
      {enabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
    </button>
  );
};
