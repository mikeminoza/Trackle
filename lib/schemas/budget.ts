// budgetSchema.ts
import { z } from "zod";

export const BudgetSchema = z.object({ 
  category: z.string().min(1, "Category is required"),
  limit_amount: z.number().positive("Limit amount must be greater than 0"), 
  start_date: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: "Invalid start date",
  }),
  period: z.enum(["daily", "weekly", "monthly", "yearly"]),
  carry_over: z.boolean().optional(),
  recurring: z.boolean().optional(),
});
 
export type BudgetFields = z.infer<typeof BudgetSchema>;
