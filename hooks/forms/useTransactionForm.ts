"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionSchema, TransactionFields } from "@/lib/schemas/transaction"; 
import { useTransaction } from "@/lib/mutations/transaction";
import { getUser } from "@/lib/queries/getUser";
import { createClient } from "@/lib/supabase/client";

export default function useTransactionForm() {
  const { createTransaction } = useTransaction();
  const supabase = createClient();

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
    const user = await getUser(supabase);
    await createTransaction.mutateAsync({
      user_id: user.id,
      ...data,
    });
  };

  return { form, onSubmit, isLoading: createTransaction.isPending, isSuccessful: createTransaction.isSuccess };
}
