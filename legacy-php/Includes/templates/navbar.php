
    
    <!-- START NAVBAR SECTION -->

    <header id="header" class="header-section">
        <div class="luxury-nav-container">
            <nav class="navbar">
                <a href="index.php" class="navbar-brand">
                    <div class="brand-emblem">
                        <i class="fas fa-cut"></i>
                    </div>
                    <div class="brand-text">
                        <span class="brand-title">BARBERIA LUXE</span>
                        <span class="brand-subtitle">PREMIUM GROOMING</span>
                    </div>
                </a>

                <div class="main-menu-container">
                    <div class="mainmenu" id="mainmenu">
                        <ul class="nav">
                            <li><a href="index.php#home-section">BERANDA</a></li>
                            <li><a href="index.php#about">TENTANG KAMI</a></li>
                            <li><a href="index.php#services">LAYANAN</a></li>
                            <li><a href="index.php#gallery">GALERI</a></li>
                            <li><a href="index.php#team">TIM BARBER</a></li>
                            <li><a href="index.php#pricing">DAFTAR HARGA</a></li>
                            <li><a href="index.php#contact-us">KONTAK</a></li>
                        </ul>
                    </div>
                    <div class="header-btn">
                        <a href="appointment.php" class="menu-btn">
                            <i class="far fa-calendar-check"></i>
                            <span>Booking Sekarang</span>
                        </a>
                    </div>
                </div>

                <button type="button" class="mob-menu-toggle" aria-label="Buka Menu Navigasi">
                    <i class="fas fa-bars"></i>
                </button>
            </nav>
        </div>
    </header>

	<div class="header-height"></div>

    <!-- END NAVBAR SECTION -->

    <!-- START MOBILE NAVBAR -->
    
    <div id="menu_mobile" class="menu-mobile-menu-container">
        <ul class="mob-menu-top">
            <li class="menu-header">
                <a href="#">MENU UTAMA</a>
            </li>
            <li style="display: inline-block;">
                <a class="mob-close-toggle" style="cursor: pointer;width: 75px;">
                    <i class="fas fa-times" style="color: white;"></i>
                </a>
            </li>
        </ul>
        <div class="menu-tab-div">
            <ul id="mobile-menu" class="menu">
                <li><a href="index.php#home-section" class="a-mob-menu">Beranda</a></li>
                <li><a href="index.php#about" class="a-mob-menu">Tentang Kami</a></li>
                <li><a href="index.php#services" class="a-mob-menu">Layanan Kami</a></li>
                <li><a href="appointment.php" class="a-mob-menu" style="color: var(--primary-gold); font-weight: bold;">Booking Online</a></li>
                <li><a href="index.php#gallery" class="a-mob-menu">Galeri Rambut</a></li>
                <li><a href="index.php#team" class="a-mob-menu">Tim Barber</a></li>
                <li><a href="index.php#pricing" class="a-mob-menu">Daftar Harga</a></li>
                <li><a href="index.php#contact-us" class="a-mob-menu">Hubungi Kami</a></li>
                <li><a href="barber-admin/login.php" class="a-mob-menu" style="opacity: 0.7;"><i class="fas fa-lock"></i> Portal Admin</a></li>
            </ul>
        </div>
    </div>

    <div id="menu_mobile_overlay" class="menu-mobile-overlay"></div>

    <!-- END NAVBAR MOBILE -->