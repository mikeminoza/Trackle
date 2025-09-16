"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { SpendingBreakdown } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { getCategoryLabel } from "@/constants/categories";
import MonthFilter from "./MonthFilter";
import { months } from "@/constants/months";

const chartConfig = {
  amount: {
    label: "Expenses",
  },
} satisfies ChartConfig;

interface SpendingBreakdownProps {
  data?: SpendingBreakdown[];
  selectedMonth: number | null;
  selectedYear: number | null;
}

export default function SpendingChart({
  data,
  selectedMonth,
  selectedYear,
}: SpendingBreakdownProps) {
  const chartData =
    data?.map((item, index) => ({
      category: getCategoryLabel(item.category),
      amount: item.amount,
      fill: `hsl(var(--chart-${(index % 5) + 1}))`,
    })) ?? [];

  const totalAmount = chartData.reduce((acc, curr) => acc + curr.amount, 0);

  const monthName = selectedMonth
    ? months.find((m) => Number(m.value) === selectedMonth)?.label
    : "Recent months";

  const description = `${monthName} ${selectedYear}`;

  const topCategory =
    chartData.length > 0
      ? chartData.reduce((prev, curr) => (curr.amount > prev.amount ? curr : prev))
      : null;

  const summaryMessage = topCategory ? (
    <>
      Your highest spending category was <strong>{topCategory.category}</strong>.
    </>
  ) : (
    "No spending data available for this month."
  );

  return (
    <MotionEffect key={"spending"} slide={{ direction: "down" }} fade zoom inView delay={0.3 * 0.1}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Spending Breakdown</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <MonthFilter selectedMonth={selectedMonth} />
          </div>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            {formatCurrency(totalAmount)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-sm">
          <div className="text-muted-foreground leading-none">{summaryMessage}</div>
        </CardFooter>
      </Card>
    </MotionEffect>
  );
}
