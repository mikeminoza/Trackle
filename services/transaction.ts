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
export const getTransactions = async (
  userId: string, 
  page: number, 
  limit = 15, 
  filters?: {
    search?: string;
    type?: "all" | "income" | "expense";
    category?: string;
    minAmount?: number;
    maxAmount?: number;
    date?: string; 
  }) => {
  const from = page * limit;
  const to = from + limit - 1;
  let query = supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (filters?.search) {
    query = query.ilike("title", `%${filters.search}%`); 
  }
  if (filters?.type && filters.type !== "all") {
    query = query.eq("type", filters.type);
  }
  if (filters?.category && filters.category !== "all") {
    query = query.eq("category", filters.category);
  }
  if (filters?.minAmount !== undefined) {
    query = query.gte("amount", filters.minAmount);
  }
  if (filters?.maxAmount !== undefined) {
    query = query.lte("amount", filters.maxAmount);
  }
  if (filters?.date) {
    query = query.eq("date", filters.date);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data;
};
