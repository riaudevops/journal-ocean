# Jurnal Ocean — Website

Website resmi **Jurnal Ocean** (sebelumnya Yayasan Sawiyan), dibangun dengan [Astro](https://astro.build/) + Tailwind CSS v4 + Directus CMS.

---

## 🧭 Quick Start

```sh
npm install
npm run dev      # dev server di http://localhost:4321
npm run build    # build ke ./dist
npm run preview  # preview production build
```

Environment vars (lihat `.env`):

```env
DIRECTUS_URL='https://cms.sawiyan.or.id/'
DIRECTUS_TOKEN='...'   # opsional, hanya kalau perlu write access
```

---

## 📁 Project Structure

```
/
├── docs/                       # Dokumentasi setup & panduan
│   └── directus-cms-setup.md   # Setup collection, fields, permissions di Directus
├── public/                     # Static assets (logo, favicon, dll)
│   └── logo-jurnalocean.png
├── src/
│   ├── components/
│   │   ├── animations/         # Framer Motion wrappers
│   │   ├── globals/            # Layout shell: Navbar, Footer, Preloader
│   │   └── pages/              # Komponen per-halaman
│   │       ├── berita/         # HeroWithSidebar, LatestBeritaCarousel
│   │       ├── landing-pages/  # Profile, Pengumuman, Slider ← dari CMS
│   │       ├── profil/         # ProfilJurnalOcean, VisiMisi, StrukturOrganisasi
│   │       └── program/        # ProgramSosial, Kemanusiaan, Keagamaan
│   ├── layouts/
│   │   └── Layout.astro        # Root layout
│   ├── lib/
│   │   └── directus.ts         # Directus SDK client + fetchers + fallback
│   ├── pages/                  # Astro routes
│   │   ├── index.astro
│   │   ├── profil.astro
│   │   ├── program.astro
│   │   └── berita/
│   └── styles/
│       └── globals.css         # Tailwind v4 @theme + design tokens
├── astro.config.mjs
├── tailwind config di globals.css
├── tsconfig.json
└── package.json
```

---

## 🎨 Design System

**Theme:** Preview B — Warm Sage & Sand (editorial, earthy, calm)

| Token       | Hex       | Usage               |
| ----------- | --------- | ------------------- |
| `moss`      | `#4A5D3F` | Primary accent, CTA |
| `moss-2`    | `#6B7A5A` | Secondary accent    |
| `moss-soft` | `#A4B293` | Soft accent, hover  |
| `ivory`     | `#F7F2E7` | Page background     |
| `sand`      | `#EBE3D2` | Card background     |
| `rust`      | `#B8704A` | Highlight, italic   |
| `ink`       | `#2A2E25` | Body text           |

**Typography:**

- `Fraunces` — Display serif (heading, hero)
- `Inter` — Body sans-serif
- `JetBrains Mono` — Numerals & counter

Tokens didefinisikan di `src/styles/globals.css` via Tailwind v4 `@theme` directive.

---

## 🗄️ Content Management (Directus)

Website ini ter-integrasi dengan **Directus** untuk konten dinamis. Saat ini yang CMS-driven:

- **Slider landing page** — `hero_slides` collection (lihat [`docs/directus-cms-setup.md`](./docs/directus-cms-setup.md))

### Cara kerja

- `output: "server"` di `astro.config.mjs` → setiap request fetch ulang dari CMS
- `src/lib/directus.ts` punya:
  - `getHeroSlides()` — fetch published, sort by `sort` asc
  - `getHeroSlidesWithFallback()` — auto-fallback ke hardcoded kalau CMS down/kosong
  - `directusAssetUrl()` — convert UUID asset ke full URL
  - 60s in-memory cache per request
- **Zero downtime**: kalau CMS down, slider tetap render pakai data hardcoded

### Menambah collection baru

1. Create collection di Directus admin (`/admin`)
2. Set public read permission
3. Tambah fetcher di `src/lib/directus.ts` (mirip `getHeroSlides`)
4. Tambah fallback data
5. Pakai di `.astro` component: `const data = await getXxxWithFallback()`

---

## 🧞 Commands

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `npm install`       | Install dependencies                               |
| `npm run dev`       | Dev server di `localhost:4321`                     |
| `npm run build`     | Production build ke `./dist/`                      |
| `npm run preview`   | Preview production build sebelum deploy            |
| `npm run astro ...` | Run CLI commands (e.g. `astro add`, `astro check`) |
| `npx astro check`   | TypeScript + Astro diagnostics                     |

---

## 📚 Dokumentasi Lain

- [`docs/directus-cms-setup.md`](./docs/directus-cms-setup.md) — Setup Directus collection, fields, permissions, dan seed data
- [`docs/hero-slides-content.md`](./docs/hero-slides-content.md) — Konten siap-paste untuk 6 slide hero_slides
- [`docs/netlify-deploy.md`](./docs/netlify-deploy.md) — Panduan deploy native Netlify untuk Astro SSR

---

## 📝 Catatan

- Astro v6, Tailwind v4 (CSS-based config, `@theme` directive)
- SSR mode via `@astrojs/netlify` adapter (native Netlify Functions)
- Animations: Framer Motion (tapi sedang di-minimalisir ke editorial style)
- Icons: `lucide-astro` (saat ini sebagian diganti ke letter initial di moss circle)
