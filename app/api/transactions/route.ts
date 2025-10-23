import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getDateRange } from "@/lib/utils/getDateRange";

// GET /api/transactions?userId=...&page=...&limit=...&category=...&startDate=...&endDate=...
export async function GET(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get("userId");
  if (!userId) return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });

  const page = Number(searchParams.get("page") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 15);
  const from = page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .range(from, to);

  // Optional filters
  const search = searchParams.get("search");
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const minAmount = searchParams.get("minAmount");
  const maxAmount = searchParams.get("maxAmount");
  const period = searchParams.get("period");
  const date = searchParams.get("date");

  if (search) {
    const normalizedSearch = search.replace(/\s+/g, "").toLowerCase();
    query = query.ilike("title", `%${normalizedSearch}%`);
  }
  if (type && type !== "all") query = query.eq("type", type);
  if (category && category !== "all") query = query.eq("category", category);
  if (minAmount) query = query.gte("amount", Number(minAmount));
  if (maxAmount) query = query.lte("amount", Number(maxAmount));

  if (period && period !== "all") {
    const { start, end } = getDateRange(period as "today" | "thisWeek" | "thisMonth");
    query = query.gte("date", start.toISOString()).lte("date", end.toISOString());
  } else if (date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    query = query.gte("date", start.toISOString()).lte("date", end.toISOString());
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ data }, { status: 200 });
}

// POST /api/transactions
export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const payload = Array.isArray(body) ? body : [body];

  const { data, error } = await supabase.from("transactions").insert(payload).select();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(
    { message: "Transaction(s) created successfully", data },
    { status: 201 }
  );
}

// PUT /api/transaction?id=...
export async function PATCH(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();

  if (!id) return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });

  const { data, error } = await supabase
    .from("transactions")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Transaction updated successfully", data }, { status: 200 });
}

// DELETE /api/tranaction?id=...
export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });

  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ message: "Transaction deleted successfully", data }, { status: 200 });
}
