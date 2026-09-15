"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Clock3,
  CheckCircle2,
  XCircle,
  X,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type Adjustment = {
  id: number;
  requestNumber: string;
  patient: string;
  medicalRecord: string;
  invoiceNumber: string;
  type: string;
  amount: number;
  reason: string;
  status: "DRAFT" | "MENUNGGU APPROVAL" | "APPROVED" | "REJECTED";
};

const initialAdjustments: Adjustment[] = [
  {
    id: 1,
    requestNumber: "ADJ-20260915-001",
    patient: "Siti Rahma",
    medicalRecord: "RM-001246",
    invoiceNumber: "INV-20260915-002",
    type: "Diskon Administrasi",
    amount: 100000,
    reason: "Koreksi biaya administrasi",
    status: "MENUNGGU APPROVAL",
  },
  {
    id: 2,
    requestNumber: "ADJ-20260914-004",
    patient: "Budi Santoso",
    medicalRecord: "RM-001247",
    invoiceNumber: "INV-20260914-018",
    type: "Manual Adjustment",
    amount: 75000,
    reason: "Koreksi item layanan",
    status: "APPROVED",
  },
  {
    id: 3,
    requestNumber: "ADJ-20260913-002",
    patient: "Maria Lestari",
    medicalRecord: "RM-001248",
    invoiceNumber: "INV-20260913-009",
    type: "Diskon",
    amount: 150000,
    reason: "Kebijakan internal rumah sakit",
    status: "REJECTED",
  },
];

function statusClass(status: Adjustment["status"]) {
  switch (status) {
    case "DRAFT":
      return "bg-gray-100 text-gray-700";
    case "MENUNGGU APPROVAL":
      return "bg-yellow-100 text-yellow-700";
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
  }
}

export default function AdjustmentPage() {
  const [adjustments, setAdjustments] = useState(initialAdjustments);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [patient, setPatient] = useState("");
  const [invoice, setInvoice] = useState("");
  const [type, setType] = useState("Diskon");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const filteredAdjustments = useMemo(() => {
    return adjustments.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.patient.toLowerCase().includes(keyword) ||
        item.medicalRecord.toLowerCase().includes(keyword) ||
        item.requestNumber.toLowerCase().includes(keyword)
      );
    });
  }, [adjustments, search]);

  const handleSubmit = () => {
    if (!patient || !invoice || !amount || !reason) return;

    const newAdjustment: Adjustment = {
      id: adjustments.length + 1,
      requestNumber: `ADJ-20260915-00${adjustments.length + 1}`,
      patient,
      medicalRecord: "RM-001250",
      invoiceNumber: invoice,
      type,
      amount: Number(amount),
      reason,
      status: Number(amount) > 100000 ? "MENUNGGU APPROVAL" : "APPROVED",
    };

    setAdjustments([newAdjustment, ...adjustments]);

    setPatient("");
    setInvoice("");
    setAmount("");
    setReason("");
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Adjustment Request
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Ajukan koreksi, diskon, atau adjustment pada tagihan pasien.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
            >
              <Plus size={17} />
              Buat Adjustment
            </button>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Total Request</p>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {adjustments.length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Menunggu Approval</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {
                  adjustments.filter(
                    (item) => item.status === "MENUNGGU APPROVAL"
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Approved</p>
              <p className="mt-2 text-2xl font-bold text-green-600">
                {adjustments.filter((item) => item.status === "APPROVED").length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {adjustments.filter((item) => item.status === "REJECTED").length}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-5">
              <div className="relative w-full md:w-96">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari request, pasien, atau No. RM..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-237.5 text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Request
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Pasien
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Jenis
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Nilai
                    </th>
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Alasan
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
                  {filteredAdjustments.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {item.requestNumber}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.invoiceNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800">
                          {item.patient}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.medicalRecord}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {item.type}
                      </td>

                      <td className="px-5 py-4 font-semibold text-gray-900">
                        Rp {item.amount.toLocaleString("id-ID")}
                      </td>

                      <td className="max-w-xs px-5 py-4 text-gray-600">
                        {item.reason}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Buat Adjustment Request
                </h2>
                <p className="text-sm text-gray-500">
                  Isi data adjustment dengan lengkap.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Nama Pasien *
                </label>

                <input
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  placeholder="Contoh: Andi Pratama"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  No. Invoice *
                </label>

                <input
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  placeholder="INV-20260915-001"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Jenis Adjustment *
                  </label>

                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                  >
                    <option>Diskon</option>
                    <option>Manual Adjustment</option>
                    <option>Koreksi Tarif</option>
                    <option>Koreksi Item</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Nilai Adjustment *
                  </label>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Alasan *
                </label>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Jelaskan alasan adjustment..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
                Adjustment di atas batas kewenangan kasir akan masuk ke proses
                approval supervisor.
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700"
              >
                <CheckCircle2 size={17} />
                Ajukan Adjustment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}