import { useUser } from "@/hooks/useUser";
import { ChatMessage } from "@/types/ai";
import axios, { AxiosError } from "axios";

export function useSendMessage() {
  const { data: user } = useUser();

  const sendMessage = async (messages: ChatMessage[], model: string) => {
    if (!user) throw new Error("User not logged in");

    try {
      const res = await axios.post("/api/ai/chat", { messages, model, userId: user.id });
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
