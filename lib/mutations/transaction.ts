import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import type { Database } from '@/utils/database.types';
import { createClient } from '../supabase/client';

const supabase = createClient();

export function useTransaction() {
  const queryClient = useQueryClient();

  const createTransaction = useMutation({ 
    mutationFn: async (
      newTransaction: Database['public']['Tables']['transactions']['Insert']
    ) => {
      const { data, error } = await supabase
        .from('transactions')
        .insert(newTransaction)
        .select()
        .single();

      if (error) throw error;
      return data;
    }, 
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
