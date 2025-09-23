import { getFinancialSummary } from "@/services/dashboard";
import { FinancialSummary } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useFinancialSummaryQuery = (userId?: string) =>
  useQuery<FinancialSummary[], Error>({
    queryKey: ["financialSummary", userId],
    queryFn: () => getFinancialSummary(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
