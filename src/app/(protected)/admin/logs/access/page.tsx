import { AutoRefreshLogs } from "@/components/admin/auto-refresh";
import { AdminAccessDropdown } from "@/components/admin/admin-access-dropdown";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";

export default async function AccessLogsPage() {
  await connection();

  // Fetch latest 50 logs, newest first
  const logs = await prisma.adminAccessLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Access Logs</h1>

        {/* Header Btns */}
        <div className="flex items-center gap-2">
          <AutoRefreshLogs intervalSeconds={60} />

          <Button variant="outline" size="sm" className="text-secondary" asChild>
            <Link href="/admin/logs/action">
              Action Logs
            </Link>
          </Button>

          <Button variant="outline" size="sm" className="text-secondary" asChild>
            <Link href="/admin">
              <ArrowLeftIcon />
              Back to Users
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 tracking-wide">
        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-500">GRANTED</span>

          <span className="-ml-1.5 text-secondary">:</span>

          <p className="text-sm">Actual admin / successful attempt</p>
        </div>

        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-500/20 text-orange-500">DENIED_ROLE</span>

          <span className="-ml-1.5 text-secondary">:</span>

          <p className="text-sm">Authenticated user tried to access /admin* route</p>
        </div>

        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-500">DENIED_UNAUTH</span>

          <span className="-ml-1.5 text-secondary">:</span>

          <p className="text-sm">Anonymous user tried to access /admin* route</p>
        </div>
      </div>

      <h2 className="text-xl font-bold tracking-tight mt-4">Logs</h2>

      {/* Logs Table */}
      <div className="rounded-lg border bg-background overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/15">
            <TableRow>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">IP Address</TableHead>
              <TableHead className="font-semibold">Time</TableHead>
              <TableHead className="font-semibold">System / Agent</TableHead>
              <TableHead className="font-semibold flex justify-center items-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No security logs found.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <span className={`
                        px-2 py-1 rounded text-xs font-semibold
                        ${log.status === "GRANTED" ? "bg-green-500/20 text-green-500" :
                        log.status === "DENIED_ROLE" ? "bg-orange-500/20 text-orange-500" :
                          "bg-red-500/20 text-red-500"} // DENIED_UNAUTH
                    `}>
                      {log.status}
                    </span>
                  </TableCell>

                  <TableCell className="font-medium">
                    {log.email || "Anonymous"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {log.ipAddress}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {log.createdAt.toLocaleString(undefined, { hour12: false })}
                  </TableCell>

                  <TableCell
                    className="max-w-50 truncate text-muted-foreground text-xs"
                    title={log.userAgent || "N/A"}
                  >
                    {log.userAgent || "N/A"}
                  </TableCell>

                  <TableCell className="flex justify-center">
                    <AdminAccessDropdown log={log} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
