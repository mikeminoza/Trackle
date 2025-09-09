import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionsSkeleton() {
  return (
    <div className="flex-1 w-full flex flex-col my-6">
      {/* Transactions List */}
      <div className="flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-muted/30 border border-muted animate-pulse"
          >
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
