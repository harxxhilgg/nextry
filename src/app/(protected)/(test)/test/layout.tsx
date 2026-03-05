import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test - Nextry",
  description: "Testing page of Nextry, I test new things here and use it into main product.",
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
