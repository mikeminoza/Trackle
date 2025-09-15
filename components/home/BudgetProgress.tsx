"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MotionEffect } from "../animate-ui/effects/motion-effect";
import { BudgetWithSpent } from "@/types/budget";
import { getCategoryLabel } from "@/constants/categories";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface BudgetProgressProps {
  budgets?: BudgetWithSpent[];
}

export default function BudgetProgress({ budgets = [] }: BudgetProgressProps) {
  return (
    <MotionEffect key="budget" slide={{ direction: "down" }} fade zoom inView delay={0.3 * 0.1}>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Budget Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {budgets.map((budget) => {
            const progress = Math.min((budget.spent / budget.limit_amount) * 100, 100);
            return (
              <div key={budget.id} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{getCategoryLabel(budget.category)}</span>
                  <span>
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.limit_amount)}
                  </span>
                </div>
                <Progress value={progress} className="h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
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
