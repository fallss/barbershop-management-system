"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { INITIAL_CATEGORIES, INITIAL_SERVICES } from "@/lib/data";

export default function HomePage() {
  // Hero Carousel State
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [
    {
      img: "/Design/images/barbershop_image_1.jpg",
      badge: "Barbershop Premium & Grooming",
      badgeIcon: "fas fa-crown",
      title: "Bukan Sekadar Cukur Rambut, Ini Pengalaman Eksklusif.",
      desc: "Barbershop mewah khusus pria modern yang mengutamakan presisi, kerapian sempurna, kenyamanan ekstra, dan kepercayaan diri maksimal.",
      btn1Text: "Pesan Jadwal Sekarang",
      btn1Link: "/booking",
      btn2Text: "Lihat Menu & Harga",
      btn2Link: "#pricing",
      btn2Icon: "fas fa-list-ul",
    },
    {
      img: "/Design/images/barbershop_image_2.jpg",
      badge: "Barber Profesional Tersertifikasi",
      badgeIcon: "fas fa-award",
      title: "Teknik Potong Presisi & Cukur Tradisional.",
      desc: "Sentuhan tangan ahli barber berpengalaman dengan teknik modern fade, beard sculpting, dan terapi handuk hangat aromaterapi.",
      btn1Text: "Booking Online Cepat",
      btn1Link: "/booking",
      btn2Text: "Tentang Barberia",
      btn2Link: "#about",
      btn2Icon: "fas fa-info-circle",
    },
    {
      img: "/Design/images/barbershop_image_3.jpg",
      badge: "Pelayanan Kelas Utama",
      badgeIcon: "fas fa-gem",
      title: "Suasana Vintage Mewah & Relaksasi Penuh.",
      desc: "Nikmati kursi barber ergonomis premium, perawatan wajah menutrisi, dan produk pomade serta hair tonic impor terbaik.",
      btn1Text: "Reservasi Kursi Anda",
      btn1Link: "/booking",
      btn2Text: "Kenali Tim Barber",
      btn2Link: "#team",
      btn2Icon: "fas fa-user-friends",
    },
  ];

  // Auto advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Review Carousel State
  const [reviewSlide, setReviewSlide] = useState(0);
  const reviewSlides = [
    {
      quote:
        "\"Pelayanan di Barberia Luxe benar-benar luar biasa! Potongan rambut sangat rapi dan detail, pijatan kepalanya bikin rileks setelah seharian kerja. Sistem booking online-nya sangat praktis tanpa perlu menunggu antrean.\"",
      author: "Andi Firmansyah",
      role: "Pengusaha & Pelanggan Setia",
    },
    {
      quote:
        "\"Fade cut paling halus yang pernah saya rasakan. Barber sangat mengerti karakteristik bentuk kepala saya dan memberikan saran model yang pas. Tempatnya bersih, adem, dan beraroma aromaterapi mewah.\"",
      author: "Reza Pratama",
      role: "Kreator Konten & Desainer",
    },
    {
      quote:
        "\"Paket Gentlemen Ultimate Grooming sangat saya rekomendasikan! Cukur handuk hangatnya mantap dan masker charcoal bikin muka segar seketika. Pasti langganan tetap di sini.\"",
      author: "Bayu Wicaksono",
      role: "Eksekutif Bisnis",
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
    { src: "/Design/images/portfolio-1.jpg", title: "Classic Pompadour" },
    { src: "/Design/images/portfolio-2.jpg", title: "Skin Fade Undercut" },
    { src: "/Design/images/portfolio-3.jpg", title: "Beard Sculpting & Trim" },
    { src: "/Design/images/portfolio-4.jpg", title: "Textured French Crop" },
    { src: "/Design/images/portfolio-5.jpg", title: "Side Part Gentleman" },
    { src: "/Design/images/portfolio-6.jpg", title: "Modern Taper Fade" },
    { src: "/Design/images/portfolio-7.jpg", title: "Sharp Clean Razor Edge" },
    { src: "/Design/images/portfolio-8.jpg", title: "Slick Back Executive" },
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
                <h2>Tradisi Cukur Klasik & Gaya Modern Sejak 1991</h2>
                <p>
                  Barberia Luxe lahir dari apresiasi mendalam terhadap seni pangkas rambut pria sejati. Kami memadukan estetika heritage klasik dengan teknik kontemporer untuk menghasilkan potongan yang mencerminkan karakter terbaik Anda.
                </p>

                <div className="about-features">
                  <div className="about-feature-box">
                    <i className="fas fa-cut"></i>
                    <span>Gunting Presisi & Razor Tajam</span>
                  </div>
                  <div className="about-feature-box">
                    <i className="fas fa-pump-soap"></i>
                    <span>Peralatan Steril Medis 100%</span>
                  </div>
                  <div className="about-feature-box">
                    <i className="fas fa-hot-tub"></i>
                    <span>Handuk Hangat Aromaterapi</span>
                  </div>
                  <div className="about-feature-box">
                    <i className="fas fa-coffee"></i>
                    <span>Lounge Nyaman & Free Welcome Drink</span>
                  </div>
                </div>

                <Link href="/booking" className="default_btn">
                  <i className="far fa-calendar-alt mr-2"></i> Booking Jadwal Anda
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="about_img" style={{ overflow: "hidden" }}>
                <img className="about_img_1 w-100" src="/Design/images/about-1.jpg" alt="Atmosfer Barbershop" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES HIGHLIGHT SECTION */}
      <section className="services_section" id="services">
        <div className="container">
          <div className="section_heading">
            <h3>Keahlian & Sentuhan Premium</h3>
            <h2>Layanan Unggulan Kami</h2>
            <div className="heading-line"></div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="service_box">
                <i className="bs bs-scissors-1"></i>
                <h3>Potong Rambut Presisi</h3>
                <p>Potongan rapi sesuai bentuk wajah dan gaya hidup Anda, lengkap dengan keramas bersih dan pijat kepala.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="service_box">
                <i className="bs bs-razor-2"></i>
                <h3>Beard Trim & Sculpting</h3>
                <p>Merapikan garis jenggot dan kumis agar tegas, simetris, dan ternutrisi dengan minyak aromaterapi.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="service_box">
                <i className="bs bs-brush"></i>
                <h3>Hot Towel Smooth Shave</h3>
                <p>Sensasi cukur bersih tradisional dengan handuk hangat, foam kaya busa, dan razor satu mata super halus.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="service_box">
                <i className="bs bs-hairbrush-1"></i>
                <h3>Facial & Masker Wajah</h3>
                <p>Perawatan kulit wajah khusus pria untuk mengangkat komedo, mengecilkan pori, dan menyegarkan kulit kusam.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA SECTION */}
      <section className="book_section" id="booking">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="booking-cta-card">
                <h2>Reservasi Online Tanpa Perlu Mengantre</h2>
                <p>
                  Pilih layanan yang Anda inginkan, tentukan barber favorit, dan jadwalkan waktu terbaik Anda dalam hitungan detik melalui sistem reservasi otomatis kami.
                </p>
                <Link href="/booking" className="btn-hero-primary" style={{ fontSize: "16px", padding: "15px 36px" }}>
                  <i className="far fa-calendar-check mr-2"></i> Mulai Pesan Jadwal Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="section_heading">
            <h3>Koleksi Gaya & Portofolio</h3>
            <h2>Galeri Kreasi Barbershop</h2>
            <div className="heading-line"></div>
          </div>
          <div className="row">
            {galleryItems.map((item, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 gallery-column">
                <div className="gallery-item-wrap">
                  <div className="gallery-img" style={{ backgroundImage: `url('${item.src}')` }}></div>
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-title">{item.title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="team_section">
        <div className="container">
          <div className="section_heading">
            <h3>Para Ahli Berpengalaman</h3>
            <h2>Barber Profesional Kami</h2>
            <div className="heading-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-img-wrap">
                  <img src="/Design/images/team-1.jpg" alt="Budi Santoso" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">Budi Santoso</h4>
                  <span className="team-role">Head Master Barber (10+ Thn)</span>
                  <div className="team-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-muted small">Spesialis model klasik formal, potongan gunting presisi, dan styling eksekutif.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-img-wrap">
                  <img src="/Design/images/team-2.jpg" alt="Rian Pratama" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">Rian Pratama</h4>
                  <span className="team-role">Senior Fade & Modern Stylist</span>
                  <div className="team-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-muted small">Ahli gradasi skin fade halus, tren model kekinian (Crop, Mullet, Two Block), dan hair tattoo.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <div className="team-img-wrap">
                  <img src="/Design/images/team-3.jpg" alt="Dimas Kusuma" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">Dimas Kusuma</h4>
                  <span className="team-role">Beard & Shave Specialist</span>
                  <div className="team-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                  <p className="text-muted small">Master cukur tradisional handuk hangat, penataan jenggot maskulin, dan facial spa.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS / TESTIMONIALS SECTION */}
      <section id="reviews" className="testimonial_section">
        <div className="container">
          <div className="section_heading">
            <h3>Kepuasan Pelanggan</h3>
            <h2>Apa Kata Mereka Tentang Kami</h2>
            <div className="heading-line"></div>
          </div>

          <div id="reviews-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {reviewSlides.map((rev, idx) => (
                <div key={idx} className={`carousel-item ${reviewSlide === idx ? "active" : ""}`}>
                  <div className="testimonial-card-wrap">
                    <div className="testi-stars">
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

      {/* PRICING SECTION */}
      <section className="pricing_section" id="pricing">
        <div className="container">
          <div className="section_heading">
            <h3>Harga Transparan & Kualitas Terbaik</h3>
            <h2>Daftar Harga & Menu Layanan</h2>
            <div className="heading-line"></div>
          </div>

          <div className="row">
            {INITIAL_CATEGORIES.map((category) => {
              const services = INITIAL_SERVICES.filter((s) => s.category_id === category.id);
              if (services.length === 0) return null;
              return (
                <div key={category.id} className="col-lg-6 col-md-12 mb-4">
                  <div className="price_wrap">
                    <h3>
                      <span>{category.name}</span>
                      <small style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "normal" }}>
                        {services.length} Layanan
                      </small>
                    </h3>
                    <ul className="price_list">
                      {services.map((service) => (
                        <li key={service.id}>
                          <h4>{service.name}</h4>
                          <p>{service.description}</p>
                          <div className="d-flex align-items-center mt-2">
                            <span
                              className="badge badge-secondary mr-2"
                              style={{ background: "rgba(255,255,255,0.08)", color: "#cbd5e1", fontWeight: 500 }}
                            >
                              <i className="far fa-clock mr-1"></i> {service.duration_min} Menit
                            </span>
                            <Link href={`/booking?service=${service.id}`} className="text-warning small font-weight-bold ml-2">
                              Pilih <i className="fas fa-chevron-right ml-1"></i>
                            </Link>
                          </div>
                          <span className="price">
                            Rp {service.price.toLocaleString("id-ID")}
                          </span>
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

      {/* CONTACT SECTION */}
      <section className="contact-section" id="contact-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="contact-info">
                <h2>Kunjungi Studio Kami & Hubungi Kami Hari Ini</h2>
                <p>
                  Apakah Anda ingin berkonsultasi mengenai gaya rambut yang sesuai, reservasi rombongan, atau pertanyaan lainnya? Tim kami siap melayani Anda dengan senang hati.
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
    </>
  );
}
