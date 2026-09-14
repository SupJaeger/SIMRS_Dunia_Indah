"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

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
  role: Role | null;
  setRole: (role: Role | null) => void;
  logout: () => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);

  const logout = () => {
    setRole(null);
  };

  console.log("RoleContext:", role);

  return (
    <RoleContext.Provider value={{ role, setRole, logout }}>
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