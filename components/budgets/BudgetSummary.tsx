"use client";

import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { BudgetFilters, BudgetSummary as BudgetSummaryType } from "@/types/budget";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import BudgetSummarySkeleton from "../skeletons/BudgetSummarySkeleton";
import ErrorKpiQueryMessage from "../ErrorKpiQueryMessage";

interface BudgetSummaryProps {
  summary?: BudgetSummaryType;
  filters?: BudgetFilters;
  isLoading?: boolean;
  isError?: boolean;
}

export default function BudgetSummary({
  summary,
  filters,
  isLoading,
  isError,
}: BudgetSummaryProps) {
  if (isLoading || !summary) return <BudgetSummarySkeleton />;
  if (isError) return <ErrorKpiQueryMessage />;
  const getFilterContext = () => {
    if (!filters) return "All categories combined";

    const parts: string[] = [];

    if (filters.status !== "active")
      parts.push(filters.status === "inactive" ? "Inactive" : "Active");
    if (filters.category !== "all") parts.push(`Category: ${filters.category}`);
    if (filters.period !== "all") parts.push(`Period: ${filters.period}`);
    if (filters.recurring !== "all")
      parts.push(filters.recurring === "yes" ? "Recurring" : "One-time");
    if (filters.carryover !== "all")
      parts.push(filters.carryover === "yes" ? "With carryover" : "Without carryover");
    if (filters.progress !== "all") {
      switch (filters.progress) {
        case "under50":
          parts.push("Under 50% spent");
          break;
        case "50to100":
          parts.push("50–100% spent");
          break;
        case "over100":
          parts.push("Over 100% spent");
          break;
      }
    }

    if (parts.length === 0) return "All categories combined";
    return parts.join(" | ");
  };

  const filterContext = getFilterContext();
  const summaryCards = [
    {
      title: "Total Budget",
      description: filterContext,
      value: formatCurrency(summary.total_budget),
      color: "text-foreground",
    },
    {
      title: "Spent",
      description: filterContext,
      value: formatCurrency(summary.total_spent),
      color: "text-red-500",
    },
    {
      title: "Remaining",
      description: filterContext,
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
