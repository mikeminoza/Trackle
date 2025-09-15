export type FinancialSummary = {
  balance: number;
  income_this_month: number;
  expense_this_month: number;
};

export type TransactionAggregate = {
  month: string; 
  income: number;
  expenses: number;
};

export type SpendingBreakdown = {
  month: string;
  category: string;
  amount: number;
};