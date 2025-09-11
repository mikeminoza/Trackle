import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "@/services/transaction";
import { Transaction } from "@/types/db";

export const useTransactionsQuery = (
  userId?: string, 
  filters?: {
    search?: string;
    type?: "all" | "income" | "expense";
    category?: string;
    minAmount?: number;
    maxAmount?: number;
    date?: string;
  }, 
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
