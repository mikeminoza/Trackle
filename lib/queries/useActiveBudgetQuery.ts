import { useQuery } from "@tanstack/react-query"; 
import { getActiveBudgets } from "@/services/budget"; 
import { BudgetWithSpent } from "@/types/budget";

export const useActiveBudgetQuery = (userId?: string) =>
  useQuery<BudgetWithSpent[], Error>({
    queryKey: ["activeBudgets", userId],
    queryFn: () => getActiveBudgets(userId!),
    enabled: !!userId,  
  });
