import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import VisitFilter from "@/components/VisitFilter";
import VisitTable from "@/components/VisitTable";

export default function KunjunganPage() {
  const role = "dokter";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <Sidebar role={role} />

        <main className="flex-1 p-6">
          <PageHeader
            title="Daftar Kunjungan"
            description="Daftar pasien yang terjadwal untuk pelayanan hari ini."
          />

          <VisitFilter />

          <div className="mt-6">
            <VisitTable />
          </div>
        </main>
      </div>
    </div>
  );
}