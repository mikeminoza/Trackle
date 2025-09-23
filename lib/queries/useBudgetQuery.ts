import { useQuery } from "@tanstack/react-query";
import { getBudgets } from "@/services/budget";
import { BudgetFilters, BudgetWithSpent } from "@/types/budget";

export const useBudgetQuery = (userId?: string, filters?: BudgetFilters) =>
  useQuery<BudgetWithSpent[], Error>({
    queryKey: ["budgets", userId, filters],
    queryFn: () => getBudgets(userId!, filters),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
