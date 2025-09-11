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
import CategoryFilter from "./CategoryFilter";
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";

export default function TransactionFilter() {
  const { setParam, searchParams, resetParams } = useUpdateQueryParams();

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
                defaultValue={searchParams.get("minAmount") ?? ""}
                onChange={(e) => setParam("minAmount", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max ₱"
                defaultValue={searchParams.get("maxAmount") ?? ""}
                onChange={(e) => setParam("maxAmount", e.target.value)}
              />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() => resetParams(["type", "category", "minAmount", "maxAmount"])}
          >
            Reset Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
