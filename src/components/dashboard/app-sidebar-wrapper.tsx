import { createClient } from "@/lib/supabase/server";
import { AppSidebar } from "./app-sidebar";
import prisma from "@/lib/prisma";

export default async function AppSidebarWrapper() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <AppSidebar user={{}} roastResults={[]} />;
  }

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

  return <AppSidebar user={user} roastResults={roastResults} />;
}
