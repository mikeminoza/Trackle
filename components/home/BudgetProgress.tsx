"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MotionEffect } from "../animate-ui/effects/motion-effect";

interface BudgetCategory {
  name: string;
  spent: number;
  limit: number;
}

interface BudgetProgressProps {
  categories: BudgetCategory[];
}

export default function BudgetProgress({ categories }: BudgetProgressProps) {
  const [progressValues, setProgressValues] = React.useState<number[]>(categories.map(() => 0));

  React.useEffect(() => {
    const timers = categories.map((cat, i) => {
      const target = Math.min((cat.spent / cat.limit) * 100, 100);
      return setInterval(() => {
        setProgressValues((prev) =>
          prev.map((val, idx) => (idx === i ? (val < target ? val + 5 : target) : val))
        );
      }, 100);
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, [categories]);

  return (
    <MotionEffect key="budget" slide={{ direction: "down" }} fade zoom inView delay={0.3 * 0.1}>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories.map((cat, index) => {
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{cat.name}</span>
                  <span>
                    ₱{cat.spent.toLocaleString()} / ₱{cat.limit.toLocaleString()}
                  </span>
                </div>
                <Progress value={progressValues[index]} className="h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressValues[index]}%` }}
                  />
                </Progress>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </MotionEffect>
  );
}
