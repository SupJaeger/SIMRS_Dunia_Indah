"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Bed,
  CheckCircle2,
  Clock3,
  Search,
  UserCheck,
  Users,
  X,
} from "lucide-react";

type ArrivalStatus = "MENUNGGU" | "DITERIMA";

type InpatientPatient = {
  id: number;
  inpatientNumber: string;
  patientNumber: string;
  patientName: string;
  gender: "L" | "P";
  age: number;
  room: string;
  bed: string;
  class: "I" | "II" | "III";
  doctor: string;
  admissionDate: string;
  admissionTime: string;
  source: string;
  status: ArrivalStatus;
};

const initialPatients: InpatientPatient[] = [
  {
    id: 1,
    inpatientNumber: "RI-2026-00124",
    patientNumber: "RM-001245",
    patientName: "Andi Pratama",
    gender: "L",
    age: 45,
    room: "Anggrek 101",
    bed: "A-01",
    class: "I",
    doctor: "dr. Budi Santoso",
    admissionDate: "15 Sep 2026",
    admissionTime: "08:30",
    source: "IGD",
    status: "MENUNGGU",
  },
  {
    id: 2,
    inpatientNumber: "RI-2026-00125",
    patientNumber: "RM-002118",
    patientName: "Siti Rahma",
    gender: "P",
    age: 37,
    room: "Melati 203",
    bed: "M-03",
    class: "II",
    doctor: "dr. Rina Amelia",
    admissionDate: "15 Sep 2026",
    admissionTime: "09:15",
    source: "Poliklinik",
    status: "MENUNGGU",
  },
  {
    id: 3,
    inpatientNumber: "RI-2026-00126",
    patientNumber: "RM-000874",
    patientName: "Dedi Kurniawan",
    gender: "L",
    age: 58,
    room: "Kenanga 302",
    bed: "K-02",
    class: "III",
    doctor: "dr. Andi Wijaya",
    admissionDate: "15 Sep 2026",
    admissionTime: "10:00",
    source: "IGD",
    status: "DITERIMA",
  },
  {
    id: 4,
    inpatientNumber: "RI-2026-00127",
    patientNumber: "RM-003421",
    patientName: "Maria Lestari",
    gender: "P",
    age: 29,
    room: "Anggrek 102",
    bed: "A-02",
    class: "I",
    doctor: "dr. Budi Santoso",
    admissionDate: "15 Sep 2026",
    admissionTime: "10:45",
    source: "Poliklinik",
    status: "DITERIMA",
  },
  {
    id: 5,
    inpatientNumber: "RI-2026-00128",
    patientNumber: "RM-001932",
    patientName: "Yusuf Hidayat",
    gender: "L",
    age: 63,
    room: "Melati 201",
    bed: "M-01",
    class: "II",
    doctor: "dr. Rina Amelia",
    admissionDate: "15 Sep 2026",
    admissionTime: "11:20",
    source: "IGD",
    status: "MENUNGGU",
  },
];

export default function PasienMasukPage() {
  const [patients, setPatients] =
    useState<InpatientPatient[]>(initialPatients);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "SEMUA" | ArrivalStatus
  >("SEMUA");

  const [selectedPatient, setSelectedPatient] =
    useState<InpatientPatient | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        patient.patientName.toLowerCase().includes(keyword) ||
        patient.patientNumber.toLowerCase().includes(keyword) ||
        patient.inpatientNumber.toLowerCase().includes(keyword) ||
        patient.room.toLowerCase().includes(keyword) ||
        patient.bed.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "SEMUA" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  const waitingCount = patients.filter(
    (patient) => patient.status === "MENUNGGU"
  ).length;

  const acceptedCount = patients.filter(
    (patient) => patient.status === "DITERIMA"
  ).length;

  const handleAcceptPatient = () => {
    if (!selectedPatient) return;

    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === selectedPatient.id
          ? {
              ...patient,
              status: "DITERIMA",
            }
          : patient
      )
    );

    setSelectedPatient(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Pasien Masuk
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Kelola penerimaan pasien yang masuk ke ruang rawat inap.
            </p>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => setStatusFilter("SEMUA")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "SEMUA"
                  ? "border-teal-500 ring-2 ring-teal-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Pasien
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {patients.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                  <Users size={22} className="text-blue-600" />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("MENUNGGU")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "MENUNGGU"
                  ? "border-yellow-500 ring-2 ring-yellow-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Menunggu Diterima
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {waitingCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50">
                  <Clock3 size={22} className="text-yellow-600" />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("DITERIMA")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "DITERIMA"
                  ? "border-green-500 ring-2 ring-green-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Sudah Diterima
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {acceptedCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50">
                  <CheckCircle2
                    size={22}
                    className="text-green-600"
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Main Card */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Toolbar */}
            <div className="border-b border-gray-200 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Daftar Pasien Masuk
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Pasien yang telah memiliki admisi rawat inap.
                  </p>
                </div>

                <div className="relative w-full lg:w-96">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Cari nama, nomor RM, kamar..."
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
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
                      Nomor Rawat
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Kamar / Bed
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Kelas
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      DPJP
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Tanggal Masuk
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Asal
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
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
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
                            {patient.patientName
                              .split(" ")
                              .slice(0, 2)
                              .map((name) => name[0])
                              .join("")}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {patient.patientName}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              {patient.patientNumber} •{" "}
                              {patient.gender === "L"
                                ? "Laki-laki"
                                : "Perempuan"}{" "}
                              • {patient.age} tahun
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Inpatient Number */}
                      <td className="px-5 py-4">
                        <p className="font-mono text-sm text-gray-700">
                          {patient.inpatientNumber}
                        </p>
                      </td>

                      {/* Room */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Bed
                            size={17}
                            className="text-gray-400"
                          />

                          <div>
                            <p className="font-medium text-gray-800">
                              {patient.room}
                            </p>

                            <p className="text-xs text-gray-500">
                              Bed {patient.bed}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="px-5 py-4">
                        <span className="inline-flex rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                          Kelas {patient.class}
                        </span>
                      </td>

                      {/* Doctor */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-700">
                          {patient.doctor}
                        </p>
                      </td>

                      {/* Admission */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-700">
                          {patient.admissionDate}
                        </p>

                        <p className="text-xs text-gray-500">
                          {patient.admissionTime}
                        </p>
                      </td>

                      {/* Source */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-700">
                          {patient.source}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        {patient.status === "MENUNGGU" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700">
                            <Clock3 size={13} />
                            Menunggu
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                            <CheckCircle2 size={13} />
                            Diterima
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        {patient.status === "MENUNGGU" ? (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedPatient(patient)
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
                          >
                            <UserCheck size={16} />
                            Terima Pasien
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400">
                            Selesai
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-5 py-12 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <Search
                              size={22}
                              className="text-gray-400"
                            />
                          </div>

                          <p className="font-medium text-gray-700">
                            Data pasien tidak ditemukan
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Coba ubah kata kunci pencarian atau
                            filter.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-5 py-4">
              <p className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium text-gray-700">
                  {filteredPatients.length}
                </span>{" "}
                dari{" "}
                <span className="font-medium text-gray-700">
                  {patients.length}
                </span>{" "}
                pasien.
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <UserCheck
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-900">
                  Alur Pasien Masuk
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  Pasien yang telah selesai dibuatkan admisi dan
                  mendapatkan kamar akan muncul pada daftar ini.
                  Saat pasien tiba di ruang rawat inap, petugas
                  dapat memilih <strong>Terima Pasien</strong>{" "}
                  untuk mencatat penerimaan pasien di bangsal.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Terima Pasien
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Konfirmasi kedatangan pasien di ruang rawat
                  inap.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 px-6 py-5">
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal-700">
                    {selectedPatient.patientName
                      .split(" ")
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedPatient.patientName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {selectedPatient.patientNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-xs text-gray-500">
                    Nomor Rawat
                  </p>

                  <p className="mt-1 font-mono text-sm font-medium text-gray-800">
                    {selectedPatient.inpatientNumber}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-xs text-gray-500">
                    Kamar / Bed
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedPatient.room} /{" "}
                    {selectedPatient.bed}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-xs text-gray-500">
                    Kelas
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    Kelas {selectedPatient.class}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-3">
                  <p className="text-xs text-gray-500">
                    DPJP
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedPatient.doctor}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                <p className="text-sm leading-5 text-yellow-800">
                  Pastikan pasien sudah tiba di ruang rawat inap
                  dan menempati bed yang tercatat sebelum
                  melakukan konfirmasi.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleAcceptPatient}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              >
                <CheckCircle2 size={17} />
                Konfirmasi Pasien Masuk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}