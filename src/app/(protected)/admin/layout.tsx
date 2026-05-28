import { checkIsAdmin } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin - Nextry",
  description: "Admin Panel of Nextry",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get the req headers for logging
  const headersList = await headers();

  // Check user's status using our updated utility
  const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unknown";
  const userAgent = headersList.get("user-agent") || "Unknown";

  // Check user's status using updated utility
  const { isAdmin, reason, user } = await checkIsAdmin();

  // Avoid logging purely client-side navigations and auto-refreshes
  const acceptHeader = headersList.get("accept") || "";
  const isHtmlRequest = acceptHeader.includes("text/html");

  if (isHtmlRequest) {
    // SECURE ASYNC LOGGING (only on hard loads or initial visits)
    prisma.adminAccessLog.create({
      data: {
        userId: user?.id || null,
        email: user?.email || null,
        ipAddress,
        userAgent,
        // @ts-expect-error "as any"
        status: reason // Cast it to match prisma's AccessStatus enum
      }
    }).catch(err => console.error("Failed to log admin access: ", err));
  }

  if (!isAdmin) {
    redirect("/unauthorized");
  }

  return <>{children}</>
}
