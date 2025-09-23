import { getSpendingBreakdown } from "@/services/dashboard";
import { SpendingBreakdown } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useSpendingBreakdownQuery = (userId?: string, year?: number, month?: number) =>
  useQuery<SpendingBreakdown[], Error>({
    queryKey: ["spendingBreakdown", userId, year, month],
    queryFn: () => getSpendingBreakdown(userId!, year!, month!),
    enabled: !!userId && !!year && !!month,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
