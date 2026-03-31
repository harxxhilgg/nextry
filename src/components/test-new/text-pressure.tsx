"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import TextPressure from "@/components/TextPressure";

export function TextPressureSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full flex justify-center">
      <TextPressure
        text="Gangar"
        alpha={false}
        stroke
        width
        weight
        italic
        textColor={resolvedTheme === "light" ? "#000000" : "#ffffff"}
        strokeColor="#7F00FF"
        minFontSize={300}
      />
    </div>
  );
}