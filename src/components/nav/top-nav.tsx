"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ThemeToggleClient } from "./theme-toggle-client";
import { PolygonIcon } from "@phosphor-icons/react";

export default function TopNav() {
  return (
    <div className="flex items-center justify-between w-full h-18 sm:h-20 px-4 py-3 sm:py-4 sm:px-4 select-none transition-all">
      <Link
        href="/"
        className="flex items-center gap-2 active:scale-95 transition-all"
      >
        <div className="bg-black/95 dark:bg-white/95 p-1 rounded-xl my-4">
          <PolygonIcon size={28} className="text-white dark:text-black" />
        </div>

        <p className="hidden sm:block font-semibold">Nextry Inc.</p>
      </Link>

      <div className="flex items-center">
        <div className="mr-4">
          <Button
            variant="outline"
            className="cursor-pointer rounded-xl font-semibold"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        <Separator orientation="vertical" className="h-5" />

        <div className="flex items-center ml-2">
          <ThemeToggleClient />
        </div>
      </div>
    </div>
  );
}
