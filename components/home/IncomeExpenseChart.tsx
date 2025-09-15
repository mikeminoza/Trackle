"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MotionEffect } from "../animate-ui/effects/motion-effect";
import { TransactionAggregate } from "@/types/dashboard";

const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-3))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface IncomeExpenseChartProps {
  data: TransactionAggregate[];
}

const monthOrder: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export default function IncomeExpenseChart({ data }: IncomeExpenseChartProps) {
  const chartData = data
    .sort((a, b) => monthOrder[a.month] - monthOrder[b.month])
    .map((d) => ({
      month: d.month.slice(0, 3),
      income: d.income,
      expenses: d.expenses,
    }));

  return (
    <MotionEffect
      key={"incomeexpense"}
      slide={{ direction: "down" }}
      fade
      zoom
      inView
      delay={0.3 * 0.1}
    >
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full aspect-square max-h-[250px]">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="income" fill={chartConfig.income.color} radius={4} />
              <Bar dataKey="expenses" fill={chartConfig.expenses.color} radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing Income vs Expenses trend for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </MotionEffect>
  );
}
