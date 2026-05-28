import { AutoRefreshLogs } from "@/components/admin/auto-refresh";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";

export default async function AdminLogsPage() {
  await connection();

  // Fetch latest 50 logs, newest first
  const logs = await prisma.adminAccessLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Secutiy Logs</h1>

        <div className="flex items-center gap-3">
          <AutoRefreshLogs intervalSeconds={60} />

          <Button variant="outline" size="sm" className="text-secondary" asChild>
            <Link href="/admin">
              <ArrowLeftIcon />
              Back to Users
            </Link>
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-lg border bg-background overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>System / Agent</TableHead>
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
                        px-2 py-1 rounded text-xs font-bold ${log.status === "GRANTED" ? "bg-green-500/20 text-green-500" :
                        log.status === "DENIED_ROLE" ? "bg-orange-500/20 text-orange-500" :
                          "bg-red-500/20 text-red-500" // DENIED_UNAUTH
                      }
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
                    title={log.userAgent || ""}
                  >
                    {log.userAgent || ""}
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
