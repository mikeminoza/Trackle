import { ContentHeader } from "@/components/sidebar/content-header";
import { Repeat, CalendarRange, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import BudgetDialog from "@/components/budgets/BudgetDialog";
import BudgetSummary from "@/components/budgets/BudgetSummary";

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

export default function BudgetPage() {
  const budgets = demoBudgets;

  return (
    <>
      <ContentHeader title="Budgets" breadcrumbs={[]} />

      <div className="flex-1 w-full flex flex-col my-6 px-6 space-y-8">
        {/* Summary */}
        <BudgetSummary />
        {/* Budgets List */}
        <div className="flex items-center justify-end mb-4">
          <BudgetDialog />
        </div>
        <div className="space-y-4">
          {budgets.map((b, index) => {
            const percent = Math.min((b.spent / b.limit) * 100, 100);

            return (
              <MotionEffect
                key={b.id}
                slide={{ direction: "down" }}
                fade
                zoom
                inView
                delay={0.3 + index * 0.1}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{b.category}</CardTitle>
                      <CardDescription>
                        Limit ₱{b.limit.toLocaleString()} • Spent ₱{b.spent.toLocaleString()}
                      </CardDescription>
                      <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarRange className="h-3 w-3" /> {b.period}
                        </span>
                        {b.recurring && (
                          <span className="flex items-center gap-1">
                            <Repeat className="h-3 w-3" /> Recurring
                          </span>
                        )}
                        {b.carryover && (
                          <span className="flex items-center gap-1">
                            <ArrowRight className="h-3 w-3" /> Carryover
                          </span>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={percent} />
                    <p
                      className={`mt-2 text-sm ${
                        percent >= 100 ? "text-red-500" : "text-muted-foreground"
                      }`}
                    >
                      {percent >= 100 ? "Budget exceeded!" : `${Math.round(percent)}% used`}
                    </p>
                  </CardContent>
                </Card>
              </MotionEffect>
            );
          })}
        </div>
      </div>
    </>
  );
}
