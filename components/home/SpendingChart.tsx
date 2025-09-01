"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
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

export const description = "A donut chart with text";

const chartData = [
  { category: "Food", amount: 3200, fill: "hsl(var(--chart-1))" },
  { category: "Rent", amount: 8500, fill: "hsl(var(--chart-2))" },
  { category: "Transport", amount: 1500, fill: "hsl(var(--chart-3))" },
  { category: "Entertainment", amount: 2200, fill: "hsl(var(--chart-4))" },
  { category: "Other", amount: 900, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  amount: {
    label: "Expenses",
  },
  Food: { label: "Food", color: "hsl(var(--chart-1))" },
  Rent: { label: "Rent", color: "hsl(var(--chart-2))" },
  Transport: { label: "Transport", color: "hsl(var(--chart-3))" },
  Entertainment: { label: "Entertainment", color: "hsl(var(--chart-4))" },
  Other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

export default function SpendingChart() {
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <MotionEffect key={"spending"} slide={{ direction: "down" }} fade zoom inView delay={0.3 * 0.1}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Spending Breakdown</CardTitle>
          <CardDescription>January – June 2024</CardDescription>
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
                            ₱{totalAmount.toLocaleString()}
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
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total expenses for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </MotionEffect>
  );
}
