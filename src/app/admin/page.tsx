"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Appointment, formatRupiah } from "@/lib/data";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [cancelModal, setCancelModal] = useState<{ open: boolean; id: string; reason: string }>({
    open: false,
    id: "",
    reason: "",
  });
  const [actionLoading, setActionLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth");
      const data = await res.json();
      if (!data.authenticated) {
        router.push("/admin/login");
      }
    } catch {
      router.push("/admin/login");
    }
  }, [router]);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
    fetchAppointments();
  }, [checkAuth, fetchAppointments]);

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleUpdateStatus = async (id: string, status: Appointment["status"], reason?: string) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/appointments/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, cancellation_reason: reason }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchAppointments();
        setCancelModal({ open: false, id: "", reason: "" });
      } else {
        alert(data.error || "Gagal mengubah status.");
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus reservasi ${id}?`)) return;
    try {
      const res = await fetch(`/api/appointments/status?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        await fetchAppointments();
      } else {
        alert(data.error || "Gagal menghapus.");
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    }
  };

  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const completedRevenue = appointments
    .filter((a) => a.status === "completed" || a.status === "confirmed")
    .reduce((sum, a) => sum + a.total_price, 0);

  const filtered = appointments.filter((a) => {
    if (statusFilter === "all") return true;
    return a.status === statusFilter;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0d0f13", color: "#f8fafc", paddingBottom: "50px" }}>
      {/* Top Admin Navbar */}
      <nav className="navbar navbar-dark bg-dark px-4 py-3" style={{ borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span style={{ fontSize: "22px", color: "var(--primary-gold)", marginRight: "12px" }}>✂️</span>
            <div>
              <strong style={{ color: "var(--primary-gold)", fontFamily: "Playfair Display, serif", fontSize: "18px" }}>
                Barberia Luxe Admin
              </strong>
              <small className="d-block text-muted" style={{ fontSize: "11px" }}>Panel Kasir & Manajemen</small>
            </div>
          </div>
          <div>
            <Link href="/admin/services" className="btn btn-sm btn-outline-warning mr-2">
              <i className="fas fa-tags mr-1"></i> Katalog Layanan
            </Link>
            <Link href="/" target="_blank" className="btn btn-sm btn-outline-light mr-2">
              <i className="fas fa-globe mr-1"></i> Buka Website
            </Link>
            <button onClick={handleLogout} className="btn btn-sm btn-danger">
              <i className="fas fa-sign-out-alt mr-1"></i> Keluar
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", color: "#fff", margin: 0 }}>
              Dashboard Reservasi Pelanggan
            </h2>
            <p className="text-muted small mt-1 mb-0">Pantau jadwal dan perbarui status layanan pelanggan secara real-time.</p>
          </div>
          <button onClick={fetchAppointments} className="btn btn-outline-secondary btn-sm mt-2 mt-sm-0">
            <i className="fas fa-sync-alt mr-1"></i> Refresh Data
          </button>
        </div>

        {/* METRICS CARDS */}
        <div className="row mb-4">
          <div className="col-md-3 col-6 mb-3">
            <div className="card p-3" style={{ background: "#141820", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px" }}>
              <span className="text-muted small text-uppercase">Total Reservasi</span>
              <h3 className="text-white mt-1 mb-0" style={{ fontFamily: "Playfair Display, serif" }}>{totalCount}</h3>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card p-3" style={{ background: "#141820", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "10px" }}>
              <span className="text-warning small text-uppercase">Menunggu Konfirmasi</span>
              <h3 className="text-warning mt-1 mb-0" style={{ fontFamily: "Playfair Display, serif" }}>{pendingCount}</h3>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card p-3" style={{ background: "#141820", border: "1px solid rgba(59,130,246,0.3)", borderRadius: "10px" }}>
              <span className="text-info small text-uppercase">Dikonfirmasi</span>
              <h3 className="text-info mt-1 mb-0" style={{ fontFamily: "Playfair Display, serif" }}>{confirmedCount}</h3>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card p-3" style={{ background: "#141820", border: "1px solid rgba(212,175,55,0.3)", borderRadius: "10px" }}>
              <span style={{ color: "var(--primary-gold)" }} className="small text-uppercase">Estimasi Omzet</span>
              <h3 style={{ color: "var(--primary-gold)" }} className="mt-1 mb-0">{formatRupiah(completedRevenue)}</h3>
            </div>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="card" style={{ background: "#141820", border: "1px solid rgba(212,175,55,0.2)", borderRadius: "12px", overflow: "hidden" }}>
          <div className="card-header d-flex justify-content-between align-items-center flex-wrap p-3" style={{ background: "#0d0f13", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="btn-group btn-group-sm mb-2 mb-sm-0" role="group">
              {[
                { id: "all", label: "Semua", count: totalCount },
                { id: "pending", label: "Menunggu", count: pendingCount },
                { id: "confirmed", label: "Dikonfirmasi", count: confirmedCount },
                { id: "completed", label: "Selesai", count: appointments.filter((a) => a.status === "completed").length },
                { id: "cancelled", label: "Dibatalkan", count: appointments.filter((a) => a.status === "cancelled").length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  type="button"
                  className={`btn ${statusFilter === tab.id ? "btn-warning" : "btn-dark"}`}
                  style={{ fontWeight: "bold" }}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
            <span className="text-muted small">Menampilkan {filtered.length} reservasi</span>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0 text-left" style={{ fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#090a0d", color: "#94a3b8", textTransform: "uppercase", fontSize: "11px" }}>
                  <th className="p-3">Kode Booking</th>
                  <th className="p-3">Pelanggan</th>
                  <th className="p-3">Jadwal</th>
                  <th className="p-3">Barber</th>
                  <th className="p-3">Layanan</th>
                  <th className="p-3">Total Biaya</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="text-center py-5 text-muted">Memuat data reservasi...</td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-5 text-muted">Tidak ada data untuk filter ini.</td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td className="p-3 font-weight-bold" style={{ color: "var(--primary-gold)", fontFamily: "monospace" }}>
                        {item.id}
                        <small className="d-block text-muted" style={{ fontSize: "10px" }}>{item.created_at}</small>
                      </td>
                      <td className="p-3">
                        <strong className="text-white d-block">{item.client_name}</strong>
                        <span className="text-muted small d-block">{item.client_phone}</span>
                        <span className="text-muted small">{item.client_email}</span>
                        {item.notes && (
                          <div className="small text-warning mt-1" style={{ fontSize: "11px" }}>
                            <em>Catatan: {item.notes}</em>
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <strong className="d-block">{item.appointment_date}</strong>
                        <span style={{ color: "var(--primary-gold)" }}>{item.appointment_time} WIB</span>
                      </td>
                      <td className="p-3">
                        <span className="badge badge-secondary p-1.5">{item.barber_name}</span>
                      </td>
                      <td className="p-3">
                        {item.services_details.map((srv, idx) => (
                          <span key={idx} className="badge badge-dark border border-secondary p-1 mr-1 mb-1 d-inline-block">
                            {srv.name}
                          </span>
                        ))}
                      </td>
                      <td className="p-3 font-weight-bold" style={{ color: "var(--primary-gold)" }}>
                        {formatRupiah(item.total_price)}
                      </td>
                      <td className="p-3">
                        {item.status === "pending" && <span className="badge badge-warning p-1.5">MENUNGGU</span>}
                        {item.status === "confirmed" && <span className="badge badge-info p-1.5">DIKONFIRMASI</span>}
                        {item.status === "completed" && <span className="badge badge-success p-1.5">SELESAI</span>}
                        {item.status === "cancelled" && (
                          <div>
                            <span className="badge badge-danger p-1.5">DIBATALKAN</span>
                            {item.cancellation_reason && (
                              <small className="d-block text-danger mt-1">Alasan: {item.cancellation_reason}</small>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <div className="btn-group btn-group-sm">
                          {item.status === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, "confirmed")}
                              className="btn btn-success btn-sm"
                              title="Konfirmasi"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          )}
                          {item.status === "confirmed" && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, "completed")}
                              className="btn btn-info btn-sm"
                              title="Selesai"
                            >
                              <i className="fas fa-star"></i>
                            </button>
                          )}
                          {item.status !== "cancelled" && item.status !== "completed" && (
                            <button
                              onClick={() => setCancelModal({ open: true, id: item.id, reason: "" })}
                              className="btn btn-warning btn-sm"
                              title="Batalkan"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          )}
                          <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm" title="Hapus">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CANCELLATION MODAL */}
      {cancelModal.open && (
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
          <div
            className="card p-4"
            style={{
              maxWidth: "450px",
              width: "100%",
              background: "#141820",
              border: "1px solid #ef4444",
              borderRadius: "12px",
            }}
          >
            <h4 className="text-white mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
              Batalkan Reservasi {cancelModal.id}
            </h4>
            <p className="text-muted small mb-3">Tuliskan alasan pembatalan janji temu:</p>

            <textarea
              rows={3}
              value={cancelModal.reason}
              onChange={(e) => setCancelModal({ ...cancelModal, reason: e.target.value })}
              className="form-control mb-3"
              placeholder="Contoh: Pelanggan meminta reschedule mendadak..."
              style={{ background: "#0d0f13", border: "1px solid #334155", color: "#fff" }}
            ></textarea>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => setCancelModal({ open: false, id: "", reason: "" })}
                className="btn btn-secondary btn-sm mr-2"
              >
                Tutup
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleUpdateStatus(cancelModal.id, "cancelled", cancelModal.reason || "Dibatalkan admin")}
                className="btn btn-danger btn-sm"
              >
                {actionLoading ? "Menyimpan..." : "Batalkan Jadwal"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
