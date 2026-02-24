"use client";

import { CommandIcon } from "@phosphor-icons/react";
import { SidebarTrigger } from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function SidebarTriggerBtn() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SidebarTrigger />
      </TooltipTrigger>

      <TooltipContent side="right" className="flex gap-1 items-center">
        <CommandIcon size={19} />
        <p className="text-[15px] font-medium">B</p>
      </TooltipContent>
    </Tooltip>
  );
};