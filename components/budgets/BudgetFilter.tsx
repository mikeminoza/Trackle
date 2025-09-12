import { Button } from "@/components/ui/button";
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
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams";
import CategoryFilter from "../transactions/CategoryFilter";

export default function BudgetFilter() {
  const { setParam, searchParams, resetParams } = useUpdateQueryParams();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Filter Budgets <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Budget Filters</SheetTitle>
          <SheetDescription>
            Refine budgets by status, category, time, or progress.
          </SheetDescription>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4 mt-6">
          {/* Status */}
          <div className="grid gap-3">
            <Label>Status</Label>
            <Select
              value={searchParams.get("status") ?? "active"}
              onValueChange={(val) => setParam("status", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="grid gap-3">
            <Label>Category</Label>
            <CategoryFilter
              value={searchParams.get("category") ?? "all"}
              onChange={(val) => setParam("category", val)}
            />
          </div>

          {/* Time Period */}
          <div className="grid gap-3">
            <Label>Time Period</Label>
            <Select
              value={searchParams.get("period") ?? "all"}
              onValueChange={(val) => setParam("period", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Recurring */}
          <div className="grid gap-3">
            <Label>Recurring</Label>
            <Select
              value={searchParams.get("recurring") ?? "all"}
              onValueChange={(val) => setParam("recurring", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Recurring or not" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Carryover */}
          <div className="grid gap-3">
            <Label>Carryover</Label>
            <Select
              value={searchParams.get("carryover") ?? "all"}
              onValueChange={(val) => setParam("carryover", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Carryover or not" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Spending Progress */}
          <div className="grid gap-3">
            <Label>Spending Progress</Label>
            <Select
              value={searchParams.get("progress") ?? "all"}
              onValueChange={(val) => setParam("progress", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Spending progress" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="under50">Under 50%</SelectItem>
                <SelectItem value="50to100">50% - 100%</SelectItem>
                <SelectItem value="over100">Over Limit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() =>
              resetParams([
                "status",
                "category",
                "period",
                "recurring",
                "carryover",
                "minProgress",
                "maxProgress",
              ])
            }
          >
            Reset Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
