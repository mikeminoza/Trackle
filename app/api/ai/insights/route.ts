import { NextResponse } from "next/server"; 
import { models } from "@/constants/ai-models";
import { GoogleGenAI } from "@google/genai";
import { insightsConfig } from "@/lib/gemini/insightsConfig";
import { AiInsightResponse, InsightsPayload } from "@/types/ai";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { userId, payload } = await req.json() as {
      userId: string;
      payload: InsightsPayload;
    };

    if (!userId || !payload) {
      return NextResponse.json({ error: "Missing userId or payload" }, { status: 400 });
    }

    const { data: existing, error: fetchError } = await supabase
      .from("ai_insights")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", new Date().toISOString().slice(0, 10))
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (existing && existing.length > 0) {
      return NextResponse.json({ insights: existing });
    }

    const model = models[0].id;
    const geminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await geminiAI.models.generateContent({
      model: model,
      config: {
        systemInstruction: insightsConfig.systemInstruction,
        responseMimeType: insightsConfig.responseMimeType,
        responseSchema: insightsConfig.responseSchema,
      },
      contents: JSON.stringify(payload),
    });

    if (!response.text) {
      return NextResponse.json({ error: "Failed to generate insights" }, { status: 400 });
    }

    const aiResponse = JSON.parse(response.text);
    const insights = Array.isArray(aiResponse.insights) ? aiResponse.insights : [];

    if (insights.length === 0) {
      return NextResponse.json({ insights: [] });
    }
    
    const records = insights.map((item: AiInsightResponse) => ({
      user_id: userId,
      type: item.type,
      message: item.text,
    }));

    const { data: inserted, error: insertError } = await supabase
      .from("ai_insights")
      .insert(records)
      .select("*");


    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ insights: inserted });
  } catch (error: unknown) {
    console.error("Error generating insights:", error);
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 400 });
  }
}
