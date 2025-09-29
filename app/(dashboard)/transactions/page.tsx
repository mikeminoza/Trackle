import type { Metadata } from "next";
import TransactionsClient from "@/components/dashboard/TransactionsClient";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Track and review your income and expense transactions in detail.",
};

export default function TransactionsPage() {
  return <TransactionsClient />;
}
