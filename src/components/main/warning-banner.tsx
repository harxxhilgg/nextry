"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
import { XIcon } from "@phosphor-icons/react";

type WarningBannerProps = {
  warningCount: number;
};

const STORAGE_KEY = "warning-banner-dismissed";

export function WarningBanner({ warningCount }: WarningBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [ready, setReady] = useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setDismissed(true);
    }
    setReady(true);
  }, []);

  if (!ready || warningCount <= 0 || dismissed) {
    return null;
  }

  const onDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
    }
  };

  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-50 flex justify-center">
      <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-xl border border-amber-300/60 bg-amber-950/90 px-5 py-4 text-amber-100 shadow-lg">
        <div className="text-sm font-medium space-y-0.5">
          <p>You have {warningCount} warning{warningCount === 1 ? "" : "s"} on your account.</p>

          <p>Reason: Tried to access admin routes.</p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onDismiss}
          className=" hover:text-amber-100 hover:bg-transparent cursor-pointer size-10 text-secondary"
          aria-label="Dismiss warning banner"
        >
          <XIcon className="size-5" />
        </Button>
      </div>
    </div>
  );
}
