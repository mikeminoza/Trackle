import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BudgetSummarySkeleton() {
  const skeletons = [1, 2, 3];

  return (
    <div className="grid gap-4 sm:grid-cols-3 px-6">
      {skeletons.map((_, index) => (
        <MotionEffect
          key={index}
          slide={{ direction: "down" }}
          fade
          zoom
          inView
          delay={0.3 + index * 0.1}
        >
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        </MotionEffect>
      ))}
    </div>
  );
}
