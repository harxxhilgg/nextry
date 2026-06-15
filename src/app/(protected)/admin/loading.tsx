import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardLoading() {
  const userItem = "w-[789px] h-16";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-40 h-6" />

        <Skeleton className="w-32 h-8" />
      </div>

      <div>
        <ul className="space-y-3">
          <Skeleton className={userItem} />
          <Skeleton className={userItem} />
          <Skeleton className={userItem} />
        </ul>
      </div>
    </div>
  );
};