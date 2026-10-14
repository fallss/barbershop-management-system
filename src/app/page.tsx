"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_CATEGORIES, INITIAL_SERVICES, INITIAL_BARBERS, formatRupiah } from "@/lib/data";

export default function HomePage() {
  // Hero Carousel State
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [
    {
      img: "/Design/images/barbershop_image_1.jpg",
      badge: "Barbershop Premium & Grooming Pria",
      badgeIcon: "fas fa-crown",
      title: "Bukan Sekadar Cukur Rambut, Ini Pengalaman Eksklusif.",
      desc: "Barbershop mewah khusus pria modern yang mengutamakan presisi potongan, kenyamanan lounge berkelas, dan rasa percaya diri maksimal.",
      btn1Text: "Pesan Jadwal Sekarang",
      btn1Link: "/booking",
      btn2Text: "Lihat Menu & Harga",
      btn2Link: "#pricing",
      btn2Icon: "fas fa-list-ul",
    },
    {
      img: "/Design/images/barbershop_image_2.jpg",
      badge: "Master Barber Tersertifikasi Internasional",
      badgeIcon: "fas fa-award",
      title: "Teknik Potong Presisi & Cukur Tradisional Mewah.",
      desc: "Sentuhan tangan ahli barber berpengalaman 10+ tahun dengan teknik gradasi skin fade halus, beard line simetris, dan terapi handuk hangat aromaterapi.",
      btn1Text: "Booking Online Cepat",
      btn1Link: "/booking",
      btn2Text: "Kenali Tim Barber",
      btn2Link: "#team",
      btn2Icon: "fas fa-user-friends",
    },
    {
      img: "/Design/images/barbershop_image_3.jpg",
      badge: "Gentlemen's Lounge & Relaksasi Penuh",
      badgeIcon: "fas fa-gem",
      title: "Atmosfer Vintage Mewah, Kopi Spesialti & Pelayanan VIP.",
      desc: "Nikmati kursi barber ergonomis berlapis kulit premium, facial detox charcoal, dan produk pomade serta hair tonic impor kualitas terbaik dunia.",
      btn1Text: "Reservasi Kursi Anda",
      btn1Link: "/booking",
      btn2Text: "Konsultasi Gaya",
      btn2Link: "#services",
      btn2Icon: "fas fa-cut",
    },
  ];

  // Auto advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Service Category Filter State
  const [activeCategory, setActiveCategory] = useState<number>(0); // 0 = Semua

  // Filtered Services for Highlight
  const filteredServices = activeCategory === 0
    ? INITIAL_SERVICES
    : INITIAL_SERVICES.filter((s) => s.category_id === activeCategory);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Review Carousel State
  const [reviewSlide, setReviewSlide] = useState(0);
  const reviewSlides = [
    {
      quote:
        "\"Pelayanan di Barberia Luxe benar-benar kasta tertinggi! Potongan rambut sangat rapi dan presisi, pijatan kepala dan lehernya bikin rileks seketika setelah lelah bekerja seharian. Sistem booking online-nya sangat praktis tanpa perlu antre berjam-jam.\"",
      author: "Andi Firmansyah",
      role: "Pengusaha & Pelanggan Setia",
      rating: 5,
    },
    {
      quote:
        "\"Fade cut paling halus dan mulus yang pernah saya rasakan di Jakarta. Barber Budi sangat mengerti karakteristik bentuk wajah saya dan merekomendasikan gaya yang sangat cocok. Ruang tunggu sangat berkelas dengan sajian kopi single origin gratis.\"",
      author: "Reza Pratama",
      role: "Kreator Konten & Desainer Grafis",
      rating: 5,
    },
    {
      quote:
        "\"Paket The Executive Luxury Package sangat saya rekomendasikan untuk para pria yang menghargai kualitas! Cukur handuk hangat aromaterapinya juara dan masker charcoal bikin kulit segar bersih. Pasti jadi langganan tetap rutin setiap 3 minggu.\"",
      author: "Bayu Wicaksono",
      role: "Eksekutif Perusahaan Multinasional",
      rating: 5,
    },
  ];

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactAlert, setContactAlert] = useState<{ success: boolean; text: string } | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactAlert(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        setContactAlert({ success: true, text: data.message });
        setContactForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setContactAlert({ success: false, text: data.error || "Gagal mengirim pesan." });
      }
    } catch {
      setContactAlert({ success: false, text: "Terjadi kesalahan jaringan." });
    } finally {
      setContactLoading(false);
    }
  };

  const galleryItems = [
    { src: "/Design/images/portfolio-1.jpg", title: "Classic Pompadour", tag: "Classic Style" },
    { src: "/Design/images/portfolio-2.jpg", title: "Skin Fade Undercut", tag: "Modern Fade" },
    { src: "/Design/images/portfolio-3.jpg", title: "Beard Sculpting & Trim", tag: "Beard Grooming" },
    { src: "/Design/images/portfolio-4.jpg", title: "Textured French Crop", tag: "Urban Style" },
    { src: "/Design/images/portfolio-5.jpg", title: "Side Part Gentleman", tag: "Executive" },
    { src: "/Design/images/portfolio-6.jpg", title: "Modern Taper Fade", tag: "Precision" },
    { src: "/Design/images/portfolio-7.jpg", title: "Sharp Clean Razor Edge", tag: "Shave Line" },
    { src: "/Design/images/portfolio-8.jpg", title: "Slick Back Executive", tag: "Signature" },
  ];

  const faqs = [
    {
      q: "Apakah saya harus booking online terlebih dahulu sebelum datang?",
      a: "Sangat disarankan! Dengan melakukan booking online di website kami, Anda mendapatkan jaminan kursi dan waktu barber tanpa perlu mengantre lama. Namun kami juga menerima pelanggan walk-in selama ada slot yang kosong.",
    },
    {
      q: "Metode pembayaran apa saja yang diterima di Barberia Luxe?",
      a: "Kami menerima berbagai metode pembayaran modern: QRIS (GoPay, OVO, ShopeePay, Dana, BCA Mobile), Transfer Bank, Kartu Debit/Kredit, serta Tunai (Cash).",
    },
    {
      q: "Bagaimana jika saya berhalangan hadir atau ingin mengubah jam reservasi?",
      a: "Anda cukup menghubungi admin kami melalui WhatsApp di +62 812-3456-7890 dengan menyebutkan kode booking Anda minimal 1 jam sebelum jadwal yang telah dipilih.",
    },
    {
      q: "Apakah Barberia Luxe melayani potongan rambut untuk anak-anak?",
      a: "Ya! Kami memiliki layanan khusus 'Junior Haircut' untuk anak dan remaja dengan barber yang sabar dan pendekatan ramah agar anak merasa nyaman selama proses potong rambut.",
    },
    {
      q: "Apakah semua peralatan potong dan cukur higienis & steril?",
      a: "100% Steril. Setiap gunting, clipper, dan sisir disterilisasi menggunakan kotak UV-C medis berstandar sanitasi tinggi setelah setiap pemakaian, dan silet cukur diganti baru untuk setiap pelanggan.",
    },
  ];

  return (
    <>
      {/* HOME HERO SECTION */}
      <section className="home-section" id="home-section">
        <div className="home-section-content">
          <div id="home-section-carousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              {heroSlides.map((_, idx) => (
                <li
                  key={idx}
                  className={heroSlide === idx ? "active" : ""}
                  onClick={() => setHeroSlide(idx)}
                  style={{ cursor: "pointer" }}
                ></li>
              ))}
            </ol>
            <div className="carousel-inner">
              {heroSlides.map((slide, idx) => (
                <div key={idx} className={`carousel-item ${heroSlide === idx ? "active" : ""}`}>
                  <img className="d-block w-100" src={slide.img} alt={slide.title} />
                  <div className="carousel-caption d-md-block text-center">
                    <div className="hero-badge">
                      <i className={slide.badgeIcon}></i> {slide.badge}
                    </div>
                    <h3>{slide.title}</h3>
                    <p>{slide.desc}</p>
                    <div className="hero-cta-group">
                      <Link href={slide.btn1Link} className="btn-hero-primary">
                        <i className="far fa-calendar-check mr-2"></i> {slide.btn1Text}
                      </Link>
                      <a href={slide.btn2Link} className="btn-hero-secondary">
                        <i className={`${slide.btn2Icon} mr-2`}></i> {slide.btn2Text}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PREVIOUS & NEXT */}
            <a
              className="carousel-control-prev"
              style={{ cursor: "pointer" }}
              onClick={() => setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              role="button"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Sebelumnya</span>
            </a>
            <a
              className="carousel-control-next"
              style={{ cursor: "pointer" }}
              onClick={() => setHeroSlide((prev) => (prev + 1) % heroSlides.length)}
              role="button"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Berikutnya</span>
            </a>
          </div>
        </div>
      </section>

      {/* QUICK STATUS BAR */}
      <div
        style={{
          background: "linear-gradient(90deg, #131722 0%, #1e2638 50%, #131722 100%)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
          padding: "10px 0",
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 text-center text-md-left">
            <div className="d-flex align-items-center justify-content-center gap-2">
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px #10b981",
                }}
              ></span>
              <span style={{ fontSize: "13px", color: "#cbd5e1" }}>
                <strong>Buka Hari Ini:</strong> 09:00 - 21:00 WIB • Jl. Senopati No. 88, Jakarta Selatan
              </span>
            </div>
            <div className="d-none d-md-flex align-items-center gap-3">
              <span style={{ fontSize: "12px", color: "var(--primary-gold)" }}>
                <i className="fas fa-coffee mr-1"></i> Free Specialty Espresso Lounge
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                <i className="fas fa-shield-alt mr-1"></i> Sterilisasi Medis UV-C 100%
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
              <Link href="/booking" style={{ color: "var(--primary-gold)", fontWeight: 700, fontSize: "12px" }}>
                Slot Terbatas! Booking Sekarang →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* STATS RIBBON SECTION */}
      <section className="stats-ribbon">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Tahun Pengalaman</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">25K+</span>
                <span className="stat-label">Pelanggan Puas</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Barber Bersertifikat</span>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-item">
                <span className="stat-number">4.9 ★</span>
                <span className="stat-label">Rating Kepuasan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about_section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about_content">
                <h3>Mengenal Barberia Luxe</h3>
                <h2>Tradisi Cukur Klasik & Gaya Modern Pria Sejati Sejak 1991</h2>
                <p>
                  Barberia Luxe lahir dari apresiasi mendalam terhadap seni pangkas rambut pria sejati. Kami memadukan estetika warisan klasik Eropa dengan teknik potongan kontemporer untuk menghasilkan penampilan berkarakter, rapi, dan memancarkan wibawa terbaik Anda.
                </p>

                <div className="about-features">
                  <div className="about-feature-box">
                    <i className="fas fa-cut"></i>
                    <span>Gunting Presisi & Silet Tajam Higienis</span>
                  </div>
                  <div className="about-feature-box">
                    <i className="fas fa-pump-soap"></i>
                    <span>Peralatan Steril Medis UV-C 100%</span>
                  </div>
                  <div className="about-feature-box">
                    <i className="fas fa-hot-tub"></i>
                    <span>Handuk Hangat Aromaterapi Eucalyptus</span>
                  </div>
                  <div className="about-feature-box">
                    <i className="fas fa-coffee"></i>
                    <span>Gentlemen Lounge & Welcome Drink</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
                  <Link href="/booking" className="default_btn">
                    <i className="far fa-calendar-alt mr-2"></i> Booking Jadwal Anda
                  </Link>
                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Barberia%20Luxe,%20saya%20ingin%20konsultasi%20model%20rambut"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-secondary"
                    style={{
                      borderRadius: "8px",
                      padding: "13px 24px",
                      color: "#cbd5e1",
                      borderColor: "rgba(255,255,255,0.2)",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    <i className="fab fa-whatsapp mr-2 text-success"></i> Konsultasi Gaya Rambut
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="about_img" style={{ overflow: "hidden", borderRadius: "16px", border: "1px solid rgba(212,175,55,0.3)" }}>
                <img className="about_img_1 w-100" src="/Design/images/about-1.jpg" alt="Atmosfer Mewah Barbershop" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / SIGNATURE EXPERIENCE SECTION */}
      <section
        style={{
          background: "linear-gradient(180deg, #0d0f13 0%, #121620 50%, #0d0f13 100%)",
          padding: "90px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="container">
          <div className="section_heading text-center">
            <h3>Standar Keunggulan Eksekutif</h3>
            <h2>Pengalaman Signature Barberia Luxe</h2>
            <div className="heading-line mx-auto"></div>
            <p className="text-muted mt-3" style={{ maxWidth: "680px", margin: "0 auto" }}>
              Enam pilar komitmen kami untuk memastikan setiap kunjungan Anda menjadi momen relaksasi mewah dan hasil potongan terbaik.
            </p>
          </div>

          <div className="row mt-5">
            {[
              {
                icon: "fas fa-award",
                title: "Master Barber Tersertifikasi",
                desc: "Tim pemotong profesional dengan sertifikasi internasional dan jam terbang lebih dari 10 tahun di industri grooming pria.",
              },
              {
                icon: "fas fa-coffee",
                title: "Gentlemen Lounge & Espresso Bar",
                desc: "Nikmati racikan kopi single origin dan minuman dingin gratis sembari menikmati lounge ber-AC dingin dengan alunan musik santai.",
              },
              {
                icon: "fas fa-spa",
                title: "Ritual Handuk Hangat Aromaterapi",
                desc: "Pori-pori dibuka dengan handuk hangat beraroma eucalyptus herbal untuk melunakkan jenggot dan merilekskan otot leher.",
              },
              {
                icon: "fas fa-pump-soap",
                title: "Produk Grooming Dunia",
                desc: "Hanya menggunakan pomade water/oil based, hair tonic ginseng, dan beard oil organik impor terpercaya yang menyehatkan rambut.",
              },
              {
                icon: "fas fa-shield-virus",
                title: "Higienitas & Steril Medis 100%",
                desc: "Setiap alat gunting dan razor dibersihkan dengan box radiasi UV-C serta pisau cukur satu mata diganti baru tiap pelanggan.",
              },
              {
                icon: "fas fa-calendar-check",
                title: "Booking Online Instan & Bebas Antre",
                desc: "Pilih layanan, tentukan barber favorit, dan amankan jam kunjungan Anda dalam beberapa klik tanpa perlu menunggu antrean.",
              },
            ].map((exp, idx) => (
              <div key={idx} className="col-lg-4 col-md-6 mb-4">
                <div
                  className="p-4 h-100"
                  style={{
                    background: "rgba(20, 24, 34, 0.75)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 100%)",
                      border: "1px solid rgba(212,175,55,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--primary-gold)",
                      fontSize: "22px",
                      marginBottom: "18px",
                    }}
                  >
                    <i className={exp.icon}></i>
                  </div>
                  <h4 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
                    {exp.title}
                  </h4>
                  <p style={{ color: "#94a3b8", fontSize: "13.5px", lineHeight: "1.6", margin: 0 }}>
                    {exp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES HIGHLIGHT SECTION WITH INTERACTIVE CATEGORIES */}
      <section className="services_section" id="services">
        <div className="container">
          <div className="section_heading text-center">
            <h3>Keahlian & Sentuhan Premium</h3>
            <h2>Layanan Unggulan Kami</h2>
            <div className="heading-line mx-auto"></div>
            <p className="text-muted mt-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Pilih kategori di bawah untuk menjelajahi menu perawatan rambut, jenggot, dan relaksasi khusus pria.
            </p>
          </div>

          {/* Dynamic Category Switcher Tabs */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mt-4 mb-5">
            <button
              onClick={() => setActiveCategory(0)}
              className="btn btn-sm"
              style={{
                background: activeCategory === 0 ? "var(--primary-gold)" : "rgba(255,255,255,0.06)",
                color: activeCategory === 0 ? "#0b0c10" : "#cbd5e1",
                fontWeight: 700,
                borderRadius: "30px",
                padding: "8px 20px",
                fontSize: "13px",
                border: activeCategory === 0 ? "1px solid var(--primary-gold)" : "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s",
              }}
            >
              Semua Layanan ({INITIAL_SERVICES.length})
            </button>
            {INITIAL_CATEGORIES.map((cat) => {
              const count = INITIAL_SERVICES.filter((s) => s.category_id === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="btn btn-sm"
                  style={{
                    background: isActive ? "var(--primary-gold)" : "rgba(255,255,255,0.06)",
                    color: isActive ? "#0b0c10" : "#cbd5e1",
                    fontWeight: 700,
                    borderRadius: "30px",
                    padding: "8px 20px",
                    fontSize: "13px",
                    border: isActive ? "1px solid var(--primary-gold)" : "1px solid rgba(255,255,255,0.1)",
                    transition: "all 0.2s",
                  }}
                >
                  {cat.icon} {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Service Cards Grid */}
          <div className="row">
            {filteredServices.map((service) => {
              const category = INITIAL_CATEGORIES.find((c) => c.id === service.category_id);
              return (
                <div key={service.id} className="col-lg-4 col-md-6 mb-4">
                  <div
                    className="service_box h-100 d-flex flex-column justify-content-between text-left p-4"
                    style={{
                      background: "#131722",
                      border: service.popular ? "1px solid rgba(212,175,55,0.5)" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {service.popular && (
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "rgba(212,175,55,0.15)",
                          color: "var(--primary-gold)",
                          border: "1px solid rgba(212,175,55,0.4)",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        ⭐ Terfavorit
                      </div>
                    )}

                    <div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="badge badge-secondary" style={{ background: "rgba(255,255,255,0.08)", color: "#94a3b8", fontSize: "11px" }}>
                          {category ? category.name : "Grooming"}
                        </span>
                        <span style={{ fontSize: "11.5px", color: "#64748b" }}>
                          <i className="far fa-clock mr-1"></i> {service.duration_min} Menit
                        </span>
                      </div>

                      <h3 style={{ fontSize: "18px", color: "#fff", fontWeight: 700, marginBottom: "8px" }}>
                        {service.name}
                      </h3>
                      <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.5", marginBottom: "16px" }}>
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-3 border-top border-dark d-flex justify-content-between align-items-center">
                      <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--primary-gold)" }}>
                        {formatRupiah(service.price)}
                      </span>
                      <Link
                        href={`/booking?service=${service.id}`}
                        className="btn btn-sm"
                        style={{
                          background: "var(--primary-gold)",
                          color: "#0b0c10",
                          fontWeight: 700,
                          fontSize: "12px",
                          borderRadius: "8px",
                          padding: "6px 14px",
                        }}
                      >
                        Booking Ini →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <Link href="/booking" className="default_btn">
              <i className="far fa-calendar-check mr-2"></i> Buat Janji Temu Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* BOOKING CTA BANNER */}
      <section className="book_section" id="booking">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="booking-cta-card">
                <h2>Reservasi Kursi Anda Tanpa Perlu Mengantre</h2>
                <p>
                  Pilih layanan yang Anda kehendaki, tentukan barber favorit, dan amankan slot waktu terbaik Anda secara instan dalam hitungan detik.
                </p>
                <Link href="/booking" className="btn-hero-primary" style={{ fontSize: "16px", padding: "15px 36px" }}>
                  <i className="far fa-calendar-check mr-2"></i> Mulai Pesan Jadwal Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY / PORTFOLIO SECTION */}
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="section_heading text-center">
            <h3>Koleksi Gaya & Portofolio</h3>
            <h2>Galeri Kreasi Barbershop</h2>
            <div className="heading-line mx-auto"></div>
            <p className="text-muted mt-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Inspirasi model rambut klasik dan kontemporer hasil karya master barber Barberia Luxe.
            </p>
          </div>
          <div className="row mt-4">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 gallery-column mb-4">
                <div className="gallery-item-wrap" style={{ borderRadius: "12px", overflow: "hidden" }}>
                  <div className="gallery-img" style={{ backgroundImage: `url('${item.src}')` }}></div>
                  <div className="gallery-item-overlay">
                    <span className="badge badge-warning mb-1" style={{ fontSize: "10px", background: "var(--primary-gold)", color: "#0b0c10" }}>
                      {item.tag}
                    </span>
                    <span className="gallery-item-title">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION (PROFESSIONAL BARBERS) */}
      <section id="team" className="team_section">
        <div className="container">
          <div className="section_heading text-center">
            <h3>Para Ahli Berpengalaman</h3>
            <h2>Master Barber Profesional Kami</h2>
            <div className="heading-line mx-auto"></div>
            <p className="text-muted mt-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Setiap barber kami memiliki dedikasi tinggi, gaya khas tersendiri, dan teknik pangkas presisi yang teruji.
            </p>
          </div>
          <div className="row justify-content-center mt-4">
            {INITIAL_BARBERS.map((barber) => (
              <div key={barber.id} className="col-lg-4 col-md-6 mb-4">
                <div
                  className="team-card h-100 d-flex flex-column justify-content-between p-3"
                  style={{
                    background: "#131722",
                    border: "1px solid rgba(212,175,55,0.25)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                  }}
                >
                  <div>
                    <div
                      className="team-img-wrap"
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "2px solid rgba(212,175,55,0.4)",
                        marginBottom: "16px",
                      }}
                    >
                      <img src={barber.avatar} alt={barber.name} className="w-100" />
                    </div>
                    <div className="team-info text-center">
                      <h4 className="team-name" style={{ fontSize: "20px", color: "#fff", fontWeight: 700, margin: "0 0 4px" }}>
                        {barber.name}
                      </h4>
                      <span className="team-role" style={{ color: "var(--primary-gold)", fontSize: "13px", fontWeight: 600 }}>
                        {barber.role} • {barber.experience}
                      </span>
                      <div className="team-stars my-2" style={{ color: "#fbbf24", fontSize: "13px" }}>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <span className="text-muted ml-2" style={{ fontSize: "11px" }}>({barber.rating} • {barber.reviews_count} ulasan)</span>
                      </div>
                      <p className="text-muted small" style={{ fontSize: "12.5px", lineHeight: "1.5" }}>
                        {barber.bio}
                      </p>
                      <div className="d-flex justify-content-center flex-wrap gap-1 mb-3">
                        {barber.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="badge mr-1"
                            style={{ background: "rgba(255,255,255,0.06)", color: "#cbd5e1", fontSize: "10.5px", border: "1px solid rgba(255,255,255,0.1)" }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-top border-dark text-center">
                    <Link
                      href={`/booking?barber=${barber.id}`}
                      className="btn btn-sm w-100"
                      style={{
                        background: "linear-gradient(135deg, #d4af37 0%, #aa8524 100%)",
                        color: "#0b0c10",
                        fontWeight: 700,
                        fontSize: "13px",
                        borderRadius: "8px",
                        padding: "8px 16px",
                      }}
                    >
                      <i className="far fa-calendar-check mr-2"></i> Booking Bersama {barber.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS / TESTIMONIALS SECTION */}
      <section id="reviews" className="testimonial_section">
        <div className="container">
          <div className="section_heading text-center">
            <h3>Kepuasan Pelanggan</h3>
            <h2>Apa Kata Mereka Tentang Barberia Luxe</h2>
            <div className="heading-line mx-auto"></div>
          </div>

          <div id="reviews-carousel" className="carousel slide mt-4" data-ride="carousel">
            <div className="carousel-inner">
              {reviewSlides.map((rev, idx) => (
                <div key={idx} className={`carousel-item ${reviewSlide === idx ? "active" : ""}`}>
                  <div className="testimonial-card-wrap text-center">
                    <div className="testi-stars mb-3">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <p className="testi-quote">{rev.quote}</p>
                    <h5 className="testi-author">{rev.author}</h5>
                    <span className="testi-role">{rev.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* PREVIOUS & NEXT */}
            <a
              className="carousel-control-prev"
              style={{ cursor: "pointer" }}
              onClick={() => setReviewSlide((prev) => (prev - 1 + reviewSlides.length) % reviewSlides.length)}
              role="button"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Sebelumnya</span>
            </a>
            <a
              className="carousel-control-next"
              style={{ cursor: "pointer" }}
              onClick={() => setReviewSlide((prev) => (prev + 1) % reviewSlides.length)}
              role="button"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Berikutnya</span>
            </a>
          </div>
        </div>
      </section>

      {/* PRICING TABLE SECTION */}
      <section className="pricing_section" id="pricing">
        <div className="container">
          <div className="section_heading text-center">
            <h3>Harga Transparan & Kualitas Mewah</h3>
            <h2>Daftar Harga & Menu Lengkap</h2>
            <div className="heading-line mx-auto"></div>
            <p className="text-muted mt-3" style={{ maxWidth: "600px", margin: "0 auto" }}>
              Seluruh harga sudah termasuk konsultasi bentuk kepala, keramas bersih, dan penataan pomade terbaik.
            </p>
          </div>

          <div className="row mt-4">
            {INITIAL_CATEGORIES.map((category) => {
              const services = INITIAL_SERVICES.filter((s) => s.category_id === category.id);
              if (services.length === 0) return null;
              return (
                <div key={category.id} className="col-lg-6 col-md-12 mb-4">
                  <div className="price_wrap h-100" style={{ background: "#131722", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "28px" }}>
                    <h3 className="d-flex justify-content-between align-items-center mb-3">
                      <span>{category.icon} {category.name}</span>
                      <small style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "normal" }}>
                        {services.length} Layanan
                      </small>
                    </h3>
                    <ul className="price_list">
                      {services.map((service) => (
                        <li key={service.id} className="mb-3 pb-3 border-bottom border-dark">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h4 style={{ fontSize: "16px", color: "#fff", fontWeight: 700, margin: "0 0 4px" }}>
                                {service.name}
                              </h4>
                              <p style={{ color: "#94a3b8", fontSize: "12.5px", margin: "0 0 6px" }}>
                                {service.description}
                              </p>
                              <div className="d-flex align-items-center">
                                <span
                                  className="badge mr-2"
                                  style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", fontSize: "11px", fontWeight: 500 }}
                                >
                                  <i className="far fa-clock mr-1"></i> {service.duration_min} Menit
                                </span>
                                <Link href={`/booking?service=${service.id}`} className="text-warning small font-weight-bold">
                                  Pilih Layanan →
                                </Link>
                              </div>
                            </div>
                            <span className="price" style={{ color: "var(--primary-gold)", fontWeight: 700, fontSize: "16px", whiteSpace: "nowrap" }}>
                              {formatRupiah(service.price)}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-4">
            <Link href="/booking" className="default_btn">
              <i className="far fa-calendar-alt mr-2"></i> Buat Janji Temu Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        style={{
          background: "linear-gradient(180deg, #0d0f13 0%, #11151f 100%)",
          padding: "80px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="container">
          <div className="section_heading text-center">
            <h3>Informasi & Pertanyaan Umum</h3>
            <h2>Frequently Asked Questions (FAQ)</h2>
            <div className="heading-line mx-auto"></div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-lg-8">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="mb-3 rounded"
                    style={{
                      background: "#141822",
                      border: isOpen ? "1px solid var(--primary-gold)" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      overflow: "hidden",
                      transition: "all 0.2s",
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-100 text-left p-3 d-flex justify-content-between align-items-center"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <span>{faq.q}</span>
                      <i className={`fas fa-chevron-${isOpen ? "up" : "down"}`} style={{ color: "var(--primary-gold)" }}></i>
                    </button>
                    {isOpen && (
                      <div className="px-3 pb-3 pt-1 text-muted" style={{ fontSize: "13.5px", lineHeight: 1.6, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section" id="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="contact-info">
                <h2>Kunjungi Studio Kami & Hubungi Kami Hari Ini</h2>
                <p>
                  Apakah Anda ingin berkonsultasi mengenai gaya rambut yang sesuai, reservasi rombongan, atau pertanyaan seputar kemitraan? Tim kami siap melayani Anda dengan ramah.
                </p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>Lokasi Barbershop</strong>
                      <span>Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>Telepon & WhatsApp</strong>
                      <span>+62 812-3456-7890 / (021) 765-4321</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>Email Resmi</strong>
                      <span>info@barberialuxe.id / support@barberialuxe.id</span>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-info-text">
                      <strong>Jam Operasional</strong>
                      <span>Senin - Minggu: 09:00 - 21:00 WIB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-form">
                <h3 className="mb-4 text-white" style={{ fontSize: "24px" }}>
                  Kirim Pesan Langsung
                </h3>

                {contactAlert && (
                  <div
                    className={`alert ${contactAlert.success ? "alert-success" : "alert-danger"} mb-4`}
                    role="alert"
                  >
                    {contactAlert.text}
                  </div>
                )}

                <form onSubmit={handleContactSubmit} className="contactForm">
                  <div className="form-group row">
                    <div className="col-sm-6 mb-3 mb-sm-0">
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="form-control"
                        placeholder="Nama Lengkap *"
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="form-control"
                        placeholder="Alamat Email *"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="form-control"
                        placeholder="Subjek / Keperluan"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <textarea
                        cols={30}
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="form-control message"
                        placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row mb-0">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        disabled={contactLoading}
                        className="default_btn w-100 justify-content-center"
                      >
                        <i className="fas fa-paper-plane mr-2"></i>{" "}
                        {contactLoading ? "Mengirim Pesan..." : "Kirim Pesan Sekarang"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP CONCIERGE BUTTON */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Barberia%20Luxe,%20saya%20ingin%20tanya%20jadwal%20dan%20booking"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi WhatsApp CS"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          background: "#25D366",
          color: "#fff",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          boxShadow: "0 6px 20px rgba(37, 211, 102, 0.45)",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 211, 102, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.45)";
        }}
        title="Tanya Kasir via WhatsApp (Fast Response)"
      >
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}
