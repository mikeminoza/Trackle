import { z } from "zod";

const validDate = z.string().refine((s) => {
  const date = new Date(s);
  return !Number.isNaN(date.getTime());
}, {
  message: "Invalid date",
});

export const BudgetSchema = z.object({ 
  category: z.string().min(1, "Category is required"),
  limit_amount: z.number().positive("Limit amount must be greater than 0"), 
  start_date: validDate, 
  period: z.enum(["daily", "weekly", "monthly", "yearly"]),
  carry_over: z.boolean().optional(),
  recurring: z.boolean().optional(),
});

export type BudgetFields = z.infer<typeof BudgetSchema>;
