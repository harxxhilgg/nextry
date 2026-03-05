import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { Field, FieldGroup } from "../ui/field";
import { Skeleton } from "../ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export function DashboardSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 4 }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 5 }).map((_, row) => (
            <TableRow key={row}>
              {Array.from({ length: 4 }).map((_, col) => (
                <TableCell key={col}>
                  <Skeleton className="h-4 w-[80%]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export function FormSkeleton() {
  return (
    <Card className="min-w-sm sm:w-full sm:max-w-xl">
      <CardHeader className="space-y-2">
        <Skeleton className="h-6 w-40" />

        <CardDescription>
          <Skeleton className="h-4 w-72" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          <Field className="space-y-2">
            <Skeleton className="h-4 w-24" />

            <Skeleton className="h-9 w-full rounded-md" />

            <Skeleton className="h-3 w-56" />
          </Field>

          <Field className="space-y-2">
            <Skeleton className="h-4 w-24" />

            <div className="relative">
              <Skeleton className="h-29 w-full rounded-md" />

              <div className="absolute bottom-4 right-2">
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <Skeleton className="h-3 w-64" />
          </Field>
        </FieldGroup>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Skeleton className="h-9 w-20 rounded-md" />

          <Skeleton className="h-9 w-24 rounded-md" />
        </Field>
      </CardFooter>
    </Card>
  );
};

export function AiChatResultSkeleton() {
  return (
    <div className="space-y-6 mt-2">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-6" />
      </div>

      <ul className="space-y-3 mb-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="flex gap-6">
            <Skeleton className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" />

            <div className="flex flex-col gap-2 w-full max-w-xl">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[80%]" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}