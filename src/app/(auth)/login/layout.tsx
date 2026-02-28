import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Nextry",
  description: "Login page - Nextry",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
