"use client";

import { Trash2, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function DeleteRoastButton({ id }: { id: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const res = await fetch(`/api/results/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Deleted Successfully");

      router.push("/roaster");
      router.refresh();
    } catch {
      toast.error("Failed to delete roast");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          <Trash2 />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Are you sure you want to delete this roast?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This roast will be permanently deleted. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
