"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { useAnalyticsStore } from "@/app/stores/analytics.store";
import { useAccountStore } from "@/app/stores/account.stores";
import { CustomBarChart } from "@/app/components/charts/Barchart";
import { CustomPieChart } from "@/app/components/charts/PieChart";
import { DateRangePicker } from "@/app/components/charts/DateRangePicker";
import { motion, AnimatePresence, easeOut } from "framer-motion";

export default function DashboardPage() {
  const { dashboardStats, fetchDashboardStats } = useAnalyticsStore();
  const { accounts } = useAccountStore();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const params = {
      startDate: dateRange?.from?.toISOString(),
      endDate: dateRange?.to?.toISOString(),
      accounts: selectedAccounts,
      categories: selectedCategories,
    };
    fetchDashboardStats(params);
  }, [dateRange, selectedAccounts, selectedCategories, fetchDashboardStats]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedAccounts(options);
  };

  // Dummy data for category spending
  const dummyCategorySpendingData = [
    { name: "Food & Dining", value: 450, color: "#ef4444" },
    { name: "Transportation", value: 250, color: "#f97316" },
    { name: "Entertainment", value: 180, color: "#eab308" },
    { name: "Shopping", value: 320, color: "#22c55e" },
    { name: "Utilities", value: 200, color: "#3b82f6" },
    { name: "Healthcare", value: 120, color: "#8b5cf6" },
  ];

  // Dummy data for income vs expenses
  const dummyIncomeExpenseData = [
    {
      name: "Current Month",
      income: 5000,
      expenses: 3200,
    },
    {
      name: "Previous Month",
      income: 4800,
      expenses: 3100,
    },
  ];

  // Check if backend data has meaningful values (not zero or empty)
  const hasValidCategoryData = dashboardStats?.categorySpending?.length > 0 && 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dashboardStats.categorySpending.some((cat: any) => cat.total > 0);

  const hasValidIncomeExpenseData = dashboardStats?.currentMonth && dashboardStats?.previousMonth &&
    (dashboardStats.currentMonth.income > 0 || dashboardStats.currentMonth.expenses > 0 ||
     dashboardStats.previousMonth.income > 0 || dashboardStats.previousMonth.expenses > 0);

  // Use backend data if available and meaningful, otherwise use dummy data
  const categorySpendingData = hasValidCategoryData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? dashboardStats.categorySpending.map((cat: any) => ({
        name: cat.name,
        value: cat.total,
        color: cat.color,
      }))
    : dummyCategorySpendingData;

  const incomeExpenseData = hasValidIncomeExpenseData
    ? [
        {
          name: "Current Month",
          income: dashboardStats.currentMonth.income,
          expenses: dashboardStats.currentMonth.expenses,
        },
        {
          name: "Previous Month",
          income: dashboardStats.previousMonth.income,
          expenses: dashboardStats.previousMonth.expenses,
        },
      ]
    : dummyIncomeExpenseData;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: easeOut
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOut
      }
    }
  };
  return (
    <motion.div 
      className="container mx-auto py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6"
        variants={cardVariants}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <DateRangePicker
            onSelect={setDateRange}
            initialFrom={dashboardStats?.currentMonth?.startDate}
            initialTo={dashboardStats?.currentMonth?.endDate}
          />
          <select 
            multiple
            value={selectedAccounts}
            onChange={handleAccountChange}
            className="min-w-[200px] max-h-[30px] flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          >
            <option value="">All Accounts</option>
            {accounts.map(account => (
              <option key={account._id} value={account._id}>
                {account.name}
              </option>
            ))}
          </select>
          <Button 
            onClick={() => {
              setSelectedAccounts([]);
              setSelectedCategories([]);
              setDateRange(undefined);
            }}
            variant="outline"
            className="whitespace-nowrap"
          >
            Clear Filters
          </Button>
        </div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <Card className="border-[#f57708] hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Current Month</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Income</p>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-green-500 break-words text-center"
                    variants={numberVariants}
                  >
                    {(dashboardStats?.currentMonth?.income || 5000)?.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </motion.p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Expenses</p>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-red-500 break-words text-center"
                    variants={numberVariants}
                  >
                    {(dashboardStats?.currentMonth?.expenses || 3200)?.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </motion.p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Net</p>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold break-words text-center"
                    variants={numberVariants}
                  >
                    {(dashboardStats?.currentMonth?.net || 1800)?.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="border-[#f57708] hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Previous Month</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Income</p>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-green-500 break-words text-center"
                    variants={numberVariants}
                  >
                    {(dashboardStats?.previousMonth?.income || 4800)?.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </motion.p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Expenses</p>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-red-500 break-words text-center"
                    variants={numberVariants}
                  >
                    {(dashboardStats?.previousMonth?.expenses || 3100)?.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </motion.p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground">Net</p>
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold break-words text-center"
                    variants={numberVariants}
                  >
                    {(dashboardStats?.previousMonth?.net || 1700)?.toLocaleString(undefined, {
                      style: "currency",
                      currency: "USD",
                    })}
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="border-[#f57708] hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Monthly Expense Trend</p>
                  <motion.p 
                    className={`text-sm sm:text-base lg:text-lg xl:text-xl font-semibold break-words text-center ${
                      (dashboardStats?.trends?.monthlyExpense ?? 3.2) >= 0 
                        ? "text-red-500" 
                        : "text-green-500"
                    }`}
                    variants={numberVariants}
                  >
                    {(dashboardStats?.trends?.monthlyExpense ?? 3.2)?.toFixed(2)}%
                  </motion.p>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">Yearly Expense Trend</p>
                  <motion.p 
                    className={`text-sm sm:text-base lg:text-lg xl:text-xl font-semibold break-words text-center ${
                      (dashboardStats?.trends?.yearlyExpense ?? 8.5) >= 0 
                        ? "text-red-500" 
                        : "text-green-500"
                    }`}
                    variants={numberVariants}
                  >
                    {(dashboardStats?.trends?.yearlyExpense ?? 8.5)?.toFixed(2)}%
                  </motion.p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="border-[#f57708] hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Total Balance</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <motion.p 
                  className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold break-words text-center"
                  variants={numberVariants}
                >
                  {(dashboardStats?.totalBalance || 15250)?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </motion.p>
                <p className="text-xs sm:text-sm text-muted-foreground text-center">
                  Across {dashboardStats?.accounts?.length || 3} accounts
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6"
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <Card className="border-[#f57708] hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full overflow-hidden">
                <CustomPieChart 
                  data={categorySpendingData}
                  colors={categorySpendingData.map((cat: { color: string; }) => cat.color)}
                />
              </div>
              <AnimatePresence>
                {!hasValidCategoryData && (
                  <motion.p 
                    className="text-xs text-muted-foreground text-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Real data would display when you create your categories
                  </motion.p>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="border-[#f57708] hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-sm sm:text-base lg:text-lg">Income vs Expenses</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full overflow-hidden">
                <CustomBarChart
                  data={incomeExpenseData}
                  xAxisKey="name"
                  barKeys={[
                    { key: "income", color: "#10b981", name: "Income" },
                    { key: "expenses", color: "#ef4444", name: "Expenses" },
                  ]}
                />
              </div>
              <AnimatePresence>
                {!hasValidIncomeExpenseData && (
                  <motion.p 
                    className="text-xs text-muted-foreground text-center mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Real data would display when you create real expense and income
                  </motion.p>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}