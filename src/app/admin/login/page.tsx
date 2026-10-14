"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.error || "Gagal masuk.");
      }
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = () => {
    setUsername("admin");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#141721] border border-[#d4af37]/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa8014] mx-auto flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
            <span className="text-2xl">🔒</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block">
            Portal Khusus Staf & Administrator
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Barberia Luxe Admin
          </h2>
          <p className="text-xs text-gray-400">
            Kelola reservasi pelanggan, jadwal master barber, dan katalog layanan.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-[#1c202e] border border-dashed border-[#d4af37]/40 rounded-xl p-3.5 mb-6 text-xs flex items-center justify-between">
          <div>
            <span className="text-gray-400 block text-[10px] uppercase font-semibold">Demo Akun:</span>
            <span className="text-white font-mono">User: <strong>admin</strong> | Pass: <strong>admin123</strong></span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="px-2.5 py-1 rounded bg-[#d4af37] text-[#0b0c10] font-bold text-[11px] hover:bg-white transition-colors"
          >
            Auto Isi
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username admin"
              className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
              Kata Sandi (Password)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
          >
            {loading ? "Memverifikasi Kredensial..." : "Masuk ke Dashboard →"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <Link
            href="/"
            className="text-xs text-gray-400 hover:text-[#d4af37] transition-colors"
          >
            ← Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
