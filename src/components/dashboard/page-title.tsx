"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { hanken } from "@/lib/fonts";

/* 
  - Provide friendly names for specific segments.
  - The fallback splits on hyphens and capitalizes automatically.
  
  - Here, (url route - "What to show on title") as an example: dashboard: "Dashboard"
*/

const segmentTitles: Record<string, string> = {
  admin: "Admin Dashboard",
};

function formatSegmentTitle(segment: string) {
  // This is for custom title based on route (/) if not then route segment will be set as page-title

  if (segmentTitles[segment]) {
    return segmentTitles[segment];
  }

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function PageTitle() {
  const pathname = usePathname();
  // Split path into array: "/dashboard/settings" -> ["dashboard", "settings"]
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return <h1 className="text-sm font-semibold">Home</h1>;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = "/" + segments.slice(0, index + 1).join("/");
          const title = formatSegmentTitle(segment);

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem className="hidden md:block">
                {isLast ? (
                  <BreadcrumbPage className={`${hanken.className} font-semibold text-[15px]`}>{title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>
                      {title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator className="hidden sm:block">
                  <ChevronRight />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
