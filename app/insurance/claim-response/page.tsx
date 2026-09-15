"use client";

import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock3,
  XCircle,
  X,
  Save,
  CircleDollarSign,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type ResponseStatus =
  | "APPROVED"
  | "PAID"
  | "PARTIAL"
  | "REJECTED";

type ClaimResponse = {
  id: number;
  patientName: string;
  mrNumber: string;
  claimNumber: string;
  invoiceNumber: string;
  payer: string;
  submittedDate: string;
  responseDate: string;
  claimAmount: number;
  approvedAmount: number;
  status: ResponseStatus;
  reason: string;
  settlementNumber: string;
};

const initialResponses: ClaimResponse[] = [
  {
    id: 1,
    patientName: "Budi Santoso",
    mrNumber: "RM-2026-00118",
    claimNumber: "CLM-2026-00881",
    invoiceNumber: "INV-2026-00118",
    payer: "PT Sehat Insurance",
    submittedDate: "15 Sep 2026",
    responseDate: "15 Sep 2026",
    claimAmount: 2600000,
    approvedAmount: 2600000,
    status: "APPROVED",
    reason: "-",
    settlementNumber: "-",
  },
  {
    id: 2,
    patientName: "Dewi Lestari",
    mrNumber: "RM-2026-00088",
    claimNumber: "CLM-2026-00872",
    invoiceNumber: "INV-2026-00088",
    payer: "BPJS Kesehatan",
    submittedDate: "14 Sep 2026",
    responseDate: "15 Sep 2026",
    claimAmount: 950000,
    approvedAmount: 750000,
    status: "PARTIAL",
    reason: "Sebagian item pelayanan tidak masuk benefit.",
    settlementNumber: "-",
  },
  {
    id: 3,
    patientName: "Andi Wijaya",
    mrNumber: "RM-2026-00097",
    claimNumber: "CLM-2026-00860",
    invoiceNumber: "INV-2026-00097",
    payer: "PT Maju Bersama",
    submittedDate: "13 Sep 2026",
    responseDate: "14 Sep 2026",
    claimAmount: 2100000,
    approvedAmount: 0,
    status: "REJECTED",
    reason: "Dokumen surat guarantee tidak sesuai.",
    settlementNumber: "-",
  },
  {
    id: 4,
    patientName: "Rina Kartika",
    mrNumber: "RM-2026-00071",
    claimNumber: "CLM-2026-00842",
    invoiceNumber: "INV-2026-00071",
    payer: "BPJS Kesehatan",
    submittedDate: "12 Sep 2026",
    responseDate: "14 Sep 2026",
    claimAmount: 1750000,
    approvedAmount: 1750000,
    status: "PAID",
    reason: "-",
    settlementNumber: "SET-2026-00421",
  },
  {
    id: 5,
    patientName: "Agus Pratama",
    mrNumber: "RM-2026-00064",
    claimNumber: "CLM-2026-00835",
    invoiceNumber: "INV-2026-00064",
    payer: "PT Sehat Insurance",
    submittedDate: "11 Sep 2026",
    responseDate: "-",
    claimAmount: 3100000,
    approvedAmount: 0,
    status: "APPROVED",
    reason: "Menunggu proses settlement.",
    settlementNumber: "-",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: ResponseStatus) {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "PAID":
      return "bg-blue-100 text-blue-700";
    case "PARTIAL":
      return "bg-yellow-100 text-yellow-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ClaimResponsePage() {
  const [responses, setResponses] = useState(initialResponses);
  const [search, setSearch] = useState("");
  const [selectedResponse, setSelectedResponse] =
    useState<ClaimResponse | null>(null);

  const [responseStatus, setResponseStatus] =
    useState<ResponseStatus>("APPROVED");

  const [approvedAmount, setApprovedAmount] =
    useState("");

  const [reason, setReason] = useState("");

  const filteredResponses = useMemo(() => {
    const keyword = search.toLowerCase();

    return responses.filter(
      (response) =>
        response.patientName.toLowerCase().includes(keyword) ||
        response.mrNumber.toLowerCase().includes(keyword) ||
        response.claimNumber.toLowerCase().includes(keyword) ||
        response.invoiceNumber.toLowerCase().includes(keyword) ||
        response.payer.toLowerCase().includes(keyword),
    );
  }, [responses, search]);

  const openResponse = (response: ClaimResponse) => {
    setSelectedResponse(response);
    setResponseStatus(response.status);
    setApprovedAmount(String(response.approvedAmount));
    setReason(response.reason === "-" ? "" : response.reason);
  };

  const saveResponse = () => {
    if (!selectedResponse) return;

    const amount = Number(approvedAmount) || 0;

    const updatedResponse: ClaimResponse = {
      ...selectedResponse,
      status: responseStatus,
      approvedAmount: amount,
      reason:
        responseStatus === "APPROVED" || responseStatus === "PAID"
          ? reason || "Disetujui oleh payer."
          : reason || "Terdapat koreksi dari payer.",
      responseDate: "15 Sep 2026",
      settlementNumber:
        responseStatus === "PAID"
          ? selectedResponse.settlementNumber === "-"
            ? `SET-2026-${String(selectedResponse.id).padStart(4, "0")}`
            : selectedResponse.settlementNumber
          : selectedResponse.settlementNumber,
    };

    setResponses((current) =>
      current.map((response) =>
        response.id === updatedResponse.id
          ? updatedResponse
          : response,
      ),
    );

    setSelectedResponse(updatedResponse);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Claim Response
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Catat respons payer dan proses settlement klaim.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Approved</p>
                <CheckCircle2 className="text-green-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {
                  responses.filter(
                    (response) => response.status === "APPROVED",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Paid</p>
                <CircleDollarSign
                  className="text-blue-600"
                  size={22}
                />
              </div>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {
                  responses.filter(
                    (response) => response.status === "PAID",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Partial</p>
                <Clock3 className="text-yellow-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {
                  responses.filter(
                    (response) => response.status === "PARTIAL",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Rejected</p>
                <AlertCircle className="text-red-600" size={22} />
              </div>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {
                  responses.filter(
                    (response) => response.status === "REJECTED",
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
                  placeholder="Cari pasien, No. RM, claim, invoice..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-275 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Pasien</th>
                    <th className="px-5 py-4">Claim</th>
                    <th className="px-5 py-4">Payer</th>
                    <th className="px-5 py-4">Nilai Klaim</th>
                    <th className="px-5 py-4">Approved</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredResponses.map((response) => (
                    <tr key={response.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {response.patientName}
                        </p>
                        <p className="font-mono text-xs text-gray-500">
                          {response.mrNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-mono text-xs text-gray-700">
                          {response.claimNumber}
                        </p>
                        <p className="mt-1 font-mono text-xs text-gray-400">
                          {response.invoiceNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {response.payer}
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        {formatCurrency(response.claimAmount)}
                      </td>

                      <td className="px-5 py-4 font-semibold text-green-600">
                        {formatCurrency(response.approvedAmount)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            response.status,
                          )}`}
                        >
                          {response.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => openResponse(response)}
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Catat Response
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredResponses.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        Data claim response tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {selectedResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Claim Response
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedResponse.patientName} ·{" "}
                  {selectedResponse.claimNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResponse(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Nomor Claim
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-gray-900">
                  {selectedResponse.claimNumber}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Nomor Invoice
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-gray-900">
                  {selectedResponse.invoiceNumber}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Nilai Pengajuan
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {formatCurrency(selectedResponse.claimAmount)}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Settlement
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-gray-900">
                  {selectedResponse.settlementNumber}
                </p>
              </div>
            </div>

            <div className="space-y-5 px-5 pb-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Status Response
                </label>

                <select
                  value={responseStatus}
                  onChange={(event) =>
                    setResponseStatus(
                      event.target.value as ResponseStatus,
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="APPROVED">APPROVED</option>
                  <option value="PAID">PAID</option>
                  <option value="PARTIAL">PARTIAL</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nilai Disetujui
                </label>

                <input
                  type="number"
                  value={approvedAmount}
                  onChange={(event) =>
                    setApprovedAmount(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Masukkan nilai settlement"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Nilai maksimal:{" "}
                  {formatCurrency(selectedResponse.claimAmount)}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Alasan / Catatan Response
                </label>

                <textarea
                  rows={4}
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="Masukkan alasan atau catatan dari payer..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {(responseStatus === "REJECTED" ||
                responseStatus === "PARTIAL") && (
                <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                  <XCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-red-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      Claim membutuhkan koreksi
                    </p>
                    <p className="mt-1 text-xs text-red-700">
                      Status klaim akan diperlakukan sebagai
                      NEED_REWORK dan dapat dikembalikan ke proses
                      validasi claim.
                    </p>
                  </div>
                </div>
              )}

              {(responseStatus === "APPROVED" ||
                responseStatus === "PAID") && (
                <div className="flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Claim dapat diproses
                    </p>
                    <p className="mt-1 text-xs text-green-700">
                      Response approved/paid dapat dilanjutkan ke
                      proses settlement dan pembaruan saldo piutang
                      penjamin.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 p-5">
              <button
                type="button"
                onClick={() => setSelectedResponse(null)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-white"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={saveResponse}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Save size={16} />
                Simpan Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}