"use client";

import { useState } from "react";
import { Bell, ChevronDown, LogOut, User, Settings } from "lucide-react";
import Image from "next/image";
import { useRole, type Role } from "@/app/Context/RoleContext";

export default function Header() {
  const { role, logout } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  
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


          {/* User Area */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
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
                  {role ? getRoleLabel(role) : "Belum login"}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                
                {/* Profile */}
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-slate-900">
                    dr. Deta Jevnia Baene, Sp. BS
                  </p>
                  <p className="text-xs text-gray-500">
                    {role ? getRoleLabel(role) : "Belum login"}
                  </p>
                </div>

                <div className="my-1 border-t border-gray-100" />

                {/* Profile Button */}
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <User size={17} />
                  Profil Saya
                </button>

                {/* Settings Button */}
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <Settings size={17} />
                  Pengaturan
                </button>

                <div className="my-1 border-t border-gray-100" />

                {/* Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            )}
          </div>

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
