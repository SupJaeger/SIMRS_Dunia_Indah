export type UserRole =
  | "admin"
  | "dokter"
  | "perawat"
  | "rekam_medis"
  | "admisi_inap"
  | "perawat_inap"
  | "billing_cashier"
  | "insurance_verifier"
  | "billing_supervisor";

export type DummyUser = {
  username: string;
  password: string;
  name: string;
  role: UserRole;
};

export const dummyUsers: DummyUser[] = [
  {
    username: "admin",
    password: "123",
    name: "Admin",
    role: "admin",
  },
  {
    username: "dokter",
    password: "123",
    name: "Dokter",
    role: "dokter",
  },
  {
    username: "perawat",
    password: "123",
    name: "Perawat",
    role: "perawat",
  },
  {
    username: "rekam_medis",
    password: "123",
    name: "Rekam Medis",
    role: "rekam_medis",
  },
  {
    username: "admisi_inap",
    password: "123",
    name: "Admisi Inap",
    role: "admisi_inap",
  },
  {
    username: "perawat_inap",
    password: "123",
    name: "Perawat Inap",
    role: "perawat_inap",
  },
  {
    username: "billing_cashier",
    password: "123",
    name: "Billing Cashier",
    role: "billing_cashier",
  },
  {
    username: "insurance_verifier",
    password: "123",
    name: "Insurance Verifier",
    role: "insurance_verifier",
  },
  {
    username: "billing_supervisor",
    password: "123",
    name: "Billing Supervisor",
    role: "billing_supervisor",
  },
];