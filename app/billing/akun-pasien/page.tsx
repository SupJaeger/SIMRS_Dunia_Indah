"use client";

import { useMemo, useState } from "react";
import {
  Search,
  User,
  Eye,
  Receipt,
  CreditCard,
  CalendarDays,
  X,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type Patient = {
  id: number;
  medicalRecord: string;
  name: string;
  visitNumber: string;
  visitDate: string;
  service: string;
  payer: string;
  status: "BELUM DIBILLING" | "PRELIMINARY" | "FINAL" | "PAID";
  total: number;
};

const patients: Patient[] = [
  {
    id: 1,
    medicalRecord: "RM-001245",
    name: "Andi Pratama",
    visitNumber: "KJ-20260915-001",
    visitDate: "15 Sep 2026",
    service: "Rawat Jalan",
    payer: "SELF PAY",
    status: "BELUM DIBILLING",
    total: 0,
  },
  {
    id: 2,
    medicalRecord: "RM-001246",
    name: "Siti Rahma",
    visitNumber: "KJ-20260915-002",
    visitDate: "15 Sep 2026",
    service: "Rawat Inap",
    payer: "BPJS / JKN",
    status: "PRELIMINARY",
    total: 2850000,
  },
  {
    id: 3,
    medicalRecord: "RM-001247",
    name: "Budi Santoso",
    visitNumber: "KJ-20260914-018",
    visitDate: "14 Sep 2026",
    service: "Rawat Jalan",
    payer: "PRIVATE INSURANCE",
    status: "FINAL",
    total: 1250000,
  },
  {
    id: 4,
    medicalRecord: "RM-001248",
    name: "Maria Lestari",
    visitNumber: "KJ-20260914-021",
    visitDate: "14 Sep 2026",
    service: "Rawat Inap",
    payer: "SELF PAY",
    status: "PAID",
    total: 4750000,
  },
  {
    id: 5,
    medicalRecord: "RM-001249",
    name: "Doni Saputra",
    visitNumber: "KJ-20260913-009",
    visitDate: "13 Sep 2026",
    service: "Rawat Jalan",
    payer: "COMPANY GUARANTEE",
    status: "PRELIMINARY",
    total: 875000,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: Patient["status"]) {
  switch (status) {
    case "BELUM DIBILLING":
      return "bg-gray-100 text-gray-700";
    case "PRELIMINARY":
      return "bg-yellow-100 text-yellow-700";
    case "FINAL":
      return "bg-blue-100 text-blue-700";
    case "PAID":
      return "bg-green-100 text-green-700";
  }
}

export default function AkunPasienPage() {
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const keyword = search.toLowerCase();

      return (
        patient.name.toLowerCase().includes(keyword) ||
        patient.medicalRecord.toLowerCase().includes(keyword) ||
        patient.visitNumber.toLowerCase().includes(keyword)
      );
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Akun Pasien
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Pilih kunjungan pasien untuk melihat dan membentuk akun billing.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Total Kunjungan</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {patients.length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Belum Billing</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {patients.filter((p) => p.status === "BELUM DIBILLING").length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Sudah Final</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {patients.filter((p) => p.status === "FINAL" || p.status === "PAID").length}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-gray-200 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Daftar Kunjungan
                </h2>
                <p className="text-sm text-gray-500">
                  Cari berdasarkan nama, nomor RM, atau nomor kunjungan.
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari pasien..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-225 text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Pasien
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Kunjungan
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Pelayanan
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Penjamin
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right font-semibold text-gray-600">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                            <User size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {patient.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {patient.medicalRecord}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800">
                          {patient.visitNumber}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                          <CalendarDays size={13} />
                          {patient.visitDate}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {patient.service}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {patient.payer}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                            patient.status
                          )}`}
                        >
                          {patient.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedPatient(patient)}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <Eye size={16} />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Detail Akun Pasien
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedPatient.visitNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs text-gray-500">Nama Pasien</p>
                <p className="font-semibold text-gray-900">
                  {selectedPatient.name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">No. RM</p>
                  <p className="font-medium text-gray-800">
                    {selectedPatient.medicalRecord}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Pelayanan</p>
                  <p className="font-medium text-gray-800">
                    {selectedPatient.service}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">Penjamin</p>
                <p className="font-medium text-gray-800">
                  {selectedPatient.payer}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">Total Billing</p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {selectedPatient.total === 0
                    ? "Belum dihitung"
                    : formatCurrency(selectedPatient.total)}
                </p>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700"
              >
                <Receipt size={17} />
                Buka Billing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}