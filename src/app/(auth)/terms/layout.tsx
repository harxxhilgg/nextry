import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Nextry",
  description: "Terms of Service of Nextry",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
