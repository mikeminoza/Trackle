"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarRange, Repeat, ArrowRight } from "lucide-react";
import { BudgetWithSpent } from "@/types/budget";
import { getCategoryLabel } from "@/constants/categories";

export default function BudgetCard({ budget }: { budget: BudgetWithSpent }) {
  const percent = Math.min((budget.spent / budget.limit_amount) * 100, 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">{getCategoryLabel(budget.category)}</CardTitle>
          <CardDescription>
            Limit ₱{budget.limit_amount.toLocaleString()} • Spent ₱{budget.spent.toLocaleString()}
          </CardDescription>
          <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarRange className="h-3 w-3" /> {budget.period}
            </span>
            {budget.recurring && (
              <span className="flex items-center gap-1">
                <Repeat className="h-3 w-3" /> Recurring
              </span>
            )}
            {budget.carry_over && (
              <span className="flex items-center gap-1">
                <ArrowRight className="h-3 w-3" /> Carryover
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={percent} />
        <p className={`mt-2 text-sm ${percent >= 100 ? "text-red-500" : "text-muted-foreground"}`}>
          {percent >= 100 ? "Budget exceeded!" : `${Math.round(percent)}% used`}
        </p>
      </CardContent>
    </Card>
  );
}
