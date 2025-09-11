import { useMutation, useQueryClient } from '@tanstack/react-query';  
import { createTransactionService, updateTransactionService, deleteTransactionService} from '@/services/transaction';
import { TransactionUpdate } from '@/types/db';
import { toast } from 'sonner';
 

export function useTransaction() {
  const queryClient = useQueryClient();

  // Create
  const createTransaction = useMutation({ 
    mutationFn: createTransactionService, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions', data.user_id] });
      queryClient.invalidateQueries({ queryKey: ['activeBudgets', data.user_id] });
      toast.success("Transaction added successfully.");
    },
    onError: (error) => {
      toast.error(`Error deleting transaction: ${(error as Error).message}`);
    },
  });

  // Update
  const updateTransaction = useMutation({ 
    mutationFn: ({ id, updates }: { id: string; updates: TransactionUpdate }) =>
      updateTransactionService(id, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions', data.user_id] });
      queryClient.invalidateQueries({ queryKey: ['activeBudgets', data.user_id] });
      toast.success("Transaction updated successfully.");
    },
    onError: (error) => {
      toast.error(`Error deleting transaction: ${(error as Error).message}`);
    },
  });
  
  // Delete
  const deleteTransaction = useMutation({
    mutationFn: deleteTransactionService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['transactions', data.user_id] });
      queryClient.invalidateQueries({ queryKey: ['activeBudgets', data.user_id] });
      toast.success("Transaction deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Error deleting transaction: ${(error as Error).message}`);
    },
  });


  return { createTransaction, updateTransaction, deleteTransaction };
}
