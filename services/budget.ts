import { AxiosInstance } from "@/lib/axios";
import { BudgetFilters, BudgetSummary, BudgetWithSpent } from "@/types/budget";
import { Budget, BudgetInsert, BudgetUpdate } from "@/types/db";

interface GetBudgetsParams extends BudgetFilters {
  userId: string;
}

// Fetch budgets
export const getBudgetsService = async (params: GetBudgetsParams) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, value ?? ""])
  );

  const res = await AxiosInstance.get("/budgets", { params: queryParams });
  return res.data.data as BudgetWithSpent[];
};

// Fetch budget summary
export const getBudgetSummaryService = async (params: GetBudgetsParams) => {
  const queryParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, value ?? ""])
  );
  const res = await AxiosInstance.get("/budgets/summary", { params: queryParams });
  return res.data.data as BudgetSummary;
};

// Insert a new budget
export const createBudgetService = async (newBudget: BudgetInsert) => {
  const res = await AxiosInstance.post("/budgets", newBudget);
  return res.data.data as Budget;
};

// Update an existing budget
export const updateBudgetService = async (id: string, updatedBudget: BudgetUpdate) => {
  const res = await AxiosInstance.patch(`/budgets?id=${id}`, updatedBudget);
  return res.data.data as Budget;
};

// Delete an existing budget
export const deleteBudgetService = async (id: string) => {
  const res = await AxiosInstance.delete(`/budgets?id=${id}`);
  return res.data.data as Budget;
};
