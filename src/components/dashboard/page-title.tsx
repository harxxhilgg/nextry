"use client";

import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/locations": "Locations",
  "/profile": "Profile",
  "/settings": "Settings",
  "/billing": "Billing",
  "/notifications": "Notifications",
  "/roaster": "Roaster",
};

export function PageTitle() {
  const pathname = usePathname();
  const title = routeTitles[pathname] || "";

  return <h1 className="text-sm font-semibold">{title}</h1>;
}
