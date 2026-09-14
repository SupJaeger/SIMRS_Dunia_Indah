import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";
import VisitTable from "@/components/VisitTable";

export default function Home() {

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">
            <PageHeader
              title="Dashboard"
              description="Ringkasan aktivitas pelayanan Anda hari ini."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <StatCard
                title="Pasien Hari Ini"
                value="24"
                description="Total kunjungan hari ini"
              />

              <StatCard
                title="Menunggu Pemeriksaan"
                value="8"
                description="Pasien menunggu"
              />

              <StatCard
                title="EMR Belum Lengkap"
                value="5"
                description="Perlu ditindaklanjuti"
              />
            </div>
            {/* Visits */}
            <div className="mt-6">
              <VisitTable />
            </div>
          </main>
        </div>
      </div>
  );
}