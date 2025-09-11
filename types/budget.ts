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