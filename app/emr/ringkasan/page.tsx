"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Download,
  FileText,
  User,
  CalendarDays,
  Stethoscope,
  Activity,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

type EMRSummary = {
  noRM: string;
  nama: string;
  jenisKelamin: string;
  tanggalLahir: string;
  tanggalKunjungan: string;
  nomorKunjungan: string;
  unit: string;
  dokter: string;

  subjective: string;
  objective: string;
  assessment: string;
  plan: string;

  diagnosis: string;
  rencanaPelayanan: string;

  status: "COMPLETE" | "NEED_COMPLETION";
};

const emrSummary: EMRSummary = {
  noRM: "RM-001",
  nama: "Budi Santoso",
  jenisKelamin: "Laki-laki",
  tanggalLahir: "12 Mei 1985",
  tanggalKunjungan: "14 September 2026",
  nomorKunjungan: "KJ-20260914-001",
  unit: "Poli Penyakit Dalam",
  dokter: "dr. Andi Wijaya, Sp.PD",

  subjective:
    "Pasien mengeluhkan batuk berdahak sejak 5 hari yang lalu disertai demam dan badan terasa lemas.",

  objective:
    "Kesadaran compos mentis. Suhu 38,1°C. Tekanan darah 125/80 mmHg. Nadi 88 x/menit. Respirasi 20 x/menit.",

  assessment:
    "Pneumonia komunitas berdasarkan hasil pemeriksaan klinis dan penunjang.",

  plan:
    "Terapi sesuai kondisi pasien, observasi perkembangan gejala, edukasi pasien, dan kontrol sesuai jadwal.",

  diagnosis: "J18.9 - Pneumonia, unspecified organism",

  rencanaPelayanan:
    "Pemeriksaan lanjutan, pemberian terapi, edukasi pasien, dan tindak lanjut.",

  status: "COMPLETE",
};

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-teal-600">{icon}</div>

      <h2 className="font-semibold text-gray-800">{title}</h2>
    </div>
  );
}

function SOAPItem({
  label,
  title,
  content,
}: {
  label: string;
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-100 text-sm font-bold text-teal-700">
          {label}
        </span>

        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>

      <p className="text-sm leading-6 text-gray-600">{content}</p>
    </div>
  );
}

export default function RingkasanEMRPage() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert("Fitur Unduh PDF masih dalam tahap mockup.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header Halaman */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
              Kembali ke Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <FileText size={26} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Ringkasan EMR
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Ringkasan rekam medis elektronik pasien
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Printer size={18} />
              Cetak
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <Download size={18} />
              Unduh PDF
            </button>
          </div>
        </div>

        {/* Status EMR */}
        <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2
              size={22}
              className="text-green-600"
            />

            <div>
              <p className="font-semibold text-green-800">
                EMR Lengkap
              </p>

              <p className="text-sm text-green-700">
                Rekam medis ini telah diverifikasi dan berstatus
                COMPLETE.
              </p>
            </div>
          </div>
        </div>

        {/* Informasi Pasien */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <SectionTitle
              icon={<User size={20} />}
              title="Informasi Pasien"
            />
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Nama Pasien
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.nama}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Nomor Rekam Medis
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.noRM}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Jenis Kelamin
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.jenisKelamin}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Tanggal Lahir
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.tanggalLahir}
              </p>
            </div>
          </div>
        </div>

        {/* Informasi Kunjungan */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <SectionTitle
              icon={<CalendarDays size={20} />}
              title="Informasi Kunjungan"
            />
          </div>

          <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Nomor Kunjungan
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.nomorKunjungan}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Tanggal Kunjungan
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.tanggalKunjungan}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Unit Pelayanan
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.unit}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                DPJP
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.dokter}
              </p>
            </div>
          </div>
        </div>

        {/* SOAP */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <SectionTitle
              icon={<Stethoscope size={20} />}
              title="Catatan SOAP"
            />
          </div>

          <div className="grid gap-4 p-6 md:grid-cols-2">
            <SOAPItem
              label="S"
              title="Subjective"
              content={emrSummary.subjective}
            />

            <SOAPItem
              label="O"
              title="Objective"
              content={emrSummary.objective}
            />

            <SOAPItem
              label="A"
              title="Assessment"
              content={emrSummary.assessment}
            />

            <SOAPItem
              label="P"
              title="Plan"
              content={emrSummary.plan}
            />
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <SectionTitle
              icon={<Activity size={20} />}
              title="Diagnosis"
            />
          </div>

          <div className="p-6">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                Diagnosis Utama
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {emrSummary.diagnosis}
              </p>
            </div>
          </div>
        </div>

        {/* Rencana Pelayanan */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <SectionTitle
              icon={<ClipboardList size={20} />}
              title="Rencana Pelayanan / Order"
            />
          </div>

          <div className="p-6">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm leading-6 text-gray-600">
                {emrSummary.rencanaPelayanan}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Informasi */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Status EMR:{" "}
              <span className="font-semibold text-green-600">
                {emrSummary.status}
              </span>
            </p>

            <p>
              Dokumen ini merupakan ringkasan dari rekam medis
              elektronik pasien.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}