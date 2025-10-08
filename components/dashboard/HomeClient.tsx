"use client";
import ContentHeader from "@/components/sidebar/content-header";
import FinancialSummary from "@/components/home/FInancialSummary";
import SpendingChart from "@/components/home/SpendingChart";
import IncomeExpenseChart from "@/components/home/IncomeExpenseChart";
import BudgetProgress from "@/components/home/BudgetProgress";
import CashFlowTrendChart from "@/components/home/CashFlowTrendChart";
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
import { useUserContext } from "@/context/UserContext";
import EmptyState from "./EmptyState";
import { BarChart3, PiggyBank, Target, Wallet } from "lucide-react";

export default function HomeClient() {
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserContext();
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const { searchParams, hasFiltersApplied } = useUpdateQueryParams();
  const selectedYear = Number(searchParams.get("year")) || currentYear;
  const selectedMonth = Number(searchParams.get("month")) || currentMonth;

  const filtersApplied = hasFiltersApplied(["year", "month"]);

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
    isUserLoading ||
    isSummaryLoading ||
    isAggregatesLoading ||
    isSpendingLoading ||
    isBudgetsLoading;
  const isError =
    isUserError || isSummaryError || isAggregatesError || isSpendingError || isBudgetsError;

  const errorMessage = isSummaryError
    ? "Failed to load financial summary."
    : isAggregatesError
      ? "Failed to load transaction aggregates."
      : isSpendingError
        ? "Failed to load spending breakdown."
        : isBudgetsError
          ? "Failed to load budgets."
          : isUserError
            ? "Something went wrong!"
            : undefined;

  return (
    <>
      <ContentHeader title="Dashboard" breadcrumbs={[]} />

      <div className="flex-1 overflow-y-auto px-6 my-3 flex flex-col gap-4 outline-none focus:outline-none">
        {isLoading ? (
          <DashboardSkeleton />
        ) : isError ? (
          <ErrorMessage message={errorMessage} />
        ) : (
          <>
            {/* dashboard kpi  */}
            <FinancialSummary summary={financialSummary?.[0]} />
            {/* ai insights  */}
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
            {availableYears.length > 0 && (
              <YearFilter availableYears={availableYears} selectedYear={selectedYear} />
            )}
            {/* charts  */}
            {aggregates?.length || filtersApplied ? (
              <IncomeExpenseChart data={aggregates ?? []} selectedYear={selectedYear} />
            ) : (
              <EmptyState
                title="No Transactions Yet"
                description="Start adding your income and expenses to visualize your cash flow."
                icon={<Wallet className="h-8 w-8 text-muted-foreground" />}
              />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {aggregates?.length || filtersApplied ? (
                <CashFlowTrendChart data={aggregates ?? []} selectedYear={selectedYear} />
              ) : (
                <EmptyState
                  title="No Cash Flow Data"
                  description="Track your transactions to see your cash flow trend."
                  icon={<BarChart3 className="h-8 w-8 text-muted-foreground" />}
                />
              )}
              {spendingBreakdown?.length || filtersApplied ? (
                <SpendingChart
                  data={spendingBreakdown ?? []}
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                />
              ) : (
                <EmptyState
                  title="No Spending Data"
                  description="Track your expenses to see a breakdown of your spending."
                  icon={<PiggyBank className="h-8 w-8 text-muted-foreground" />}
                />
              )}
              {budgets?.length || filtersApplied ? (
                <BudgetProgress budgets={budgets ?? []} />
              ) : (
                <EmptyState
                  title="No Budgets Yet"
                  description="Set budgets to start tracking your spending goals."
                  icon={<Target className="h-8 w-8 text-muted-foreground" />}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
