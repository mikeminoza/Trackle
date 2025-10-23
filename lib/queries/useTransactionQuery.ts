import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactionsService } from "@/services/transaction";
import { Transaction } from "@/types/db";
import { TransactionFilters } from "@/types/transaction";

export const useTransactionsQuery = (userId?: string, filters?: TransactionFilters, limit = 15) =>
  useInfiniteQuery<Transaction[], Error, Transaction[]>({
    queryKey: ["transactions", userId, filters, limit],
    queryFn: ({ pageParam }) =>
      getTransactionsService({ userId: userId!, page: Number(pageParam ?? 0), limit, ...filters }),
    enabled: !!userId,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
  });
