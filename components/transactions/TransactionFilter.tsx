"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

export default function TransactionFilter() {
  const [transactionType, setTransactionType] = useState<"all" | "income" | "expense">("all");
  const [category, setCategory] = useState("all");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Refine your transactions by type, category, or amount range.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
          {/* Type Filter */}
          <div className="grid gap-3">
            <Label>Transaction Type</Label>
            <Select
              value={transactionType}
              onValueChange={(val) => setTransactionType(val as "all" | "income" | "expense")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="grid gap-3">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="bills">Bills</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount Range */}
          <div className="grid gap-3">
            <Label>Amount Range</Label>
            <div className="flex gap-2">
              <Input type="number" placeholder="Min ₱" />
              <Input type="number" placeholder="Max ₱" />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() => {
              setTransactionType("all");
              setCategory("all");
            }}
          >
            Reset
          </Button>
          <SheetClose asChild>
            <Button>Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
