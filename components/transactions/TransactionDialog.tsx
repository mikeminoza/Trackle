"use client";

import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import CategoryFilter from "./CategoryFilter";

export default function TransactionDialog() {
  const [type, setType] = React.useState<"income" | "expense">("expense");
  const [category, setCategory] = React.useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Transaction</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Record a new income or expense.</DialogDescription>
        </DialogHeader>

        <form className="space-y-5 mt-3">
          {/* Transaction Type */}
          <div>
            <Label className="mb-2 block">Type</Label>
            <RadioGroup
              value={type}
              onValueChange={(val: string) => setType(val as "income" | "expense")}
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
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="e.g. Jollibee Lunch" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <CategoryFilter onChange={(val) => setCategory(val)} />
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" placeholder="₱0.00" />
          </div>
        </form>

        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
