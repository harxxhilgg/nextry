"use client";

import { hanken } from "@/lib/fonts";
import { useEffect, useState } from "react";
import { trackVisitor } from "./actions";
import { Separator } from "../ui/separator";
import { getVisitorId } from "@/lib/visitor";

export function RedisTestFooter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    async function init() {
      const visitorId = getVisitorId();

      if (!visitorId) return;

      const result = await trackVisitor(visitorId);
      setVisitorCount(result);
    };

    init();
  }, []);

  function getOrdinalSuffix(n: number) {
    const lastTwo = n % 100;

    if (lastTwo >= 11 && lastTwo <= 13) return "th";

    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return (
    <div className={`${hanken.className} p-8 bg-zinc-100 dark:bg-zinc-900 border-t border-secondary/30 rounded`}>
      <div className="w-full max-w-xl mx-auto space-y-6">
        <div>
          {/* Do some thing(s) here */}
        </div>

        <Separator orientation="horizontal" />

        <div className="flex justify-between w-full max-w-xl mx-auto">
          <p className="text-muted-foreground text-sm">© 2026 Harshil Patel. All rights reserved.</p>

          {visitorCount !== null && (
            <p className="text-muted-foreground text-sm">
              You&apos;re the {" "}
              <span className="text-primary">
                {new Intl.NumberFormat("en-IN").format(visitorCount)}
                <sup>{getOrdinalSuffix(visitorCount)}</sup>
              </span> {" "}
              visitor
            </p>
          )}
        </div>
      </div>
    </div>
  );
};