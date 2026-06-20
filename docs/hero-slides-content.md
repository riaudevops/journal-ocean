# Konten Hero Slides — Journal Ocean

Konten siap-paste untuk **6 slide** di collection `hero_slides` Directus CMS. Copy-paste per field langsung dari dokumen ini ke admin panel.

**Target audience**: Warga Muslim Indonesia yang ingin berkontribusi pada pendidikan, sosial, dan keagamaan.

**Tone**: Kalem, bijak, islami, edukatif — sesuai brand **Journal Ocean** (Warm Sage & Sand, editorial, trustworthy).

---

## 📋 Panduan Insert

### Sebelum Mulai

Pastikan Anda sudah:
1. ✓ Login ke `https://cms.sawiyan.or.id/admin`
2. ✓ Collection `hero_slides` sudah dibuat (lihat `docs/directus-cms-setup.md`)
3. ✓ Public read aktif untuk `hero_slides`
4. ✓ (Opsional tapi direkomendasikan) Public read aktif untuk `directus_files` — lihat panduan di `docs/directus-cms-setup.md` bagian "Cara Set Public Read (File/Asset)"

### Cara Insert 1 Item

1. Sidebar → **Content** → **hero_slides** → klik **"+"** / **"Create Item"** (pojok kanan atas)
2. Isi field per field sesuai tabel di bawah
3. **Save** (centang hijau)
4. Ulangi untuk 6 slide

### Field Reference

| Field | Type | Wajib | Keterangan |
|---|---|---|---|
| `status` | Dropdown | ✓ | Pilih **`published`** (bukan `draft`) |
| `sort` | Integer | ✓ | Urutan tampil ascending. **1 = tampil pertama** |
| `number` | String | ✓ | Label "01" - "06" (pakai leading zero) |
| `headline` | WYSIWYG | ✓ | Pakai mode HTML/Source. Boleh ada `<em>...</em>` |
| `image` | File/String | ✓ | URL Unsplash ATAU upload file lokal (lihat catatan di bawah) |
| `quote` | Text | ✓ | Multi-line. Pakai tanda kutip melengkung `"..."` (bukan lurus `"..."`) |
| `quote_attr` | String | — | Default: `Journal Ocean` |

### Catatan Gambar

Ada **2 cara** isi field `image`:

**Cara A — URL Unsplash langsung** (lebih cepat, cocok untuk development):
- Ubah type field `image` jadi **String** (bukan File)
- Paste URL Unsplash di bawah langsung

**Cara B — Upload file lokal** (recommended untuk production):
- Biarkan type field `image` sebagai **File**
- Download gambar dari URL Unsplash (atau pakai foto asli yayasan)
- Upload via admin panel
- Pastikan public read `directus_files` sudah di-set (lihat `docs/directus-cms-setup.md`)

---

## 📝 Konten 6 Slide

### Slide 1 — Integritas

| Field | Value |
|---|---|
| `status` | `published` |
| `sort` | `1` |
| `number` | `01` |
| `headline` | `Menjunjung tinggi <em>kejujuran, amanah, dan tanggung jawab</em> dalam setiap langkah.` |
| `image` | `https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop&q=80` |
| `quote` | `"Integritas adalah napas dari setiap pengabdian yang kami lakukan."` |
| `quote_attr` | `Journal Ocean` |

**Tema foto**: Aerial view jembatan/konstruksi — simbol membangun dengan fondasi kokoh.

---

### Slide 2 — Ilmu Pengetahuan

| Field | Value |
|---|---|
| `status` | `published` |
| `sort` | `2` |
| `number` | `02` |
| `headline` | `Mengembangkan <em>ilmu pengetahuan</em> secara berkelanjutan dan berbasis Islam.` |
| `image` | `https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920&h=1080&fit=crop&q=80` |
| `quote` | `"Ilmu yang bermanfaat adalah cahaya yang tak pernah padam."` |
| `quote_attr` | `Journal Ocean` |

**Tema foto**: Perpustakaan dengan buku-buku terbuka — simbol pencarian ilmu.

---

### Slide 3 — Al-Qur'an sebagai Landasan

| Field | Value |
|---|---|
| `status` | `published` |
| `sort` | `3` |
| `number` | `03` |
| `headline` | `Menjadikan <em>Al-Qur'an dan Hadis</em> sebagai landasan berpikir dan bertindak.` |
| `image` | `https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&h=1080&fit=crop&q=80` |
| `quote` | `"Al-Qur'an adalah kompas abadi yang menuntun langkah kami."` |
| `quote_attr` | `Journal Ocean` |

**Tema foto**: Al-Qur'an terbuka dengan cahaya hangat — simbol petunjuk ilahi.

---

### Slide 4 — Kreativitas & Pembaruan

| Field | Value |
|---|---|
| `status` | `published` |
| `sort` | `4` |
| `number` | `04` |
| `headline` | `Mendorong <em>kreativitas dan pembaruan</em> dalam pendidikan dan pengabdian.` |
| `image` | `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop&q=80` |
| `quote` | `"Inovasi adalah cara kami menjawab tantangan zaman."` |
| `quote_attr` | `Journal Ocean` |

**Tema foto**: Kolaborasi tim dalam diskusi kreatif — simbol sinergi dan inovasi.

---

### Slide 5 — Kemanusiaan & Keadilan Sosial

| Field | Value |
|---|---|
| `status` | `published` |
| `sort` | `5` |
| `number` | `05` |
| `headline` | `Mengedepankan <em>kebermanfaatan dan keadilan sosial</em> bagi masyarakat luas.` |
| `image` | `https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop&q=80` |
| `quote` | `"Kepedulian sosial adalah ibadah yang paling dekat."` |
| `quote_attr` | `Journal Ocean` |

**Tema foto**: Relawan membagikan bantuan — simbol empati dan aksi sosial.

---

### Slide 6 — Kerja Sama

| Field | Value |
|---|---|
| `status` | `published` |
| `sort` | `6` |
| `number` | `06` |
| `headline` | `Mengembangkan <em>kerja sama</em> untuk dampak yang berkelanjutan.` |
| `image` | `https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&h=1080&fit=crop&q=80` |
| `quote` | `"Kolaborasi adalah kekuatan yang tak tergantikan."` |
| `quote_attr` | `Journal Ocean` |

**Tema foto**: Jaringan tangan terhubung — simbol kolaborasi dan persatuan.

---

## ✅ Verifikasi Setelah Insert

### Test API

```bash
curl "https://cms.sawiyan.or.id/items/hero_slides?filter[status][_eq]=published&sort=sort"
```

**Yang diharapkan**: JSON dengan array `data` berisi 6 items.

### Test di Website

```bash
cd "D:/Development/Web/jurnal-ocean"
npm run dev
# Buka http://localhost:4321
```

- Slider harusnya menampilkan 6 slide
- Counter `01 / 06` di pojok kiri bawah
- Headline punya kata-kata italic (rendered dari `<em>` tag)
- Background image load (kalau pakai File upload, butuh public read `directus_files`)

### Quick Test Image

```bash
node test-asset.mjs <UUID_FILE>
```

Ganti `<UUID_FILE>` dengan UUID file image yang baru di-upload. Harus return `HTTP 200`.

---

## 🔄 Update Konten di Masa Depan

Slider pakai **SSR + cache 60 detik**, jadi:

| Aksi | Dampaknya di website |
|---|---|
| Edit headline di CMS | Muncul max 60 detik kemudian |
| Tambah slide baru (sort=7) | Muncul dalam 60 detik, counter jadi `01 / 07` |
| Ubah status ke `draft` | Slide hilang dalam 60 detik |
| Hapus item | Hilang dalam 60 detik (filtered out karena tidak published) |
| Reorder (ubah sort) | Muncul dalam 60 detik |

**Tidak perlu rebuild website** untuk update konten.

---

## 📸 Sumber Foto Alternatif

Kalau Anda punya foto asli Journal Ocean, lebih baik pakai itu. Untuk development, foto Unsplash di atas adalah placeholder.

**Atribusi**: Semua foto dari [Unsplash](https://unsplash.com/) — free to use, no attribution required untuk commercial use (lihat [Unsplash License](https://unsplash.com/license)).

### Rekomendasi Foto untuk Produksi

- **Slide 1-3**: Foto kegiatan internal Journal Ocean (rapat, kajian, dokumentasi program)
- **Slide 4-6**: Foto program pengabdian (pembagian bantuan, kegiatan belajar, kolaborasi dengan mitra)
- Ukuran ideal: **1920×1080** (16:9) atau **2400×1350** untuk kualitas lebih tinggi
- Format: **JPG** untuk foto, **WebP** untuk optimasi
- Compress dengan [TinyPNG](https://tinypng.com/) atau [Squoosh](https://squoosh.app/) sebelum upload
