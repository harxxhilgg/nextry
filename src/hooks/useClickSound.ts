"use client";

import useSound from "use-sound";

export function useClickSound() {
  const [play] = useSound("/sounds/meow-n.mp3", {
    volume: 0.5,
    interrupt: true,
  });

  return play;
}
