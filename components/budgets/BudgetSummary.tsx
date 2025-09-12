"use client";

import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BudgetSummary as BudgetSummaryType } from "@/types/budget";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import BudgetSummarySkeleton from "../skeletons/BudgetSummarySkeleton";
import ErrorKpiQueryMessage from "../ErrorKpiQueryMessage";

interface BudgetSummaryProps {
  summary?: BudgetSummaryType;
  isLoading?: boolean;
  isError?: boolean;
}

export default function BudgetSummary({ summary, isLoading, isError }: BudgetSummaryProps) {
  if (isLoading || !summary) return <BudgetSummarySkeleton />;
  if (isError) return <ErrorKpiQueryMessage />;

  const summaryCards = [
    {
      title: "Total Budget",
      description: "All categories combined",
      value: formatCurrency(summary.total_budget),
      color: "text-foreground",
    },
    {
      title: "Spent",
      description: "Across all categories",
      value: formatCurrency(summary.total_spent),
      color: "text-red-500",
    },
    {
      title: "Remaining",
      description: "Unspent budget",
      value: formatCurrency(summary.remaining),
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {summaryCards.map((card, index) => (
        <MotionEffect
          key={index}
          slide={{ direction: "down" }}
          fade
          zoom
          inView
          delay={0.3 + index * 0.1}
        >
          <Card>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className={`text-2xl font-bold ${card.color}`}>{card.value}</CardContent>
          </Card>
        </MotionEffect>
      ))}
    </div>
  );
}
