import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { BudgetWithSpent } from "@/types/budget";

// GET /api/budgets?userId=...&status=...&category=...&period=...&recurring=...&carryover=...&progress=...
export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  const status = searchParams.get("status") || "active";
  const category = searchParams.get("category") || "all";
  const period = searchParams.get("period") || "all";
  const recurring = searchParams.get("recurring") || "all";
  const carryover = searchParams.get("carryover") || "all";
  const progress = searchParams.get("progress") || "all";

  if (!userId) {
    return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  const rpcName = status === "active" ? "get_active_budgets" : "get_inactive_budgets";

  const { data, error } = await supabase.rpc(rpcName, {
    user_id_input: userId,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  let budgets = (data as BudgetWithSpent[]).map((b) => ({
    ...b,
    limit_amount: Number(b.limit_amount),
    spent: Number(b.spent),
  }));

  if (category !== "all") budgets = budgets.filter((b) => b.category === category);
  if (period !== "all") budgets = budgets.filter((b) => b.period === period);
  if (recurring !== "all")
    budgets = budgets.filter((b) => (b.recurring ? "yes" : "no") === recurring);
  if (carryover !== "all")
    budgets = budgets.filter((b) => (b.carry_over ? "yes" : "no") === carryover);
  if (progress !== "all") {
    budgets = budgets.filter((b) => {
      const prog = (b.spent / b.limit_amount) * 100;
      if (progress === "under50") return prog < 50;
      if (progress === "50to100") return prog >= 50 && prog <= 100;
      if (progress === "over100") return prog > 100;
      return true;
    });
  }

  return NextResponse.json({ data: budgets }, { status: 200 });
}

// POST /api/budgets
export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase.from("budgets").insert(body).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Budget created successfully", data }, { status: 201 });
}

// PATCH /api/budgets?id=...
export async function PATCH(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("budgets")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Budget updated successfully", data }, { status: 200 });
}

// DELETE /api/budgets?id=...
export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  const { data, error } = await supabase.from("budgets").delete().eq("id", id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Budget deleted successfully", data }, { status: 200 });
}
