import type { Metadata } from "next";
import "./globals.css";
import {RoleProvider} from "./Context/RoleContext";

export const metadata: Metadata = {
  title: "SIMRS Dunia Indah",
  description: "Sistem Informasi Manajemen Rumah Sakit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <RoleProvider>
          {children}
        </RoleProvider>
      </body>
    </html>
  );
}