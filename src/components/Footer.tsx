import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#07080a] border-t border-[#d4af37]/20 pt-16 pb-10 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa8014] flex items-center justify-center">
                <span className="text-xl">✂️</span>
              </div>
              <span className="text-xl font-bold gold-gradient-text font-serif uppercase tracking-wider">
                Barberia Luxe
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Pengalaman potong rambut dan perawatan pria kelas premium di Jakarta. Memadukan tradisi seni cukur klasik Eropa dengan teknik modern kontemporer.
            </p>
            <div className="flex space-x-3 pt-2">
              <span className="w-9 h-9 rounded-full bg-[#141721] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] text-sm hover:scale-110 cursor-pointer transition-transform">
                📷
              </span>
              <span className="w-9 h-9 rounded-full bg-[#141721] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] text-sm hover:scale-110 cursor-pointer transition-transform">
                💬
              </span>
              <span className="w-9 h-9 rounded-full bg-[#141721] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] text-sm hover:scale-110 cursor-pointer transition-transform">
                📍
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider font-serif border-b border-[#d4af37]/20 pb-2">
              Tautan Cepat
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#d4af37] transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#tentang" className="hover:text-[#d4af37] transition-colors">
                  Tentang Barberia
                </Link>
              </li>
              <li>
                <Link href="/#layanan" className="hover:text-[#d4af37] transition-colors">
                  Layanan & Menu
                </Link>
              </li>
              <li>
                <Link href="/#barber" className="hover:text-[#d4af37] transition-colors">
                  Profil Master Barber
                </Link>
              </li>
              <li>
                <Link href="/#harga" className="hover:text-[#d4af37] transition-colors">
                  Daftar Harga Lengkap
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-[#d4af37] hover:underline font-semibold">
                  Reservasi Jadwal Online →
                </Link>
              </li>
            </ul>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider font-serif border-b border-[#d4af37]/20 pb-2">
              Jam Operasional
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>Senin - Jumat</span>
                <span className="text-white font-semibold">09:00 - 21:00 WIB</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>Sabtu - Minggu</span>
                <span className="text-white font-semibold">08:30 - 21:30 WIB</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>Hari Libur Nasional</span>
                <span className="text-[#d4af37] font-semibold">Tetap Buka</span>
              </div>
              <p className="text-xs text-gray-500 pt-1">
                *Reservasi online disarankan untuk menghindari antrean di akhir pekan.
              </p>
            </div>
          </div>

          {/* Lokasi & Kontak */}
          <div>
            <h4 className="text-white text-base font-bold mb-4 uppercase tracking-wider font-serif border-b border-[#d4af37]/20 pb-2">
              Lokasi & Reservasi
            </h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start space-x-2">
                <span className="text-base text-[#d4af37]">📍</span>
                <span>Jl. Senopati Raya No. 88, Kebayoran Baru, Jakarta Selatan 12190</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-base text-[#d4af37]">📞</span>
                <span>(021) 720-8899</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-base text-[#d4af37]">💬</span>
                <span>+62 812-3456-7890 (WhatsApp)</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-base text-[#d4af37]">✉️</span>
                <span>reservasi@barberialuxe.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and admin gateway */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Barberia Luxe Indonesia. Seluruh Hak Cipta Dilindungi.</p>
          <div className="flex items-center space-x-6">
            <span>Privasi & Syarat Ketentuan</span>
            <Link
              href="/admin/login"
              className="text-gray-400 hover:text-[#d4af37] transition-colors flex items-center space-x-1"
            >
              <span>🔒</span>
              <span>Portal Staf & Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
