import { Plus, Repeat, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MotionEffect } from "../animate-ui/effects/motion-effect";
import CategoryFilter from "../transactions/CategoryFilter";

export default function BudgetDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MotionEffect slide={{ direction: "down" }} fade zoom inView delay={0.3}>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Budget
          </Button>
        </MotionEffect>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Budget</DialogTitle>
          <DialogDescription>Create a budget with flexible options.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Category</Label>
            <CategoryFilter />
          </div>
          <div className="grid gap-2">
            <Label>Limit</Label>
            <Input type="number" placeholder="₱5000" />
          </div>
          <div className="grid gap-2">
            <Label>Period</Label>
            <Select defaultValue="Monthly">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Daily">Daily</SelectItem>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-2">
            <Label htmlFor="recurring" className="flex items-center gap-2">
              <Repeat className="h-4 w-4" /> Recurring
            </Label>
            <Switch id="recurring" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="carryover" className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" /> Carryover unused
            </Label>
            <Switch id="carryover" />
          </div>
        </div>
        <DialogFooter>
          <Button>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
