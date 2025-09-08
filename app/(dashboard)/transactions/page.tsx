"use client";

import { ContentHeader } from "@/components/sidebar/content-header";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CalendarFilter from "@/components/transactions/CalendarFilter";
import TransactionDialog from "@/components/transactions/TransactionDialog";
import TransactionFilter from "@/components/transactions/TransactionFilter";
import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import TransactionsSkeleton from "@/components/skeletons/TransactionSkeleton";
import { useTransactionsQuery } from "@/lib/queries/transactions/useTransactionQueries";
import { TransactionList } from "@/components/transactions/TransactionList";
import ErrorQueryMessage from "@/components/ErrorQueryMessage";
import { useUser } from "@/hooks/useUser";

export default function Page() {
  const { data: user } = useUser();
  const { data: transactions, isLoading, isError } = useTransactionsQuery(user?.id);

  return (
    <>
      <ContentHeader title="Transactions" breadcrumbs={[]} />

      <div className="flex-1 w-full flex flex-col my-6 px-6">
        {isLoading ? (
          <TransactionsSkeleton />
        ) : isError ? (
          <ErrorQueryMessage />
        ) : transactions ? (
          <>
            <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search transactions..." className="pl-8" />
                </div>
                <div className="flex items-center gap-2">
                  <CalendarFilter />
                  <TransactionFilter />
                  <TransactionDialog />
                </div>
              </div>
            </MotionEffect>
            <TransactionList transactions={transactions} />
          </>
        ) : (
          <MotionEffect fade zoom slide={{ direction: "up" }} delay={0.3} inView>
            <div className="flex flex-col items-center justify-center py-20 px-6 bg-muted/30 border border-dashed rounded-2xl text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Start tracking your expenses and income to see insights about your spending.
              </p>
              <TransactionDialog />
            </div>
          </MotionEffect>
        )}
      </div>
    </>
  );
}
