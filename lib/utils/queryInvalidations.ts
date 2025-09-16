import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const invalidateUserData = (
  queryClient: QueryClient,
  userId: string,
  message?: string
) => {
  const keys = [
    ["transactions", userId],
    ["budgets", userId],
    ["budgetSummary", userId],
    ["financialSummary", userId],
    ["transactionAggregates", userId],
    ["spendingBreakdown", userId],
    ["years", userId]
  ];

  keys.forEach((key) => {
    queryClient.invalidateQueries({ queryKey: key });
  });

  if (message) {
    toast.success(message);
  }
};
