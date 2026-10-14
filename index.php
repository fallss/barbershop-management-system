<!-- PHP INCLUDES -->

<?php

    include "connect.php";
    include "Includes/templates/header.php";
    include "Includes/templates/navbar.php";

?>

    <!-- HOME HERO SECTION -->

    <section class="home-section" id="home-section">
	    <div class="home-section-content">
		    <div id="home-section-carousel" class="carousel slide" data-ride="carousel" data-interval="6000">
                <ol class="carousel-indicators">
                    <li data-target="#home-section-carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#home-section-carousel" data-slide-to="1"></li>
                    <li data-target="#home-section-carousel" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <!-- FIRST SLIDE -->
                    <div class="carousel-item active">
                        <img class="d-block w-100" src="Design/images/barbershop_image_1.jpg" alt="Barbershop Premium Experience">
                        <div class="carousel-caption d-md-block text-center">
                            <div class="hero-badge">
                                <i class="fas fa-crown"></i> Barbershop Premium & Grooming
                            </div>
                            <h3>Bukan Sekadar Cukur Rambut, Ini Pengalaman Eksklusif.</h3>
                            <p>
                                Barbershop mewah khusus pria modern yang mengutamakan presisi, kerapian sempurna, kenyamanan ekstra, dan kepercayaan diri maksimal.
                            </p>
                            <div class="hero-cta-group">
                                <a href="appointment.php" class="btn-hero-primary">
                                    <i class="far fa-calendar-check"></i> Pesan Jadwal Sekarang
                                </a>
                                <a href="#pricing" class="btn-hero-secondary">
                                    <i class="fas fa-list-ul"></i> Lihat Menu & Harga
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- SECOND SLIDE -->
                    <div class="carousel-item">
                        <img class="d-block w-100" src="Design/images/barbershop_image_2.jpg" alt="Master Barber Precision">
                        <div class="carousel-caption d-md-block text-center">
                            <div class="hero-badge">
                                <i class="fas fa-award"></i> Barber Profesional Tersertifikasi
                            </div>
                            <h3>Teknik Potong Presisi & Cukur Tradisional.</h3>
                            <p>
                                Sentuhan tangan ahli barber berpengalaman dengan teknik modern fade, beard sculpting, dan terapi handuk hangat aromaterapi.
                            </p>
                            <div class="hero-cta-group">
                                <a href="appointment.php" class="btn-hero-primary">
                                    <i class="far fa-calendar-check"></i> Booking Online Cepat
                                </a>
                                <a href="#about" class="btn-hero-secondary">
                                    <i class="fas fa-info-circle"></i> Tentang Barberia
                                </a>
                            </div>
                        </div>
                    </div>
                    <!-- THIRD SLIDE -->
                    <div class="carousel-item">
                        <img class="d-block w-100" src="Design/images/barbershop_image_3.jpg" alt="Luxury Grooming Lounge">
                        <div class="carousel-caption d-md-block text-center">
                            <div class="hero-badge">
                                <i class="fas fa-gem"></i> Pelayanan Kelas Utama
                            </div>
                            <h3>Suasana Vintage Mewah & Relaksasi Penuh.</h3>
                            <p>
                                Nikmati kursi barber ergonomis premium, perawatan wajah menutrisi, dan produk pomade serta hair tonic impor terbaik.
                            </p>
                            <div class="hero-cta-group">
                                <a href="appointment.php" class="btn-hero-primary">
                                    <i class="far fa-calendar-check"></i> Reservasi Kursi Anda
                                </a>
                                <a href="#team" class="btn-hero-secondary">
                                    <i class="fas fa-user-friends"></i> Kenali Tim Barber
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- PREVIOUS & NEXT -->
                <a class="carousel-control-prev" href="#home-section-carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Sebelumnya</span>
                </a>
                <a class="carousel-control-next" href="#home-section-carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Berikutnya</span>
                </a>
            </div>
		</div>
	</section>

    <!-- STATS RIBBON SECTION -->
    <section class="stats-ribbon">
        <div class="container">
            <div class="row">
                <div class="col-md-3 col-6">
                    <div class="stat-item">
                        <span class="stat-number">15+</span>
                        <span class="stat-label">Tahun Pengalaman</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-item">
                        <span class="stat-number">25K+</span>
                        <span class="stat-label">Pelanggan Puas</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-item">
                        <span class="stat-number">100%</span>
                        <span class="stat-label">Barber Bersertifikat</span>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-item">
                        <span class="stat-number">4.9 ★</span>
                        <span class="stat-label">Rating Kepuasan</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ABOUT SECTION -->

    <section id="about" class="about_section">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <div class="about_content">
                        <h3>Mengenal Barberia Luxe</h3>
                        <h2>Tradisi Cukur Klasik & Gaya Modern Sejak 1991</h2>
                        <p>
                            Barberia Luxe lahir dari apresiasi mendalam terhadap seni pangkas rambut pria sejati. Kami memadukan estetika heritage klasik dengan teknik kontemporer untuk menghasilkan potongan yang mencerminkan karakter terbaik Anda.
                        </p>
                        
                        <div class="about-features">
                            <div class="about-feature-box">
                                <i class="fas fa-cut"></i>
                                <span>Gunting Presisi & Razor Tajam</span>
                            </div>
                            <div class="about-feature-box">
                                <i class="fas fa-pump-soap"></i>
                                <span>Peralatan Steril Medis 100%</span>
                            </div>
                            <div class="about-feature-box">
                                <i class="fas fa-hot-tub"></i>
                                <span>Handuk Hangat Aromaterapi</span>
                            </div>
                            <div class="about-feature-box">
                                <i class="fas fa-coffee"></i>
                                <span>Lounge Nyaman & Free Welcome Drink</span>
                            </div>
                        </div>

                        <a href="appointment.php" class="default_btn">
                            <i class="far fa-calendar-alt"></i> Booking Jadwal Anda
                        </a>
                    </div>
                </div>
                <div class="col-lg-6 d-none d-lg-block">
                    <div class="about_img" style="overflow:hidden">
                        <img class="about_img_1 w-100" src="Design/images/about-1.jpg" alt="Atmosfer Barbershop">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SERVICES HIGHLIGHT SECTION -->

    <section class="services_section" id="services">
        <div class="container">
            <div class="section_heading">
                <h3>Keahlian & Sentuhan Premium</h3>
                <h2>Layanan Unggulan Kami</h2>
                <div class="heading-line"></div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service_box">
                        <i class="bs bs-scissors-1"></i>
                        <h3>Potong Rambut Presisi</h3>
                        <p>Potongan rapi sesuai bentuk wajah dan gaya hidup Anda, lengkap dengan keramas bersih dan pijat kepala.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service_box">
                        <i class="bs bs-razor-2"></i>
                        <h3>Beard Trim & Sculpting</h3>
                        <p>Merapikan garis jenggot dan kumis agar tegas, simetris, dan ternutrisi dengan minyak aromaterapi.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service_box">
                        <i class="bs bs-brush"></i>
                        <h3>Hot Towel Smooth Shave</h3>
                        <p>Sensasi cukur bersih tradisional dengan handuk hangat, foam kaya busa, dan razor satu mata super halus.</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 mb-4">
                    <div class="service_box">
                        <i class="bs bs-hairbrush-1"></i>
                        <h3>Facial & Masker Wajah</h3>
                        <p>Perawatan kulit wajah khusus pria untuk mengangkat komedo, mengecilkan pori, dan menyegarkan kulit kusam.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- BOOKING CTA SECTION -->

    <section class="book_section" id="booking">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                    <div class="booking-cta-card">
                        <h2>Reservasi Online Tanpa Perlu Mengantre</h2>
                        <p>
                            Pilih layanan yang Anda inginkan, tentukan barber favorit, dan jadwalkan waktu terbaik Anda dalam hitungan detik melalui sistem reservasi otomatis kami.
                        </p>
                        <a href="appointment.php" class="btn-hero-primary" style="font-size: 16px; padding: 15px 36px;">
                            <i class="far fa-calendar-check mr-2"></i> Mulai Pesan Jadwal Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- GALLERY SECTION -->

    <section class="gallery-section" id="gallery">
        <div class="container">
            <div class="section_heading">
                <h3>Koleksi Gaya & Portofolio</h3>
                <h2>Galeri Kreasi Barbershop</h2>
                <div class="heading-line"></div>
            </div>
            <div class="row">
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-1.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Classic Pompadour</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-2.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Skin Fade Undercut</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-3.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Beard Sculpting & Trim</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-4.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Textured French Crop</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-5.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Side Part Gentleman</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-6.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Modern Taper Fade</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-7.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Sharp Clean Razor Edge</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 gallery-column">
                    <div class="gallery-item-wrap">
                        <div class="gallery-img" style="background-image: url('Design/images/portfolio-8.jpg');"></div>
                        <div class="gallery-item-overlay">
                            <span class="gallery-item-title">Slick Back Executive</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- TEAM SECTION -->

    <section id="team" class="team_section">
        <div class="container">
            <div class="section_heading">
                <h3>Para Ahli Berpengalaman</h3>
                <h2>Barber Profesional Kami</h2>
                <div class="heading-line"></div>
            </div>
            <div class="row justify-content-center"> 
                <div class="col-lg-4 col-md-6">
                    <div class="team-card">
                        <div class="team-img-wrap">
                            <img src="Design/images/team-1.jpg" alt="Budi Santoso">
                        </div>
                        <div class="team-info">
                            <h4 class="team-name">Budi Santoso</h4>
                            <span class="team-role">Head Master Barber (10+ Thn)</span>
                            <div class="team-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-muted small">Spesialis model klasik formal, potongan gunting presisi, dan styling eksekutif.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="team-card">
                        <div class="team-img-wrap">
                            <img src="Design/images/team-2.jpg" alt="Rian Pratama">
                        </div>
                        <div class="team-info">
                            <h4 class="team-name">Rian Pratama</h4>
                            <span class="team-role">Senior Fade & Modern Stylist</span>
                            <div class="team-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-muted small">Ahli gradasi skin fade halus, tren model kekinian (Crop, Mullet, Two Block), dan hair tattoo.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="team-card">
                        <div class="team-img-wrap">
                            <img src="Design/images/team-3.jpg" alt="Dimas Kusuma">
                        </div>
                        <div class="team-info">
                            <h4 class="team-name">Dimas Kusuma</h4>
                            <span class="team-role">Beard & Shave Specialist</span>
                            <div class="team-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="text-muted small">Master cukur tradisional handuk hangat, penataan jenggot maskulin, dan facial spa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- REVIEWS / TESTIMONIALS SECTION -->

    <section id="reviews" class="testimonial_section">
        <div class="container">
            <div class="section_heading">
                <h3>Kepuasan Pelanggan</h3>
                <h2>Apa Kata Mereka Tentang Kami</h2>
                <div class="heading-line"></div>
            </div>

            <div id="reviews-carousel" class="carousel slide" data-ride="carousel" data-interval="5000">
                <div class="carousel-inner">
                    <!-- REVIEW 1 -->
                    <div class="carousel-item active">
                        <div class="testimonial-card-wrap">
                            <div class="testi-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="testi-quote">
                                "Pelayanan di Barberia Luxe benar-benar luar biasa! Potongan rambut sangat rapi dan detail, pijatan kepalanya bikin rileks setelah seharian kerja. Sistem booking online-nya sangat praktis tanpa perlu menunggu antrean."
                            </p>
                            <h5 class="testi-author">Andi Firmansyah</h5>
                            <span class="testi-role">Pengusaha & Pelanggan Setia</span>
                        </div>
                    </div>
                    <!-- REVIEW 2 -->
                    <div class="carousel-item">
                        <div class="testimonial-card-wrap">
                            <div class="testi-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="testi-quote">
                                "Fade cut paling halus yang pernah saya rasakan. Barber sangat mengerti karakteristik bentuk kepala saya dan memberikan saran model yang pas. Tempatnya bersih, adem, dan beraroma aromaterapi mewah."
                            </p>
                            <h5 class="testi-author">Reza Pratama</h5>
                            <span class="testi-role">Kreator Konten & Desainer</span>
                        </div>
                    </div>
                    <!-- REVIEW 3 -->
                    <div class="carousel-item">
                        <div class="testimonial-card-wrap">
                            <div class="testi-stars">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            </div>
                            <p class="testi-quote">
                                "Paket Gentlemen Ultimate Grooming sangat saya rekomendasikan! Cukur handuk hangatnya mantap dan masker charcoal bikin muka segar seketika. Pasti langganan tetap di sini."
                            </p>
                            <h5 class="testi-author">Bayu Wicaksono</h5>
                            <span class="testi-role">Eksekutif Bisnis</span>
                        </div>
                    </div>
                </div>
                <!-- PREVIOUS & NEXT -->
                <a class="carousel-control-prev" href="#reviews-carousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Sebelumnya</span>
                </a>
                <a class="carousel-control-next" href="#reviews-carousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Berikutnya</span>
                </a>
            </div>
        </div>
    </section>

    <!-- PRICING SECTION -->

    <section class="pricing_section" id="pricing">
        <div class="container">
            <div class="section_heading">
                <h3>Harga Transparan & Kualitas Terbaik</h3>
                <h2>Daftar Harga & Menu Layanan</h2>
                <div class="heading-line"></div>
            </div>

            <?php
                $stmt = $con->prepare("SELECT * FROM service_categories ORDER BY category_id ASC");
                $stmt->execute();
                $categories = $stmt->fetchAll();
            ?>

            <div class="row">
                <?php
                    foreach($categories as $category)
                    {
                        $stmt = $con->prepare("SELECT * FROM services WHERE category_id = ? ORDER BY service_price ASC");
                        $stmt->execute(array($category['category_id']));
                        $totalServices = $stmt->rowCount();
                        $services = $stmt->fetchAll();

                        if($totalServices > 0)
                        {
                        ?>
                            <div class="col-lg-6 col-md-12 mb-4">
                                <div class="price_wrap">
                                    <h3>
                                        <span><?php echo htmlspecialchars($category['category_name']); ?></span>
                                        <small style="font-size: 13px; color: var(--text-muted); font-weight: normal;"><?php echo $totalServices; ?> Layanan</small>
                                    </h3>
                                    <ul class="price_list">
                                        <?php
                                            foreach($services as $service)
                                            {
                                                ?>
                                                <li>
                                                    <h4><?php echo htmlspecialchars($service['service_name']); ?></h4>
                                                    <p><?php echo htmlspecialchars($service['service_description']); ?></p>
                                                    <div class="d-flex align-items-center mt-2">
                                                        <span class="badge badge-secondary mr-2" style="background: rgba(255,255,255,0.08); color: #cbd5e1; font-weight: 500;">
                                                            <i class="far fa-clock mr-1"></i> <?php echo $service['service_duration']; ?> Menit
                                                        </span>
                                                        <a href="appointment.php" class="text-warning small font-weight-bold ml-2">
                                                            Pilih <i class="fas fa-chevron-right ml-1"></i>
                                                        </a>
                                                    </div>
                                                    <span class="price">
                                                        Rp <?php echo number_format($service['service_price'], 0, ',', '.'); ?>
                                                    </span>
                                                </li>
                                                <?php
                                            }
                                        ?>
                                    </ul>
                                </div>
                            </div>
                        <?php
                        }
                    }
                ?>
            </div>

            <div class="text-center mt-4">
                <a href="appointment.php" class="default_btn">
                    <i class="far fa-calendar-alt mr-2"></i> Buat Janji Temu Sekarang
                </a>
            </div>
        </div>
    </section>

    <!-- CONTACT SECTION -->

    <section class="contact-section" id="contact-us">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 mb-5 mb-lg-0">
                    <div class="contact-info">
                        <h2>Kunjungi Studio Kami & Hubungi Kami Hari Ini</h2>
                        <p>
                            Apakah Anda ingin berkonsultasi mengenai gaya rambut yang sesuai, reservasi rombongan, atau pertanyaan lainnya? Tim kami siap melayani Anda dengan senang hati.
                        </p>
                        
                        <div class="contact-info-list">
                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="contact-info-text">
                                    <strong>Lokasi Barbershop</strong>
                                    <span>Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan 12190</span>
                                </div>
                            </div>

                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div class="contact-info-text">
                                    <strong>Telepon & WhatsApp</strong>
                                    <span>+62 812-3456-7890 / (021) 765-4321</span>
                                </div>
                            </div>

                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="contact-info-text">
                                    <strong>Email Resmi</strong>
                                    <span>info@barberialuxe.id / support@barberialuxe.id</span>
                                </div>
                            </div>

                            <div class="contact-info-item">
                                <div class="contact-info-icon">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="contact-info-text">
                                    <strong>Jam Operasional</strong>
                                    <span>Senin - Minggu: 09:00 - 21:00 WIB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="contact-form">
                        <h3 class="mb-4 text-white" style="font-size: 24px;">Kirim Pesan Langsung</h3>
                        <div id="contact_ajax_form" class="contactForm">
                            <div class="form-group row">
                                <div class="col-sm-6 mb-3 mb-sm-0">
                                    <input type="text" id="contact_name" name="name" class="form-control" placeholder="Nama Lengkap *" required>
                                </div>
                                <div class="col-sm-6">
                                    <input type="email" id="contact_email" name="email" class="form-control" placeholder="Alamat Email *" required>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-12">
                                    <input type="text" id="contact_subject" name="subject" class="form-control" placeholder="Subjek / Keperluan">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-md-12">
                                    <textarea id="contact_message" name="message" cols="30" rows="4" class="form-control message" placeholder="Tuliskan pesan atau pertanyaan Anda di sini..." required></textarea>
                                </div>
                            </div>
                            <div class="form-group row mb-0">
                                <div class="col-md-12">
                                    <button id="contact_send" class="default_btn w-100 justify-content-center">
                                        <i class="fas fa-paper-plane mr-2"></i> Kirim Pesan Sekarang
                                    </button>
                                </div>
                            </div>
                            <div class="text-center mt-3">
                                <img src="Design/images/ajax_loader_gif.gif" id="contact_ajax_loader" style="display: none; height: 30px; margin: 0 auto;">
                            </div>
                            <div id="contact_status_message" class="mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- WIDGET FOOTER SECTION -->

    <section class="widget_section">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div class="footer_widget">
                        <div class="d-flex align-items-center mb-3">
                            <img src="Design/images/barbershop_logo.png" alt="Barberia Luxe" style="height: 45px;" class="mr-2">
                            <div>
                                <span class="brand-title" style="font-size: 20px;">BARBERIA LUXE</span>
                                <span class="brand-subtitle" style="font-size: 9px;">PREMIUM GROOMING</span>
                            </div>
                        </div>
                        <p>
                            Destinasi perawatan dan pangkas rambut pria terbaik dengan standar layanan bintang lima, peralatan steril berkualitas tinggi, dan suasana nyaman untuk pria berkelas.
                        </p>
                        <ul class="widget_social">
                            <li><a href="#" data-toggle="tooltip" title="Instagram"><i class="fab fa-instagram"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" title="WhatsApp"><i class="fab fa-whatsapp"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" title="Facebook"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#" data-toggle="tooltip" title="TikTok"><i class="fab fa-tiktok"></i></a></li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 mb-4 mb-lg-0">
                    <div class="footer_widget">
                        <h3>Lokasi Studio</h3>
                        <p>
                            Jl. Senopati No. 88, Lantai 1-2<br>
                            Kebayoran Baru, Jakarta Selatan 12190
                        </p>
                        <p class="mb-0">
                            <strong>Email:</strong> halo@barberialuxe.id<br>
                            <strong>Telepon:</strong> +62 812-3456-7890
                        </p>
                    </div>
                </div>

                <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
                    <div class="footer_widget">
                        <h3>Jam Buka</h3>
                        <ul class="opening_time list-unstyled" style="color: var(--text-muted); font-size: 14px; line-height: 1.8;">
                            <li><strong class="text-white">Senin - Jumat:</strong><br>09:00 - 21:00 WIB</li>
                            <li class="mt-2"><strong class="text-white">Sabtu - Minggu:</strong><br>09:00 - 21:00 WIB</li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6">
                    <div class="footer_widget">
                        <h3>Buat Reservasi Cepat</h3>
                        <p>
                            Amankan slot waktu Anda lebih awal untuk mendapatkan pelayanan tanpa antrean.
                        </p>
                        <a href="appointment.php" class="default_btn w-100 justify-content-center">
                            <i class="far fa-calendar-check mr-2"></i> Reservasi Online
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER BOTTOM -->

    <?php include "Includes/templates/footer.php"; ?>