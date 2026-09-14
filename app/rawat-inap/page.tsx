"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Bed,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  HeartPulse,
  Search,
  User,
} from "lucide-react";

type PatientStatus =
  | "Perlu Visit"
  | "Dalam Perawatan"
  | "Menunggu Tindakan"
  | "Rencana Pulang";

type Patient = {
  id: number;
  name: string;
  rm: string;
  room: string;
  diagnosis: string;
  status: PatientStatus;
  lastVisit: string;
};

const patients: Patient[] = [
  {
    id: 1,
    name: "Budi Santoso",
    rm: "RM-001245",
    room: "Mawar 201 - Bed 02",
    diagnosis: "Hipertensi Esensial",
    status: "Perlu Visit",
    lastVisit: "13 Sep 2026, 09:15",
  },
  {
    id: 2,
    name: "Siti Aminah",
    rm: "RM-001198",
    room: "Melati 103 - Bed 01",
    diagnosis: "Diabetes Mellitus Tipe 2",
    status: "Dalam Perawatan",
    lastVisit: "14 Sep 2026, 08:30",
  },
  {
    id: 3,
    name: "Andi Pratama",
    rm: "RM-001301",
    room: "Mawar 205 - Bed 01",
    diagnosis: "Pneumonia",
    status: "Menunggu Tindakan",
    lastVisit: "14 Sep 2026, 10:00",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    rm: "RM-001176",
    room: "Melati 105 - Bed 02",
    diagnosis: "Gastritis Akut",
    status: "Rencana Pulang",
    lastVisit: "14 Sep 2026, 09:45",
  },
];

const statusStyle: Record<PatientStatus, string> = {
  "Perlu Visit": "bg-yellow-50 text-yellow-700",
  "Dalam Perawatan": "bg-blue-50 text-blue-700",
  "Menunggu Tindakan": "bg-orange-50 text-orange-700",
  "Rencana Pulang": "bg-green-50 text-green-700",
};

export default function RawatInapPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const router = useRouter();

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.rm.toLowerCase().includes(search.toLowerCase()) ||
      patient.room.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "Semua" ||
      patient.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
        <div className="flex items-center gap-3">
        <button
            type="button"
            onClick={() => router.push("/")}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            aria-label="Kembali ke Dashboard"
        >
            <ArrowLeft size={18} />
        </button>

        <div>
            <h1 className="text-2xl font-semibold text-gray-900">
            Rawat Inap
            </h1>

            <p className="mt-1 text-sm text-gray-500">
            Monitoring dan pengelolaan pasien yang sedang menjalani
            rawat inap
            </p>
        </div>
        </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Pasien Dirawat
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                24
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Bed size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Perlu Visit
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                6
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <CalendarDays size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Menunggu Tindakan
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                4
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Activity size={20} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Rencana Pulang
              </p>

              <p className="mt-2 text-2xl font-semibold text-gray-900">
                3
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <HeartPulse size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="border-b border-gray-100 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Daftar Pasien Rawat Inap
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Pasien yang berada dalam tanggung jawab dokter
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari pasien..."
                  className="h-10 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                />
              </div>

              {/* Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-lg border border-gray-300 px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
              >
                <option value="Semua">Semua Status</option>
                <option value="Perlu Visit">Perlu Visit</option>
                <option value="Dalam Perawatan">
                  Dalam Perawatan
                </option>
                <option value="Menunggu Tindakan">
                  Menunggu Tindakan
                </option>
                <option value="Rencana Pulang">
                  Rencana Pulang
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-225 w-full">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Pasien
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Kamar / Bed
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Diagnosis
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Visit Terakhir
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* Patient */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <User size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {patient.name}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          {patient.rm}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Room */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Bed size={16} className="text-gray-400" />
                      {patient.room}
                    </div>
                  </td>

                  {/* Diagnosis */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">
                      {patient.diagnosis}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[patient.status]}`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  {/* Last Visit */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-600">
                      {patient.lastVisit}
                    </p>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
                    >
                      Lihat Detail
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredPatients.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >
                    <ClipboardList
                      size={32}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 text-sm font-medium text-gray-700">
                      Pasien tidak ditemukan
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Coba gunakan kata kunci atau filter yang berbeda.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-sm text-gray-500">
            Menampilkan{" "}
            <span className="font-medium text-gray-700">
              {filteredPatients.length}
            </span>{" "}
            dari{" "}
            <span className="font-medium text-gray-700">
              {patients.length}
            </span>{" "}
            pasien
          </p>
        </div>
      </div>
    </div>
  );
}