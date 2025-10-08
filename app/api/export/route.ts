import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import ExcelJS from "exceljs";

const ALLOWED_FORMATS = ["xlsx", "json"] as const;
type ExportFormat = (typeof ALLOWED_FORMATS)[number];

export async function GET(req: Request) {
  try { 
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const format = (searchParams.get("format") as ExportFormat) || "xlsx";

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    if (!ALLOWED_FORMATS.includes(format)) {
      return NextResponse.json({ error: "Invalid format" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("transactions")
      .select("title, type, category, amount, date")
      .eq("user_id", userId)
      .order("date", { ascending: true });

    if (error) { 
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
        return new NextResponse(null, { status: 204 });
    }

    // Excel export
    if (format === "xlsx") {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Transactions");

      sheet.columns = [
        { header: "Title", key: "title", width: 30 },
        { header: "Type", key: "type", width: 15 },
        { header: "Category", key: "category", width: 25 },
        { header: "Amount", key: "amount", width: 15 },
        { header: "Date", key: "date", width: 20 },
      ];

      sheet.addRows(data);
 
      sheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF007ACC" },
        };
      });

      const buffer = await workbook.xlsx.writeBuffer();

      return new NextResponse(buffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="transactions_${new Date()
            .toISOString()
            .slice(0, 10)}.xlsx"`,
        },
      });
    }

    // JSON export fallback
    return new NextResponse(JSON.stringify(data, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="transactions_${new Date()
          .toISOString()
          .slice(0, 10)}.json"`,
      },
    });
  } catch (err) {
    console.error("Unexpected export error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
