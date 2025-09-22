import { createClient } from "@/lib/supabase/client";
import { BudgetFilters, BudgetSummary, BudgetWithSpent } from "@/types/budget";
import { Budget, BudgetInsert, BudgetUpdate } from "@/types/db";
import { Database } from "@/utils/database.types";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase = createClient();

// Insert a new budget
export const createBudgetService = async (newBudget: BudgetInsert) => {
  const { data, error } = await supabase.from("budgets").insert(newBudget).select().single();

  if (error) throw error;
  return data as Budget;
};

// Update an existing budget
export const updateBudgetService = async (id: string, updatedBudget: BudgetUpdate) => {
  const { data, error } = await supabase
    .from("budgets")
    .update(updatedBudget)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Budget;
};

// Delete an existing budget
export const deleteBudgetService = async (id: string) => {
  const { data, error } = await supabase.from("budgets").delete().eq("id", id).select().single();

  if (error) throw error;
  return data as Budget;
};

// Fetch budgets
export const getBudgets = async (
  userId: string,
  filters?: BudgetFilters,
  client?: SupabaseClient<Database>
): Promise<BudgetWithSpent[]> => {
  const supabaseClient = client ?? supabase;
  const rpcName = filters?.status === "active" ? "get_active_budgets" : "get_inactive_budgets";

  const { data, error } = await supabaseClient.rpc(rpcName, {
    user_id_input: userId,
  });

  if (error) throw error;

  let budgets = (data as BudgetWithSpent[]).map((b) => ({
    ...b,
    limit_amount: Number(b.limit_amount),
    spent: Number(b.spent),
  }));

  if (filters?.category && filters.category !== "all") {
    budgets = budgets.filter((b) => b.category === filters.category);
  }

  if (filters?.period && filters.period !== "all") {
    budgets = budgets.filter((b) => b.period === filters.period);
  }

  if (filters?.recurring && filters.recurring !== "all") {
    budgets = budgets.filter((b) => (b.recurring ? "yes" : "no") === filters.recurring);
  }

  if (filters?.carryover && filters.carryover !== "all") {
    budgets = budgets.filter((b) => (b.carry_over ? "yes" : "no") === filters.carryover);
  }

  if (filters?.progress && filters.progress !== "all") {
    budgets = budgets.filter((b) => {
      const progress = (b.spent / b.limit_amount) * 100;
      if (filters.progress === "under50") return progress < 50;
      if (filters.progress === "50to100") return progress >= 50 && progress <= 100;
      if (filters.progress === "over100") return progress > 100;
      return true;
    });
  }
  return budgets as BudgetWithSpent[];
};

// Fetch budget summary
export const getBudgetSummary = async (
  userId: string,
  filters?: BudgetFilters,
  client?: SupabaseClient<Database>
): Promise<BudgetSummary> => {
  const supabaseClient = client ?? supabase;
  const {
    status = "active",
    category = "all",
    period = "all",
    recurring = "all",
    carryover = "all",
    progress = "all",
  } = filters ?? {};

  const { data, error } = await supabaseClient.rpc("get_budget_kpis", {
    user_id_input: userId,
    status_filter: status,
    category_filter: category,
    period_filter: period,
    recurring_filter: recurring,
    carryover_filter: carryover,
    progress_filter: progress,
  });

  if (error) throw error;

  const row = data?.[0] ?? { total_budget: 0, total_spent: 0, remaining: 0 };

  return {
    total_budget: Number(row.total_budget ?? 0),
    total_spent: Number(row.total_spent ?? 0),
    remaining: Number(row.remaining ?? 0),
  };
};
