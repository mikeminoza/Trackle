"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema, TransactionFields } from "@/lib/schemas/transaction"; 
import { useTransaction } from "@/lib/mutations/transaction";  
import { useUser } from "../useUser";
import { Transaction } from "@/types/db";

export default function useTransactionForm(transaction: Transaction | null) {
  const { data: user } = useUser()
  const { createTransaction, updateTransaction } = useTransaction(); 

  const form = useForm<TransactionFields>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: transaction
      ? {
          type: transaction.type as "income" | "expense",
          title: transaction.title,
          amount: transaction.amount,
          category: transaction.category,
          date: transaction.date
        }
      : {
          type: "expense",
          title: "",
          amount: 0,
          category: "",
          date: new Date().toISOString().split("T")[0], 
        },
  });

  const onSubmit: SubmitHandler<TransactionFields> = async (data) => { 
    if (!user) return;  

    if (transaction) {
      // EDIT 
      await updateTransaction.mutateAsync({
        id: transaction.id,
        updates: {
          ...data,
        },
      });
    } else {
      // ADD 
      await createTransaction.mutateAsync({
        user_id: user.id,
        ...data,
      });
    }
  };

  const isLoading = transaction
    ? updateTransaction.isPending
    : createTransaction.isPending;

  const isSuccessful = transaction
    ? updateTransaction.isSuccess
    : createTransaction.isSuccess; 
    
  return { form, onSubmit, isLoading, isSuccessful };
}
