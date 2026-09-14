"use client";

import { useState } from "react";
import { ArrowLeft, ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function OrderAktifPage() {
  const router = useRouter();

  const [orders, setOrders] = useState([
    {
      id: 1,
      pasien: "Budi Santoso",
      noRM: "RM-202600123",
      dokter: "dr. Andi Pratama",
      waktu: "09:15",
      jenis: "Obat",
      detail: "Paracetamol 500 mg",
      instruksi: "3 x 1 tablet setelah makan",
      status: "Menunggu",
    },
    {
      id: 2,
      pasien: "Budi Santoso",
      noRM: "RM-202600123",
      dokter: "dr. Andi Pratama",
      waktu: "09:20",
      jenis: "Laboratorium",
      detail: "Darah Lengkap",
      instruksi: "Segera dilakukan",
      status: "Menunggu",
    },
    {
      id: 3,
      pasien: "Siti Aminah",
      noRM: "RM-202600124",
      dokter: "dr. Budi Wijaya",
      waktu: "09:35",
      jenis: "Obat",
      detail: "Amoxicillin 500 mg",
      instruksi: "3 x 1 kapsul",
      status: "Diproses",
    },
    {
      id: 4,
      pasien: "Siti Aminah",
      noRM: "RM-202600124",
      dokter: "dr. Budi Wijaya",
      waktu: "09:40",
      jenis: "Radiologi",
      detail: "Rontgen Thorax",
      instruksi: "PA",
      status: "Selesai",
    },
  ]);

  const handleStatusChange = (id: number) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status:
                order.status === "Menunggu"
                  ? "Diproses"
                  : order.status === "Diproses"
                    ? "Selesai"
                    : "Selesai",
            }
          : order
      )
    );
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-700";
      case "Diproses":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Header halaman */}
          <div className="mb-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100"
              aria-label="Kembali ke dashboard"
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Order Aktif
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Daftar order pelayanan pasien yang sedang berjalan
              </p>
            </div>
          </div>

          {/* Ringkasan */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Order</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {orders.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <ClipboardList size={22} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Menunggu</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {orders.filter((order) => order.status === "Menunggu").length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                  <Clock size={22} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Selesai</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {orders.filter((order) => order.status === "Selesai").length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <CheckCircle2 size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* Tabel order */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="font-semibold text-gray-900">
                Daftar Order
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4">Pasien</th>
                    <th className="px-6 py-4">Dokter</th>
                    <th className="px-6 py-4">Waktu</th>
                    <th className="px-6 py-4">Jenis</th>
                    <th className="px-6 py-4">Detail Order</th>
                    <th className="px-6 py-4">Instruksi</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {order.pasien}
                        </p>
                        <p className="mt-1 font-mono text-xs text-gray-500">
                          {order.noRM}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {order.dokter}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {order.waktu}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                          {order.jenis}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.detail}
                      </td>

                      <td className="max-w-55 px-6 py-4 text-gray-600">
                        {order.instruksi}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {order.status !== "Selesai" ? (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(order.id)}
                            className="rounded-lg bg-teal-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-teal-700"
                          >
                            {order.status === "Menunggu"
                              ? "Proses"
                              : "Selesaikan"}
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400">
                            Selesai
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}