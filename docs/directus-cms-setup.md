# Directus CMS Setup Guide

Panduan setup Directus CMS untuk **Journal Ocean** — saat ini mencakup collection `hero_slides` yang dipakai oleh Slider landing page.

---

## 📍 Info Koneksi

| Field        | Value                                                 |
| ------------ | ----------------------------------------------------- |
| URL          | `https://cms.sawiyan.or.id/`                          |
| Admin Panel  | `https://cms.sawiyan.or.id/admin`                     |
| Health check | `https://cms.sawiwan.or.id/server/health`             |
| Env var      | `DIRECTUS_URL='https://cms.sawiyan.or.id/'` di `.env` |
| Token        | `DIRECTUS_TOKEN` (opsional, hanya untuk write)        |

---

## 🗄️ Collection: `hero_slides`

### Schema

| Field        | Type         | Required | Default        | Notes                                                                   |
| ------------ | ------------ | -------- | -------------- | ----------------------------------------------------------------------- |
| `id`         | UUID/Integer | auto     | auto           | Primary key                                                             |
| `status`     | Dropdown     | yes      | `draft`        | Values: `published`, `draft` — **slider hanya render yang `published`** |
| `sort`       | Integer      | yes      | 1              | Urutan tampil (ascending)                                               |
| `number`     | String       | yes      | —              | Misal `"01"`, `"02"`                                                    |
| `headline`   | WYSIWYG      | yes      | —              | Mendukung `<em>` tag untuk italic                                       |
| `image`      | String       | yes      | —              | URL lengkap (recommended untuk dev) atau UUID file                      |
| `quote`      | Text         | yes      | —              | Multi-line, plain text                                                  |
| `quote_attr` | String       | no       | `Journal Ocean` | Attribut quote                                                          |

### Cara Buat Collection

1. Login ke `https://cms.sawiyan.or.id/admin`
2. **Settings** → **Data Model** → **Create Collection**
3. Name: `hero_slides`, Primary Key: `id` (auto-increment), Singleton: **OFF**
4. Create, lalu tambah 7 fields di atas (kecuali `id`)

### Cara Set Public Read (Collection Data)

1. **Settings** → **Access Policies** → **Public**
2. Tab **Item Permissions** → klik `hero_slides`
3. Set **Read** ke **All Access**
4. Save

### Cara Set Public Read (File/Asset)

⚠️ **Penting**: selain collection `hero_slides`, perlu juga set public read untuk **system collection `directus_files`** supaya asset image bisa di-load oleh browser tanpa token.

**Step by step:**

1. **Settings** → **Access Policies** → **Public**
2. Tab **Item Permissions** → klik **`directus_files`** (system collection)
3. Set **Read** ke **All Access**
4. (Opsional) Set **Field Permissions**:
   - `filename_download`, `storage`, `filename_disk`, `filesize` — biarkan default (semua accessible)
5. Save

**Verifikasi** (via terminal):
```bash
curl -I https://cms.sawiyan.or.id/assets/<UUID_FILE>
```
Harus return `HTTP 200` + `Content-Type: image/...` (bukan `HTTP 403`).

Kalau `directus_files` **tidak muncul** di list (beberapa versi Directus menyembunyikan system collections):
- Klik icon **filter/eye** di pojok kanan atas Item Permissions list
- Enable **Show System Collections**
- `directus_files` akan muncul di list
- Klik dan set Read → All Access

**Catatan**: untuk file yang di-upload **sebelum** permission di-set, mungkin perlu re-upload atau refresh cache. Direkomendasikan test dengan file baru.

### Test API

```bash
curl https://cms.sawiyan.or.id/items/hero_slides?filter[status][_eq]=published&sort=sort
```

**Sukses**: return JSON `{ "data": [...] }` dengan 6 items
**Gagal**: return 403 `You don't have permission to access collection "hero_slides"`

---

## 🔄 Behavior di Website

| Situasi                         | Yang terjadi                                      |
| ------------------------------- | ------------------------------------------------- |
| CMS up + ada data published     | Slider pakai data CMS                             |
| CMS up + 0 published            | Slider pakai `FALLBACK_HERO_SLIDES` (hardcoded)   |
| CMS down / network error        | Slider pakai `FALLBACK_HERO_SLIDES`               |
| `DIRECTUS_URL` kosong di `.env` | Slider pakai `FALLBACK_HERO_SLIDES` + warning log |

**Cache**: 60s in-memory per process. Perubahan di CMS muncul max 60 detik di website.
**Mode**: SSR — tidak perlu rebuild setelah edit konten.

### Logs yang harus dilihat

```
[directus] getHeroSlides failed: <error>      ← CMS error (network/permission/parse)
[directus] Using fallback hero slides (...)   ← fallback aktif
```

---

## 🛠️ Helper yang Tersedia

Di `src/lib/directus.ts`:

| Export                                              | Fungsi                                     |
| --------------------------------------------------- | ------------------------------------------ |
| `getHeroSlides(): Promise<HeroSlide[]>`             | Raw fetch dari CMS (return [] kalau error) |
| `getHeroSlidesWithFallback(): Promise<HeroSlide[]>` | Fetch + auto-fallback                      |
| `directusAssetUrl(id): string`                      | Convert UUID asset → full URL              |
| `directusAdminUrl(coll, id): string`                | URL admin panel untuk edit record          |
| `isDirectusHealthy(): Promise<boolean>`             | Health check (cached 30s)                  |
| `isDirectusConfigured: boolean`                     | True kalau `DIRECTUS_URL` di-set           |
| `FALLBACK_HERO_SLIDES: HeroSlide[]`                 | Data hardcoded                             |
| `HeroSlide` interface                               | TypeScript type untuk slide                |

### Contoh Penggunaan

```ts
import { getHeroSlidesWithFallback, directusAdminUrl } from "../lib/directus";

// Di Astro frontmatter
const slides = await getHeroSlidesWithFallback();

// Di template
<a href={directusAdminUrl('hero_slides', slide.id)}>Edit di CMS →</a>
```

---

## ➕ Menambah Collection Baru

Pola yang sama seperti `hero_slides`:

1. **Create collection** + fields di Directus admin
2. **Set public read** di Access Policies
3. **Tambah type** di `src/lib/directus.ts`:

   ```ts
   export interface XxxItem { id: number; ... }
   ```

4. **Tambah fetcher**:

   ```ts
   export async function getXxxItems(): Promise<XxxItem[]> { ... }
   ```

5. **Tambah fallback** (wajib — defensive):

   ```ts
   export const FALLBACK_XXX_ITEMS: XxxItem[] = [ ... ];
   ```

6. **Pakai di .astro component**:

   ```ts
   const items = await getXxxItemsWithFallback();
   ```

7. **Test**: build clean, dev server jalan, data render

---

## 🚀 Rollout Checklist

- [x] Install `@directus/sdk` di package.json
- [x] Tulis `src/lib/directus.ts` dengan SDK client + fetchers + fallback
- [x] Update `Slider.astro` untuk pakai data CMS
- [x] Build clean (`npm run build`)
- [x] Dev server jalan, slider render dengan fallback
- [ ] **User**: Setup `hero_slides` collection di Directus admin
- [ ] **User**: Insert 6 data items dengan `status = published` (lihat [`docs/hero-slides-content.md`](./hero-slides-content.md))
- [ ] **User**: Set public read untuk `directus_files` (untuk assets/image)
- [ ] **User**: Verify API return array 6 items
- [ ] Verify di browser: data CMS muncul (cek Network tab)
- [ ] Counter `01 / 06` match dengan jumlah slide
