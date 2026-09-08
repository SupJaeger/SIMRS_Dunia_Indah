"use client";

export default function VisitFilter() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Tanggal */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Tanggal
          </label>

          <input
            type="date"
            defaultValue="2026-09-07"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* Poli */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Poli
          </label>

          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            defaultValue=""
          >
            <option value="">Semua Poli</option>
            <option value="penyakit-dalam">
              Penyakit Dalam
            </option>
            <option value="anak">
              Anak
            </option>
            <option value="bedah">
              Bedah
            </option>
            <option value="saraf">
              Saraf
            </option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Status
          </label>

          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            defaultValue=""
          >
            <option value="">Semua Status</option>
            <option value="menunggu">
              Menunggu
            </option>
            <option value="pemeriksaan">
              Dalam Pemeriksaan
            </option>
            <option value="selesai">
              Selesai
            </option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Cari Pasien
          </label>

          <input
            type="text"
            placeholder="Nama atau No. RM"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>

      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Reset
        </button>

        <button
          type="button"
          className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          Terapkan Filter
        </button>
      </div>
    </div>
  );
}