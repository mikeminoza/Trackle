import { z } from "zod";

export const TransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
});

export type TransactionFields = z.infer<typeof TransactionSchema>;
