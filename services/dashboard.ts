import { AxiosInstance } from "@/lib/axios"; 
import { AvailableYear } from "@/types/dashboard";
import { FinancialSummary, SpendingBreakdown, TransactionAggregate } from "@/types/dashboard"; 
 
type DashboardAction =
  | { type: "summary" }
  | { type: "aggregates"; year: number }
  | { type: "breakdown"; year: number; month: number }
  | { type: "years" };

async function fetchDashboard<T>(
  userId: string,
  action: DashboardAction
): Promise<T> {
  const res = await AxiosInstance.post<{ data: T }>("/dashboard", { userId, ...action }); 
  return res.data.data;
}

export const getFinancialSummary = (userId: string) =>
  fetchDashboard<FinancialSummary[]>(userId, { type: "summary" });

export const getTransactionAggregates = (userId: string, year: number) =>
  fetchDashboard<TransactionAggregate[]>(userId, { type: "aggregates", year });

export const getSpendingBreakdown = (userId: string, year: number, month: number) =>
  fetchDashboard<SpendingBreakdown[]>(userId, { type: "breakdown", year, month });

export const getAvailableYears = (userId: string) =>
  fetchDashboard<AvailableYear[]>(userId, { type: "years" });