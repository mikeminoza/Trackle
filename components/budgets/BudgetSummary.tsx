"use client";

import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Fake data for demo
const demoBudgets = [
  {
    id: 1,
    category: "Food",
    limit: 5000,
    spent: 3200,
    recurring: true,
    carryover: false,
    period: "Monthly",
  },
  {
    id: 2,
    category: "Transport",
    limit: 2000,
    spent: 800,
    recurring: false,
    carryover: true,
    period: "Weekly",
  },
  {
    id: 3,
    category: "Subscriptions",
    limit: 1500,
    spent: 1500,
    recurring: true,
    carryover: false,
    period: "Monthly",
  },
  {
    id: 4,
    category: "Shopping",
    limit: 4000,
    spent: 2200,
    recurring: false,
    carryover: true,
    period: "Monthly",
  },
];

export default function BudgetSummary() {
  const budgets = demoBudgets;

  const totalBudget = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  const summaryCards = [
    {
      title: "Total Budget",
      description: "All categories combined",
      value: `₱${totalBudget.toLocaleString()}`,
      color: "text-foreground",
    },
    {
      title: "Spent",
      description: "Across all categories",
      value: `₱${totalSpent.toLocaleString()}`,
      color: "text-red-500",
    },
    {
      title: "Remaining",
      description: "Unspent budget",
      value: `₱${remaining.toLocaleString()}`,
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
          delay={0.3 + index * 0.1} // stagger effect
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
