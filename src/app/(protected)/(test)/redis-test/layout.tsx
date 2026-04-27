import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reids Test - Nextry",
  description: "Redis Testing page of Nextry, Im testing redis here.",
};

export default function RedisTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
