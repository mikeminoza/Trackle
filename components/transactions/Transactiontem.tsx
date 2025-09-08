import { getCategoryLabel } from "@/constants/categories";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Transaction } from "@/types/db";

type Props = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: Props) {
  return (
    <li className="flex items-center justify-between p-4 hover:bg-accent/50 transition">
      <div>
        <p className="font-medium">{transaction.title}</p>
        <p className="text-sm text-muted-foreground">{getCategoryLabel(transaction.category)}</p>
      </div>
      <p
        className={`font-semibold ${
          transaction.type === "expense" ? "text-red-400" : "text-green-400"
        }`}
      >
        {transaction.type === "expense"
          ? `- ${formatCurrency(transaction.amount)}`
          : `+ ${formatCurrency(transaction.amount)}`}
      </p>
    </li>
  );
}
