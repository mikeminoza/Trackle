"use client";
import { Repeat, ArrowRight, ChevronDownIcon } from "lucide-react";
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
import { Form, FormLabel } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryFilter from "../transactions/CategoryFilter";
import { FormInput } from "../FormInput";
import { BudgetDialogProps } from "@/types/budget";
import useBudgetForm from "@/hooks/forms/useBudgetForm";
import { format } from "date-fns";

export default function BudgetDialog({
  mode,
  label,
  open,
  onOpenChange,
  budget = null,
}: BudgetDialogProps) {
  const { form, onSubmit, isLoading, isSuccessful } = useBudgetForm(budget);
  const [openPopover, setOpenPopover] = useState(false);

  const period = form.watch("period");
  const category = form.watch("category");
  const startDate = form.watch("start_date");

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
            <DialogTitle>{label} Budget</DialogTitle>
            <DialogDescription>
              {mode === "add"
                ? "Create a budget with flexible options."
                : "Update your budget details."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-3">
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

            {/* Limit */}
            <FormInput
              control={form.control}
              name="limit_amount"
              label="Limit Amount"
              type="number"
              placeholder="₱5000"
            />

            {/* Start Date  */}
            <div className="space-y-2">
              <FormLabel
                className={cn(
                  "text-xs ms-1",
                  form.formState.errors.start_date ? "text-destructive" : ""
                )}
              >
                Start Date
              </FormLabel>
              <Popover open={openPopover} onOpenChange={setOpenPopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between font-normal">
                    {startDate ? format(startDate, "MMMM d, yyyy") : "Select date"}
                    <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate ? new Date(startDate) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (date) {
                        form.setValue("start_date", date.toISOString());
                        setOpenPopover(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              {form.formState.errors.start_date && (
                <p data-slot="form-message" className="text-destructive text-sm">
                  {form.formState.errors.start_date.message}
                </p>
              )}
            </div>

            {/* Period */}
            <div className="space-y-2">
              <FormLabel
                className={cn(
                  "text-xs ms-1",
                  form.formState.errors.period ? "text-destructive" : ""
                )}
              >
                Period
              </FormLabel>
              <Select
                value={period}
                onValueChange={(val) =>
                  form.setValue("period", val as "daily" | "weekly" | "monthly" | "yearly")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.period && (
                <p data-slot="form-message" className="text-destructive text-sm">
                  {form.formState.errors.period.message}
                </p>
              )}
            </div>

            {/* Recurring */}
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="recurring" className="flex items-center gap-2">
                <Repeat className="h-4 w-4" /> Recurring
              </FormLabel>
              <div className="flex justify-end">
                <FormInput control={form.control} name="recurring" variant="switch" />
              </div>
            </div>

            {/* Carry Over */}
            <div className="flex items-center justify-between">
              <FormLabel htmlFor="carry_over" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" /> Carryover unused
              </FormLabel>
              <div className="flex justify-end">
                <FormInput control={form.control} name="carry_over" variant="switch" />
              </div>
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
                      Saving...
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
