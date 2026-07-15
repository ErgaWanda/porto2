# Panduan Desain & Tata Letak Neubrutalism (Design Memory Sheet)

Dokumen ini berisi panduan teknis, konsep layout, token warna, dan potongan kode utilitas bertema **Neubrutalism** untuk dijadikan acuan dalam pembuatan proyek portofolio atau website masa depan.

---

## 1. Karakter Utama Neubrutalism

Neubrutalism adalah gaya desain yang mendobrak aturan umum desain web modern (yang biasanya serba halus, minimalis, dan minim kontras). Ciri khas utamanya:
- **Kontras Ekstrim**: Teks hitam pekat di atas latar belakang cerah hangat.
- **Border Tebal & Kaku**: Menggunakan border tebal solid hitam (2px - 4px) tanpa radius lengkung yang besar pada kartu utama (biasanya `0px` radius).
- **Shadow Tanpa Blur (Hard Shadow)**: Menggunakan bayangan solid (tanpa opacity lembut atau efek blur) dengan offset x/y yang searah (misal: `6px 6px 0px #111111`).
- **Rotasi/Kemiringan Asimetris**: Elemen-elemen penting (seperti tombol, kartu, badge) dimiringkan sedikit (`-2°` s/d `2°`) untuk memberikan kesan dinamis, eksperimental, dan layaknya majalah/zine cetak.
- **Tipografi Bold & Kasar**: Menggunakan font sans-serif geometris yang tebal (seperti *Space Grotesk* atau *Archivo Black*) dikombinasikan dengan font monospace (*JetBrains Mono*) untuk detail statistik/badge.

---

## 2. Design Tokens (Variabel Warna & Font)

Gunakan palette warna mentah berani yang tidak ter-blur atau ter-mix. Berikut token standar yang digunakan pada portofolio ini:

```css
:root {
  /* Latar belakang hangat (bukan putih murni) */
  --bg-brutal: #FFF9EC;
  
  /* Hitam pekat untuk teks & border */
  --ink-brutal: #111111;
  
  /* Aksen Utama */
  --accent-1: #FF4D3D;    /* Merah-Oranye Berani (CTA) */
  --accent-2: #3D5AFE;    /* Biru Elektrik */
  --accent-3: #FFD400;    /* Kuning Terang (Highlight) */
  --surface:  #FFFFFF;    /* Latar Belakang Kartu */
}
```

### Tipografi yang Direkomendasikan
- **Heading / Display**: `Space Grotesk` atau `Archivo Black` (berat `800` s/d `900`).
- **Body Text**: `Inter` atau `Geist` (berat `400` s/d `600`).
- **Badge / Tech Tag / Statistik**: `JetBrains Mono` atau `Fira Code` (berat `700` s/d `800`).

---

## 3. Utilitas CSS & Tailwind (Tailwind v4)

Berikut adalah potongan kode CSS global yang dapat dipasang di `globals.css` untuk merealisasikan elemen-elemen Neubrutalism secara instan:

```css
/* Border Tebal Khas */
.border-brutal {
  border: 3px solid #111111;
}

.border-brutal-sm {
  border: 2px solid #111111;
}

.border-brutal-lg {
  border: 4px solid #111111;
}

/* Bayangan Kaku (Hard Shadow) */
.shadow-brutal {
  box-shadow: 6px 6px 0px #111111;
}

.shadow-brutal-md {
  box-shadow: 4px 4px 0px #111111;
}

.shadow-brutal-lg {
  box-shadow: 8px 8px 0px #111111;
}

/* Efek Hover Interaktif Pada Kartu */
.brutal-card-hover {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.brutal-card-hover:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px #111111;
}

.brutal-card-hover:active {
  transform: translate(2px, 2px);
  box-shadow: 4px 4px 0px #111111;
}

/* Efek Hover Interaktif Pada Tombol (Mengikuti Arah Tekan) */
.brutal-btn-hover {
  transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

.brutal-btn-hover:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0px #111111;
}

.brutal-btn-hover:active {
  transform: translate(1px, 1px);
  box-shadow: 4px 4px 0px #111111;
}

/* Pola Grid Latar Belakang */
.bg-grid-pattern {
  background-size: 24px 24px;
  background-image: 
    linear-gradient(to right, rgba(17, 17, 17, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 17, 17, 0.05) 1px, transparent 1px);
}
```

---

## 4. Konsep Layout (Non-Mainstream Split-Scroll)

Untuk membedakan dari portofolio standard ber-template:

1. **Sticky Sidebar Navigasi**:
   - Di desktop, letakkan sidebar di sisi kiri dengan properti `sticky top-0 h-screen`. Sidebar ini tidak ikut tergulung (scroll), melainkan mengunci pandangan pengguna pada nama dan akses navigasi cepat.
   - Di mobile, navigasi disembunyikan dan diakses melalui floating action button bertema brutalist di sudut bawah yang membuka **Bottom Sheet Overlay**.

2. **Asymmetric Grid (Pola Grid Asimetris)**:
   - Hindari layout grid simetris seimbang (seperti 3 kolom merata). Gunakan rasio asimetris seperti `60% / 40%` (atau `lg:grid-cols-12` dengan pembagian `lg:col-span-7` dan `lg:col-span-5`).
   - Miringkan kontainer foto atau statistik menggunakan `rotate-[-3deg]` atau `rotate-[2deg]`.

3. **Slide Overlapping (Pek Slide Carousel)**:
   - Pada slider proyek (misal dengan Swiper.js), set `slidesPerView: 1.2` di mobile dan `1.5` di desktop. Ini menyisakan potongan kartu berikutnya di sisi kanan layar untuk memancing rasa ingin tahu pembaca agar melakukan geser (drag/swipe).

---

## 5. Implementasi Scroll Spy (React / Next.js)

Gunakan `IntersectionObserver` bawaan browser untuk membuat efek navigasi aktif otomatis saat section digulung tanpa bergantung pada library tambahan yang berat:

```tsx
import React, { useState, useEffect } from "react";

export default function ScrollSpyLayout() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "services", "projects", "contact"];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-40% 0px -40% 0px", // Memicu pergantian saat section berada di tengah layar
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <div className="flex">
      {/* SidebarNav dapat membaca state activeSection untuk menambahkan kelas aktif */}
      <Sidebar active={activeSection} />
      <main>
        <section id="hero">...</section>
        <section id="about">...</section>
        ...
      </main>
    </div>
  );
}
```

---

## 6. Tips Integrasi & Build Aman

- **Modularisasi Icon**: Jangan bergantung penuh pada library icon pihak ketiga jika versinya tidak menentu. Bungkus SVG sederhana dalam file mandiri (misal: `Icons.tsx`) untuk kontrol penuh atas goresan (`strokeWidth`), warna, dan responsivitas.
- **Animasi Ringan (AOS & GSAP)**: Gunakan GSAP hanya untuk transisi khusus (seperti pemuatan pertama di bagian Hero) dan gunakan AOS (`Animate On Scroll`) yang ringan dengan kelas CSS sederhana untuk memicu efek masuk bagian halaman lainnya.
- **SSG Friendly**: Selalu aktifkan `output: 'export'` dan `images: { unoptimized: true }` di `next.config.ts` agar build website menghasilkan 100% berkas statis (HTML/CSS/JS) yang dapat di-hosting secara gratis di berbagai platform statis.
