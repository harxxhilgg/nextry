"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { ChevronRight, Home, SquarePenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AirTrafficControlIcon,
  FlyingSaucerIcon,
  MapPinAreaIcon,
} from "@phosphor-icons/react";
import { UserNav } from "./user-nav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Locations",
    icon: MapPinAreaIcon,
    href: "/locations",
  },
];

interface AppSidebarProps {
  user: {
    email?: string;
    user_metadata?: {
      avatar_url?: string;
      full_name?: string;
    };
  };
  roastResults: {
    id: string;
    name: string;
    intensity: string;
    createdAt: Date;
  }[];
}

export function AppSidebar({ user, roastResults }: AppSidebarProps) {
  const pathname = usePathname();

  const hasRoastResults = roastResults.length > 0;

  return (
    <Sidebar collapsible="icon" variant="floating" side="left">
      <SidebarHeader className="transition-all">
        <Link
          href="/dashboard"
          className="flex items-center group-data-[collapsible=icon]:justify-center p-2 gapk-2 mt-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-black/10 hover:dark:bg-white/10 text-secondary hover:text-primary"
        >
          <FlyingSaucerIcon
            className="group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-4"
            size={24}
            color="currentColor"
          />

          <p className="font-semibold text-primary group-data-[collapsible=icon]:hidden ml-2">
            Saucer.
          </p>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton isActive={pathname === item.href} asChild>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible
                defaultOpen={pathname.startsWith("/roaster")}
                asChild
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="group flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <AirTrafficControlIcon className="h-4 w-4" />
                        <span>Roaster</span>
                      </div>

                      <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/roaster"}
                        >
                          <Link href="/roaster">
                            <SquarePenIcon />
                            New roast
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>

                      <p className="px-2 text-secondary font-semibold text-xs mt-1">
                        {hasRoastResults ? "History" : "No history yet"}
                      </p>

                      <div className="max-h-100 overflow-y-auto pr-1">
                        {roastResults.map((item) => {
                          function formatDate(date: Date) {
                            const d = new Date(date);

                            return d.toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            });
                          }

                          return (
                            <SidebarMenuSubItem
                              key={item.id}
                              className="my-0.5"
                            >
                              <SidebarMenuSubButton
                                isActive={pathname === `/roaster/${item.id}`}
                                asChild
                              >
                                <Link href={`/roaster/${item.id}`}>
                                  <div className="flex gap-1 w-full items-end justify-between">
                                    <span className="truncate">
                                      {item.name}
                                    </span>

                                    <span className="text-[11px] text-muted-foreground">
                                      {formatDate(item.createdAt)}
                                    </span>
                                  </div>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </div>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserNav user={user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
