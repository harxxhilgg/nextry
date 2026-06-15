import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Nextry",
  description: "Login page - Nextry",
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
