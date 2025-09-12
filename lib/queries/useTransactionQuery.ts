import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "@/services/transaction";
import { Transaction } from "@/types/db";
import { TransactionFilters } from "@/types/transaction";

export const useTransactionsQuery = (
  userId?: string, 
  filters?: TransactionFilters, 
  limit = 15) =>
  useInfiniteQuery<Transaction[], Error>({
    queryKey: ["transactions", userId, filters],
    queryFn: ({ pageParam }) => getTransactions(userId!, pageParam as number, limit, filters),
    enabled: !!userId,
    initialPageParam: 0, 
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length : undefined;
    },
  });
