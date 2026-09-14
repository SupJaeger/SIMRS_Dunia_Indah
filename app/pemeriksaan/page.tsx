"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  CalendarDays,
  Check,
  ClipboardList,
  FileText,
  HeartPulse,
  Pill,
  Save,
  Stethoscope,
  User,
} from "lucide-react";

import { useRole } from "../Context/RoleContext";
import { useRouter } from "next/navigation";

type Step = "asesmen" | "soap" | "diagnosis" | "rencana";

export default function PemeriksaanPage() {
    const router = useRouter();
  // =========================================
  // ROLE DARI ROLE CONTEXT
  // =========================================

  const { role } = useRole();

  // =========================================
  // STATE STEP
  // =========================================

  const [activeStep, setActiveStep] = useState<Step>("asesmen");

  // =========================================
  // DATA PASIEN DUMMY
  // =========================================

  const patient = {
    name: "Andi Pratama",
    medicalRecordNumber: "RM-2026-00125",
    age: 45,
    gender: "Laki-laki",
    visitNumber: "KJ-2026-00981",
    date: "14 September 2026",
    status: "Dalam Pemeriksaan",
    allergy: "Tidak ada",
    complaint: "Demam sejak 2 hari yang lalu disertai batuk.",
  };

  // =========================================
  // STATE ASESMEN
  // =========================================

  const [temperature, setTemperature] = useState("38.2");
  const [bloodPressure, setBloodPressure] = useState("130/85");
  const [heartRate, setHeartRate] = useState("88");
  const [respiratoryRate, setRespiratoryRate] = useState("20");
  const [oxygenSaturation, setOxygenSaturation] = useState("97");

  const [initialComplaint, setInitialComplaint] = useState(
    patient.complaint
  );

  const [allergy, setAllergy] = useState(patient.allergy);

  // =========================================
  // STATE SOAP
  // =========================================

  const [subjective, setSubjective] = useState(
    "Pasien mengeluhkan demam sejak 2 hari yang lalu. Demam dirasakan terutama pada malam hari. Disertai batuk dan badan terasa lemas."
  );

  const [objective, setObjective] = useState(
    "Keadaan umum cukup. Kesadaran compos mentis. Suhu 38.2°C, tekanan darah 130/85 mmHg, nadi 88 x/menit, RR 20 x/menit, SpO₂ 97%."
  );

  const [assessment, setAssessment] = useState(
    "Demam dengan kemungkinan infeksi saluran pernapasan."
  );

  const [plan, setPlan] = useState(
    "Observasi kondisi pasien, terapi simptomatik, edukasi istirahat dan konsumsi cairan yang cukup."
  );

  // =========================================
  // STATE DIAGNOSIS
  // =========================================

  const [primaryDiagnosis, setPrimaryDiagnosis] = useState(
    "J06.9 - Infeksi Saluran Pernapasan Akut, tidak spesifik"
  );

  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState("");

  // =========================================
  // STATE RENCANA
  // =========================================

  const [actionPlan, setActionPlan] = useState(
    "Observasi tanda vital dan kondisi umum pasien."
  );

  const [prescription, setPrescription] = useState(
    "Paracetamol 500 mg — 3x1 tablet setelah makan."
  );

  const [labOrder, setLabOrder] = useState("");

  const [radiologyOrder, setRadiologyOrder] = useState("");

  const [referral, setReferral] = useState("");

  // =========================================
  // ROLE PERMISSIONS
  // =========================================

  const isDoctor = role === "dokter" || role === "admin";

  const isNurse =
    role === "perawat" || role === "admin";

  const isMedicalRecord =
    role === "rekam_medis" || role === "admin";

  const canAccess =
    role === "dokter" ||
    role === "perawat" ||
    role === "rekam_medis" ||
    role === "admin";

  // =========================================
  // STEP CONFIGURATION
  // =========================================

  const steps = [
    {
      id: "asesmen" as Step,
      number: 1,
      title: "Asesmen",
      icon: Activity,
      available: true,
    },
    {
      id: "soap" as Step,
      number: 2,
      title: "SOAP",
      icon: FileText,
      available: isDoctor || isMedicalRecord,
    },
    {
      id: "diagnosis" as Step,
      number: 3,
      title: "Diagnosis",
      icon: ClipboardList,
      available: isDoctor || isMedicalRecord,
    },
    {
      id: "rencana" as Step,
      number: 4,
      title: "Rencana Pelayanan",
      icon: Stethoscope,
      available: isDoctor || isMedicalRecord,
    },
  ];

  // =========================================
  // HANDLER
  // =========================================

  const handleSave = () => {
    alert("Data berhasil disimpan sebagai draft.");
  };

  const handleFinalize = () => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin memfinalisasi EMR pasien ini?"
    );

    if (!confirmed) {
      return;
    }

    alert("EMR berhasil difinalisasi.");
  };

  const handleVerify = () => {
    alert("Kelengkapan EMR berhasil diverifikasi.");
  };

  // =========================================
  // ACCESS DENIED
  // =========================================

  if (!canAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle
              className="text-red-500"
              size={28}
            />
          </div>

          <h1 className="text-xl font-semibold text-gray-900">
            Akses Ditolak
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Role Anda tidak memiliki akses ke halaman
            pemeriksaan pasien.
          </p>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
          >
            <ArrowLeft size={17} />
            Kembali
          </button>
        </div>
      </main>
    );
  }

  // =========================================
  // MAIN PAGE
  // =========================================

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-100"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Pemeriksaan Pasien
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Pemeriksaan dan pengelolaan rekam medis pasien
              </p>
            </div>

          </div>

          {/* ROLE */}

          <div className="rounded-lg border border-gray-200 bg-white px-4 py-2">
            <p className="text-xs text-gray-400">
              Login sebagai
            </p>

            <p className="text-sm font-semibold capitalize text-gray-800">
              {role
                ? role.replace("_", " ")
                : "Tidak diketahui"}
            </p>
          </div>
        </div>

        {/* =====================================
            PATIENT INFORMATION
        ===================================== */}

        <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-5 border-b border-gray-100 p-6 lg:flex-row lg:items-center">

            {/* Patient */}

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                <User
                  className="text-teal-600"
                  size={28}
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {patient.name}
                </h2>

                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">

                  <span>
                    No. RM:{" "}
                    <strong className="font-medium text-gray-700">
                      {patient.medicalRecordNumber}
                    </strong>
                  </span>

                  <span>
                    {patient.age} tahun
                  </span>

                  <span>
                    {patient.gender}
                  </span>

                </div>
              </div>

            </div>

            {/* Status */}

            <span className="w-fit rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-600">
              {patient.status}
            </span>

          </div>

          {/* Detail */}

          <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">

            <InfoItem
              icon={<ClipboardList size={15} />}
              label="No. Kunjungan"
              value={patient.visitNumber}
            />

            <InfoItem
              icon={<CalendarDays size={15} />}
              label="Tanggal Kunjungan"
              value={patient.date}
            />

            <InfoItem
              icon={<AlertCircle size={15} />}
              label="Alergi"
              value={patient.allergy}
              valueClassName="text-green-600"
            />

            <InfoItem
              icon={<HeartPulse size={15} />}
              label="Keluhan Utama"
              value={patient.complaint}
            />

          </div>
        </section>

        {/* =====================================
            STEPPER
        ===================================== */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row md:items-center">

            {steps.map((step, index) => {
              const Icon = step.icon;

              const isActive =
                activeStep === step.id;

              return (
                <div
                  key={step.id}
                  className="flex flex-1 items-center"
                >

                  <button
                    type="button"
                    disabled={!step.available}
                    onClick={() => {
                      if (step.available) {
                        setActiveStep(step.id);
                      }
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                      isActive
                        ? "bg-teal-50"
                        : step.available
                        ? "hover:bg-gray-50"
                        : "cursor-not-allowed opacity-40"
                    }`}
                  >

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        isActive
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Langkah {step.number}
                      </p>

                      <p
                        className={`text-sm font-semibold ${
                          isActive
                            ? "text-teal-700"
                            : "text-gray-700"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>

                  </button>

                  {index !== steps.length - 1 && (
                    <div className="mx-2 hidden h-px flex-1 bg-gray-200 md:block" />
                  )}

                </div>
              );
            })}

          </div>
        </section>

        {/* =====================================
            CONTENT
        ===================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* ===================================
              ASESMEN
          =================================== */}

          {activeStep === "asesmen" && (
            <div>

              <SectionHeader
                title="Asesmen Awal"
                description="Data pemeriksaan awal dan tanda-tanda vital pasien."
              />

              <div className="space-y-8 p-6">

                {/* TTV */}

                <div>

                  <div className="mb-4 flex items-center gap-2">
                    <Activity
                      size={19}
                      className="text-teal-600"
                    />

                    <h3 className="font-semibold text-gray-800">
                      Tanda-Tanda Vital
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">

                    <InputField
                      label="Suhu"
                      unit="°C"
                      value={temperature}
                      onChange={setTemperature}
                      disabled={!isNurse}
                    />

                    <InputField
                      label="Tekanan Darah"
                      unit="mmHg"
                      value={bloodPressure}
                      onChange={setBloodPressure}
                      disabled={!isNurse}
                    />

                    <InputField
                      label="Nadi"
                      unit="x/menit"
                      value={heartRate}
                      onChange={setHeartRate}
                      disabled={!isNurse}
                    />

                    <InputField
                      label="Respirasi"
                      unit="x/menit"
                      value={respiratoryRate}
                      onChange={setRespiratoryRate}
                      disabled={!isNurse}
                    />

                    <InputField
                      label="SpO₂"
                      unit="%"
                      value={oxygenSaturation}
                      onChange={setOxygenSaturation}
                      disabled={!isNurse}
                    />

                  </div>
                </div>

                {/* Keluhan */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Keluhan Utama
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <textarea
                    rows={4}
                    value={initialComplaint}
                    onChange={(e) =>
                      setInitialComplaint(e.target.value)
                    }
                    disabled={!isNurse}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                </div>

                {/* Alergi */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Riwayat Alergi
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={allergy}
                    onChange={(e) =>
                      setAllergy(e.target.value)
                    }
                    disabled={!isNurse}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                </div>

              </div>

              <div className="flex justify-end border-t border-gray-100 p-5">

                {isNurse && (
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    <Save size={17} />
                    Simpan Asesmen
                  </button>
                )}

                {isDoctor && role !== "admin" && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep("soap")
                    }
                    className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    Lanjut ke SOAP
                  </button>
                )}

                {isMedicalRecord && role !== "admin" && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep("soap")
                    }
                    className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    Lihat SOAP
                  </button>
                )}

              </div>
            </div>
          )}

          {/* ===================================
              SOAP
          =================================== */}

          {activeStep === "soap" && (
            <div>

              <SectionHeader
                title="SOAP"
                description="Catatan pemeriksaan dokter berdasarkan kondisi klinis pasien."
              />

              <div className="space-y-6 p-6">

                <TextAreaField
                  label="Subjective (S)"
                  description="Keluhan dan informasi yang disampaikan pasien."
                  value={subjective}
                  onChange={setSubjective}
                  disabled={!isDoctor}
                />

                <TextAreaField
                  label="Objective (O)"
                  description="Hasil pemeriksaan fisik dan data objektif pasien."
                  value={objective}
                  onChange={setObjective}
                  disabled={!isDoctor}
                />

                <TextAreaField
                  label="Assessment (A)"
                  description="Penilaian atau kesimpulan klinis dokter."
                  value={assessment}
                  onChange={setAssessment}
                  disabled={!isDoctor}
                />

                <TextAreaField
                  label="Plan (P)"
                  description="Rencana pelayanan dan tindak lanjut pasien."
                  value={plan}
                  onChange={setPlan}
                  disabled={!isDoctor}
                />

              </div>

              <div className="flex justify-between border-t border-gray-100 p-5">

                <button
                    type="button"
                    onClick={() => setActiveStep("asesmen")}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <ArrowLeft size={17} />
                    Kembali
                </button>

                <div className="flex gap-3">

                  {isDoctor && (
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Save size={17} />
                      Simpan Draft
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setActiveStep("diagnosis")
                    }
                    className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                  >
                    Lanjut
                  </button>

                </div>
              </div>

            </div>
          )}

          {/* ===================================
              DIAGNOSIS
          =================================== */}

          {activeStep === "diagnosis" && (
            <div>

              <SectionHeader
                title="Diagnosis"
                description="Tentukan diagnosis utama dan diagnosis sekunder pasien."
              />

              <div className="space-y-6 p-6">

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Diagnosis Utama
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={primaryDiagnosis}
                    onChange={(e) =>
                      setPrimaryDiagnosis(e.target.value)
                    }
                    disabled={!isDoctor}
                    placeholder="Cari diagnosis atau kode ICD-10..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Contoh: J06.9 - Infeksi Saluran
                    Pernapasan Akut
                  </p>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Diagnosis Sekunder
                  </label>

                  <input
                    type="text"
                    value={secondaryDiagnosis}
                    onChange={(e) =>
                      setSecondaryDiagnosis(e.target.value)
                    }
                    disabled={!isDoctor}
                    placeholder="Masukkan diagnosis sekunder jika ada..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                  <div className="flex gap-3">

                    <AlertCircle
                      size={19}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />

                    <div>

                      <p className="text-sm font-semibold text-blue-800">
                        Validasi Diagnosis
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Diagnosis akan dikaitkan dengan
                        kunjungan pasien dan digunakan dalam
                        rekam medis.
                      </p>

                    </div>

                  </div>
                </div>

              </div>

              <div className="flex justify-between border-t border-gray-100 p-5">

                <button
                  type="button"
                  onClick={() =>
                    setActiveStep("soap")
                  }
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <ArrowLeft size={17} />
                  Kembali
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveStep("rencana")
                  }
                  className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                >
                  Lanjut ke Rencana
                </button>

              </div>
            </div>
          )}

          {/* ===================================
              RENCANA
          =================================== */}

          {activeStep === "rencana" && (
            <div>

              <SectionHeader
                title="Rencana Pelayanan"
                description="Tindakan, resep, pemeriksaan penunjang, dan rujukan."
              />

              <div className="space-y-6 p-6">

                <TextAreaField
                  label="Tindakan / Rencana"
                  description="Tindakan medis dan rencana perawatan pasien."
                  value={actionPlan}
                  onChange={setActionPlan}
                  disabled={!isDoctor}
                />

                {/* Resep */}

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <Pill
                      size={18}
                      className="text-teal-600"
                    />

                    <label className="text-sm font-medium text-gray-700">
                      E-Prescription
                    </label>

                  </div>

                  <textarea
                    rows={4}
                    value={prescription}
                    onChange={(e) =>
                      setPrescription(e.target.value)
                    }
                    disabled={!isDoctor}
                    placeholder="Masukkan obat dan aturan penggunaan..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                </div>

                {/* Lab */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Pemeriksaan Laboratorium
                  </label>

                  <input
                    type="text"
                    value={labOrder}
                    onChange={(e) =>
                      setLabOrder(e.target.value)
                    }
                    disabled={!isDoctor}
                    placeholder="Contoh: Darah lengkap"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                </div>

                {/* Radiologi */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Pemeriksaan Radiologi
                  </label>

                  <input
                    type="text"
                    value={radiologyOrder}
                    onChange={(e) =>
                      setRadiologyOrder(e.target.value)
                    }
                    disabled={!isDoctor}
                    placeholder="Contoh: Foto Thorax"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                </div>

                {/* Rujukan */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Rujukan
                  </label>

                  <input
                    type="text"
                    value={referral}
                    onChange={(e) =>
                      setReferral(e.target.value)
                    }
                    disabled={!isDoctor}
                    placeholder="Masukkan rujukan jika diperlukan..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
                  />

                </div>

                {/* Medical Record Checklist */}

                {isMedicalRecord && (
                  <div className="rounded-xl border border-green-100 bg-green-50 p-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Check
                          size={20}
                          className="text-green-600"
                        />
                      </div>

                      <div>

                        <p className="font-semibold text-green-800">
                          Pemeriksaan Kelengkapan EMR
                        </p>

                        <p className="text-sm text-green-700">
                          Pastikan seluruh bagian EMR telah
                          terisi sebelum diverifikasi.
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                      <ChecklistItem
                        title="Asesmen"
                        checked
                      />

                      <ChecklistItem
                        title="SOAP"
                        checked
                      />

                      <ChecklistItem
                        title="Diagnosis"
                        checked
                      />

                      <ChecklistItem
                        title="Rencana"
                        checked
                      />

                    </div>

                  </div>
                )}

              </div>

              {/* Actions */}

              <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">

                <button
                  type="button"
                  onClick={() =>
                    setActiveStep("diagnosis")
                  }
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  <ArrowLeft size={17} />
                  Kembali
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">

                  {isDoctor && (
                    <>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <Save size={17} />
                        Simpan Draft
                      </button>

                      <button
                        type="button"
                        onClick={handleFinalize}
                        className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                      >
                        <Check size={17} />
                        Finalisasi EMR
                      </button>
                    </>
                  )}

                  {isMedicalRecord && !isDoctor && (
                    <button
                      type="button"
                      onClick={handleVerify}
                      className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                    >
                      <Check size={17} />
                      Verifikasi Kelengkapan
                    </button>
                  )}

                </div>
              </div>

            </div>
          )}

        </section>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">

          <p>
            Status EMR:{" "}
            <span className="font-medium text-orange-500">
              Draft
            </span>
          </p>

          <p>
            Terakhir diperbarui: Hari ini, 14:32
          </p>

        </div>

      </div>
    </main>
  );
}

/* =================================================
   INFO ITEM
================================================= */

function InfoItem({
  icon,
  label,
  value,
  valueClassName = "text-gray-800",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="p-5">

      <div className="flex items-center gap-2 text-xs text-gray-400">
        {icon}
        {label}
      </div>

      <p
        className={`mt-1 line-clamp-2 text-sm font-medium ${valueClassName}`}
      >
        {value}
      </p>

    </div>
  );
}

/* =================================================
   SECTION HEADER
================================================= */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-gray-100 p-6">

      <h2 className="text-lg font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
}

/* =================================================
   INPUT FIELD
================================================= */

function InputField({
  label,
  unit,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          disabled={disabled}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-16 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
        />

        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          {unit}
        </span>

      </div>
    </div>
  );
}

/* =================================================
   TEXT AREA
================================================= */

function TextAreaField({
  label,
  description,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>

      <label className="mb-1 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <p className="mb-2 text-xs text-gray-400">
        {description}
      </p>

      <textarea
        rows={5}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        disabled={disabled}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-gray-50 disabled:text-gray-500"
      />

    </div>
  );
}

/* =================================================
   CHECKLIST
================================================= */

function ChecklistItem({
  title,
  checked,
}: {
  title: string;
  checked: boolean;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-white px-3 py-2">

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full ${
          checked
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-400"
        }`}
      >
        {checked && <Check size={13} />}
      </div>

      <span className="text-sm font-medium text-gray-700">
        {title}
      </span>

    </div>
  );
}