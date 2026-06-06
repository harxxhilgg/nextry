import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Logs - Nextry",
  description: "Access Logs of Nextry",
};

export default async function AccessLogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children
}
