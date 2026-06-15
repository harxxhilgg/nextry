import { NotWorkingToast } from "@/components/roaster/not-working-toast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Roast - Nextry",
  description: "Roaster page of Nextry",
};

export default function TestGenAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NotWorkingToast />

      {children}
    </>
  );
}
