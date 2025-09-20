import { Alert } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";

export default function AiInsightSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(2)].map((_, i) => (
        <Alert key={i} variant="default" className="flex items-center space-x-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-4 w-[200px]" />
        </Alert>
      ))}
    </div>
  );
}
