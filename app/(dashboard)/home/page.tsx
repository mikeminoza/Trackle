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
import { useAvailableYearQuery } from "@/lib/queries/useAvailableYearQuery";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import YearFilter from "@/components/home/YearFilter";
import AiInsights from "@/components/home/AiInsights";

export default function Page() {
  const { data: user } = useUser();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const { searchParams } = useUpdateQueryParams();
  const selectedYear = Number(searchParams.get("year")) || currentYear;
  const selectedMonth = Number(searchParams.get("month")) || currentMonth;

  const { data: availableYears = [] } = useAvailableYearQuery(user?.id);
  const {
    data: financialSummary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useFinancialSummaryQuery(user?.id);
  const {
    data: aggregates,
    isLoading: isAggregatesLoading,
    isError: isAggregatesError,
  } = useTransactionAggregatesQuery(user?.id, selectedYear);
  const {
    data: spendingBreakdown,
    isLoading: isSpendingLoading,
    isError: isSpendingError,
  } = useSpendingBreakdownQuery(user?.id, selectedYear, selectedMonth);
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

      <div className="flex-1 overflow-y-auto px-6 my-6 flex flex-col gap-4 outline-none focus:outline-none">
        {isLoading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorMessage message={errorMessage} />
        ) : (
          <>
            {/* dashboard kpi  */}
            <FinancialSummary summary={financialSummary?.[0]} />

            <AiInsights
              userId={user?.id}
              payload={{
                financialSummary: financialSummary?.[0] ?? null,
                aggregates: aggregates ?? null,
                spendingBreakdown: spendingBreakdown ?? null,
                budgets: budgets ?? null,
              }}
            />
            {/* year filter  */}
            <YearFilter availableYears={availableYears} selectedYear={selectedYear} />
            {/* charts  */}
            <IncomeExpenseChart data={aggregates || []} selectedYear={selectedYear} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <CashFlowTrendChart data={aggregates || []} selectedYear={selectedYear} />
              <SpendingChart
                data={spendingBreakdown || []}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
              />
              <BudgetProgress budgets={budgets} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
