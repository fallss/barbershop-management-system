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
    <div className="min-h-screen bg-[#0b0c10] text-[#f8f9fa] pb-16">
      {/* Top Navbar */}
      <header className="bg-[#141721] border-b border-[#d4af37]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/admin" className="text-xs text-[#d4af37] hover:underline font-bold">
              ← Kembali ke Dashboard
            </Link>
          </div>
          <button
            onClick={() => setNewServiceModal(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#fce8a6] via-[#d4af37] to-[#b89628] text-[#0b0c10] font-bold text-xs shadow hover:scale-105 transition-all"
          >
            + Tambah Layanan Baru
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Katalog Layanan & Perawatan
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Atur menu potong rambut, shave, spa wajah, dan durasi pengerjaan.
          </p>
        </div>

        <div className="bg-[#141721] rounded-2xl border border-[#d4af37]/20 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0b0c10] text-gray-400 uppercase tracking-wider text-[10px] border-b border-gray-800">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Nama Layanan</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Deskripsi</th>
                  <th className="py-3 px-4">Durasi</th>
                  <th className="py-3 px-4">Tarif</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {services.map((item) => {
                  const cat = INITIAL_CATEGORIES.find((c) => c.id === item.category_id);
                  return (
                    <tr key={item.id} className="hover:bg-[#191d2b] transition-colors">
                      <td className="py-4 px-4 font-mono font-bold text-gray-400">#{item.id}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-bold text-white flex items-center space-x-2">
                          <span>{item.name}</span>
                          {item.popular && (
                            <span className="text-[9px] bg-[#d4af37] text-[#0b0c10] px-1.5 py-0.5 rounded font-extrabold uppercase">
                              Favorit
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-gray-300">
                        {cat ? `${cat.icon} ${cat.name}` : "-"}
                      </td>
                      <td className="py-4 px-4 text-gray-400 max-w-sm">{item.description}</td>
                      <td className="py-4 px-4 whitespace-nowrap text-[#d4af37] font-semibold">
                        {item.duration_min} Menit
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap font-serif font-bold text-[#fce8a6]">
                        {formatRupiah(item.price)}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleDeleteService(item.id, item.name)}
                          className="px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-800 text-red-300 border border-red-800 font-bold text-[10px]"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Add Service */}
      {newServiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#141721] border border-[#d4af37]/40 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-serif">Tambah Layanan Baru</h3>

            <form onSubmit={handleAddService} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-semibold">Nama Layanan *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Royal Scalp Treatment"
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-gray-700 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-semibold">Kategori *</label>
                <select
                  value={form.category_id}
                  onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-gray-700 text-white focus:border-[#d4af37] focus:outline-none"
                >
                  {INITIAL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">Tarif (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-gray-700 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-semibold">Durasi (Menit) *</label>
                  <input
                    type="number"
                    required
                    value={form.duration_min}
                    onChange={(e) => setForm({ ...form, duration_min: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-gray-700 text-white focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-semibold">Deskripsi Layanan *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Jelaskan detail pengerjaan dan fasilitas..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0c10] border border-gray-700 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="popular"
                  checked={form.popular}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  className="rounded border-gray-700 text-[#d4af37] focus:ring-0"
                />
                <label htmlFor="popular" className="text-gray-300 font-medium">
                  Tandai sebagai Layanan Favorit / Unggulan
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setNewServiceModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#d4af37] text-[#0b0c10] font-bold hover:bg-white"
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
