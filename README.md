# 💈 Barberia Luxe — Barbershop Management & Online Booking System

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Zero--Config%20Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

> **Barberia Luxe** adalah platform manajemen dan sistem reservasi barbershop eksklusif modern yang telah **berhasil dimigrasikan sepenuhnya dari PHP Native & MySQL ke Next.js (App Router, React & TypeScript)**, dirancang secara optimal untuk **0-Configuration 1-Click Deployment di Vercel**.

---

## 🏆 Hasil Migrasi: PHP Native ke Next.js & Ekosistem Vercel

Sesuai standar industri modern, aplikasi ini telah bertransformasi:

| Komponen | Versi Legacy (PHP) | Versi Modern (Next.js / Vercel) | Keunggulan Migrasi |
| :--- | :--- | :--- | :--- |
| **Bahasa Utama** | PHP 8 | **TypeScript / JavaScript (ESNext)** | Type-safe, autocompletion, mencegah bug runtime |
| **Framework** | PHP Native | **Next.js 16 (App Router)** | Zero-config di Vercel, Serverless Edge CDN global |
| **Frontend UI** | HTML5, Bootstrap 4, CSS | **React 19 + Tailwind CSS + Luxury CSS Variables** | Desain *Luxury Obsidian & Warm Gold* super cepat & responsif |
| **Backend & API** | `contact.php`, `appointments_ajax.php` | **Next.js Route Handlers (`/api/*`)** | Terintegrasi langsung dalam satu codebase |
| **Sesi Admin** | `$_SESSION` bawaan PHP | **Secure Cookie Session** | Aman dari kebocoran sesi, support multi-device |
| **Database** | MySQL Lokal (`barbershop_db.sql`) | **Resilient Serverless Data Layer** | Siap pakai instan (pre-seeded), mendukung Supabase/Neon/TiDB |

---

## ✨ Fitur-Fitur Unggulan

### 🌟 1. Sisi Pelanggan (Public Landing & Booking)
- **Tema Mewah "Barberia Luxe"**: Skema warna *Dark Obsidian* (`#0b0c10`) dengan aksen *Warm Gold* (`#d4af37`), tipografi bergengsi, dan animasi mikro interaktif.
- **Hero Showcase**: Headline berkelas, metrik reputasi (15+ tahun, 12.500+ pelanggan, rating 4.9/5.0), dan tombol booking instan.
- **Katalog Layanan & Tarif Rupiah**: Filter kategori interaktif (*Potong Rambut*, *Shaving & Brewok*, *Perawatan Wajah*, *Paket Komplit Executive*).
- **Galeri Portofolio Potongan Rambut**: Showcase visual gaya rambut tren terkini.
- **Profil Master Barber**: Informasi pengalaman, ulasan bintang, dan tombol booking langsung per master barber.
- **Sistem Booking Wizard 4-Langkah**:
  1. **Langkah 1**: Pemilihan layanan dengan kalkulasi otomatis subtotal biaya & durasi pengerjaan.
  2. **Langkah 2**: Pemilihan master barber spesifik atau opsi *"Siapa Saja yang Tersedia"*.
  3. **Langkah 3**: Kalender tanggal interaktif 10 hari ke depan dan slot jam operasional.
  4. **Langkah 4**: Pengisian data pelanggan (nama, nomor WhatsApp, email, catatan khusus).
- **Tiket Konfirmasi Digital**: Menampilkan kode booking unik (contoh: `BK-89213`), rincian biaya, dan tombol langsung kirim ke WhatsApp official barbershop.
- **Formulir Kontak Responsif**: Pengiriman pesan langsung terhubung ke API handler.

### 🛡️ 2. Portal Manajemen & Kasir (Admin Dashboard)
- **Akses Terproteksi**: Halaman login admin (`/admin/login`) berdesain luxury dengan kredensial demo cepat.
- **Statistik & Metrik Real-Time**: Total reservasi, booking menunggu konfirmasi, jadwal terkonfirmasi, dan estimasi omzet pendapatan.
- **Tabel Monitoring Jadwal**: Filter status (*Semua*, *Menunggu*, *Dikonfirmasi*, *Selesai*, *Dibatalkan*).
- **Aksi Cepat Staf Kasir**: Konfirmasi booking, tandai selesai layanan, batalkan jadwal (disertai modal alasan pembatalan), dan hapus data.
- **Katalog Layanan CRUD**: Halaman `/admin/services` untuk menambah layanan baru, mengatur tarif Rupiah, dan durasi pengerjaan.

---

## 🔑 Kredensial Login Demo Admin

Untuk menguji fitur portal kasir & administrator:
- **URL Login**: `/admin/login`
- **Username**: `admin`
- **Password**: `admin123`
*(Tersedia tombol "Auto Isi" di halaman login untuk kemudahan testing)*

---

## 🚀 Panduan Deploy ke Vercel (1-Click Deploy)

Website ini telah disiapkan dengan konfigurasi standar Next.js sehingga dapat di-deploy ke Vercel tanpa pengaturan rumit:

### Langkah Deploy:
1. Pastikan perubahan telah di-push ke repositori GitHub:
   ```bash
   git add .
   git commit -m "Migrasi penuh ke Next.js & TypeScript untuk Vercel"
   git push origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com/) dan klik **"Add New Project"** -> **"Project"**.
3. Pilih repositori **`barbershop-management-system`** dari akun GitHub Anda.
4. Vercel akan otomatis mendeteksi:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Klik **"Deploy"**. Dalam waktu 30–60 detik, website barbershop Anda akan online di domain gratis `*.vercel.app`!

---

## 💻 Menjalankan Secara Lokal (Local Development)

### Prasyarat
- Node.js versi 18.18+ atau 20+
- npm atau pnpm / yarn

### Instalasi & Menjalankan:
```bash
# 1. Masuk ke direktori project
cd barbershop-management-system

# 2. Install dependensi
npm install

# 3. Jalankan server pengembangan lokal
npm run dev
```

Buka browser Anda dan akses:
- **Website Utama**: [http://localhost:3000](http://localhost:3000)
- **Formulir Reservasi**: [http://localhost:3000/booking](http://localhost:3000/booking)
- **Portal Staf & Admin**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 📁 Struktur Direktori Project

```
├── public/                  # Aset statis & foto barbershop
│   └── images/              # Foto portofolio, master barber, interior
├── src/
│   ├── app/
│   │   ├── admin/           # Dashboard manajemen & login admin
│   │   │   ├── login/       # Halaman login staf
│   │   │   ├── services/    # Manajemen menu layanan
│   │   │   └── page.tsx     # Dashboard monitoring reservasi
│   │   ├── api/             # API Route Handlers
│   │   │   ├── appointments/# Endpoint GET & POST reservasi
│   │   │   ├── auth/        # Endpoint login, logout, sesi
│   │   │   └── contact/     # Endpoint formulir pesan kontak
│   │   ├── booking/         # Wizard booking 4 langkah
│   │   ├── globals.css      # Luxury dark & gold design system
│   │   ├── layout.tsx       # Root layout & SEO metadata
│   │   └── page.tsx         # Luxury landing page
│   ├── components/          # Komponen React (Navbar, Footer, LayoutWrapper)
│   └── lib/                 # Data Access Layer & model data barbershop
├── legacy-php/              # Arsip source code PHP original
├── next.config.ts           # Konfigurasi Next.js
├── tsconfig.json            # Konfigurasi TypeScript
├── package.json             # Dependensi project Next.js
└── README.md
```

---

## 📜 Lisensi & Hak Cipta
Hak Cipta © 2026 Barberia Luxe. Dirilis di bawah lisensi [MIT](LICENSE).
