"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Clock3,
  Search,
  UserRound,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type AdmissionPlanStatus =
  | "Menunggu Admisi"
  | "Sedang Diproses"
  | "Selesai";

type AdmissionPlan = {
  id: number;
  patientName: string;
  medicalRecordNumber: string;
  gender: "L" | "P";
  age: number;
  visitNumber: string;
  doctor: string;
  origin: string;
  admissionDate: string;
  admissionTime: string;
  treatmentClass: string;
  payer: string;
  diagnosis: string;
  status: AdmissionPlanStatus;
};

const admissionPlans: AdmissionPlan[] = [
  {
    id: 1,
    patientName: "Budi Santoso",
    medicalRecordNumber: "RM-2026-001245",
    gender: "L",
    age: 48,
    visitNumber: "KJ-260915-001",
    doctor: "dr. Andi Pratama, Sp.PD",
    origin: "Rawat Jalan",
    admissionDate: "15 Sep 2026",
    admissionTime: "10:30",
    treatmentClass: "Kelas I",
    payer: "BPJS Kesehatan",
    diagnosis: "Pneumonia",
    status: "Menunggu Admisi",
  },
  {
    id: 2,
    patientName: "Siti Rahmawati",
    medicalRecordNumber: "RM-2026-001312",
    gender: "P",
    age: 35,
    visitNumber: "KJ-260915-002",
    doctor: "dr. Rina Maharani, Sp.OG",
    origin: "IGD",
    admissionDate: "15 Sep 2026",
    admissionTime: "11:15",
    treatmentClass: "Kelas II",
    payer: "BPJS Kesehatan",
    diagnosis: "Observasi kehamilan",
    status: "Menunggu Admisi",
  },
  {
    id: 3,
    patientName: "Ahmad Fauzan",
    medicalRecordNumber: "RM-2026-001388",
    gender: "L",
    age: 61,
    visitNumber: "KJ-260915-003",
    doctor: "dr. Dimas Wijaya, Sp.JP",
    origin: "Rawat Jalan",
    admissionDate: "15 Sep 2026",
    admissionTime: "13:00",
    treatmentClass: "Kelas I",
    payer: "Asuransi Swasta",
    diagnosis: "Gagal jantung kongestif",
    status: "Sedang Diproses",
  },
  {
    id: 4,
    patientName: "Maria Lestari",
    medicalRecordNumber: "RM-2026-001401",
    gender: "P",
    age: 52,
    visitNumber: "KJ-260915-004",
    doctor: "dr. Budi Hartono, Sp.P",
    origin: "IGD",
    admissionDate: "15 Sep 2026",
    admissionTime: "14:20",
    treatmentClass: "Kelas III",
    payer: "BPJS Kesehatan",
    diagnosis: "Eksaserbasi PPOK",
    status: "Menunggu Admisi",
  },
  {
    id: 5,
    patientName: "Rudi Hermawan",
    medicalRecordNumber: "RM-2026-001425",
    gender: "L",
    age: 44,
    visitNumber: "KJ-260915-005",
    doctor: "dr. Andi Pratama, Sp.PD",
    origin: "Rawat Jalan",
    admissionDate: "15 Sep 2026",
    admissionTime: "15:00",
    treatmentClass: "Kelas II",
    payer: "Perusahaan",
    diagnosis: "Diabetes melitus",
    status: "Selesai",
  },
];

function StatusBadge({
  status,
}: {
  status: AdmissionPlanStatus;
}) {
  const styles: Record<AdmissionPlanStatus, string> = {
    "Menunggu Admisi":
      "border-amber-200 bg-amber-50 text-amber-700",
    "Sedang Diproses":
      "border-blue-200 bg-blue-50 text-blue-700",
    Selesai:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function RencanaRawatInapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [
    statusFilter,
    setStatusFilter,
  ] = useState<"Semua" | AdmissionPlanStatus>("Semua");

  const filteredPlans = admissionPlans.filter((plan) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      plan.patientName.toLowerCase().includes(query) ||
      plan.medicalRecordNumber.toLowerCase().includes(query) ||
      plan.visitNumber.toLowerCase().includes(query) ||
      plan.doctor.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "Semua" ||
      plan.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const waitingCount = admissionPlans.filter(
    (plan) => plan.status === "Menunggu Admisi"
  ).length;

  const processingCount = admissionPlans.filter(
    (plan) => plan.status === "Sedang Diproses"
  ).length;

  const completedCount = admissionPlans.filter(
    (plan) => plan.status === "Selesai"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            {/* Page Header */}
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-1 text-sm text-gray-500 transition hover:text-teal-600"
                >
                  <ArrowLeft size={16} />
                  Dashboard
                </Link>
              </div>

              <h1 className="text-2xl font-bold text-slate-800">
                Rencana Rawat Inap
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Daftar pasien yang memiliki instruksi untuk
                menjalani rawat inap dan menunggu proses admisi.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Menunggu Admisi */}
              <button
                type="button"
                onClick={() =>
                  setStatusFilter("Menunggu Admisi")
                }
                className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-amber-300 ${
                  statusFilter === "Menunggu Admisi"
                    ? "border-amber-300 ring-2 ring-amber-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Menunggu Admisi
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      {waitingCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Clock3 size={20} />
                  </div>
                </div>
              </button>

              {/* Sedang Diproses */}
              <button
                type="button"
                onClick={() =>
                  setStatusFilter("Sedang Diproses")
                }
                className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-blue-300 ${
                  statusFilter === "Sedang Diproses"
                    ? "border-blue-300 ring-2 ring-blue-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Sedang Diproses
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      {processingCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <ClipboardList size={20} />
                  </div>
                </div>
              </button>

              {/* Selesai */}
              <button
                type="button"
                onClick={() => setStatusFilter("Selesai")}
                className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-emerald-300 ${
                  statusFilter === "Selesai"
                    ? "border-emerald-300 ring-2 ring-emerald-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Selesai Hari Ini
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      {completedCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <ClipboardList size={20} />
                  </div>
                </div>
              </button>
            </div>

            {/* Main Card */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Toolbar */}
              <div className="border-b border-gray-200 p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      Daftar Rencana Rawat Inap
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Pilih pasien untuk memulai proses admisi
                      rawat inap.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    {/* Search */}
                    <div className="relative">
                      <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) =>
                          setSearchQuery(e.target.value)
                        }
                        placeholder="Cari pasien / No. RM..."
                        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:w-64"
                      />
                    </div>

                    {/* Status Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(
                          e.target.value as
                            | "Semua"
                            | AdmissionPlanStatus
                        )
                      }
                      className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="Semua">
                        Semua Status
                      </option>

                      <option value="Menunggu Admisi">
                        Menunggu Admisi
                      </option>

                      <option value="Sedang Diproses">
                        Sedang Diproses
                      </option>

                      <option value="Selesai">
                        Selesai
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-275">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Pasien
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Kunjungan
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        DPJP
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Rencana Masuk
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Kelas
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Penjamin
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {filteredPlans.length > 0 ? (
                      filteredPlans.map((plan) => (
                        <tr
                          key={plan.id}
                          className="transition hover:bg-gray-50"
                        >
                          {/* Pasien */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                                <UserRound size={19} />
                              </div>

                              <div>
                                <p className="font-medium text-slate-800">
                                  {plan.patientName}
                                </p>

                                <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                                  <span className="font-mono">
                                    {plan.medicalRecordNumber}
                                  </span>

                                  <span>•</span>

                                  <span>
                                    {plan.gender} / {plan.age} th
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Kunjungan */}
                          <td className="px-5 py-4">
                            <p className="font-mono text-sm text-slate-700">
                              {plan.visitNumber}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {plan.origin}
                            </p>
                          </td>

                          {/* DPJP */}
                          <td className="px-5 py-4">
                            <p className="text-sm text-slate-700">
                              {plan.doctor}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {plan.diagnosis}
                            </p>
                          </td>

                          {/* Rencana Masuk */}
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2 text-sm text-slate-700">
                              <CalendarDays
                                size={16}
                                className="text-gray-400"
                              />

                              {plan.admissionDate}
                            </div>

                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                              <Clock3
                                size={14}
                                className="text-gray-400"
                              />

                              {plan.admissionTime}
                            </div>
                          </td>

                          {/* Kelas */}
                          <td className="px-5 py-4">
                            <span className="text-sm font-medium text-slate-700">
                              {plan.treatmentClass}
                            </span>
                          </td>

                          {/* Penjamin */}
                          <td className="px-5 py-4">
                            <span className="text-sm text-slate-700">
                              {plan.payer}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-5 py-4">
                            <StatusBadge status={plan.status} />
                          </td>

                          {/* Aksi */}
                          <td className="px-5 py-4 text-right">
                            {plan.status === "Menunggu Admisi" ? (
                              <Link
                                href={`/rawat-inap/rencana/${plan.id}`}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
                              >
                                Buat Admisi
                                <ChevronRight size={16} />
                              </Link>
                            ) : plan.status ===
                              "Sedang Diproses" ? (
                              <Link
                                href={`/rawat-inap/rencana/${plan.id}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                              >
                                Lanjutkan
                                <ChevronRight size={16} />
                              </Link>
                            ) : (
                              <button
                                type="button"
                                disabled
                                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-400"
                              >
                                Selesai
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-12 text-center"
                        >
                          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                            <Search size={22} />
                          </div>

                          <p className="mt-3 font-medium text-slate-700">
                            Data tidak ditemukan
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Coba gunakan kata kunci atau filter
                            status lainnya.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
                <p className="text-sm text-gray-500">
                  Menampilkan{" "}
                  <span className="font-medium text-gray-700">
                    {filteredPlans.length}
                  </span>{" "}
                  dari{" "}
                  <span className="font-medium text-gray-700">
                    {admissionPlans.length}
                  </span>{" "}
                  rencana rawat inap
                </p>
              </div>
            </section>

            {/* Information */}
            <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="flex gap-3">
                <div className="mt-0.5 shrink-0 text-blue-600">
                  <ClipboardList size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Alur Admisi
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    Setelah memilih pasien, sistem akan
                    memvalidasi identitas, nomor kunjungan, dan
                    instruksi rawat inap sebelum membuka form
                    admisi. Selanjutnya petugas memilih kelas,
                    ruang, kamar, dan bed yang tersedia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}