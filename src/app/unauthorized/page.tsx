"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-semibold">Unauthorized</h1>

        <p className="text-muted-foreground">You are not authorized to access specific route(s), click on continue to proceed back!</p>
      </div>

      <Link href="/dashboard">
        <Button
          variant="outline"
          size="default"
          className="cursor-pointer rounded-xl"
        >
          Continue
        </Button>
      </Link>
    </div>
  );
};