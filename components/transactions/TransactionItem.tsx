"use client";
import { getCategoryLabel } from "@/constants/categories";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Transaction } from "@/types/db";
import { Pencil, Trash2 } from "lucide-react";
import TransactionDialog from "./TransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import { useState } from "react";
import ActionsMenu from "../ActionsMenu";

type Props = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <li className="group flex items-center justify-between p-4 hover:bg-accent/50 transition rounded-lg">
        <div>
          <p className="font-medium">{transaction.title}</p>
          <p className="text-sm text-muted-foreground">{getCategoryLabel(transaction.category)}</p>
        </div>

        <div className="flex items-center gap-3">
          <p
            className={`font-semibold ${
              transaction.type === "expense" ? "text-red-400" : "text-green-400"
            }`}
          >
            {transaction.type === "expense"
              ? `- ${formatCurrency(transaction.amount)}`
              : `+ ${formatCurrency(transaction.amount)}`}
          </p>

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
        </div>
      </li>
      {/* Edit Transaction Dialog  */}
      <TransactionDialog
        mode="edit"
        label="Edit"
        open={editOpen}
        onOpenChange={setEditOpen}
        transaction={transaction}
      />
      {/* Delete Transaction Dialog  */}
      <DeleteTransactionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        transaction={transaction}
      />
    </>
  );
}
