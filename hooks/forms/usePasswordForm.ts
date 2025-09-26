"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChangePasswordFields,
  ChangePasswordSchema,
} from "@/lib/schemas/auth";

export default function usePasswordForm() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePasswordFields>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFields> = async (data) => {
    setIsLoading(true);
 
    const { error } = await supabase.auth.updateUser({
      password: data.new_password,
    });

    if (error) {
      toast.error(`Password update failed: ${error.message}`);
    } else {
      toast.success("Password updated successfully!");
      form.reset();  
    }

    setIsLoading(false);
  };

  return {
    form,
    onSubmit,
    isLoading,
  };
}
