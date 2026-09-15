"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  HeartPulse,
  Search,
  User,
  X,
} from "lucide-react";

type AssessmentStatus = "BELUM DIISI" | "SUDAH DIISI";

type Patient = {
  id: number;
  medicalRecordNumber: string;
  inpatientNumber: string;
  name: string;
  gender: "L" | "P";
  age: number;
  room: string;
  bed: string;
  doctor: string;
  admissionDate: string;
  admissionTime: string;
  status: AssessmentStatus;
};

type AssessmentForm = {
  temperature: string;
  systolic: string;
  diastolic: string;
  pulse: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  painScale: string;
  fallRisk: string;
  nutritionStatus: string;
  pressureInjuryRisk: string;
  allergy: string;
  initialNeeds: string;
  complaint: string;
};

const initialPatients: Patient[] = [
  {
    id: 1,
    medicalRecordNumber: "RM-001245",
    inpatientNumber: "RI-2026-00124",
    name: "Andi Pratama",
    gender: "L",
    age: 45,
    room: "Anggrek 101",
    bed: "A-01",
    doctor: "dr. Budi Santoso",
    admissionDate: "15 Sep 2026",
    admissionTime: "08:30",
    status: "BELUM DIISI",
  },
  {
    id: 2,
    medicalRecordNumber: "RM-002118",
    inpatientNumber: "RI-2026-00125",
    name: "Siti Rahma",
    gender: "P",
    age: 37,
    room: "Melati 203",
    bed: "M-03",
    doctor: "dr. Rina Amelia",
    admissionDate: "15 Sep 2026",
    admissionTime: "09:15",
    status: "BELUM DIISI",
  },
  {
    id: 3,
    medicalRecordNumber: "RM-000874",
    inpatientNumber: "RI-2026-00126",
    name: "Dedi Kurniawan",
    gender: "L",
    age: 58,
    room: "Kenanga 302",
    bed: "K-02",
    doctor: "dr. Andi Wijaya",
    admissionDate: "15 Sep 2026",
    admissionTime: "10:00",
    status: "SUDAH DIISI",
  },
  {
    id: 4,
    medicalRecordNumber: "RM-003421",
    inpatientNumber: "RI-2026-00127",
    name: "Maria Lestari",
    gender: "P",
    age: 29,
    room: "Anggrek 102",
    bed: "A-02",
    doctor: "dr. Budi Santoso",
    admissionDate: "15 Sep 2026",
    admissionTime: "10:45",
    status: "SUDAH DIISI",
  },
  {
    id: 5,
    medicalRecordNumber: "RM-001932",
    inpatientNumber: "RI-2026-00128",
    name: "Yusuf Hidayat",
    gender: "L",
    age: 63,
    room: "Melati 201",
    bed: "M-01",
    doctor: "dr. Rina Amelia",
    admissionDate: "15 Sep 2026",
    admissionTime: "11:20",
    status: "BELUM DIISI",
  },
];

const emptyAssessment: AssessmentForm = {
  temperature: "",
  systolic: "",
  diastolic: "",
  pulse: "",
  respiratoryRate: "",
  oxygenSaturation: "",
  painScale: "",
  fallRisk: "",
  nutritionStatus: "",
  pressureInjuryRisk: "",
  allergy: "",
  initialNeeds: "",
  complaint: "",
};

export default function AsesmenKeperawatanPage() {
  const [patients, setPatients] =
    useState<Patient[]>(initialPatients);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "SEMUA" | AssessmentStatus
  >("SEMUA");

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [form, setForm] =
    useState<AssessmentForm>(emptyAssessment);

  const [showForm, setShowForm] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        patient.name.toLowerCase().includes(keyword) ||
        patient.medicalRecordNumber
          .toLowerCase()
          .includes(keyword) ||
        patient.inpatientNumber
          .toLowerCase()
          .includes(keyword) ||
        patient.room.toLowerCase().includes(keyword) ||
        patient.bed.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "SEMUA" ||
        patient.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, statusFilter]);

  const waitingCount = patients.filter(
    (patient) => patient.status === "BELUM DIISI"
  ).length;

  const completedCount = patients.filter(
    (patient) => patient.status === "SUDAH DIISI"
  ).length;

  const updateForm = (
    field: keyof AssessmentForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openAssessment = (patient: Patient) => {
    setSelectedPatient(patient);

    setForm(emptyAssessment);

    setShowForm(true);
  };

  const closeAssessment = () => {
    setShowForm(false);
    setSelectedPatient(null);
    setForm(emptyAssessment);
  };

  const handleSaveAssessment = () => {
    if (!selectedPatient) return;

    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === selectedPatient.id
          ? {
              ...patient,
              status: "SUDAH DIISI",
            }
          : patient
      )
    );

    setShowForm(false);
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Asesmen Keperawatan
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kelola asesmen awal keperawatan pasien rawat inap.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              type="button"
              onClick={() => setStatusFilter("SEMUA")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "SEMUA"
                  ? "border-teal-500 ring-2 ring-teal-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Pasien
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {patients.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                  <ClipboardList
                    size={22}
                    className="text-blue-600"
                  />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("BELUM DIISI")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "BELUM DIISI"
                  ? "border-yellow-500 ring-2 ring-yellow-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Belum Diisi
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {waitingCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50">
                  <Clock3
                    size={22}
                    className="text-yellow-600"
                  />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("SUDAH DIISI")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "SUDAH DIISI"
                  ? "border-green-500 ring-2 ring-green-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Sudah Diisi
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {completedCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50">
                  <CheckCircle2
                    size={22}
                    className="text-green-600"
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Patient List */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Toolbar */}
            <div className="border-b border-gray-200 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Daftar Pasien
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Pasien rawat inap yang membutuhkan asesmen
                    keperawatan.
                  </p>
                </div>

                <div className="relative w-full lg:w-96">
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
                    placeholder="Cari nama, nomor RM, kamar..."
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-250">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Pasien
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Nomor Rawat
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Kamar / Bed
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      DPJP
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Tanggal Masuk
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Patient */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-semibold text-teal-700">
                            {patient.name
                              .split(" ")
                              .slice(0, 2)
                              .map((name) => name[0])
                              .join("")}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {patient.name}
                            </p>

                            <p className="mt-0.5 text-xs text-gray-500">
                              {patient.medicalRecordNumber} •{" "}
                              {patient.gender === "L"
                                ? "Laki-laki"
                                : "Perempuan"}{" "}
                              • {patient.age} tahun
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Inpatient Number */}
                      <td className="px-5 py-4">
                        <span className="font-mono text-sm text-gray-700">
                          {patient.inpatientNumber}
                        </span>
                      </td>

                      {/* Room */}
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-800">
                          {patient.room}
                        </p>

                        <p className="mt-0.5 text-xs text-gray-500">
                          Bed {patient.bed}
                        </p>
                      </td>

                      {/* Doctor */}
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-700">
                          {patient.doctor}
                        </span>
                      </td>

                      {/* Admission */}
                      <td className="px-5 py-4">
                        <p className="text-sm text-gray-700">
                          {patient.admissionDate}
                        </p>

                        <p className="text-xs text-gray-500">
                          {patient.admissionTime}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        {patient.status === "BELUM DIISI" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700">
                            <Clock3 size={13} />
                            Belum Diisi
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                            <CheckCircle2 size={13} />
                            Sudah Diisi
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            openAssessment(patient)
                          }
                          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                            patient.status === "BELUM DIISI"
                              ? "bg-teal-600 text-white hover:bg-teal-700"
                              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <ClipboardList size={16} />

                          {patient.status === "BELUM DIISI"
                            ? "Isi Asesmen"
                            : "Lihat Asesmen"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-12 text-center"
                      >
                        <div className="flex flex-col items-center">
                          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                            <Search
                              size={22}
                              className="text-gray-400"
                            />
                          </div>

                          <p className="font-medium text-gray-700">
                            Pasien tidak ditemukan
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Coba ubah kata kunci pencarian atau
                            filter.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 px-5 py-4">
              <p className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium text-gray-700">
                  {filteredPatients.length}
                </span>{" "}
                dari{" "}
                <span className="font-medium text-gray-700">
                  {patients.length}
                </span>{" "}
                pasien.
              </p>
            </div>
          </div>

          {/* Information */}
          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <HeartPulse
                  size={18}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-900">
                  Asesmen Awal Keperawatan
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  Asesmen dilakukan setelah pasien diterima di
                  ruang rawat inap. Data yang dicatat meliputi
                  tanda-tanda vital, nyeri, risiko jatuh, status
                  nutrisi, risiko luka tekan, alergi, keluhan
                  awal, dan kebutuhan awal pasien.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Assessment Modal */}
      {showForm && selectedPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
          <div className="mx-auto my-6 w-full max-w-5xl rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Asesmen Awal Keperawatan
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Lengkapi data asesmen pasien rawat inap.
                </p>
              </div>

              <button
                type="button"
                onClick={closeAssessment}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                aria-label="Tutup"
              >
                <X size={20} />
              </button>
            </div>

            {/* Patient Identity */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal-700">
                    {selectedPatient.name
                      .split(" ")
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join("")}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedPatient.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {selectedPatient.medicalRecordNumber} •{" "}
                      {selectedPatient.age} tahun
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                  <div>
                    <p className="text-xs text-gray-500">
                      Nomor Rawat
                    </p>
                    <p className="mt-1 font-mono text-gray-700">
                      {selectedPatient.inpatientNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Kamar
                    </p>
                    <p className="mt-1 font-medium text-gray-700">
                      {selectedPatient.room}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Bed
                    </p>
                    <p className="mt-1 font-medium text-gray-700">
                      {selectedPatient.bed}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      DPJP
                    </p>
                    <p className="mt-1 text-gray-700">
                      {selectedPatient.doctor}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6 px-6 py-6">
              {/* TTV */}
              <section className="rounded-xl border border-gray-200">
                <div className="border-b border-gray-200 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <HeartPulse
                      size={18}
                      className="text-teal-600"
                    />

                    <h3 className="font-semibold text-gray-900">
                      Tanda-Tanda Vital
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Catat tanda-tanda vital saat asesmen awal.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
                  <FormInput
                    label="Suhu"
                    required
                    value={form.temperature}
                    onChange={(value) =>
                      updateForm("temperature", value)
                    }
                    placeholder="Contoh: 36.7"
                    suffix="°C"
                  />

                  <FormInput
                    label="Tekanan Darah Sistolik"
                    required
                    value={form.systolic}
                    onChange={(value) =>
                      updateForm("systolic", value)
                    }
                    placeholder="Contoh: 120"
                    suffix="mmHg"
                  />

                  <FormInput
                    label="Tekanan Darah Diastolik"
                    required
                    value={form.diastolic}
                    onChange={(value) =>
                      updateForm("diastolic", value)
                    }
                    placeholder="Contoh: 80"
                    suffix="mmHg"
                  />

                  <FormInput
                    label="Nadi"
                    required
                    value={form.pulse}
                    onChange={(value) =>
                      updateForm("pulse", value)
                    }
                    placeholder="Contoh: 82"
                    suffix="x/menit"
                  />

                  <FormInput
                    label="Frekuensi Napas"
                    required
                    value={form.respiratoryRate}
                    onChange={(value) =>
                      updateForm(
                        "respiratoryRate",
                        value
                      )
                    }
                    placeholder="Contoh: 20"
                    suffix="x/menit"
                  />

                  <FormInput
                    label="Saturasi Oksigen"
                    required
                    value={form.oxygenSaturation}
                    onChange={(value) =>
                      updateForm(
                        "oxygenSaturation",
                        value
                      )
                    }
                    placeholder="Contoh: 98"
                    suffix="%"
                  />
                </div>
              </section>

              {/* Keluhan & Nyeri */}
              <section className="rounded-xl border border-gray-200">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h3 className="font-semibold text-gray-900">
                    Keluhan dan Nyeri
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Keluhan Awal
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <textarea
                      value={form.complaint}
                      onChange={(event) =>
                        updateForm(
                          "complaint",
                          event.target.value
                        )
                      }
                      rows={3}
                      placeholder="Tuliskan keluhan utama pasien..."
                      className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>

                  <SelectField
                    label="Skala Nyeri"
                    required
                    value={form.painScale}
                    onChange={(value) =>
                      updateForm("painScale", value)
                    }
                    options={[
                      {
                        value: "0",
                        label: "0 - Tidak nyeri",
                      },
                      {
                        value: "1-3",
                        label: "1-3 - Nyeri ringan",
                      },
                      {
                        value: "4-6",
                        label: "4-6 - Nyeri sedang",
                      },
                      {
                        value: "7-9",
                        label: "7-9 - Nyeri berat",
                      },
                      {
                        value: "10",
                        label: "10 - Nyeri sangat berat",
                      },
                    ]}
                  />
                </div>
              </section>

              {/* Risk Assessment */}
              <section className="rounded-xl border border-gray-200">
                <div className="border-b border-gray-200 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle
                      size={18}
                      className="text-orange-500"
                    />

                    <h3 className="font-semibold text-gray-900">
                      Risiko dan Status Pasien
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
                  <SelectField
                    label="Risiko Jatuh"
                    required
                    value={form.fallRisk}
                    onChange={(value) =>
                      updateForm("fallRisk", value)
                    }
                    options={[
                      {
                        value: "RENDAH",
                        label: "Risiko Rendah",
                      },
                      {
                        value: "SEDANG",
                        label: "Risiko Sedang",
                      },
                      {
                        value: "TINGGI",
                        label: "Risiko Tinggi",
                      },
                    ]}
                  />

                  <SelectField
                    label="Status Nutrisi"
                    required
                    value={form.nutritionStatus}
                    onChange={(value) =>
                      updateForm(
                        "nutritionStatus",
                        value
                      )
                    }
                    options={[
                      {
                        value: "BAIK",
                        label: "Baik",
                      },
                      {
                        value: "RISIKO",
                        label: "Berisiko",
                      },
                      {
                        value: "KURANG",
                        label: "Kurang",
                      },
                    ]}
                  />

                  <SelectField
                    label="Risiko Luka Tekan"
                    required
                    value={form.pressureInjuryRisk}
                    onChange={(value) =>
                      updateForm(
                        "pressureInjuryRisk",
                        value
                      )
                    }
                    options={[
                      {
                        value: "RENDAH",
                        label: "Risiko Rendah",
                      },
                      {
                        value: "SEDANG",
                        label: "Risiko Sedang",
                      },
                      {
                        value: "TINGGI",
                        label: "Risiko Tinggi",
                      },
                    ]}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Alergi
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      value={form.allergy}
                      onChange={(event) =>
                        updateForm(
                          "allergy",
                          event.target.value
                        )
                      }
                      placeholder="Contoh: Tidak ada / Amoksisilin"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>
                </div>
              </section>

              {/* Initial Needs */}
              <section className="rounded-xl border border-gray-200">
                <div className="border-b border-gray-200 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <User
                      size={18}
                      className="text-teal-600"
                    />

                    <h3 className="font-semibold text-gray-900">
                      Kebutuhan Awal
                    </h3>
                  </div>

                  <p className="mt-1 text-xs text-gray-500">
                    Catat kebutuhan awal pasien berdasarkan
                    hasil asesmen.
                  </p>
                </div>

                <div className="p-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Kebutuhan Awal Pasien
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <textarea
                    value={form.initialNeeds}
                    onChange={(event) =>
                      updateForm(
                        "initialNeeds",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Tuliskan kebutuhan awal pasien, misalnya kebutuhan bantuan mobilisasi, edukasi, observasi khusus, kebutuhan alat, dan lainnya..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </section>

              {/* Required Information */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex gap-3">
                  <AlertCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-yellow-600"
                  />

                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Perhatian
                    </p>

                    <p className="mt-1 text-sm leading-5 text-yellow-700">
                      Field bertanda{" "}
                      <span className="font-semibold">
                        *
                      </span>{" "}
                      wajib diisi sebelum asesmen disimpan.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex justify-end gap-3 rounded-b-2xl border-t border-gray-200 bg-white px-6 py-4">
              <button
                type="button"
                onClick={closeAssessment}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSaveAssessment}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              >
                <CheckCircle2 size={17} />
                Simpan Asesmen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-60 w-full max-w-sm rounded-xl border border-green-200 bg-white p-4 shadow-lg">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2
                size={19}
                className="text-green-600"
              />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                Asesmen berhasil disimpan
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Data asesmen keperawatan pasien telah
                diperbarui.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              className="self-start rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Tutup notifikasi"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   Reusable Form Components
========================= */

type FormInputProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
};

function FormInput({
  label,
  required,
  value,
  onChange,
  placeholder,
  suffix,
}: FormInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition ${
            suffix ? "pr-20" : ""
          } focus:border-teal-500 focus:ring-2 focus:ring-teal-100`}
        />

        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
};

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      >
        <option value="">Pilih {label}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}