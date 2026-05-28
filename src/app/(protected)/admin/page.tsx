import { DeleteBtn } from "@/components/admin/delete-btn";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  // Fetch all users from your database
  const allUsers = await prisma.user.findMany({
    orderBy: { email: "asc" },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium">Total Users: {allUsers.length}</h2>

        <Button variant="outline" size="sm" className="text-secondary" asChild>
          <Link href="/admin/logs">Security Logs</Link>
        </Button>
      </div>

      <div>
        <ul className="space-y-3">
          {allUsers.map((u) => (
            <li
              key={u.id}
              className="flex justify-between items-center bg-background border p-3 rounded-lg"
            >

              <div className="flex flex-col">
                <span className="font-medium">{u.email}</span>
                <span className="text-xs text-muted-foreground">{u.id}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Visual badge for ADMIN or USER */}
                <span
                  className={`
                    px-2 py-1 rounded text-xs font-semibold
                    ${u.role === "ADMIN" ?
                      "bg-red-500/20 text-red-500"
                      : "bg-blue-500/20 text-blue-500"
                    }
                  `}
                >
                  {u.role}
                </span>

                {/* Only show the delete button for normal users */}
                {u.role !== "ADMIN" && (
                  <DeleteBtn userId={u.id} email={u.email} />
                )}
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
