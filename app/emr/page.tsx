"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Search,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import { useRole } from "../Context/RoleContext";

type EMRStatus =
  | "COMPLETE"
  | "FINAL"
  | "NEED_COMPLETION"
  | "DRAFT";

type MedicalRecord = {
  id: number;
  name: string;
  medicalRecordNumber: string;
  gender: string;
  age: number;
  visitNumber: string;
  visitDate: string;
  doctor: string;
  unit: string;
  diagnosis: string;
  status: EMRStatus;
  completeness: number;
  complaint: string;
};

export default function RekamMedisPage() {
  // =========================================
  // ROLE CONTEXT
  // =========================================

  const { role } = useRole();

  // =========================================
  // STATE
  // =========================================

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [selectedRecord, setSelectedRecord] =
    useState<MedicalRecord | null>(null);

  // =========================================
  // DATA DUMMY
  // =========================================

  const records: MedicalRecord[] = [
    {
      id: 1,
      name: "Andi Pratama",
      medicalRecordNumber: "RM-2026-00125",
      gender: "Laki-laki",
      age: 45,
      visitNumber: "KJ-2026-00981",
      visitDate: "14 September 2026",
      doctor: "dr. Budi Santoso",
      unit: "Poli Umum",
      diagnosis:
        "Infeksi Saluran Pernapasan Akut, tidak spesifik",
      status: "FINAL",
      completeness: 100,
      complaint:
        "Demam sejak 2 hari yang lalu disertai batuk.",
    },
    {
      id: 2,
      name: "Siti Rahma",
      medicalRecordNumber: "RM-2026-00126",
      gender: "Perempuan",
      age: 32,
      visitNumber: "KJ-2026-00982",
      visitDate: "14 September 2026",
      doctor: "dr. Citra Dewi",
      unit: "Poli Penyakit Dalam",
      diagnosis: "Gastritis",
      status: "COMPLETE",
      completeness: 100,
      complaint:
        "Nyeri ulu hati dan mual sejak pagi.",
    },
    {
      id: 3,
      name: "Rizky Maulana",
      medicalRecordNumber: "RM-2026-00127",
      gender: "Laki-laki",
      age: 28,
      visitNumber: "KJ-2026-00983",
      visitDate: "14 September 2026",
      doctor: "dr. Budi Santoso",
      unit: "Poli Umum",
      diagnosis: "Demam tidak spesifik",
      status: "NEED_COMPLETION",
      completeness: 75,
      complaint:
        "Demam dan sakit kepala sejak kemarin.",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      medicalRecordNumber: "RM-2026-00128",
      gender: "Perempuan",
      age: 41,
      visitNumber: "KJ-2026-00984",
      visitDate: "13 September 2026",
      doctor: "dr. Citra Dewi",
      unit: "Poli Penyakit Dalam",
      diagnosis: "Hipertensi esensial",
      status: "COMPLETE",
      completeness: 100,
      complaint:
        "Pusing dan tekanan darah meningkat.",
    },
    {
      id: 5,
      name: "Fajar Nugraha",
      medicalRecordNumber: "RM-2026-00129",
      gender: "Laki-laki",
      age: 37,
      visitNumber: "KJ-2026-00985",
      visitDate: "13 September 2026",
      doctor: "dr. Budi Santoso",
      unit: "Poli Umum",
      diagnosis: "Dispepsia",
      status: "DRAFT",
      completeness: 50,
      complaint:
        "Perut terasa tidak nyaman setelah makan.",
    },
  ];

  // =========================================
  // ACCESS
  // =========================================

  const canAccess =
    role === "rekam_medis" || role === "admin";

  // =========================================
  // FILTER DATA
  // =========================================

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        record.name.toLowerCase().includes(keyword) ||
        record.medicalRecordNumber
          .toLowerCase()
          .includes(keyword) ||
        record.visitNumber
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === "Semua" ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  // =========================================
  // STATISTIC
  // =========================================

  const totalRecords = records.length;

  const completeRecords = records.filter(
    (record) => record.status === "COMPLETE"
  ).length;

  const needCompletionRecords = records.filter(
    (record) => record.status === "NEED_COMPLETION"
  ).length;

  const draftRecords = records.filter(
    (record) => record.status === "DRAFT"
  ).length;

  // =========================================
  // HANDLER
  // =========================================

  const handleVerify = () => {
    alert(
      "EMR berhasil diverifikasi sebagai lengkap."
    );
  };

  const handlePrint = () => {
    alert(
      "Fitur cetak ringkasan rekam medis masih berupa mockup."
    );
  };

  // =========================================
  // ACCESS DENIED
  // =========================================

  if (!canAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle
              size={28}
              className="text-red-500"
            />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Akses Ditolak
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Role Anda tidak memiliki akses ke halaman
            rekam medis.
          </p>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-6 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
          >
            Kembali
          </button>
        </div>
      </main>
    );
  }

  // =========================================
  // MAIN PAGE
  // =========================================

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Rekam Medis
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Monitoring dan verifikasi kelengkapan
              rekam medis pasien
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2">
            <p className="text-xs text-gray-400">
              Login sebagai
            </p>

            <p className="text-sm font-semibold capitalize text-gray-800">
              {role?.replaceAll("_", " ")}
            </p>
          </div>
        </div>

        {/* =====================================
            STAT CARDS
        ===================================== */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Rekam Medis"
            value={totalRecords.toString()}
            icon={<FileText size={20} />}
            description="Data kunjungan"
          />

          <StatCard
            title="Lengkap"
            value={completeRecords.toString()}
            icon={<Check size={20} />}
            description="Siap diproses"
          />

          <StatCard
            title="Perlu Dilengkapi"
            value={needCompletionRecords.toString()}
            icon={<AlertCircle size={20} />}
            description="Perlu perhatian"
          />

          <StatCard
            title="Draft"
            value={draftRecords.toString()}
            icon={<ClipboardCheck size={20} />}
            description="Belum final"
          />

        </div>

        {/* =====================================
            INFORMATION BANNER
        ===================================== */}

        <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4">

          <div className="flex gap-3">

            <ShieldCheck
              size={21}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-sm font-semibold text-blue-800">
                Monitoring Rekam Medis
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                Petugas rekam medis dapat memeriksa
                kelengkapan EMR dan melakukan verifikasi.
                Isi klinis yang dibuat oleh dokter dan
                perawat tidak dapat diubah dari halaman ini.
              </p>
            </div>

          </div>
        </div>

        {/* =====================================
            FILTER
        ===================================== */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Cari nama, No. RM, atau No. kunjungan..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

            </div>

            {/* Status */}

            <div className="flex items-center gap-3">

              <label className="text-sm font-medium text-gray-600">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >
                <option value="Semua">
                  Semua Status
                </option>

                <option value="COMPLETE">
                  Complete
                </option>

                <option value="FINAL">
                  Final
                </option>

                <option value="NEED_COMPLETION">
                  Need Completion
                </option>

                <option value="DRAFT">
                  Draft
                </option>
              </select>

            </div>

          </div>
        </section>

        {/* =====================================
            TABLE
        ===================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-gray-100 p-5">

            <div>
              <h2 className="font-semibold text-gray-900">
                Daftar Rekam Medis
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Menampilkan {filteredRecords.length} dari{" "}
                {totalRecords} rekam medis
              </p>
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-250">

              <thead className="bg-gray-50">

                <tr className="border-b border-gray-100">

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Pasien
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Kunjungan
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Dokter / Unit
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Diagnosis
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Kelengkapan
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Aksi
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center"
                    >
                      <Search
                        size={30}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-3 text-sm font-medium text-gray-600">
                        Data tidak ditemukan
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Coba gunakan kata kunci atau filter
                        yang berbeda.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Patient */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50">
                            <User
                              size={18}
                              className="text-teal-600"
                            />
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-gray-800">
                              {record.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-400">
                              {record.medicalRecordNumber}
                            </p>

                            <p className="text-xs text-gray-400">
                              {record.age} tahun •{" "}
                              {record.gender}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Visit */}

                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-gray-700">
                          {record.visitNumber}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                          <CalendarDays size={13} />
                          {record.visitDate}
                        </div>

                      </td>

                      {/* Doctor */}

                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-gray-700">
                          {record.doctor}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {record.unit}
                        </p>

                      </td>

                      {/* Diagnosis */}

                      <td className="max-w-55 px-5 py-4">

                        <p className="line-clamp-2 text-sm text-gray-700">
                          {record.diagnosis}
                        </p>

                      </td>

                      {/* Completeness */}

                      <td className="px-5 py-4">

                        <div className="w-32">

                          <div className="mb-1.5 flex items-center justify-between">

                            <span className="text-xs text-gray-400">
                              Kelengkapan
                            </span>

                            <span className="text-xs font-semibold text-gray-700">
                              {record.completeness}%
                            </span>

                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                            <div
                              className={`h-full rounded-full ${
                                record.completeness ===
                                100
                                  ? "bg-green-500"
                                  : record.completeness >=
                                    75
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${record.completeness}%`,
                              }}
                            />

                          </div>

                        </div>

                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={record.status}
                        />
                      </td>

                      {/* Action */}

                      <td className="px-5 py-4 text-right">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRecord(record)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                        >
                          Lihat Detail
                          <ChevronRight size={14} />
                        </button>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        </section>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="mt-4 flex flex-col justify-between gap-2 text-xs text-gray-400 sm:flex-row">

          <p>
            Sistem Informasi Manajemen Rumah Sakit
          </p>

          <p>
            Data yang ditampilkan merupakan data dummy
            untuk mockup.
          </p>

        </div>

      </div>

      {/* =======================================
          DETAIL MODAL
      ======================================= */}

      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}

            <div className="flex items-start justify-between border-b border-gray-100 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
                  <FileText
                    size={23}
                    className="text-teal-600"
                  />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-gray-900">
                    Detail Rekam Medis
                  </h2>

                  <p className="mt-1 text-xs text-gray-400">
                    {selectedRecord.medicalRecordNumber}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRecord(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={19} />
              </button>

            </div>

            {/* Patient */}

            <div className="border-b border-gray-100 p-6">

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <DetailItem
                  label="Nama Pasien"
                  value={selectedRecord.name}
                />

                <DetailItem
                  label="No. Rekam Medis"
                  value={
                    selectedRecord.medicalRecordNumber
                  }
                />

                <DetailItem
                  label="Jenis Kelamin"
                  value={selectedRecord.gender}
                />

                <DetailItem
                  label="Usia"
                  value={`${selectedRecord.age} tahun`}
                />

                <DetailItem
                  label="No. Kunjungan"
                  value={selectedRecord.visitNumber}
                />

                <DetailItem
                  label="Tanggal Kunjungan"
                  value={selectedRecord.visitDate}
                />

                <DetailItem
                  label="Dokter"
                  value={selectedRecord.doctor}
                />

                <DetailItem
                  label="Unit Pelayanan"
                  value={selectedRecord.unit}
                />

              </div>

            </div>

            {/* Clinical Summary */}

            <div className="space-y-5 p-6">

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Keluhan Utama
                </p>

                <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  {selectedRecord.complaint}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Diagnosis
                </p>

                <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  {selectedRecord.diagnosis}
                </div>
              </div>

              {/* Status */}

              <div className="rounded-xl border border-gray-100 p-4">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Status EMR
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Status saat ini
                    </p>
                  </div>

                  <StatusBadge
                    status={selectedRecord.status}
                  />

                </div>

                <div className="mt-5">

                  <div className="mb-2 flex justify-between text-xs">

                    <span className="text-gray-400">
                      Kelengkapan data
                    </span>

                    <span className="font-semibold text-gray-700">
                      {selectedRecord.completeness}%
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{
                        width: `${selectedRecord.completeness}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* Modal Footer */}

            <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <FileText size={17} />
                Cetak Ringkasan
              </button>

              {selectedRecord.status ===
                "NEED_COMPLETION" && (
                <button
                  type="button"
                  onClick={handleVerify}
                  className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                >
                  <Check size={17} />
                  Verifikasi Kelengkapan
                </button>
              )}

              {selectedRecord.status ===
                "COMPLETE" && (
                <button
                  type="button"
                  onClick={handleVerify}
                  className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                >
                  <ShieldCheck size={17} />
                  Verifikasi
                </button>
              )}

            </div>

          </div>
        </div>
      )}
    </main>
  );
}

/* =================================================
   STAT CARD
================================================= */

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {value}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
          {icon}
        </div>

      </div>

      <p className="mt-3 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
}

/* =================================================
   STATUS BADGE
================================================= */

function StatusBadge({
  status,
}: {
  status: EMRStatus;
}) {
  const config = {
    COMPLETE: {
      label: "Complete",
      className:
        "bg-green-50 text-green-700",
    },

    FINAL: {
      label: "Final",
      className:
        "bg-blue-50 text-blue-700",
    },

    NEED_COMPLETION: {
      label: "Perlu Dilengkapi",
      className:
        "bg-orange-50 text-orange-700",
    },

    DRAFT: {
      label: "Draft",
      className:
        "bg-gray-100 text-gray-600",
    },
  };

  const current = config[status];

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${current.className}`}
    >
      {current.label}
    </span>
  );
}

/* =================================================
   DETAIL ITEM
================================================= */

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value}
      </p>
    </div>
  );
}