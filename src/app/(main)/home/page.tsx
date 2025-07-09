
import { useDashboardStats } from "@/app/api/analytics";
import { useRecentTransactions } from "@/app/api/transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { SummaryCards } from "./summaryCard";
import { Overview } from "./overview";
import { RecentTransactions } from "./recentTransactions";

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats({
    startDate: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });

  const { data: transactions, isLoading: transactionsLoading } =
    useRecentTransactions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {statsLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-[100px] w-full" />
          ))}
        </div>
      ) : (
        <SummaryCards
          totalIncome={stats?.totalIncome || 0}
          totalExpenses={stats?.totalExpenses || 0}
          netSavings={stats?.netSavings || 0}
          budgetUsage={stats?.budgetUsage || 0}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {statsLoading ? (
          <Skeleton className="h-[300px] w-full col-span-4" />
        ) : (
          <Overview
            data={stats?.spendingTrends || []}
            className="col-span-4"
          />
        )}

        {transactionsLoading ? (
          <Skeleton className="h-[300px] w-full col-span-3" />
        ) : (
          <RecentTransactions
            transactions={transactions || []}
            className="col-span-3"
          />
        )}
      </div>
    </div>
  );
}

function format(date: Date, format: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}