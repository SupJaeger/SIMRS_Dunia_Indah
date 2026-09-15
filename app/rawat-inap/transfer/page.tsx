"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Bed,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileText,
  Search,
  User,
  X,
} from "lucide-react";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

type BedStatus = "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MAINTENANCE";

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
  status: "Dirawat";
};

type BedItem = {
  id: number;
  room: string;
  bed: string;
  class: string;
  status: BedStatus;
};

const patients: Patient[] = [
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
    status: "Dirawat",
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
    status: "Dirawat",
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
    status: "Dirawat",
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
    status: "Dirawat",
  },
];

const beds: BedItem[] = [
  {
    id: 1,
    room: "Anggrek 1",
    bed: "A-01",
    class: "Kelas I",
    status: "OCCUPIED",
  },
  {
    id: 2,
    room: "Anggrek 1",
    bed: "A-02",
    class: "Kelas I",
    status: "AVAILABLE",
  },
  {
    id: 3,
    room: "Anggrek 1",
    bed: "A-03",
    class: "Kelas I",
    status: "OCCUPIED",
  },
  {
    id: 4,
    room: "Anggrek 2",
    bed: "A-05",
    class: "Kelas I",
    status: "AVAILABLE",
  },
  {
    id: 5,
    room: "Anggrek 2",
    bed: "A-06",
    class: "Kelas I",
    status: "OCCUPIED",
  },
  {
    id: 6,
    room: "Melati 1",
    bed: "M-01",
    class: "Kelas II",
    status: "AVAILABLE",
  },
  {
    id: 7,
    room: "Melati 1",
    bed: "M-02",
    class: "Kelas II",
    status: "AVAILABLE",
  },
  {
    id: 8,
    room: "Melati 2",
    bed: "M-04",
    class: "Kelas II",
    status: "OCCUPIED",
  },
  {
    id: 9,
    room: "Melati 2",
    bed: "M-05",
    class: "Kelas II",
    status: "OCCUPIED",
  },
  {
    id: 10,
    room: "Melati 2",
    bed: "M-06",
    class: "Kelas II",
    status: "AVAILABLE",
  },
  {
    id: 11,
    room: "Kenanga 1",
    bed: "K-01",
    class: "Kelas III",
    status: "AVAILABLE",
  },
  {
    id: 12,
    room: "Kenanga 1",
    bed: "K-02",
    class: "Kelas III",
    status: "AVAILABLE",
  },
  {
    id: 13,
    room: "Kenanga 1",
    bed: "K-03",
    class: "Kelas III",
    status: "OCCUPIED",
  },
  {
    id: 14,
    room: "Kenanga 2",
    bed: "K-05",
    class: "Kelas III",
    status: "AVAILABLE",
  },
  {
    id: 15,
    room: "Kenanga 2",
    bed: "K-06",
    class: "Kelas III",
    status: "MAINTENANCE",
  },
];

const transferReasons = [
  "Perubahan kondisi klinis",
  "Kebutuhan kelas perawatan",
  "Kebutuhan ruang isolasi",
  "Permintaan pasien/keluarga",
  "Instruksi DPJP",
  "Alasan lainnya",
];

export default function TransferBedPage() {
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );

  const [searchPatient, setSearchPatient] = useState("");
  const [selectedClass, setSelectedClass] = useState("Semua Kelas");
  const [selectedRoom, setSelectedRoom] = useState("Semua Ruang");
  const [selectedBedId, setSelectedBedId] = useState<number | null>(null);

  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const selectedPatient = patients.find(
    (patient) => patient.id === selectedPatientId
  );

  const availableRooms = useMemo(() => {
    return Array.from(new Set(beds.map((bed) => bed.room)));
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const keyword = searchPatient.toLowerCase();

      const matchesSearch =
        patient.name.toLowerCase().includes(keyword) ||
        patient.mrNumber.toLowerCase().includes(keyword) ||
        patient.inpatientNumber.toLowerCase().includes(keyword);

      return matchesSearch;
    });
  }, [searchPatient]);

  const filteredBeds = useMemo(() => {
    return beds.filter((bed) => {
      const matchesClass =
        selectedClass === "Semua Kelas" || bed.class === selectedClass;

      const matchesRoom =
        selectedRoom === "Semua Ruang" || bed.room === selectedRoom;

      return bed.status === "AVAILABLE" && matchesClass && matchesRoom;
    });
  }, [selectedClass, selectedRoom]);

  const selectedBed = beds.find((bed) => bed.id === selectedBedId);

  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatientId(patient.id);
    setSelectedBedId(null);
    setReason("");
    setNotes("");
  };

  const handleReset = () => {
    setSelectedPatientId(null);
    setSelectedBedId(null);
    setReason("");
    setNotes("");
    setSearchPatient("");
    setSelectedClass("Semua Kelas");
    setSelectedRoom("Semua Ruang");
  };

  const handleConfirmTransfer = () => {
    setShowConfirm(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      handleReset();
    }, 2500);
  };

  const canSubmit =
    selectedPatient &&
    selectedBed &&
    reason.trim() !== "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Transfer Bed / Ruang
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Pindahkan pasien ke ruang atau tempat tidur lain yang
                  tersedia.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
                <Clock3 size={16} />
                <span>15 September 2026</span>
              </div>
            </div>
          </div>

          {/* Stepper */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center">
              <StepItem
                number={1}
                title="Pilih Pasien"
                active={!selectedPatient}
                completed={!!selectedPatient}
              />

              <div
                className={`h-px flex-1 ${
                  selectedPatient ? "bg-teal-500" : "bg-gray-200"
                }`}
              />

              <StepItem
                number={2}
                title="Pilih Bed Tujuan"
                active={!!selectedPatient && !selectedBed}
                completed={!!selectedBed}
              />

              <div
                className={`h-px flex-1 ${
                  selectedBed ? "bg-teal-500" : "bg-gray-200"
                }`}
              />

              <StepItem
                number={3}
                title="Konfirmasi"
                active={!!selectedBed}
                completed={false}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
            {/* LEFT */}
            <div className="space-y-6">
              {/* Patient Selection */}
              <section className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <User size={19} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        1. Pilih Pasien
                      </h2>

                      <p className="text-xs text-gray-500">
                        Pilih pasien yang sedang menjalani rawat inap.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="relative mb-4">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      value={searchPatient}
                      onChange={(e) => setSearchPatient(e.target.value)}
                      placeholder="Cari nama pasien, nomor RM, atau nomor rawat inap..."
                      className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>

                  <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                        <tr>
                          <th className="px-4 py-3 font-medium">Pasien</th>
                          <th className="px-4 py-3 font-medium">
                            Nomor Rawat
                          </th>
                          <th className="px-4 py-3 font-medium">
                            Ruang / Bed
                          </th>
                          <th className="px-4 py-3 font-medium">
                            Kelas
                          </th>
                          <th className="px-4 py-3 font-medium text-right">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {filteredPatients.map((patient) => {
                          const isSelected =
                            selectedPatientId === patient.id;

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
                                <div className="font-medium text-slate-900">
                                  {patient.name}
                                </div>

                                <div className="mt-1 text-xs text-gray-500">
                                  {patient.mrNumber}
                                </div>
                              </td>

                              <td className="px-4 py-4 text-gray-600">
                                {patient.inpatientNumber}
                              </td>

                              <td className="px-4 py-4">
                                <div className="font-medium text-slate-800">
                                  {patient.room}
                                </div>

                                <div className="mt-1 text-xs text-gray-500">
                                  Bed {patient.bed}
                                </div>
                              </td>

                              <td className="px-4 py-4 text-gray-600">
                                {patient.class}
                              </td>

                              <td className="px-4 py-4 text-right">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleSelectPatient(patient)
                                  }
                                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                                    isSelected
                                      ? "bg-teal-600 text-white"
                                      : "border border-gray-300 bg-white text-gray-700 hover:border-teal-500 hover:text-teal-600"
                                  }`}
                                >
                                  {isSelected ? "Dipilih" : "Pilih"}
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

              {/* Bed Selection */}
              <section
                className={`rounded-xl border border-gray-200 bg-white ${
                  !selectedPatient ? "opacity-60" : ""
                }`}
              >
                <div className="border-b border-gray-200 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Bed size={19} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        2. Pilih Bed / Ruang Tujuan
                      </h2>

                      <p className="text-xs text-gray-500">
                        Hanya tempat tidur dengan status tersedia yang dapat
                        dipilih.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  {!selectedPatient ? (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center">
                      <Bed
                        size={30}
                        className="mx-auto mb-3 text-gray-400"
                      />

                      <p className="text-sm font-medium text-gray-600">
                        Pilih pasien terlebih dahulu
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Bed tujuan akan ditampilkan setelah pasien dipilih.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Current location */}
                      <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <p className="mb-2 text-xs font-medium uppercase text-gray-500">
                          Lokasi Saat Ini
                        </p>

                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {selectedPatient.room}
                            </p>

                            <p className="text-sm text-gray-500">
                              Bed {selectedPatient.bed} •{" "}
                              {selectedPatient.class}
                            </p>
                          </div>

                          <ArrowRight
                            size={20}
                            className="text-gray-400"
                          />

                          <div>
                            <p className="font-semibold text-teal-700">
                              Lokasi Tujuan
                            </p>

                            <p className="text-sm text-gray-500">
                              Pilih bed tersedia
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <SelectField
                          label="Kelas"
                          value={selectedClass}
                          onChange={setSelectedClass}
                          options={[
                            "Semua Kelas",
                            "Kelas I",
                            "Kelas II",
                            "Kelas III",
                          ]}
                        />

                        <SelectField
                          label="Ruang"
                          value={selectedRoom}
                          onChange={setSelectedRoom}
                          options={["Semua Ruang", ...availableRooms]}
                        />
                      </div>

                      {/* Available beds */}
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800">
                            Bed Tersedia
                          </p>

                          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                            {filteredBeds.length} tersedia
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                          {filteredBeds.map((bed) => {
                            const isSelected = selectedBedId === bed.id;

                            return (
                              <button
                                key={bed.id}
                                type="button"
                                onClick={() => setSelectedBedId(bed.id)}
                                className={`rounded-xl border p-4 text-left transition ${
                                  isSelected
                                    ? "border-teal-500 bg-teal-50 ring-2 ring-teal-100"
                                    : "border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50/40"
                                }`}
                              >
                                <div className="mb-3 flex items-center justify-between">
                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                    <Bed size={18} />
                                  </div>

                                  {isSelected && (
                                    <CheckCircle2
                                      size={18}
                                      className="text-teal-600"
                                    />
                                  )}
                                </div>

                                <p className="font-semibold text-slate-900">
                                  Bed {bed.bed}
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                  {bed.room}
                                </p>

                                <span className="mt-3 inline-flex rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700">
                                  Tersedia
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {filteredBeds.length === 0 && (
                          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center">
                            <Bed
                              size={28}
                              className="mx-auto mb-2 text-gray-400"
                            />

                            <p className="text-sm font-medium text-gray-600">
                              Tidak ada bed tersedia
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              Coba ubah filter kelas atau ruang.
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Reason */}
              <section
                className={`rounded-xl border border-gray-200 bg-white ${
                  !selectedBed ? "opacity-60" : ""
                }`}
              >
                <div className="border-b border-gray-200 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <FileText size={18} />
                    </div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        3. Alasan Transfer
                      </h2>

                      <p className="text-xs text-gray-500">
                        Masukkan alasan perpindahan pasien.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Alasan Transfer <span className="text-red-500">*</span>
                  </label>

                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    disabled={!selectedBed}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  >
                    <option value="">Pilih alasan transfer</option>

                    {transferReasons.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <label className="mb-2 mt-5 block text-sm font-medium text-slate-700">
                    Catatan
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={!selectedBed}
                    rows={4}
                    placeholder="Tambahkan catatan transfer jika diperlukan..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>
              </section>
            </div>

            {/* RIGHT SUMMARY */}
            <aside className="xl:sticky xl:top-6 xl:self-start">
              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                  <h2 className="font-semibold text-slate-900">
                    Ringkasan Transfer
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Periksa kembali data sebelum melakukan transfer.
                  </p>
                </div>

                <div className="p-5">
                  {!selectedPatient ? (
                    <div className="py-8 text-center">
                      <User
                        size={30}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="text-sm font-medium text-gray-500">
                        Belum ada pasien dipilih
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {/* Patient */}
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase text-gray-400">
                          Pasien
                        </p>

                        <div className="rounded-lg border border-gray-200 p-3">
                          <p className="font-semibold text-slate-900">
                            {selectedPatient.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {selectedPatient.mrNumber}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {selectedPatient.inpatientNumber}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase text-gray-400">
                          Perpindahan
                        </p>

                        <div className="space-y-3">
                          <LocationBox
                            label="Lokasi Saat Ini"
                            room={selectedPatient.room}
                            bed={selectedPatient.bed}
                            className={selectedPatient.class}
                          />

                          <div className="flex justify-center">
                            <div className="rounded-full bg-gray-100 p-1.5 text-gray-400">
                              <ArrowRight size={15} />
                            </div>
                          </div>

                          <LocationBox
                            label="Lokasi Tujuan"
                            room={selectedBed?.room ?? "-"}
                            bed={selectedBed?.bed ?? "-"}
                            className={selectedBed?.class ?? "-"}
                            highlighted={!!selectedBed}
                          />
                        </div>
                      </div>

                      {/* Reason */}
                      <div>
                        <p className="mb-2 text-xs font-medium uppercase text-gray-400">
                          Alasan
                        </p>

                        <p className="rounded-lg bg-gray-50 px-3 py-3 text-sm text-gray-700">
                          {reason || "Belum dipilih"}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-gray-200 pt-5">
                        <button
                          type="button"
                          onClick={() => setShowConfirm(true)}
                          disabled={!canSubmit}
                          className="w-full rounded-lg bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                        >
                          Konfirmasi Transfer
                        </button>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-blue-600">
                    <FileText size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Informasi
                    </p>

                    <p className="mt-1 text-xs leading-5 text-blue-700">
                      Transfer hanya dapat dilakukan ke tempat tidur dengan
                      status tersedia. Setelah dikonfirmasi, data lokasi
                      pasien akan diperbarui.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selectedPatient && selectedBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Konfirmasi Transfer
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Pastikan lokasi tujuan sudah benar.
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
                <p className="text-xs text-gray-500">Pasien</p>

                <p className="mt-1 font-semibold text-slate-900">
                  {selectedPatient.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {selectedPatient.mrNumber}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 rounded-lg border border-gray-200 p-3">
                  <p className="text-[11px] uppercase text-gray-400">
                    Dari
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {selectedPatient.room}
                  </p>

                  <p className="text-xs text-gray-500">
                    Bed {selectedPatient.bed}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="shrink-0 text-gray-400"
                />

                <div className="flex-1 rounded-lg border border-teal-200 bg-teal-50 p-3">
                  <p className="text-[11px] uppercase text-teal-600">
                    Ke
                  </p>

                  <p className="mt-1 text-sm font-semibold text-teal-800">
                    {selectedBed.room}
                  </p>

                  <p className="text-xs text-teal-700">
                    Bed {selectedBed.bed}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500">Alasan</p>

                <p className="mt-1 text-sm text-slate-800">
                  {reason}
                </p>
              </div>

              {notes && (
                <div>
                  <p className="text-xs text-gray-500">Catatan</p>

                  <p className="mt-1 text-sm text-slate-800">
                    {notes}
                  </p>
                </div>
              )}
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
                onClick={handleConfirmTransfer}
                className="flex-1 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Ya, Transfer
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
              Transfer berhasil
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Lokasi pasien berhasil diperbarui.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StepItem({
  number,
  title,
  active,
  completed,
}: {
  number: number;
  title: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          completed
            ? "bg-teal-600 text-white"
            : active
            ? "bg-teal-600 text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {completed ? <CheckCircle2 size={18} /> : number}
      </div>

      <span
        className={`hidden text-sm font-medium sm:block ${
          active || completed ? "text-slate-900" : "text-gray-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-9 text-sm text-gray-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}

function LocationBox({
  label,
  room,
  bed,
  className,
  highlighted = false,
}: {
  label: string;
  room: string;
  bed: string;
  className: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        highlighted
          ? "border-teal-200 bg-teal-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <p
        className={`text-[11px] uppercase ${
          highlighted ? "text-teal-600" : "text-gray-400"
        }`}
      >
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-900">
        {room}
      </p>

      <p className="mt-1 text-xs text-gray-500">
        Bed {bed} • {className}
      </p>
    </div>
  );
}