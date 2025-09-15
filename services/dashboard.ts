import { createClient } from "@/lib/supabase/client";
import { FinancialSummary, SpendingBreakdown, TransactionAggregate } from "@/types/dashboard";

const supabase = createClient();

export async function getFinancialSummary(userId: string) {
  const { data, error } = await supabase
    .rpc("get_financial_summary", { p_user_id: userId });

  if (error) throw error;
  return data as FinancialSummary[];
}
 
export async function getTransactionAggregates(userId: string, year: number) {
  const { data, error } = await supabase
    .rpc("get_transaction_aggregates_by_month", {
      p_user_id: userId,
      p_year: year,
    });

  if (error) throw error; 
  return data as TransactionAggregate[];
}

export async function getSpendingBreakdown(userId: string, year: number, month: number) {
  const { data, error } = await supabase
    .rpc("get_spending_breakdown", {
      p_user_id: userId,
      p_year: year,
      p_month: month,
    });

  if (error) throw error; 
  return data as SpendingBreakdown[];
}

