import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
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

  return (
    <StoreProvider initialUser={serializedUser}>
      <SidebarProvider>
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
