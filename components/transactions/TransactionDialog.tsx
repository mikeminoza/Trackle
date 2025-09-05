"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import CategoryFilter from "./CategoryFilter";
import useTransactionForm from "@/hooks/forms/useTransactionForm";
import { Form, FormLabel } from "../ui/form";
import { FormInput } from "../FormInput";
import { useEffect, useState } from "react";

export default function TransactionDialog() {
  const { form, onSubmit, isLoading, isSuccessful } = useTransactionForm();
  const type = form.watch("type");
  form.watch("category");
  const [open, setOpen] = useState(false);

  // close dialog whenever submission is successful
  useEffect(() => {
    if (isSuccessful) {
      setOpen(false);
      form.reset();
    }
  }, [isSuccessful, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>Record a new income or expense.</DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-3">
            {/* Transaction Type */}
            <div>
              <FormLabel className="text-xs ms-1 mb-2">Type</FormLabel>
              <RadioGroup
                value={type}
                onValueChange={(val: "income" | "expense") => form.setValue("type", val)}
                className="flex gap-3"
              >
                {["expense", "income"].map((option) => (
                  <Label
                    key={option}
                    htmlFor={option}
                    className={cn(
                      "flex-1 cursor-pointer rounded-lg border px-4 py-2 flex items-center justify-between text-sm font-medium transition",
                      type === option
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                    {type === option && <Check className="h-4 w-4" />}
                    <RadioGroupItem value={option} id={option} className="hidden" />
                  </Label>
                ))}
              </RadioGroup>
            </div>

            {/* Title */}
            <FormInput
              control={form.control}
              name="title"
              label="Title"
              placeholder="e.g. Rent, Salary, Groceries"
            />

            {/* Category */}
            <div className="space-y-2">
              <FormLabel
                className={cn(
                  "text-xs ms-1",
                  form.formState.errors.category ? "text-destructive" : ""
                )}
              >
                Category
              </FormLabel>
              <CategoryFilter onChange={(val) => form.setValue("category", val)} />
              {form.formState.errors.category && (
                <p data-slot="form-message" className="text-destructive text-sm">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <FormInput
              control={form.control}
              name="amount"
              label="Amount"
              type="number"
              placeholder="₱0.00"
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>Add</>
                  )}
                </div>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
