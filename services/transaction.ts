import { Transaction, TransactionInsert } from "@/types/db";
import { TransactionUpdate } from "@/types/db";
import { TransactionFilters } from "@/types/transaction";
import { AxiosInstance } from "@/lib/axios";

// Insert a new transaction
export const createTransactionService = async (
  newTransaction: TransactionInsert | TransactionInsert[]
) => {
  const res = await AxiosInstance.post("/transactions", newTransaction);
  return res.data.data as Transaction[];
};

// Update an existing transaction
export const updateTransactionService = async (
  id: string,
  updatedTransaction: TransactionUpdate
) => {
  const res = await AxiosInstance.patch(`/transactions?id=${id}`, updatedTransaction);
  return res.data.data as Transaction;
};

// Delete an existing transaction
export const deleteTransactionService = async (id: string) => {
  const res = await AxiosInstance.delete(`/transactions?id=${id}`);
  return res.data.data as Transaction;
};

// Fetch transactions
export const getTransactionsService = async (
  params: { userId: string; page: number; limit?: number } & TransactionFilters
) => {
  const res = await AxiosInstance.get("/transactions", { params });
  return res.data.data as Transaction[];
};
