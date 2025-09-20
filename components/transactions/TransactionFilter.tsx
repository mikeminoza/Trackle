import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
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
import CalendarFilter from "./CalendarFilter";
import CategoryFilter from "./CategoryFilter";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";

export default function TransactionFilter() {
  const { setParam, searchParams, resetParams } = useUpdateQueryParams();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Filters <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Refine your transactions by type, category, or amount range.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 space-y-6">
          {/* Calendar Filter */}
          <div className="grid gap-3">
            <Label>Date</Label>
            <CalendarFilter />
          </div>

          {/* Type Filter */}
          <div className="grid gap-3">
            <Label>Transaction Type</Label>
            <Select
              value={searchParams.get("type") ?? "all"}
              onValueChange={(val) => setParam("type", val)}
            >
              <SelectTrigger className="w-full">
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
            <CategoryFilter
              value={searchParams.get("category") ?? "all"}
              onChange={(val) => setParam("category", val)}
            />
          </div>

          {/* Amount Range */}
          <div className="grid gap-3">
            <Label>Amount Range</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min ₱"
                value={searchParams.get("minAmount") ?? ""}
                onChange={(e) => setParam("minAmount", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max ₱"
                value={searchParams.get("maxAmount") ?? ""}
                onChange={(e) => setParam("maxAmount", e.target.value)}
              />
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button
            variant="outline"
            onClick={() =>
              resetParams(["query", "period", "date", "type", "category", "minAmount", "maxAmount"])
            }
          >
            Reset Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
