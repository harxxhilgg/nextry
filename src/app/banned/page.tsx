"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BannedPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-semibold">Banned</h1>

        <p className="text-muted-foreground">
          Your account has been banned. Please contact support if you think this is a mistake.
        </p>
      </div>

      <Link href="/contact">
        <Button
          variant="outline"
          size="default"
          className="cursor-pointer rounded-xl active:scale-95"
        >
          Contact Support
        </Button>
      </Link>
    </div>
  );
}
