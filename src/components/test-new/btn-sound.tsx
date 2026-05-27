"use client";

import { useClickSound } from "@/hooks/useClickSound";
import { Button } from "../ui/button";
import { useSound } from "@/hooks/useSound";
import { SirenIcon } from "@phosphor-icons/react";

export const BtnSound = () => {
  const playClick = useClickSound();
  const playheheheha = useSound("/sounds/heheheha.mp3", 0.1);
  const playSound = useSound("/sounds/button-click.wav", 0.5);

  return (
    <>
      <Button
        variant="default"
        className="cursor-pointer rounded-xl tracking-wide border border-secondary active:border-transparent ease-in-out duration-300"
        onClick={() => playClick()}
      >
        Click to Meow
      </Button>

      <Button
        variant="default"
        className="cursor-pointer rounded-xl tracking-wide border border-secondary active:border-transparent ease-in-out duration-300"
        onClick={playheheheha}
      >
        <SirenIcon />
        Heheheha
      </Button>

      <Button
        variant="default"
        className="cursor-pointer rounded-xl tracking-wide border border-secondary active:border-transparent ease-in-out duration-300"
        onClick={playSound}
      >
        Click
      </Button>
    </>
  );
};
