"use client";

import { createContext, useContext, useState } from "react";

export type Role =
  | "admin"
  | "dokter"
  | "perawat"
  | "rekam_medis"
  | "admisi_inap"
  | "perawat_inap"
  | "billing_cashier"
  | "insurance_verifier"
  | "billing_supervisor";

type RoleContextType = {
  role: Role;
  setRole: (role: Role) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("perawat"); // Ganti dengan role pengguna yang sesuai

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole harus digunakan di dalam RoleProvider");
  }

  return context;
}