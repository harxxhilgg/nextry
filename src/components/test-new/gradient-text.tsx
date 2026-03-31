"use client";

import GradientText from "@/components/GradientText";

export function GradientTextSection() {
  return (
    <GradientText
      colors={["var(--gradient-start)", "var(--gradient-mid)", "var(--gradient-end)"]}
      animationSpeed={3}
      showBorder={false}
      yoyo={false}
      className="text-5xl font-semibold"
    >
      Add a splash of color!
    </GradientText>
  );
};