import { getFinancialSummary } from "@/services/dashboard";
import { FinancialSummary } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useFinancialSummaryQuery = (userId?: string) =>
  useQuery<FinancialSummary[], Error>({
    queryKey: ["financialSummary", userId],
    queryFn: () => getFinancialSummary(userId!),
    enabled: !!userId,
  });