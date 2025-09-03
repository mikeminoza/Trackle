import axios, { AxiosError } from "axios";
import { ChatMessage } from "@/types/ai";

export async function sendMessage(messages: ChatMessage[]) {
  try {
    const res = await axios.post("/api/ai", { messages });
    return res.data.reply as string;
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error("AI request failed:", err.response?.data);
      throw new Error(err.response?.data?.error || "Failed to fetch AI response");
    }
    throw err;
  }
}
