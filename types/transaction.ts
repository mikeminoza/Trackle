import { Transaction } from "./db";

export type TransactionDialogProps = {
  mode?: "add" | "edit"; 
  label?: "Add" | "Edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: Transaction | null;
};

export type DeleteTransactionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction;
}

export type TransactionFilters = {
  search?: string;
  type?: "all" | "income" | "expense";
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  date?: string;  
};
