"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Appointment, INITIAL_SERVICES, INITIAL_BARBERS, INITIAL_CATEGORIES, formatRupiah, Service } from "@/lib/data";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"appointments" | "services" | "barbers" | "clients">("appointments");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all"); // "all", "today", "tomorrow", "upcoming"
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [actionLoading, setActionLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Receipt / Ticket Modal
  const [receiptModal, setReceiptModal] = useState<{ open: boolean; appointment: Appointment | null }>({
    open: false,
    appointment: null,
  });

  // Cancel Modal
  const [cancelModal, setCancelModal] = useState<{ open: boolean; id: string; reason: string }>({
    open: false,
    id: "",
    reason: "",
  });

  // Walk-In Booking Modal
  const [walkinModal, setWalkinModal] = useState(false);
  const [walkinForm, setWalkinForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    serviceId: 1,
    barberId: 1,
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    notes: "Walk-in Customer",
  });

  // Add Service Modal
  const [serviceModal, setServiceModal] = useState(false);
  const [newService, setNewService] = useState({
    categoryId: 1,
    name: "",
    description: "",
    price: 50000,
    duration: 30,
  });

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Live Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      console.error("Gagal mengambil data reservasi:", err);
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
        const labels: Record<string, string> = {
          confirmed: "Dikonfirmasi",
          completed: "Tandai Selesai",
          cancelled: "Dibatalkan",
        };
        showToast(`Status reservasi ${id} berhasil diperbarui: ${labels[status] || status}!`, "success");
      } else {
        showToast(data.error || "Gagal mengubah status.", "error");
      }
    } catch {
      showToast("Terjadi kesalahan jaringan.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus reservasi ${id}? Tindakan ini permanen.`)) return;
    try {
      const res = await fetch(`/api/appointments/status?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        await fetchAppointments();
        showToast(`Reservasi ${id} berhasil dihapus dari sistem.`, "info");
      } else {
        showToast(data.error || "Gagal menghapus.", "error");
      }
    } catch {
      showToast("Terjadi kesalahan jaringan.", "error");
    }
  };

  const handleCreateWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinForm.clientName || !walkinForm.clientPhone) {
      showToast("Nama dan nomor WhatsApp pelanggan wajib diisi!", "error");
      return;
    }

    const srv = services.find((s) => s.id === walkinForm.serviceId) || services[0];
    const bbr = INITIAL_BARBERS.find((b) => b.id === walkinForm.barberId) || INITIAL_BARBERS[0];

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: walkinForm.clientName,
          client_phone: walkinForm.clientPhone,
          client_email: walkinForm.clientEmail || "walkin@barberialuxe.id",
          barber_id: bbr.id,
          barber_name: bbr.name,
          appointment_date: walkinForm.date,
          appointment_time: walkinForm.time,
          services: [srv.id],
          services_details: [{ id: srv.id, name: srv.name, price: srv.price, duration: srv.duration_min }],
          total_price: srv.price,
          total_duration: srv.duration_min,
          notes: walkinForm.notes,
        }),
      });

      if (res.ok) {
        await fetchAppointments();
        setWalkinModal(false);
        setWalkinForm({
          clientName: "",
          clientPhone: "",
          clientEmail: "",
          serviceId: 1,
          barberId: 1,
          date: new Date().toISOString().split("T")[0],
          time: "10:00",
          notes: "Walk-in Customer",
        });
        showToast("Reservasi walk-in berhasil ditambahkan ke jadwal!", "success");
      }
    } catch {
      showToast("Gagal menambahkan reservasi walk-in.", "error");
    }
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim()) return;
    const item: Service = {
      id: Date.now(),
      category_id: newService.categoryId,
      name: newService.name.trim(),
      description: newService.description.trim() || "Layanan grooming pria premium.",
      price: Number(newService.price),
      duration_min: Number(newService.duration),
    };
    setServices([...services, item]);
    setServiceModal(false);
    setNewService({
      categoryId: 1,
      name: "",
      description: "",
      price: 50000,
      duration: 30,
    });
    showToast(`Layanan "${item.name}" berhasil ditambahkan ke katalog!`, "success");
  };

  // Export CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) {
      showToast("Tidak ada data reservasi untuk diekspor.", "info");
      return;
    }
    const headers = ["Kode Booking", "Nama Pelanggan", "WhatsApp", "Email", "Barber", "Tanggal", "Jam", "Total (Rp)", "Status", "Catatan"];
    const rows = filteredAppointments.map((a) => [
      a.id,
      `"${a.client_name.replace(/"/g, '""')}"`,
      `'${a.client_phone}`,
      a.client_email,
      `"${a.barber_name}"`,
      a.appointment_date,
      a.appointment_time,
      a.total_price,
      a.status,
      `"${(a.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `barberia_luxe_reservasi_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("File CSV reservasi berhasil diunduh!", "success");
  };

  // Metrics
  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const completedCount = appointments.filter((a) => a.status === "completed").length;
  const todayCount = appointments.filter((a) => a.appointment_date === todayStr).length;
  const completedRevenue = appointments
    .filter((a) => a.status === "completed" || a.status === "confirmed")
    .reduce((sum, a) => sum + a.total_price, 0);

  // Filtered Appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const matchQuery =
      !searchQuery ||
      a.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.client_phone.includes(searchQuery);

    let matchDate = true;
    if (dateFilter === "today") {
      matchDate = a.appointment_date === todayStr;
    } else if (dateFilter === "tomorrow") {
      matchDate = a.appointment_date === tomorrowStr;
    } else if (dateFilter === "upcoming") {
      matchDate = a.appointment_date >= todayStr;
    }

    return matchStatus && matchQuery && matchDate;
  });

  // Client database aggregation
  const clientMap = new Map<string, { name: string; phone: string; email: string; totalVisits: number; totalSpent: number; lastVisit: string }>();
  appointments.forEach((a) => {
    const key = a.client_phone || a.client_name;
    const existing = clientMap.get(key);
    if (existing) {
      existing.totalVisits += 1;
      existing.totalSpent += a.total_price;
      if (a.appointment_date > existing.lastVisit) {
        existing.lastVisit = a.appointment_date;
      }
    } else {
      clientMap.set(key, {
        name: a.client_name,
        phone: a.client_phone,
        email: a.client_email,
        totalVisits: 1,
        totalSpent: a.total_price,
        lastVisit: a.appointment_date,
      });
    }
  });
  const clientsList = Array.from(clientMap.values());

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0c10", color: "#f8fafc", display: "flex", flexDirection: "column" }}>
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "24px",
            zIndex: 99999,
            padding: "12px 20px",
            borderRadius: "10px",
            background: toast.type === "success" ? "#064e3b" : toast.type === "error" ? "#7f1d1d" : "#1e293b",
            color: "#fff",
            border: `1px solid ${toast.type === "success" ? "#10b981" : toast.type === "error" ? "#ef4444" : "#94a3b8"}`,
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
            fontSize: "13px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <i
            className={`fas ${
              toast.type === "success"
                ? "fa-check-circle text-success"
                : toast.type === "error"
                ? "fa-exclamation-triangle text-danger"
                : "fa-info-circle text-info"
            }`}
          ></i>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header
        style={{
          background: "rgba(18, 22, 31, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(212, 175, 55, 0.25)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: "12px 24px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #d4af37, #997415)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0b0c10",
                fontSize: "20px",
                boxShadow: "0 4px 15px rgba(212, 175, 55, 0.3)",
              }}
            >
              <i className="fas fa-cut"></i>
            </div>
            <div>
              <div style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "18px", color: "var(--primary-gold)", letterSpacing: "1px" }}>
                BARBERIA LUXE ADMIN
              </div>
              <small style={{ color: "#94a3b8", fontSize: "11px" }}>Executive Barbershop & Salon Console</small>
            </div>
          </div>

          {/* Quick Info & Action Bar */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div
              className="d-none d-md-flex align-items-center px-3 py-1.5 rounded"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "#cbd5e1" }}
            >
              <i className="far fa-clock mr-2" style={{ color: "var(--primary-gold)" }}></i>
              <span>{currentTime || "WIB"}</span>
            </div>

            <button
              onClick={() => setWalkinModal(true)}
              className="btn btn-sm"
              style={{
                background: "linear-gradient(135deg, #d4af37 0%, #aa8524 100%)",
                color: "#0b0c10",
                fontWeight: 700,
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "12px",
                boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3)",
              }}
            >
              <i className="fas fa-plus-circle mr-1"></i> + Booking Walk-In
            </button>

            <button
              onClick={handleExportCSV}
              className="btn btn-sm btn-outline-warning"
              style={{ borderRadius: "8px", fontSize: "12px", padding: "8px 14px", color: "var(--primary-gold)", borderColor: "rgba(212,175,55,0.4)" }}
              title="Unduh Data Reservasi dalam Format CSV/Excel"
            >
              <i className="fas fa-file-excel mr-1"></i> Unduh CSV
            </button>

            <Link
              href="/"
              target="_blank"
              className="btn btn-sm btn-outline-secondary"
              style={{ borderRadius: "8px", fontSize: "12px", padding: "8px 14px", color: "#cbd5e1", borderColor: "rgba(255,255,255,0.2)" }}
            >
              <i className="fas fa-external-link-alt mr-1"></i> Web Publik
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline-danger"
              style={{ borderRadius: "8px", fontSize: "12px", padding: "8px 14px" }}
            >
              <i className="fas fa-sign-out-alt mr-1"></i> Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Workspace */}
      <div className="d-flex flex-grow-1">
        {/* Navigation Sidebar */}
        <aside
          style={{
            width: "250px",
            minWidth: "250px",
            background: "#10131a",
            borderRight: "1px solid rgba(255, 255, 255, 0.06)",
            padding: "24px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
          className="d-none d-lg-flex"
        >
          <span style={{ fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", color: "#64748b", padding: "0 12px 8px 12px", letterSpacing: "1px" }}>
            Menu Operasional
          </span>

          <button
            onClick={() => setActiveTab("appointments")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "appointments" ? "rgba(212, 175, 55, 0.12)" : "transparent",
              color: activeTab === "appointments" ? "var(--primary-gold)" : "#94a3b8",
              fontWeight: activeTab === "appointments" ? 700 : 500,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="fas fa-calendar-alt" style={{ width: "20px" }}></i>
              <span>Daftar Reservasi</span>
            </div>
            {pendingCount > 0 && (
              <span className="badge badge-warning" style={{ background: "rgba(245,158,11,0.2)", color: "#fbbf24", fontSize: "11px" }}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("services")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "services" ? "rgba(212, 175, 55, 0.12)" : "transparent",
              color: activeTab === "services" ? "var(--primary-gold)" : "#94a3b8",
              fontWeight: activeTab === "services" ? 700 : 500,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="fas fa-tags" style={{ width: "20px" }}></i>
              <span>Katalog Layanan</span>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>{services.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("barbers")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "barbers" ? "rgba(212, 175, 55, 0.12)" : "transparent",
              color: activeTab === "barbers" ? "var(--primary-gold)" : "#94a3b8",
              fontWeight: activeTab === "barbers" ? 700 : 500,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="fas fa-user-friends" style={{ width: "20px" }}></i>
              <span>Tim Barber</span>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>{INITIAL_BARBERS.length}</span>
          </button>

          <button
            onClick={() => setActiveTab("clients")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "12px 14px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "clients" ? "rgba(212, 175, 55, 0.12)" : "transparent",
              color: activeTab === "clients" ? "var(--primary-gold)" : "#94a3b8",
              fontWeight: activeTab === "clients" ? 700 : 500,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="far fa-address-book" style={{ width: "20px" }}></i>
              <span>Database Pelanggan</span>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>{clientsList.length}</span>
          </button>

          <div className="mt-auto p-3 rounded" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge badge-success" style={{ background: "#10b981", width: "8px", height: "8px", borderRadius: "50%", padding: 0 }}></span>
              <span style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: 600 }}>Sistem Operasional</span>
            </div>
            <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
              Sesi aktif sebagai <strong>Admin</strong>. Data tersimpan otomatis & aman.
            </p>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-grow-1 p-4" style={{ overflowY: "auto" }}>
          {/* Mobile Tab Selector */}
          <div className="d-lg-none mb-4 d-flex gap-2 overflow-auto pb-2">
            {[
              { id: "appointments", label: "Reservasi", icon: "fas fa-calendar-alt" },
              { id: "services", label: "Layanan", icon: "fas fa-tags" },
              { id: "barbers", label: "Barber", icon: "fas fa-user-friends" },
              { id: "clients", label: "Pelanggan", icon: "far fa-address-book" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className="btn btn-sm"
                style={{
                  background: activeTab === t.id ? "var(--primary-gold)" : "#181d28",
                  color: activeTab === t.id ? "#0b0c10" : "#fff",
                  fontWeight: 600,
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                <i className={`${t.icon} mr-1`}></i> {t.label}
              </button>
            ))}
          </div>

          {/* TAB 1: APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div>
              {/* METRIC STATS */}
              <div className="row mb-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div
                    className="p-3.5 rounded-xl h-100"
                    style={{
                      background: "linear-gradient(135deg, #131722 0%, #192030 100%)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "14px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.5px" }}>
                        Total Reservasi
                      </span>
                      <i className="fas fa-calendar-check" style={{ color: "#94a3b8" }}></i>
                    </div>
                    <h3 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#fff", fontFamily: "Playfair Display, serif" }}>
                      {totalCount} <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 400 }}>jadwal</span>
                    </h3>
                    <small className="text-muted" style={{ fontSize: "11px" }}>{todayCount} jadwal terjadwal hari ini</small>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div
                    className="p-3.5 rounded-xl h-100"
                    style={{
                      background: "linear-gradient(135deg, #1f1b13 0%, #292015 100%)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      borderRadius: "14px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ fontSize: "12px", color: "#f59e0b", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.5px" }}>
                        Menunggu Konfirmasi
                      </span>
                      <i className="fas fa-hourglass-half" style={{ color: "#f59e0b" }}></i>
                    </div>
                    <h3 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#fbbf24", fontFamily: "Playfair Display, serif" }}>
                      {pendingCount} <span style={{ fontSize: "14px", color: "#d97706", fontWeight: 400 }}>antrean</span>
                    </h3>
                    <small className="text-muted" style={{ fontSize: "11px" }}>Perlu respon cepat via WhatsApp</small>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div
                    className="p-3.5 rounded-xl h-100"
                    style={{
                      background: "linear-gradient(135deg, #101c1c 0%, #132626 100%)",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                      borderRadius: "14px",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ fontSize: "12px", color: "#10b981", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.5px" }}>
                        Selesai / Dilayani
                      </span>
                      <i className="fas fa-check-double" style={{ color: "#10b981" }}></i>
                    </div>
                    <h3 style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#34d399", fontFamily: "Playfair Display, serif" }}>
                      {completedCount} <span style={{ fontSize: "14px", color: "#059669", fontWeight: 400 }}>selesai</span>
                    </h3>
                    <small className="text-muted" style={{ fontSize: "11px" }}>{confirmedCount} status dikonfirmasi aktif</small>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div
                    className="p-3.5 rounded-xl h-100"
                    style={{
                      background: "linear-gradient(135deg, #1c1811 0%, #2e2410 100%)",
                      border: "1px solid rgba(212, 175, 55, 0.35)",
                      borderRadius: "14px",
                      boxShadow: "0 8px 24px rgba(212, 175, 55, 0.1)",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span style={{ fontSize: "12px", color: "var(--primary-gold)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.5px" }}>
                        Estimasi Omzet
                      </span>
                      <i className="fas fa-coins" style={{ color: "var(--primary-gold)" }}></i>
                    </div>
                    <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "var(--primary-gold)", fontFamily: "Playfair Display, serif" }}>
                      {formatRupiah(completedRevenue)}
                    </h3>
                    <small className="text-muted" style={{ fontSize: "11px" }}>Dari transaksi aktif & selesai</small>
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTER CONTROLS */}
              <div
                className="p-3 mb-4 rounded-xl d-flex justify-content-between align-items-center flex-wrap gap-3"
                style={{ background: "#131722", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" }}
              >
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {/* Status buttons */}
                  {[
                    { id: "all", label: "Semua", count: totalCount },
                    { id: "pending", label: "Menunggu", count: pendingCount },
                    { id: "confirmed", label: "Dikonfirmasi", count: confirmedCount },
                    { id: "completed", label: "Selesai", count: completedCount },
                    { id: "cancelled", label: "Dibatalkan", count: appointments.filter((a) => a.status === "cancelled").length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      className="btn btn-sm"
                      style={{
                        background: statusFilter === tab.id ? "var(--primary-gold)" : "rgba(255,255,255,0.05)",
                        color: statusFilter === tab.id ? "#0b0c10" : "#cbd5e1",
                        fontWeight: 600,
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    >
                      {tab.label} <span className="opacity-75">({tab.count})</span>
                    </button>
                  ))}

                  {/* Date Filter */}
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="form-control form-control-sm"
                    style={{
                      background: "#0b0c10",
                      borderColor: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      fontSize: "12px",
                      width: "auto",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="all">📅 Semua Tanggal</option>
                    <option value="today">Hari Ini ({todayCount})</option>
                    <option value="tomorrow">Besok</option>
                    <option value="upcoming">Mendatang</option>
                  </select>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <div className="input-group input-group-sm" style={{ width: "240px" }}>
                    <div className="input-group-prepend">
                      <span className="input-group-text" style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#94a3b8" }}>
                        <i className="fas fa-search"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari pelanggan/kode..."
                      className="form-control"
                      style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff", fontSize: "12px" }}
                    />
                  </div>

                  <button onClick={fetchAppointments} className="btn btn-sm btn-outline-secondary" style={{ borderRadius: "8px" }} title="Muat Ulang Data">
                    <i className="fas fa-sync-alt"></i>
                  </button>
                </div>
              </div>

              {/* RESERVATIONS TABLE */}
              <div
                className="card"
                style={{
                  background: "#131722",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                }}
              >
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0" style={{ fontSize: "13px" }}>
                    <thead>
                      <tr style={{ background: "#0c0e14", color: "#94a3b8", textTransform: "uppercase", fontSize: "11px", letterSpacing: "0.5px" }}>
                        <th className="p-3">Kode Booking</th>
                        <th className="p-3">Pelanggan</th>
                        <th className="p-3">Jadwal & Jam</th>
                        <th className="p-3">Barber</th>
                        <th className="p-3">Layanan</th>
                        <th className="p-3">Total Biaya</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Aksi Manajemen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={8} className="text-center py-5 text-muted">
                            <i className="fas fa-spinner fa-spin mr-2"></i> Memuat data reservasi...
                          </td>
                        </tr>
                      ) : filteredAppointments.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="text-center py-5 text-muted">
                            Tidak ada reservasi yang cocok dengan kriteria filter.
                          </td>
                        </tr>
                      ) : (
                        filteredAppointments.map((item) => {
                          const waMessage = encodeURIComponent(
                            `Halo Kak ${item.client_name}, ini dari Barberia Luxe.\n` +
                            `Mengenai jadwal booking ${item.id} pada tanggal ${item.appointment_date} jam ${item.appointment_time} WIB bersama ${item.barber_name}.\n` +
                            `Apakah ada yang perlu kami siapkan? Terima kasih!`
                          );

                          return (
                            <tr key={item.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                              <td className="p-3">
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                    onClick={() => setReceiptModal({ open: true, appointment: item })}
                                    className="btn btn-sm p-1"
                                    style={{ color: "var(--primary-gold)", background: "rgba(212,175,55,0.1)", border: "none", borderRadius: "4px" }}
                                    title="Lihat / Cetak Struk"
                                  >
                                    <i className="fas fa-receipt"></i>
                                  </button>
                                  <div>
                                    <strong style={{ color: "var(--primary-gold)", fontFamily: "monospace", fontSize: "13px" }}>
                                      {item.id}
                                    </strong>
                                    <small className="d-block text-muted" style={{ fontSize: "10.5px" }}>
                                      {item.created_at}
                                    </small>
                                  </div>
                                </div>
                              </td>

                              <td className="p-3">
                                <strong className="text-white d-block">{item.client_name}</strong>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                  <a
                                    href={`https://wa.me/${item.client_phone.replace(/^0/, "62")}?text=${waMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="badge badge-success p-1"
                                    style={{ background: "#25D366", color: "#fff", textDecoration: "none", fontSize: "10.5px" }}
                                    title="Hubungi via WhatsApp"
                                  >
                                    <i className="fab fa-whatsapp mr-1"></i> {item.client_phone}
                                  </a>
                                </div>
                                <span className="text-muted small" style={{ fontSize: "11px" }}>{item.client_email}</span>
                                {item.notes && (
                                  <div className="small text-warning mt-1" style={{ fontSize: "11px" }}>
                                    <em>Note: {item.notes}</em>
                                  </div>
                                )}
                              </td>

                              <td className="p-3">
                                <strong className="text-white d-block">
                                  {item.appointment_date === todayStr ? (
                                    <span className="badge badge-danger mr-1" style={{ fontSize: "10px" }}>HARI INI</span>
                                  ) : null}
                                  {item.appointment_date}
                                </strong>
                                <span style={{ color: "var(--primary-gold)", fontWeight: 600 }}>{item.appointment_time} WIB</span>
                              </td>

                              <td className="p-3">
                                <span
                                  className="badge px-2 py-1.5"
                                  style={{ background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px" }}
                                >
                                  <i className="fas fa-user-tie mr-1" style={{ color: "var(--primary-gold)" }}></i> {item.barber_name}
                                </span>
                              </td>

                              <td className="p-3">
                                {item.services_details.map((srv, idx) => (
                                  <span
                                    key={idx}
                                    className="badge mr-1 mb-1"
                                    style={{ background: "rgba(212,175,55,0.08)", color: "#fef08a", border: "1px solid rgba(212,175,55,0.2)", fontSize: "11px", padding: "4px 8px" }}
                                  >
                                    {srv.name}
                                  </span>
                                ))}
                              </td>

                              <td className="p-3">
                                <strong style={{ color: "var(--primary-gold)", fontSize: "14px" }}>
                                  {formatRupiah(item.total_price)}
                                </strong>
                              </td>

                              <td className="p-3">
                                {item.status === "pending" && (
                                  <span className="badge px-2.5 py-1.5" style={{ background: "rgba(245,158,11,0.2)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.4)", borderRadius: "6px" }}>
                                    <i className="fas fa-clock mr-1"></i> Menunggu
                                  </span>
                                )}
                                {item.status === "confirmed" && (
                                  <span className="badge px-2.5 py-1.5" style={{ background: "rgba(59,130,246,0.2)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.4)", borderRadius: "6px" }}>
                                    <i className="fas fa-calendar-check mr-1"></i> Dikonfirmasi
                                  </span>
                                )}
                                {item.status === "completed" && (
                                  <span className="badge px-2.5 py-1.5" style={{ background: "rgba(16,185,129,0.2)", color: "#34d399", border: "1px solid rgba(16,185,129,0.4)", borderRadius: "6px" }}>
                                    <i className="fas fa-check mr-1"></i> Selesai
                                  </span>
                                )}
                                {item.status === "cancelled" && (
                                  <span className="badge px-2.5 py-1.5" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.4)", borderRadius: "6px" }}>
                                    <i className="fas fa-times mr-1"></i> Batal
                                  </span>
                                )}
                              </td>

                              <td className="p-3 text-center">
                                <div className="btn-group btn-group-sm" role="group">
                                  {item.status === "pending" && (
                                    <button
                                      disabled={actionLoading}
                                      onClick={() => handleUpdateStatus(item.id, "confirmed")}
                                      className="btn btn-sm btn-outline-success"
                                      title="Konfirmasi Jadwal"
                                      style={{ borderRadius: "6px 0 0 6px" }}
                                    >
                                      <i className="fas fa-check"></i>
                                    </button>
                                  )}
                                  {item.status === "confirmed" && (
                                    <button
                                      disabled={actionLoading}
                                      onClick={() => handleUpdateStatus(item.id, "completed")}
                                      className="btn btn-sm btn-outline-info"
                                      title="Tandai Selesai"
                                      style={{ borderRadius: "6px 0 0 6px" }}
                                    >
                                      <i className="fas fa-flag-checkered"></i>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => setReceiptModal({ open: true, appointment: item })}
                                    className="btn btn-sm btn-outline-warning"
                                    title="Lihat / Cetak Struk"
                                  >
                                    <i className="fas fa-print"></i>
                                  </button>
                                  {item.status !== "cancelled" && item.status !== "completed" && (
                                    <button
                                      disabled={actionLoading}
                                      onClick={() => setCancelModal({ open: true, id: item.id, reason: "" })}
                                      className="btn btn-sm btn-outline-warning"
                                      title="Batalkan Reservasi"
                                    >
                                      <i className="fas fa-ban"></i>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="btn btn-sm btn-outline-danger"
                                    title="Hapus Data Permanen"
                                    style={{ borderRadius: "0 6px 6px 0" }}
                                  >
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === "services" && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                <div>
                  <h3 style={{ fontFamily: "Playfair Display, serif", color: "#fff", margin: 0 }}>
                    Katalog & Menu Layanan Barbershop
                  </h3>
                  <p className="text-muted small mt-1 mb-0">Kelola daftar harga, deskripsi potongan, dan estimasi waktu pengerjaan.</p>
                </div>
                <button
                  onClick={() => setServiceModal(true)}
                  className="btn btn-sm"
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #997415)",
                    color: "#0b0c10",
                    fontWeight: 700,
                    borderRadius: "8px",
                    padding: "8px 16px",
                  }}
                >
                  <i className="fas fa-plus mr-1"></i> Tambah Layanan Baru
                </button>
              </div>

              <div className="row">
                {services.map((srv) => {
                  const cat = INITIAL_CATEGORIES.find((c) => c.id === srv.category_id);
                  return (
                    <div key={srv.id} className="col-lg-6 mb-3">
                      <div
                        className="p-3.5 rounded-xl h-100"
                        style={{
                          background: "#131722",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "12px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <span className="badge badge-secondary mb-1" style={{ fontSize: "10px", background: "rgba(255,255,255,0.08)" }}>
                                {cat ? cat.name : "Umum"}
                              </span>
                              <h5 className="text-white mb-1" style={{ fontSize: "16px", fontWeight: 700 }}>
                                {srv.name}
                              </h5>
                            </div>
                            <span style={{ color: "var(--primary-gold)", fontWeight: 700, fontSize: "16px" }}>
                              {formatRupiah(srv.price)}
                            </span>
                          </div>
                          <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.4 }}>{srv.description}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
                          <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
                            <i className="far fa-clock mr-1"></i> {srv.duration_min} Menit
                          </span>
                          <span className="badge badge-success" style={{ background: "rgba(16,185,129,0.15)", color: "#34d399" }}>
                            Tersedia Online
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: BARBERS */}
          {activeTab === "barbers" && (
            <div>
              <div className="mb-4">
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#fff", margin: 0 }}>
                  Master Barber & Tim Stylist
                </h3>
                <p className="text-muted small mt-1 mb-0">Profil, pengalaman jam terbang, serta jadwal kerja aktif tiap staf.</p>
              </div>

              <div className="row">
                {INITIAL_BARBERS.map((bbr) => {
                  const bbrAppointments = appointments.filter((a) => a.barber_name === bbr.name);
                  return (
                    <div key={bbr.id} className="col-lg-4 col-md-6 mb-4">
                      <div
                        className="p-4 rounded-xl text-center h-100"
                        style={{
                          background: "#131722",
                          border: "1px solid rgba(212,175,55,0.2)",
                          borderRadius: "14px",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                        }}
                      >
                        <div
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "2px solid var(--primary-gold)",
                            margin: "0 auto 16px auto",
                          }}
                        >
                          <img src={bbr.avatar} alt={bbr.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <h4 className="text-white mb-1" style={{ fontSize: "18px", fontWeight: 700 }}>
                          {bbr.name}
                        </h4>
                        <span style={{ color: "var(--primary-gold)", fontSize: "13px", fontWeight: 600, display: "block", marginBottom: "8px" }}>
                          {bbr.role} ({bbr.experience})
                        </span>
                        <div className="mb-3" style={{ color: "#fbbf24", fontSize: "12px" }}>
                          <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                          <span className="text-muted ml-2">({bbr.rating} • {bbr.reviews_count} ulasan)</span>
                        </div>
                        <p style={{ color: "#94a3b8", fontSize: "12.5px", lineHeight: 1.4 }}>{bbr.bio}</p>

                        <div className="pt-3 border-top border-dark d-flex justify-content-between align-items-center">
                          <span style={{ fontSize: "12px", color: "#cbd5e1" }}>Reservasi Aktif:</span>
                          <span className="badge badge-warning" style={{ background: "rgba(245,158,11,0.2)", color: "#fbbf24", fontSize: "12px" }}>
                            {bbrAppointments.length} Kunjungan
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: CLIENTS CRM */}
          {activeTab === "clients" && (
            <div>
              <div className="mb-4">
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#fff", margin: 0 }}>
                  Database Pelanggan (CRM)
                </h3>
                <p className="text-muted small mt-1 mb-0">Daftar pelanggan terdaftar, riwayat kunjungan, dan akumulasi transaksi.</p>
              </div>

              <div
                className="card"
                style={{
                  background: "#131722",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}
              >
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0" style={{ fontSize: "13px" }}>
                    <thead>
                      <tr style={{ background: "#0c0e14", color: "#94a3b8", textTransform: "uppercase", fontSize: "11px" }}>
                        <th className="p-3">Nama Pelanggan</th>
                        <th className="p-3">Nomor WhatsApp</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Total Kunjungan</th>
                        <th className="p-3">Total Belanja</th>
                        <th className="p-3">Kunjungan Terakhir</th>
                        <th className="p-3 text-center">Hubungi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientsList.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-5 text-muted">Belum ada data pelanggan yang tercatat.</td>
                        </tr>
                      ) : (
                        clientsList.map((client, idx) => (
                          <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            <td className="p-3 font-weight-bold text-white">{client.name}</td>
                            <td className="p-3">{client.phone}</td>
                            <td className="p-3 text-muted">{client.email}</td>
                            <td className="p-3">
                              <span className="badge badge-secondary">{client.totalVisits} kali</span>
                            </td>
                            <td className="p-3" style={{ color: "var(--primary-gold)", fontWeight: 700 }}>
                              {formatRupiah(client.totalSpent)}
                            </td>
                            <td className="p-3 text-muted">{client.lastVisit}</td>
                            <td className="p-3 text-center">
                              <a
                                href={`https://wa.me/${client.phone.replace(/^0/, "62")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-success"
                                style={{ background: "#25D366", borderColor: "#25D366", borderRadius: "6px", fontSize: "12px" }}
                              >
                                <i className="fab fa-whatsapp mr-1"></i> WhatsApp
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: RECEIPT / TICKET PREVIEW */}
      {receiptModal.open && receiptModal.appointment && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            className="p-4"
            style={{
              background: "#161b26",
              border: "1px solid var(--primary-gold)",
              maxWidth: "420px",
              width: "100%",
              borderRadius: "16px",
              boxShadow: "0 15px 50px rgba(0,0,0,0.9)",
              position: "relative",
            }}
          >
            <div className="text-center mb-3">
              <span style={{ color: "var(--primary-gold)", fontSize: "24px" }}>
                <i className="fas fa-cut"></i>
              </span>
              <h4 style={{ fontFamily: "Playfair Display, serif", color: "#fff", margin: "4px 0" }}>
                BARBERIA LUXE
              </h4>
              <small className="text-muted d-block" style={{ fontSize: "11px" }}>
                Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan
              </small>
              <div style={{ borderBottom: "1px dashed rgba(255,255,255,0.2)", margin: "14px 0" }}></div>
            </div>

            <div className="small mb-3" style={{ fontSize: "12px", color: "#cbd5e1" }}>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Kode Booking:</span>
                <strong style={{ color: "var(--primary-gold)", fontFamily: "monospace" }}>{receiptModal.appointment.id}</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Pelanggan:</span>
                <strong className="text-white">{receiptModal.appointment.client_name}</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">WhatsApp:</span>
                <span>{receiptModal.appointment.client_phone}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Barber:</span>
                <strong className="text-white">{receiptModal.appointment.barber_name}</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Jadwal:</span>
                <strong style={{ color: "#38bdf8" }}>
                  {receiptModal.appointment.appointment_date} @ {receiptModal.appointment.appointment_time} WIB
                </strong>
              </div>
            </div>

            <div style={{ borderBottom: "1px dashed rgba(255,255,255,0.2)", margin: "14px 0" }}></div>

            <div className="mb-3">
              <span className="text-muted small d-block mb-1 font-weight-bold uppercase" style={{ fontSize: "10.5px" }}>LAYANAN DIPILIH:</span>
              {receiptModal.appointment.services_details.map((srv, idx) => (
                <div key={idx} className="d-flex justify-content-between small text-white mb-1">
                  <span>{srv.name}</span>
                  <span style={{ color: "var(--primary-gold)" }}>{formatRupiah(srv.price)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderBottom: "2px solid rgba(212,175,55,0.5)", margin: "14px 0" }}></div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <strong style={{ fontSize: "14px", color: "#fff" }}>TOTAL BIAYA:</strong>
              <strong style={{ fontSize: "20px", color: "var(--primary-gold)" }}>
                {formatRupiah(receiptModal.appointment.total_price)}
              </strong>
            </div>

            <div className="d-flex justify-content-between gap-2">
              <button
                type="button"
                onClick={() => setReceiptModal({ open: false, appointment: null })}
                className="btn btn-sm btn-secondary flex-grow-1"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="btn btn-sm btn-outline-warning"
              >
                <i className="fas fa-print mr-1"></i> Print Struk
              </button>
              <button
                type="button"
                onClick={() => {
                  const item = receiptModal.appointment!;
                  const waText =
                    `*BARBERIA LUXE - TIKET RESERVASI*\n` +
                    `--------------------------------\n` +
                    `Kode: *${item.id}*\n` +
                    `Pelanggan: ${item.client_name}\n` +
                    `Barber: ${item.barber_name}\n` +
                    `Jadwal: ${item.appointment_date} Jam ${item.appointment_time} WIB\n` +
                    `Total Biaya: ${formatRupiah(item.total_price)}\n` +
                    `Status: ${item.status.toUpperCase()}\n` +
                    `--------------------------------\n` +
                    `Terima kasih telah mempercayakan grooming Anda bersama Barberia Luxe!`;
                  navigator.clipboard.writeText(waText);
                  showToast("Format teks tiket berhasil disalin ke clipboard!", "success");
                }}
                className="btn btn-sm"
                style={{ background: "var(--primary-gold)", color: "#0b0c10", fontWeight: 700 }}
              >
                <i className="fas fa-copy mr-1"></i> Copy WA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CANCEL RESERVATION */}
      {cancelModal.open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            className="p-4 rounded-xl"
            style={{
              background: "#131722",
              border: "1px solid rgba(239,68,68,0.4)",
              maxWidth: "450px",
              width: "100%",
              borderRadius: "14px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
            }}
          >
            <h5 className="text-white mb-2">Batalkan Reservasi {cancelModal.id}?</h5>
            <p className="text-muted small">Tuliskan alasan pembatalan untuk arsip catatan kasir:</p>
            <textarea
              rows={3}
              value={cancelModal.reason}
              onChange={(e) => setCancelModal({ ...cancelModal, reason: e.target.value })}
              className="form-control mb-3"
              placeholder="Contoh: Pelanggan mendadak berhalangan hadir..."
              style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
            ></textarea>
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={() => setCancelModal({ open: false, id: "", reason: "" })}
                className="btn btn-sm btn-secondary"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => handleUpdateStatus(cancelModal.id, "cancelled", cancelModal.reason)}
                className="btn btn-sm btn-danger"
              >
                Konfirmasi Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD WALK-IN RESERVATION */}
      {walkinModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            className="p-4 rounded-xl"
            style={{
              background: "#131722",
              border: "1px solid rgba(212,175,55,0.35)",
              maxWidth: "520px",
              width: "100%",
              borderRadius: "14px",
              boxShadow: "0 15px 50px rgba(0,0,0,0.8)",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-white m-0">Tambah Reservasi Walk-In / Telepon</h5>
              <button
                onClick={() => setWalkinModal(false)}
                style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "18px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWalkin}>
              <div className="form-group mb-2">
                <label className="text-muted small">Nama Pelanggan *</label>
                <input
                  type="text"
                  required
                  value={walkinForm.clientName}
                  onChange={(e) => setWalkinForm({ ...walkinForm, clientName: e.target.value })}
                  className="form-control form-control-sm"
                  placeholder="Contoh: Dimas Bagus"
                  style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                />
              </div>

              <div className="form-row mb-2">
                <div className="col">
                  <label className="text-muted small">WhatsApp / HP *</label>
                  <input
                    type="text"
                    required
                    value={walkinForm.clientPhone}
                    onChange={(e) => setWalkinForm({ ...walkinForm, clientPhone: e.target.value })}
                    className="form-control form-control-sm"
                    placeholder="0812xxxxxxxx"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
                <div className="col">
                  <label className="text-muted small">Email (Opsional)</label>
                  <input
                    type="email"
                    value={walkinForm.clientEmail}
                    onChange={(e) => setWalkinForm({ ...walkinForm, clientEmail: e.target.value })}
                    className="form-control form-control-sm"
                    placeholder="pelanggan@mail.com"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
              </div>

              <div className="form-row mb-2">
                <div className="col">
                  <label className="text-muted small">Pilih Layanan</label>
                  <select
                    value={walkinForm.serviceId}
                    onChange={(e) => setWalkinForm({ ...walkinForm, serviceId: Number(e.target.value) })}
                    className="form-control form-control-sm"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} - {formatRupiah(s.price)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label className="text-muted small">Pilih Barber</label>
                  <select
                    value={walkinForm.barberId}
                    onChange={(e) => setWalkinForm({ ...walkinForm, barberId: Number(e.target.value) })}
                    className="form-control form-control-sm"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  >
                    {INITIAL_BARBERS.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row mb-3">
                <div className="col">
                  <label className="text-muted small">Tanggal</label>
                  <input
                    type="date"
                    value={walkinForm.date}
                    onChange={(e) => setWalkinForm({ ...walkinForm, date: e.target.value })}
                    className="form-control form-control-sm"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
                <div className="col">
                  <label className="text-muted small">Jam (WIB)</label>
                  <input
                    type="time"
                    value={walkinForm.time}
                    onChange={(e) => setWalkinForm({ ...walkinForm, time: e.target.value })}
                    className="form-control form-control-sm"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" onClick={() => setWalkinModal(false)} className="btn btn-sm btn-secondary">
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-sm"
                  style={{ background: "var(--primary-gold)", color: "#0b0c10", fontWeight: 700 }}
                >
                  Simpan Reservasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SERVICE */}
      {serviceModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            className="p-4 rounded-xl"
            style={{
              background: "#131722",
              border: "1px solid rgba(212,175,55,0.35)",
              maxWidth: "480px",
              width: "100%",
              borderRadius: "14px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-white m-0">Tambah Layanan ke Katalog</h5>
              <button
                onClick={() => setServiceModal(false)}
                style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: "18px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddService}>
              <div className="form-group mb-2">
                <label className="text-muted small">Nama Layanan *</label>
                <input
                  type="text"
                  required
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="form-control form-control-sm"
                  placeholder="Contoh: Hot Stone Shoulder Massage"
                  style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                />
              </div>

              <div className="form-group mb-2">
                <label className="text-muted small">Kategori</label>
                <select
                  value={newService.categoryId}
                  onChange={(e) => setNewService({ ...newService, categoryId: Number(e.target.value) })}
                  className="form-control form-control-sm"
                  style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                >
                  {INITIAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row mb-2">
                <div className="col">
                  <label className="text-muted small">Harga (Rp)</label>
                  <input
                    type="number"
                    step="5000"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                    className="form-control form-control-sm"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
                <div className="col">
                  <label className="text-muted small">Durasi (Menit)</label>
                  <input
                    type="number"
                    step="5"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                    className="form-control form-control-sm"
                    style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <label className="text-muted small">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="form-control form-control-sm"
                  placeholder="Deskripsi singkat teknik dan produk yang digunakan..."
                  style={{ background: "#0b0c10", borderColor: "rgba(255,255,255,0.1)", color: "#fff" }}
                ></textarea>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" onClick={() => setServiceModal(false)} className="btn btn-sm btn-secondary">
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn btn-sm"
                  style={{ background: "var(--primary-gold)", color: "#0b0c10", fontWeight: 700 }}
                >
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
