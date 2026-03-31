'use client';

import Antigravity from "@/components/Antigravity";

export function AntiGravitySection() {
  return (
    <Antigravity
      count={600}
      magnetRadius={6}
      ringRadius={7}
      waveSpeed={0.4}
      waveAmplitude={1}
      particleSize={1.5}
      lerpSpeed={0.05}
      color="#AD03DE"
      autoAnimate
      particleVariance={1}
      rotationSpeed={0}
      depthFactor={1}
      pulseSpeed={3}
      particleShape="capsule"
      fieldStrength={10}
    />
  );
};