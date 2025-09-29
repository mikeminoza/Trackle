import type { Metadata } from "next";
import BudgetsClient from "@/components/dashboard/BudgetsClient";

export const metadata: Metadata = {
  title: "Budgets",
  description: "Create, monitor, and adjust your budgets to stay on top of your spending.",
};

export default function BudgetsPage() {
  return <BudgetsClient />;
}
