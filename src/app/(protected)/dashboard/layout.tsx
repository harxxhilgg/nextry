import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Nextry",
  description: "Dashboard page - Nextry",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
