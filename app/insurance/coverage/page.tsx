"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock3,
  X,
  Calculator,
  FileText,
  User,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type CoverageStatus =
  | "BELUM DIVALIDASI"
  | "VALID"
  | "NEED_DOCUMENT"
  | "TIDAK VALID";

type PayerType =
  | "JKN"
  | "PRIVATE_INSURANCE"
  | "COMPANY_GUARANTEE"
  | "SELF_PAY";

type CoverageItem = {
  id: number;
  service: string;
  category: string;
  total: number;
  payerDue: number;
  patientDue: number;
  nonCovered: number;
};

type PatientCoverage = {
  id: number;
  name: string;
  mrNumber: string;
  visitNumber: string;
  visitDate: string;
  payerType: PayerType;
  payer: string;
  membershipNumber: string;
  benefitPlan: string;
  referralNumber: string;
  coverageStatus: CoverageStatus;
  validity: string;
  className: string;
  totalBill: number;
  payerDue: number;
  patientDue: number;
  nonCovered: number;
  items: CoverageItem[];
};

const initialPatients: PatientCoverage[] = [
  {
    id: 1,
    name: "Siti Aminah",
    mrNumber: "RM-2026-00124",
    visitNumber: "KJ-2026-09015",
    visitDate: "15 Sep 2026",
    payerType: "JKN",
    payer: "BPJS Kesehatan",
    membershipNumber: "0001234567890",
    benefitPlan: "Kelas II",
    referralNumber: "SEP-20260915-00124",
    coverageStatus: "BELUM DIVALIDASI",
    validity: "s/d 30 Sep 2026",
    className: "II",
    totalBill: 1850000,
    payerDue: 0,
    patientDue: 0,
    nonCovered: 0,
    items: [
      {
        id: 1,
        service: "Konsultasi Dokter",
        category: "Layanan",
        total: 250000,
        payerDue: 0,
        patientDue: 0,
        nonCovered: 0,
      },
      {
        id: 2,
        service: "Pemeriksaan Laboratorium",
        category: "Laboratorium",
        total: 450000,
        payerDue: 0,
        patientDue: 0,
        nonCovered: 0,
      },
      {
        id: 3,
        service: "Obat",
        category: "Farmasi",
        total: 350000,
        payerDue: 0,
        patientDue: 0,
        nonCovered: 0,
      },
      {
        id: 4,
        service: "Kamar Rawat Inap",
        category: "Rawat Inap",
        total: 800000,
        payerDue: 0,
        patientDue: 0,
        nonCovered: 0,
      },
    ],
  },
  {
    id: 2,
    name: "Budi Santoso",
    mrNumber: "RM-2026-00118",
    visitNumber: "KJ-2026-09009",
    visitDate: "15 Sep 2026",
    payerType: "PRIVATE_INSURANCE",
    payer: "PT Sehat Insurance",
    membershipNumber: "SI-88392014",
    benefitPlan: "Premium Health Plan",
    referralNumber: "REF-88392014",
    coverageStatus: "VALID",
    validity: "s/d 31 Des 2026",
    className: "I",
    totalBill: 3250000,
    payerDue: 2600000,
    patientDue: 500000,
    nonCovered: 150000,
    items: [
      {
        id: 1,
        service: "Konsultasi Dokter Spesialis",
        category: "Layanan",
        total: 500000,
        payerDue: 450000,
        patientDue: 50000,
        nonCovered: 0,
      },
      {
        id: 2,
        service: "Laboratorium",
        category: "Laboratorium",
        total: 750000,
        payerDue: 650000,
        patientDue: 50000,
        nonCovered: 50000,
      },
      {
        id: 3,
        service: "Radiologi",
        category: "Radiologi",
        total: 1000000,
        payerDue: 800000,
        patientDue: 100000,
        nonCovered: 100000,
      },
      {
        id: 4,
        service: "Obat",
        category: "Farmasi",
        total: 1000000,
        payerDue: 700000,
        patientDue: 300000,
        nonCovered: 0,
      },
    ],
  },
  {
    id: 3,
    name: "Andi Wijaya",
    mrNumber: "RM-2026-00097",
    visitNumber: "KJ-2026-08982",
    visitDate: "14 Sep 2026",
    payerType: "COMPANY_GUARANTEE",
    payer: "PT Maju Bersama",
    membershipNumber: "MB-2026-00982",
    benefitPlan: "Corporate Health",
    referralNumber: "GAR-20260914-00982",
    coverageStatus: "NEED_DOCUMENT",
    validity: "s/d 20 Sep 2026",
    className: "II",
    totalBill: 2100000,
    payerDue: 0,
    patientDue: 0,
    nonCovered: 0,
    items: [],
  },
  {
    id: 4,
    name: "Dewi Lestari",
    mrNumber: "RM-2026-00088",
    visitNumber: "KJ-2026-08970",
    visitDate: "14 Sep 2026",
    payerType: "JKN",
    payer: "BPJS Kesehatan",
    membershipNumber: "0009876543210",
    benefitPlan: "Kelas III",
    referralNumber: "-",
    coverageStatus: "TIDAK VALID",
    validity: "Tidak ditemukan",
    className: "III",
    totalBill: 950000,
    payerDue: 0,
    patientDue: 950000,
    nonCovered: 0,
    items: [],
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: CoverageStatus) {
  switch (status) {
    case "VALID":
      return "bg-green-100 text-green-700";
    case "NEED_DOCUMENT":
      return "bg-yellow-100 text-yellow-700";
    case "TIDAK VALID":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function InsuranceCoveragePage() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] =
    useState<PatientCoverage | null>(null);

  const filteredPatients = useMemo(() => {
    const keyword = search.toLowerCase();

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(keyword) ||
        patient.mrNumber.toLowerCase().includes(keyword) ||
        patient.visitNumber.toLowerCase().includes(keyword) ||
        patient.payer.toLowerCase().includes(keyword),
    );
  }, [patients, search]);

  const validateMembership = () => {
    if (!selectedPatient) return;

    const updated: PatientCoverage = {
      ...selectedPatient,
      coverageStatus:
        selectedPatient.id === 3
          ? "NEED_DOCUMENT"
          : selectedPatient.id === 4
            ? "TIDAK VALID"
            : "VALID",
    };

    setPatients((current) =>
      current.map((patient) =>
        patient.id === updated.id ? updated : patient,
      ),
    );

    setSelectedPatient(updated);
  };

  const calculateCoverage = () => {
    if (!selectedPatient || selectedPatient.coverageStatus !== "VALID") {
      return;
    }

    const updatedItems = selectedPatient.items.map((item) => ({
      ...item,
    }));

    const updated: PatientCoverage = {
      ...selectedPatient,
      items: updatedItems,
    };

    setPatients((current) =>
      current.map((patient) =>
        patient.id === updated.id ? updated : patient,
      ),
    );

    setSelectedPatient(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Insurance / Coverage
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Validasi kepesertaan penjamin dan hitung coverage pasien.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Total Akun</p>
                <ShieldCheck className="text-blue-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {patients.length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Valid</p>
                <CheckCircle2 className="text-green-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {
                  patients.filter(
                    (patient) => patient.coverageStatus === "VALID",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Need Document</p>
                <Clock3 className="text-yellow-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {
                  patients.filter(
                    (patient) =>
                      patient.coverageStatus === "NEED_DOCUMENT",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Tidak Valid</p>
                <AlertCircle className="text-red-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {
                  patients.filter(
                    (patient) =>
                      patient.coverageStatus === "TIDAK VALID",
                  ).length
                }
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-5">
              <div className="relative max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari nama, No. RM, kunjungan, payer..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-237.5 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Pasien</th>
                    <th className="px-5 py-4">Kunjungan</th>
                    <th className="px-5 py-4">Jenis Penjamin</th>
                    <th className="px-5 py-4">Payer</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {patient.name}
                        </p>
                        <p className="font-mono text-xs text-gray-500">
                          {patient.mrNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-mono text-xs text-gray-700">
                          {patient.visitNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          {patient.visitDate}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {patient.payerType}
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {patient.payer}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            patient.coverageStatus,
                          )}`}
                        >
                          {patient.coverageStatus}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedPatient(patient)}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Verifikasi
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        Data pasien tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Verifikasi Insurance / Coverage
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedPatient.name} · {selectedPatient.mrNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-4 lg:col-span-2">
                <div className="mb-4 flex items-center gap-2">
                  <User size={18} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-900">
                    Data Penjamin
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs text-gray-500">
                      Jenis Pembiayaan
                    </label>
                    <input
                      value={selectedPatient.payerType}
                      readOnly
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Payer
                    </label>
                    <input
                      value={selectedPatient.payer}
                      readOnly
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Nomor Kepesertaan / Polis
                    </label>
                    <input
                      value={selectedPatient.membershipNumber}
                      readOnly
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Benefit Plan
                    </label>
                    <input
                      value={selectedPatient.benefitPlan}
                      readOnly
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      No. Rujukan / SEP / Guarantee
                    </label>
                    <input
                      value={selectedPatient.referralNumber}
                      readOnly
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">
                      Masa Berlaku
                    </label>
                    <input
                      value={selectedPatient.validity}
                      readOnly
                      className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500">Status Coverage</p>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    selectedPatient.coverageStatus,
                  )}`}
                >
                  {selectedPatient.coverageStatus}
                </span>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Tagihan</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedPatient.totalBill)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Payer Due</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(selectedPatient.payerDue)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Patient Due</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedPatient.patientDue)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Non Covered</span>
                    <span className="font-semibold text-red-600">
                      {formatCurrency(selectedPatient.nonCovered)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <button
                    type="button"
                    onClick={validateMembership}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    <ShieldCheck size={17} />
                    Validasi Kepesertaan
                  </button>

                  <button
                    type="button"
                    disabled={
                      selectedPatient.coverageStatus !== "VALID"
                    }
                    onClick={calculateCoverage}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <Calculator size={17} />
                    Hitung Coverage
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-5">
              <div className="mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-600" />
                <h3 className="font-semibold text-gray-900">
                  Rincian Coverage
                </h3>
              </div>

              {selectedPatient.items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-175 text-left text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500">
                      <tr>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3">Kategori</th>
                        <th className="px-4 py-3 text-right">Total</th>
                        <th className="px-4 py-3 text-right">Payer Due</th>
                        <th className="px-4 py-3 text-right">Patient Due</th>
                        <th className="px-4 py-3 text-right">Non Covered</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {selectedPatient.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 font-medium text-gray-900">
                            {item.service}
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {item.category}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {formatCurrency(item.total)}
                          </td>
                          <td className="px-4 py-3 text-right text-green-600">
                            {formatCurrency(item.payerDue)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {formatCurrency(item.patientDue)}
                          </td>
                          <td className="px-4 py-3 text-right text-red-600">
                            {formatCurrency(item.nonCovered)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500">
                  Belum ada rincian coverage yang dapat ditampilkan.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}