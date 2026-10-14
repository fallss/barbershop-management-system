"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#d4af37]/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa8014] flex items-center justify-center shadow-md shadow-[#d4af37]/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-xl">✂️</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-wider gold-gradient-text block font-serif uppercase">
                Barberia Luxe
              </span>
              <span className="text-[10px] tracking-widest text-[#9ca3af] uppercase font-medium">
                Premium Barbershop Jakarta
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/#tentang"
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Tentang
            </Link>
            <Link
              href="/#layanan"
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Layanan
            </Link>
            <Link
              href="/#galeri"
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Galeri
            </Link>
            <Link
              href="/#barber"
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Master Barber
            </Link>
            <Link
              href="/#harga"
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Daftar Harga
            </Link>
            <Link
              href="/#kontak"
              className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors"
            >
              Kontak
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/admin/login"
              className="text-xs font-semibold px-3 py-1.5 rounded border border-[#2a2e3d] text-gray-400 hover:text-[#d4af37] hover:border-[#d4af37]/40 transition-colors"
              title="Portal Admin & Staf"
            >
              🔒 Admin
            </Link>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-[#0b0c10] bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] hover:from-[#fff] hover:to-[#d4af37] shadow-lg shadow-[#d4af37]/25 hover:shadow-[#d4af37]/40 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>Reservasi Online</span>
              <span className="ml-2 font-bold">→</span>
            </Link>
          </div>

          {/* Mobile menu toggle button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/booking"
              className="px-3 py-1.5 text-xs font-bold rounded bg-[#d4af37] text-[#0b0c10]"
            >
              Booking
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#1a1d28] focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#11131a] border-b border-[#d4af37]/20 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-[#d4af37] hover:bg-[#191d2b]"
          >
            Beranda
          </Link>
          <Link
            href="/#tentang"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-[#d4af37] hover:bg-[#191d2b]"
          >
            Tentang
          </Link>
          <Link
            href="/#layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-[#d4af37] hover:bg-[#191d2b]"
          >
            Layanan
          </Link>
          <Link
            href="/#galeri"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-[#d4af37] hover:bg-[#191d2b]"
          >
            Galeri
          </Link>
          <Link
            href="/#barber"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-[#d4af37] hover:bg-[#191d2b]"
          >
            Master Barber
          </Link>
          <Link
            href="/#harga"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-[#d4af37] hover:bg-[#191d2b]"
          >
            Daftar Harga
          </Link>
          <Link
            href="/#kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-[#d4af37] hover:bg-[#191d2b]"
          >
            Kontak
          </Link>
          <div className="pt-2 flex flex-col space-y-2 border-t border-gray-800">
            <Link
              href="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center w-full py-2.5 rounded-lg text-sm font-bold text-[#0b0c10] bg-[#d4af37]"
            >
              Reservasi Online Sekarang
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center w-full py-2 rounded-lg text-xs font-semibold text-gray-400 border border-gray-700"
            >
              Portal Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
