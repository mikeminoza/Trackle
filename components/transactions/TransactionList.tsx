"use client";

import { MotionEffect } from "@/components/animate-ui/effects/motion-effect";
import { format, isToday } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { TransactionItem } from "./Transactiontem";
import { Transaction } from "@/types/db";

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const grouped = Object.groupBy(transactions, (tx) =>
    tx.created_at ? new Date(tx.created_at).toISOString().split("T")[0] : "unknown"
  );

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, txs = []], i) => {
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
                <Badge variant="outline" className="text-red-300">
                  Spent {formatCurrency(totalExpense)}
                </Badge>
                <Badge variant="outline" className="text-green-300">
                  Earned {formatCurrency(totalIncome)}
                </Badge>
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
