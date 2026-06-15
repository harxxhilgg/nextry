import { AdminActionsDropdown } from "@/components/admin/admin-actions-dropdown";
import { AutoRefreshLogs } from "@/components/admin/auto-refresh";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import ActionLogsLoading from "./loading";
import { delay } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">Action Logs</h1>

        {/* Header Btns */}
        <div className="flex items-center gap-2">
          <AutoRefreshLogs intervalSeconds={60} />

          <Button variant="outline" size="sm" className="text-secondary" asChild>
            <Link href="/admin/logs/access">
              Access Logs
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

      <div className="flex flex-col gap-2 tracking-wide mt-4">
        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-500">UNBAN</span>

          <span className="-ml-1.5 text-secondary">:</span>

          <p className="text-sm">User access restored</p>
        </div>

        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-orange-500/20 text-orange-500">WARN</span>

          <span className="-ml-1.5 text-secondary">:</span>

          <p className="text-sm">User issued a policy violation warning</p>
        </div>

        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-500">RESET_WARNINGS</span>

          <span className="-ml-1.5 text-secondary">:</span>

          <p className="text-sm">Warning count reset</p>
        </div>

        <div className="flex gap-2 items-center">
          <span className="px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-500">PERM_BAN</span>

          <span className="-ml-1.5 text-secondary">:</span>

          <p className="text-sm">User account suspended</p>
        </div>
      </div>

      <h2 className="text-xl font-bold tracking-tight mt-4">Logs</h2>

      <Suspense fallback={<ActionLogsLoading />}>
        <ActionLogs />
      </Suspense>
    </>
  );
};

export async function ActionLogs() {
  await connection();
  await delay(1000); // 1s

  // Fetch latest 50 logs, newest first
  const logs = await prisma.adminActionsLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="flex flex-col mt-4">
      {/* Logs Table */}
      <div className="rounded-lg border bg-background overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/15">
            <TableRow>
              <TableHead className="font-semibold">Action</TableHead>
              <TableHead className="font-semibold">Admin Id</TableHead>
              <TableHead className="font-semibold">Target User Id</TableHead>
              <TableHead className="font-semibold">Reason</TableHead>
              <TableHead className="font-semibold">Created At</TableHead>
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
                        ${log.action === "WARN" ? "bg-orange-500/20 text-orange-500"
                        : log.action === "RESET_WARNINGS" ? "bg-blue-500/20 text-blue-500"
                          : log.action === "PERM_BAN" ? "bg-red-500/20 text-red-500"
                            : "bg-green-500/20 text-green-500"} // UNABN
                    `}>
                      {log.action}
                    </span>
                  </TableCell>

                  <TableCell
                    className="text-muted-foreground"
                    title={log.adminUserId!}
                  >
                    {log.adminUserId}
                  </TableCell>

                  <TableCell
                    className="text-muted-foreground"
                    title={log.targetUserId!}
                  >
                    {log.targetUserId}
                  </TableCell>

                  <TableCell
                    className="text-muted-foreground"
                    title={log.reason || ""}
                  >
                    {log.reason || "-"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {log.createdAt.toLocaleString(undefined, { hour12: false })}
                  </TableCell>

                  <TableCell className="flex justify-center">
                    <AdminActionsDropdown log={log} />
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
