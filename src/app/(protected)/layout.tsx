import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components/dashboard/page-title";
import { SidebarTriggerBtn } from "@/components/dashboard/sidebar-trigger";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar user={user} />

        <main className="flex-1">
          <div className="flex h-14 items-center border-b px-1">
            <SidebarTriggerBtn />

            <Separator orientation="vertical" className="ml-2 mr-3 h-6" />

            <PageTitle />
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
