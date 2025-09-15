import { getTransactionAggregates } from "@/services/dashboard";
import { TransactionAggregate } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export const useTransactionAggregatesQuery = (userId?: string, year?: number) =>
  useQuery<TransactionAggregate[], Error>({
    queryKey: ["transactionAggregates", userId, year],
    queryFn: () => getTransactionAggregates(userId!, year!),
    enabled: !!userId && !!year,
  });