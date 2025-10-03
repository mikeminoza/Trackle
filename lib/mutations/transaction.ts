import { useMutation, useQueryClient } from '@tanstack/react-query';  
import { createTransactionService, updateTransactionService, deleteTransactionService} from '@/services/transaction';
import { TransactionUpdate } from '@/types/db';
import { toast } from 'sonner';
import { invalidateUserData } from '../utils/queryInvalidations';
 

export function useTransaction() {
  const queryClient = useQueryClient();

  const handleSuccess = (userId: string, message: string) => {
    invalidateUserData(queryClient, userId, message);
  };

  const handleError = (error: unknown, action: string) => {
    toast.error(`Error ${action}: ${(error as Error).message}`);
  };

  // Create
  const createTransaction = useMutation({ 
    mutationFn: createTransactionService, 
    onSuccess: (data) => {
      const transaction = data[0];
      handleSuccess(transaction.user_id, "Transaction added successfully.")
    },
    onError: (error) => handleError(error, "creating transaction"),
  });

  // Update
  const updateTransaction = useMutation({ 
    mutationFn: ({ id, updates }: { id: string; updates: TransactionUpdate }) =>
      updateTransactionService(id, updates),
    onSuccess: (data) => handleSuccess(data.user_id, "Transaction updated successfully."),
    onError: (error) => handleError(error, "updating transaction"),
  });
  
  // Delete
  const deleteTransaction = useMutation({
    mutationFn: deleteTransactionService,
    onSuccess: (data) => handleSuccess(data.user_id, "Transaction deleted successfully."),
    onError: (error) => handleError(error, "deleting transaction"),
  });


  return { createTransaction, updateTransaction, deleteTransaction };
}
