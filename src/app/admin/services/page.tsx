"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_SERVICES, INITIAL_CATEGORIES, formatRupiah, Service } from "@/lib/data";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([...INITIAL_SERVICES]);
  const [newServiceModal, setNewServiceModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category_id: 1,
    description: "",
    price: 65000,
    duration_min: 45,
    popular: false,
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const maxId = services.reduce((max, s) => Math.max(max, s.id), 0);
    const newSrv: Service = {
      id: maxId + 1,
      name: form.name,
      category_id: Number(form.category_id),
      description: form.description,
      price: Number(form.price),
      duration_min: Number(form.duration_min),
      popular: form.popular,
    };
    setServices([...services, newSrv]);
    setNewServiceModal(false);
    setForm({
      name: "",
      category_id: 1,
      description: "",
      price: 65000,
      duration_min: 45,
      popular: false,
    });
  };

  const handleDeleteService = (id: number, name: string) => {
    if (!confirm(`Hapus layanan "${name}" dari katalog?`)) return;
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0f13", color: "#f8fafc", paddingBottom: "50px" }}>
      <nav className="navbar navbar-dark bg-dark px-4 py-3" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link href="/admin" className="text-warning font-weight-bold" style={{ textDecoration: "none" }}>
            <i className="fas fa-arrow-left mr-2"></i> Kembali ke Dashboard
          </Link>
          <button onClick={() => setNewServiceModal(true)} className="btn btn-warning btn-sm font-weight-bold">
            <i className="fas fa-plus mr-1"></i> Tambah Layanan Baru
          </button>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">
        <div className="mb-4">
          <h2 style={{ fontFamily: "Playfair Display, serif", color: "#fff", margin: 0 }}>
            Katalog Layanan & Perawatan Barbershop
          </h2>
          <p className="text-muted small mt-1">Atur menu servis, tarif Rupiah, dan durasi pengerjaan.</p>
        </div>

        <div className="card" style={{ background: "#141820", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px", overflow: "hidden" }}>
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0 text-left" style={{ fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#090a0d", color: "#94a3b8", textTransform: "uppercase", fontSize: "11px" }}>
                  <th className="p-3">ID</th>
                  <th className="p-3">Nama Layanan</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3">Deskripsi</th>
                  <th className="p-3">Durasi</th>
                  <th className="p-3">Tarif</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {services.map((item) => {
                  const cat = INITIAL_CATEGORIES.find((c) => c.id === item.category_id);
                  return (
                    <tr key={item.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td className="p-3 font-weight-bold text-muted">#{item.id}</td>
                      <td className="p-3">
                        <strong className="text-white">{item.name}</strong>
                        {item.popular && (
                          <span className="badge badge-warning ml-2 font-weight-bold">FAVORIT</span>
                        )}
                      </td>
                      <td className="p-3 text-muted">{cat ? `${cat.icon} ${cat.name}` : "-"}</td>
                      <td className="p-3 text-muted small" style={{ maxWidth: "300px" }}>{item.description}</td>
                      <td className="p-3 text-warning font-weight-bold">{item.duration_min} Menit</td>
                      <td className="p-3 font-weight-bold" style={{ color: "var(--primary-gold)" }}>{formatRupiah(item.price)}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteService(item.id, item.name)}
                          className="btn btn-danger btn-sm"
                        >
                          <i className="fas fa-trash-alt mr-1"></i> Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {newServiceModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div className="card p-4" style={{ maxWidth: "480px", width: "100%", background: "#141820", border: "1px solid var(--primary-gold)", borderRadius: "12px" }}>
            <h4 className="text-white mb-3" style={{ fontFamily: "Playfair Display, serif" }}>Tambah Layanan Baru</h4>

            <form onSubmit={handleAddService}>
              <div className="form-group mb-2">
                <label className="text-light small font-weight-bold">Nama Layanan *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-control"
                  placeholder="Contoh: Royal Hot Towel Shave"
                  style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
                />
              </div>

              <div className="form-group mb-2">
                <label className="text-light small font-weight-bold">Kategori *</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                  className="form-control"
                  style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
                >
                  {INITIAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row mb-2">
                <div className="col">
                  <label className="text-light small font-weight-bold">Tarif (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="form-control"
                    style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
                  />
                </div>
                <div className="col">
                  <label className="text-light small font-weight-bold">Durasi (Menit) *</label>
                  <input
                    type="number"
                    required
                    value={form.duration_min}
                    onChange={(e) => setForm({ ...form, duration_min: Number(e.target.value) })}
                    className="form-control"
                    style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="text-light small font-weight-bold">Deskripsi Layanan *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="form-control"
                  placeholder="Jelaskan fasilitas dan cara pengerjaan..."
                  style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
                ></textarea>
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  id="pop"
                  checked={form.popular}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  className="form-check-input"
                />
                <label htmlFor="pop" className="form-check-label text-light small">
                  Tandai sebagai Layanan Favorit / Unggulan
                </label>
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" onClick={() => setNewServiceModal(false)} className="btn btn-secondary btn-sm mr-2">
                  Batal
                </button>
                <button type="submit" className="btn btn-warning btn-sm font-weight-bold">
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
