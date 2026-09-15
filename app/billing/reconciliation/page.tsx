"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Clock3,
  X,
  Lock,
  WalletCards,
  ShieldCheck,
  FileText,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type ReconciliationStatus =
  | "SIAP CLOSE"
  | "BELUM LUNAS"
  | "PIUTANG PENJAMIN"
  | "CLOSED";

type BillingAccount = {
  id: number;
  patientName: string;
  mrNumber: string;
  visitNumber: string;
  invoiceNumber: string;
  payer: string;
  grossAmount: number;
  adjustment: number;
  patientDue: number;
  patientPaid: number;
  insurerDue: number;
  insurerPaid: number;
  outstanding: number;
  status: ReconciliationStatus;
};

const initialAccounts: BillingAccount[] = [
  {
    id: 1,
    patientName: "Siti Aminah",
    mrNumber: "RM-2026-00124",
    visitNumber: "KJ-2026-09015",
    invoiceNumber: "INV-2026-00124",
    payer: "BPJS Kesehatan",
    grossAmount: 1850000,
    adjustment: 250000,
    patientDue: 300000,
    patientPaid: 300000,
    insurerDue: 1300000,
    insurerPaid: 1300000,
    outstanding: 0,
    status: "SIAP CLOSE",
  },
  {
    id: 2,
    patientName: "Budi Santoso",
    mrNumber: "RM-2026-00118",
    visitNumber: "KJ-2026-09009",
    invoiceNumber: "INV-2026-00118",
    payer: "PT Sehat Insurance",
    grossAmount: 3250000,
    adjustment: 0,
    patientDue: 500000,
    patientPaid: 500000,
    insurerDue: 2600000,
    insurerPaid: 2600000,
    outstanding: 0,
    status: "SIAP CLOSE",
  },
  {
    id: 3,
    patientName: "Andi Wijaya",
    mrNumber: "RM-2026-00097",
    visitNumber: "KJ-2026-08982",
    invoiceNumber: "INV-2026-00097",
    payer: "PT Maju Bersama",
    grossAmount: 2100000,
    adjustment: 0,
    patientDue: 400000,
    patientPaid: 200000,
    insurerDue: 1700000,
    insurerPaid: 0,
    outstanding: 1900000,
    status: "BELUM LUNAS",
  },
  {
    id: 4,
    patientName: "Dewi Lestari",
    mrNumber: "RM-2026-00088",
    visitNumber: "KJ-2026-08970",
    invoiceNumber: "INV-2026-00088",
    payer: "BPJS Kesehatan",
    grossAmount: 950000,
    adjustment: 0,
    patientDue: 200000,
    patientPaid: 200000,
    insurerDue: 750000,
    insurerPaid: 750000,
    outstanding: 0,
    status: "CLOSED",
  },
  {
    id: 5,
    patientName: "Rina Kartika",
    mrNumber: "RM-2026-00071",
    visitNumber: "KJ-2026-08955",
    invoiceNumber: "INV-2026-00071",
    payer: "BPJS Kesehatan",
    grossAmount: 1750000,
    adjustment: 0,
    patientDue: 250000,
    patientPaid: 250000,
    insurerDue: 1500000,
    insurerPaid: 1000000,
    outstanding: 500000,
    status: "PIUTANG PENJAMIN",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusClass(status: ReconciliationStatus) {
  switch (status) {
    case "SIAP CLOSE":
      return "bg-green-100 text-green-700";
    case "CLOSED":
      return "bg-blue-100 text-blue-700";
    case "BELUM LUNAS":
      return "bg-yellow-100 text-yellow-700";
    case "PIUTANG PENJAMIN":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function ReconciliationPage() {
  const [accounts, setAccounts] =
    useState(initialAccounts);

  const [search, setSearch] = useState("");

  const [selectedAccount, setSelectedAccount] =
    useState<BillingAccount | null>(null);

  const filteredAccounts = useMemo(() => {
    const keyword = search.toLowerCase();

    return accounts.filter(
      (account) =>
        account.patientName.toLowerCase().includes(keyword) ||
        account.mrNumber.toLowerCase().includes(keyword) ||
        account.invoiceNumber.toLowerCase().includes(keyword) ||
        account.visitNumber.toLowerCase().includes(keyword) ||
        account.payer.toLowerCase().includes(keyword),
    );
  }, [accounts, search]);

  const closeBilling = () => {
    if (
      !selectedAccount ||
      selectedAccount.status !== "SIAP CLOSE"
    ) {
      return;
    }

    const updatedAccount = {
      ...selectedAccount,
      status: "CLOSED" as ReconciliationStatus,
    };

    setAccounts((current) =>
      current.map((account) =>
        account.id === updatedAccount.id
          ? updatedAccount
          : account,
      ),
    );

    setSelectedAccount(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Reconciliation & Close
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Verifikasi saldo pasien dan penjamin sebelum
              menutup akun billing.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Siap Close
                </p>

                <CheckCircle2
                  size={22}
                  className="text-green-600"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {
                  accounts.filter(
                    (account) =>
                      account.status === "SIAP CLOSE",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Belum Lunas
                </p>

                <Clock3
                  size={22}
                  className="text-yellow-600"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-yellow-600">
                {
                  accounts.filter(
                    (account) =>
                      account.status === "BELUM LUNAS",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Piutang Penjamin
                </p>

                <ShieldCheck
                  size={22}
                  className="text-orange-600"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-orange-600">
                {
                  accounts.filter(
                    (account) =>
                      account.status ===
                      "PIUTANG PENJAMIN",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Closed
                </p>

                <Lock
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {
                  accounts.filter(
                    (account) =>
                      account.status === "CLOSED",
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
                  placeholder="Cari pasien, No. RM, invoice..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-300 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-4">
                      Pasien
                    </th>

                    <th className="px-5 py-4">
                      Invoice
                    </th>

                    <th className="px-5 py-4 text-right">
                      Gross
                    </th>

                    <th className="px-5 py-4 text-right">
                      Patient Due
                    </th>

                    <th className="px-5 py-4 text-right">
                      Patient Paid
                    </th>

                    <th className="px-5 py-4 text-right">
                      Insurer Due
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

                    <th className="px-5 py-4 text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredAccounts.map((account) => (
                    <tr
                      key={account.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {account.patientName}
                        </p>

                        <p className="font-mono text-xs text-gray-500">
                          {account.mrNumber}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-mono text-xs font-semibold">
                          {account.invoiceNumber}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {account.payer}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-right font-semibold">
                        {formatCurrency(account.grossAmount)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {formatCurrency(account.patientDue)}
                      </td>

                      <td className="px-5 py-4 text-right text-green-600">
                        {formatCurrency(account.patientPaid)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        {formatCurrency(account.insurerDue)}
                      </td>

                      <td className="px-5 py-4 text-right text-green-600">
                        {formatCurrency(account.insurerPaid)}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-red-600">
                        {formatCurrency(account.outstanding)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            account.status,
                          )}`}
                        >
                          {account.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedAccount(account)
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredAccounts.length === 0 && (
                    <tr>
                      <td
                        colSpan={10}
                        className="px-5 py-10 text-center text-sm text-gray-500"
                      >
                        Data billing tidak ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Reconciliation Billing
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedAccount.patientName} ·{" "}
                  {selectedAccount.invoiceNumber}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedAccount(null)
                }
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <WalletCards
                    size={18}
                    className="text-blue-600"
                  />

                  <h3 className="font-semibold">
                    Saldo Pasien
                  </h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Patient Due
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(
                        selectedAccount.patientDue,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Patient Paid
                    </span>

                    <span className="font-semibold text-green-600">
                      {formatCurrency(
                        selectedAccount.patientPaid,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <ShieldCheck
                    size={18}
                    className="text-blue-600"
                  />

                  <h3 className="font-semibold">
                    Saldo Penjamin
                  </h3>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Insurer Due
                    </span>

                    <span className="font-semibold">
                      {formatCurrency(
                        selectedAccount.insurerDue,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Insurer Paid
                    </span>

                    <span className="font-semibold text-green-600">
                      {formatCurrency(
                        selectedAccount.insurerPaid,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-5">
              <div className="rounded-xl border border-gray-200">
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center gap-2">
                    <Receipt
                      size={18}
                      className="text-blue-600"
                    />

                    <h3 className="font-semibold">
                      Ringkasan Billing
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Gross Amount
                    </span>

                    <span>
                      {formatCurrency(
                        selectedAccount.grossAmount,
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Adjustment
                    </span>

                    <span className="text-red-600">
                      -
                      {formatCurrency(
                        selectedAccount.adjustment,
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Outstanding</span>

                      <span className="text-red-600">
                        {formatCurrency(
                          selectedAccount.outstanding,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedAccount.outstanding > 0 ? (
                <div className="mt-4 flex gap-3 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-yellow-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-yellow-800">
                      Billing belum dapat ditutup
                    </p>

                    <p className="mt-1 text-xs text-yellow-700">
                      Masih terdapat outstanding sebesar{" "}
                      {formatCurrency(
                        selectedAccount.outstanding,
                      )}
                      .
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Rekonsiliasi selesai
                    </p>

                    <p className="mt-1 text-xs text-green-700">
                      Saldo pasien dan penjamin telah
                      diselesaikan. Akun siap ditutup.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 p-5">
              <button
                type="button"
                onClick={() =>
                  setSelectedAccount(null)
                }
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-white"
              >
                Tutup
              </button>

              <button
                type="button"
                onClick={closeBilling}
                disabled={
                  selectedAccount.status !== "SIAP CLOSE"
                }
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Lock size={16} />
                Close Billing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}