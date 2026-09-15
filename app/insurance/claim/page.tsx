"use client";

import { useMemo, useState } from "react";
import {
  Search,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Clock3,
  X,
  Upload,
  Send,
  FileText,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type ClaimStatus =
  | "CLAIM_DRAFT"
  | "CLAIM_READY"
  | "SUBMITTED"
  | "NEED_REWORK";

type ChecklistItem = {
  id: number;
  label: string;
  description: string;
  required: boolean;
  completed: boolean;
};

type ClaimPatient = {
  id: number;
  name: string;
  mrNumber: string;
  visitNumber: string;
  payer: string;
  claimNumber: string;
  invoiceNumber: string;
  totalClaim: number;
  status: ClaimStatus;
  submittedAt: string;
  checklist: ChecklistItem[];
};

const initialClaims: ClaimPatient[] = [
  {
    id: 1,
    name: "Siti Aminah",
    mrNumber: "RM-2026-00124",
    visitNumber: "KJ-2026-09015",
    payer: "BPJS Kesehatan",
    claimNumber: "-",
    invoiceNumber: "INV-2026-00124",
    totalClaim: 1850000,
    status: "CLAIM_DRAFT",
    submittedAt: "-",
    checklist: [
      {
        id: 1,
        label: "Identitas pasien",
        description: "Data identitas sesuai dengan kepesertaan.",
        required: true,
        completed: true,
      },
      {
        id: 2,
        label: "Data kepesertaan / polis",
        description: "Nomor kepesertaan atau polis tersedia.",
        required: true,
        completed: true,
      },
      {
        id: 3,
        label: "SEP / surat rujukan / guarantee",
        description: "Dokumen penjamin tersedia sesuai payer.",
        required: true,
        completed: false,
      },
      {
        id: 4,
        label: "Resume medis",
        description: "Resume medis tersedia sebagai dokumen pendukung.",
        required: true,
        completed: true,
      },
      {
        id: 5,
        label: "Rincian tagihan",
        description: "Item tagihan sesuai dengan coverage.",
        required: true,
        completed: true,
      },
      {
        id: 6,
        label: "Dokumen pendukung pelayanan",
        description: "Dokumen tambahan tersedia jika dipersyaratkan payer.",
        required: false,
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "Budi Santoso",
    mrNumber: "RM-2026-00118",
    visitNumber: "KJ-2026-09009",
    payer: "PT Sehat Insurance",
    claimNumber: "CLM-2026-00881",
    invoiceNumber: "INV-2026-00118",
    totalClaim: 2600000,
    status: "CLAIM_READY",
    submittedAt: "-",
    checklist: [
      {
        id: 1,
        label: "Identitas pasien",
        description: "Data identitas sesuai dengan kepesertaan.",
        required: true,
        completed: true,
      },
      {
        id: 2,
        label: "Data kepesertaan / polis",
        description: "Nomor kepesertaan atau polis tersedia.",
        required: true,
        completed: true,
      },
      {
        id: 3,
        label: "Surat jaminan",
        description: "Dokumen jaminan tersedia.",
        required: true,
        completed: true,
      },
      {
        id: 4,
        label: "Resume medis",
        description: "Resume medis tersedia.",
        required: true,
        completed: true,
      },
      {
        id: 5,
        label: "Rincian tagihan",
        description: "Item tagihan sesuai dengan coverage.",
        required: true,
        completed: true,
      },
      {
        id: 6,
        label: "Dokumen pendukung",
        description: "Dokumen tambahan telah dilengkapi.",
        required: false,
        completed: true,
      },
    ],
  },
  {
    id: 3,
    name: "Andi Wijaya",
    mrNumber: "RM-2026-00097",
    visitNumber: "KJ-2026-08982",
    payer: "PT Maju Bersama",
    claimNumber: "-",
    invoiceNumber: "INV-2026-00097",
    totalClaim: 2100000,
    status: "NEED_REWORK",
    submittedAt: "14 Sep 2026 15:20",
    checklist: [
      {
        id: 1,
        label: "Identitas pasien",
        description: "Data identitas pasien.",
        required: true,
        completed: true,
      },
      {
        id: 2,
        label: "Surat guarantee",
        description: "Surat jaminan dari perusahaan.",
        required: true,
        completed: false,
      },
      {
        id: 3,
        label: "Resume medis",
        description: "Resume medis tersedia.",
        required: true,
        completed: true,
      },
      {
        id: 4,
        label: "Rincian tagihan",
        description: "Rincian tagihan pelayanan.",
        required: true,
        completed: true,
      },
    ],
  },
  {
    id: 4,
    name: "Dewi Lestari",
    mrNumber: "RM-2026-00088",
    visitNumber: "KJ-2026-08970",
    payer: "BPJS Kesehatan",
    claimNumber: "CLM-2026-00872",
    invoiceNumber: "INV-2026-00088",
    totalClaim: 950000,
    status: "SUBMITTED",
    submittedAt: "14 Sep 2026 11:05",
    checklist: [
      {
        id: 1,
        label: "Identitas pasien",
        description: "Data identitas pasien.",
        required: true,
        completed: true,
      },
      {
        id: 2,
        label: "Kepesertaan",
        description: "Data kepesertaan.",
        required: true,
        completed: true,
      },
      {
        id: 3,
        label: "SEP / rujukan",
        description: "Dokumen SEP.",
        required: true,
        completed: true,
      },
      {
        id: 4,
        label: "Resume medis",
        description: "Resume medis.",
        required: true,
        completed: true,
      },
    ],
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: ClaimStatus) {
  switch (status) {
    case "CLAIM_READY":
      return "bg-green-100 text-green-700";
    case "SUBMITTED":
      return "bg-blue-100 text-blue-700";
    case "NEED_REWORK":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function ClaimPage() {
  const [claims, setClaims] = useState(initialClaims);
  const [search, setSearch] = useState("");
  const [selectedClaim, setSelectedClaim] =
    useState<ClaimPatient | null>(null);

  const filteredClaims = useMemo(() => {
    const keyword = search.toLowerCase();

    return claims.filter(
      (claim) =>
        claim.name.toLowerCase().includes(keyword) ||
        claim.mrNumber.toLowerCase().includes(keyword) ||
        claim.visitNumber.toLowerCase().includes(keyword) ||
        claim.payer.toLowerCase().includes(keyword) ||
        claim.invoiceNumber.toLowerCase().includes(keyword),
    );
  }, [claims, search]);

  const updateChecklist = (id: number) => {
    if (!selectedClaim) return;

    const updatedChecklist = selectedClaim.checklist.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item,
    );

    const updatedClaim = {
      ...selectedClaim,
      checklist: updatedChecklist,
    };

    setClaims((current) =>
      current.map((claim) =>
        claim.id === updatedClaim.id ? updatedClaim : claim,
      ),
    );

    setSelectedClaim(updatedClaim);
  };

  const validateClaim = () => {
    if (!selectedClaim) return;

    const incompleteRequired = selectedClaim.checklist.some(
      (item) => item.required && !item.completed,
    );

    const updatedClaim = {
      ...selectedClaim,
      status: incompleteRequired
        ? ("CLAIM_DRAFT" as ClaimStatus)
        : ("CLAIM_READY" as ClaimStatus),
    };

    setClaims((current) =>
      current.map((claim) =>
        claim.id === updatedClaim.id ? updatedClaim : claim,
      ),
    );

    setSelectedClaim(updatedClaim);
  };

  const submitClaim = () => {
    if (
      !selectedClaim ||
      selectedClaim.status !== "CLAIM_READY"
    ) {
      return;
    }

    const updatedClaim = {
      ...selectedClaim,
      status: "SUBMITTED" as ClaimStatus,
      claimNumber:
        selectedClaim.claimNumber === "-"
          ? `CLM-2026-${String(selectedClaim.id).padStart(4, "0")}`
          : selectedClaim.claimNumber,
      submittedAt: "15 Sep 2026 10:30",
    };

    setClaims((current) =>
      current.map((claim) =>
        claim.id === updatedClaim.id ? updatedClaim : claim,
      ),
    );

    setSelectedClaim(updatedClaim);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Claim
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Verifikasi kelengkapan dokumen dan pengajuan klaim
              penjamin.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Claim Draft</p>
                <Clock3 className="text-yellow-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {
                  claims.filter(
                    (claim) => claim.status === "CLAIM_DRAFT",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Ready</p>
                <CheckCircle2 className="text-green-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {
                  claims.filter(
                    (claim) => claim.status === "CLAIM_READY",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Submitted</p>
                <Send className="text-blue-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {
                  claims.filter(
                    (claim) => claim.status === "SUBMITTED",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Need Rework</p>
                <AlertCircle className="text-red-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {
                  claims.filter(
                    (claim) => claim.status === "NEED_REWORK",
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
                  placeholder="Cari pasien, No. RM, invoice, payer..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-250 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Pasien</th>
                    <th className="px-5 py-4">Payer</th>
                    <th className="px-5 py-4">Invoice</th>
                    <th className="px-5 py-4">Nilai Klaim</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {claim.name}
                        </p>
                        <p className="font-mono text-xs text-gray-500">
                          {claim.mrNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {claim.payer}
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-gray-700">
                        {claim.invoiceNumber}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {formatCurrency(claim.totalClaim)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            claim.status,
                          )}`}
                        >
                          {claim.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedClaim(claim)}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Buka Claim
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredClaims.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        Data klaim tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Verifikasi Claim
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedClaim.name} · {selectedClaim.mrNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedClaim(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500">No. Kunjungan</p>
                <p className="mt-1 font-mono text-sm font-semibold">
                  {selectedClaim.visitNumber}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500">Payer</p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedClaim.payer}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500">Nilai Klaim</p>
                <p className="mt-1 text-sm font-semibold">
                  {formatCurrency(selectedClaim.totalClaim)}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Checklist Dokumen Klaim
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Pastikan seluruh dokumen wajib telah tersedia.
                  </p>
                </div>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Upload size={15} />
                  Upload Dokumen
                </button>
              </div>

              <div className="space-y-3">
                {selectedClaim.checklist.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-xl border p-4 ${
                      item.completed
                        ? "border-green-200 bg-green-50/50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => updateChecklist(item.id)}
                        disabled={selectedClaim.status === "SUBMITTED"}
                        className="mt-0.5"
                      >
                        {item.completed ? (
                          <CheckCircle2
                            size={21}
                            className="text-green-600"
                          />
                        ) : (
                          <div className="h-5.25 w-5.25 rounded-full border-2 border-gray-300" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.label}
                          </p>

                          {item.required && (
                            <span className="text-xs font-medium text-red-500">
                              Wajib
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.completed
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.completed ? "Lengkap" : "Belum"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-5">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-gray-500" />
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    selectedClaim.status,
                  )}`}
                >
                  {selectedClaim.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={validateClaim}
                  disabled={selectedClaim.status === "SUBMITTED"}
                  className="rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Validate Claim
                </button>

                <button
                  type="button"
                  onClick={submitClaim}
                  disabled={selectedClaim.status !== "CLAIM_READY"}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  <Send size={16} />
                  Submit Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}