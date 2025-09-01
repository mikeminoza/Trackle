"use client";

import { TrendingUp } from "lucide-react";
import { PolarGrid, RadialBar, RadialBarChart } from "recharts";

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

export const description = "Savings Goals Progress with radial bars";

// Example savings goals
const chartData = [
  {
    goal: "Emergency Fund",
    saved: 12000,
    target: 20000,
    monthsLeft: 2,
    fill: "hsl(var(--chart-1))",
  },
  {
    goal: "Vacation",
    saved: 8000,
    target: 10000,
    monthsLeft: 5,
    fill: "hsl(var(--chart-2))",
  },
  {
    goal: "New Laptop",
    saved: 25000,
    target: 50000,
    monthsLeft: 12,
    fill: "hsl(var(--chart-3))",
  },
];

// Transform into percentage progress
const radialData = chartData.map((g) => ({
  name: g.goal,
  progress: Math.round((g.saved / g.target) * 100),
  fill: g.fill,
}));

const chartConfig = {
  progress: {
    label: "Progress",
  },
} satisfies ChartConfig;

export default function Savings() {
  return (
    <MotionEffect key={"savings"} slide={{ direction: "down" }} fade zoom inView delay={0.3 * 0.1}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Savings Goals Progress</CardTitle>
          <CardDescription>Track your active goals</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
            <RadialBarChart
              data={radialData}
              innerRadius={30}
              outerRadius={100}
              startAngle={90}
              endAngle={-270}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="name" />}
              />
              <PolarGrid gridType="circle" />
              <RadialBar dataKey="progress" background />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-sm w-full">
          {chartData.map((g) => (
            <div key={g.goal} className="flex flex-col w-full">
              <div className="flex justify-between font-medium">
                <span>{g.goal}</span>
                <span>
                  {g.saved.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                    minimumFractionDigits: 0,
                  })}{" "}
                  /{" "}
                  {g.target.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
              <span className="text-muted-foreground text-xs">
                {Math.round((g.saved / g.target) * 100)}% – {g.monthsLeft} months left
              </span>
            </div>
          ))}

          <div className="flex items-center gap-2 leading-none font-medium mt-2">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </MotionEffect>
  );
}
