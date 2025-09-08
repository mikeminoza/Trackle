"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema, TransactionFields } from "@/lib/schemas/transaction"; 
import { useTransaction } from "@/lib/mutations/transaction";  
import { useUser } from "../useUser";

export default function useTransactionForm() {
  const { data: user } = useUser()
  const { createTransaction } = useTransaction(); 

  const form = useForm<TransactionFields>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      type: "expense",
      title: "",
      amount: 0,
      category: "",
    },
  });

  const onSubmit: SubmitHandler<TransactionFields> = async (data) => { 
    if (!user) return;  
    await createTransaction.mutateAsync({
      user_id: user.id,
      ...data,
    });
  };

  return { form, onSubmit, isLoading: createTransaction.isPending, isSuccessful: createTransaction.isSuccess };
}
