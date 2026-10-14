# 💈 Barberia Luxe — Sistem Reservasi & Manajemen Barbershop Premium

[![PHP Version](https://img.shields.io/badge/PHP-8.2%20%7C%208.4-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-MariaDB-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-4.5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Docker Ready](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

> **Barberia Luxe** adalah aplikasi web modern berbasis **PHP & MySQL** untuk manajemen barbershop eksklusif. Dilengkapi antarmuka elegan bertema *Luxury Dark & Warm Gold*, sistem pemesanan janji temu online 4-langkah, dan portal dashboard admin komprehensif.

---

## ✨ Fitur Utama

### 🌟 Sisi Pelanggan (Public Website)
- **Desain Mewah "Barberia Luxe"**: Desain bertema gelap (obsidian `#0b0c10`) dengan aksen emas hangat (`#d4af37`), tipografi premium (*Playfair Display* & *Plus Jakarta Sans*), dan animasi mikro responsif.
- **Hero Carousel Interaktif**: Banner promosi mewah dengan navigasi visual dan tombol CTA langsung.
- **Katalog Layanan & Harga Rupiah**: Daftar menu lengkap mulai dari *Gentleman Classic Haircut*, *Fade & Texture*, *Hot Towel Shave*, hingga *Facial Grooming*.
- **Galeri Portofolio Potongan Rambut**: Galeri showcase model rambut terkini.
- **Profil Master Barber**: Informasi staf barber berpengalaman beserta keahlian masing-masing.
- **Sistem Booking Wizard 4-Langkah**:
  1. **Langkah 1**: Pemilihan layanan barbershop (multi-select).
  2. **Langkah 2**: Pemilihan barber favorit.
  3. **Langkah 3**: Kalender jadwal interaktif 10 hari ke depan dengan slot waktu per 30 menit.
  4. **Langkah 4**: Pengisian data diri pelanggan dengan validasi nomor HP format Indonesia.
- **Formulir Kontak AJAX**: Kirim pesan langsung tanpa reload halaman.

### 🛡️ Sisi Pengelola (Admin Dashboard Portal)
- **Portal Masuk Terisolasi**: Halaman login admin modern dengan enkripsi SHA-1.
- **Statistik & Metrik Real-time**: Ringkasan jumlah pelanggan, total menu layanan, staf barber aktif, dan total transaksi reservasi.
- **Manajemen Jadwal Booking**:
  - *Jadwal Mendatang*: Pantau janji temu aktif.
  - *Riwayat Reservasi*: Seluruh catatan pemesanan pelanggan.
  - *Pembatalan Janji*: Modal pembatalan dengan pencatatan alasan resmi.
- **Manajemen Katalog Layanan**: CRUD kategori layanan dan menu servis lengkap dengan estimasi durasi dan harga.
- **Manajemen Staf & Jadwal Kerja**: Atur profil barber serta jam operasional kerja mingguan (Senin–Minggu).
- **Direktori Pelanggan**: Database kontak pelanggan yang pernah melakukan reservasi.

---

## 🛠️ Teknologi yang Digunakan

- **Backend**: PHP 8.x (Native dengan PDO MySQL prepared statements)
- **Database**: MySQL 5.7+ / MariaDB 10.4+
- **Frontend**: HTML5, CSS3 kustom (`luxury-barber.css`), Bootstrap 4
- **Interaktivitas**: JavaScript (ES6+), jQuery, SweetAlert, AJAX
- **Kontainerisasi & Cloud**: Dockerfile siap pakai untuk cloud deployment (Railway, Render, VPS)

---

## 🚀 Panduan Menjalankan Secara Lokal

### Prasyarat
- PHP 8.0 atau lebih baru (dengan ekstensi `pdo_mysql`)
- MySQL / MariaDB Server

### 1. Clone Repositori
```bash
git clone https://github.com/username/barberia-luxe.git
cd barberia-luxe
```

### 2. Import Database
1. Buka database management tool Anda (phpMyAdmin, DBeaver, HeidiSQL, atau Terminal MySQL).
2. Buat database baru bernama `barbershop`:
   ```sql
   CREATE DATABASE barbershop;
   ```
3. Import file `barbershop_db.sql` ke dalam database `barbershop`.

### 3. Konfigurasi Database
Sesuaikan file `connect.php` dan `barber-admin/connect.php` dengan kredensial database lokal Anda (atau atur via Environment Variable):
```php
$db_host = getenv('DB_HOST') ?: '127.0.0.1';
$db_port = getenv('DB_PORT') ?: '3306';
$db_name = getenv('DB_NAME') ?: 'barbershop';
$user    = getenv('DB_USER') ?: 'root';
$pass    = getenv('DB_PASS') ?: '';
```

### 4. Jalankan Web Server
Gunakan server bawaan PHP:
```bash
php -S 127.0.0.1:8000
```
Buka browser dan akses:
- **Website Utama:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Formulir Booking:** [http://127.0.0.1:8000/appointment.php](http://127.0.0.1:8000/appointment.php)
- **Portal Admin:** [http://127.0.0.1:8000/barber-admin/login.php](http://127.0.0.1:8000/barber-admin/login.php)

---

## 🔑 Kredensial Login Admin Default

| Field | Nilai |
| :--- | :--- |
| **URL Portal** | `/barber-admin/login.php` |
| **Username** | `admin` |
| **Password** | `admin123` |

---

## ☁️ Panduan Deploy ke Cloud (Railway / Render / cPanel)

Project ini sudah dilengkapi **Dockerfile production** dan pendeteksi environment variable otomatis.

### Cara 1: Deploy ke Railway (Direkomendasikan)
1. Push project ini ke repository GitHub Anda.
2. Buka [Railway.app](https://railway.app), klik **+ New Project** $\rightarrow$ **Provision MySQL**.
3. Klik **+ New** $\rightarrow$ **GitHub Repo** $\rightarrow$ Hubungkan ke repo project ini.
4. Railway akan otomatis mendeteksi `Dockerfile` dan menginjeksi kredensial database `MYSQLHOST`, `MYSQLUSER`, dll.
5. Import `barbershop_db.sql` ke database MySQL Railway Anda.
6. Generate domain di menu **Settings** $\rightarrow$ Website langsung aktif dengan HTTPS!

### Cara 2: Web Hosting cPanel
1. Compress seluruh file ke file `.zip`.
2. Upload dan ekstrak di folder `public_html` cPanel Anda.
3. Buat database baru di **MySQL Databases** cPanel dan import `barbershop_db.sql` via **phpMyAdmin**.
4. Sesuaikan nama database, user, dan password pada file `connect.php` dan `barber-admin/connect.php`.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi MIT. Lihat file `LICENSE` untuk informasi lebih lanjut.
