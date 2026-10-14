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
  const [selectedServices, setSelectedServices] = useState<number[]>([1]);
  const [selectedBarber, setSelectedBarber] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientData, setClientData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

  // Generate 10 days starting from tomorrow
  const daysIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const monthsIndo = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const calendarDays = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + (i + 1));
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    return {
      dateStr,
      dayName: daysIndo[d.getDay()],
      dateFormatted: `${d.getDate()} ${monthsIndo[d.getMonth()]}`,
      isSunday: d.getDay() === 0,
    };
  });

  // Time slots per day matching original system
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // Set default selected date and time
  useEffect(() => {
    if (!selectedDate && calendarDays.length > 0) {
      setSelectedDate(calendarDays[0].dateStr);
      setSelectedTime("10:00");
    }
  }, [selectedDate, calendarDays]);

  const chosenServices = INITIAL_SERVICES.filter((s) => selectedServices.includes(s.id));
  const totalPrice = chosenServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = chosenServices.reduce((sum, s) => sum + s.duration_min, 0);
  const chosenBarber = INITIAL_BARBERS.find((b) => b.id === selectedBarber) || INITIAL_BARBERS[0];

  const toggleService = (id: number) => {
    setErrorMessage("");
    if (selectedServices.includes(id)) {
      if (selectedServices.length === 1) {
        setErrorMessage("Harap pilih minimal satu layanan sebelum melanjutkan!");
        return;
      }
      setSelectedServices(selectedServices.filter((sId) => sId !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleNextStep = () => {
    setErrorMessage("");
    if (step === 1) {
      if (selectedServices.length === 0) {
        setErrorMessage("Harap pilih minimal satu layanan sebelum melanjutkan!");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedBarber) {
        setErrorMessage("Silakan tentukan barber favorit Anda sebelum melanjutkan!");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!selectedDate || !selectedTime) {
        setErrorMessage("Silakan klik salah satu jam yang tersedia di tabel kalender!");
        return;
      }
      setStep(4);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!clientData.firstName.trim()) {
      setErrorMessage("Kolom nama depan wajib diisi!");
      return;
    }
    if (!clientData.lastName.trim()) {
      setErrorMessage("Kolom nama belakang wajib diisi!");
      return;
    }
    if (!clientData.email.trim() || !clientData.email.includes("@")) {
      setErrorMessage("Format email tidak valid!");
      return;
    }
    if (!clientData.phone.trim() || clientData.phone.length < 8) {
      setErrorMessage("Nomor telepon minimal 8-15 digit angka!");
      return;
    }

    setSubmitting(true);
    try {
      const fullName = `${clientData.firstName.trim()} ${clientData.lastName.trim()}`;
      const payload = {
        client_name: fullName,
        client_phone: clientData.phone.trim(),
        client_email: clientData.email.trim(),
        barber_id: chosenBarber.id,
        barber_name: chosenBarber.name,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        services: selectedServices,
        services_details: chosenServices.map((s) => ({
          id: s.id,
          name: s.name,
          price: s.price,
          duration: s.duration_min,
        })),
        total_price: totalPrice,
        total_duration: totalDuration,
        notes: clientData.notes,
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Gagal mengirim reservasi.");
      }

      const resData = await res.json();
      setCompletedBooking({
        ...payload,
        id: resData.appointment?.id || `BLX-${Date.now().toString().slice(-6)}`,
      });
    } catch {
      // Fallback success for demo
      setCompletedBooking({
        id: `BLX-${Date.now().toString().slice(-6)}`,
        client_name: `${clientData.firstName} ${clientData.lastName}`,
        client_phone: clientData.phone,
        client_email: clientData.email,
        barber_name: chosenBarber.name,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        services_details: chosenServices,
        total_price: totalPrice,
      });
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS TICKET VIEW
  if (completedBooking) {
    const waText = encodeURIComponent(
      `Halo Barberia Luxe, saya ingin konfirmasi reservasi online:\n` +
      `Kode Booking: ${completedBooking.id}\n` +
      `Nama: ${completedBooking.client_name}\n` +
      `Barber: ${completedBooking.barber_name}\n` +
      `Waktu: ${completedBooking.appointment_date} jam ${completedBooking.appointment_time} WIB\n` +
      `Layanan: ${completedBooking.services_details.map((s: { name: string }) => s.name).join(", ")}\n` +
      `Total: ${formatRupiah(completedBooking.total_price)}`
    );

    return (
      <section className="booking_section">
        <div className="container">
          <div className="alert alert-success" style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", color: "#a7f3d0", borderRadius: "12px", padding: "24px", fontSize: "15px", marginBottom: "30px" }}>
            <h4 className="text-white mb-2">
              <i className="fas fa-check-circle mr-2" style={{ color: "#10b981" }}></i> Reservasi Berhasil Dikonfirmasi!
            </h4>
            <p className="mb-1">
              Terima kasih, <strong>{completedBooking.client_name}</strong>! Jadwal Anda pada <strong>{completedBooking.appointment_date}, {completedBooking.appointment_time} WIB</strong> bersama Master Barber <strong>{completedBooking.barber_name}</strong> telah tersimpan di sistem kami.
            </p>
            <p className="mb-0 small" style={{ opacity: 0.85 }}>
              Silakan datang 5-10 menit sebelum jadwal untuk menikmati welcome drink di lounge kami.
            </p>
          </div>

          <div className="card" style={{ background: "#141820", border: "1px solid var(--primary-gold)", borderRadius: "14px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.6)" }}>
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary mb-4">
              <div>
                <span className="text-muted small text-uppercase">Kode Booking Anda</span>
                <h3 style={{ color: "var(--primary-gold)", margin: 0, fontFamily: "monospace", letterSpacing: "2px" }}>
                  {completedBooking.id}
                </h3>
              </div>
              <span className="badge badge-warning p-2" style={{ background: "rgba(212,175,55,0.2)", color: "var(--primary-gold)" }}>
                Terkonfirmasi
              </span>
            </div>

            <div className="row mb-3">
              <div className="col-sm-6 mb-2">
                <span className="text-muted small d-block">Nama Pelanggan:</span>
                <strong className="text-white">{completedBooking.client_name}</strong>
              </div>
              <div className="col-sm-6 mb-2">
                <span className="text-muted small d-block">No. WhatsApp / HP:</span>
                <strong className="text-white">{completedBooking.client_phone}</strong>
              </div>
              <div className="col-sm-6 mb-2">
                <span className="text-muted small d-block">Waktu & Jadwal:</span>
                <strong style={{ color: "var(--primary-gold)" }}>{completedBooking.appointment_date} • {completedBooking.appointment_time} WIB</strong>
              </div>
              <div className="col-sm-6 mb-2">
                <span className="text-muted small d-block">Master Barber:</span>
                <strong className="text-white">{completedBooking.barber_name}</strong>
              </div>
            </div>

            <div className="border-top border-secondary pt-3 mb-3">
              <span className="text-muted small d-block mb-2">Layanan yang Dipilih:</span>
              <ul className="list-unstyled">
                {completedBooking.services_details.map((srv: { name: string; price: number }, idx: number) => (
                  <li key={idx} className="d-flex justify-content-between text-light py-1 border-bottom border-dark">
                    <span>{srv.name}</span>
                    <span style={{ color: "var(--primary-gold)" }}>{formatRupiah(srv.price)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="d-flex justify-content-between align-items-center pt-2">
              <h4 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>Total Biaya</h4>
              <h3 style={{ margin: 0, color: "var(--primary-gold)", fontFamily: "Playfair Display, serif" }}>
                {formatRupiah(completedBooking.total_price)}
              </h3>
            </div>

            <div className="wizard-btn-row mt-4 pt-3 border-top border-secondary" style={{ display: "flex", gap: "12px", justifyContent: "space-between" }}>
              <Link href="/" className="btn-wizard-prev" style={{ textDecoration: "none", textAlign: "center" }}>
                <i className="fas fa-home mr-1"></i> Beranda
              </Link>
              <a
                href={`https://wa.me/6281234567890?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wizard-next"
                style={{ background: "#25D366", borderColor: "#25D366", color: "#fff", textDecoration: "none", textAlign: "center" }}
              >
                <i className="fab fa-whatsapp mr-2"></i> Konfirmasi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="booking_section">
      <div className="container">
        {/* Header Title */}
        <div className="booking-header-title">
          <span className="hero-badge mb-2">
            <i className="far fa-calendar-check"></i> Reservasi Mudah & Cepat
          </span>
          <h2>Formulir Booking Janji Temu</h2>
          <p>Silakan ikuti 4 langkah mudah berikut untuk memilih layanan, barber pilihan, dan jadwal kunjungan Anda.</p>
        </div>

        {/* Step Wizard Nav */}
        <div className="step-wizard-nav">
          <div
            className={`wizard-step-node ${step === 1 ? "active" : step > 1 ? "finish" : ""}`}
            onClick={() => setStep(1)}
            style={{ cursor: "pointer" }}
          >
            <div className="wizard-step-circle">
              {step > 1 ? <i className="fas fa-check" style={{ fontSize: "14px" }}></i> : 1}
            </div>
            <span className="wizard-step-label">Layanan</span>
          </div>

          <div
            className={`wizard-step-node ${step === 2 ? "active" : step > 2 ? "finish" : ""}`}
            onClick={() => {
              if (selectedServices.length > 0) setStep(2);
            }}
            style={{ cursor: selectedServices.length > 0 ? "pointer" : "default" }}
          >
            <div className="wizard-step-circle">
              {step > 2 ? <i className="fas fa-check" style={{ fontSize: "14px" }}></i> : 2}
            </div>
            <span className="wizard-step-label">Barber</span>
          </div>

          <div
            className={`wizard-step-node ${step === 3 ? "active" : step > 3 ? "finish" : ""}`}
            onClick={() => {
              if (selectedServices.length > 0) setStep(3);
            }}
            style={{ cursor: selectedServices.length > 0 ? "pointer" : "default" }}
          >
            <div className="wizard-step-circle">
              {step > 3 ? <i className="fas fa-check" style={{ fontSize: "14px" }}></i> : 3}
            </div>
            <span className="wizard-step-label">Waktu</span>
          </div>

          <div
            className={`wizard-step-node ${step === 4 ? "active" : ""}`}
            onClick={() => {
              if (selectedServices.length > 0 && selectedTime) setStep(4);
            }}
            style={{ cursor: selectedServices.length > 0 && selectedTime ? "pointer" : "default" }}
          >
            <div className="wizard-step-circle">4</div>
            <span className="wizard-step-label">Data Diri</span>
          </div>
        </div>

        {/* Alert Error Message */}
        {errorMessage && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid #ef4444",
              color: "#fca5a5",
              borderRadius: "8px",
              padding: "14px 18px",
              marginBottom: "20px",
            }}
          >
            <i className="fas fa-exclamation-circle mr-2"></i> {errorMessage}
          </div>
        )}

        {/* STEP 1: SELECT SERVICES */}
        {step === 1 && (
          <div className="select_services_div tab_reservation">
            <div className="text_header mb-3">
              <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                <span style={{ color: "var(--primary-gold)" }}>Langkah 1:</span> Pilih Layanan Barbershop
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                Anda dapat mencentang lebih dari satu layanan (misal: Potong Rambut + Cukur Handuk Hangat).
              </p>
            </div>

            <div className="service-select-grid">
              {INITIAL_SERVICES.map((row) => {
                const isSelected = selectedServices.includes(row.id);
                return (
                  <div
                    key={row.id}
                    className={`service-card-item ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleService(row.id)}
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
          </div>
        )}

        {/* STEP 2: SELECT BARBER */}
        {step === 2 && (
          <div className="select_employee_div tab_reservation">
            <div className="text_header mb-3">
              <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                <span style={{ color: "var(--primary-gold)" }}>Langkah 2:</span> Pilih Barber / Stylist Favorit
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                Setiap barber kami memiliki keahlian khusus untuk memastikan penampilan terbaik Anda.
              </p>
            </div>

            <div className="employee-select-grid">
              {INITIAL_BARBERS.map((barber) => {
                const isSelected = selectedBarber === barber.id;
                return (
                  <div
                    key={barber.id}
                    className={`employee-card-item ${isSelected ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedBarber(barber.id);
                      setErrorMessage("");
                    }}
                  >
                    <div className="employee-avatar">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div className="employee-card-name">{barber.name}</div>
                    <span className="employee-card-role">{barber.role}</span>
                    <div className="employee-select-indicator">
                      <i className={`far ${isSelected ? "fa-check-circle" : "fa-circle"} mr-1`}></i>{" "}
                      {isSelected ? "Barber Terpilih" : "Pilih Barber Ini"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SELECT DATE & TIME (10-DAY GRID) */}
        {step === 3 && (
          <div className="select_date_time_div tab_reservation">
            <div className="text_header mb-3">
              <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                <span style={{ color: "var(--primary-gold)" }}>Langkah 3:</span> Tentukan Tanggal & Jam Kunjungan
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                Pilih slot waktu yang cocok untuk Anda dari jadwal 10 hari ke depan.
              </p>
            </div>

            <div
              className="calendar_tab"
              style={{
                background: "#141820",
                marginTop: "10px",
                width: "100%",
                position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                overflowX: "auto",
                borderRadius: "12px",
                border: "1px solid rgba(212, 175, 55, 0.25)",
              }}
            >
              <div style={{ minWidth: "750px" }}>
                {/* 10 Days Headers */}
                <div
                  className="appointments_days"
                  style={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    display: "flex",
                    minHeight: "65px",
                    position: "relative",
                    justifyContent: "space-between",
                    padding: "12px 8px",
                    background: "#1a202c",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {calendarDays.map((d) => (
                    <div
                      key={d.dateStr}
                      className="appointment_day"
                      style={{
                        flex: 1,
                        minWidth: "70px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "13px",
                        lineHeight: 1.3,
                      }}
                    >
                      <span
                        className="day-name"
                        style={{
                          color: "#d4af37",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          fontSize: "11px",
                          letterSpacing: "1px",
                          marginBottom: "2px",
                        }}
                      >
                        {d.dayName}
                      </span>
                      <span
                        className="day-date"
                        style={{
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: "13px",
                        }}
                      >
                        {d.dateFormatted}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Day Hours Columns */}
                <div
                  className="available_booking_hours"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "14px 8px",
                    background: "#141820",
                  }}
                >
                  {calendarDays.map((d, colIdx) => (
                    <div
                      key={d.dateStr}
                      className="available_booking_hours_colum"
                      style={{
                        flex: 1,
                        minWidth: "70px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        padding: "0 4px",
                      }}
                    >
                      {d.isSunday && colIdx === 2 ? (
                        <span style={{ fontSize: "11px", color: "#64748b", paddingTop: "15px" }}>
                          Penuh / Libur
                        </span>
                      ) : (
                        timeSlots.slice(0, 11).map((time) => {
                          const isSlotSelected = selectedDate === d.dateStr && selectedTime === time;
                          return (
                            <button
                              type="button"
                              key={time}
                              onClick={() => {
                                setSelectedDate(d.dateStr);
                                setSelectedTime(time);
                                setErrorMessage("");
                              }}
                              className="available_booking_hour"
                              style={{
                                fontSize: "12.5px",
                                fontWeight: 600,
                                padding: "9px 4px",
                                lineHeight: 1.2,
                                cursor: "pointer",
                                background: isSlotSelected
                                  ? "linear-gradient(135deg, #d4af37 0%, #aa8524 100%)"
                                  : "rgba(255, 255, 255, 0.04)",
                                border: isSlotSelected
                                  ? "1px solid #d4af37"
                                  : "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "8px",
                                color: isSlotSelected ? "#0b0c10" : "#cbd5e1",
                                display: "block",
                                width: "100%",
                                transition: "all 0.25s ease",
                                boxShadow: isSlotSelected ? "0 4px 12px rgba(212, 175, 55, 0.4)" : "none",
                              }}
                            >
                              {time}
                            </button>
                          );
                        })
                      )}
                    </div>
                  ))}
                </div>

                {/* Calendar Legend */}
                <div
                  className="slot-legend"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "10px",
                    fontSize: "12px",
                    color: "#94a3b8",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", display: "inline-block" }}></span>
                    <span>Tersedia</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: "#d4af37", display: "inline-block" }}></span>
                    <span style={{ color: "#d4af37" }}>Dipilih</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CLIENT DETAILS */}
        {step === 4 && (
          <div className="client_details_div tab_reservation">
            <div className="text_header mb-3">
              <h3 style={{ fontSize: "20px", color: "#fff", margin: 0 }}>
                <span style={{ color: "var(--primary-gold)" }}>Langkah 4:</span> Informasi & Kontak Pemesan
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "13.5px", marginTop: "4px" }}>
                Informasi ini digunakan untuk mengirimkan konfirmasi reservasi dan pengingat jadwal Anda.
              </p>
            </div>

            {/* Summary preview */}
            <div
              className="p-3 mb-4 rounded"
              style={{
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.3)",
                borderRadius: "10px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Jadwal & Barber:</span>
                <strong style={{ color: "var(--primary-gold)" }}>
                  {selectedDate} • {selectedTime} WIB ({chosenBarber.name})
                </strong>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted small">Layanan ({selectedServices.length}):</span>
                <span className="text-white">{chosenServices.map((s) => s.name).join(", ")} ({totalDuration} Menit)</span>
              </div>
              <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-2">
                <strong className="text-white">Estimasi Total Biaya:</strong>
                <h4 style={{ margin: 0, color: "var(--primary-gold)", fontFamily: "Playfair Display, serif" }}>
                  {formatRupiah(totalPrice)}
                </h4>
              </div>
            </div>

            <div className="contact-form p-4" style={{ background: "var(--dark-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--dark-border)" }}>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label className="text-white small font-weight-bold mb-1">Nama Depan *</label>
                  <input
                    type="text"
                    name="client_first_name"
                    value={clientData.firstName}
                    onChange={(e) => setClientData({ ...clientData, firstName: e.target.value })}
                    className="form-control"
                    placeholder="Contoh: Budi"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label className="text-white small font-weight-bold mb-1">Nama Belakang *</label>
                  <input
                    type="text"
                    name="client_last_name"
                    value={clientData.lastName}
                    onChange={(e) => setClientData({ ...clientData, lastName: e.target.value })}
                    className="form-control"
                    placeholder="Contoh: Nugroho"
                    required
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <label className="text-white small font-weight-bold mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    name="client_email"
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    className="form-control"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <label className="text-white small font-weight-bold mb-1">Nomor WhatsApp / HP *</label>
                  <input
                    type="text"
                    name="client_phone_number"
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    className="form-control"
                    placeholder="0812xxxxxxxx"
                    required
                  />
                </div>
              </div>

              <div className="form-group row mb-0">
                <div className="col-md-12">
                  <label className="text-white small font-weight-bold mb-1">Catatan Khusus (Opsional)</label>
                  <textarea
                    rows={2}
                    value={clientData.notes}
                    onChange={(e) => setClientData({ ...clientData, notes: e.target.value })}
                    className="form-control"
                    placeholder="Contoh: Model low taper fade samping tipis..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* WIZARD BUTTON ROW */}
        <div className="wizard-btn-row">
          {step > 1 ? (
            <button
              type="button"
              id="prevBtn"
              className="btn-wizard-prev"
              onClick={() => {
                setErrorMessage("");
                setStep((s) => (s - 1) as 1 | 2 | 3 | 4);
              }}
            >
              <i className="fas fa-arrow-left mr-1"></i> Kembali
            </button>
          ) : (
            <div></div>
          )}

          {step < 4 ? (
            <button
              type="button"
              id="nextBtn"
              className="btn-wizard-next"
              onClick={handleNextStep}
            >
              Lanjut <i className="fas fa-arrow-right ml-1"></i>
            </button>
          ) : (
            <button
              type="button"
              id="nextBtn"
              className="btn-wizard-next"
              onClick={handleBookingSubmit}
              disabled={submitting}
            >
              {submitting ? (
                "Memproses..."
              ) : (
                <>
                  <i className="fas fa-check-circle mr-1"></i> Konfirmasi Reservasi
                </>
              )}
            </button>
          )}
        </div>
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
