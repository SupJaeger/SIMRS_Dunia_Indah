"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type Diagnosis = {
  id: number;
  code: string;
  name: string;
  type: "Primer" | "Sekunder";
};

const dummyDiagnoses: Diagnosis[] = [
  {
    id: 1,
    code: "J06.9",
    name: "Acute upper respiratory infection, unspecified",
    type: "Primer",
  },
];

const icd10Options = [
  {
    code: "J06.9",
    name: "Acute upper respiratory infection, unspecified",
  },
  {
    code: "R50.9",
    name: "Fever, unspecified",
  },
  {
    code: "R05.9",
    name: "Cough, unspecified",
  },
  {
    code: "J18.9",
    name: "Pneumonia, unspecified organism",
  },
];

export default function DiagnosisPage() {
  const [search, setSearch] = useState("");
  const [diagnoses, setDiagnoses] =
    useState<Diagnosis[]>(dummyDiagnoses);

  const filteredOptions = icd10Options.filter(
    (item) =>
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const addDiagnosis = (code: string, name: string) => {
    const alreadyExists = diagnoses.some(
      (item) => item.code === code
    );

    if (alreadyExists) return;

    setDiagnoses([
      ...diagnoses,
      {
        id: Date.now(),
        code,
        name,
        type: "Sekunder",
      },
    ]);

    setSearch("");
  };

  const removeDiagnosis = (id: number) => {
    setDiagnoses(
      diagnoses.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
            <Link
              href="/pemeriksaan"
              className="hover:text-teal-600"
            >
              Pemeriksaan Pasien
            </Link>

            <span>/</span>

            <span className="text-gray-700">
              Diagnosis ICD-10
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Diagnosis ICD-10
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Tentukan diagnosis pasien berdasarkan hasil pemeriksaan.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={17} />
          Kembali
        </Link>
      </div>

      {/* Patient Information */}
      <section className="mb-6 rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="font-semibold text-gray-900">
            Informasi Pasien
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 px-6 py-5 md:grid-cols-4">
          <div>
            <p className="text-xs text-gray-500">Nama Pasien</p>
            <p className="mt-1 font-medium text-gray-900">
              Budi Santoso
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">No. Rekam Medis</p>
            <p className="mt-1 font-medium text-gray-900">
              RM-2026-00125
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Tanggal Lahir</p>
            <p className="mt-1 font-medium text-gray-900">
              12 Januari 1985
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">No. Kunjungan</p>
            <p className="mt-1 font-medium text-gray-900">
              VIS-2026-00981
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Alergi:
            </span>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              Tidak ada alergi tercatat
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Examination Summary */}
        <section className="rounded-xl border border-gray-200 bg-white lg:col-span-1">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-900">
              Ringkasan Pemeriksaan
            </h2>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Keluhan Utama
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                Demam dan batuk sejak 3 hari yang lalu.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Subjective
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-700">
                Pasien mengeluhkan demam disertai batuk dan badan
                terasa lemas.
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Objective
              </p>

              <div className="mt-2 space-y-2 text-sm text-gray-700">
                <p>Tekanan Darah: 120/80 mmHg</p>
                <p>Nadi: 88 x/menit</p>
                <p>Suhu: 38.2°C</p>
                <p>SpO₂: 98%</p>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnosis */}
        <section className="rounded-xl border border-gray-200 bg-white lg:col-span-2">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="font-semibold text-gray-900">
              Diagnosis Pasien
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Pilih diagnosis primer dan diagnosis sekunder
              menggunakan kode ICD-10.
            </p>
          </div>

          {/* Search */}
          <div className="border-b border-gray-100 p-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cari ICD-10
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kode atau nama diagnosis..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            {search && (
              <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() =>
                        addDiagnosis(item.code, item.name)
                      }
                      className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {item.code}
                        </p>

                        <p className="text-xs text-gray-500">
                          {item.name}
                        </p>
                      </div>

                      <Plus
                        size={18}
                        className="text-teal-600"
                      />
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-500">
                    Diagnosis tidak ditemukan.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Diagnosis List */}
          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">
                Diagnosis Terpilih
              </h3>

              <span className="text-xs text-gray-500">
                {diagnoses.length} diagnosis
              </span>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200">
              {diagnoses.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-100 px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {item.type === "Primer" ? (
                        <CheckCircle2
                          size={18}
                          className="text-teal-600"
                        />
                      ) : (
                        <AlertCircle
                          size={18}
                          className="text-gray-400"
                        />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {item.code}
                        </span>

                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                            item.type === "Primer"
                              ? "bg-teal-50 text-teal-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-gray-600">
                        {item.name}
                      </p>
                    </div>
                  </div>

                  {item.type === "Sekunder" && (
                    <button
                      type="button"
                      onClick={() => removeDiagnosis(item.id)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Hapus diagnosis"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Validation */}
          <div className="mx-6 mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-4">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={19}
                className="mt-0.5 text-green-600"
              />

              <div>
                <p className="text-sm font-semibold text-green-800">
                  Diagnosis siap divalidasi
                </p>

                <p className="mt-1 text-xs text-green-700">
                  Diagnosis primer telah dipilih. Pastikan diagnosis
                  sesuai dengan hasil pemeriksaan sebelum melanjutkan.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            <button
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Simpan Draft
            </button>

            <Link
              href="/emr/order"
              className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
            >
              Lanjut ke Rencana Pelayanan
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}