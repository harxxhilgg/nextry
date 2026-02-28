import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Nextry",
  description: "Profile page - Nextry",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
