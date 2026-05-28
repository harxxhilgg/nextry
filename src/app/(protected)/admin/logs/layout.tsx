import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Logs - Nextry",
  description: "Security Logs of Nextry",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children
}
