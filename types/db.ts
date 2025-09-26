import { Database } from "@/utils/database.types";

// Shortcuts for each table
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type TransactionInsert = Database["public"]["Tables"]["transactions"]["Insert"];
export type TransactionUpdate = Database["public"]["Tables"]["transactions"]["Update"];

export type Budget = Database["public"]["Tables"]["budgets"]["Row"];
export type BudgetInsert = Database["public"]["Tables"]["budgets"]["Insert"];
export type BudgetUpdate = Database["public"]["Tables"]["budgets"]["Update"];

export type AiInsight = Database["public"]["Tables"]["ai_insights"]["Row"];
export type AiInsightInsert = Database["public"]["Tables"]["ai_insights"]["Insert"];
export type AiInsightUpdate = Database["public"]["Tables"]["ai_insights"]["Update"];
