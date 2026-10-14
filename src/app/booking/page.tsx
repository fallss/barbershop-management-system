"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INITIAL_SERVICES, INITIAL_BARBERS, formatRupiah } from "@/lib/data";

function BookingContent() {
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get("service");
  const preselectedBarberId = searchParams.get("barber");

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientData, setClientData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [completedBooking, setCompletedBooking] = useState<any>(null);

  useEffect(() => {
    if (preselectedServiceId) {
      const id = parseInt(preselectedServiceId);
      if (!isNaN(id) && INITIAL_SERVICES.some((s) => s.id === id)) {
        setSelectedServices([id]);
      }
    }
    if (preselectedBarberId) {
      const bId = parseInt(preselectedBarberId);
      if (!isNaN(bId) && INITIAL_BARBERS.some((b) => b.id === bId)) {
        setSelectedBarber(bId);
      }
    }
  }, [preselectedServiceId, preselectedBarberId]);

  // Generate next 10 available booking dates
  const availableDates = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const daysId = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthsId = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

    return {
      dateStr,
      dayName: i === 0 ? "Hari Ini" : i === 1 ? "Besok" : daysId[d.getDay()],
      dateFormatted: `${d.getDate()} ${monthsId[d.getMonth()]}`,
    };
  });

  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].dateStr);
    }
  }, [selectedDate, availableDates]);

  const timeSlots = [
    "09:00", "09:45", "10:30", "11:15", "13:00", "13:45",
    "14:30", "15:15", "16:00", "16:45", "17:30", "18:15",
    "19:00", "19:45", "20:30"
  ];

  const chosenServices = INITIAL_SERVICES.filter((s) => selectedServices.includes(s.id));
  const totalPrice = chosenServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = chosenServices.reduce((sum, s) => sum + s.duration_min, 0);
  const chosenBarber = INITIAL_BARBERS.find((b) => b.id === selectedBarber);

  const toggleService = (id: number) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((sId) => sId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (selectedServices.length === 0) {
      setErrorMessage("Silakan pilih minimal 1 layanan perawatan.");
      setStep(1);
      return;
    }
    if (!selectedDate || !selectedTime) {
      setErrorMessage("Silakan tentukan tanggal dan jam reservasi.");
      setStep(3);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: clientData.name,
          client_phone: clientData.phone,
          client_email: clientData.email,
          service_ids: selectedServices,
          barber_id: selectedBarber,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
          notes: clientData.notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setCompletedBooking(data.appointment);
      } else {
        setErrorMessage(data.error || "Gagal membuat reservasi.");
      }
    } catch {
      setErrorMessage("Terjadi gangguan jaringan saat memproses reservasi.");
    } finally {
      setSubmitting(false);
    }
  };

  if (completedBooking) {
    const waText = encodeURIComponent(
      `Halo Barberia Luxe, saya ingin konfirmasi reservasi:\n\n` +
      `Kode Booking: ${completedBooking.id}\n` +
      `Nama: ${completedBooking.client_name}\n` +
      `Jadwal: ${completedBooking.appointment_date} pukul ${completedBooking.appointment_time} WIB\n` +
      `Barber: ${completedBooking.barber_name}\n` +
      `Layanan: ${completedBooking.services_details.map((s: any) => s.name).join(", ")}\n` +
      `Total Biaya: ${formatRupiah(completedBooking.total_price)}\n\n` +
      `Terima kasih!`
    );

    return (
      <section className="booking_section">
        <div className="container py-5">
          <div className="booking-header-title text-center mb-5">
            <span className="hero-badge mb-2">
              <i className="fas fa-check-circle"></i> Reservasi Terkirim
            </span>
            <h2>Tiket Reservasi Barberia Luxe</h2>
            <p>Terima kasih atas kepercayaan Anda. Reservasi Anda berhasil diajukan!</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="card" style={{ background: "#141820", border: "1px solid var(--primary-gold)", borderRadius: "14px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary mb-4">
                  <div>
                    <span className="text-muted small text-uppercase">Kode Booking Anda</span>
                    <h3 style={{ color: "var(--primary-gold)", margin: 0, fontFamily: "monospace", letterSpacing: "2px" }}>
                      {completedBooking.id}
                    </h3>
                  </div>
                  <span className="badge badge-warning p-2" style={{ background: "rgba(212,175,55,0.2)", color: "var(--primary-gold)" }}>
                    Menunggu Konfirmasi
                  </span>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-6 mb-2">
                    <span className="text-muted small d-block">Nama Pelanggan:</span>
                    <strong>{completedBooking.client_name}</strong>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <span className="text-muted small d-block">No. WhatsApp / HP:</span>
                    <strong>{completedBooking.client_phone}</strong>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <span className="text-muted small d-block">Waktu & Jadwal:</span>
                    <strong style={{ color: "var(--primary-gold)" }}>{completedBooking.appointment_date} • {completedBooking.appointment_time} WIB</strong>
                  </div>
                  <div className="col-sm-6 mb-2">
                    <span className="text-muted small d-block">Master Barber:</span>
                    <strong>{completedBooking.barber_name}</strong>
                  </div>
                </div>

                <div className="border-top border-secondary pt-3 mb-3">
                  <span className="text-muted small d-block mb-2">Layanan yang Dipilih:</span>
                  <ul className="list-unstyled">
                    {completedBooking.services_details.map((srv: any, idx: number) => (
                      <li key={idx} className="d-flex justify-content-between text-light py-1 border-bottom border-dark">
                        <span>{srv.name}</span>
                        <span style={{ color: "var(--primary-gold)" }}>{formatRupiah(srv.price)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-2">
                  <h4 style={{ margin: 0, fontSize: "18px" }}>Total Biaya</h4>
                  <h3 style={{ margin: 0, color: "var(--primary-gold)", fontFamily: "Playfair Display, serif" }}>
                    {formatRupiah(completedBooking.total_price)}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-top border-secondary d-flex flex-column flex-sm-row gap-2 justify-content-between">
                  <a
                    href={`https://wa.me/6281234567890?text=${waText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success font-weight-bold py-3 px-4 mb-2 mb-sm-0"
                    style={{ borderRadius: "8px", background: "#25D366", borderColor: "#25D366" }}
                  >
                    <i className="fab fa-whatsapp mr-2"></i> Kirim ke WhatsApp Resmi
                  </a>
                  <Link href="/" className="default_btn py-3 px-4 text-center">
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="booking_section">
      <div className="container py-5">
        <div className="booking-header-title text-center mb-5">
          <span className="hero-badge mb-2">
            <i className="far fa-calendar-check"></i> Reservasi Mudah & Cepat
          </span>
          <h2>Formulir Booking Janji Temu</h2>
          <p>Silakan ikuti 4 langkah mudah berikut untuk memilih layanan, barber pilihan, dan jadwal kunjungan Anda.</p>
        </div>

        {/* Step Indicator Nodes */}
        <div className="step-wizard-nav mb-5">
          {[
            { num: 1, label: "Layanan" },
            { num: 2, label: "Barber" },
            { num: 3, label: "Waktu" },
            { num: 4, label: "Data Diri" },
          ].map((item) => (
            <div
              key={item.num}
              onClick={() => {
                if (item.num === 1) setStep(1);
                if (item.num === 2 && selectedServices.length > 0) setStep(2);
                if (item.num === 3 && selectedServices.length > 0) setStep(3);
                if (item.num === 4 && selectedServices.length > 0 && selectedTime) setStep(4);
              }}
              className={`wizard-step-node ${step === item.num ? "active" : ""}`}
              style={{ cursor: "pointer" }}
            >
              <div className="wizard-step-circle">{item.num}</div>
              <span className="wizard-step-label">{item.label}</span>
            </div>
          ))}
        </div>

        {errorMessage && (
          <div className="alert alert-danger mb-4" role="alert">
            <i className="fas fa-exclamation-triangle mr-2"></i> {errorMessage}
          </div>
        )}

        {/* STEP 1: SELECT SERVICE */}
        {step === 1 && (
          <div className="select_services_div tab_reservation">
            <div className="text_header mb-4 d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                  <span style={{ color: "var(--primary-gold)" }}>Langkah 1:</span> Pilih Layanan Barbershop
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                  Anda dapat mencentang lebih dari satu layanan (misal: Potong Rambut + Cukur Handuk Hangat).
                </p>
              </div>
              <div className="text-right">
                <span className="badge badge-warning p-2" style={{ background: "rgba(212,175,55,0.15)", color: "var(--primary-gold)", fontSize: "13px" }}>
                  {selectedServices.length} Dipilih • Total: {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>

            <div className="service-select-grid">
              {INITIAL_SERVICES.map((row) => {
                const isSelected = selectedServices.includes(row.id);
                return (
                  <div
                    key={row.id}
                    className={`service-card-item ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleService(row.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="service-card-left">
                      <div className="service-check-box">
                        <i className="fas fa-check" style={{ fontSize: "12px", opacity: isSelected ? 1 : 0 }}></i>
                      </div>
                      <div>
                        <div className="service-info-name">{row.name}</div>
                        <div className="service-info-desc">{row.description}</div>
                      </div>
                    </div>
                    <div className="service-card-right">
                      <span className="service-badge-duration">
                        <i className="far fa-clock"></i> {row.duration_min} Menit
                      </span>
                      <span className="service-badge-price">
                        {formatRupiah(row.price)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="btn-hero-primary"
                style={{ opacity: selectedServices.length === 0 ? 0.4 : 1, cursor: selectedServices.length === 0 ? "not-allowed" : "pointer" }}
              >
                Lanjut ke Pilih Barber ({selectedServices.length} Dipilih) <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT BARBER */}
        {step === 2 && (
          <div className="select_employee_div tab_reservation">
            <div className="text_header mb-4">
              <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                <span style={{ color: "var(--primary-gold)" }}>Langkah 2:</span> Pilih Barber / Stylist Favorit
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                Setiap barber kami memiliki keahlian khusus untuk memastikan penampilan terbaik Anda.
              </p>
            </div>

            {/* Any Barber */}
            <div
              className={`employee-card-item mb-3 ${selectedBarber === null ? "selected" : ""}`}
              onClick={() => setSelectedBarber(null)}
              style={{ cursor: "pointer" }}
            >
              <div className="employee-avatar">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="employee-info flex-grow-1">
                <div className="employee-name">Siapa Saja yang Tersedia (Any Barber)</div>
                <div className="employee-specialty">Sistem otomatis mencocokkan jadwal tercepat untuk Anda</div>
              </div>
              <div className="employee-check">
                <i className="fas fa-check-circle" style={{ color: selectedBarber === null ? "var(--primary-gold)" : "#475569", fontSize: "20px" }}></i>
              </div>
            </div>

            <div className="employee-select-grid">
              {INITIAL_BARBERS.map((barber) => {
                const isSelected = selectedBarber === barber.id;
                return (
                  <div
                    key={barber.id}
                    className={`employee-card-item ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedBarber(barber.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="employee-avatar" style={{ overflow: "hidden", padding: 0 }}>
                      <img src={barber.avatar} alt={barber.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="employee-info flex-grow-1">
                      <div className="employee-name">{barber.name}</div>
                      <div className="employee-specialty">{barber.role} ({barber.experience})</div>
                      <div className="small text-muted mt-1">{barber.bio}</div>
                    </div>
                    <div className="employee-check">
                      <i className="fas fa-check-circle" style={{ color: isSelected ? "var(--primary-gold)" : "#475569", fontSize: "20px" }}></i>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" onClick={() => setStep(1)} className="btn btn-secondary">
                <i className="fas fa-arrow-left mr-2"></i> Kembali ke Layanan
              </button>
              <button type="button" onClick={() => setStep(3)} className="btn-hero-primary">
                Lanjut ke Pilih Waktu <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT TIME */}
        {step === 3 && (
          <div className="select_date_time_div tab_reservation">
            <div className="text_header mb-4">
              <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                <span style={{ color: "var(--primary-gold)" }}>Langkah 3:</span> Tentukan Tanggal & Jam Kunjungan
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                Pilih tanggal dalam 10 hari ke depan dan slot waktu yang sesuai.
              </p>
            </div>

            <div className="mb-4">
              <label style={{ color: "var(--primary-gold)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase" }}>
                1. Pilih Tanggal:
              </label>
              <div className="row">
                {availableDates.map((d) => (
                  <div key={d.dateStr} className="col-sm-3 col-6 mb-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(d.dateStr)}
                      className="w-100 p-2 text-center"
                      style={{
                        background: selectedDate === d.dateStr ? "var(--primary-gold)" : "#141820",
                        color: selectedDate === d.dateStr ? "#0d0f13" : "#f8fafc",
                        border: selectedDate === d.dateStr ? "1px solid var(--primary-gold)" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      <small className="d-block text-uppercase" style={{ fontSize: "11px", opacity: 0.8 }}>{d.dayName}</small>
                      <span>{d.dateFormatted}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label style={{ color: "var(--primary-gold)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase" }}>
                2. Pilih Jam Mulai:
              </label>
              <div className="row">
                {timeSlots.map((time) => (
                  <div key={time} className="col-sm-2 col-4 mb-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className="w-100 p-2 text-center"
                      style={{
                        background: selectedTime === time ? "var(--primary-gold)" : "#141820",
                        color: selectedTime === time ? "#0d0f13" : "#f8fafc",
                        border: selectedTime === time ? "1px solid var(--primary-gold)" : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      {time} WIB
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button type="button" onClick={() => setStep(2)} className="btn btn-secondary">
                <i className="fas fa-arrow-left mr-2"></i> Kembali ke Barber
              </button>
              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(4)}
                className="btn-hero-primary"
                style={{ opacity: !selectedDate || !selectedTime ? 0.4 : 1 }}
              >
                Lanjut ke Data Diri <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CLIENT INFO */}
        {step === 4 && (
          <div className="client_details_div tab_reservation">
            <div className="text_header mb-4">
              <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                <span style={{ color: "var(--primary-gold)" }}>Langkah 4:</span> Isi Informasi Pelanggan
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                Informasi ini digunakan untuk konfirmasi jadwal dan notifikasi pengingat via WhatsApp.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-3 mb-4 rounded" style={{ background: "#141820", border: "1px solid rgba(212,175,55,0.3)" }}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Jadwal Reservasi:</span>
                <strong style={{ color: "var(--primary-gold)" }}>
                  {selectedDate} • {selectedTime} WIB (Barber: {chosenBarber ? chosenBarber.name : "Siapa Saja"})
                </strong>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Layanan ({selectedServices.length}):</span>
                <span>{chosenServices.map((s) => s.name).join(", ")} ({totalDuration} mnt)</span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2">
                <strong>Total Biaya:</strong>
                <h4 style={{ margin: 0, color: "var(--primary-gold)" }}>{formatRupiah(totalPrice)}</h4>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="client_details_form">
              <div className="form-group">
                <label style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={clientData.name}
                  onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                  className="form-control"
                  placeholder="Contoh: Raditya Danu"
                />
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>Nomor WhatsApp / HP *</label>
                  <input
                    type="tel"
                    required
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    className="form-control"
                    placeholder="081234567890"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>Alamat Email *</label>
                  <input
                    type="email"
                    required
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    className="form-control"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>Catatan Khusus (Opsional)</label>
                <textarea
                  rows={3}
                  value={clientData.notes}
                  onChange={(e) => setClientData({ ...clientData, notes: e.target.value })}
                  className="form-control"
                  placeholder="Contoh: Ingin model low fade samping tipis..."
                ></textarea>
              </div>

              <div className="d-flex justify-content-between mt-4">
                <button type="button" onClick={() => setStep(3)} className="btn btn-secondary">
                  <i className="fas fa-arrow-left mr-2"></i> Kembali ke Waktu
                </button>
                <button type="submit" disabled={submitting} className="btn-hero-primary">
                  {submitting ? "Memproses..." : "Konfirmasi Reservasi Sekarang"} <i className="fas fa-check ml-2"></i>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container py-5 text-center text-light">Memuat Sistem Booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}
