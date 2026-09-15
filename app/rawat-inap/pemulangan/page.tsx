"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Search,
  User,
  X,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type ChecklistItem = {
  id: number;
  label: string;
  description: string;
  checked: boolean;
};

type Patient = {
  id: number;
  name: string;
  mrNumber: string;
  inpatientNumber: string;
  room: string;
  bed: string;
  class: string;
  diagnosis: string;
  admissionDate: string;
  plannedDischarge: string;
  checklist: ChecklistItem[];
};

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Andi Pratama",
    mrNumber: "RM-2026-00125",
    inpatientNumber: "RI-2026-00081",
    room: "Anggrek 1",
    bed: "A-01",
    class: "Kelas I",
    diagnosis: "Demam Berdarah Dengue",
    admissionDate: "14 Sep 2026, 10:30",
    plannedDischarge: "15 Sep 2026",
    checklist: [
      {
        id: 1,
        label: "Instruksi pemulangan dari DPJP",
        description: "Pasien telah mendapatkan instruksi untuk pulang.",
        checked: true,
      },
      {
        id: 2,
        label: "Resume medis tersedia",
        description: "Resume medis pasien telah dilengkapi.",
        checked: true,
      },
      {
        id: 3,
        label: "Resep / obat pulang",
        description: "Obat pulang telah diresepkan dan disiapkan.",
        checked: true,
      },
      {
        id: 4,
        label: "Edukasi pasien / keluarga",
        description: "Edukasi terkait kondisi dan perawatan lanjutan telah diberikan.",
        checked: true,
      },
      {
        id: 5,
        label: "Dokumen pemulangan lengkap",
        description: "Dokumen yang diperlukan untuk pemulangan telah lengkap.",
        checked: false,
      },
      {
        id: 6,
        label: "Administrasi / billing selesai",
        description: "Proses administrasi dan billing telah diselesaikan.",
        checked: false,
      },
    ],
  },
  {
    id: 2,
    name: "Siti Rahma",
    mrNumber: "RM-2026-00142",
    inpatientNumber: "RI-2026-00092",
    room: "Melati 2",
    bed: "M-05",
    class: "Kelas II",
    diagnosis: "Pneumonia",
    admissionDate: "13 Sep 2026, 15:20",
    plannedDischarge: "15 Sep 2026",
    checklist: [
      {
        id: 1,
        label: "Instruksi pemulangan dari DPJP",
        description: "Pasien telah mendapatkan instruksi untuk pulang.",
        checked: true,
      },
      {
        id: 2,
        label: "Resume medis tersedia",
        description: "Resume medis pasien telah dilengkapi.",
        checked: true,
      },
      {
        id: 3,
        label: "Resep / obat pulang",
        description: "Obat pulang telah diresepkan dan disiapkan.",
        checked: true,
      },
      {
        id: 4,
        label: "Edukasi pasien / keluarga",
        description: "Edukasi terkait kondisi dan perawatan lanjutan telah diberikan.",
        checked: false,
      },
      {
        id: 5,
        label: "Dokumen pemulangan lengkap",
        description: "Dokumen yang diperlukan untuk pemulangan telah lengkap.",
        checked: false,
      },
      {
        id: 6,
        label: "Administrasi / billing selesai",
        description: "Proses administrasi dan billing telah diselesaikan.",
        checked: true,
      },
    ],
  },
  {
    id: 3,
    name: "Budi Santoso",
    mrNumber: "RM-2026-00158",
    inpatientNumber: "RI-2026-00101",
    room: "Kenanga 1",
    bed: "K-03",
    class: "Kelas III",
    diagnosis: "Gastroenteritis",
    admissionDate: "12 Sep 2026, 09:15",
    plannedDischarge: "15 Sep 2026",
    checklist: [
      {
        id: 1,
        label: "Instruksi pemulangan dari DPJP",
        description: "Pasien telah mendapatkan instruksi untuk pulang.",
        checked: true,
      },
      {
        id: 2,
        label: "Resume medis tersedia",
        description: "Resume medis pasien telah dilengkapi.",
        checked: true,
      },
      {
        id: 3,
        label: "Resep / obat pulang",
        description: "Obat pulang telah diresepkan dan disiapkan.",
        checked: true,
      },
      {
        id: 4,
        label: "Edukasi pasien / keluarga",
        description: "Edukasi terkait kondisi dan perawatan lanjutan telah diberikan.",
        checked: true,
      },
      {
        id: 5,
        label: "Dokumen pemulangan lengkap",
        description: "Dokumen yang diperlukan untuk pemulangan telah lengkap.",
        checked: true,
      },
      {
        id: 6,
        label: "Administrasi / billing selesai",
        description: "Proses administrasi dan billing telah diselesaikan.",
        checked: true,
      },
    ],
  },
  {
    id: 4,
    name: "Maria Lestari",
    mrNumber: "RM-2026-00167",
    inpatientNumber: "RI-2026-00108",
    room: "Anggrek 2",
    bed: "A-06",
    class: "Kelas I",
    diagnosis: "Post Operasi Appendicitis",
    admissionDate: "14 Sep 2026, 18:45",
    plannedDischarge: "16 Sep 2026",
    checklist: [
      {
        id: 1,
        label: "Instruksi pemulangan dari DPJP",
        description: "Pasien telah mendapatkan instruksi untuk pulang.",
        checked: false,
      },
      {
        id: 2,
        label: "Resume medis tersedia",
        description: "Resume medis pasien telah dilengkapi.",
        checked: false,
      },
      {
        id: 3,
        label: "Resep / obat pulang",
        description: "Obat pulang telah diresepkan dan disiapkan.",
        checked: false,
      },
      {
        id: 4,
        label: "Edukasi pasien / keluarga",
        description: "Edukasi terkait kondisi dan perawatan lanjutan telah diberikan.",
        checked: false,
      },
      {
        id: 5,
        label: "Dokumen pemulangan lengkap",
        description: "Dokumen yang diperlukan untuk pemulangan telah lengkap.",
        checked: false,
      },
      {
        id: 6,
        label: "Administrasi / billing selesai",
        description: "Proses administrasi dan billing telah diselesaikan.",
        checked: false,
      },
    ],
  },
];

export default function ChecklistPemulanganPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  const [search, setSearch] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const selectedPatient = patients.find(
    (patient) => patient.id === selectedPatientId
  );

  const filteredPatients = useMemo(() => {
    const keyword = search.toLowerCase();

    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(keyword) ||
        patient.mrNumber.toLowerCase().includes(keyword) ||
        patient.inpatientNumber.toLowerCase().includes(keyword)
    );
  }, [patients, search]);

  const getCompletedCount = (patient: Patient) => {
    return patient.checklist.filter((item) => item.checked).length;
  };

  const getCompletionPercentage = (patient: Patient) => {
    return Math.round(
      (getCompletedCount(patient) / patient.checklist.length) * 100
    );
  };

  const readyPatients = patients.filter(
    (patient) => getCompletedCount(patient) === patient.checklist.length
  );

  const pendingPatients = patients.filter(
    (patient) => getCompletedCount(patient) < patient.checklist.length
  );

  const toggleChecklist = (checklistId: number) => {
    if (!selectedPatientId) return;

    setPatients((currentPatients) =>
      currentPatients.map((patient) => {
        if (patient.id !== selectedPatientId) {
          return patient;
        }

        return {
          ...patient,
          checklist: patient.checklist.map((item) =>
            item.id === checklistId
              ? {
                  ...item,
                  checked: !item.checked,
                }
              : item
          ),
        };
      })
    );
  };

  const handleSelectPatient = (patientId: number) => {
    setSelectedPatientId(patientId);
  };

  const handleCloseDetail = () => {
    setSelectedPatientId(null);
  };

  const handleConfirmDischarge = () => {
    setShowConfirm(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setSelectedPatientId(null);
    }, 2500);
  };

  const isReady =
    selectedPatient &&
    getCompletedCount(selectedPatient) === selectedPatient.checklist.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Checklist Pemulangan
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Periksa kelengkapan persyaratan pasien sebelum proses
                  pemulangan.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
                <Clock3 size={16} />
                <span>15 September 2026</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SummaryCard
              icon={<User size={20} />}
              label="Pasien Akan Pulang"
              value={patients.length}
              description="Pasien dalam daftar pemulangan"
            />

            <SummaryCard
              icon={<CheckCircle2 size={20} />}
              label="Checklist Lengkap"
              value={readyPatients.length}
              description="Siap untuk proses pemulangan"
              variant="success"
            />

            <SummaryCard
              icon={<AlertCircle size={20} />}
              label="Belum Lengkap"
              value={pendingPatients.length}
              description="Masih membutuhkan kelengkapan"
              variant="warning"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
            {/* Patient List */}
            <section className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                    <ClipboardCheck size={19} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Daftar Pasien
                    </h2>

                    <p className="text-xs text-gray-500">
                      Pilih pasien untuk melihat checklist pemulangan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* Search */}
                <div className="relative mb-4">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nama pasien, nomor RM, atau nomor rawat inap..."
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-4 py-3 font-medium">Pasien</th>
                        <th className="px-4 py-3 font-medium">
                          Ruang / Bed
                        </th>
                        <th className="px-4 py-3 font-medium">
                          Rencana Pulang
                        </th>
                        <th className="px-4 py-3 font-medium">
                          Checklist
                        </th>
                        <th className="px-4 py-3 text-right font-medium">
                          Aksi
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {filteredPatients.map((patient) => {
                        const completed = getCompletedCount(patient);
                        const total = patient.checklist.length;
                        const percentage = getCompletionPercentage(patient);

                        const isSelected =
                          selectedPatientId === patient.id;

                        const complete = completed === total;

                        return (
                          <tr
                            key={patient.id}
                            className={`transition ${
                              isSelected
                                ? "bg-teal-50/60"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <td className="px-4 py-4">
                              <p className="font-medium text-slate-900">
                                {patient.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {patient.mrNumber}
                              </p>
                            </td>

                            <td className="px-4 py-4">
                              <p className="font-medium text-slate-800">
                                {patient.room}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                Bed {patient.bed}
                              </p>
                            </td>

                            <td className="px-4 py-4 text-gray-600">
                              {patient.plannedDischarge}
                            </td>

                            <td className="px-4 py-4">
                              <div className="min-w-30">
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {completed}/{total}
                                  </span>

                                  <span
                                    className={`text-xs font-medium ${
                                      complete
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                    }`}
                                  >
                                    {percentage}%
                                  </span>
                                </div>

                                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                                  <div
                                    className={`h-full rounded-full ${
                                      complete
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                    }`}
                                    style={{
                                      width: `${percentage}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSelectPatient(patient.id)
                                }
                                className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                                  isSelected
                                    ? "bg-teal-600 text-white"
                                    : "border border-gray-300 bg-white text-gray-700 hover:border-teal-500 hover:text-teal-600"
                                }`}
                              >
                                {isSelected
                                  ? "Sedang Dibuka"
                                  : "Periksa"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredPatients.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-10 text-center text-sm text-gray-500"
                          >
                            Pasien tidak ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Detail */}
            <aside className="xl:sticky xl:top-6 xl:self-start">
              {!selectedPatient ? (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <ClipboardCheck size={26} />
                  </div>

                  <h3 className="font-semibold text-slate-900">
                    Belum Ada Pasien Dipilih
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Pilih pasien dari daftar untuk melihat dan melengkapi
                    checklist pemulangan.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white">
                  {/* Detail Header */}
                  <div className="border-b border-gray-200 px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                          <User size={19} />
                        </div>

                        <div>
                          <h2 className="font-semibold text-slate-900">
                            {selectedPatient.name}
                          </h2>

                          <p className="mt-1 text-xs text-gray-500">
                            {selectedPatient.mrNumber}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleCloseDetail}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Patient Info */}
                    <div className="mb-5 grid grid-cols-2 gap-3">
                      <InfoItem
                        label="Nomor Rawat"
                        value={selectedPatient.inpatientNumber}
                      />

                      <InfoItem
                        label="Ruang / Bed"
                        value={`${selectedPatient.room} / ${selectedPatient.bed}`}
                      />

                      <InfoItem
                        label="Kelas"
                        value={selectedPatient.class}
                      />

                      <InfoItem
                        label="Rencana Pulang"
                        value={selectedPatient.plannedDischarge}
                      />
                    </div>

                    <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        Diagnosis
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {selectedPatient.diagnosis}
                      </p>
                    </div>

                    {/* Progress */}
                    <div className="mb-5">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Kelengkapan Checklist
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {getCompletedCount(selectedPatient)} dari{" "}
                            {selectedPatient.checklist.length} item
                            selesai
                          </p>
                        </div>

                        <span
                          className={`text-sm font-semibold ${
                            isReady
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {getCompletionPercentage(selectedPatient)}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isReady
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                          style={{
                            width: `${getCompletionPercentage(
                              selectedPatient
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Checklist */}
                    <div>
                      <p className="mb-3 text-sm font-semibold text-slate-900">
                        Checklist Pemulangan
                      </p>

                      <div className="space-y-2">
                        {selectedPatient.checklist.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleChecklist(item.id)}
                            className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left transition ${
                              item.checked
                                ? "border-green-200 bg-green-50/60"
                                : "border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                                item.checked
                                  ? "border-green-500 bg-green-500 text-white"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {item.checked && <Check size={13} />}
                            </div>

                            <div className="min-w-0">
                              <p
                                className={`text-sm font-medium ${
                                  item.checked
                                    ? "text-green-800"
                                    : "text-slate-800"
                                }`}
                              >
                                {item.label}
                              </p>

                              <p className="mt-1 text-xs leading-5 text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-5 border-t border-gray-200 pt-5">
                      {isReady ? (
                        <div className="mb-3 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                          <CheckCircle2
                            size={17}
                            className="mt-0.5 shrink-0 text-green-600"
                          />

                          <div>
                            <p className="text-xs font-semibold text-green-800">
                              Checklist lengkap
                            </p>

                            <p className="mt-1 text-xs leading-5 text-green-700">
                              Semua persyaratan pemulangan telah
                              dipenuhi.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3 flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                          <AlertCircle
                            size={17}
                            className="mt-0.5 shrink-0 text-yellow-600"
                          />

                          <div>
                            <p className="text-xs font-semibold text-yellow-800">
                              Checklist belum lengkap
                            </p>

                            <p className="mt-1 text-xs leading-5 text-yellow-700">
                              Lengkapi seluruh checklist sebelum
                              melanjutkan proses pemulangan.
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        disabled={!isReady}
                        onClick={() => setShowConfirm(true)}
                        className="w-full rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        Konfirmasi Pemulangan
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <FileText
                    size={17}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Informasi
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      Checklist digunakan untuk memastikan persyaratan
                      pemulangan pasien telah diperiksa sebelum proses
                      pemulangan dilakukan.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Konfirmasi Pemulangan
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Pastikan checklist pasien telah diperiksa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  Pasien
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {selectedPatient.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {selectedPatient.mrNumber}
                </p>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 text-green-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Checklist Lengkap
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-700">
                      Seluruh item checklist telah dipenuhi dan pasien
                      dapat dilanjutkan ke proses pemulangan.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Lokasi terakhir
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {selectedPatient.room} • Bed{" "}
                  {selectedPatient.bed}
                </p>
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleConfirmDischarge}
                className="flex-1 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Ya, Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed right-6 top-20 z-60 flex items-start gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 shadow-lg">
          <CheckCircle2
            size={20}
            className="mt-0.5 text-green-600"
          />

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Pemulangan dikonfirmasi
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Checklist pasien telah selesai diproses.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  description,
  variant = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  description: string;
  variant?: "default" | "success" | "warning";
}) {
  const iconClass =
    variant === "success"
      ? "bg-green-50 text-green-600"
      : variant === "warning"
      ? "bg-yellow-50 text-yellow-600"
      : "bg-teal-50 text-teal-600";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      <p className="text-[11px] uppercase text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}