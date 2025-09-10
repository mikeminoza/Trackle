"use client";
import { getCategoryLabel } from "@/constants/categories";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Transaction } from "@/types/db";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import TransactionDialog from "./TransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import { useState } from "react";

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-accent text-muted-foreground">
                <MoreVertical className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setEditOpen(true);
                }}
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setDeleteOpen(true);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
