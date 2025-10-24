import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/budgets/summary?userId=...&status=...&category=...&period=...&recurring=...&carryover=...&progress=...
export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  const status = searchParams.get("status") || "active";
  const category = searchParams.get("category") || "all";
  const period = searchParams.get("period") || "all";
  const recurring = searchParams.get("recurring") || "all";
  const carryover = searchParams.get("carryover") || "all";
  const progress = searchParams.get("progress") || "all";

  const { data, error } = await supabase.rpc("get_budget_kpis", {
    user_id_input: userId,
    status_filter: status,
    category_filter: category,
    period_filter: period,
    recurring_filter: recurring,
    carryover_filter: carryover,
    progress_filter: progress,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const row = data?.[0] ?? { total_budget: 0, total_spent: 0, remaining: 0 };

  return NextResponse.json({
    data: {
      total_budget: Number(row.total_budget ?? 0),
      total_spent: Number(row.total_spent ?? 0),
      remaining: Number(row.remaining ?? 0),
    },
  });
}
