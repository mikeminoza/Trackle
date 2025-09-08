import { useMutation, useQueryClient } from '@tanstack/react-query';  
import { createTransaction as createTransactionService} from '@/services/transaction';
 

export function useTransaction() {
  const queryClient = useQueryClient();

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

  return { createTransaction };
}
