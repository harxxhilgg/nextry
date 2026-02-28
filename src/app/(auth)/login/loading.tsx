"use client";

import { Spinner } from "@/components/ui/spinner";

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="size-10" />
      </div>
    </div>
  );
}
