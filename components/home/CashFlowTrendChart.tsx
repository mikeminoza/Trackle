"use client";

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
import { TransactionAggregate } from "@/types/dashboard";
import { formatCurrency, formatCompactCurrency } from "@/lib/utils/formatCurrency";

interface CashFlowTrendChartProps {
  data: TransactionAggregate[];
  selectedYear: number | null;
}

const chartConfig = {
  balance: {
    label: "Cash Flow Balance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function getCumulativeBalance(data: CashFlowTrendChartProps["data"]) {
  let cumulative = 0;
  return data.map((d) => {
    cumulative += d.income - d.expenses;
    return { month: d.month.slice(0, 3), balance: cumulative };
  });
}

export default function CashFlowTrendChart({ data, selectedYear }: CashFlowTrendChartProps) {
  const chartData = getCumulativeBalance(data);

  const firstMonth = chartData[0]?.month || "";
  const lastMonth = chartData[chartData.length - 1]?.month || "";
  const description = firstMonth && lastMonth ? `${firstMonth} - ${lastMonth} ${selectedYear}` : "";

  const latestBalance = chartData[chartData.length - 1]?.balance || 0;
  const previousBalance = chartData[chartData.length - 2]?.balance || 0;
  const trendPercent =
    previousBalance !== 0
      ? ((latestBalance - previousBalance) / Math.abs(previousBalance)) * 100
      : 0;
  const trendMessage =
    trendPercent > 0 ? (
      <>
        Your balance increased by <strong>{trendPercent.toFixed(1)}%</strong> this month.
      </>
    ) : trendPercent < 0 ? (
      <>
        Your balance decreased by <strong>{Math.abs(trendPercent).toFixed(1)}%</strong> this month.
      </>
    ) : (
      "Your balance remained the same this month."
    );

  const totalIncome = data.reduce((sum, d) => sum + d.income, 0);
  const totalExpenses = data.reduce((sum, d) => sum + d.expenses, 0);
  const summaryMessage =
    totalIncome > totalExpenses
      ? "Overall, you earned more than you spent over this period."
      : totalExpenses > totalIncome
        ? "Overall, you spent more than you earned over this period."
        : "Your income and expenses were equal over this period.";

  return (
    <MotionEffect key={"cashflowtrend"} slide={{ direction: "down" }} fade zoom delay={0.3 * 0.1}>
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow Trend</CardTitle>
          <CardDescription>{description}</CardDescription>
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
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value: number) => formatCompactCurrency(value)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) =>
                      formatCurrency(typeof value === "number" ? value : Number(value))
                    }
                  />
                }
              />
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
          <div className="text-muted-foreground leading-none">{trendMessage}</div>
          <div className="text-muted-foreground leading-none">{summaryMessage}</div>
        </CardFooter>
      </Card>
    </MotionEffect>
  );
}
