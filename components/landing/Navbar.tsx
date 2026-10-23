"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiMenu, FiX, FiArrowUpRight } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { NavbarProps } from "./types";

export const Navbar: React.FC<NavbarProps> = ({
  navItems,
  activeId,
  onSelectNav,
  onContactClick,
  onCvClick,
}) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = activeId || "projects";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y < 18 : y > 40));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const pick = (id: string) => {
    onSelectNav(id);
    setOpen(false);
  };

  return (
    <>
      <div className={`topbar${scrolled ? " topbar--tight" : ""}`}>
        <div className="topbar__inner">
          <a
            href="#hero"
            className="nav__brand"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Erga Wanda Afriza: kembali ke atas"
          >
            <Image
              src="/images/erga_photo.jpeg"
              alt=""
              width={34}
              height={34}
              className="nav__mark"
              unoptimized
              priority
            />
            <span className="nav__name">Erga Wanda</span>
            <span className="nav__role nav-desktop">IT Developer</span>
          </a>

          <nav className="nav__list nav-desktop" aria-label="Navigasi bagian">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => pick(item.id)}
                className={`nav__item${active === item.id ? " nav__item--active" : ""}`}
                aria-current={active === item.id ? "true" : undefined}
              >
                <span className="nav__item-num">{item.num ?? String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="nav__actions">
            <button className="btn btn--ghost btn--sm nav-desktop" onClick={onCvClick}>
              CV
            </button>
            <button className="btn btn--primary btn--sm" onClick={onContactClick}>
              Kontak
              <FiArrowUpRight size={13} className="btn__icon" />
            </button>
            <button
              className="nav-mobile btn btn--ghost btn--sm nav__menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Buka navigasi menu"
              aria-expanded={open}
            >
              <FiMenu size={15} />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="drawer__top">
              <span className="mono">Menu</span>
              <button className="dialog__close" onClick={() => setOpen(false)} aria-label="Tutup menu">
                <FiX size={17} />
              </button>
            </div>

            <nav className="drawer__list" aria-label="Navigasi bagian (mobile)">
              {navItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => pick(item.id)}
                  className={`drawer__item${active === item.id ? " drawer__item--active" : ""}`}
                >
                  <span className="drawer__num">{item.num ?? String(i + 1).padStart(2, "0")}</span>
                  <span>{item.label}</span>
                  <FiArrowUpRight size={15} />
                </button>
              ))}
            </nav>

            <div className="drawer__foot">
              <button className="btn btn--ink btn--block" onClick={() => { onCvClick(); setOpen(false); }}>
                Unduh CV
              </button>
              <button className="btn btn--primary btn--block" onClick={() => { onContactClick(); setOpen(false); }}>
                Kirim Pesan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
