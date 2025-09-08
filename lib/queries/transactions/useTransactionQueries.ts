import { useQuery } from '@tanstack/react-query';
import { getTransactions } from '@/services/transaction';
import { Transaction } from '@/types/db';

export const useTransactionsQuery = (userId?: string) => 
  useQuery<Transaction[]>({
    queryKey: ['transactions', userId],        
    queryFn: () => getTransactions(userId!),     
    enabled: !!userId,
  });