"use client";

import { ContentHeader } from "@/components/sidebar/content-header";
import { Loader2, Plus } from "lucide-react";
import TransactionDialog from "@/components/transactions/TransactionDialog";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import TransactionsSkeleton from "@/components/skeletons/TransactionSkeleton";
import TransactionSearch from "@/components/transactions/TransactionSearch";
import { useTransactionsQuery } from "@/lib/queries/useTransactionQuery";
import { TransactionList } from "@/components/transactions/TransactionList";
import ErrorQueryMessage from "@/components/ErrorQueryMessage";
import { useUser } from "@/hooks/useUser";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import NoResults from "@/components/NoResult";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TransactionFilters } from "@/types/transaction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const { searchParams, setParam, hasFiltersApplied } = useUpdateQueryParams();
  const filters: TransactionFilters = {
    search: searchParams.get("query") ?? "",
    type: (searchParams.get("type") as "all" | "income" | "expense") ?? "all",
    category: searchParams.get("category") ?? "all",
    minAmount: searchParams.get("minAmount") ? Number(searchParams.get("minAmount")) : undefined,
    maxAmount: searchParams.get("maxAmount") ? Number(searchParams.get("maxAmount")) : undefined,
    date: searchParams.get("date") ?? "",
    period: (searchParams.get("period") as "all" | "today" | "thisWeek" | "thisMonth") ?? "all",
  };

  const filtersApplied = hasFiltersApplied([
    "query",
    "type",
    "category",
    "minAmount",
    "maxAmount",
    "date",
    "period",
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const { data: user } = useUser();
  const {
    data: transactions,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTransactionsQuery(user?.id, filters, 10);

  return (
    <>
      <ContentHeader title="Transactions" breadcrumbs={[]} />

      <div className="flex-1 overflow-y-auto px-6 my-3 flex flex-col gap-4 outline-none focus:outline-none">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          <div className="relative w-full sm:w-64">
            <TransactionSearch />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={searchParams.get("period") ?? "all"}
              onValueChange={(val) => setParam("period", val)}
            >
              <SelectTrigger className="justify-between font-normal">
                <SelectValue placeholder="Filter by period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
              </SelectContent>
            </Select>
            <TransactionFilter />
            <Button className="gap-1" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" /> Add
              <span className="hidden sm:inline"> Transaction</span>
            </Button>
          </div>
        </div>
        {/* Transaction List  */}
        {isLoading ? (
          <TransactionsSkeleton />
        ) : isError ? (
          <ErrorQueryMessage />
        ) : !transactions || (transactions.length === 0 && !filtersApplied) ? (
          <MotionEffect fade zoom slide={{ direction: "up" }} delay={0.3} inView>
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-muted/30 border border-dashed rounded-2xl text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Start tracking your expenses and income to see insights about your spending.
              </p>
            </div>
          </MotionEffect>
        ) : filtersApplied && transactions.length === 0 ? (
          <NoResults message="No transactions match your filters" />
        ) : (
          <>
            <TransactionList transactions={transactions} filters={filters} />

            {hasNextPage && (
              <div className="mt-4 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <button
                  onClick={() => {
                    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                  }}
                  disabled={isFetchingNextPage}
                  className="bg-background text-muted-foreground relative z-10 px-3 py-1 rounded-md hover:bg-muted/50 transition"
                >
                  {isFetchingNextPage ? <Loader2 className="h-4 w-4 animate-spin" /> : "View More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Transaction Dialog  */}
      <TransactionDialog mode="add" label="Add" open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
