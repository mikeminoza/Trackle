import { NextResponse } from "next/server";
import { handleDashboardAction } from "@/services/dashboardHandler";
import {
  AvailableYear,
  FinancialSummary,
  SpendingBreakdown,
  TransactionAggregate,
} from "@/types/dashboard";

type DashboardRequest =
  | { userId: string; type: "summary" }
  | { userId: string; type: "aggregates"; year: number }
  | { userId: string; type: "breakdown"; year: number; month: number }
  | { userId: string; type: "years" };

type DashboardResponse<T> = { data: T };

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = (await req.json()) as DashboardRequest;
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
 
    const data: FinancialSummary[] | TransactionAggregate[] | SpendingBreakdown[] | AvailableYear[] =
      await handleDashboardAction(userId, body);

    return NextResponse.json<DashboardResponse<typeof data>>({ data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
