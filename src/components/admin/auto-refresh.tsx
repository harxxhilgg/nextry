"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Button } from "../ui/button";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";

export function AutoRefreshLogs({ intervalSeconds = 30 }: { intervalSeconds?: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const defaultInterval = setInterval(() => {
      startTransition(() => {
        router.refresh();
      });
    }, intervalSeconds * 1000);

    return () => clearInterval(defaultInterval);
  }, [router, intervalSeconds]);

  // Manual Refresh Function
  const handleManualRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex items-center text-muted-foreground">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 cursor-pointer"
        onClick={handleManualRefresh}
        disabled={isPending}
      >
        <ArrowsClockwiseIcon className={isPending ? "animate-spin ease-in-out" : ""} />
      </Button>
    </div>
  );
};