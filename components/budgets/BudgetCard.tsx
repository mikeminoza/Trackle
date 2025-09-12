"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarRange, Repeat, ArrowRight, Pencil, Trash2 } from "lucide-react";
import { BudgetWithSpent } from "@/types/budget";
import { capitalizeWords } from "@/lib/utils/capitalizeWords";
import { getCategoryLabel } from "@/constants/categories";
import BudgetDialog from "./BudgetDialog";
import DeleteBudgetDialog from "./DeleteBudgetDialog";
import ActionsMenu from "../ActionsMenu";

export default function BudgetCard({ budget }: { budget: BudgetWithSpent }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const percent = Math.min((budget.spent / budget.limit_amount) * 100, 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            {getCategoryLabel(budget.category)}
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              ₱{budget.limit_amount.toLocaleString()}
            </span>{" "}
            limit •
            <span className="font-medium text-foreground"> ₱{budget.spent.toLocaleString()}</span>{" "}
            spent
          </CardDescription>
          <div className="mt-1 flex flex-wrap gap-1 sm:gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarRange className="h-3 w-3" /> {capitalizeWords(budget.period)}
            </span>
            {budget.recurring && (
              <span className="flex items-center gap-1">
                <Repeat className="h-3 w-3" /> Recurring
              </span>
            )}
            {budget.carry_over && (
              <span className="flex items-center gap-1">
                <ArrowRight className="h-3 w-3" /> Carryover
              </span>
            )}
          </div>
        </div>

        <ActionsMenu
          actions={[
            {
              label: "Edit",
              icon: <Pencil className="w-4 h-4" />,
              onSelect: () => setEditOpen(true),
            },
            {
              label: "Delete",
              icon: <Trash2 className="w-4 h-4" />,
              onSelect: () => setDeleteOpen(true),
            },
          ]}
        />
      </CardHeader>

      <CardContent>
        <Progress value={percent} />
        <p
          className={`mt-2 text-sm font-medium ${
            percent >= 100 ? "text-red-500" : percent >= 80 ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {percent >= 100
            ? "Budget exceeded!"
            : percent >= 80
              ? "Almost at limit"
              : `${Math.round(percent)}% used`}
        </p>
      </CardContent>

      {/* Edit Budget Dialog  */}
      <BudgetDialog
        mode="edit"
        label="Edit"
        open={editOpen}
        onOpenChange={setEditOpen}
        budget={budget}
      />
      {/* Delete Budget Dialog  */}
      <DeleteBudgetDialog open={deleteOpen} onOpenChange={setDeleteOpen} budget={budget} />
    </Card>
  );
}
