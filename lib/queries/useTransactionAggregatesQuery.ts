import { getTransactionAggregates } from "@/services/dashboard";
import { TransactionAggregate } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useTransactionAggregatesQuery = (userId?: string, year?: number) =>
  useQuery<TransactionAggregate[], Error>({
    queryKey: ["transactionAggregates", userId, year],
    queryFn: () => getTransactionAggregates(userId!, year!),
    enabled: !!userId && !!year,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
