"use client";

import { useState } from "react";
import {
    Activity,
    ArrowLeft,
    Check,  
    ClipboardList,
    FlaskConical,
    HeartPulse,
    Hospital,
    Pill,
    Plus,
    Save,
    ScanLine,
    Stethoscope,
    Trash2,
    User,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useRole } from "../../Context/RoleContext";

type OrderType =
  | "tindakan"
  | "resep"
  | "laboratorium"
  | "radiologi"
  | "rujukan";

type Order = {
  id: number;
  type: OrderType;
  name: string;
  description: string;
};

export default function OrderPage() {
  const router = useRouter();
  const { role } = useRole();

  const [activeType, setActiveType] = useState<OrderType>("tindakan");

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      type: "tindakan",
      name: "Observasi kondisi umum",
      description: "Monitoring kondisi pasien secara berkala",
    },
  ]);

  const [notes, setNotes] = useState("");

  const isDoctor = role === "dokter" || role === "admin";

  const orderTypes = [
    {
      id: "tindakan" as OrderType,
      title: "Tindakan",
      icon: Stethoscope,
    },
    {
      id: "resep" as OrderType,
      title: "E-Resep",
      icon: Pill,
    },
    {
      id: "laboratorium" as OrderType,
      title: "Laboratorium",
      icon: FlaskConical,
    },
    {
      id: "radiologi" as OrderType,
      title: "Radiologi",
      icon: ScanLine,
    },
    {
      id: "rujukan" as OrderType,
      title: "Rujukan",
      icon: Hospital,
    },
  ];

  const addOrder = () => {
    const newOrder: Order = {
      id: Date.now(),
      type: activeType,
      name:
        activeType === "tindakan"
          ? "Pemeriksaan lanjutan"
          : activeType === "resep"
            ? "Paracetamol 500 mg"
            : activeType === "laboratorium"
              ? "Pemeriksaan Darah Lengkap"
              : activeType === "radiologi"
                ? "Foto Thorax"
                : "Rujukan ke Dokter Spesialis",
      description:
        activeType === "tindakan"
          ? "Tindakan medis sesuai kebutuhan pasien"
          : activeType === "resep"
            ? "3 x 1 tablet setelah makan"
            : activeType === "laboratorium"
              ? "Pemeriksaan darah lengkap"
              : activeType === "radiologi"
                ? "Pemeriksaan radiologi sesuai indikasi"
                : "Rujukan untuk pemeriksaan lebih lanjut",
    };

    setOrders((prev) => [...prev, newOrder]);
  };

  const removeOrder = (id: number) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  if (!isDoctor) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Akses Ditolak
          </h2>

          <p className="mt-2 text-sm text-red-600">
            Halaman Rencana Pelayanan hanya dapat diakses oleh dokter.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Rencana Pelayanan / Order
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Tentukan rencana pelayanan dan order untuk pasien
          </p>
        </div>
      </div>

      {/* Patient Information */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <User size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Budi Santoso
            </h2>

            <p className="text-sm text-gray-500">
              RM-001245 • Laki-laki • 45 tahun
            </p>
          </div>
        </div>

        <div className="grid gap-4 p-5 md:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Tanggal Kunjungan</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              14 September 2026
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Dokter</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              dr. Andi Wijaya
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Status EMR</p>
            <span className="mt-1 inline-flex rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
              Draft
            </span>
          </div>
        </div>
      </div>

      {/* Clinical Context */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
            <ClipboardList size={19} className="text-blue-600" />
            <h2 className="font-semibold text-gray-900">
              Diagnosis
            </h2>
          </div>

          <div className="space-y-3 p-5">
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-medium text-blue-600">
                Diagnosis Utama
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-900">
                Hipertensi Esensial
              </p>

              <p className="mt-1 text-xs text-gray-500">
                ICD-10: I10
              </p>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">
                Diagnosis Sekunder
              </p>

              <p className="mt-1 text-sm font-medium text-gray-800">
                Tidak ada
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
            <HeartPulse size={19} className="text-red-500" />
            <h2 className="font-semibold text-gray-900">
              Informasi Klinis
            </h2>
          </div>

          <div className="space-y-3 p-5">
            <div>
              <p className="text-xs text-gray-500">
                Keluhan Utama
              </p>

              <p className="mt-1 text-sm text-gray-800">
                Sakit kepala sejak 3 hari
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Tekanan Darah
              </p>

              <p className="mt-1 text-sm font-medium text-gray-900">
                150 / 95 mmHg
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Alergi
              </p>

              <span className="mt-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                Tidak ada alergi
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Section */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Tambah Order
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Pilih jenis pelayanan yang akan diberikan kepada pasien
          </p>
        </div>

        <div className="grid md:grid-cols-5">
          {orderTypes.map((item) => {
            const Icon = item.icon;
            const active = activeType === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveType(item.id)}
                className={`flex items-center justify-center gap-2 border-b px-4 py-4 text-sm font-medium transition md:border-b-0 md:border-r ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {item.title}
              </button>
            );
          })}
        </div>

        <div className="p-5">
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <Activity
              size={30}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-3 text-sm font-semibold text-gray-800">
              Tambahkan{" "}
              {
                orderTypes.find(
                  (item) => item.id === activeType
                )?.title
              }
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Pilih pelayanan atau order yang akan diberikan
            </p>

            <button
              type="button"
              onClick={addOrder}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Tambah Order
            </button>
          </div>
        </div>
      </div>

      {/* Order List */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-gray-900">
              Daftar Order
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Order yang telah direncanakan
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            {orders.length} Order
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-start justify-between gap-4 p-5"
            >
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                  {order.type === "resep" ? (
                    <Pill size={18} />
                  ) : order.type === "laboratorium" ? (
                    <FlaskConical size={18} />
                  ) : order.type === "radiologi" ? (
                    <ScanLine size={18} />
                  ) : order.type === "rujukan" ? (
                    <Hospital size={18} />
                  ) : (
                    <Stethoscope size={18} />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {order.description}
                  </p>

                  <span className="mt-2 inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    {
                      orderTypes.find(
                        (item) => item.id === order.type
                      )?.title
                    }
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeOrder(order.id)}
                className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Hapus order"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-900">
            Catatan Rencana Pelayanan
          </h2>
        </div>

        <div className="p-5">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Tuliskan catatan atau instruksi tambahan..."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Action */}
      <div className="flex flex-col-reverse justify-between gap-3 rounded-xl border border-gray-200 bg-white p-5 sm:flex-row">
        <button
          type="button"
          onClick={() => router.push("/emr/diagnosis")}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={17} />
          Kembali ke Diagnosis
        </button>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Save size={17} />
            Simpan Draft
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Check size={17} />
            Simpan & Finalisasi
          </button>
        </div>
      </div>
    </div>
  );
}