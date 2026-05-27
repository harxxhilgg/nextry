import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cache Test - Nextry",
  description: "Cache Testing page of Nextry, Im testing redis here.",
};

export default function CacheTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
