import { ChatMessage } from "@/types/ai";
import { AxiosError } from "axios";
import { AxiosInstance } from "@/lib/axios";

export function useSendMessage(userId?: string) {
  const sendMessage = async (messages: ChatMessage[], model: string) => {
    try {
      const res = await AxiosInstance.post("/ai/chat", { messages, model, userId });
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
