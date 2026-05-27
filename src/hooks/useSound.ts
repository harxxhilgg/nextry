"use client";

import { useEffect, useRef } from "react";

export function useSound(src: string, volume = 0.3) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;

    audioRef.current = audio;
  }, [src, volume]);

  const play = () => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return play;
}
