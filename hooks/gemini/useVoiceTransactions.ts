import { Transaction } from "@/types/db";
import { AxiosError } from "axios";
import { AxiosInstance } from "@/lib/axios";

interface VoiceTransactionResponse {
  transactions: Transaction[];
}

export function useVoiceTransactions() {
  const generateTransactions = async (transcript: string) => {
    try {
      const res = await AxiosInstance.post("/ai/transaction", { input: transcript });
      return res.data as VoiceTransactionResponse;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.error || "Failed to generate transactions");
      }
      throw err;
    }
  };

  return generateTransactions;
}
