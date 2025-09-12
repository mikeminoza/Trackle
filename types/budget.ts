import { Budget } from "./db";

export type BudgetDialogProps = {
  mode?: "add" | "edit"; 
  label?: "Add" | "Edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget?: Budget | null;
};

export type BudgetWithSpent = Budget & {
  spent: number;
};

export type BudgetFilters = {
  status: "active" | "inactive";
  category: string;
  period: string;
  recurring: "yes" | "no" | "all";
  carryover: "yes" | "no" | "all";
  progress: "under50" | "50to100" | "over100" | "all";
};

export type BudgetSummary = {
  total_budget: number;
  total_spent: number;
  remaining: number;
};
