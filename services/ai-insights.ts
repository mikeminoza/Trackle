import { createClient } from "@/lib/supabase/client";
import { AiInsightResponse, InsightsPayload } from "@/types/ai";
import { AiInsight } from "@/types/db";
import axios, { AxiosError } from "axios";

const supabase = createClient();

// Fetch today's ai insights
export const getOrGenerateInsights = async (userId: string, payload: InsightsPayload) => {
  // Check if today's insights already exist
  const { data: existing } = await supabase
    .from("ai_insights")
    .select("*")
    .eq("user_id", userId)
    .gte("created_at", new Date().toISOString().slice(0, 10)) 
    .order("created_at", { ascending: false });

  if (existing && existing.length > 0) {
    return existing as AiInsight[];
  }

  // Generate new insights via AI
  try {
    const res = await axios.post("/api/ai/insights", { payload });
    const insights = res.data.insights ?? [];  
    
    if (insights.length > 0) {
      const records = insights.map((item: AiInsightResponse) => ({
        user_id: userId,
        type: item.type,
        message: item.text,
      }));
 
      const {data} = await supabase.from("ai_insights").insert(records).select("*");
      return data as AiInsight[]
    }
    return [];
 
  } catch (err) {
    if (err instanceof AxiosError) { 
      throw new Error(err.response?.data?.error || "Failed to fetch AI response");
    }
    throw err;
  } 
};