"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Clock3,
  Eye,
  X,
  Check,
  Ban,
  FileText,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type AdjustmentStatus =
  | "MENUNGGU APPROVAL"
  | "APPROVED"
  | "REJECTED";

type AdjustmentRequest = {
  id: number;
  requestNumber: string;
  patientName: string;
  mrNumber: string;
  visitNumber: string;
  invoiceNumber: string;
  type: "DISKON" | "KOREKSI" | "MANUAL ADJUSTMENT";
  amount: number;
  reason: string;
  requestedBy: string;
  requestedAt: string;
  status: AdjustmentStatus;
  evidence: string;
};

const initialRequests: AdjustmentRequest[] = [
  {
    id: 1,
    requestNumber: "ADJ-2026-00121",
    patientName: "Siti Aminah",
    mrNumber: "RM-2026-00124",
    visitNumber: "KJ-2026-09015",
    invoiceNumber: "INV-2026-00124",
    type: "DISKON",
    amount: 250000,
    reason: "Diskon khusus sesuai kebijakan pelayanan pasien.",
    requestedBy: "Billing - Rina",
    requestedAt: "15 Sep 2026 08:40",
    status: "MENUNGGU APPROVAL",
    evidence: "Surat permohonan diskon",
  },
  {
    id: 2,
    requestNumber: "ADJ-2026-00118",
    patientName: "Budi Santoso",
    mrNumber: "RM-2026-00118",
    visitNumber: "KJ-2026-09009",
    invoiceNumber: "INV-2026-00118",
    type: "KOREKSI",
    amount: 450000,
    reason: "Koreksi tarif tindakan yang tercatat tidak sesuai.",
    requestedBy: "Billing - Andi",
    requestedAt: "15 Sep 2026 08:15",
    status: "MENUNGGU APPROVAL",
    evidence: "Dokumen koreksi tarif",
  },
  {
    id: 3,
    requestNumber: "ADJ-2026-00112",
    patientName: "Dewi Lestari",
    mrNumber: "RM-2026-00088",
    visitNumber: "KJ-2026-08970",
    invoiceNumber: "INV-2026-00088",
    type: "MANUAL ADJUSTMENT",
    amount: 175000,
    reason: "Penyesuaian item billing akibat pembatalan layanan.",
    requestedBy: "Billing - Rina",
    requestedAt: "14 Sep 2026 16:20",
    status: "APPROVED",
    evidence: "Catatan pembatalan layanan",
  },
  {
    id: 4,
    requestNumber: "ADJ-2026-00107",
    patientName: "Andi Wijaya",
    mrNumber: "RM-2026-00097",
    visitNumber: "KJ-2026-08982",
    invoiceNumber: "INV-2026-00097",
    type: "DISKON",
    amount: 500000,
    reason: "Permintaan diskon khusus tanpa dokumen pendukung.",
    requestedBy: "Billing - Andi",
    requestedAt: "14 Sep 2026 13:10",
    status: "REJECTED",
    evidence: "Tidak ada",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: AdjustmentStatus) {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
}

export default function ApprovalAdjustmentPage() {
  const [requests, setRequests] =
    useState(initialRequests);

  const [search, setSearch] = useState("");

  const [selectedRequest, setSelectedRequest] =
    useState<AdjustmentRequest | null>(null);

  const filteredRequests = useMemo(() => {
    const keyword = search.toLowerCase();

    return requests.filter(
      (request) =>
        request.patientName.toLowerCase().includes(keyword) ||
        request.mrNumber.toLowerCase().includes(keyword) ||
        request.requestNumber.toLowerCase().includes(keyword) ||
        request.invoiceNumber.toLowerCase().includes(keyword),
    );
  }, [requests, search]);

  const updateStatus = (
    status: "APPROVED" | "REJECTED",
  ) => {
    if (!selectedRequest) return;

    const updatedRequest = {
      ...selectedRequest,
      status,
    };

    setRequests((current) =>
      current.map((request) =>
        request.id === updatedRequest.id
          ? updatedRequest
          : request,
      ),
    );

    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Approval Adjustment
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Tinjau dan proses persetujuan adjustment billing
              yang membutuhkan otorisasi supervisor.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Menunggu Approval
                </p>

                <Clock3
                  size={22}
                  className="text-yellow-600"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {
                  requests.filter(
                    (request) =>
                      request.status ===
                      "MENUNGGU APPROVAL",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Approved
                </p>

                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {
                  requests.filter(
                    (request) =>
                      request.status === "APPROVED",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Rejected
                </p>

                <XCircle
                  size={22}
                  className="text-red-600"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {
                  requests.filter(
                    (request) =>
                      request.status === "REJECTED",
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
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Cari pasien, No. RM, adjustment..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-250 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-4">
                      Request
                    </th>

                    <th className="px-5 py-4">
                      Pasien
                    </th>

                    <th className="px-5 py-4">
                      Jenis
                    </th>

                    <th className="px-5 py-4">
                      Nominal
                    </th>

                    <th className="px-5 py-4">
                      Pengaju
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-mono text-xs font-semibold text-gray-900">
                          {request.requestNumber}
                        </p>

                        <p className="mt-1 font-mono text-xs text-gray-400">
                          {request.invoiceNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {request.patientName}
                        </p>

                        <p className="font-mono text-xs text-gray-500">
                          {request.mrNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {request.type}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {formatCurrency(request.amount)}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-gray-700">
                          {request.requestedBy}
                        </p>

                        <p className="text-xs text-gray-400">
                          {request.requestedAt}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            request.status,
                          )}`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRequest(request)
                          }
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          <Eye size={15} />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredRequests.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        Request adjustment tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Review Adjustment
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedRequest.requestNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Pasien
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedRequest.patientName}
                  </p>

                  <p className="mt-1 font-mono text-xs text-gray-500">
                    {selectedRequest.mrNumber}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Invoice
                  </p>

                  <p className="mt-1 font-mono text-sm font-semibold">
                    {selectedRequest.invoiceNumber}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Jenis Adjustment
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {selectedRequest.type}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Nominal Adjustment
                  </p>

                  <p className="mt-1 text-lg font-bold text-blue-600">
                    {formatCurrency(
                      selectedRequest.amount,
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Alasan
                </p>

                <div className="rounded-lg border border-gray-200 p-4 text-sm text-gray-700">
                  {selectedRequest.reason}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <FileText
                    size={16}
                    className="text-blue-600"
                  />

                  <p className="text-sm font-semibold text-gray-700">
                    Bukti Pendukung
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 text-sm text-gray-700">
                  {selectedRequest.evidence}
                </div>
              </div>

              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-sm font-semibold text-yellow-800">
                  Otorisasi Supervisor
                </p>

                <p className="mt-1 text-xs text-yellow-700">
                  Pastikan alasan dan bukti pendukung telah
                  diperiksa sebelum melakukan approval.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 p-5">
              <button
                type="button"
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-white"
              >
                Tutup
              </button>

              {selectedRequest.status ===
                "MENUNGGU APPROVAL" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus("REJECTED")
                    }
                    className="flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Ban size={16} />
                    Reject
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateStatus("APPROVED")
                    }
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}