import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, CreditCard, Wallet } from "lucide-react";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { FinancialSummary as FinancialSummaryType } from "@/types/dashboard";

interface FinancialSummaryProps {
  summary?: FinancialSummaryType;
}

export default function FinancialSummary({ summary }: FinancialSummaryProps) {
  const { balance = 0, income_this_month = 0, expense_this_month = 0 } = summary || {};
  const items = [
    {
      title: "Total Balance",
      value: balance,
      description: "Income — Expenses",
      icon: DollarSign,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "This Month's Income",
      value: income_this_month,
      description: "All income categories combined",
      icon: CreditCard,
      iconColor: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "This Month's Expenses",
      value: expense_this_month,
      description: "Sum of all outflows",
      icon: Wallet,
      iconColor: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
