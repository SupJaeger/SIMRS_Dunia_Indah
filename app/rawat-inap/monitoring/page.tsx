"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  HeartPulse,
  Plus,
  Search,
  Stethoscope,
  User,
  X,
} from "lucide-react";

type PatientStatus = "MONITORING" | "STABIL";

type OrderStatus = "AKTIF" | "SELESAI" | "TERTUNDA";

type OrderType =
  | "OBAT"
  | "TINDAKAN"
  | "LABORATORIUM"
  | "RADIOLOGI"
  | "DIET";

type Order = {
  id: number;
  type: OrderType;
  name: string;
  instruction: string;
  frequency: string;
  doctor: string;
  startDate: string;
  status: OrderStatus;
};

type Monitoring = {
  id: number;
  date: string;
  time: string;
  temperature: string;
  bloodPressure: string;
  pulse: string;
  respiratoryRate: string;
  oxygenSaturation: string;
  painScale: string;
  condition: string;
  nurse: string;
};

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
  status: PatientStatus;
  orders: Order[];
  monitoring: Monitoring[];
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
    status: "MONITORING",
    orders: [
      {
        id: 1,
        type: "OBAT",
        name: "Paracetamol 500 mg",
        instruction: "1 tablet per oral",
        frequency: "3 x 1",
        doctor: "dr. Budi Santoso",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
      {
        id: 2,
        type: "OBAT",
        name: "Infus NaCl 0.9%",
        instruction: "20 tpm IV",
        frequency: "Kontinu",
        doctor: "dr. Budi Santoso",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
      {
        id: 3,
        type: "TINDAKAN",
        name: "Monitoring TTV",
        instruction: "Pantau tanda-tanda vital",
        frequency: "Tiap 4 jam",
        doctor: "dr. Budi Santoso",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
      {
        id: 4,
        type: "DIET",
        name: "Diet Lunak",
        instruction: "Diet lunak sesuai toleransi",
        frequency: "3 x sehari",
        doctor: "dr. Budi Santoso",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
    ],
    monitoring: [
      {
        id: 1,
        date: "15 Sep 2026",
        time: "12:00",
        temperature: "36.8",
        bloodPressure: "120/80",
        pulse: "82",
        respiratoryRate: "20",
        oxygenSaturation: "98",
        painScale: "2",
        condition: "Pasien sadar, kondisi umum baik.",
        nurse: "Ns. Sari",
      },
      {
        id: 2,
        date: "15 Sep 2026",
        time: "08:00",
        temperature: "36.7",
        bloodPressure: "118/78",
        pulse: "80",
        respiratoryRate: "19",
        oxygenSaturation: "98",
        painScale: "2",
        condition: "Pasien sadar penuh, tidak ada keluhan berat.",
        nurse: "Ns. Sari",
      },
    ],
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
    status: "MONITORING",
    orders: [
      {
        id: 5,
        type: "OBAT",
        name: "Omeprazole 20 mg",
        instruction: "1 kapsul per oral",
        frequency: "1 x 1",
        doctor: "dr. Rina Amelia",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
      {
        id: 6,
        type: "OBAT",
        name: "Ondansetron 4 mg",
        instruction: "1 tablet per oral",
        frequency: "2 x 1",
        doctor: "dr. Rina Amelia",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
      {
        id: 7,
        type: "LABORATORIUM",
        name: "Pemeriksaan Darah Lengkap",
        instruction: "Ambil sampel darah",
        frequency: "Sekali",
        doctor: "dr. Rina Amelia",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
    ],
    monitoring: [
      {
        id: 3,
        date: "15 Sep 2026",
        time: "11:30",
        temperature: "37.1",
        bloodPressure: "125/82",
        pulse: "88",
        respiratoryRate: "20",
        oxygenSaturation: "97",
        painScale: "3",
        condition: "Pasien mengeluh mual ringan.",
        nurse: "Ns. Dewi",
      },
    ],
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
    status: "STABIL",
    orders: [
      {
        id: 8,
        type: "OBAT",
        name: "Amlodipine 10 mg",
        instruction: "1 tablet per oral",
        frequency: "1 x 1",
        doctor: "dr. Andi Wijaya",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
      {
        id: 9,
        type: "TINDAKAN",
        name: "Monitoring Tekanan Darah",
        instruction: "Pantau tekanan darah",
        frequency: "Tiap 6 jam",
        doctor: "dr. Andi Wijaya",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
    ],
    monitoring: [
      {
        id: 4,
        date: "15 Sep 2026",
        time: "10:00",
        temperature: "36.6",
        bloodPressure: "130/84",
        pulse: "76",
        respiratoryRate: "18",
        oxygenSaturation: "98",
        painScale: "1",
        condition: "Kondisi pasien stabil.",
        nurse: "Ns. Rudi",
      },
    ],
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
    status: "STABIL",
    orders: [
      {
        id: 10,
        type: "OBAT",
        name: "Ceftriaxone 1 g",
        instruction: "1 g IV",
        frequency: "2 x sehari",
        doctor: "dr. Budi Santoso",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
      {
        id: 11,
        type: "OBAT",
        name: "Paracetamol 500 mg",
        instruction: "1 tablet per oral",
        frequency: "3 x 1",
        doctor: "dr. Budi Santoso",
        startDate: "15 Sep 2026",
        status: "AKTIF",
      },
    ],
    monitoring: [
      {
        id: 5,
        date: "15 Sep 2026",
        time: "09:30",
        temperature: "36.9",
        bloodPressure: "116/76",
        pulse: "78",
        respiratoryRate: "18",
        oxygenSaturation: "99",
        painScale: "1",
        condition: "Pasien sadar dan kooperatif.",
        nurse: "Ns. Sari",
      },
    ],
  },
];

const emptyMonitoring = {
  temperature: "",
  systolic: "",
  diastolic: "",
  pulse: "",
  respiratoryRate: "",
  oxygenSaturation: "",
  painScale: "",
  condition: "",
};

export default function OrderAktifPage() {
  const [patients, setPatients] =
    useState<Patient[]>(initialPatients);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "SEMUA" | PatientStatus
  >("SEMUA");

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [activeTab, setActiveTab] = useState<
    "ORDER" | "MONITORING"
  >("ORDER");

  const [showMonitoringForm, setShowMonitoringForm] =
    useState(false);

  const [monitoringForm, setMonitoringForm] =
    useState(emptyMonitoring);

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

  const monitoringCount = patients.filter(
    (patient) => patient.status === "MONITORING"
  ).length;

  const stableCount = patients.filter(
    (patient) => patient.status === "STABIL"
  ).length;

  const activeOrderCount = patients.reduce(
    (total, patient) =>
      total +
      patient.orders.filter(
        (order) => order.status === "AKTIF"
      ).length,
    0
  );

  const openPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setActiveTab("ORDER");
  };

  const closePatient = () => {
    setSelectedPatient(null);
    setShowMonitoringForm(false);
    setMonitoringForm(emptyMonitoring);
  };

  const updateMonitoring = (
    field: keyof typeof emptyMonitoring,
    value: string
  ) => {
    setMonitoringForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveMonitoring = () => {
    if (!selectedPatient) return;

    const now = new Date();

    const time = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMonitoring: Monitoring = {
      id: Date.now(),
      date: "15 Sep 2026",
      time,
      temperature: monitoringForm.temperature,
      bloodPressure: `${monitoringForm.systolic}/${monitoringForm.diastolic}`,
      pulse: monitoringForm.pulse,
      respiratoryRate:
        monitoringForm.respiratoryRate,
      oxygenSaturation:
        monitoringForm.oxygenSaturation,
      painScale: monitoringForm.painScale,
      condition: monitoringForm.condition,
      nurse: "Ns. Perawat",
    };

    setPatients((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === selectedPatient.id
          ? {
              ...patient,
              monitoring: [
                newMonitoring,
                ...patient.monitoring,
              ],
            }
          : patient
      )
    );

    setSelectedPatient((current) =>
      current
        ? {
            ...current,
            monitoring: [
              newMonitoring,
              ...current.monitoring,
            ],
          }
        : current
    );

    setMonitoringForm(emptyMonitoring);
    setShowMonitoringForm(false);
    setActiveTab("MONITORING");
    setShowSuccess(true);
  };

  const getOrderTypeStyle = (type: OrderType) => {
    switch (type) {
      case "OBAT":
        return "bg-blue-50 text-blue-700";
      case "TINDAKAN":
        return "bg-teal-50 text-teal-700";
      case "LABORATORIUM":
        return "bg-purple-50 text-purple-700";
      case "RADIOLOGI":
        return "bg-orange-50 text-orange-700";
      case "DIET":
        return "bg-green-50 text-green-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  const getOrderTypeLabel = (type: OrderType) => {
    switch (type) {
      case "OBAT":
        return "Obat";
      case "TINDAKAN":
        return "Tindakan";
      case "LABORATORIUM":
        return "Laboratorium";
      case "RADIOLOGI":
        return "Radiologi";
      case "DIET":
        return "Diet";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Order Aktif & Monitoring
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Pantau order pelayanan dan kondisi pasien rawat
              inap.
            </p>
          </div>

          {/* Summary */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
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
                  <User
                    size={22}
                    className="text-blue-600"
                  />
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("MONITORING")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "MONITORING"
                  ? "border-yellow-500 ring-2 ring-yellow-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Perlu Monitoring
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {monitoringCount}
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
              onClick={() => setStatusFilter("STABIL")}
              className={`rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow ${
                statusFilter === "STABIL"
                  ? "border-green-500 ring-2 ring-green-100"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Kondisi Stabil
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {stableCount}
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

            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Order Aktif
                  </p>

                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {activeOrderCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50">
                  <ClipboardList
                    size={22}
                    className="text-teal-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Patient Table */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Daftar Pasien Rawat Inap
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Pilih pasien untuk melihat order aktif dan
                    riwayat monitoring.
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

            <div className="overflow-x-auto">
              <table className="w-full min-w-237.5">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Pasien
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Kamar / Bed
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      DPJP
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Order Aktif
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Monitoring Terakhir
                    </th>

                    <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Kondisi
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => {
                    const activeOrders =
                      patient.orders.filter(
                        (order) => order.status === "AKTIF"
                      ).length;

                    const latestMonitoring =
                      patient.monitoring[0];

                    return (
                      <tr
                        key={patient.id}
                        className="transition hover:bg-gray-50"
                      >
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
                                {patient.age} tahun
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-gray-800">
                            {patient.room}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            Bed {patient.bed}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm text-gray-700">
                            {patient.doctor}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-center">
                          <span className="inline-flex rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-700">
                            {activeOrders} order
                          </span>
                        </td>

                        <td className="px-5 py-4 text-center">
                          {latestMonitoring ? (
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {latestMonitoring.time}
                              </p>

                              <p className="text-xs text-gray-500">
                                {latestMonitoring.date}
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              Belum ada
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-center">
                          {patient.status === "MONITORING" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700">
                              <Activity size={13} />
                              Monitoring
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                              <CheckCircle2 size={13} />
                              Stabil
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              openPatient(patient)
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                          >
                            Lihat Detail
                            <ChevronRight size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

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

          {/* Info */}
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
                  Monitoring Keperawatan
                </h3>

                <p className="mt-1 text-sm leading-6 text-blue-800">
                  Perawat dapat melihat order pelayanan yang
                  masih aktif dan mencatat hasil monitoring
                  kondisi pasien secara berkala.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-4">
          <div className="mx-auto my-6 w-full max-w-6xl rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Detail Pasien Rawat Inap
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Order aktif dan monitoring keperawatan.
                </p>
              </div>

              <button
                type="button"
                onClick={closePatient}
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 font-semibold text-teal-700">
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

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("ORDER")}
                  className={`border-b-2 px-1 py-4 text-sm font-medium transition ${
                    activeTab === "ORDER"
                      ? "border-teal-600 text-teal-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <ClipboardList size={17} />
                    Order Aktif
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("MONITORING")}
                  className={`border-b-2 px-1 py-4 text-sm font-medium transition ${
                    activeTab === "MONITORING"
                      ? "border-teal-600 text-teal-700"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <Activity size={17} />
                    Monitoring
                  </span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="px-6 py-6">
              {activeTab === "ORDER" ? (
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Order Pelayanan Aktif
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Daftar order yang masih aktif untuk
                        pasien.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedPatient.orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-xl border border-gray-200 p-4"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getOrderTypeStyle(
                                order.type
                              )}`}
                            >
                              {order.type === "OBAT" ? (
                                <HeartPulse size={18} />
                              ) : order.type ===
                                "TINDAKAN" ? (
                                <Stethoscope size={18} />
                              ) : (
                                <ClipboardList size={18} />
                              )}
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-medium text-gray-900">
                                  {order.name}
                                </h4>

                                <span
                                  className={`rounded-full px-2 py-1 text-[11px] font-medium ${getOrderTypeStyle(
                                    order.type
                                  )}`}
                                >
                                  {getOrderTypeLabel(
                                    order.type
                                  )}
                                </span>
                              </div>

                              <p className="mt-1 text-sm text-gray-600">
                                {order.instruction}
                              </p>

                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                                <span>
                                  Frekuensi:{" "}
                                  <strong className="font-medium text-gray-700">
                                    {order.frequency}
                                  </strong>
                                </span>

                                <span>
                                  Mulai:{" "}
                                  <strong className="font-medium text-gray-700">
                                    {order.startDate}
                                  </strong>
                                </span>

                                <span>
                                  Oleh:{" "}
                                  <strong className="font-medium text-gray-700">
                                    {order.doctor}
                                  </strong>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            {order.status === "AKTIF" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                                <CheckCircle2 size={13} />
                                Aktif
                              </span>
                            ) : order.status === "TERTUNDA" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-medium text-yellow-700">
                                <Clock3 size={13} />
                                Tertunda
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                                Selesai
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Monitoring Keperawatan
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Riwayat hasil monitoring kondisi pasien.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowMonitoringForm(true)
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                    >
                      <Plus size={17} />
                      Tambah Monitoring
                    </button>
                  </div>

                  {/* Monitoring Form */}
                  {showMonitoringForm && (
                    <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50/40 p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Input Monitoring Baru
                          </h4>

                          <p className="mt-1 text-xs text-gray-500">
                            Catat kondisi pasien saat
                            pemeriksaan.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setShowMonitoringForm(false)
                          }
                          className="rounded-lg p-2 text-gray-400 hover:bg-white hover:text-gray-600"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <InputField
                          label="Suhu"
                          value={monitoringForm.temperature}
                          onChange={(value) =>
                            updateMonitoring(
                              "temperature",
                              value
                            )
                          }
                          placeholder="36.7"
                          suffix="°C"
                        />

                        <InputField
                          label="Sistolik"
                          value={monitoringForm.systolic}
                          onChange={(value) =>
                            updateMonitoring(
                              "systolic",
                              value
                            )
                          }
                          placeholder="120"
                          suffix="mmHg"
                        />

                        <InputField
                          label="Diastolik"
                          value={monitoringForm.diastolic}
                          onChange={(value) =>
                            updateMonitoring(
                              "diastolic",
                              value
                            )
                          }
                          placeholder="80"
                          suffix="mmHg"
                        />

                        <InputField
                          label="Nadi"
                          value={monitoringForm.pulse}
                          onChange={(value) =>
                            updateMonitoring(
                              "pulse",
                              value
                            )
                          }
                          placeholder="80"
                          suffix="x/menit"
                        />

                        <InputField
                          label="Frekuensi Napas"
                          value={
                            monitoringForm.respiratoryRate
                          }
                          onChange={(value) =>
                            updateMonitoring(
                              "respiratoryRate",
                              value
                            )
                          }
                          placeholder="20"
                          suffix="x/menit"
                        />

                        <InputField
                          label="Saturasi Oksigen"
                          value={
                            monitoringForm.oxygenSaturation
                          }
                          onChange={(value) =>
                            updateMonitoring(
                              "oxygenSaturation",
                              value
                            )
                          }
                          placeholder="98"
                          suffix="%"
                        />

                        <InputField
                          label="Skala Nyeri"
                          value={monitoringForm.painScale}
                          onChange={(value) =>
                            updateMonitoring(
                              "painScale",
                              value
                            )
                          }
                          placeholder="0 - 10"
                        />

                        <div className="sm:col-span-2">
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Kondisi / Catatan
                          </label>

                          <textarea
                            rows={3}
                            value={monitoringForm.condition}
                            onChange={(event) =>
                              updateMonitoring(
                                "condition",
                                event.target.value
                              )
                            }
                            placeholder="Tuliskan kondisi pasien..."
                            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setShowMonitoringForm(false)
                          }
                          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          Batal
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveMonitoring}
                          className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
                        >
                          <CheckCircle2 size={17} />
                          Simpan Monitoring
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Latest Monitoring */}
                  <div className="space-y-3">
                    {selectedPatient.monitoring.map(
                      (monitoring, index) => (
                        <div
                          key={monitoring.id}
                          className="rounded-xl border border-gray-200 p-5"
                        >
                          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50">
                                  <HeartPulse
                                    size={16}
                                    className="text-teal-600"
                                  />
                                </div>

                                <p className="font-medium text-gray-900">
                                  Monitoring{" "}
                                  {index === 0
                                    ? "Terbaru"
                                    : "Sebelumnya"}
                                </p>
                              </div>

                              <p className="mt-1 text-xs text-gray-500">
                                {monitoring.date} •{" "}
                                {monitoring.time} •{" "}
                                {monitoring.nurse}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                            <VitalCard
                              label="Suhu"
                              value={`${monitoring.temperature} °C`}
                            />

                            <VitalCard
                              label="Tekanan Darah"
                              value={`${monitoring.bloodPressure} mmHg`}
                            />

                            <VitalCard
                              label="Nadi"
                              value={`${monitoring.pulse} x/menit`}
                            />

                            <VitalCard
                              label="Napas"
                              value={`${monitoring.respiratoryRate} x/menit`}
                            />

                            <VitalCard
                              label="SpO₂"
                              value={`${monitoring.oxygenSaturation}%`}
                            />

                            <VitalCard
                              label="Nyeri"
                              value={`${monitoring.painScale}/10`}
                            />

                            <VitalCard
                              label="Kondisi"
                              value={monitoring.condition}
                              wide
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={closePatient}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
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
                Monitoring berhasil disimpan
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Data monitoring pasien telah ditambahkan.
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
   Reusable Components
========================= */

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suffix?: string;
};

function InputField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition ${
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

type VitalCardProps = {
  label: string;
  value: string;
  wide?: boolean;
};

function VitalCard({
  label,
  value,
  wide,
}: VitalCardProps) {
  return (
    <div
      className={`rounded-lg bg-gray-50 p-3 ${
        wide ? "col-span-2 sm:col-span-4 lg:col-span-1" : ""
      }`}
    >
      <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );
}