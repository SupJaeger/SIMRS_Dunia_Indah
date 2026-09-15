"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import {
  ArrowLeft,
  Bed,
  Building2,
  CheckCircle2,
  Clock3,
  DoorOpen,
  Filter,
  RefreshCw,
  Search,
  UserRound,
} from "lucide-react";

type BedStatus =
  | "AVAILABLE"
  | "RESERVED"
  | "OCCUPIED"
  | "MAINTENANCE";

type BedData = {
  id: number;
  bedNumber: string;
  roomNumber: string;
  roomName: string;
  ward: string;
  className: "Kelas I" | "Kelas II" | "Kelas III";
  status: BedStatus;
  patientName?: string;
  medicalRecordNumber?: string;
  reservedFor?: string;
};

const beds: BedData[] = [
  {
    id: 1,
    bedNumber: "01",
    roomNumber: "101",
    roomName: "Anggrek 1",
    ward: "Ruang Anggrek",
    className: "Kelas I",
    status: "AVAILABLE",
  },
  {
    id: 2,
    bedNumber: "02",
    roomNumber: "101",
    roomName: "Anggrek 1",
    ward: "Ruang Anggrek",
    className: "Kelas I",
    status: "OCCUPIED",
    patientName: "Hendra Wijaya",
    medicalRecordNumber: "RM-2026-001198",
  },
  {
    id: 3,
    bedNumber: "01",
    roomNumber: "102",
    roomName: "Anggrek 2",
    ward: "Ruang Anggrek",
    className: "Kelas I",
    status: "AVAILABLE",
  },
  {
    id: 4,
    bedNumber: "02",
    roomNumber: "102",
    roomName: "Anggrek 2",
    ward: "Ruang Anggrek",
    className: "Kelas I",
    status: "RESERVED",
    reservedFor: "Budi Santoso",
  },
  {
    id: 5,
    bedNumber: "01",
    roomNumber: "201",
    roomName: "Melati 1",
    ward: "Ruang Melati",
    className: "Kelas II",
    status: "AVAILABLE",
  },
  {
    id: 6,
    bedNumber: "02",
    roomNumber: "201",
    roomName: "Melati 1",
    ward: "Ruang Melati",
    className: "Kelas II",
    status: "OCCUPIED",
    patientName: "Dewi Lestari",
    medicalRecordNumber: "RM-2026-001176",
  },
  {
    id: 7,
    bedNumber: "03",
    roomNumber: "201",
    roomName: "Melati 1",
    ward: "Ruang Melati",
    className: "Kelas II",
    status: "AVAILABLE",
  },
  {
    id: 8,
    bedNumber: "04",
    roomNumber: "201",
    roomName: "Melati 1",
    ward: "Ruang Melati",
    className: "Kelas II",
    status: "MAINTENANCE",
  },
  {
    id: 9,
    bedNumber: "01",
    roomNumber: "301",
    roomName: "Kenanga 1",
    ward: "Ruang Kenanga",
    className: "Kelas III",
    status: "AVAILABLE",
  },
  {
    id: 10,
    bedNumber: "02",
    roomNumber: "301",
    roomName: "Kenanga 1",
    ward: "Ruang Kenanga",
    className: "Kelas III",
    status: "OCCUPIED",
    patientName: "Agus Setiawan",
    medicalRecordNumber: "RM-2026-001205",
  },
  {
    id: 11,
    bedNumber: "03",
    roomNumber: "301",
    roomName: "Kenanga 1",
    ward: "Ruang Kenanga",
    className: "Kelas III",
    status: "AVAILABLE",
  },
  {
    id: 12,
    bedNumber: "04",
    roomNumber: "301",
    roomName: "Kenanga 1",
    ward: "Ruang Kenanga",
    className: "Kelas III",
    status: "AVAILABLE",
  },
];

const statusConfig: Record<
  BedStatus,
  {
    label: string;
    className: string;
  }
> = {
  AVAILABLE: {
    label: "Tersedia",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  RESERVED: {
    label: "Reserved",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  OCCUPIED: {
    label: "Terisi",
    className: "border-blue-200 bg-blue-50 text-blue-700",
  },
  MAINTENANCE: {
    label: "Maintenance",
    className: "border-gray-200 bg-gray-100 text-gray-600",
  },
};

function StatusBadge({ status }: { status: BedStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default function KetersediaanTempatTidurPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState<
    "Semua" | "Kelas I" | "Kelas II" | "Kelas III"
  >("Semua");
  const [wardFilter, setWardFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] =
    useState<"Semua" | BedStatus>("Semua");

  const [selectedBed, setSelectedBed] =
    useState<BedData | null>(null);

  const availableCount = beds.filter(
    (bed) => bed.status === "AVAILABLE"
  ).length;

  const reservedCount = beds.filter(
    (bed) => bed.status === "RESERVED"
  ).length;

  const occupiedCount = beds.filter(
    (bed) => bed.status === "OCCUPIED"
  ).length;

  const maintenanceCount = beds.filter(
    (bed) => bed.status === "MAINTENANCE"
  ).length;

  const filteredBeds = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return beds.filter((bed) => {
      const matchesSearch =
        bed.bedNumber.toLowerCase().includes(query) ||
        bed.roomNumber.toLowerCase().includes(query) ||
        bed.roomName.toLowerCase().includes(query) ||
        bed.ward.toLowerCase().includes(query) ||
        bed.patientName?.toLowerCase().includes(query) ||
        false;

      const matchesClass =
        classFilter === "Semua" ||
        bed.className === classFilter;

      const matchesWard =
        wardFilter === "Semua" ||
        bed.ward === wardFilter;

      const matchesStatus =
        statusFilter === "Semua" ||
        bed.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesWard &&
        matchesStatus
      );
    });
  }, [
    searchQuery,
    classFilter,
    wardFilter,
    statusFilter,
  ]);

  const wards = Array.from(
    new Set(beds.map((bed) => bed.ward))
  );

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

              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">
                    Ketersediaan Tempat Tidur
                  </h1>

                  <p className="mt-1 text-sm text-gray-500">
                    Pantau ketersediaan tempat tidur berdasarkan
                    ruang dan kelas perawatan.
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                >
                  <RefreshCw size={16} />
                  Perbarui Data
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Available */}
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("AVAILABLE");
                  setSelectedBed(null);
                }}
                className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-emerald-300 ${
                  statusFilter === "AVAILABLE"
                    ? "border-emerald-300 ring-2 ring-emerald-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Tempat Tidur Tersedia
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      {availableCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
              </button>

              {/* Reserved */}
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("RESERVED");
                  setSelectedBed(null);
                }}
                className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-amber-300 ${
                  statusFilter === "RESERVED"
                    ? "border-amber-300 ring-2 ring-amber-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Reserved
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      {reservedCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Clock3 size={20} />
                  </div>
                </div>
              </button>

              {/* Occupied */}
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("OCCUPIED");
                  setSelectedBed(null);
                }}
                className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-blue-300 ${
                  statusFilter === "OCCUPIED"
                    ? "border-blue-300 ring-2 ring-blue-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Terisi
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      {occupiedCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <UserRound size={20} />
                  </div>
                </div>
              </button>

              {/* Maintenance */}
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("MAINTENANCE");
                  setSelectedBed(null);
                }}
                className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:border-gray-400 ${
                  statusFilter === "MAINTENANCE"
                    ? "border-gray-400 ring-2 ring-gray-100"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Maintenance
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-800">
                      {maintenanceCount}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                    <Bed size={20} />
                  </div>
                </div>
              </button>
            </div>

            {/* Main Content */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Toolbar */}
              <div className="border-b border-gray-200 p-5">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-800">
                        Daftar Tempat Tidur
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Tempat tidur dengan status tersedia dapat
                        dipilih untuk proses admisi.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Bed size={17} />
                      <span>
                        {filteredBeds.length} tempat tidur
                      </span>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col gap-3 lg:flex-row">
                    {/* Search */}
                    <div className="relative flex-1">
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
                        placeholder="Cari ruang, kamar, atau pasien..."
                        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                      />
                    </div>

                    {/* Class */}
                    <select
                      value={classFilter}
                      onChange={(e) =>
                        setClassFilter(
                          e.target.value as
                            | "Semua"
                            | "Kelas I"
                            | "Kelas II"
                            | "Kelas III"
                        )
                      }
                      className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="Semua">
                        Semua Kelas
                      </option>
                      <option value="Kelas I">Kelas I</option>
                      <option value="Kelas II">Kelas II</option>
                      <option value="Kelas III">
                        Kelas III
                      </option>
                    </select>

                    {/* Ward */}
                    <select
                      value={wardFilter}
                      onChange={(e) =>
                        setWardFilter(e.target.value)
                      }
                      className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="Semua">
                        Semua Ruang
                      </option>

                      {wards.map((ward) => (
                        <option key={ward} value={ward}>
                          {ward}
                        </option>
                      ))}
                    </select>

                    {/* Status */}
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(
                          e.target.value as
                            | "Semua"
                            | BedStatus
                        )
                      }
                      className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >
                      <option value="Semua">
                        Semua Status
                      </option>
                      <option value="AVAILABLE">
                        Tersedia
                      </option>
                      <option value="RESERVED">
                        Reserved
                      </option>
                      <option value="OCCUPIED">
                        Terisi
                      </option>
                      <option value="MAINTENANCE">
                        Maintenance
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bed Grid */}
              <div className="p-5">
                {filteredBeds.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredBeds.map((bed) => {
                      const isSelected =
                        selectedBed?.id === bed.id;

                      const isAvailable =
                        bed.status === "AVAILABLE";

                      return (
                        <button
                          key={bed.id}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => {
                            if (isAvailable) {
                              setSelectedBed(bed);
                            }
                          }}
                          className={`group rounded-xl border p-4 text-left transition ${
                            isAvailable
                              ? "cursor-pointer border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm"
                              : "cursor-default border-gray-200 bg-gray-50"
                          } ${
                            isSelected
                              ? "border-teal-400 ring-2 ring-teal-100"
                              : ""
                          }`}
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-11 w-11 items-center justify-center rounded-lg ${
                                  isAvailable
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                <Bed size={21} />
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  Bed {bed.bedNumber}
                                </p>

                                <p className="mt-0.5 text-xs text-gray-500">
                                  Kamar {bed.roomNumber}
                                </p>
                              </div>
                            </div>

                            <StatusBadge status={bed.status} />
                          </div>

                          {/* Room Information */}
                          <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2
                                size={15}
                                className="text-gray-400"
                              />
                              {bed.ward}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DoorOpen
                                size={15}
                                className="text-gray-400"
                              />
                              {bed.roomName}
                            </div>
                          </div>

                          {/* Class */}
                          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                            <span className="text-xs text-gray-500">
                              Kelas Perawatan
                            </span>

                            <span className="text-sm font-medium text-slate-700">
                              {bed.className}
                            </span>
                          </div>

                          {/* Occupied / Reserved Information */}
                          {bed.status === "OCCUPIED" &&
                            bed.patientName && (
                              <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2.5">
                                <p className="text-xs text-blue-600">
                                  Pasien
                                </p>

                                <p className="mt-0.5 text-sm font-medium text-blue-800">
                                  {bed.patientName}
                                </p>

                                <p className="mt-0.5 font-mono text-xs text-blue-600">
                                  {bed.medicalRecordNumber}
                                </p>
                              </div>
                            )}

                          {bed.status === "RESERVED" &&
                            bed.reservedFor && (
                              <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2.5">
                                <p className="text-xs text-amber-600">
                                  Reserved untuk
                                </p>

                                <p className="mt-0.5 text-sm font-medium text-amber-800">
                                  {bed.reservedFor}
                                </p>
                              </div>
                            )}

                          {/* Available Action */}
                          {isAvailable && (
                            <div className="mt-4 flex items-center justify-between text-xs font-medium text-teal-600">
                              <span>
                                Klik untuk memilih bed
                              </span>

                              <span>→</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-14 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <Search size={22} />
                    </div>

                    <p className="mt-3 font-medium text-slate-700">
                      Tempat tidur tidak ditemukan
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Coba ubah kata kunci atau filter yang
                      digunakan.
                    </p>
                  </div>
                )}
              </div>

              {/* Selection Panel */}
              {selectedBed && (
                <div className="border-t border-gray-200 bg-teal-50/60 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                        <CheckCircle2 size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-teal-900">
                          Bed Dipilih
                        </p>

                        <p className="mt-1 text-sm text-teal-800">
                          Bed {selectedBed.bedNumber} · Kamar{" "}
                          {selectedBed.roomNumber} ·{" "}
                          {selectedBed.roomName} ·{" "}
                          {selectedBed.className}
                        </p>

                        <p className="mt-1 text-xs text-teal-700">
                          {selectedBed.ward}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedBed(null)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        Batal
                      </button>

                      <button
                        type="button"
                        className="rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                      >
                        Konfirmasi Tempat Tidur
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Information */}
            <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="flex gap-3">
                <div className="mt-0.5 shrink-0 text-blue-600">
                  <Filter size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Informasi Ketersediaan
                  </p>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    Sistem hanya menampilkan tempat tidur
                    dengan status tersedia untuk dipilih pada
                    proses admisi. Setelah tempat tidur
                    dikonfirmasi, sistem akan melakukan validasi
                    kembali sebelum tempat tidur di-reserve.
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