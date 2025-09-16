"use client";

import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { format, isToday } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { TransactionItem } from "./TransactionItem";
import { Transaction } from "@/types/db";
import { TransactionFilters } from "@/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  filters?: TransactionFilters;
}

export function TransactionList({ transactions, filters }: TransactionListProps) {
  const grouped = Object.groupBy(transactions, (tx) =>
    tx.date ? new Date(tx.date).toISOString().split("T")[0] : "unknown"
  );
  const sortedEntries = Object.entries(grouped).sort(([dateA], [dateB]) => {
    if (dateA === "unknown") return 1;
    if (dateB === "unknown") return -1;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  return (
    <div className="space-y-6">
      {sortedEntries.map(([date, txs = []], i) => {
        const totalExpense = txs
          .filter((t) => t.type === "expense")
          .reduce((s, t) => s + t.amount, 0);
        const totalIncome = txs
          .filter((t) => t.type === "income")
          .reduce((s, t) => s + t.amount, 0);

        const label =
          date === "unknown"
            ? "Unknown Date"
            : isToday(new Date(date))
              ? "Today"
              : format(new Date(date), "MMMM d, yyyy");

        return (
          <MotionEffect
            key={date}
            slide={{ direction: "down" }}
            fade
            zoom
            inView
            delay={0.2 + i * 0.1}
          >
            <section>
              <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-3">
                <span>{label}</span>
                {(filters?.type === "expense" || filters?.type === "all" || !filters?.type) && (
                  <Badge variant="outline" className="text-red-300">
                    Spent {formatCurrency(totalExpense)}
                  </Badge>
                )}

                {(filters?.type === "income" || filters?.type === "all" || !filters?.type) && (
                  <Badge variant="outline" className="text-green-300">
                    Earned {formatCurrency(totalIncome)}
                  </Badge>
                )}
              </h2>
              <ul className="divide-y bg-card border">
                {txs.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </ul>
            </section>
          </MotionEffect>
        );
      })}
    </div>
  );
}
