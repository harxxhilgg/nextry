"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function NotWorkingToast() {
  useEffect(() => {
    toast.info("Service temporarily limited", {
      description: "We've reached our current usage limit. Some features may be unavailable until access is restored.",
      closeButton: true,
      duration: 10000, // 10s
    });
  }, []);

  return null;
};