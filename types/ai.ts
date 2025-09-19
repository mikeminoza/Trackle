import { FinancialSummary, SpendingBreakdown, TransactionAggregate } from "./dashboard";
import { Budget } from "./db";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type InsightsPayload = {
  financialSummary: FinancialSummary | null;
  aggregates: TransactionAggregate[] | null;
  spendingBreakdown: SpendingBreakdown[] | null;
  budgets: Budget[] | null; 
};

export interface AiInsightResponse {
  text: string;
  type: "warning" | "success" | "info";
}

export type InsightType = "success" | "warning" | "info";

export interface VariantConfig {
  variant: "default" | "destructive" | "success";
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}