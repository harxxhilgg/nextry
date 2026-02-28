"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  CreditCard,
  Bell,
  LogOut,
  UserRound,
  ChevronsUpDownIcon,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";
import { ThemeToggleClient } from "../nav/theme-toggle-client";
import { useState } from "react";

interface UserNavProps {
  user: {
    email?: string;
    user_metadata?: {
      avatar_url?: string;
      full_name?: string;
    };
  };
}

export function UserNav({ user }: UserNavProps) {
  const supabase = createClient();
  const router = useRouter();
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out: ", error);
      return;
    }

    setShowLogoutDialog(false);
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton className="h-auto py-2 cursor-pointer group-data-[collapsible=icon]:justify-center">
          <div className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="group-data-[collapsible=icon]:-left-2 h-8 w-8 rounded-md shrink-0">
                <AvatarImage src={user.user_metadata?.avatar_url} />

                <AvatarFallback>
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col items-start text-left group-data-[collapsible=icon]:hidden">
                <span className="text-sm font-medium">
                  {user.user_metadata?.full_name || "User"}
                </span>

                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>

            <ChevronsUpDownIcon
              size={15}
              className="text-muted-foreground group-data-[collapsible=icon]:hidden"
            />
          </div>
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start" className="mb-3 w-60">
        <DropdownMenuLabel>
          <div className="flex justify-between items-center">
            <Avatar className="h-8 w-8 rounded-md opacity">
              <AvatarImage src={user.user_metadata?.avatar_url} />

              <AvatarFallback>
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium">
                {user.user_metadata?.full_name || "User"}
              </span>

              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>

            <ThemeToggleClient />
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/billing">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/notifications">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the home page and will need to log in
              again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleLogout}>
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
}
