import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-xl active:scale-95 cursor-pointer"
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun size={50} className="size-4.5" /> : <Moon size={50} className="size-4.5" />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p className="font-medium">Switch Theme</p>
      </TooltipContent>
    </Tooltip>
  );
}
