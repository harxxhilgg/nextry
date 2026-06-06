import { createClient } from "@/lib/supabase/server";
import { AppSidebar } from "./app-sidebar";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AppSidebarWrapper() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AppSidebar user={{}} roastResults={[]} />;
  }

  const currUser = await prisma.user.findFirst({
    where: user.email
      ? {
        OR: [
          { id: user.id },
          { email: { equals: user.email, mode: "insensitive" } },
        ],
      }
      : { id: user.id },
  });

  if (!currUser) {
    redirect("/unauthorized");
  }

  const isAdmin = currUser.role === "ADMIN";

  const roastResults = await prisma.roastResult.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      name: true,
      intensity: true,
      createdAt: true,
    },
  });

  return <AppSidebar user={user} roastResults={roastResults} isAdmin={isAdmin} />;
}
