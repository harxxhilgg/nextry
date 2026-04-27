import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testwo - Nextry",
  description: "Testing page of Nextry, I test new things here and use it into main product.",
};

export default function TestwoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
