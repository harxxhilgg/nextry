"use client";

import { deleteUser } from "@/app/(protected)/admin/actions";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export function DeleteBtn({
  userId,
  email,
}: {
  userId: string,
  email: string,
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await deleteUser(userId);
      setIsOpen(false);
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          disabled={isPending}
          className="cursor-pointer"
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm" className="p-0 gap-0 overflow-hidden min-w-100">
        <AlertDialogHeader className="p-6 gap-4">
          <AlertDialogTitle>
            Are you sure you want to delete {email}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            account and remove all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="border-t bg-muted/30 p-4">
          <AlertDialogCancel
            disabled={isPending}
            className="mt-0 cursor-pointer active:translate-y-px"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer active:translate-y-px"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};