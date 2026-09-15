"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  CheckCircle2,
  Clock3,
  Receipt,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type PaymentPatient = {
  id: number;
  name: string;
  medicalRecord: string;
  invoiceNumber: string;
  patientDue: number;
  paid: number;
};

const initialPatients: PaymentPatient[] = [
  {
    id: 1,
    name: "Siti Rahma",
    medicalRecord: "RM-001246",
    invoiceNumber: "INV-20260915-002",
    patientDue: 650000,
    paid: 0,
  },
  {
    id: 2,
    name: "Budi Santoso",
    medicalRecord: "RM-001247",
    invoiceNumber: "INV-20260914-018",
    patientDue: 1250000,
    paid: 1250000,
  },
  {
    id: 3,
    name: "Maria Lestari",
    medicalRecord: "RM-001248",
    invoiceNumber: "INV-20260913-009",
    patientDue: 4750000,
    paid: 3000000,
  },
];

export default function PaymentPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(1);
  const [method, setMethod] = useState("Cash");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const selectedPatient = patients.find(
    (patient) => patient.id === selectedId
  );

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const keyword = search.toLowerCase();

      return (
        patient.name.toLowerCase().includes(keyword) ||
        patient.medicalRecord.toLowerCase().includes(keyword) ||
        patient.invoiceNumber.toLowerCase().includes(keyword)
      );
    });
  }, [patients, search]);

  const remaining = selectedPatient
    ? Math.max(selectedPatient.patientDue - selectedPatient.paid, 0)
    : 0;

  const paymentAmount = Number(amount) || 0;

  const change = Math.max(paymentAmount - remaining, 0);

  const handlePostPayment = () => {
    if (!selectedPatient || paymentAmount <= 0) return;

    setPatients((current) =>
      current.map((patient) => {
        if (patient.id !== selectedPatient.id) return patient;

        return {
          ...patient,
          paid: Math.min(
            patient.patientDue,
            patient.paid + paymentAmount
          ),
        };
      })
    );

    setAmount("");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Payment
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Catat pembayaran pasien dan cek status pelunasan.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 p-5">
                <h2 className="font-semibold text-gray-900">
                  Daftar Tagihan
                </h2>

                <div className="relative mt-4">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari pasien..."
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {filteredPatients.map((patient) => {
                  const outstanding = Math.max(
                    patient.patientDue - patient.paid,
                    0
                  );

                  return (
                    <button
                      key={patient.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(patient.id);
                        setSuccess(false);
                      }}
                      className={`w-full p-4 text-left transition ${
                        selectedId === patient.id
                          ? "bg-teal-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {patient.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {patient.medicalRecord}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {patient.invoiceNumber}
                          </p>
                        </div>

                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                            outstanding === 0
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {outstanding === 0 ? "LUNAS" : "BELUM LUNAS"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedPatient && (
              <div className="space-y-6">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Pasien</p>
                      <h2 className="mt-1 text-xl font-bold text-gray-900">
                        {selectedPatient.name}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {selectedPatient.medicalRecord} ·{" "}
                        {selectedPatient.invoiceNumber}
                      </p>
                    </div>

                    <div
                      className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        remaining === 0
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {remaining === 0 ? "PAID" : "OUTSTANDING"}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <p className="text-xs text-gray-500">
                        Patient Due
                      </p>
                      <p className="mt-1 text-lg font-bold text-gray-900">
                        Rp{" "}
                        {selectedPatient.patientDue.toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-green-50 p-4">
                      <p className="text-xs text-green-700">
                        Sudah Dibayar
                      </p>
                      <p className="mt-1 text-lg font-bold text-green-700">
                        Rp{" "}
                        {selectedPatient.paid.toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-yellow-50 p-4">
                      <p className="text-xs text-yellow-700">
                        Outstanding
                      </p>
                      <p className="mt-1 text-lg font-bold text-yellow-700">
                        Rp {remaining.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <CreditCard size={20} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-900">
                        Post Payment
                      </h2>

                      <p className="text-sm text-gray-500">
                        Masukkan pembayaran dari pasien / penanggung jawab.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Metode Pembayaran
                      </label>

                      <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                      >
                        <option>Cash</option>
                        <option>Debit</option>
                        <option>Credit Card</option>
                        <option>Transfer Bank</option>
                        <option>QRIS</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Nominal Pembayaran
                      </label>

                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Masukkan nominal"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="mt-5 rounded-lg bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Kembalian
                      </span>

                      <span className="font-semibold text-gray-900">
                        Rp {change.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePostPayment}
                    disabled={remaining === 0 || paymentAmount <= 0}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    <CreditCard size={17} />
                    Post Payment
                  </button>

                  {success && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                      <CheckCircle2 size={17} />
                      Pembayaran berhasil dicatat.
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <Clock3 size={18} className="text-gray-500" />

                    <div>
                      <p className="font-semibold text-gray-900">
                        Status Pembayaran
                      </p>

                      <p className="text-sm text-gray-500">
                        Sistem akan menentukan PAID atau
                        PARTIAL/OUTSTANDING berdasarkan pembayaran.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}