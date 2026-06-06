import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Action Logs - Nextry",
  description: "Action Logs of Nextry",
};

export default async function ActionLogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children
}
