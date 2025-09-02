import { ContentHeader } from "@/components/sidebar/content-header";
import FinancialSummary from "@/components/home/FInancialSummary";
import SpendingChart from "@/components/home/SpendingChart";
import IncomeExpenseChart from "@/components/home/IncomeExpenseChart";
import BudgetProgress from "@/components/home/BudgetProgress";
import SavingsChart from "@/components/home/SavingsChart";

export default async function Page() {
  return (
    <>
      <ContentHeader title="Dashboard" breadcrumbs={[]} />

      <div className="flex-1 w-full flex flex-col gap-4 my-6 px-6">
        {/* dashboard kpi  */}
        <FinancialSummary />
        {/* charts  */}
        <IncomeExpenseChart />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <SpendingChart />
          <SavingsChart />
          <BudgetProgress
            categories={[
              { name: "Food", spent: 3200, limit: 5000 },
              { name: "Transport", spent: 1200, limit: 2000 },
              { name: "Entertainment", spent: 4500, limit: 5000 },
            ]}
          />
        </div>
      </div>
    </>
  );
}
