import { getSpendingBreakdown } from "@/services/dashboard";
import { SpendingBreakdown } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useSpendingBreakdownQuery = (userId?: string, year?: number, month?: number) =>
  useQuery<SpendingBreakdown[], Error>({
    queryKey: ["spendingBreakdown", userId, year, month],
    queryFn: () => getSpendingBreakdown(userId!, year!, month!),
    enabled: !!userId && !!year && !!month,
  });