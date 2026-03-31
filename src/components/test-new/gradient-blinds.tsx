'use client';

import GradientBlinds from "@/components/GradientBlinds";

export function GradientBlindsSection() {
  return (
    <GradientBlinds
      gradientColors={['#FF9FFC', '#5227FF']}
      angle={0}
      noise={0.3}
      blindCount={12}
      blindMinWidth={50}
      spotlightRadius={0.5}
      spotlightSoftness={1}
      spotlightOpacity={1}
      mouseDampening={0.15}
      distortAmount={0}
      shineDirection="left"
      mixBlendMode="lighten"
    />
  );
};