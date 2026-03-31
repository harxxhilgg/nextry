"use client";

import TextType from "@/components/TextType";

export function TextTypeSection() {
  return (
    <div className="text-6xl min-h-12 font-medium">
      <TextType
        text={[
          "Text typing effect",
          "for your websites",
          "Happy coding!",
        ]}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="_"
        deletingSpeed={50}
        cursorBlinkDuration={0.5} variableSpeed={undefined} onSentenceComplete={undefined} />
    </div>
  );
};