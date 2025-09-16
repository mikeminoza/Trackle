import { z } from "zod";

const validDate = z.string().refine((s) => {
  const date = new Date(s);
  return !Number.isNaN(date.getTime());
}, {
  message: "Invalid date",
});

export const TransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  date: validDate, 
});

export type TransactionFields = z.infer<typeof TransactionSchema>;
