"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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

// Example dataset: cumulative balance (income - expenses over time)
const chartData = [
  { month: "January", balance: 5000 },
  { month: "February", balance: 3000 },
  { month: "March", balance: 6500 },
  { month: "April", balance: 7200 },
  { month: "May", balance: 4800 },
  { month: "June", balance: 8000 },
];

const chartConfig = {
  balance: {
    label: "Cash Flow Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
export default function CashFlowTrendChart() {
  return (
    <MotionEffect
      key={"cashflowtrend"}
      slide={{ direction: "down" }}
      fade
      zoom
      inView
      delay={0.3 * 0.1}
    >
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Trend</CardTitle>
          <CardDescription>Overall balance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₱${value}`} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="balance"
                type="monotone"
                stroke="var(--color-balance)"
                strokeWidth={2}
                dot={{ fill: "var(--color-balance)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing cumulative balance (income – expenses) for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </MotionEffect>
  );
}
