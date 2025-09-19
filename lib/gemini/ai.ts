import axios, { AxiosError } from "axios";
import { ChatMessage } from "@/types/ai";

export async function sendMessage(messages: ChatMessage[], model: string) {
  try {
    const res = await axios.post("/api/ai/chat", { messages, model });
    return res.data.reply as string;
  } catch (err) {
    if (err instanceof AxiosError) { 
      throw new Error(err.response?.data?.error || "Failed to fetch AI response");
    }
    throw err;
  }
}
