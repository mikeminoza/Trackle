"use client";

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
import { monthOrder } from "@/constants/months";
import { formatCurrency } from "@/lib/utils/formatCurrency";

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
  selectedYear: number | null;
}

export default function IncomeExpenseChart({ data, selectedYear }: IncomeExpenseChartProps) {
  const chartData = data
    .sort((a, b) => monthOrder[a.month] - monthOrder[b.month])
    .map((d) => ({
      month: d.month.slice(0, 3),
      income: d.income,
      expenses: d.expenses,
    }));

  const firstMonth = chartData[0]?.month || "";
  const lastMonth = chartData[chartData.length - 1]?.month || "";
  const description =
    firstMonth && lastMonth && selectedYear ? `${firstMonth} - ${lastMonth} ${selectedYear}` : "";

  const totalIncome = chartData.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = chartData.reduce((sum, d) => sum + d.expenses, 0);
  let summaryMessage = "";
  if (totalIncome > totalExpenses) {
    summaryMessage = `You earned more than you spent over this period.`;
  } else if (totalExpenses > totalIncome) {
    summaryMessage = `You spent more than you earned over this period.`;
  } else {
    summaryMessage = `Your income and expenses were equal over this period.`;
  }

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
          <CardDescription>{description}</CardDescription>
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
          <div className="text-muted-foreground leading-none">
            Total Income: <strong>{formatCurrency(totalIncome)}</strong> | Total Expenses:{" "}
            <strong>{formatCurrency(totalExpenses)}</strong>
          </div>
          <div className="text-muted-foreground leading-none">{summaryMessage}</div>
        </CardFooter>
      </Card>
    </MotionEffect>
  );
}
