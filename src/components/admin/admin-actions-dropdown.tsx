"use client";

import { DotsThreeIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ActionDrawer } from "./action-drawer";
import { useState } from "react";
import { deleteLog } from "@/app/(protected)/admin/actions";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { CircleAlert } from "lucide-react";
import { usePathname } from "next/navigation";

export interface LogItem {
  id: string;
  adminUserId?: string | null;
  targetUserId?: string | null;
  action: "WARN" | "PERM_BAN" | "RESET_WARNINGS" | "UNBAN" | "FINAL_WARN" | "TEMP_BAN";
  reason?: string | null;
  createdAt: Date;
};

export function AdminActionsDropdown({ log }: { log: LogItem }) {
  const pathname = usePathname(); // /admin/logs/action
  const logType = pathname.split('/').pop(); // action

  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  const deleteLogById = async (logId: string, logType?: string) => {
    if (!logType || (logType !== "access" && logType !== "action")) {
      console.error("Invalid log type");
      return;
    }

    const result = await deleteLog(logId, logType as "access" | "action");

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
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
            <CircleAlert className="size-4" />
            <span>View Details</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

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

      <ActionDrawer log={log} open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
};