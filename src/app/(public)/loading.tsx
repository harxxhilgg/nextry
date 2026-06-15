"use client";

import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Ring
        size="40"
        stroke="3"
        bg-opacity="0"
        speed="2"
        color="hsl(var(--primary))"
      />
    </div>
  );
};
