"use client";

import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Download,
  Printer,
  CalendarDays,
  Receipt,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type BillingReport = {
  id: number;
  date: string;
  invoiceNumber: string;
  patientName: string;
  mrNumber: string;
  payer: string;
  grossAmount: number;
  adjustment: number;
  patientDue: number;
  insurerDue: number;
  patientPaid: number;
  insurerPaid: number;
  outstanding: number;
  status: "CLOSED" | "OUTSTANDING";
};

const reports: BillingReport[] = [
  {
    id: 1,
    date: "15 Sep 2026",
    invoiceNumber: "INV-2026-00124",
    patientName: "Siti Aminah",
    mrNumber: "RM-2026-00124",
    payer: "BPJS Kesehatan",
    grossAmount: 1850000,
    adjustment: 250000,
    patientDue: 300000,
    insurerDue: 1300000,
    patientPaid: 300000,
    insurerPaid: 1300000,
    outstanding: 0,
    status: "CLOSED",
  },
  {
    id: 2,
    date: "15 Sep 2026",
    invoiceNumber: "INV-2026-00118",
    patientName: "Budi Santoso",
    mrNumber: "RM-2026-00118",
    payer: "PT Sehat Insurance",
    grossAmount: 3250000,
    adjustment: 0,
    patientDue: 500000,
    insurerDue: 2600000,
    patientPaid: 500000,
    insurerPaid: 2600000,
    outstanding: 0,
    status: "CLOSED",
  },
  {
    id: 3,
    date: "14 Sep 2026",
    invoiceNumber: "INV-2026-00097",
    patientName: "Andi Wijaya",
    mrNumber: "RM-2026-00097",
    payer: "PT Maju Bersama",
    grossAmount: 2100000,
    adjustment: 0,
    patientDue: 400000,
    insurerDue: 1700000,
    patientPaid: 200000,
    insurerPaid: 0,
    outstanding: 1900000,
    status: "OUTSTANDING",
  },
  {
    id: 4,
    date: "14 Sep 2026",
    invoiceNumber: "INV-2026-00088",
    patientName: "Dewi Lestari",
    mrNumber: "RM-2026-00088",
    payer: "BPJS Kesehatan",
    grossAmount: 950000,
    adjustment: 0,
    patientDue: 200000,
    insurerDue: 750000,
    patientPaid: 200000,
    insurerPaid: 750000,
    outstanding: 0,
    status: "CLOSED",
  },
  {
    id: 5,
    date: "13 Sep 2026",
    invoiceNumber: "INV-2026-00071",
    patientName: "Rina Kartika",
    mrNumber: "RM-2026-00071",
    payer: "BPJS Kesehatan",
    grossAmount: 1750000,
    adjustment: 0,
    patientDue: 250000,
    insurerDue: 1500000,
    patientPaid: 250000,
    insurerPaid: 1000000,
    outstanding: 500000,
    status: "OUTSTANDING",
  },
  {
    id: 6,
    date: "12 Sep 2026",
    invoiceNumber: "INV-2026-00064",
    patientName: "Agus Pratama",
    mrNumber: "RM-2026-00064",
    payer: "PT Sehat Insurance",
    grossAmount: 3100000,
    adjustment: 150000,
    patientDue: 500000,
    insurerDue: 2450000,
    patientPaid: 500000,
    insurerPaid: 2450000,
    outstanding: 0,
    status: "CLOSED",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LaporanBillingPage() {
  const [search, setSearch] = useState("");

  const [period, setPeriod] = useState(
    "September 2026",
  );

  const filteredReports = useMemo(() => {
    const keyword = search.toLowerCase();

    return reports.filter(
      (report) =>
        report.patientName.toLowerCase().includes(keyword) ||
        report.mrNumber.toLowerCase().includes(keyword) ||
        report.invoiceNumber.toLowerCase().includes(keyword) ||
        report.payer.toLowerCase().includes(keyword),
    );
  }, [search]);

  const totalGross = reports.reduce(
    (total, report) => total + report.grossAmount,
    0,
  );

  const totalAdjustment = reports.reduce(
    (total, report) => total + report.adjustment,
    0,
  );

  const totalPatientPaid = reports.reduce(
    (total, report) => total + report.patientPaid,
    0,
  );

  const totalInsurerPaid = reports.reduce(
    (total, report) => total + report.insurerPaid,
    0,
  );

  const totalOutstanding = reports.reduce(
    (total, report) => total + report.outstanding,
    0,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Laporan Billing
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Monitoring ringkasan tagihan, pembayaran,
                piutang, dan status penyelesaian billing.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Printer size={16} />
                Cetak
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Gross Billing
                </p>

                <Receipt
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {formatCurrency(totalGross)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Adjustment
                </p>

                <FileText
                  size={21}
                  className="text-orange-600"
                />
              </div>

              <p className="mt-2 text-xl font-bold text-orange-600">
                {formatCurrency(totalAdjustment)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Pembayaran Pasien
                </p>

                <WalletCards
                  size={21}
                  className="text-green-600"
                />
              </div>

              <p className="mt-2 text-xl font-bold text-green-600">
                {formatCurrency(totalPatientPaid)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Pembayaran Penjamin
                </p>

                <ShieldCheck
                  size={21}
                  className="text-blue-600"
                />
              </div>

              <p className="mt-2 text-xl font-bold text-blue-600">
                {formatCurrency(totalInsurerPaid)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Outstanding
                </p>

                <FileText
                  size={21}
                  className="text-red-600"
                />
              </div>

              <p className="mt-2 text-xl font-bold text-red-600">
                {formatCurrency(totalOutstanding)}
              </p>
            </div>
          </div>

          <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="w-full max-w-md">
                <label className="mb-2 block text-xs font-semibold text-gray-500">
                  Cari Data
                </label>

                <div className="relative">
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
                    placeholder="Cari pasien, No. RM, invoice..."
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="w-full lg:w-56">
                <label className="mb-2 block text-xs font-semibold text-gray-500">
                  Periode
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    value={period}
                    onChange={(event) =>
                      setPeriod(event.target.value)
                    }
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option>September 2026</option>
                    <option>Agustus 2026</option>
                    <option>Juli 2026</option>
                    <option>Juni 2026</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Rekap Billing
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Periode {period}
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                {filteredReports.length} transaksi
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-312.5 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-4">
                      Tanggal
                    </th>

                    <th className="px-5 py-4">
                      Invoice
                    </th>

                    <th className="px-5 py-4">
                      Pasien
                    </th>

                    <th className="px-5 py-4">
                      Payer
                    </th>

                    <th className="px-5 py-4 text-right">
                      Gross
                    </th>

                    <th className="px-5 py-4 text-right">
                      Adjustment
                    </th>

                    <th className="px-5 py-4 text-right">
                      Patient Paid
                    </th>

                    <th className="px-5 py-4 text-right">
                      Insurer Paid
                    </th>

                    <th className="px-5 py-4 text-right">
                      Outstanding
                    </th>

                    <th className="px-5 py-4">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 text-gray-600">
                        {report.date}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-mono text-xs font-semibold text-gray-900">
                          {report.invoiceNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {report.patientName}
                        </p>

                        <p className="font-mono text-xs text-gray-500">
                          {report.mrNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-gray-700">
                        {report.payer}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold">
                        {formatCurrency(
                          report.grossAmount,
                        )}
                      </td>

                      <td className="px-5 py-4 text-right text-orange-600">
                        {formatCurrency(
                          report.adjustment,
                        )}
                      </td>

                      <td className="px-5 py-4 text-right text-green-600">
                        {formatCurrency(
                          report.patientPaid,
                        )}
                      </td>

                      <td className="px-5 py-4 text-right text-blue-600">
                        {formatCurrency(
                          report.insurerPaid,
                        )}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-red-600">
                        {formatCurrency(
                          report.outstanding,
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            report.status === "CLOSED"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {filteredReports.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        Data laporan tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>

                <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-4 font-semibold text-gray-900"
                    >
                      TOTAL
                    </td>

                    <td className="px-5 py-4 text-right font-bold">
                      {formatCurrency(totalGross)}
                    </td>

                    <td className="px-5 py-4 text-right font-bold text-orange-600">
                      {formatCurrency(totalAdjustment)}
                    </td>

                    <td className="px-5 py-4 text-right font-bold text-green-600">
                      {formatCurrency(totalPatientPaid)}
                    </td>

                    <td className="px-5 py-4 text-right font-bold text-blue-600">
                      {formatCurrency(totalInsurerPaid)}
                    </td>

                    <td className="px-5 py-4 text-right font-bold text-red-600">
                      {formatCurrency(totalOutstanding)}
                    </td>

                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}