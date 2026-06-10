import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized - Nextry",
  description: "Unauthorized access - Nextry",
};


export default function UnauthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
