"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { INITIAL_SERVICES, INITIAL_BARBERS, INITIAL_CATEGORIES, formatRupiah } from "@/lib/data";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [contactStatus, setContactStatus] = useState<{ loading: boolean; success: boolean; message: string }>({
    loading: false,
    success: false,
    message: "",
  });

  const filteredServices = selectedCategory
    ? INITIAL_SERVICES.filter((s) => s.category_id === selectedCategory)
    : INITIAL_SERVICES;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus({ loading: true, success: false, message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        setContactStatus({ loading: false, success: true, message: data.message });
        setContactForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setContactStatus({ loading: false, success: false, message: data.error || "Gagal mengirim pesan." });
      }
    } catch {
      setContactStatus({ loading: false, success: false, message: "Terjadi kesalahan jaringan." });
    }
  };

  const galleryItems = [
    { src: "/images/portfolio-1.jpg", title: "Executive Pompadour", category: "Classic Haircut" },
    { src: "/images/portfolio-2.jpg", title: "Modern Skin Fade", category: "Fade & Taper" },
    { src: "/images/portfolio-3.jpg", title: "Textured Crop Fade", category: "Contemporary" },
    { src: "/images/portfolio-4.jpg", title: "Royal Hot Towel Shave", category: "Shaving & Beard" },
    { src: "/images/portfolio-5.jpg", title: "Gentleman Side Part", category: "Formal Classic" },
    { src: "/images/portfolio-6.jpg", title: "Beard Sculpt & Line-up", category: "Beard Styling" },
    { src: "/images/portfolio-7.jpg", title: "French Crop Taper", category: "Modern Cut" },
    { src: "/images/portfolio-8.jpg", title: "Charcoal Detox Facial", category: "Grooming Spa" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f8f9fa]">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#d4af37]/20">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/85 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-transparent z-10" />
          <div
            className="w-full h-full bg-cover bg-center filter brightness-40 scale-105 transition-transform duration-1000"
            style={{ backgroundImage: "url('/images/barbershop_image_1.jpg')" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-4 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#141721]/90 border border-[#d4af37]/40 shadow-lg shadow-[#d4af37]/10 mb-8 backdrop-blur-sm animate-pulse">
            <span className="text-sm">👑</span>
            <span className="text-xs uppercase tracking-widest text-[#fce8a6] font-bold">
              Barbershop Premium & Gentleman Grooming Jakarta
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-serif mb-6 leading-tight">
            Seni Cukur Mahakarya untuk{" "}
            <span className="gold-gradient-text block mt-2">Pria Berkelas</span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-10">
            Perpaduan presisi gunting master barber berpengalaman, tradisi cukur royal hot towel, dan relaksasi spa maskulin di atmosfer eksklusif Jakarta Selatan.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-[#0b0c10] bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] hover:scale-105 shadow-xl shadow-[#d4af37]/25 transition-all duration-300"
            >
              <span>Pesan Jadwal Sekarang</span>
              <span className="ml-2 font-bold text-lg">→</span>
            </Link>
            <Link
              href="#layanan"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-[#141721] border border-[#d4af37]/40 hover:border-[#d4af37] hover:bg-[#191d2b] transition-all duration-300"
            >
              Lihat Menu Layanan
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/10 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-serif">15+</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider">Tahun Pengalaman</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-serif">12.500+</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider">Pelanggan Puas</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-serif">4.9 / 5.0</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider">Bintang Kepuasan</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-serif">100%</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider">Higienis & Bergaransi</p>
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG KAMI (ABOUT US) */}
      <section id="tentang" className="py-24 bg-[#0e1017] border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Collage */}
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-[#d4af37]/30 shadow-2xl">
                <img
                  src="/images/about-1.jpg"
                  alt="Barberia Luxe Interior"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="hidden sm:block absolute -bottom-8 -right-6 z-20 w-64 h-52 rounded-xl overflow-hidden border-2 border-[#d4af37] shadow-2xl">
                <img
                  src="/images/about-2.jpg"
                  alt="Master Barber in Action"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 z-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl" />
            </div>

            {/* Content Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                <span>✦</span>
                <span>Standar Baru Perawatan Pria</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight">
                Tradisi Cukur Legendaris, <br />
                <span className="gold-gradient-text">Kenyamanan Kelas Dunia</span>
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                Sejak pertama kali dibuka, <strong>Barberia Luxe</strong> mengusung visi sederhana namun berani: memberikan pengalaman grooming yang bukan sekadar potong rambut, melainkan sebuah ritual relaksasi maskulin yang meningkatkan rasa percaya diri setiap pria.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                Setiap kunjungan dijamin dengan standar kebersihan tertinggi menggunakan UV Sterilizer medis, pisau cukur steril sekali pakai, dan produk perawatan rambut serta brewok grade dunia.
              </p>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#141721] border border-[#d4af37]/20 flex items-start space-x-3">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">Sterilisasi Standar Medis</h4>
                    <p className="text-gray-400 text-xs mt-1">Pisau cukur baru sekali pakai & sterilisasi UV setiap alat.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#141721] border border-[#d4af37]/20 flex items-start space-x-3">
                  <span className="text-2xl">✂️</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">Master Stylist Berlisensi</h4>
                    <p className="text-gray-400 text-xs mt-1">Barber tersertifikasi internasional dengan jam terbang tinggi.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#141721] border border-[#d4af37]/20 flex items-start space-x-3">
                  <span className="text-2xl">☕</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">Lounge & Complimentary Coffee</h4>
                    <p className="text-gray-400 text-xs mt-1">Nikmati racikan espresso premium dan kursi hidrolik kulit asli.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#141721] border border-[#d4af37]/20 flex items-start space-x-3">
                  <span className="text-2xl">🧴</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">Produk Perawatan Mewah</h4>
                    <p className="text-gray-400 text-xs mt-1">Pomade organik, hair tonic, dan serum brewok kualitas terbaik.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU LAYANAN (SERVICES) */}
      <section id="layanan" className="py-24 bg-[#0b0c10] border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
              ✦ Kategori & Menu Layanan ✦
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2 mb-4">
              Pilihan Perawatan <span className="gold-gradient-text">Eksklusif</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Pilih layanan sesuai kebutuhan Anda. Seluruh layanan sudah termasuk keramas bersih, pijatan relaksasi kepala, dan styling pomade.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === null
                    ? "bg-[#d4af37] text-[#0b0c10] shadow-md shadow-[#d4af37]/20"
                    : "bg-[#141721] text-gray-300 hover:text-white border border-[#2a2e3d]"
                }`}
              >
                Semua Layanan
              </button>
              {INITIAL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                    selectedCategory === cat.id
                      ? "bg-[#d4af37] text-[#0b0c10] shadow-md shadow-[#d4af37]/20"
                      : "bg-[#141721] text-gray-300 hover:text-white border border-[#2a2e3d]"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="card-luxury rounded-2xl p-6 flex flex-col justify-between relative group"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#d4af37] to-[#aa8014] text-[#0b0c10] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow">
                    Favorit
                  </div>
                )}
                <div>
                  <div className="text-xs text-[#d4af37] font-semibold flex items-center space-x-1 mb-2">
                    <span>⏱</span>
                    <span>{service.duration_min} Menit</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#d4af37] transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block">Biaya</span>
                    <span className="text-lg font-extrabold text-[#fce8a6] font-serif">
                      {formatRupiah(service.price)}
                    </span>
                  </div>
                  <Link
                    href={`/booking?service=${service.id}`}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold text-[#0b0c10] bg-[#d4af37] hover:bg-white transition-colors"
                  >
                    Pesan →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/booking"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-sm shadow-xl shadow-[#d4af37]/20 hover:scale-105 transition-all"
            >
              <span>Mulai Booking Reservasi Online</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* GALERI GAYA RAMBUT (HAIRCUT GALLERY) */}
      <section id="galeri" className="py-24 bg-[#0e1017] border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
              ✦ Portofolio & Inspirasi Gaya ✦
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2 mb-4">
              Galeri Mahakarya <span className="gold-gradient-text">Barberia Luxe</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Setiap goresan gunting dan pisau cukur adalah karya seni yang disesuaikan secara khusus dengan bentuk wajah dan karakter pria modern.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden border border-[#d4af37]/20 aspect-square shadow-lg bg-[#141721]"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-[10px] text-[#d4af37] uppercase font-bold tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-white text-sm font-bold">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASTER BARBER KAMI */}
      <section id="barber" className="py-24 bg-[#0b0c10] border-b border-[#d4af37]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
              ✦ Tim Profesional ✦
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif mt-2 mb-4">
              Pakar & <span className="gold-gradient-text">Master Barber</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Dipandu oleh barber berdedikasi tinggi dengan pengalaman bertahun-tahun di industri tata rambut pria internasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INITIAL_BARBERS.map((barber) => (
              <div
                key={barber.id}
                className="card-luxury rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141721] via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-[#0b0c10]/85 border border-[#d4af37]/40 px-2.5 py-1 rounded-full text-xs font-bold text-[#fce8a6] flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{barber.rating}</span>
                    <span className="text-gray-400 text-[10px]">({barber.reviews_count})</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs text-[#d4af37] font-semibold uppercase tracking-wider">
                      {barber.role} • {barber.experience}
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">{barber.name}</h3>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">{barber.bio}</p>

                  <div className="pt-2">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold block mb-2">
                      Keahlian Khusus:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {barber.specialties.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#1c202e] border border-gray-700 text-gray-300"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <Link
                      href={`/booking?barber=${barber.id}`}
                      className="w-full inline-flex items-center justify-center py-2.5 rounded-lg text-xs font-bold text-[#0b0c10] bg-[#d4af37] hover:bg-white transition-colors"
                    >
                      Pesan Bersama {barber.name.split(" ")[0]} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAFTAR HARGA TRANSPARAN */}
      <section id="harga" className="py-24 bg-[#0e1017] border-b border-[#d4af37]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
              ✦ Biaya Transparan ✦
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif mt-2 mb-4">
              Harga Jujur Tanpa <span className="gold-gradient-text">Biaya Tersembunyi</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Semua paket sudah termasuk konsultasi gaya, cuci rambut air hangat, massage relaksasi, dan minuman penyegar.
            </p>
          </div>

          <div className="bg-[#141721] rounded-2xl border border-[#d4af37]/25 overflow-hidden shadow-2xl">
            <div className="divide-y divide-gray-800">
              {INITIAL_SERVICES.map((s) => (
                <div
                  key={s.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#191d2b] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-base font-bold text-white">{s.name}</h4>
                      {s.popular && (
                        <span className="text-[10px] bg-[#d4af37]/20 text-[#fce8a6] border border-[#d4af37]/40 px-2 py-0.5 rounded-full font-bold uppercase">
                          Favorit
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 max-w-xl">{s.description}</p>
                    <span className="text-[11px] text-[#d4af37] inline-block pt-1">
                      Estimasi durasi: {s.duration_min} Menit
                    </span>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end sm:space-x-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-800">
                    <span className="text-lg font-bold text-[#fce8a6] font-serif">
                      {formatRupiah(s.price)}
                    </span>
                    <Link
                      href={`/booking?service=${s.id}`}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-[#0b0c10] bg-[#d4af37] hover:bg-white transition-colors"
                    >
                      Pilih
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FORMULIR KONTAK & LOKASI */}
      <section id="kontak" className="py-24 bg-[#0b0c10]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info Lokasi & Jam */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                ✦ Hubungi & Temukan Kami ✦
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">
                Kunjungi Salon & Studio Kami di <br />
                <span className="gold-gradient-text">Senopati, Jakarta Selatan</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ada pertanyaan khusus, reservasi rombongan pria (groomsmen package), atau permintaan jadwal di luar jam normal? Jangan ragu untuk mengirim pesan kepada kami.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#141721] border border-gray-800">
                  <span className="text-2xl text-[#d4af37]">📍</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">Alamat Studio</h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Jl. Senopati Raya No. 88, Selong, Kebayoran Baru, Jakarta Selatan 12190
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#141721] border border-gray-800">
                  <span className="text-2xl text-[#d4af37]">🕒</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">Jam Buka & Layanan</h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      Senin - Minggu: 09:00 - 21:00 WIB (Layanan terakhir 20:15 WIB)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-xl bg-[#141721] border border-gray-800">
                  <span className="text-2xl text-[#d4af37]">💬</span>
                  <div>
                    <h4 className="text-white font-bold text-sm">Customer Care WhatsApp</h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      +62 812-3456-7890 (Respon cepat 08:00 - 22:00 WIB)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="bg-[#141721] rounded-2xl p-6 sm:p-8 border border-[#d4af37]/25 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2 font-serif">Kirim Pesan Langsung</h3>
              <p className="text-xs text-gray-400 mb-6">
                Silakan isi data diri Anda di bawah. Tim kami akan menghubungi kembali dalam 15 menit.
              </p>

              {contactStatus.message && (
                <div
                  className={`p-4 rounded-xl text-xs mb-6 ${
                    contactStatus.success
                      ? "bg-green-950/80 border border-green-500/50 text-green-200"
                      : "bg-red-950/80 border border-red-500/50 text-red-200"
                  }`}
                >
                  {contactStatus.message}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Contoh: Raditya Danu"
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                      No. WhatsApp / HP
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="08123456789"
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Pesan atau Pertanyaan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tuliskan pertanyaan atau kebutuhan perawatan khusus Anda..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactStatus.loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {contactStatus.loading ? "Mengirim Pesan..." : "Kirimkan Pesan Sekarang →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
