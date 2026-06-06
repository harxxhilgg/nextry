import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Nextry",
  description: "Contact Page of Nextry",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
