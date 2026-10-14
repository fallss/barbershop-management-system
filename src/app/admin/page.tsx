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

  // Check auth session
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

  // Load appointments
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

  // Metrics
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const completedRevenue = appointments
    .filter((a) => a.status === "completed" || a.status === "confirmed")
    .reduce((sum, a) => sum + a.total_price, 0);

  // Filtered List
  const filtered = appointments.filter((a) => {
    if (statusFilter === "all") return true;
    return a.status === statusFilter;
  });

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f8f9fa] pb-16">
      {/* Top Admin Navbar */}
      <header className="bg-[#141721] border-b border-[#d4af37]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl">✂️</span>
            <div>
              <span className="font-bold gold-gradient-text font-serif text-base">
                Barberia Luxe Admin
              </span>
              <span className="text-[10px] text-gray-400 block -mt-0.5">
                Panel Manajemen & Kasir
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/admin/services"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#d4af37]/40 text-[#fce8a6] hover:bg-[#d4af37]/10 transition-colors"
            >
              🏷️ Katalog Layanan
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              🌐 Lihat Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 border border-red-700/50 transition-colors"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Dashboard Reservasi Pelanggan
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Pantau jadwal, konfirmasi pemesanan masuk, dan catat riwayat layanan.
            </p>
          </div>
          <button
            onClick={fetchAppointments}
            className="self-start sm:self-auto px-4 py-2 rounded-lg bg-[#1c202e] border border-gray-700 text-xs font-semibold text-gray-300 hover:text-white hover:border-[#d4af37] transition-colors flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Refresh Data</span>
          </button>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#141721] border border-gray-800 rounded-2xl p-5 shadow">
            <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Total Reservasi</span>
            <span className="text-3xl font-extrabold text-white font-serif">{totalCount}</span>
            <span className="text-[11px] text-gray-500 block mt-1">Semua status tercatat</span>
          </div>

          <div className="bg-[#141721] border border-amber-600/30 rounded-2xl p-5 shadow">
            <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">Menunggu Konfirmasi</span>
            <span className="text-3xl font-extrabold text-amber-300 font-serif">{pendingCount}</span>
            <span className="text-[11px] text-amber-400/70 block mt-1">Perlu tindakan verifikasi</span>
          </div>

          <div className="bg-[#141721] border border-blue-600/30 rounded-2xl p-5 shadow">
            <span className="text-[10px] uppercase font-bold text-blue-400 block mb-1">Dikonfirmasi</span>
            <span className="text-3xl font-extrabold text-blue-300 font-serif">{confirmedCount}</span>
            <span className="text-[11px] text-blue-400/70 block mt-1">Siap untuk sesi layanan</span>
          </div>

          <div className="bg-[#141721] border border-[#d4af37]/30 rounded-2xl p-5 shadow">
            <span className="text-[10px] uppercase font-bold text-[#fce8a6] block mb-1">Estimasi Pendapatan</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#fce8a6] font-serif">
              {formatRupiah(completedRevenue)}
            </span>
            <span className="text-[11px] text-gray-400 block mt-1">Booking terverifikasi & selesai</span>
          </div>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-[#141721] rounded-2xl border border-[#d4af37]/20 overflow-hidden shadow-xl">
          {/* Filter Bar */}
          <div className="p-4 sm:p-5 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === tab.id
                      ? "bg-[#d4af37] text-[#0b0c10]"
                      : "bg-[#0b0c10] text-gray-400 hover:text-white border border-gray-800"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            <span className="text-xs text-gray-400">
              Menampilkan {filtered.length} dari {appointments.length} data
            </span>
          </div>

          {/* Table */}
          {loading ? (
            <div className="py-20 text-center text-gray-400 text-sm">Memuat data reservasi...</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-500 text-sm">Tidak ada data reservasi pada filter ini.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0b0c10] text-gray-400 uppercase tracking-wider text-[10px] border-b border-gray-800">
                  <tr>
                    <th className="py-3 px-4">Kode / ID</th>
                    <th className="py-3 px-4">Pelanggan</th>
                    <th className="py-3 px-4">Jadwal & Jam</th>
                    <th className="py-3 px-4">Master Barber</th>
                    <th className="py-3 px-4">Layanan</th>
                    <th className="py-3 px-4">Total Biaya</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-[#191d2b] transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-[#fce8a6] whitespace-nowrap">
                        {item.id}
                        <span className="text-[10px] text-gray-500 block font-normal">{item.created_at}</span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-white">{item.client_name}</div>
                        <div className="text-gray-400 text-[11px]">{item.client_phone}</div>
                        <div className="text-gray-500 text-[10px]">{item.client_email}</div>
                        {item.notes && (
                          <div className="text-[10px] text-amber-300/80 italic mt-0.5 max-w-xs truncate" title={item.notes}>
                            Catatan: {item.notes}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-white">{item.appointment_date}</div>
                        <div className="text-[#d4af37] font-semibold">{item.appointment_time} WIB</div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded bg-[#0b0c10] border border-gray-800 text-gray-300 font-medium">
                          {item.barber_name}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          {item.services_details.map((srv, idx) => (
                            <span
                              key={idx}
                              className="inline-block text-[11px] bg-[#1c202e] text-gray-300 px-2 py-0.5 rounded mr-1 mb-1 border border-gray-700"
                            >
                              {srv.name}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap font-serif font-bold text-[#fce8a6]">
                        {formatRupiah(item.total_price)}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {item.status === "pending" && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-950/80 text-amber-300 border border-amber-600/50">
                            Menunggu
                          </span>
                        )}
                        {item.status === "confirmed" && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-blue-950/80 text-blue-300 border border-blue-500/50">
                            Dikonfirmasi
                          </span>
                        )}
                        {item.status === "completed" && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-green-950/80 text-green-300 border border-green-500/50">
                            Selesai
                          </span>
                        )}
                        {item.status === "cancelled" && (
                          <div>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-red-950/80 text-red-300 border border-red-500/50">
                              Dibatalkan
                            </span>
                            {item.cancellation_reason && (
                              <span className="block text-[10px] text-red-400 mt-1 max-w-xs truncate" title={item.cancellation_reason}>
                                Alasan: {item.cancellation_reason}
                              </span>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          {item.status === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, "confirmed")}
                              className="px-2 py-1 rounded bg-green-900/60 hover:bg-green-800 text-green-200 border border-green-700/50 font-bold text-[10px]"
                              title="Konfirmasi Booking"
                            >
                              ✓ Konfirmasi
                            </button>
                          )}

                          {item.status === "confirmed" && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, "completed")}
                              className="px-2 py-1 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50 font-bold text-[10px]"
                              title="Tandai Selesai"
                            >
                              ★ Selesai
                            </button>
                          )}

                          {item.status !== "cancelled" && item.status !== "completed" && (
                            <button
                              onClick={() => setCancelModal({ open: true, id: item.id, reason: "" })}
                              className="px-2 py-1 rounded bg-amber-950/60 hover:bg-amber-900 text-amber-200 border border-amber-800 font-bold text-[10px]"
                              title="Batalkan Booking"
                            >
                              ✕ Batalkan
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 rounded text-gray-500 hover:text-red-400 transition-colors"
                            title="Hapus Data"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* CANCELLATION REASON MODAL */}
      {cancelModal.open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#141721] border border-red-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-serif">
              Batalkan Reservasi {cancelModal.id}
            </h3>
            <p className="text-xs text-gray-400">
              Silakan masukkan alasan pembatalan untuk catatan riwayat pelanggan dan staf.
            </p>

            <textarea
              rows={3}
              value={cancelModal.reason}
              onChange={(e) => setCancelModal({ ...cancelModal, reason: e.target.value })}
              placeholder="Contoh: Pelanggan meminta reschedule karena urusan mendadak, atau slot barber telah penuh..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-xs focus:border-[#d4af37] focus:outline-none"
            />

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelModal({ open: false, id: "", reason: "" })}
                className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold hover:bg-gray-700"
              >
                Tutup
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleUpdateStatus(cancelModal.id, "cancelled", cancelModal.reason || "Dibatalkan oleh staf admin")}
                className="px-5 py-2 rounded-xl bg-red-800 hover:bg-red-700 text-white text-xs font-bold transition-colors disabled:opacity-50"
              >
                {actionLoading ? "Menyimpan..." : "Konfirmasi Pembatalan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
