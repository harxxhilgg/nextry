"use client";

import { PolygonIcon } from "@phosphor-icons/react";

export function LoginLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-black/95 dark:bg-white/95 p-1 rounded-lg my-4">
        <PolygonIcon size={24} className="text-white dark:text-black" />
      </div>

      <p className="font-semibold">Nextry Inc.</p>
    </div>
  );
}
