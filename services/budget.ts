import { createClient } from "@/lib/supabase/client";
import { BudgetWithSpent } from "@/types/budget";
import { BudgetInsert, BudgetUpdate } from "@/types/db";

const supabase = createClient();

// Insert a new budget
export const createBudgetService = async (newBudget: BudgetInsert) => {
  const { data, error } = await supabase
    .from('budgets')
    .insert(newBudget)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update an existing budget
export const updateBudgetService = async (
  id: string,
  updatedBudget: BudgetUpdate
) => {
  const { data, error } = await supabase
    .from("budgets")
    .update(updatedBudget)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete an existing budget
export const deleteBudgetService = async (id: string) => {
  const { data, error } = await supabase
    .from("budgets")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Fetch active budgets
export const getActiveBudgets = async (userId: string): Promise<BudgetWithSpent[]> => {
  const { data, error } = await supabase.rpc("get_active_budgets", {
    user_id_input: userId,
  });

  if (error) throw error;
 
  return (data as BudgetWithSpent[]).map(b => ({
    ...b,
    limit_amount: typeof b.limit_amount === "string" ? Number(b.limit_amount) : b.limit_amount,
    spent: typeof b.spent === "string" ? Number(b.spent) : b.spent,
  }));
}