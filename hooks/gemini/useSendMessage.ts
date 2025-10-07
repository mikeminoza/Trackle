 import { ChatMessage } from "@/types/ai";
import axios, { AxiosError } from "axios";

export function useSendMessage(userId?: string) { 

  const sendMessage = async (messages: ChatMessage[], model: string) => { 
    try {
      const res = await axios.post("/api/ai/chat", { messages, model, userId });
      return res.data.reply as string;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.error || "Failed to fetch AI response");
      }
      throw err;
    }
  };

  return sendMessage;
}
