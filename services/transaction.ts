import { createClient } from "@/lib/supabase/client";
import { getDateRange } from "@/lib/utils/getDateRange";
import { Transaction, TransactionInsert } from "@/types/db";
import { TransactionUpdate } from "@/types/db";
import { TransactionFilters } from "@/types/transaction";
import { Database } from "@/utils/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase = createClient();

// Insert a new transaction
export const createTransactionService = async (newTransaction: TransactionInsert | TransactionInsert[]) => {
  const payload = Array.isArray(newTransaction)
    ? newTransaction
    : [newTransaction];

  const { data, error } = await supabase
    .from("transactions")
    .insert(payload)
    .select();

  if (error) throw error;
  return data as Transaction[];
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
  return data as Transaction;
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
  return data as Transaction;
};

// Fetch transactions
export const getTransactions = async (
  userId: string,
  page: number,
  limit = 15,
  filters?: TransactionFilters,
  client?: SupabaseClient<Database>
) => {
  const supabaseClient = client ?? supabase;
  const from = page * limit;
  const to = from + limit - 1;
  let query = supabaseClient
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .range(from, to);

  if (filters?.search) {
    const normalizedSearch = filters.search.replace(/\s+/g, "").toLowerCase();
    query = query.ilike("title", `%${normalizedSearch}%`);
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
  if (filters?.period && filters.period !== "all") {
    const { start, end } = getDateRange(filters.period);
    query = query.gte("date", start.toISOString()).lte("date", end.toISOString());
  } else if (filters?.date) {
    const start = new Date(filters.date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(filters.date);
    end.setHours(23, 59, 59, 999);
    query = query.gte("date", start.toISOString()).lte("date", end.toISOString());
  }

  const { data, error } = await query;
  if (error) throw error;

  return data as Transaction[];
};
