"use client";

import { FileTextIcon, Github } from "lucide-react";
import { Button } from "../ui/button";

export function SourceBtn() {
  return (
    <Button
      variant="default"
      className="rounded-full w-26 cursor-pointer"
      onClick={() =>
        window.open("https://github.com/harxxhilgg/nextjs-starter", "_blank")
      }
    >
      <Github />
      Source
    </Button>
  );
}

export function DocsBtn() {
  return (
    <Button
      variant="outline"
      className="rounded-full w-26 cursor-pointer"
      onClick={() =>
        window.open("https://github.com/harxxhilgg/nextjs-starter", "_blank")
      }
    >
      <FileTextIcon />
      Docs
    </Button>
  );
}
