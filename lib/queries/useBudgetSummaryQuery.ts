import { useQuery } from "@tanstack/react-query";
import { getBudgetSummary } from "@/services/budget";
import { BudgetFilters, BudgetSummary } from "@/types/budget";

export const useBudgetSummaryQuery = (userId?: string, filters?: BudgetFilters) =>
  useQuery<BudgetSummary, Error>({
    queryKey: ["budgetSummary", userId, filters],
    queryFn: () => getBudgetSummary(userId!, filters),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
