"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import CategoryFilter from "./CategoryFilter";
import useTransactionForm from "@/hooks/forms/useTransactionForm";
import { Form, FormLabel } from "../ui/form";
import { FormInput } from "../FormInput";
import { useEffect } from "react";
import { TransactionDialogProps } from "@/types/transaction";

export default function TransactionDialog({
  mode,
  label,
  open,
  onOpenChange,
  transaction = null,
}: TransactionDialogProps) {
  const { form, onSubmit, isLoading, isSuccessful } = useTransactionForm(transaction);
  const type = form.watch("type");
  const category = form.watch("category");

  // close dialog whenever submission is successful
  useEffect(() => {
    if (isSuccessful) {
      onOpenChange(false);
      form.reset();
    }
  }, [isSuccessful, form, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>{label} Transaction</DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? "Record a new income or expense."
                : "Update your transaction details."}
            </DialogDescription>
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
              <CategoryFilter value={category} onChange={(val) => form.setValue("category", val)} />
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
            <DialogFooter className="mt-3">
              <DialogClose asChild disabled={isLoading}>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                <div className="flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    label
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
