import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banned - Nextry",
  description: "Banned from Nextry",
};


export default function BannedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
