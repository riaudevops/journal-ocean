# Deploy Journal Ocean ke Coolify dengan Dockerfile

Project ini bisa deploy dengan dua mode:

| Platform | Adapter Astro | Cara pilih adapter |
|---|---|---|
| Coolify / Docker | `@astrojs/node` | `DEPLOY_TARGET=docker` di Dockerfile |
| Netlify | `@astrojs/netlify` | `DEPLOY_TARGET=netlify` di `netlify.toml` |

---

## Masalah yang Pernah Muncul

Error:

```text
Error: Cannot find module '/app/dist/server/entry.mjs'
```

Penyebab: Dockerfile menjalankan:

```bash
node ./dist/server/entry.mjs
```

Tapi build Astro sebelumnya memakai **Netlify adapter**, sehingga file `dist/server/entry.mjs` tidak dibuat. File itu hanya dibuat saat build memakai **Node adapter**.

Solusi: Dockerfile sekarang set:

```dockerfile
ENV DEPLOY_TARGET=docker
```

Lalu `astro.config.mjs` otomatis memakai:

```js
node({ mode: "standalone" })
```

---

## Dockerfile Saat Ini

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
ENV DEPLOY_TARGET=docker
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV DEPLOY_TARGET=docker
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]
```

---

## Setting Coolify

### Build Pack

Pilih:

```text
Dockerfile
```

### Port

Set exposed/application port:

```text
3000
```

Dockerfile sudah set:

```dockerfile
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
```

### Environment Variables

Tambahkan di Coolify:

| Key | Value |
|---|---|
| `DIRECTUS_URL` | `https://cms.sawiyan.or.id/` |
| `NODE_ENV` | `production` |

**Penting:** isi value tanpa tanda kutip. Jangan tulis `'https://cms.sawiyan.or.id/'` atau `\'https://cms.sawiyan.or.id/\'`.

Opsional:

| Key | Value |
|---|---|
| `DIRECTUS_TOKEN` | token Directus jika API private |

> Jangan masukkan `.env` ke git. Env production harus di-set dari Coolify dashboard.

---

## Verifikasi Lokal Docker

Jalankan dari root project:

```bash
docker build -t jurnal-ocean .
docker run --rm -p 3000:3000 \
  -e DIRECTUS_URL="https://cms.sawiyan.or.id/" \
  jurnal-ocean
```

Buka:

```text
http://localhost:3000
```

Jika sukses, log tidak boleh mengandung:

```text
Cannot find module '/app/dist/server/entry.mjs'
```

---

## Verifikasi Build Output

Untuk cek tanpa Docker:

```bash
DEPLOY_TARGET=docker npm run build
ls dist/server/entry.mjs
```

Harus ada:

```text
dist/server/entry.mjs
```

---

## Troubleshooting

### 1. Masih `Cannot find module '/app/dist/server/entry.mjs'`

Kemungkinan Docker cache masih memakai image lama.

Solusi di Coolify:

1. Buka deployment
2. Pilih **Redeploy**
3. Aktifkan opsi **no cache / rebuild without cache** jika ada
4. Deploy ulang

Atau ubah kecil di Dockerfile supaya cache invalidated.

### 2. Build berhasil tapi web tidak bisa dibuka

Cek port Coolify harus `3000`.

Di Dockerfile:

```dockerfile
ENV PORT=3000
EXPOSE 3000
```

Di Coolify, application port juga harus `3000`.

### 3. Error `TypeError: Invalid URL`

Jika log menampilkan:

```text
input: "\\'https://cms.sawiyan.or.id/\\'"
```

Berarti `DIRECTUS_URL` di Coolify terisi dengan quote/backslash literal. Ubah menjadi value bersih:

```env
DIRECTUS_URL=https://cms.sawiyan.or.id/
```

Setelah itu **Redeploy without cache**.

### 4. Data CMS tidak muncul

Pastikan env var ada di Coolify:

```env
DIRECTUS_URL=https://cms.sawiyan.or.id/
```

Jika tidak ada, slider tetap jalan tapi memakai fallback content.

### 5. Gambar Directus tidak muncul

Pastikan `directus_files` sudah public read di Directus.

Test:

```bash
curl -I https://cms.sawiyan.or.id/assets/<UUID_FILE>
```

Harus return `HTTP 200`, bukan `403`.
