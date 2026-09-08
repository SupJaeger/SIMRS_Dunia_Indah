type Visit = {
  id: number;
  patient: string;
  medicalRecord: string;
  clinic: string;
  time: string;
  status: "Menunggu" | "Dalam Pemeriksaan" | "Selesai";
};

const visits: Visit[] = [
  {
    id: 1,
    patient: "Budi Santoso",
    medicalRecord: "RM00123",
    clinic: "Penyakit Dalam",
    time: "08:00",
    status: "Menunggu",
  },
  {
    id: 2,
    patient: "Siti Aminah",
    medicalRecord: "RM00124",
    clinic: "Penyakit Dalam",
    time: "08:30",
    status: "Dalam Pemeriksaan",
  },
  {
    id: 3,
    patient: "Andi Wijaya",
    medicalRecord: "RM00125",
    clinic: "Penyakit Dalam",
    time: "09:00",
    status: "Selesai",
  },
  {
    id: 4,
    patient: "Rina Lestari",
    medicalRecord: "RM00126",
    clinic: "Penyakit Dalam",
    time: "09:30",
    status: "Menunggu",
  },
];

export default function VisitTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Table Header */}
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          Kunjungan Hari Ini
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Daftar pasien yang terjadwal untuk pemeriksaan.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">
                Pasien
              </th>

              <th className="px-5 py-3 font-medium">
                No. RM
              </th>

              <th className="px-5 py-3 font-medium">
                Poli
              </th>

              <th className="px-5 py-3 font-medium">
                Jam
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 text-right font-medium">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {visits.map((visit) => (
              <tr
                key={visit.id}
                className="hover:bg-gray-50"
              >
                <td className="px-5 py-4 font-medium text-gray-900">
                  {visit.patient}
                </td>

                <td className="px-5 py-4 font-mono text-sm text-gray-600">
                  {visit.medicalRecord}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {visit.clinic}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {visit.time}
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={visit.status} />
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    className="font-medium text-teal-600 hover:text-teal-700"
                  >
                    Lihat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Visit["status"];
}) {
  const styles = {
    Menunggu: "bg-yellow-50 text-yellow-700",
    "Dalam Pemeriksaan": "bg-blue-50 text-blue-700",
    Selesai: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}