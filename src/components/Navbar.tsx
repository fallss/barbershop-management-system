"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* START NAVBAR SECTION */}
      <header id="header" className="header-section">
        <div className="luxury-nav-container">
          <nav className="navbar">
            <Link href="/#home-section" className="navbar-brand">
              <div className="brand-emblem">
                <i className="fas fa-cut"></i>
              </div>
              <div className="brand-text">
                <span className="brand-title">BARBERIA LUXE</span>
                <span className="brand-subtitle">PREMIUM GROOMING</span>
              </div>
            </Link>

            <div className="main-menu-container">
              <div className="mainmenu" id="mainmenu">
                <ul className="nav">
                  <li>
                    <Link href="/#home-section">BERANDA</Link>
                  </li>
                  <li>
                    <Link href="/#about">TENTANG KAMI</Link>
                  </li>
                  <li>
                    <Link href="/#services">LAYANAN</Link>
                  </li>
                  <li>
                    <Link href="/#gallery">GALERI</Link>
                  </li>
                  <li>
                    <Link href="/#team">TIM BARBER</Link>
                  </li>
                  <li>
                    <Link href="/#pricing">DAFTAR HARGA</Link>
                  </li>
                  <li>
                    <Link href="/#contact-us">KONTAK</Link>
                  </li>
                </ul>
              </div>
              <div className="header-btn">
                <Link href="/booking" className="menu-btn">
                  <i className="far fa-calendar-check mr-2"></i>
                  <span>Booking Sekarang</span>
                </Link>
              </div>
            </div>

            <button
              type="button"
              className="mob-menu-toggle"
              aria-label="Buka Menu Navigasi"
              onClick={() => setMobileOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </nav>
        </div>
      </header>

      <div className="header-height"></div>

      {/* START MOBILE NAVBAR */}
      <div
        id="menu_mobile"
        className={`menu-mobile-menu-container ${mobileOpen ? "active" : ""}`}
      >
        <ul className="mob-menu-top">
          <li className="menu-header">
            <span>MENU UTAMA</span>
          </li>
          <li style={{ display: "inline-block" }}>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="mob-close-toggle"
              aria-label="Tutup Menu"
            >
              <i className="fas fa-times"></i>
            </button>
          </li>
        </ul>
        <div className="menu-tab-div">
          <ul id="mobile-menu" className="menu">
            <li>
              <Link href="/#home-section" onClick={() => setMobileOpen(false)} className="a-mob-menu">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/#about" onClick={() => setMobileOpen(false)} className="a-mob-menu">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/#services" onClick={() => setMobileOpen(false)} className="a-mob-menu">
                Layanan Kami
              </Link>
            </li>
            <li>
              <Link href="/booking" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "var(--primary-gold)", fontWeight: "bold" }}>
                Booking Online Sekarang
              </Link>
            </li>
            <li>
              <Link href="/#gallery" onClick={() => setMobileOpen(false)} className="a-mob-menu">
                Galeri Rambut
              </Link>
            </li>
            <li>
              <Link href="/#team" onClick={() => setMobileOpen(false)} className="a-mob-menu">
                Tim Barber
              </Link>
            </li>
            <li>
              <Link href="/#pricing" onClick={() => setMobileOpen(false)} className="a-mob-menu">
                Daftar Harga
              </Link>
            </li>
            <li>
              <Link href="/#contact-us" onClick={() => setMobileOpen(false)} className="a-mob-menu">
                Hubungi Kami
              </Link>
            </li>
            <li>
              <Link href="/admin/login" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ opacity: 0.7 }}>
                <i className="fas fa-lock mr-2"></i> Portal Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="menu_mobile_overlay"
        className={`menu-mobile-overlay ${mobileOpen ? "active" : ""}`}
        onClick={() => setMobileOpen(false)}
      ></div>
    </>
  );
}
