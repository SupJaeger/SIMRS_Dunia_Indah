"use client";

import { useState } from "react";
import { ArrowLeft, Save, UserRound, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AsesmenAwalPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    tekananDarah: "",
    nadi: "",
    suhu: "",
    pernapasan: "",
    saturasi: "",
    beratBadan: "",
    tinggiBadan: "",
    keluhanAwal: "",
    alergi: "Tidak ada alergi",
    detailAlergi: "",
    catatan: "",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.tekananDarah ||
      !form.nadi ||
      !form.suhu ||
      !form.pernapasan ||
      !form.keluhanAwal
    ) {
      alert("Mohon lengkapi field yang wajib diisi.");
      return;
    }

    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Header halaman */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-teal-600"
            >
              <ArrowLeft size={18} />
              Kembali ke Dashboard
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Asesmen Awal Keperawatan
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Pengkajian awal kondisi pasien oleh perawat
              </p>
            </div>
          </div>

          {/* Identitas pasien */}
          <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <UserRound size={20} className="text-teal-600" />

              <h2 className="text-lg font-semibold text-gray-900">
                Identitas Pasien
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <p className="text-xs text-gray-500">Nama Pasien</p>
                <p className="mt-1 font-medium text-gray-900">
                  Budi Santoso
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">No. Rekam Medis</p>
                <p className="mt-1 font-mono font-medium text-gray-900">
                  RM-202600123
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Tanggal Lahir</p>
                <p className="mt-1 font-medium text-gray-900">
                  12 Mei 1985
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Status Kunjungan</p>

                <span className="mt-1 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Sedang Dilayani
                </span>
              </div>
            </div>
          </section>

          <form onSubmit={handleSubmit}>
            {/* TTV */}
            <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Tanda-Tanda Vital
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Masukkan hasil pemeriksaan tanda-tanda vital pasien.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {/* Tekanan darah */}
                <div>
                  <label
                    htmlFor="tekananDarah"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Tekanan Darah <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="tekananDarah"
                      name="tekananDarah"
                      type="text"
                      value={form.tekananDarah}
                      onChange={handleChange}
                      placeholder="120/80"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-14 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      mmHg
                    </span>
                  </div>
                </div>

                {/* Nadi */}
                <div>
                  <label
                    htmlFor="nadi"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Nadi <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="nadi"
                      name="nadi"
                      type="number"
                      min="0"
                      value={form.nadi}
                      onChange={handleChange}
                      placeholder="80"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-12 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      x/mnt
                    </span>
                  </div>
                </div>

                {/* Suhu */}
                <div>
                  <label
                    htmlFor="suhu"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Suhu Tubuh <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="suhu"
                      name="suhu"
                      type="number"
                      step="0.1"
                      min="0"
                      value={form.suhu}
                      onChange={handleChange}
                      placeholder="36.5"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-12 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      °C
                    </span>
                  </div>
                </div>

                {/* Pernapasan */}
                <div>
                  <label
                    htmlFor="pernapasan"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Frekuensi Pernapasan{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="pernapasan"
                      name="pernapasan"
                      type="number"
                      min="0"
                      value={form.pernapasan}
                      onChange={handleChange}
                      placeholder="20"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-14 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      x/mnt
                    </span>
                  </div>
                </div>

                {/* SpO2 */}
                <div>
                  <label
                    htmlFor="saturasi"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Saturasi Oksigen
                  </label>

                  <div className="relative">
                    <input
                      id="saturasi"
                      name="saturasi"
                      type="number"
                      min="0"
                      max="100"
                      value={form.saturasi}
                      onChange={handleChange}
                      placeholder="98"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-8 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      %
                    </span>
                  </div>
                </div>

                {/* Berat badan */}
                <div>
                  <label
                    htmlFor="beratBadan"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Berat Badan
                  </label>

                  <div className="relative">
                    <input
                      id="beratBadan"
                      name="beratBadan"
                      type="number"
                      min="0"
                      step="0.1"
                      value={form.beratBadan}
                      onChange={handleChange}
                      placeholder="65"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-12 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      kg
                    </span>
                  </div>
                </div>

                {/* Tinggi badan */}
                <div>
                  <label
                    htmlFor="tinggiBadan"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Tinggi Badan
                  </label>

                  <div className="relative">
                    <input
                      id="tinggiBadan"
                      name="tinggiBadan"
                      type="number"
                      min="0"
                      value={form.tinggiBadan}
                      onChange={handleChange}
                      placeholder="170"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-12 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />

                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                      cm
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Keluhan */}
            <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Keluhan Awal
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Catat keluhan utama yang disampaikan pasien.
                </p>
              </div>

              <div>
                <label
                  htmlFor="keluhanAwal"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Keluhan Utama <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="keluhanAwal"
                  name="keluhanAwal"
                  rows={4}
                  value={form.keluhanAwal}
                  onChange={handleChange}
                  placeholder="Tuliskan keluhan utama pasien..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </section>

            {/* Alergi */}
            <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-start gap-3">
                <div className="rounded-lg bg-orange-50 p-2">
                  <AlertCircle size={20} className="text-orange-500" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Konfirmasi Alergi
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Pastikan status alergi pasien telah dikonfirmasi.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="alergi"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Status Alergi <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="alergi"
                    name="alergi"
                    value={form.alergi}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="Tidak ada alergi">
                      Tidak ada alergi
                    </option>
                    <option value="Ada alergi">Ada alergi</option>
                    <option value="Belum diketahui">
                      Belum diketahui
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="detailAlergi"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Detail Alergi
                  </label>

                  <input
                    id="detailAlergi"
                    name="detailAlergi"
                    type="text"
                    value={form.detailAlergi}
                    onChange={handleChange}
                    placeholder="Contoh: Amoksisilin, makanan, dll."
                    disabled={form.alergi !== "Ada alergi"}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition disabled:bg-gray-100 disabled:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </section>

            {/* Catatan */}
            <section className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">
                Catatan Tambahan
              </h2>

              <textarea
                id="catatan"
                name="catatan"
                rows={4}
                value={form.catatan}
                onChange={handleChange}
                placeholder="Tambahkan catatan keperawatan jika diperlukan..."
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </section>

            {/* Feedback */}
            {saved && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                Asesmen awal keperawatan berhasil disimpan.
              </div>
            )}

            {/* Action */}
            <div className="flex justify-end gap-3 pb-6">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              >
                <Save size={18} />
                Simpan Asesmen
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}