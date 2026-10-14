"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { INITIAL_SERVICES, INITIAL_BARBERS, INITIAL_CATEGORIES, formatRupiah, Service, Barber } from "@/lib/data";

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

  // Set initial selections from URL query
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

  // Default first date
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].dateStr);
    }
  }, [selectedDate, availableDates]);

  // Available Time Slots (09:00 - 20:30)
  const timeSlots = [
    "09:00", "09:45", "10:30", "11:15", "13:00", "13:45",
    "14:30", "15:15", "16:00", "16:45", "17:30", "18:15",
    "19:00", "19:45", "20:30"
  ];

  // Calculate totals
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

  // SUCCESS CONFIRMATION VIEW
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
      <div className="min-h-screen bg-[#0b0c10] py-16 px-4">
        <div className="max-w-2xl mx-auto bg-[#141721] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#aa8014] mx-auto flex items-center justify-center text-3xl shadow-lg shadow-[#d4af37]/30">
              ✓
            </div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
              Reservasi Berhasil Diajukan!
            </span>
            <h2 className="text-3xl font-bold font-serif text-white">
              Tiket Reservasi Barberia Luxe
            </h2>
            <p className="text-xs text-gray-400">
              Simpan bukti reservasi ini atau tunjukkan kode booking saat tiba di lokasi.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="mt-8 bg-[#0b0c10] border border-gray-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-800">
              <div>
                <span className="text-[10px] uppercase text-gray-500 font-semibold block">Kode Booking</span>
                <span className="text-2xl font-extrabold text-[#fce8a6] font-mono tracking-wider">
                  {completedBooking.id}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 border border-amber-600/50 text-amber-300">
                Menunggu Konfirmasi
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block">Nama Pelanggan</span>
                <span className="text-white font-semibold">{completedBooking.client_name}</span>
              </div>
              <div>
                <span className="text-gray-500 block">WhatsApp / Telepon</span>
                <span className="text-white font-semibold">{completedBooking.client_phone}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Tanggal & Jam</span>
                <span className="text-white font-semibold">
                  {completedBooking.appointment_date} • {completedBooking.appointment_time} WIB
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Master Barber</span>
                <span className="text-white font-semibold">{completedBooking.barber_name}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <span className="text-[10px] text-gray-500 uppercase font-semibold block mb-2">
                Daftar Layanan:
              </span>
              <ul className="space-y-1.5 text-xs">
                {completedBooking.services_details.map((srv: any, idx: number) => (
                  <li key={idx} className="flex justify-between text-gray-300">
                    <span>{srv.name}</span>
                    <span className="text-[#fce8a6] font-semibold">{formatRupiah(srv.price)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
              <span className="text-sm font-bold text-white">Total Biaya Pembayaran</span>
              <span className="text-xl font-extrabold text-[#fce8a6] font-serif">
                {formatRupiah(completedBooking.total_price)}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 italic">
              *Pembayaran dilakukan di kasir setelah layanan selesai (Menerima QRIS, Debit, Kredit & Tunai).
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href={`https://wa.me/6281234567890?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm text-center shadow-lg transition-colors flex items-center justify-center space-x-2"
            >
              <span>💬 Kirim ke WhatsApp Kami</span>
            </a>
            <Link
              href="/"
              className="py-3.5 px-6 rounded-xl bg-[#1c202e] border border-gray-700 hover:border-gray-500 text-white font-semibold text-sm text-center transition-colors"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs text-[#d4af37] hover:underline uppercase tracking-wider font-semibold mb-3"
          >
            <span>← Kembali ke Beranda</span>
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white">
            Reservasi Jadwal <span className="gold-gradient-text">Barberia Luxe</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            Pesan sesi potong rambut dan perawatan eksklusif Anda dalam 4 langkah mudah.
          </p>
        </div>

        {/* STEPPER PROGRESS */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-10 text-center">
          {[
            { num: 1, label: "Layanan" },
            { num: 2, label: "Barber" },
            { num: 3, label: "Jadwal" },
            { num: 4, label: "Data Diri" },
          ].map((item) => (
            <button
              key={item.num}
              onClick={() => {
                if (item.num === 1) setStep(1);
                if (item.num === 2 && selectedServices.length > 0) setStep(2);
                if (item.num === 3 && selectedServices.length > 0) setStep(3);
                if (item.num === 4 && selectedServices.length > 0 && selectedTime) setStep(4);
              }}
              className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                step === item.num
                  ? "bg-[#d4af37] text-[#0b0c10] border-[#d4af37] shadow-lg shadow-[#d4af37]/20"
                  : step > item.num
                  ? "bg-[#141721] text-[#d4af37] border-[#d4af37]/40"
                  : "bg-[#11131a] text-gray-500 border-gray-800"
              }`}
            >
              <span className="block text-[10px] opacity-75">Langkah {item.num}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center justify-between">
            <span>⚠️ {errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="font-bold ml-2">✕</button>
          </div>
        )}

        {/* STEP 1: PILIH LAYANAN */}
        {step === 1 && (
          <div className="bg-[#141721] rounded-2xl border border-[#d4af37]/20 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-xl font-bold font-serif text-white">Langkah 1: Pilih Layanan</h3>
                <p className="text-xs text-gray-400">Anda dapat memilih satu atau beberapa layanan sekaligus.</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#d4af37] font-semibold block">
                  {selectedServices.length} Layanan Dipilih • {totalDuration} Menit
                </span>
                <span className="text-base font-extrabold text-[#fce8a6] font-serif">
                  Total: {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>

            {INITIAL_CATEGORIES.map((cat) => {
              const catServices = INITIAL_SERVICES.filter((s) => s.category_id === cat.id);
              return (
                <div key={cat.id} className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-bold text-[#d4af37] uppercase tracking-wider">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catServices.map((service) => {
                      const isSelected = selectedServices.includes(service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={`p-4 rounded-xl cursor-pointer border transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-[#1f2433] border-[#d4af37] shadow-md shadow-[#d4af37]/15 ring-1 ring-[#d4af37]"
                              : "bg-[#0b0c10] border-gray-800 hover:border-gray-600"
                          }`}
                        >
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="text-sm font-bold text-white">{service.name}</h4>
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                                  isSelected
                                    ? "bg-[#d4af37] text-[#0b0c10]"
                                    : "border border-gray-600 text-transparent"
                                }`}
                              >
                                ✓
                              </div>
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed mb-3">
                              {service.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs">
                            <span className="text-gray-500">⏱ {service.duration_min} Menit</span>
                            <span className="text-sm font-extrabold text-[#fce8a6] font-serif">
                              {formatRupiah(service.price)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="pt-6 border-t border-gray-800 flex justify-end">
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100"
              >
                Lanjut ke Pilih Barber ({selectedServices.length} Dipilih) →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PILIH BARBER */}
        {step === 2 && (
          <div className="bg-[#141721] rounded-2xl border border-[#d4af37]/20 p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-xl font-bold font-serif text-white">Langkah 2: Pilih Master Barber</h3>
              <p className="text-xs text-gray-400">
                Pilih barber langganan Anda atau pilih &quot;Siapa Saja yang Tersedia&quot; untuk jadwal tercepat.
              </p>
            </div>

            {/* Option: Any Barber */}
            <div
              onClick={() => setSelectedBarber(null)}
              className={`p-5 rounded-xl cursor-pointer border transition-all flex items-center justify-between ${
                selectedBarber === null
                  ? "bg-[#1f2433] border-[#d4af37] ring-1 ring-[#d4af37]"
                  : "bg-[#0b0c10] border-gray-800 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-[#2a2e3d] flex items-center justify-center text-xl">
                  ⚡
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Siapa Saja yang Tersedia (Any Barber)</h4>
                  <p className="text-xs text-gray-400">
                    Sistem akan mencocokkan Anda dengan master barber profesional yang siap pada jam yang Anda pilih.
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  selectedBarber === null
                    ? "bg-[#d4af37] text-[#0b0c10]"
                    : "border border-gray-600 text-transparent"
                }`}
              >
                ✓
              </div>
            </div>

            {/* Specific Barbers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INITIAL_BARBERS.map((barber) => {
                const isSelected = selectedBarber === barber.id;
                return (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarber(barber.id)}
                    className={`rounded-2xl overflow-hidden cursor-pointer border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#1f2433] border-[#d4af37] ring-1 ring-[#d4af37] shadow-lg shadow-[#d4af37]/20"
                        : "bg-[#0b0c10] border-gray-800 hover:border-gray-600"
                    }`}
                  >
                    <div className="relative h-44 w-full">
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-[#0b0c10]/80 px-2 py-0.5 rounded-full text-xs font-bold text-[#fce8a6] flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{barber.rating}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-[#d4af37] uppercase font-bold tracking-wider">
                          {barber.role}
                        </span>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? "bg-[#d4af37] text-[#0b0c10]"
                              : "border border-gray-600 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </div>
                      <h4 className="text-base font-bold text-white">{barber.name}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2">{barber.bio}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-gray-800 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors"
              >
                ← Kembali ke Layanan
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all"
              >
                Lanjut ke Pilih Jadwal →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PILIH JADWAL & WAKTU */}
        {step === 3 && (
          <div className="bg-[#141721] rounded-2xl border border-[#d4af37]/20 p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-xl font-bold font-serif text-white">Langkah 3: Pilih Tanggal & Waktu</h3>
              <p className="text-xs text-gray-400">Pilih tanggal kunjungan dalam 10 hari ke depan dan slot waktu yang nyaman.</p>
            </div>

            {/* Date Selector Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                1. Pilih Tanggal:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {availableDates.map((d) => {
                  const isSelected = selectedDate === d.dateStr;
                  return (
                    <button
                      key={d.dateStr}
                      type="button"
                      onClick={() => setSelectedDate(d.dateStr)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "bg-[#d4af37] text-[#0b0c10] border-[#d4af37] shadow-lg shadow-[#d4af37]/25"
                          : "bg-[#0b0c10] text-gray-300 border-gray-800 hover:border-gray-600"
                      }`}
                    >
                      <span className="block text-xs font-bold">{d.dayName}</span>
                      <span className="block text-sm font-extrabold mt-0.5">{d.dateFormatted}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots Selector */}
            <div className="pt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                2. Pilih Jam / Waktu Mulai:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl border text-center text-sm font-bold transition-all ${
                        isSelected
                          ? "bg-[#d4af37] text-[#0b0c10] border-[#d4af37] shadow-lg shadow-[#d4af37]/25 scale-105"
                          : "bg-[#0b0c10] text-gray-300 border-gray-800 hover:border-gray-600"
                      }`}
                    >
                      {time} WIB
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors"
              >
                ← Kembali ke Barber
              </button>
              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(4)}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all disabled:opacity-40 disabled:hover:scale-100"
              >
                Lanjut ke Data Diri →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DATA DIRI & KONFIRMASI AKHIR */}
        {step === 4 && (
          <div className="bg-[#141721] rounded-2xl border border-[#d4af37]/20 p-6 sm:p-8 space-y-6">
            <div className="border-b border-gray-800 pb-4">
              <h3 className="text-xl font-bold font-serif text-white">Langkah 4: Informasi Pelanggan</h3>
              <p className="text-xs text-gray-400">
                Lengkapi kontak Anda untuk konfirmasi jadwal dan notifikasi pengingat sebelum waktu potong rambut.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-[#0b0c10] border border-gray-800 rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-800">
                <span className="text-gray-400">Ringkasan Jadwal:</span>
                <span className="text-[#fce8a6] font-bold">
                  {selectedDate} • {selectedTime} WIB (Barber: {chosenBarber ? chosenBarber.name : "Siapa Saja"})
                </span>
              </div>
              <div className="space-y-1 text-xs">
                {chosenServices.map((s) => (
                  <div key={s.id} className="flex justify-between text-gray-300">
                    <span>{s.name} ({s.duration_min} mnt)</span>
                    <span className="font-semibold text-white">{formatRupiah(s.price)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                <span className="text-sm font-bold text-white">Total Biaya Reservasi:</span>
                <span className="text-xl font-extrabold text-[#fce8a6] font-serif">
                  {formatRupiah(totalPrice)}
                </span>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={clientData.name}
                  onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                  placeholder="Contoh: Raditya Danu"
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    No. WhatsApp / HP Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientData.phone}
                    onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                    placeholder="081234567890"
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientData.email}
                    onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Catatan Khusus (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={clientData.notes}
                  onChange={(e) => setClientData({ ...clientData, notes: e.target.value })}
                  placeholder="Contoh: Kulit sensitif, ingin model fade samping tipis, atau permintaan khusus lainnya..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-gray-700 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors"
                >
                  ← Kembali ke Jadwal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-sm shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {submitting ? "Memproses Reservasi..." : "Konfirmasi Reservasi Sekarang →"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0c10] text-center py-20 text-white">Memuat Sistem Booking...</div>}>
      <BookingContent />
    </Suspense>
  );
}
