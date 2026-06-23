# AGENTS.md — Journal Ocean

Panduan untuk agent (AI/human) yang bekerja di repo ini. Baca dulu sebelum ngoding.

## Project Overview

**Journal Ocean (JOC)** — website yayasan/lembaga dengan brand editorial warm (Warm Sage & Sand). Multi-page Astro app (MPA) dengan Directus sebagai headless CMS. Bilingual ID/EN.

- **Brand tampilan:** `Journal Ocean`
- **Slug teknis / package name:** `journalocean` (lihat `package.json` → `"name": "mpa_journalocean"`)
- **Akronim:** `JOC`

## Tech Stack

| Lapis          | Teknologi                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Framework      | **Astro 6** (`output: 'server'` / SSR)                                                                                              |
| UI Framework   | **React 19** (via `@astrojs/react`) — untuk komponen interaktif & animasi                                                           |
| Styling        | **Tailwind CSS v4** (via `@tailwindcss/vite`, **bukan** PostCSS config). Theme tokens di `src/styles/globals.css` pakai `@theme {}` |
| CMS            | **Directus** (SDK v22, `@directus/sdk`) — headless, fetched server-side                                                             |
| Bahasa         | **TypeScript** (`strict` via `@astrojs/check`)                                                                                      |
| Animasi        | GSAP, Framer Motion, Swiper, Embla Carousel                                                                                         |
| Icons          | Lucide (`lucide-astro`, `lucide-react`, `@lucide/astro`)                                                                            |
| Fonts          | Fraunces (serif), Inter, JetBrains Mono (via `@fontsource-variable/merriweather-sans` + system)                                     |
| Adapter deploy | `@astrojs/netlify` (Netlify) **atau** `@astrojs/node` (Docker/Coolify) — dipilih via env `DEPLOY_TARGET`                            |

### Scripts

```bash
npm run dev      # dev server
npm run build    # production build (SSR)
npm run preview  # preview build
```

## Deployment

`astro.config.mjs` auto-pilih adapter:

```js
const deployTarget =
  process.env.DEPLOY_TARGET ?? (process.env.NETLIFY ? 'netlify' : 'node');
```

- **Netlify:** set `DEPLOY_TARGET=netlify` (atau deteksi otomatis via `NETLIFY` env)
- **Coolify/Docker:** default → `@astrojs/node` standalone. Lihat `Dockerfile` + `docs/coolify-docker-deploy.md`
- **Netlify config:** `netlify.toml` ada di root

## Environment Variables

File `.env` (lihat `.gitignore` — `.env` di-ignore):

```env
DIRECTUS_URL='https://cms.sawiyan.or.id/'
DIRECTUS_TOKEN=<optional, untuk SSR private fetch>
DEPLOY_TARGET=<netlify|node>  # opsional
```

- **Directus URL:** `https://cms.sawiyan.or.id/`
- **Directus Admin:** `https://cms.sawiyan.or.id/admin`
- `DIRECTUS_TOKEN` opsional — jika pakai pattern private collections + SSR token (best practice production)

## Folder Structure

```
src/
├── assets/                          # static assets (svg, bg)
├── components/
│   ├── animations/                  # React (.tsx) — AnimatedCard, FadeInSection, ScrollToTop, StaggerContainer/Item
│   ├── globals/                     # Astro — Navbar, Footer, Preloader
│   └── pages/
│       ├── berita/                  # HeroWithSidebar, LatestBeritaCarousel
│       ├── landing-pages/           # Slider, Profile, Pengumuman
│       ├── profil/                  # ProfilJournalOcean, ProfilLengkap, StrukturOrganisasi, VisiMisi
│       └── program/                 # ProgramSosial, ProgramKemanusiaan, ProgramKeagamaan
├── layouts/
│   └── Layout.astro                 # base layout (Navbar + Footer + Preloader + slot)
├── lib/
│   └── directus.ts                  # ⭐ SEMUA Directus helpers, interfaces, cache, fallback (file besar ~3000 baris)
├── pages/
│   ├── index.astro                  # landing
│   ├── berita.astro                 # news list
│   ├── berita/[slug].astro          # news detail
│   ├── profil.astro
│   ├── profil/lengkap.astro
│   ├── program.astro
│   └── 404.astro
└── styles/
    └── globals.css                  # ⭐ Tailwind v4 @theme + palette + preloader keyframes

docs/                                # dokumentasi (di-gitignore, lokal)
├── directus-cms-setup.md
├── netlify-deploy.md
├── coolify-docker-deploy.md
├── berita-collection.md
└── sample-data/                     # CSV seed untuk import Directus

PLAN-*.md                            # file plan (di-gitignore, lokal)
design-demos/                        # demo HTML + screenshot (di-gitignore)
```

## Design System — Editorial Warm (Warm Sage & Sand)

### Palette

Didefinisikan di `src/styles/globals.css` (`:root` + `@theme`). Pakai via Tailwind: `text-brand-primary`, `bg-brand-sand`, dll.

| Token                           | Hex                  | Penggunaan            |
| ------------------------------- | -------------------- | --------------------- |
| `--color-brand-primary`         | `#4A5D3F`            | moss (warna utama)    |
| `--color-brand-primary-dark`    | `#3A4A32`            | moss gelap            |
| `--color-brand-primary-light`   | `#6B7A5A`            | moss-2                |
| `--color-brand-primary-lighter` | `#A4B293`            | moss-soft / pale sage |
| `--color-brand-secondary`       | `#6B7A5A`            | sage                  |
| `--color-brand-accent-orange`   | `#B8704A`            | rust (accent)         |
| `--color-brand-background`      | `#F7F2E7`            | ivory (bg utama)      |
| `--color-brand-surface`         | `#FBF6EE`            | paper                 |
| `--color-brand-sand`            | `#EBE3D2`            | warm sand             |
| `--color-brand-sand-2`          | `#DDD2B8`            | deeper sand           |
| `--color-brand-ink`             | `#2A2E25`            | forest dark (text)    |
| `--color-brand-ink-soft`        | `#55584C`            | text secondary        |
| `--color-brand-border`          | `rgba(42,46,37,0.1)` | border                |

### Fonts

- **Serif:** Fraunces (`--font-serif`) — untuk heading editorial
- **Mono:** JetBrains Mono (`--font-mono`) — label, nomor, eyebrow
- Sans: Merriweather Sans Variable / system

### Konvensi styling

- **Tailwind utilities saja** — hindari `<style>` block manual (sudah di-migrate penuh)
- Gunakan class brand: `bg-brand-primary`, `text-brand-ink`, `border-brand-border`, dll.
- Radius besar editorial: `rounded-[22px]`, `rounded-[24px]`, `rounded-[28px]`
- Heading pakai `font-serif`, eyebrow/label pakai `font-mono uppercase tracking-[0.18em]`
- Preloader keyframes ada di `globals.css` (bukan di komponen)

## Directus CMS

### Koleksi yang dipakai (17 collection)

| Collection                    | Dipakai di                                                | Keterangan                                                                       |
| ----------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `hero_slides`                 | landing `Slider.astro`                                    | slider hero                                                                      |
| `navbar`                      | `Navbar.astro`                                            | menu + logo                                                                      |
| `profil`                      | landing `Profile.astro`                                   | profil singkat landing                                                           |
| `footer`                      | `Footer.astro`                                            | footer content                                                                   |
| `announcement`                | landing `Pengumuman.astro` (header)                       | header announcement                                                              |
| `news`                        | `Pengumuman.astro`, `berita.astro`, `berita/[slug].astro` | artikel/berita/pengumuman/kegiatan. Kategori: `berita`, `pengumuman`, `kegiatan` |
| `preloader`                   | `Preloader.astro`                                         | preloader content                                                                |
| `about_header`                | `ProfilJournalOcean.astro`                                | header halaman profil                                                            |
| `about_profile`               | `ProfilJournalOcean.astro`                                | body profil                                                                      |
| `about_pillars`               | `ProfilJournalOcean.astro`                                | header pilar                                                                     |
| `about_pillar_items`          | `ProfilJournalOcean.astro`                                | item pilar (sort by `sort, id`)                                                  |
| `about_vision`                | `VisiMisi.astro`                                          | visi + eyebrow misi                                                              |
| `about_mission`               | `VisiMisi.astro`                                          | item misi (sort by `sort`)                                                       |
| `organization_structure`      | `StrukturOrganisasi.astro`                                | header struktur                                                                  |
| `organization_structure_list` | `StrukturOrganisasi.astro`                                | item struktur (icon → initial → code fallback)                                   |
| `social_program`              | `ProgramSosial.astro`                                     | program sosial (nested `program_bullets` + `list_program`)                       |
| `humanitarian_program`        | `ProgramKemanusiaan.astro`                                | program kemanusiaan (nested sama)                                                |
| `religious_program`           | `ProgramKeagamaan.astro`                                  | program keagamaan (nested sama)                                                  |

### Pattern `src/lib/directus.ts`

File ini central semua akses CMS. **Satu-satunya tempat** yang boleh `import` dari `@directus/sdk`. Pattern tiap collection:

1. **Interfaces** — `XxxTranslation`, `XxxItem`, `XxxContent` (dual-field naming: `title?` & `Title?` untuk handle casing Directus API)
2. **Normalizers** — `normalizeXxx()`, pakai helper `getStringField(obj, ['field', 'Field'])`
3. **Translation applicators** — `applyXxxTranslation(content, language)` — lookup translation by language code, fallback ke base
4. **Fallback constant** — `FALLBACK_XXX_CONTENT` (data lokal kalau CMS kosong/error)
5. **Fetcher** — `getXxx(language)` dengan in-memory cache (TTL **30 detik**, `CACHE_TTL_MS = 30_000`)
6. **Wrapper** — `getXxxWithFallback(language)` — merge CMS + fallback, resolve image via `directusAssetUrl()`

### Helper penting

```ts
directusAssetUrl(asset: string | null | undefined): string  // UUID → URL file Directus
normalizeSiteLanguage(lang: string | null): 'id' | 'en'     // normalize input bahasa
cacheGet<T>(key) / cacheSet(key, val)                        // in-memory cache
```

### Nested translations (untuk program collections)

Query harus explicit fetch nested translations:

```ts
fields: [
  '*',
  'translations.*',
  'program_bullets.*',
  'program_bullets.translations.*',
  'list_program.*',
  'list_program.translations.*',
];
```

### Best practice akses

- **Preferred production:** collections private, fetch via SSR `DIRECTUS_TOKEN`
- **Hybrid:** Public role read-only, limited collections/fields, filter published only
- `directus_files` butuh Public read kalau image di-embed langsung

## Bilingual ID/EN

- **Priority:** URL query `?lang=id|en` > localStorage > default `id`
- **localStorage key:** `journal-ocean-lang`
- **Scroll preserve:** sessionStorage `journal-ocean-language-scroll-y`
- Toggle bahasa → reload page + restore scroll
- Semua CMS helper handle translation + fallback ke ID kalau EN kosong
- Komponen baca: `const language = normalizeSiteLanguage(Astro.url.searchParams.get('lang'))`

## Komunikasi & Konvensi

- **Bahasa komunikasi dengan user:** Bahasa Indonesia
- **Design direction:** Huashu/editorial warm untuk visual update
- Komponen `.astro` untuk konten SSR, `.tsx` (React) hanya untuk interaktivitas/animasi
- `Layout.astro` = base (Navbar + Preloader + Footer + `<slot/>`)
- Setiap page section pakai `<section id="..." aria-labelledby="...">`
- Feature card guard: `{programFeature.image && (...)}` — jangan render img kosong
- List card filter image: `.filter((p) => p.image)` sebelum map

## Gotchas

- **Windows env:** Python unavailable, `/tmp/...` path mismatch (→ `D:\tmp\...`). Prefer Node untuk inspeksi lokal.
- **Astro LSP** tidak available untuk `.astro` di environment ini — verify via `npm run build`.
- **TypeScript strict** — unused declaration akan block build. Hapus variable yang nggak dipakai.
- **`news.slug`** mungkin tidak ada di Directus — fallback slug di-generate dari `judul` di frontend.
- **`news_translations`** sering return empty dari Public API → `?lang=en` fallback ke ID.
- **`about_vision`** punya typo field `mision_eyebrow` di API — normalizer harus handle keduanya (`mission_eyebrow` & `mision_eyebrow`).
- Setelah rewrite Astro besar, **run build + grep class typo** (Tailwind class salah = silent no-style).
- Field casing Directus tidak konsisten → selalu handle `field` & `Field` via `getStringField`.
