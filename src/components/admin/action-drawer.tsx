"use client";

import { permBanUser, resetWarnings, unbanUser, warnUser } from "@/app/(protected)/admin/actions";
import { getUserById } from "@/app/(protected)/admin/logs/actions";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogItem } from "./admin-actions-dropdown";
import React, { useState, useTransition } from "react";
import { UserRound } from "lucide-react";
import { ClockClockwiseIcon, LockIcon, WarningIcon, XIcon } from "@phosphor-icons/react";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

export function ActionDrawer({
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
    error: string | null;
  } | null>(null);
  const [adminResult, setAdminResult] = useState<{
    userId: string;
    email: string | null;
    name: string | null;
    avatarUrl: string | null;
    role: string | null;
    createdAt: string | null;
    lastLoginAt: string | null;
    error: string | null;
  } | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);
  const [isPending] = useTransition();

  React.useEffect(() => {
    if (!drawerOpen) return;
    if (!log.targetUserId || !log.adminUserId) return;

    let isActive = true;

    setIsLoadingUser(true);
    setIsLoadingAdmin(true);

    Promise.all([
      getUserById(log.targetUserId),
      getUserById(log.adminUserId),
    ])
      .then(([user, admin]) => {
        if (!isActive) return;

        setUserResult(user);
        setAdminResult(admin);
      })
      .finally(() => {
        if (!isActive) return;

        setIsLoadingUser(false);
        setIsLoadingAdmin(false);
      });

    return () => {
      isActive = false;
    };
  }, [drawerOpen, log.targetUserId, log.adminUserId]);

  const userDisplayName = userResult?.name || userResult?.email || "User";
  const adminDisplayName = adminResult?.name || adminResult?.email || "Admin";


  const userCreatedAtLabel = userResult?.createdAt
    ? new Date(userResult.createdAt).toLocaleString(undefined, { hour12: false })
    : "Unknown";

  const adminCreatedAtLabel = adminResult?.createdAt
    ? new Date(adminResult.createdAt).toLocaleString(undefined, { hour12: false })
    : "Unknown";

  const userLastLoginLabel = userResult?.lastLoginAt
    ? new Date(userResult.lastLoginAt).toLocaleString(undefined, { hour12: false })
    : "Unknown";

  const adminLastLoginLabel = adminResult?.lastLoginAt
    ? new Date(adminResult.lastLoginAt).toLocaleString(undefined, { hour12: false })
    : "Unknown";

  const targetUserId = log.targetUserId;

  const handleWarnUser = () => {
    toast.promise(
      async () => {
        if (!targetUserId) {
          throw new Error("No target user found for this log");
        }

        const result = await warnUser({ targetUserId });

        return result;
      },
      {
        loading: `User ${targetUserId} is being warned...`,

        success: `User ${targetUserId} has been warned`,

        error: (err) => {
          console.error(err);
          return err.message || "Failed to send warning";
        },

        closeButton: true,
        duration: 5000,
      },
    );
  };

  const handleResetWarnings = () => {
    toast.promise(
      async () => {
        if (!targetUserId) {
          throw new Error("No target user found for this log");
        }

        const result = resetWarnings({ targetUserId });

        return result;
      },
      {
        loading: `Warning count is being resetted for user ${targetUserId}`,

        success: `Warning count resetted for user ${targetUserId}`,

        error: (err) => {
          console.error(err);
          return err.message || "Failed to reset warning count";
        },

        closeButton: true,
        duration: 5000,
      },
    );
  };

  const handleBanUser = () => {
    toast.promise(
      async () => {
        if (!targetUserId) {
          throw new Error("No target user found for this log");
        }

        const reason = window.prompt("Reason (optional)") ?? "";

        const result = await permBanUser({ targetUserId, reason: reason.trim() || null });

        return result;
      },
      {
        loading: `Banning user ${targetUserId}`,

        success: `User ${targetUserId} has been banned permanently`,

        error: (err) => {
          console.error(err);
          return err.message || `Failed to ban user ${targetUserId}`;
        },

        closeButton: true,
        duration: 5000,
      },
    );
  };

  const handleUnbanUser = () => {
    toast.promise(
      async () => {
        if (!targetUserId) {
          throw new Error("No target user found for this log");
        }

        const result = await unbanUser({ targetUserId });

        return result;
      },
      {
        loading: `User ${targetUserId} is being unbanned`,

        success: `User ${targetUserId} has been unbanned`,

        error: (err) => {
          console.error(err);
          return err.message || `Failed to unban user ${targetUserId}`;
        },

        closeButton: true,
        duration: 5000,
      },
    );
  };

  return (
    <Drawer direction="right" open={drawerOpen} onOpenChange={setDrawerOpen}>
      {children ? (
        <DrawerTrigger asChild>
          {children}
        </DrawerTrigger>
      ) : null}

      <DrawerContent>
        {/* User Details */}
        <DrawerHeader className="gap-3">
          <h2 className="font-medium text-sm text-secondary mb-4">User Details</h2>

          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src={userResult?.avatarUrl ?? undefined} alt={userDisplayName} />

              <AvatarFallback>
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <DrawerTitle className="text-lg">
                {isLoadingUser ? "Loading..." : userResult?.name}
              </DrawerTitle>

              <DrawerDescription className="text-sm">
                {isLoadingUser ? "Loading..." : userResult?.email ?? "Unknown"}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        <div className="px-4 py-3 space-y-4">
          {/* User Details */}
          <div className="flex flex-col gap-4 text-sm">
            <div className="space-y-0.5">
              <p className="text-muted-foreground">User ID</p>
              <p className="font-medium break-all">{log.targetUserId ?? "N/A"}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium">{userResult?.role ?? "Unknown"}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{userCreatedAtLabel}</p>
            </div>

            <div className="space-y-0.5">
              <p className="text-muted-foreground">Last Login</p>
              <p className="font-medium">{userLastLoginLabel}</p>
            </div>

            <Separator orientation="horizontal" />

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <div className="text-[17px] font-semibold">
                <span className={`
                    px-2 py-1 rounded
                    ${log.action === "WARN" ? "bg-orange-500/20 text-orange-500"
                    : log.action === "RESET_WARNINGS" ? "bg-blue-500/20 text-blue-500"
                      : log.action === "PERM_BAN" ? "bg-red-500/20 text-red-500"
                        : "bg-green-500/20 text-green-500"}
                `}>
                  {log.action}
                </span> {" "}
                by {adminResult?.name}
              </div>

              {log.reason && (
                <div className="text-sm">
                  <p className="text-muted-foreground">Reason</p>
                  <p className="font-medium break-all">{log.reason}</p>
                </div>
              )}
            </div>
          </div>

          <Separator orientation="horizontal" />

          {/* Admin Details */}
          <div className="flex flex-col gap-6">
            <h2 className="font-medium text-sm text-secondary mb-1">Admin Details</h2>

            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarImage src={adminResult?.avatarUrl ?? undefined} alt={adminDisplayName} />

                <AvatarFallback>
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <DrawerTitle className="text-lg">
                  {isLoadingAdmin ? "Loading..." : adminResult?.name}
                </DrawerTitle>

                <DrawerDescription className="text-sm">
                  {isLoadingAdmin ? "Loading..." : adminResult?.email ?? "Unknown"}
                </DrawerDescription>
              </div>
            </div>

            <div className="space-y-0.5 text-sm">
              <p className="text-muted-foreground">User ID</p>
              <p className="font-medium break-all">{log.adminUserId ?? "N/A"}</p>
            </div>

            <div className="space-y-0.5 text-sm">
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium">{adminCreatedAtLabel}</p>
            </div>

            <div className="space-y-0.5 text-sm">
              <p className="text-muted-foreground">Last Login</p>
              <p className="font-medium">{adminLastLoginLabel}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <DrawerFooter>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 cursor-pointer" disabled={isPending} onClick={handleWarnUser}>
              <WarningIcon className="size-4" />
              Warn User
            </Button>

            <Button variant="outline" className="flex-1 cursor-pointer" disabled={isPending} onClick={handleResetWarnings}>
              <ClockClockwiseIcon className="size-4" />
              Reset Warning(s)
            </Button>
          </div>

          <Button variant="destructive" className="cursor-pointer" disabled={isPending} onClick={handleBanUser}>
            <LockIcon className="size-4" />
            Ban User
          </Button>

          <Button variant="outline" className="cursor-pointer" disabled={isPending} onClick={handleUnbanUser}>
            <LockIcon className="size-4" />
            Unban User
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