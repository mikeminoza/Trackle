import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatMessage } from "@/types/ai";

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  reset: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      reset: () => set({ messages: [] }),
    }),
    {
      name: "chat-history",
    }
  )
);
