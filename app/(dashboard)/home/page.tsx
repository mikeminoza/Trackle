"use client";
import { ContentHeader } from "@/components/sidebar/content-header";
import FinancialSummary from "@/components/home/FInancialSummary";
import SpendingChart from "@/components/home/SpendingChart";
import IncomeExpenseChart from "@/components/home/IncomeExpenseChart";
import BudgetProgress from "@/components/home/BudgetProgress";
import CashFlowTrendChart from "@/components/home/CashFlowTrendChart";
import { useUser } from "@/hooks/useUser";
import { useFinancialSummaryQuery } from "@/lib/queries/useFinancialSummaryQuery ";
import { useTransactionAggregatesQuery } from "@/lib/queries/useTransactionAggregatesQuery";
import { useSpendingBreakdownQuery } from "@/lib/queries/useSpendingBreakdownQuery";
import { useBudgetQuery } from "@/lib/queries/useBudgetQuery";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";

export default function Page() {
  const { data: user } = useUser();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const {
    data: financialSummary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useFinancialSummaryQuery(user?.id);
  const {
    data: aggregates,
    isLoading: isAggregatesLoading,
    isError: isAggregatesError,
  } = useTransactionAggregatesQuery(user?.id, currentYear);
  const {
    data: spendingBreakdown,
    isLoading: isSpendingLoading,
    isError: isSpendingError,
  } = useSpendingBreakdownQuery(user?.id, currentYear, currentMonth);
  const {
    data: budgets,
    isLoading: isBudgetsLoading,
    isError: isBudgetsError,
  } = useBudgetQuery(user?.id, { status: "active" });

  const isLoading =
    isSummaryLoading || isAggregatesLoading || isSpendingLoading || isBudgetsLoading;
  const isError = isSummaryError || isAggregatesError || isSpendingError || isBudgetsError;

  const errorMessage = isSummaryError
    ? "Failed to load financial summary."
    : isAggregatesError
      ? "Failed to load transaction aggregates."
      : isSpendingError
        ? "Failed to load spending breakdown."
        : isBudgetsError
          ? "Failed to load budgets."
          : undefined;

  return (
    <>
      <ContentHeader title="Dashboard" breadcrumbs={[]} />

      <div className="flex-1 w-full flex flex-col gap-4 my-6 px-6">
        {isLoading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorMessage message={errorMessage} />
        ) : (
          <>
            {/* dashboard kpi  */}
            <FinancialSummary summary={financialSummary?.[0]} />
            {/* charts  */}
            <IncomeExpenseChart data={aggregates || []} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <CashFlowTrendChart data={aggregates || []} />
              <SpendingChart data={spendingBreakdown || []} />
              <BudgetProgress budgets={budgets} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
