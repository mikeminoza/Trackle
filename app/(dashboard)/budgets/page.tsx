"use client";
import { ContentHeader } from "@/components/sidebar/content-header";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import BudgetDialog from "@/components/budgets/BudgetDialog";
import BudgetSummary from "@/components/budgets/BudgetSummary";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useActiveBudgetQuery } from "@/lib/queries/useActiveBudgetQuery";
import BudgetList from "@/components/budgets/BudgetList";
import TransactionsSkeleton from "@/components/skeletons/TransactionSkeleton";
import ErrorQueryMessage from "@/components/ErrorQueryMessage";
import NoResults from "@/components/NoResult";
import { Plus } from "lucide-react";

export default function BudgetPage() {
  const [addOpen, setAddOpen] = useState(false);
  const { data: user } = useUser();
  const { data: budgets, isLoading, isError } = useActiveBudgetQuery(user?.id);

  return (
    <>
      <ContentHeader title="Budgets" breadcrumbs={[]} />

      <div className="flex-1 w-full flex flex-col my-6 px-6 space-y-8">
        {/* Summary */}
        {budgets && budgets.length > 0 && <BudgetSummary />}
        {/* Budgets List */}
        <div className="flex items-center justify-end mb-4">
          <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.3}>
            <Button className="gap-2" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" /> Add Budget
            </Button>
          </MotionEffect>
        </div>
        {isLoading ? (
          <TransactionsSkeleton />
        ) : isError ? (
          <ErrorQueryMessage />
        ) : budgets && budgets.length > 0 ? (
          <BudgetList budgets={budgets} />
        ) : false ? (
          <NoResults message="No budgets match your filters" />
        ) : (
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
        )}
      </div>

      {/* Add Budget Dialog  */}
      <BudgetDialog mode="add" label="Add" open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
