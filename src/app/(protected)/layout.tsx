import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import { WarningBanner } from "@/components/main/warning-banner";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components/dashboard/page-title";
import { SidebarTriggerBtn } from "@/components/dashboard/sidebar-trigger";
import AppSidebarWrapper from "@/components/dashboard/app-sidebar-wrapper";
import StoreProvider from "@/lib/store/StoreProvider";

async function ProtectedContent({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }


  const serializedUser = {
    id: user.id,
    email: user.email || null,
    user_metadata: user.user_metadata || null,
    created_at: user.created_at || null,
  };

  const dbUser = await prisma.user.findFirst({
    where: user.email
      ? {
        OR: [
          { id: user.id },
          { email: { equals: user.email, mode: "insensitive" } },
        ],
      }
      : { id: user.id },
    select: { warningCount: true, isBanned: true },
  });

  if (!dbUser) {
    redirect("/unauthorized");
  }

  if (dbUser?.isBanned) {
    redirect("/banned");
  }

  const warningCount = dbUser?.warningCount ?? 0;

  return (
    <StoreProvider initialUser={serializedUser}>
      <SidebarProvider>
        <WarningBanner warningCount={warningCount} />
        <div className="flex min-h-screen w-full">
          <AppSidebarWrapper />

          <main className="flex-1">
            <div className="flex h-14 items-center border-b px-1">
              <SidebarTriggerBtn />

              <Separator orientation="vertical" className="ml-1 mr-3 h-6" />

              <PageTitle />
            </div>

            <div className="p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </StoreProvider>
  );
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <ProtectedContent>{children}</ProtectedContent>
    </Suspense>
  );
};
