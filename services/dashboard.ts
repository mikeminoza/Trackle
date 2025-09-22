import { createClient } from "@/lib/supabase/client";
import { AvailableYear } from "@/types/dashboard";
import { FinancialSummary, SpendingBreakdown, TransactionAggregate } from "@/types/dashboard";
import { Database } from "@/utils/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase = createClient();

export async function getFinancialSummary(userId: string, client?: SupabaseClient<Database>) {
  const supabaseClient = client ?? supabase;
  const { data, error } = await supabaseClient.rpc("get_financial_summary", { p_user_id: userId });

  if (error) throw error;
  return data as FinancialSummary[];
}

export async function getTransactionAggregates(
  userId: string,
  year: number,
  client?: SupabaseClient<Database>
) {
  const supabaseClient = client ?? supabase;
  const { data, error } = await supabaseClient.rpc("get_transaction_aggregates_by_month", {
    p_user_id: userId,
    p_year: year,
  });

  if (error) throw error;
  return data as TransactionAggregate[];
}

export async function getSpendingBreakdown(
  userId: string,
  year: number,
  month: number,
  client?: SupabaseClient<Database>
) {
  const supabaseClient = client ?? supabase;
  const { data, error } = await supabaseClient.rpc("get_spending_breakdown", {
    p_user_id: userId,
    p_year: year,
    p_month: month,
  });

  if (error) throw error;
  return data as SpendingBreakdown[];
}

export async function getAvailableYears(userId: string) {
  const { data, error } = await supabase.rpc("get_available_transaction_years", {
    p_user_id: userId,
  });

  if (error) throw error;
  return data as AvailableYear[];
}
