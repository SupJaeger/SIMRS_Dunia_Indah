"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  FileCheck2,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Eye,
  ClipboardCheck,
} from "lucide-react";

type EMRStatus = "FINAL" | "NEED_COMPLETION" | "COMPLETE";

type EMRRecord = {
  id: number;
  noRM: string;
  nama: string;
  jenisKelamin: string;
  tanggal: string;
  unit: string;
  dokter: string;
  status: EMRStatus;
  soap: boolean;
  diagnosis: boolean;
  dpjp: boolean;
  rencana: boolean;
};

const initialData: EMRRecord[] = [
  {
    id: 1,
    noRM: "RM-2026001245",
    nama: "Andi Pratama",
    jenisKelamin: "L",
    tanggal: "15 Sep 2026, 08:15",
    unit: "Poli Penyakit Dalam",
    dokter: "dr. Aditya",
    status: "FINAL",
    soap: true,
    diagnosis: true,
    dpjp: true,
    rencana: true,
  },
  {
    id: 2,
    noRM: "RM-2026001187",
    nama: "Siti Rahma",
    jenisKelamin: "P",
    tanggal: "15 Sep 2026, 09:30",
    unit: "Poli Anak",
    dokter: "dr. Budi",
    status: "NEED_COMPLETION",
    soap: true,
    diagnosis: false,
    dpjp: true,
    rencana: true,
  },
  {
    id: 3,
    noRM: "RM-2026001098",
    nama: "Budi Santoso",
    jenisKelamin: "L",
    tanggal: "15 Sep 2026, 10:10",
    unit: "Rawat Inap",
    dokter: "dr. Citra",
    status: "FINAL",
    soap: true,
    diagnosis: true,
    dpjp: true,
    rencana: false,
  },
  {
    id: 4,
    noRM: "RM-2026000976",
    nama: "Dewi Lestari",
    jenisKelamin: "P",
    tanggal: "14 Sep 2026, 14:20",
    unit: "Poli Bedah",
    dokter: "dr. Dimas",
    status: "COMPLETE",
    soap: true,
    diagnosis: true,
    dpjp: true,
    rencana: true,
  },
  {
    id: 5,
    noRM: "RM-2026000912",
    nama: "Rudi Hartono",
    jenisKelamin: "L",
    tanggal: "14 Sep 2026, 11:45",
    unit: "IGD",
    dokter: "dr. Eka",
    status: "NEED_COMPLETION",
    soap: false,
    diagnosis: true,
    dpjp: true,
    rencana: true,
  },
];

function StatusBadge({ status }: { status: EMRStatus }) {
  const config = {
    FINAL: {
      label: "Final",
      className: "bg-blue-50 text-blue-700",
      icon: Clock3,
    },
    NEED_COMPLETION: {
      label: "Perlu Dilengkapi",
      className: "bg-orange-50 text-orange-700",
      icon: AlertCircle,
    },
    COMPLETE: {
      label: "Lengkap",
      className: "bg-green-50 text-green-700",
      icon: CheckCircle2,
    },
  };

  const item = config[status];
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${item.className}`}
    >
      <Icon size={14} />
      {item.label}
    </span>
  );
}

function CompletionIndicator({
  value,
  label,
}: {
  value: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      {value ? (
        <CheckCircle2 size={15} className="text-green-600" />
      ) : (
        <AlertCircle size={15} className="text-orange-500" />
      )}

      <span className={value ? "text-gray-600" : "text-orange-600"}>
        {label}
      </span>
    </div>
  );
}

export default function KelengkapanEMRPage() {
  const [records, setRecords] = useState<EMRRecord[]>(initialData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"ALL" | EMRStatus>("ALL");

  const filteredRecords = records.filter((record) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      record.nama.toLowerCase().includes(keyword) ||
      record.noRM.toLowerCase().includes(keyword) ||
      record.dokter.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "ALL" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const total = records.length;

  const perluDilengkapi = records.filter(
    (record) => record.status === "NEED_COMPLETION"
  ).length;

  const final = records.filter(
    (record) => record.status === "FINAL"
  ).length;

  const lengkap = records.filter(
    (record) => record.status === "COMPLETE"
  ).length;

  const handleVerify = (id: number) => {
    setRecords((current) =>
      current.map((record) => {
        if (record.id !== id) {
          return record;
        }

        const complete =
          record.soap &&
          record.diagnosis &&
          record.dpjp &&
          record.rencana;

        return {
          ...record,
          status: complete ? "COMPLETE" : "NEED_COMPLETION",
        };
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header halaman */}
      <div className="mb-6">
        {/* Tombol kembali */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <ArrowLeft size={18} />
          Kembali ke Dashboard
        </Link>

        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/rekam-medis"
            className="transition hover:text-teal-600"
          >
            Rekam Medis
          </Link>

          <span>/</span>

          <span>Kelengkapan EMR</span>
        </div>

        {/* Judul */}
        <h1 className="text-2xl font-bold text-gray-900">
          Kelengkapan EMR
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Pantau dan verifikasi kelengkapan rekam medis pasien.
        </p>
      </div>

      {/* Statistik */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* Total EMR */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total EMR</p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {total}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
              <FileCheck2 size={22} className="text-gray-600" />
            </div>
          </div>
        </div>

        {/* Menunggu Verifikasi */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Menunggu Verifikasi
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-700">
                {final}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
              <Clock3 size={22} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Perlu Dilengkapi */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Perlu Dilengkapi
              </p>

              <p className="mt-1 text-2xl font-bold text-orange-600">
                {perluDilengkapi}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50">
              <AlertCircle size={22} className="text-orange-500" />
            </div>
          </div>
        </div>

        {/* Sudah Lengkap */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sudah Lengkap</p>

              <p className="mt-1 text-2xl font-bold text-green-600">
                {lengkap}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle2 size={22} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Konten utama */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-gray-200 p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama pasien, No. RM, atau dokter..."
                className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {/* Filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "ALL" | EMRStatus
                )
              }
              className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="ALL">Semua Status</option>
              <option value="FINAL">Final</option>
              <option value="NEED_COMPLETION">
                Perlu Dilengkapi
              </option>
              <option value="COMPLETE">Lengkap</option>
            </select>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Pasien
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Kunjungan
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  DPJP
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Kelengkapan
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  {/* Pasien */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {record.nama}
                    </p>

                    <p className="mt-1 font-mono text-xs text-gray-500">
                      {record.noRM}
                    </p>
                  </td>

                  {/* Kunjungan */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {record.unit}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {record.tanggal}
                    </p>
                  </td>

                  {/* DPJP */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {record.dokter}
                    </p>
                  </td>

                  {/* Kelengkapan */}
                  <td className="px-5 py-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <CompletionIndicator
                        value={record.soap}
                        label="SOAP"
                      />

                      <CompletionIndicator
                        value={record.diagnosis}
                        label="Diagnosis"
                      />

                      <CompletionIndicator
                        value={record.dpjp}
                        label="DPJP"
                      />

                      <CompletionIndicator
                        value={record.rencana}
                        label="Rencana"
                      />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={record.status} />
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <Eye size={16} />
                        Lihat
                      </button>

                      {record.status !== "COMPLETE" && (
                        <button
                          type="button"
                          onClick={() => handleVerify(record.id)}
                          className="inline-flex h-9 items-center gap-2 rounded-lg bg-teal-600 px-3 text-sm font-medium text-white transition hover:bg-teal-700"
                        >
                          <ClipboardCheck size={16} />
                          Verifikasi
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty state */}
              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <FileCheck2
                        size={32}
                        className="text-gray-300"
                      />

                      <p className="mt-3 text-sm font-medium text-gray-700">
                        Data EMR tidak ditemukan
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Coba ubah kata kunci atau filter status.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer tabel */}
        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
          <p className="text-xs text-gray-500">
            Menampilkan{" "}
            <span className="font-medium text-gray-700">
              {filteredRecords.length}
            </span>{" "}
            data EMR
          </p>
        </div>
      </div>
    </div>
  );
}