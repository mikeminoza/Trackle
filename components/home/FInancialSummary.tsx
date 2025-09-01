"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, CreditCard, Wallet, PieChart } from "lucide-react";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";

function formatCurrency(value: number) {
  if (typeof value !== "number") return "—";
  return value.toLocaleString("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  });
}

export default function FinancialSummary({
  totalBalance = 125000,
  incomeThisMonth = 150000,
  expensesThisMonth = 25000,
  remainingBudget = 35000,
} = {}) {
  const items = [
    {
      title: "Total Balance",
      value: totalBalance,
      description: "Income — Expenses",
      icon: DollarSign,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "This Month's Income",
      value: incomeThisMonth,
      description: "All income categories combined",
      icon: CreditCard,
      iconColor: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "This Month's Expenses",
      value: expensesThisMonth,
      description: "Sum of all outflows",
      icon: Wallet,
      iconColor: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Remaining Budget",
      value: remainingBudget,
      description: "Across all categories",
      icon: PieChart,
      iconColor: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <MotionEffect
            key={index}
            slide={{ direction: "down" }}
            fade
            zoom
            inView
            delay={0.3 + index * 0.1}
          >
            <Card className="p-4 shadow-sm">
              <CardHeader className="p-0 pb-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.bgColor} shadow-sm`}>
                    <Icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0 mt-1">
                <div className="text-xl font-semibold">{formatCurrency(item.value)}</div>
                <CardDescription className="text-xs text-muted-foreground">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          </MotionEffect>
        );
      })}
    </section>
  );
}
