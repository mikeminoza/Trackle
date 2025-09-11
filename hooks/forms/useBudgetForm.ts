"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useBudget } from "@/lib/mutations/budget";
import { useUser } from "../useUser";
import { Budget } from "@/types/db";
import { BudgetFields, BudgetSchema } from "@/lib/schemas/budget";

export default function useBudgetForm(budget: Budget | null) {
  const { data: user } = useUser()
  const { createBudget, updateBudget } = useBudget(); 


  const form = useForm<BudgetFields>({
    resolver: zodResolver(BudgetSchema),
    defaultValues: budget
      ? {
          category: budget.category,
          limit_amount: budget.limit_amount,
          period: budget.period as "daily" | "weekly" | "monthly" | "yearly",
          start_date: budget.start_date,
          carry_over: budget.carry_over ?? false,
          recurring: budget.recurring ?? false,
        }
      : {
          category: "",
          limit_amount: 0,
          period: "monthly", 
          start_date: new Date().toISOString().split("T")[0], 
          carry_over: false,
          recurring: false,
        },
  });

  const onSubmit: SubmitHandler<BudgetFields> = async (data) => { 
    if (!user) return;  

    if (budget) {
      // EDIT 
      await updateBudget.mutateAsync({
        id: budget.id,
        updates: {
          ...data,
        },
      });
    } else {
      // ADD 
      await createBudget.mutateAsync({
        user_id: user.id,
        ...data,
      });
    }
  };

  const isLoading = budget
    ? updateBudget.isPending
    : createBudget.isPending;

  const isSuccessful = budget
    ? updateBudget.isSuccess
    : createBudget.isSuccess;
 
  return { form, onSubmit, isLoading, isSuccessful };
}
