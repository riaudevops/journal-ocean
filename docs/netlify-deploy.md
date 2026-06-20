# Deploy Journal Ocean ke Netlify

Panduan deploy native Netlify untuk project Astro SSR ini.

---

## Kenapa Dockerfile Tidak Dipakai di Netlify?

Netlify **bukan** platform container runtime untuk menjalankan `Dockerfile` sebagai server persistent.

Di repo ini, Dockerfile tetap tersedia untuk **Coolify/Docker deploy**. Netlify tetap memakai `netlify.toml` dan `DEPLOY_TARGET=netlify`, jadi Dockerfile tidak dipakai oleh Netlify native deploy.

Project Docker/Coolify memakai:

- `@astrojs/node`
- `output: "server"`
- `Dockerfile` dengan `CMD ["node", "./dist/server/entry.mjs"]`

Itu cocok untuk VPS / Railway / Render / Fly.io / Coolify, tapi **tidak cocok untuk Netlify native deploy**.

Untuk Netlify, Astro SSR harus memakai:

- `@astrojs/netlify`
- `adapter: netlify()`
- `netlify.toml`
- Publish directory: `dist`

Adapter Netlify akan mengubah SSR route menjadi **Netlify Functions**, bukan proses Node server yang listen port.

---

## Konfigurasi Project Saat Ini

### `astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22.12.0"
  NPM_FLAGS = "--legacy-peer-deps"
```

---

## Setting di Netlify Dashboard

Saat membuat site dari Git repository:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `22.12.0` |
| Framework preset | Astro (atau None kalau auto-detect gagal) |

**Jangan pilih Dockerfile / Docker buildpack.**

---

## Environment Variables

Masuk ke:

`Site configuration` → `Environment variables`

Tambahkan:

| Key | Value |
|---|---|
| `DIRECTUS_URL` | `https://cms.sawiyan.or.id/` |

Opsional:

| Key | Value |
|---|---|
| `DIRECTUS_TOKEN` | token Directus kalau nanti butuh private API |

> Catatan: `.env` lokal tidak otomatis ikut ke Netlify. Env var harus ditambahkan manual di Dashboard.

---

## Deploy Checklist

1. Commit semua perubahan:
   ```bash
   git add astro.config.mjs netlify.toml package.json package-lock.json README.md docs/netlify-deploy.md docs/coolify-docker-deploy.md Dockerfile
   git commit -m "Configure Astro deployment adapters"
   git push
   ```
2. Di Netlify, trigger **Deploys → Retry deploy → Clear cache and deploy site**
3. Pastikan build log menampilkan:
   ```text
   adapter: @astrojs/netlify
   Generated SSR Function
   Complete!
   ```
4. Test default Netlify URL dulu:
   ```text
   https://<site-name>.netlify.app
   ```
5. Kalau default URL jalan tapi custom domain gagal, masalahnya ada di DNS/custom domain, bukan build.

---

## Troubleshooting

### 1. `This site can't be reached` di custom domain

Cek default Netlify URL dulu:

- Kalau `*.netlify.app` **bisa dibuka** → masalah DNS/custom domain
- Kalau `*.netlify.app` **tidak bisa dibuka** → masalah deploy/build config

### 2. Custom domain DNS

Untuk root domain (`journalocean.id`):

- Gunakan Netlify DNS nameservers, **atau**
- Set record:
  - `A` → `75.2.60.5`
  - `AAAA` → `2600:1f18:2489:8200::c8`

Untuk subdomain (`www.journalocean.id`):

- `CNAME` → `<site-name>.netlify.app`

Setelah update DNS, tunggu propagasi 5 menit–24 jam.

### 3. Build berhasil tapi route SSR 404/500

Cek build log harus ada:

```text
[@astrojs/netlify] Generated SSR Function
[@astrojs/netlify] Emitted _redirects
```

Kalau tidak ada, adapter belum benar.

### 4. Data Directus tidak muncul di Netlify

Pastikan env var `DIRECTUS_URL` ada di Netlify Dashboard. Jika tidak, website akan fallback ke data hardcoded.

### 5. Gambar Directus tidak muncul

Pastikan public read untuk `directus_files` sudah aktif di Directus.

Test:

```bash
curl -I https://cms.sawiyan.or.id/assets/<UUID_FILE>
```

Harus return `HTTP 200`, bukan `403`.
