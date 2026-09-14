"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole, type Role } from "@/app/Context/RoleContext";

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  FileText,
  ClipboardList,
  Bed,
  HeartPulse,
  ClipboardCheck,
  Receipt,
  ShieldCheck,
  CreditCard,
  FileCheck,
} from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const baseMenuByRole: Omit<Record<Role, MenuItem[]>, "admin"> = {
  dokter: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Daftar Kunjungan",
      href: "/kunjungan",
      icon: Users,
    },
    {
      label: "Pemeriksaan Pasien",
      href: "/pemeriksaan",
      icon: Stethoscope,
    },
    {
      label: "Diagnosis ICD-10",
      href: "/emr/diagnosis",
      icon: ClipboardCheck,
    },
    {
      label: "Rencana Pelayanan / Order",
      href: "/emr/order",
      icon: ClipboardList,
    },
    {
      label: "Rawat Inap",
      href: "/rawat-inap",
      icon: Bed,
    },
  ],

  perawat: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Daftar Kunjungan",
      href: "/kunjungan",
      icon: Users,
    },
    {
      label: "Asesmen Awal Keperawatan",
      href: "/keperawatan/asesmen",
      icon: HeartPulse,
    },
    {
      label: "Order Aktif",
      href: "/order",
      icon: ClipboardList,
    },
  ],

  rekam_medis: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Daftar Kunjungan",
      href: "/kunjungan",
      icon: Users,
    },
    {
      label: "Kelengkapan EMR",
      href: "/emr/kelengkapan",
      icon: ClipboardCheck,
    },
    {
      label: "Verifikasi Rekam Medis",
      href: "/emr/verifikasi",
      icon: FileCheck,
    },
    {
      label: "Ringkasan EMR",
      href: "/emr/ringkasan",
      icon: FileText,
    },
  ],

  admisi_inap: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Rencana Rawat Inap",
      href: "/rawat-inap/rencana",
      icon: ClipboardList,
    },
    {
      label: "Ketersediaan Tempat Tidur",
      href: "/rawat-inap/bed",
      icon: Bed,
    },
    {
      label: "Pasien Masuk",
      href: "/rawat-inap/pasien-masuk",
      icon: Users,
    },
  ],

  perawat_inap: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Pasien Masuk",
      href: "/rawat-inap/pasien-masuk",
      icon: Users,
    },
    {
      label: "Asesmen Keperawatan",
      href: "/rawat-inap/asesmen",
      icon: HeartPulse,
    },
    {
      label: "Order Aktif & Monitoring",
      href: "/rawat-inap/monitoring",
      icon: ClipboardList,
    },
    {
      label: "Transfer Bed / Ruang",
      href: "/rawat-inap/transfer",
      icon: Bed,
    },
    {
      label: "Checklist Pemulangan",
      href: "/rawat-inap/pemulangan",
      icon: ClipboardCheck,
    },
  ],

  billing_cashier: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Akun Pasien",
      href: "/billing/akun-pasien",
      icon: Users,
    },
    {
      label: "Billing",
      href: "/billing",
      icon: Receipt,
    },
    {
      label: "Adjustment Request",
      href: "/billing/adjustment",
      icon: ClipboardList,
    },
    {
      label: "Payment",
      href: "/billing/payment",
      icon: CreditCard,
    },
    {
      label: "Invoice & Kuitansi",
      href: "/billing/invoice",
      icon: FileText,
    },
  ],

  insurance_verifier: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Insurance / Coverage",
      href: "/insurance/coverage",
      icon: ShieldCheck,
    },
    {
      label: "Claim",
      href: "/insurance/claim",
      icon: FileCheck,
    },
    {
      label: "Claim Response",
      href: "/insurance/claim-response",
      icon: FileText,
    },
  ],

  billing_supervisor: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Approval Adjustment",
      href: "/billing/approval-adjustment",
      icon: ClipboardCheck,
    },
    {
      label: "Reconciliation & Close",
      href: "/billing/reconciliation",
      icon: Receipt,
    },
    {
      label: "Laporan Billing",
      href: "/billing/laporan",
      icon: FileText,
    },
  ],
};

const menuByRole: Record<Role, MenuItem[]> = {
  ...baseMenuByRole,

  admin: Object.values(baseMenuByRole)
    .flat()
    .filter(
      (item, index, self) =>
        index === self.findIndex((menu) => menu.href === item.href)
    ),
};

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  if (!role) {
    return null;
  }

const menus = menuByRole[role];

  return (
    <aside className="flex min-h-[calc(100vh-4rem)] w-64 flex-col border-r border-gray-200 bg-white">

      {/* Role */}
      <div className="border-b border-gray-200 px-5 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Role
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-800">
          {getRoleLabel(role)}
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 p-4">
        {menus.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={19} strokeWidth={1.8} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function getRoleLabel(role: Role) {
  const labels: Record<Role, string> = {
    admin: "Administrator",
    dokter: "Dokter DPJP",
    perawat: "Perawat",
    rekam_medis: "Petugas Rekam Medis",
    admisi_inap: "Petugas Admisi Rawat Inap",
    perawat_inap: "Perawat Rawat Inap",
    billing_cashier: "Petugas Billing / Kasir",
    insurance_verifier: "Verifikator Penjamin / Klaim",
    billing_supervisor: "Supervisor Billing / Keuangan",
  };

  return labels[role];
}