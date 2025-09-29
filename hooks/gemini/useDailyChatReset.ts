import { useEffect } from "react";
import { useChatStore } from "@/store/useChatStore";

export function useDailyChatReset() {
  const reset = useChatStore((state) => state.reset);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastDate = localStorage.getItem("chatDate");

    if (lastDate !== today) {
      reset();
      localStorage.setItem("chatDate", today);
    }
  }, [reset]);
}
