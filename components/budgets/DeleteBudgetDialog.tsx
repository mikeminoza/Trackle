"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useBudget } from "@/lib/mutations/budget";
import { Budget } from "@/types/db";
import { getCategoryLabel } from "@/constants/categories";

type DeleteBudgetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  budget: Budget;
};

export default function DeleteBudgetDialog({
  open,
  onOpenChange,
  budget,
}: DeleteBudgetDialogProps) {
  const { deleteBudget } = useBudget();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Budget</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the budget{" "}
            <span className="font-semibold">{getCategoryLabel(budget.category)}</span>? <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteBudget.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteBudget.isPending}
            onClick={() => deleteBudget.mutateAsync(budget.id).then(() => onOpenChange(false))}
          >
            {deleteBudget.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
