import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin - Nextry",
  description: "Admin Page of Nextry",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //  Supabase client
  const supabase = await createClient();

  // Get logged in users' information
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user then redirect to login
  if (!user) {
    redirect("/login");
  }

  // Get cur
  const currUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currUser || currUser.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return <>{children}</>
}
