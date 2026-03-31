'use client';

import ScrollVelocity from "@/components/ScrollVelocity";;

export function ScrollVelocitySection() {
  return (

    <ScrollVelocity
      // @ts-expect-error don't know
      texts={['Pank', 'Ponk']}
      velocity={100}
      className="font-semibold"
    />
  );
};