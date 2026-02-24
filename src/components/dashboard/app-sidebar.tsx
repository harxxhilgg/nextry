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
} from "../ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AirTrafficControlIcon, FlyingSaucerIcon, MapPinAreaIcon, UserIcon } from "@phosphor-icons/react";
import { UserNav } from "./user-nav";

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
  {
    title: "Gen AI",
    icon: AirTrafficControlIcon,
    href: "/gen-ai",
  },
  {
    title: "Profile",
    icon: UserIcon,
    href: "/profile",
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
}

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="floating" side="left">
      <SidebarHeader className="transition-all">
        <Link
          href="/dashboard"
          className="flex items-center group-data-[collapsible=icon]:justify-center p-2 gapk-2 mt-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-black/10 hover:dark:bg-white/10 text-secondary hover:text-primary"
        >
          <FlyingSaucerIcon
            className="group-data-[collapsible=icon]:w-6 group-data-[collapsible=icon]:h-6"
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
