import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetPageSkeleton() {
  return (
    <div className="flex-1 w-full flex flex-col px-4 sm:px-6 space-y-8">
      <div className="flex items-center justify-stretch sm:justify-end mb-2">
        <Skeleton className="h-10 w-full sm:w-32 rounded-md" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-32 sm:w-40" />
                <Skeleton className="h-4 w-40 sm:w-56" />
                <div className="flex flex-wrap gap-2 mt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="flex sm:block justify-end">
                <Skeleton className="h-6 w-6 rounded-md" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Skeleton className="h-2 w-full rounded-full" />
              <Skeleton className="h-4 w-24 sm:w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
