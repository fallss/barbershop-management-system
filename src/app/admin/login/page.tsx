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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0d0f13 0%, #171b24 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "440px",
          width: "100%",
          background: "#141820",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "16px",
          padding: "36px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.7)",
        }}
      >
        <div className="text-center mb-4">
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4af37, #aa8014)",
              margin: "0 auto 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#0d0f13",
              boxShadow: "0 8px 20px rgba(212,175,55,0.25)",
            }}
          >
            <i className="fas fa-user-shield"></i>
          </div>
          <span style={{ color: "var(--primary-gold)", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" }}>
            PORTAL ADMINISTRATOR & KASIR
          </span>
          <h2 style={{ color: "#fff", fontSize: "24px", margin: "6px 0 0", fontFamily: "Playfair Display, serif" }}>
            Barberia Luxe Admin
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "13px", marginTop: "4px" }}>
            Kelola jadwal reservasi, staf barber, dan menu layanan.
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div
          className="p-3 mb-4 rounded d-flex justify-content-between align-items-center"
          style={{
            background: "#1c202e",
            border: "1px dashed rgba(212,175,55,0.4)",
            fontSize: "12px",
          }}
        >
          <div>
            <span style={{ color: "#94a3b8", display: "block", fontSize: "10px", textTransform: "uppercase" }}>Demo Akun:</span>
            <span style={{ color: "#fff", fontFamily: "monospace" }}>User: <strong>admin</strong> | Pass: <strong>admin123</strong></span>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="btn btn-sm"
            style={{
              background: "var(--primary-gold)",
              color: "#0d0f13",
              fontWeight: "bold",
              fontSize: "11px",
              padding: "4px 10px",
            }}
          >
            Auto Isi
          </button>
        </div>

        {error && (
          <div className="alert alert-danger p-2 small mb-3" role="alert">
            <i className="fas fa-exclamation-circle mr-1"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ color: "#cbd5e1", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="admin"
              style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ color: "#cbd5e1", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" }}>
              Kata Sandi
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="••••••••"
              style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="default_btn w-100 justify-content-center py-2.5"
            style={{ fontSize: "14px" }}
          >
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"} <i className="fas fa-sign-in-alt ml-2"></i>
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <Link href="/" style={{ color: "#94a3b8", fontSize: "12px", textDecoration: "none" }}>
            ← Kembali ke Website Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
