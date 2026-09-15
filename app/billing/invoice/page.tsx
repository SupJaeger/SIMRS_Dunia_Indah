"use client";

import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Eye,
  Printer,
  Download,
  Receipt,
  X,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type Invoice = {
  id: number;
  invoiceNumber: string;
  patient: string;
  medicalRecord: string;
  date: string;
  service: string;
  gross: number;
  adjustment: number;
  patientDue: number;
  status: "FINAL" | "PAID" | "PARTIAL";
};

const invoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-20260915-002",
    patient: "Siti Rahma",
    medicalRecord: "RM-001246",
    date: "15 Sep 2026",
    service: "Rawat Inap",
    gross: 2850000,
    adjustment: 100000,
    patientDue: 650000,
    status: "PARTIAL",
  },
  {
    id: 2,
    invoiceNumber: "INV-20260914-018",
    patient: "Budi Santoso",
    medicalRecord: "RM-001247",
    date: "14 Sep 2026",
    service: "Rawat Jalan",
    gross: 1250000,
    adjustment: 0,
    patientDue: 1250000,
    status: "PAID",
  },
  {
    id: 3,
    invoiceNumber: "INV-20260913-009",
    patient: "Maria Lestari",
    medicalRecord: "RM-001248",
    date: "13 Sep 2026",
    service: "Rawat Inap",
    gross: 4750000,
    adjustment: 150000,
    patientDue: 4750000,
    status: "PAID",
  },
  {
    id: 4,
    invoiceNumber: "INV-20260912-013",
    patient: "Doni Saputra",
    medicalRecord: "RM-001249",
    date: "12 Sep 2026",
    service: "Rawat Jalan",
    gross: 875000,
    adjustment: 0,
    patientDue: 875000,
    status: "FINAL",
  },
];

function statusClass(status: Invoice["status"]) {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-700";
    case "PARTIAL":
      return "bg-yellow-100 text-yellow-700";
    case "FINAL":
      return "bg-blue-100 text-blue-700";
  }
}

export default function InvoicePage() {
  const [search, setSearch] = useState("");
  const [selectedInvoice, setSelectedInvoice] =
    useState<Invoice | null>(null);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const keyword = search.toLowerCase();

      return (
        invoice.invoiceNumber.toLowerCase().includes(keyword) ||
        invoice.patient.toLowerCase().includes(keyword) ||
        invoice.medicalRecord.toLowerCase().includes(keyword)
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
              Invoice & Kuitansi
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Lihat, cetak, dan kelola dokumen invoice serta kuitansi pembayaran.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Total Invoice</p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {invoices.length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Lunas</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {invoices.filter((item) => item.status === "PAID").length}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Belum Lunas</p>

              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {
                  invoices.filter(
                    (item) =>
                      item.status === "PARTIAL" ||
                      item.status === "FINAL"
                  ).length
                }
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-gray-200 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Daftar Invoice
                </h2>

                <p className="text-sm text-gray-500">
                  Pilih invoice untuk melihat detail dan dokumen.
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari invoice atau pasien..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-237.5 text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Invoice
                    </th>

                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Pasien
                    </th>

                    <th className="px-5 py-3 font-semibold text-gray-600">
                      Pelayanan
                    </th>

                    <th className="px-5 py-3 text-right font-semibold text-gray-600">
                      Gross
                    </th>

                    <th className="px-5 py-3 text-right font-semibold text-gray-600">
                      Adjustment
                    </th>

                    <th className="px-5 py-3 text-right font-semibold text-gray-600">
                      Patient Due
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
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {invoice.invoiceNumber}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {invoice.date}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-800">
                          {invoice.patient}
                        </p>

                        <p className="text-xs text-gray-500">
                          {invoice.medicalRecord}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {invoice.service}
                      </td>

                      <td className="px-5 py-4 text-right">
                        Rp {invoice.gross.toLocaleString("id-ID")}
                      </td>

                      <td className="px-5 py-4 text-right text-red-600">
                        {invoice.adjustment > 0
                          ? `- Rp ${invoice.adjustment.toLocaleString(
                              "id-ID"
                            )}`
                          : "-"}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-gray-900">
                        Rp {invoice.patientDue.toLocaleString("id-ID")}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                            invoice.status
                          )}`}
                        >
                          {invoice.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedInvoice(invoice)}
                          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <Eye size={16} />
                          Lihat
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

      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Detail Invoice
                </h2>

                <p className="text-sm text-gray-500">
                  {selectedInvoice.invoiceNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-start justify-between border-b border-gray-200 pb-5">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      RUMAH SAKIT DUNIA INDAH
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Invoice & Kuitansi Pembayaran
                    </p>
                  </div>

                  <FileText
                    size={35}
                    className="text-teal-600"
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-xs text-gray-500">
                      Nomor Invoice
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedInvoice.invoiceNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Tanggal
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedInvoice.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Pasien
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedInvoice.patient}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      No. RM
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedInvoice.medicalRecord}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-5">
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-600">
                      Total Bruto
                    </span>

                    <span className="font-medium">
                      Rp{" "}
                      {selectedInvoice.gross.toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-gray-600">
                      Adjustment
                    </span>

                    <span className="font-medium text-red-600">
                      - Rp{" "}
                      {selectedInvoice.adjustment.toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between border-t border-gray-200 pt-4">
                    <span className="font-semibold text-gray-900">
                      Patient Due
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      Rp{" "}
                      {selectedInvoice.patientDue.toLocaleString(
                        "id-ID"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Printer size={17} />
                  Cetak Invoice
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Download size={17} />
                  Download PDF
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
                >
                  <Receipt size={17} />
                  Lihat Kuitansi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}