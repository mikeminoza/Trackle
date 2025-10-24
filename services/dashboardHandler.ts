import { createClient } from "@/lib/supabase/server";
import {
  AvailableYear,
  FinancialSummary,
  SpendingBreakdown,
  TransactionAggregate,
} from "@/types/dashboard";

type DashboardAction =
  | { type: "summary" }
  | { type: "aggregates"; year: number }
  | { type: "breakdown"; year: number; month: number }
  | { type: "years" };

export async function handleDashboardAction(
  userId: string,
  action: DashboardAction
): Promise<
  FinancialSummary[] | TransactionAggregate[] | SpendingBreakdown[] | AvailableYear[]
> {
  const supabase = await createClient();

  switch (action.type) {
    case "summary": {
      const { data, error } = await supabase
        .rpc("get_financial_summary", { p_user_id: userId });
      if (error) throw error;
      console.log(`DATA: ${JSON.stringify(data)}`);
      return data ?? [];
    }
    case "aggregates": {
      const { year } = action;
      const { data, error } = await supabase
        .rpc("get_transaction_aggregates_by_month", {
          p_user_id: userId,
          p_year: year,
        });
      if (error) throw error;
      return data ?? [];
    }
    case "breakdown": {
      const { year, month } = action;
      const { data, error } = await supabase
        .rpc(
          "get_spending_breakdown",
          { p_user_id: userId, p_year: year, p_month: month }
        );
      if (error) throw error;
      return data ?? [];
    }
    case "years": {
      const { data, error } = await supabase
        .rpc("get_available_transaction_years", { p_user_id: userId });
      if (error) throw error;
      return data ?? [];
    }
  }
}
