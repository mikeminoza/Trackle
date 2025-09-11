import { createClient } from '@/lib/supabase/client';
import { TransactionInsert } from '@/types/db';
import { TransactionUpdate } from '@/types/db';

const supabase = createClient();

// Insert a new transaction
export const createTransactionService = async (newTransaction: TransactionInsert) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert(newTransaction)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update an existing transaction
export const updateTransactionService = async (
  id: string,
  updatedTransaction: TransactionUpdate
) => {
  const { data, error } = await supabase
    .from("transactions")
    .update(updatedTransaction)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete an existing transaction
export const deleteTransactionService = async (id: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Fetch transactions 
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
