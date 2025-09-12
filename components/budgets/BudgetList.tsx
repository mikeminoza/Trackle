"use client";

import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import BudgetCard from "./BudgetCard";
import { BudgetWithSpent } from "@/types/budget";

export default function BudgetList({ budgets }: { budgets: BudgetWithSpent[] }) {
  return (
    <div className="space-y-4">
      {budgets.map((budget, index) => (
        <MotionEffect
          key={budget.id}
          slide={{ direction: "down" }}
          fade
          zoom
          inView
          delay={0.3 + index * 0.1}
        >
          <BudgetCard budget={budget} />
        </MotionEffect>
      ))}
    </div>
  );
}
