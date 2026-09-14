"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ClipboardCheck,
  User,
  Stethoscope,
  CalendarDays,
  FileText,
  Activity,
  ShieldCheck,
  XCircle,
} from "lucide-react";

type VerificationStatus =
  | "MENUNGGU VERIFIKASI"
  | "LENGKAP"
  | "PERLU DILENGKAPI";

type EMRRecord = {
  noRM: string;
  nama: string;
  jenisKelamin: string;
  tanggalLahir: string;
  tanggalKunjungan: string;
  unit: string;
  dokter: string;
  nomorKunjungan: string;
  soap: boolean;
  diagnosis: boolean;
  dpjp: boolean;
  rencana: boolean;
  status: VerificationStatus;
};

const initialRecord: EMRRecord = {
  noRM: "RM-001",
  nama: "Budi Santoso",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "12 Mei 1985",
  tanggalKunjungan: "14 September 2026",
  unit: "Poli Penyakit Dalam",
  dokter: "dr. Andi Wijaya, Sp.PD",
  nomorKunjungan: "KJ-20260914-001",
  soap: true,
  diagnosis: true,
  dpjp: true,
  rencana: true,
  status: "MENUNGGU VERIFIKASI",
};

type ChecklistItemProps = {
  title: string;
  description: string;
  completed: boolean;
  icon: ReactNode;
};

function ChecklistItem({
  title,
  description,
  completed,
  icon,
}: ChecklistItemProps) {
  return (
    <div
      className={`flex items-start gap-4 rounded-xl border p-4 ${
        completed
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          completed
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {completed ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span
            className={
              completed ? "text-green-700" : "text-red-700"
            }
          >
            {icon}
          </span>

          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>

        <p className="mt-1 text-sm text-gray-600">
          {description}
        </p>
      </div>

      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          completed
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {completed ? "Lengkap" : "Belum Lengkap"}
      </span>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: VerificationStatus;
}) {
  if (status === "LENGKAP") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700">
        <CheckCircle2 size={16} />
        Lengkap
      </span>
    );
  }

  if (status === "PERLU DILENGKAPI") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 text-sm font-semibold text-red-700">
        <AlertCircle size={16} />
        Perlu Dilengkapi
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-semibold text-yellow-700">
      <ClipboardCheck size={16} />
      Menunggu Verifikasi
    </span>
  );
}

export default function VerifikasiRekamMedisPage() {
  const [record, setRecord] = useState<EMRRecord>(initialRecord);
  const [message, setMessage] = useState("");

  const isComplete =
    record.soap &&
    record.diagnosis &&
    record.dpjp &&
    record.rencana;

  const handleVerify = () => {
    if (!isComplete) {
      setRecord((prev) => ({
        ...prev,
        status: "PERLU DILENGKAPI",
      }));

      setMessage(
        "EMR belum dapat diverifikasi karena masih terdapat data yang belum lengkap."
      );

      return;
    }

    setRecord((prev) => ({
      ...prev,
      status: "LENGKAP",
    }));

    setMessage(
      "Rekam medis berhasil diverifikasi dan dinyatakan lengkap."
    );
  };

  const handleReset = () => {
    setRecord(initialRecord);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Kembali ke Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Verifikasi Rekam Medis
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Periksa kelengkapan EMR sebelum melakukan verifikasi
              </p>
            </div>
          </div>
        </div>

        {/* Pesan hasil verifikasi */}
        {message && (
          <div
            className={`mb-6 flex items-start gap-3 rounded-xl border p-4 ${
              record.status === "LENGKAP"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {record.status === "LENGKAP" ? (
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0"
              />
            ) : (
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />
            )}

            <div>
              <p className="font-semibold">
                {record.status === "LENGKAP"
                  ? "Verifikasi Berhasil"
                  : "Verifikasi Belum Berhasil"}
              </p>

              <p className="mt-1 text-sm">{message}</p>
            </div>
          </div>
        )}

        {/* Informasi Pasien */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <User size={20} className="text-teal-600" />

              <h2 className="font-semibold text-gray-800">
                Informasi Pasien
              </h2>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Nama Pasien
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.nama}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Nomor Rekam Medis
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.noRM}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Jenis Kelamin
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.jenisKelamin}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Tanggal Lahir
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.tanggalLahir}
              </p>
            </div>
          </div>
        </div>

        {/* Informasi Kunjungan */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={20}
                className="text-teal-600"
              />

              <h2 className="font-semibold text-gray-800">
                Informasi Kunjungan
              </h2>
            </div>
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Nomor Kunjungan
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.nomorKunjungan}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Tanggal Kunjungan
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.tanggalKunjungan}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Unit Pelayanan
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.unit}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                DPJP
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {record.dokter}
              </p>
            </div>
          </div>
        </div>

        {/* Status Verifikasi */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-gray-500">
                Status Verifikasi Saat Ini
              </p>

              <div className="mt-2">
                <StatusBadge status={record.status} />
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm text-gray-500">
                Kelengkapan Dokumen
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-800">
                {[
                  record.soap,
                  record.diagnosis,
                  record.dpjp,
                  record.rencana,
                ].filter(Boolean).length}
                /4
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck
                size={20}
                className="text-teal-600"
              />

              <div>
                <h2 className="font-semibold text-gray-800">
                  Checklist Kelengkapan EMR
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Pastikan seluruh komponen rekam medis telah
                  tersedia
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-6">
            <ChecklistItem
              title="SOAP"
              description="Catatan Subjective, Objective, Assessment, dan Plan telah diisi oleh dokter."
              completed={record.soap}
              icon={<FileText size={16} />}
            />

            <ChecklistItem
              title="Diagnosis"
              description="Diagnosis pasien telah dicatat dan dilengkapi sesuai kebutuhan."
              completed={record.diagnosis}
              icon={<Activity size={16} />}
            />

            <ChecklistItem
              title="DPJP"
              description="Dokter Penanggung Jawab Pelayanan telah tercatat."
              completed={record.dpjp}
              icon={<Stethoscope size={16} />}
            />

            <ChecklistItem
              title="Rencana Pelayanan / Order"
              description="Rencana pelayanan dan order yang diperlukan telah diisi."
              completed={record.rencana}
              icon={<ClipboardCheck size={16} />}
            />
          </div>
        </div>

        {/* Kesimpulan */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="font-semibold text-gray-800">
              Kesimpulan Verifikasi
            </h2>
          </div>

          <div className="p-6">
            {isComplete ? (
              <div className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-4">
                <CheckCircle2
                  size={24}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>
                  <p className="font-semibold text-green-800">
                    Rekam medis telah lengkap
                  </p>

                  <p className="mt-1 text-sm text-green-700">
                    Seluruh komponen EMR yang diperiksa telah
                    tersedia dan rekam medis dapat diverifikasi
                    sebagai lengkap.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertCircle
                  size={24}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <div>
                  <p className="font-semibold text-red-800">
                    Rekam medis belum lengkap
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    Masih terdapat komponen EMR yang belum
                    tersedia. Rekam medis perlu dilengkapi sebelum
                    dapat dinyatakan lengkap.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          {record.status !== "MENUNGGU VERIFIKASI" && (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Reset Status
            </button>
          )}

          {record.status === "MENUNGGU VERIFIKASI" && (
            <button
              type="button"
              onClick={handleVerify}
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${
                isComplete
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isComplete ? (
                <>
                  <ShieldCheck size={18} />
                  Verifikasi Lengkap
                </>
              ) : (
                <>
                  <AlertCircle size={18} />
                  Tandai Perlu Dilengkapi
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}