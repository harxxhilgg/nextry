"use client";

import { ClockClockwiseIcon, DotsThreeIcon, GlobeSimpleIcon, LockIcon, TrashIcon, UserIcon, WarningIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { AccessDrawer } from "./access-drawer";
import { useState } from "react";
import { deleteLog, permBanUser, resetWarnings, unbanUser, warnUser } from "@/app/(protected)/admin/actions";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { usePathname } from "next/navigation";

export interface LogItem {
  id: string;
  status: "GRANTED" | "DENIED_ROLE" | "DENIED_UNAUTH";
  email: string | null;
  userId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
};

export function AdminAccessDropdown({ log }: { log: LogItem }) {
  // Get currnet route pathname
  const pathname = usePathname(); // /admin/logs/access
  const logType = pathname.split('/').pop(); // access

  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const requireTargetUserId = () => {
    if (!log.userId) {
      toast.error("No user found for this log.");

      return null;
    }

    return log.userId;
  };

  const askReason = () => {
    const reason = window.prompt("Reason (optional)") ?? "";

    return reason.trim() || null;
  };

  const deleteLogById = async (logId: string, logType?: string) => {
    toast.promise(
      async () => {
        if (!logType || (logType !== "access" && logType !== "action")) {
          throw new Error("Invalid log type");
        }

        const result = await deleteLog(logId, logType);

        if (!result.success) {
          throw new Error(result.message);
        }

        return result;
      },
      {
        loading: "Deleting log...",

        success: (result) => {
          return result.message;
        },

        error: (err) => {
          console.error(err);
          return err.message || "Failed to delete log...";
        },

        closeButton: true,
        duration: 5000,
      },
    );
  };

  const copyIpToClipboard = async () => {
    toast.promise(
      async () => {
        const c = await navigator.clipboard.writeText(log.ipAddress!);

        return c;
      },
      {
        loading: "Copying IP Address...",

        success: "IP Address copied to clipboard",

        error: "Failed to copy IP Address",
      }
    );
  };

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
          >
            <DotsThreeIcon weight="bold" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end" className="mb-3 w-50">
          <DropdownMenuItem
            onSelect={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              setDrawerOpen(true);
            }}
          >
            <UserIcon weight="duotone" className="size-4" />
            <span>View User</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => setMenuOpen(false)}
            onClick={copyIpToClipboard}
          >
            <GlobeSimpleIcon weight="duotone" className="size-4" />
            <span>Copy IP</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={async () => {
              setMenuOpen(false);
              const targetUserId = requireTargetUserId();
              if (!targetUserId) return;
              await warnUser({ targetUserId });
              toast.success("Warning sent.");
            }}
          >
            <WarningIcon weight="duotone" className="size-4" />
            <span>Warn User</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={async () => {
              setMenuOpen(false);
              const targetUserId = requireTargetUserId();
              if (!targetUserId) return;
              await resetWarnings({ targetUserId });
              toast.success("Warning count reset.");
            }}
          >
            <ClockClockwiseIcon weight="duotone" className="size-4" />
            <span>Reset Warning Count</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={async () => {
              setMenuOpen(false);
              const targetUserId = requireTargetUserId();
              if (!targetUserId) return;
              await unbanUser({ targetUserId });
              toast.success("User unbanned.");
            }}
          >
            <LockIcon weight="duotone" className="size-4" />
            <span>Unban User</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onSelect={(event) => {
              event.preventDefault();
              setMenuOpen(false);
              setSelectedLogId(log.id);
              setShowDeleteDialog(true);
            }}
          >
            <TrashIcon weight="duotone" className="size-4" />
            <span>Delete Log</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            variant="destructive"
            onSelect={async () => {
              setMenuOpen(false);
              const targetUserId = requireTargetUserId();
              if (!targetUserId) return;
              await permBanUser({ targetUserId, reason: askReason() });
              toast.success("User permanently banned.");
            }}
          >
            <LockIcon weight="duotone" className="size-4" />
            <span>Ban User</span>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Log AlertDialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent
          size="sm"
          className="p-0 gap-0 overflow-hidden min-w-100"
        >
          <AlertDialogHeader className="p-6 gap-4">
            <AlertDialogTitle>
              Delete this log?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. The selected log will be permanently
              removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="border-t bg-muted/30 p-4 sm:p-4">
            <AlertDialogCancel className="mt-0 cursor-pointer active:translate-y-px">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              variant="destructive"
              className="cursor-pointer active:translate-y-px"
              onClick={() => {
                if (!selectedLogId) return;
                void deleteLogById(selectedLogId, logType);
                setShowDeleteDialog(false);
                setSelectedLogId(null);
              }}
            >
              Delete Log
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AccessDrawer log={log} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};