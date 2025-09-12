import { z } from "zod";

const todayOrLater = z.string().refine((s) => {
  const date = new Date(s);
  const now = new Date();
 
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  return !Number.isNaN(date.getTime()) && date >= now;
}, {
  message: "Start date must be today or later",
});


export const BudgetSchema = z.object({ 
  category: z.string().min(1, "Category is required"),
  limit_amount: z.number().positive("Limit amount must be greater than 0"), 
  start_date: todayOrLater,
  period: z.enum(["daily", "weekly", "monthly", "yearly"]),
  carry_over: z.boolean().optional(),
  recurring: z.boolean().optional(),
});
 
export type BudgetFields = z.infer<typeof BudgetSchema>;
