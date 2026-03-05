import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col px-2 gap-20">
      <Skeleton className="h-5 w-32" />
    </div>
  );
};