"use client";

import { forceLogoutUser } from "@/app/(protected)/admin/actions";
import { permBanUser, warnUser } from "@/app/(protected)/admin/actions";
import { getUserById } from "@/app/(protected)/admin/logs/actions";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogItem } from "./admin-access-dropdown";
import React, { useState, useTransition } from "react";
import { UserRound } from "lucide-react";
import { LockIcon, SignOutIcon, WarningIcon, XIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

export function AccessDrawer({
  log,
  children,
  open,
  onOpenChange,
}: {
  log: LogItem;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (nextOpen: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const drawerOpen = isControlled ? open : internalOpen;
  const setDrawerOpen = onOpenChange ?? setInternalOpen;
  const [userResult, setUserResult] = useState<{
    userId: string;
    email: string | null;
    name: string | null;
    avatarUrl: string | null;
    role: string | null;
    createdAt: string | null;
    lastLoginAt: string | null;
    loginCount: number | null;
    error: string | null;
  } | null>(null);
  const [loadedUserId, setLoadedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const targetUserId = log.userId;

  React.useEffect(() => {
    if (!drawerOpen || !log.userId) return;
    if (loadedUserId === log.userId) return;

    let isActive = true;
    setIsLoading(true);
    setUserResult(null);

    getUserById(log.userId)
      .then((result) => {
        if (!isActive) return;
        setUserResult(result);
        setLoadedUserId(log.userId);
      })
      .catch(() => {
        if (!isActive) return;
        setUserResult({
          userId: log.userId ?? "",
          email: null,
          name: null,
          avatarUrl: null,
          role: null,
          createdAt: null,
          lastLoginAt: null,
          loginCount: null,
          error: "Failed to load user.",
        });
        setLoadedUserId(log.userId);
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [drawerOpen, log.userId, loadedUserId]);

  const displayName = userResult?.name || userResult?.email || "User";

  const createdAtLabel = userResult?.createdAt
    ? new Date(userResult.createdAt).toLocaleString(undefined, { hour12: false })
    : "Unknown";

  const lastLoginLabel = userResult?.lastLoginAt
    ? new Date(userResult.lastLoginAt).toLocaleString(undefined, { hour12: false })
    : "Unknown";

  const handleForceLogout = () => {
    if (!targetUserId) {
      toast.error("No user found for this log.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await forceLogoutUser(targetUserId);

        if (!result.success) {
          toast.error(result.error ?? "Failed to force logout user.");
          return;
        }

        toast.success(result.message ?? "User sessions revoked.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to force logout user.");
      }
    });
  };

  const handleWarnUser = () => {
    if (!targetUserId) {
      toast.error("No user found for this log.");
      return;
    }

    startTransition(async () => {
      try {
        await warnUser({ targetUserId });
        toast.success("Warning sent.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to send warning.");
      }
    });
  };

  const handleBanUser = () => {
    if (!targetUserId) {
      toast.error("No user found for this log.");
      return;
    }

    const reason = window.prompt("Reason (optional)") ?? "";

    startTransition(async () => {
      try {
        await permBanUser({ targetUserId, reason: reason.trim() || null });
        toast.success("User permanently banned.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to ban user.");
      }
    });
  };

  return (
    <Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen}>
      {children ? (
        <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>
      ) : null}

      <DrawerContent>
        <DrawerHeader className="gap-3 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={userResult?.avatarUrl ?? undefined} alt={displayName} />

              <AvatarFallback>
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <DrawerTitle className="text-lg">
                {isLoading ? "Loading..." : userResult?.name}
              </DrawerTitle>

              <DrawerDescription className="text-sm">
                {isLoading ? "Loading..." : userResult?.email ?? "Unknown"}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="px-4 py-3 space-y-4">
          <div className="flex flex-col gap-4 text-sm">
            <div className="space-y-0.5">
              <p className="text-muted-foreground">User ID</p>
              <p className="font-medium break-all">{log.userId ?? "N/A"}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium">{userResult?.role ?? "Unknown"}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{createdAtLabel}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-muted-foreground">Last Login</p>
              <p className="font-medium">{lastLoginLabel}</p>
            </div>
          </div>
        </div>

        <DrawerFooter>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 cursor-pointer" disabled={isPending} onClick={handleForceLogout}>
              <SignOutIcon className="size-4" />
              Force Logout
            </Button>

            <Button variant="outline" className="flex-1 cursor-pointer" disabled={isPending} onClick={handleWarnUser}>
              <WarningIcon className="size-4" />
              Warn User
            </Button>
          </div>

          <Button variant="destructive" className="cursor-pointer" disabled={isPending} onClick={handleBanUser}>
            <LockIcon className="size-4" />
            Ban User
          </Button>

          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer" disabled={isPending}>
              <XIcon className="size-4" />
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}