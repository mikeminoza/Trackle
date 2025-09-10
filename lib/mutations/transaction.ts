import { useMutation, useQueryClient } from '@tanstack/react-query';  
import { createTransactionService, updateTransactionService, deleteTransactionService} from '@/services/transaction';
import { TransactionUpdate } from '@/types/db';
 

export function useTransaction() {
  const queryClient = useQueryClient();

  // Create
  const createTransaction = useMutation({ 
    mutationFn: createTransactionService, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['transactions', data.user_id],
      });
    },
    onError: (error) => {
      console.error(`Error creating transaction: ${(error as Error).message}`);
    },
  });

  // Update
  const updateTransaction = useMutation({ 
    mutationFn: ({ id, updates }: { id: string; updates: TransactionUpdate }) =>
      updateTransactionService(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['transactions', data.user_id],
      });
    },
    onError: (error) => {
      console.error(`Error creating transaction: ${(error as Error).message}`);
    },
  });
  
  // Delete
  const deleteTransaction = useMutation({
    mutationFn: deleteTransactionService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions", data.user_id],
      });
    },
    onError: (error) => {
      console.error(`Error deleting transaction: ${(error as Error).message}`);
    },
  });


  return { createTransaction, updateTransaction, deleteTransaction };
}
