import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roaster - Nextry",
  description: "Roaster page of Nextry",
};

export default function TestGenAILayout({ children }: { children: React.ReactNode }) {
  return children;
};