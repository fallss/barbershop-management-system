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
        className={`menu-mobile-menu-container ${mobileOpen ? "open" : ""}`}
        style={{
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          position: "fixed",
          top: 0,
          right: 0,
          width: "300px",
          height: "100%",
          backgroundColor: "#141820",
          zIndex: 9999,
          padding: "20px",
          boxShadow: "-5px 0 25px rgba(0,0,0,0.7)",
          display: "block",
        }}
      >
        <ul className="mob-menu-top" style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: "15px" }}>
          <li className="menu-header">
            <span style={{ color: "var(--primary-gold)", fontWeight: 700, letterSpacing: "1px" }}>MENU UTAMA</span>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="mob-close-toggle"
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "white", fontSize: "20px" }}
            >
              <i className="fas fa-times"></i>
            </button>
          </li>
        </ul>
        <div className="menu-tab-div" style={{ marginTop: "20px" }}>
          <ul id="mobile-menu" className="menu" style={{ listStyle: "none", padding: 0 }}>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/#home-section" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "white", textDecoration: "none" }}>
                Beranda
              </Link>
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/#about" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "white", textDecoration: "none" }}>
                Tentang Kami
              </Link>
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/#services" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "white", textDecoration: "none" }}>
                Layanan Kami
              </Link>
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/booking" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "var(--primary-gold)", fontWeight: "bold", textDecoration: "none" }}>
                Booking Online Sekarang
              </Link>
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/#gallery" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "white", textDecoration: "none" }}>
                Galeri Rambut
              </Link>
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/#team" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "white", textDecoration: "none" }}>
                Tim Barber
              </Link>
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/#pricing" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "white", textDecoration: "none" }}>
                Daftar Harga
              </Link>
            </li>
            <li style={{ padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Link href="/#contact-us" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "white", textDecoration: "none" }}>
                Hubungi Kami
              </Link>
            </li>
            <li style={{ padding: "15px 0" }}>
              <Link href="/admin/login" onClick={() => setMobileOpen(false)} className="a-mob-menu" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "14px" }}>
                <i className="fas fa-lock mr-2"></i> Portal Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="menu_mobile_overlay"
          className="menu-mobile-overlay open"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 9998,
          }}
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
