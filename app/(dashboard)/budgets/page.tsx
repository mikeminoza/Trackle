"use client";
import { ContentHeader } from "@/components/sidebar/content-header";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import BudgetDialog from "@/components/budgets/BudgetDialog";
import BudgetSummary from "@/components/budgets/BudgetSummary";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useBudgetSummaryQuery } from "@/lib/queries/useBudgetSummaryQuery";
import { useBudgetQuery } from "@/lib/queries/useBudgetQuery";
import BudgetList from "@/components/budgets/BudgetList";
import ErrorQueryMessage from "@/components/ErrorQueryMessage";
import NoResults from "@/components/NoResult";
import BudgetSkeleton from "@/components/skeletons/BudgetSkeleton";
import BudgetFilter from "@/components/budgets/BudgetFilter";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import { BudgetFilters } from "@/types/budget";
import { Plus } from "lucide-react";

function AddBudgetButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.3}>
        <Button className="gap-2" onClick={onClick}>
          <Plus className="h-4 w-4" /> Add Budget
        </Button>
      </MotionEffect>
      <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.3}>
        <BudgetFilter />
      </MotionEffect>
    </div>
  );
}

export default function BudgetPage() {
  const { searchParams, hasFiltersApplied } = useUpdateQueryParams();
  const filters: BudgetFilters = {
    status: (searchParams.get("status") as "active" | "inactive") ?? "active",
    category: searchParams.get("category") ?? "all",
    period: searchParams.get("period") ?? "all",
    recurring: (searchParams.get("recurring") as "yes" | "no") ?? "all",
    carryover: (searchParams.get("carryover") as "yes" | "no") ?? "all",
    progress: (searchParams.get("progress") as "under50" | "50to100" | "over100") ?? "all",
  };

  const filtersApplied = hasFiltersApplied([
    "status",
    "category",
    "period",
    "recurring",
    "carryover",
    "progress",
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const { data: user } = useUser();
  const {
    data: budgetSummary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useBudgetSummaryQuery(user?.id, filters);

  const {
    data: budgets,
    isLoading: isBudgetsLoading,
    isError: isBudgetsError,
  } = useBudgetQuery(user?.id, filters);

  return (
    <>
      <ContentHeader title="Budgets" breadcrumbs={[]} />
      <div className="flex-1 overflow-y-auto px-6 my-6 flex flex-col gap-4 outline-none focus:outline-none">
        {/* Budget Summary  */}
        <BudgetSummary
          summary={budgetSummary}
          filters={filters}
          isLoading={isSummaryLoading}
          isError={isSummaryError}
        />

        <AddBudgetButton onClick={() => setAddOpen(true)} />
        {/* Budget List  */}
        {isBudgetsLoading ? (
          <BudgetSkeleton />
        ) : isBudgetsError ? (
          <ErrorQueryMessage />
        ) : !budgets || (budgets.length === 0 && !filtersApplied) ? (
          <MotionEffect fade zoom slide={{ direction: "up" }} delay={0.3} inView>
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-muted/30 border border-dashed rounded-2xl text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">You haven&apos;t added any budgets yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Keep your finances on track by creating budgets for your spending categories. Click
                the <strong>&quot;Add Budget&quot;</strong> button above to get started.
              </p>
            </div>
          </MotionEffect>
        ) : filtersApplied && budgets.length === 0 ? (
          <NoResults message="No budgets match your filters" />
        ) : (
          <BudgetList budgets={budgets} />
        )}
      </div>

      {/* Add Budget Dialog  */}
      <BudgetDialog mode="add" label="Add" open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
