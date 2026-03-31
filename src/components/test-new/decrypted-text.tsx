"use client";

import DecryptedText from "@/components/DecryptedText";

export function DecryptedTextSection() {
  return (
    <div className="text-4xl font-semibold cursor-pointer">
      <DecryptedText
        text="Bingo Bango Bongo, Bish Bash Bosh"
        animateOn="click"
        revealDirection="start"
        sequential
        useOriginalCharsOnly={false}
      />
    </div>
  );
}
