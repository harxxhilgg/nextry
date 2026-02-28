import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations - Nextry",
  description: "Locations page - Nextry",
};

export default function LocationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
