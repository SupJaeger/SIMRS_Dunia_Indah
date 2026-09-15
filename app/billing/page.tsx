"use client";

import { useState } from "react";
import {
  Search,
  Receipt,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Save,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type BillingItem = {
  id: number;
  category: string;
  description: string;
  qty: number;
  price: number;
  total: number;
};

const billingItems: BillingItem[] = [
  {
    id: 1,
    category: "Layanan",
    description: "Konsultasi Dokter Spesialis",
    qty: 1,
    price: 250000,
    total: 250000,
  },
  {
    id: 2,
    category: "Laboratorium",
    description: "Pemeriksaan Darah Lengkap",
    qty: 1,
    price: 175000,
    total: 175000,
  },
  {
    id: 3,
    category: "Radiologi",
    description: "Rontgen Thorax",
    qty: 1,
    price: 300000,
    total: 300000,
  },
  {
    id: 4,
    category: "Obat",
    description: "Paracetamol 500 mg",
    qty: 10,
    price: 5000,
    total: 50000,
  },
  {
    id: 5,
    category: "Tindakan",
    description: "Injeksi",
    qty: 1,
    price: 75000,
    total: 75000,
  },
];

export default function BillingPage() {
  const [search, setSearch] = useState("RM-001246");
  const [generated, setGenerated] = useState(true);
  const [validated, setValidated] = useState(false);
  const [saved, setSaved] = useState(false);

  const grossAmount = billingItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const handleGenerate = () => {
    setGenerated(true);
    setValidated(false);
    setSaved(false);
  };

  const handleValidate = () => {
    setValidated(true);
  };

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola dan validasi komponen tagihan pasien.
            </p>
          </div>

          <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  No. RM / No. Kunjungan
                </label>

                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
              >
                <RefreshCw size={17} />
                Generate / Recalculate Bill
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-200 p-5">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Komponen Tagihan
                  </h2>
                  <p className="text-sm text-gray-500">
                    Andi Pratama · RM-001246
                  </p>
                </div>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  {saved ? "PRELIMINARY" : "DRAFT"}
                </span>
              </div>

              {!generated ? (
                <div className="p-12 text-center">
                  <Receipt
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-3 font-medium text-gray-700">
                    Tagihan belum digenerate
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Tekan tombol Generate / Recalculate Bill.
                  </p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-175 text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-left">
                          <th className="px-5 py-3 font-semibold text-gray-600">
                            Kategori
                          </th>
                          <th className="px-5 py-3 font-semibold text-gray-600">
                            Item
                          </th>
                          <th className="px-5 py-3 text-center font-semibold text-gray-600">
                            Qty
                          </th>
                          <th className="px-5 py-3 text-right font-semibold text-gray-600">
                            Tarif
                          </th>
                          <th className="px-5 py-3 text-right font-semibold text-gray-600">
                            Total
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {billingItems.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-100"
                          >
                            <td className="px-5 py-4 text-gray-600">
                              {item.category}
                            </td>

                            <td className="px-5 py-4 font-medium text-gray-800">
                              {item.description}
                            </td>

                            <td className="px-5 py-4 text-center text-gray-700">
                              {item.qty}
                            </td>

                            <td className="px-5 py-4 text-right text-gray-700">
                              Rp {item.price.toLocaleString("id-ID")}
                            </td>

                            <td className="px-5 py-4 text-right font-medium text-gray-900">
                              Rp {item.total.toLocaleString("id-ID")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t border-gray-200 p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">
                        Total Bruto
                      </span>

                      <span className="text-xl font-bold text-gray-900">
                        Rp {grossAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h2 className="font-semibold text-gray-900">
                  Validasi Tagihan
                </h2>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />
                    <span className="text-sm text-green-700">
                      Tidak ada item duplikat
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />
                    <span className="text-sm text-green-700">
                      Semua tarif tersedia
                    </span>
                  </div>

                  <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3">
                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />
                    <span className="text-sm text-green-700">
                      Tidak ada charge void
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleValidate}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-teal-600 px-4 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50"
                >
                  <CheckCircle2 size={17} />
                  Validasi Tagihan
                </button>

                {validated && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    <CheckCircle2 size={16} />
                    Tagihan berhasil divalidasi.
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h2 className="font-semibold text-gray-900">
                  Simpan Tagihan
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Simpan snapshot tagihan sebagai invoice sementara.
                </p>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!validated}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <Save size={17} />
                  Simpan Tagihan Sementara
                </button>

                {saved && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                    <CheckCircle2 size={16} />
                    Tagihan berhasil disimpan.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}