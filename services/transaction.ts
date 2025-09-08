import type { Database } from '@/utils/database.types';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];

// Insert a new transaction
export const createTransaction = async (newTransaction: TransactionInsert) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(newTransaction)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Fetch transactions for a user
export const getTransactions = async (userId: string) => {
  const { data } = await supabase
    .from('transactions')
    .select('*') 
    .eq("user_id", userId)
    .throwOnError();

  return data;
};
