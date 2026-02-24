"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { ClipboardTextIcon } from "@phosphor-icons/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function CopyBtn() {
  async function handleCopy() {
    toast.success("Nothing is copied", {
      description: "This is test button",
      icon: <ClipboardTextIcon size={20} />,
      duration: 3000,
      closeButton: true,
    })
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          onClick={handleCopy}
          className="cursor-pointer"
        >
          Copy
        </Button>
      </TooltipTrigger>

      <TooltipContent side="bottom">
        <p>Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  );
};