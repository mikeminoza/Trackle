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
import { Check, ChevronDownIcon, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import CategoryFilter from "./CategoryFilter";
import useTransactionForm from "@/hooks/forms/useTransactionForm";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormLabel } from "../ui/form";
import { FormInput } from "../FormInput";
import { useEffect, useState } from "react";
import { TransactionDialogProps } from "@/types/transaction";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns/format";

export default function TransactionDialog({
  mode,
  label,
  open,
  onOpenChange,
  transaction = null,
}: TransactionDialogProps) {
  const { form, onSubmit, isLoading, isSuccessful } = useTransactionForm(transaction);
  const [openPopover, setOpenPopover] = useState(false);

  const type = form.watch("type");
  const category = form.watch("category");
  const dateInput = form.watch("date");

  // close dialog whenever submission is successful
  useEffect(() => {
    if (isSuccessful) {
      onOpenChange(false);
      form.reset();
    }
  }, [isSuccessful, form, onOpenChange]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) form.reset();
      }}
    >
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
              <CategoryFilter
                value={category}
                type={type}
                onChange={(val) => form.setValue("category", val)}
              />
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

            {/* Date  */}
            <div className="space-y-2">
              <FormLabel
                className={cn("text-xs ms-1", form.formState.errors.date ? "text-destructive" : "")}
              >
                Date
              </FormLabel>
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    {dateInput ? format(dateInput, "MMMM d, yyyy") : "Select date"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateInput ? new Date(dateInput) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (date) {
                        form.setValue("date", date.toISOString());
                        setOpenPopover(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.date && (
                <p data-slot="form-message" className="text-destructive text-sm">
                  {form.formState.errors.date.message}
                </p>
              )}
            </div>

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
