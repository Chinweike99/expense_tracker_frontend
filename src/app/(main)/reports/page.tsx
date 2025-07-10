"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAnalyticsStore } from "@/app/stores/analytics.store";
import { useAccountStore } from "@/app/stores/account.stores";
import { useCategoryStore } from "@/app/stores/category.store";
import { DateRangePicker } from "@/app/components/charts/DateRangePicker";
import { CustomLineChart } from "@/app/components/charts/LineChart";
import { CustomBarChart } from "@/app/components/charts/Barchart";
import { CalendarHeatmap } from "@/app/components/charts/CalendarHeatmap";

export default function ReportsPage() {
  const {
    spendingTrends,
    categoryComparison,
    expenseHeatmap,
    fetchSpendingTrends,
    fetchCategoryComparison,
    fetchExpenseHeatmap,
    exportTransactions,
  } = useAnalyticsStore();
  
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();
  
  const [activeTab, setActiveTab] = useState("trends");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [selectedAccounts, setSelectedAccounts] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("month");
  const [compareWith, setCompareWith] = useState<"previousPeriod" | "samePeriodLastYear">("previousPeriod");

  useEffect(() => {
    const params = {
      startDate: dateRange.from?.toISOString(),
      endDate: dateRange.to?.toISOString(),
      accounts: selectedAccounts ? [selectedAccounts] : [],
    categories: selectedCategories ? [selectedCategories] : [],
    };

    if (activeTab === "trends") {
      fetchSpendingTrends({ ...params, period });
    } else if (activeTab === "comparison") {
      fetchCategoryComparison({ ...params, compareWith });
    } else if (activeTab === "heatmap") {
      fetchExpenseHeatmap(params);
    }
  }, [
    activeTab,
    dateRange,
    selectedAccounts,
    selectedCategories,
    period,
    compareWith,
    fetchSpendingTrends,
    fetchCategoryComparison,
    fetchExpenseHeatmap,
  ]);

  const handleExport = (format: "csv" | "json") => {
    exportTransactions({
      format,
      startDate: dateRange.from?.toISOString(),
      endDate: dateRange.to?.toISOString(),
      accounts: selectedAccounts ? [selectedAccounts] : [], 
    categories: selectedCategories ? [selectedCategories] : [], 
    });
  };

  
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="teselect font-bold">Reports</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          {/* <DateRangePicker onSelect={setDateRange} /> */}
          <DateRangePicker onSelect={(range) => setDateRange(range ?? {})} />

          {/* <select
            multiple
            value={selectedAccounts}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions, option => option.value);
              setSelectedAccounts(options);
            }}
            className="min-w-[200px]"
          >
            <option value="">All Accounts</option>
            {accounts.map(account => (
              <option key={account._id} value={account._id}>
                {account.name}
              </option>
            ))}
          </select>
          <select
            multiple
            value={selectedCategories}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions, option => option.value);
              setSelectedCategories(options);
            }}
            className="min-w-[200px]"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select> */}

          <select
  value={selectedAccounts}
  onChange={(e) => setSelectedAccounts(e.target.value)}
  className="min-w-[200px]"
>
  <option value="">All Accounts</option>
  {accounts.map(account => (
    <option key={account._id} value={account._id}>
      {account.name}
    </option>
  ))}
</select>

<select
  value={selectedCategories}
  onChange={(e) => setSelectedCategories(e.target.value)}
  className="min-w-[200px]"
>
  <option value="">All Categories</option>
  {categories.map(category => (
    <option key={category._id} value={category._id}>
      {category.name}
    </option>
  ))}
</select>

          <div className="flex gap-2">
            <Button onClick={() => handleExport("csv")} variant="outline">
              Export CSV
            </Button>
            <Button onClick={() => handleExport("json")} variant="outline">
              Export JSON
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
          <TabsTrigger value="comparison">Category Comparison</TabsTrigger>
          <TabsTrigger value="heatmap">Expense Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Spending Trends</CardTitle>
                <select
                  value={period}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e) => setPeriod(e.target.value as any)}
                  className="w-[150px]"
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {spendingTrends.length > 0 ? (
                <CustomLineChart
                  data={spendingTrends}
                  xAxisKey="period"
                  lineKeys={[
                    { key: "total", color: "#3b82f6", name: "Total Spending" },
                  ]}
                />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No spending trends data available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <CardTitle>Category Comparison</CardTitle>
                <select
                  value={compareWith}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e) => setCompareWith(e.target.value as any)}
                  className="w-[200px]"
                >
                  <option value="previousPeriod">Compare with Previous Period</option>
                  <option value="samePeriodLastYear">Compare with Same Period Last Year</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              {categoryComparison.length > 0 ? (
                <CustomBarChart
                  data={categoryComparison}
                  xAxisKey="category.name"
                  barKeys={[
                    { key: "current.total", color: "#3b82f6", name: "Current" },
                    { key: "comparison.total", color: "#64748b", name: "Comparison" },
                  ]}
                />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No category comparison data available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap">
          <Card>
            <CardHeader>
              <CardTitle>Expense Heatmap</CardTitle>
            </CardHeader>
            <CardContent>
              {expenseHeatmap.length > 0 ? (
                <div className="overflow-x-auto">
                  <CalendarHeatmap data={expenseHeatmap} />
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No expense heatmap data available
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}