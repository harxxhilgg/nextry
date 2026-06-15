import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ActionLogsLoading() {
  return (
    <div className="rounded-lg border bg-background overflow-hidden mt-4">
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
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-6 w-28" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-40" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-32" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-44" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-full max-w-xs" />
              </TableCell>

              <TableCell>
                <div className="flex justify-center">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};