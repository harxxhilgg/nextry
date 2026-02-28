import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Temp - Nextry",
  description: "Temporary page - Nextry",
};

export default function TempLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
