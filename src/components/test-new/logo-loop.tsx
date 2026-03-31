'use client';

import LogoLoop from "@/components/LogoLoop";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

export function LogoLoopSection() {
  return (
    <LogoLoop
      // @ts-expect-error one
      logos={techLogos}
      speed={100}
      direction="left"
      logoHeight={60}
      gap={60}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      ariaLabel="Technology partners"
    />
  );
};