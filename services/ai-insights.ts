import {  InsightsPayload } from "@/types/ai";  
import { AxiosInstance } from "@/lib/axios";
 
// Fetch today's ai insights
export const getOrGenerateInsights = async (userId: string, payload: InsightsPayload) => {
  const res = await AxiosInstance.post("/ai/insights", { userId, payload });
  return res.data.insights;
};