"use client";

import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRole, type Role } from "@/app/Context/RoleContext";

export default function Header() {
  const { role } = useRole();
  return (
    <header className="h-16 w-full border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">

        {/* =========================
            LEFT - SYSTEM IDENTITY
        ========================== */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="relative h-14 w-14 shrink-0">
            {/* Logo */}
            <Image
              src="/Logo.jpeg"
              alt="Logo Rumah Sakit"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </div>

          {/* Hospital Name */}
          <div>
            <h1 className="text-base font-semibold text-slate-900">
              RS Dunia Indah
            </h1>

            <p className="text-xs text-gray-500">
              Sistem Informasi Manajemen Rumah Sakit
            </p>
          </div>
        </div>


        {/* =========================
            RIGHT - USER AREA
        ========================== */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100"
            aria-label="Notifikasi"
          >
            <Bell size={20} />

            {/* Notification Badge */}
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              3
            </span>
          </button>


          {/* Divider */}
          <div className="h-8 w-px bg-gray-200" />


          {/* User */}
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-gray-50"
          >

            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100">
              <User size={18} className="text-teal-700" />
            </div>

            {/* User Information */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-slate-900">
                dr. Deta Jevnia Baene, Sp. BS
              </p>

              <p className="text-xs text-gray-500">
                {getRoleLabel(role)}
              </p>
            </div>

            <ChevronDown
              size={16}
              className="text-gray-400"
            />
          </button>

        </div>
      </div>
    </header>
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
