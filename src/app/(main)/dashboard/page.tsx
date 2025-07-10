// "use client";
// import { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Select } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { format } from "date-fns";
// import { DateRange } from "react-day-picker";
// import { useAnalyticsStore } from "@/app/stores/analytics.store";
// import { useAccountStore } from "@/app/stores/account.stores";
// import { CustomBarChart } from "@/app/components/charts/Barchart";
// import { CustomPieChart } from "@/app/components/charts/PieChart";
// import { DateRangePicker } from "@/app/components/charts/DateRangePicker";

// export default function DashboardPage() {
//   const { dashboardStats, fetchDashboardStats, isLoading } = useAnalyticsStore();
//   const { accounts } = useAccountStore();
//   const [dateRange, setDateRange] = useState<DateRange | undefined>();
//   const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//   useEffect(() => {
//     const params = {
//       startDate: dateRange?.from?.toISOString(),
//       endDate: dateRange?.to?.toISOString(),
//       accounts: selectedAccounts,
//       categories: selectedCategories,
//     };
//     fetchDashboardStats(params);
//   }, [dateRange, selectedAccounts, selectedCategories, fetchDashboardStats]);

//   const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const options = Array.from(e.target.selectedOptions, option => option.value);
//     setSelectedAccounts(options);
//   };

//   const categorySpendingData = dashboardStats?.categorySpending?.map((cat: any) => ({
//     name: cat.name,
//     value: cat.total,
//     color: cat.color,
//   })) || [];

//   return (
//     <div className="container mx-auto py-8 space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
//           <DateRangePicker
//             onSelect={setDateRange}
//             initialFrom={dashboardStats?.currentMonth?.startDate}
//             initialTo={dashboardStats?.currentMonth?.endDate}
//           />
//           <select 
//             multiple
//             value={selectedAccounts}
//             onChange={handleAccountChange}
//             className="min-w-[200px]"
//           >
//             <option value="">All Accounts</option>
//             {accounts.map(account => (
//               <option key={account._id} value={account._id}>
//                 {account.name}
//               </option>
//             ))}
//           </select>
//           <Button 
//             onClick={() => {
//               setSelectedAccounts([]);
//               setSelectedCategories([]);
//               setDateRange(undefined);
//             }}
//             variant="outline"
//           >
//             Clear Filters
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Current Month</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <div>
//                 <p className="text-sm text-muted-foreground">Income</p>
//                 <p className="text-xl font-semibold text-green-500">
//                   {dashboardStats?.currentMonth?.income?.toLocaleString(undefined, {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Expenses</p>
//                 <p className="text-xl font-semibold text-red-500">
//                   {dashboardStats?.currentMonth?.expenses?.toLocaleString(undefined, {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Net</p>
//                 <p className="text-xl font-semibold">
//                   {dashboardStats?.currentMonth?.net?.toLocaleString(undefined, {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Previous Month</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <div>
//                 <p className="text-sm text-muted-foreground">Income</p>
//                 <p className="text-xl font-semibold text-green-500">
//                   {dashboardStats?.previousMonth?.income?.toLocaleString(undefined, {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Expenses</p>
//                 <p className="text-xl font-semibold text-red-500">
//                   {dashboardStats?.previousMonth?.expenses?.toLocaleString(undefined, {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Net</p>
//                 <p className="text-xl font-semibold">
//                   {dashboardStats?.previousMonth?.net?.toLocaleString(undefined, {
//                     style: "currency",
//                     currency: "USD",
//                   })}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Trends</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <div>
//                 <p className="text-sm text-muted-foreground">Monthly Expense Trend</p>
//                 <p className={`text-xl font-semibold ${
//                   dashboardStats?.trends?.monthlyExpense >= 0 
//                     ? "text-red-500" 
//                     : "text-green-500"
//                 }`}>
//                   {dashboardStats?.trends?.monthlyExpense?.toFixed(2)}%
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Yearly Expense Trend</p>
//                 <p className={`text-xl font-semibold ${
//                   dashboardStats?.trends?.yearlyExpense >= 0 
//                     ? "text-red-500" 
//                     : "text-green-500"
//                 }`}>
//                   {dashboardStats?.trends?.yearlyExpense?.toFixed(2)}%
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Total Balance</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">
//               {dashboardStats?.totalBalance?.toLocaleString(undefined, {
//                 style: "currency",
//                 currency: "USD",
//               })}
//             </p>
//             <p className="text-sm text-muted-foreground">
//               Across {dashboardStats?.accounts?.length} accounts
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Spending by Category</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {categorySpendingData.length > 0 ? (
//               <CustomPieChart 
//                 data={categorySpendingData}
//                 colors={categorySpendingData.map((cat: { color: string; }) => cat.color)}
//               />
//             ) : (
//               <p className="text-center text-muted-foreground py-8">
//                 No category spending data available
//               </p>
//             )}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Income vs Expenses</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {dashboardStats?.currentMonth ? (
//               <CustomBarChart
//                 data={[
//                   {
//                     name: "Current Month",
//                     income: dashboardStats.currentMonth.income,
//                     expenses: dashboardStats.currentMonth.expenses,
//                   },
//                   {
//                     name: "Previous Month",
//                     income: dashboardStats.previousMonth.income,
//                     expenses: dashboardStats.previousMonth.expenses,
//                   },
//                 ]}
//                 xAxisKey="name"
//                 barKeys={[
//                   { key: "income", color: "#10b981", name: "Income" },
//                   { key: "expenses", color: "#ef4444", name: "Expenses" },
//                 ]}
//               />
//             ) : (
//               <p className="text-center text-muted-foreground py-8">
//                 No income/expense data available
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


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

export default function DashboardPage() {
  const { dashboardStats, fetchDashboardStats} = useAnalyticsStore();
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

  return (
    <div className="container mx-auto py-8 space-y-6 px-4 md:px-3 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <DateRangePicker
            onSelect={setDateRange}
            initialFrom={dashboardStats?.currentMonth?.startDate}
            initialTo={dashboardStats?.currentMonth?.endDate}
          />
          <select 
            multiple
            value={selectedAccounts}
            onChange={handleAccountChange}
            className="min-w-[200px] max-h-[30px] flex items-center justify-center"
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
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className=" border-[#f57708]">
          <CardHeader>
            <CardTitle>Current Month</CardTitle>
          </CardHeader>
          <CardContent className="">
            <div className="space-y-2 flex gap-5 ">
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Income</p>
                <p className="text-[18px] md:text-xl font-semibold text-green-500">
                  {(dashboardStats?.currentMonth?.income || 5000)?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-[18px] md:text-xl font-semibold text-red-500">
                  {(dashboardStats?.currentMonth?.expenses || 3200)?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Net</p>
                <p className="text-[18px] md:text-xl font-semibold">
                  {(dashboardStats?.currentMonth?.net || 1800)?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className=" border-[#f57708]">
          <CardHeader>
            <CardTitle>Previous Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 flex gap-5">
              <div className="flex flex-col items-center">
                <p className="text-md text-muted-foreground">Income</p>
                <p className="text-[18px] md:text-xl font-semibold text-green-500">
                  {(dashboardStats?.previousMonth?.income || 4800)?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-[18px] md:text-xl font-semibold text-red-500">
                  {(dashboardStats?.previousMonth?.expenses || 3100)?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Net</p>
                <p className="text-[18px] md:text-xl font-semibold">
                  {(dashboardStats?.previousMonth?.net || 1700)?.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className=" border-[#f57708]">
          <CardHeader>
            <CardTitle>Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 flex gap-5">
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Monthly Expense Trend</p>
                <p className={`text-[18px] md:text-xl font-semibold ${
                  (dashboardStats?.trends?.monthlyExpense ?? 3.2) >= 0 
                    ? "text-red-500" 
                    : "text-green-500"
                }`}>
                  {(dashboardStats?.trends?.monthlyExpense ?? 3.2)?.toFixed(2)}%
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground">Yearly Expense Trend</p>
                <p className={`text-[18px] md:text-xl font-semibold ${
                  (dashboardStats?.trends?.yearlyExpense ?? 8.5) >= 0 
                    ? "text-red-500" 
                    : "text-green-500"
                }`}>
                  {(dashboardStats?.trends?.yearlyExpense ?? 8.5)?.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className=" border-[#f57708]">
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {(dashboardStats?.totalBalance || 15250)?.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              Across {dashboardStats?.accounts?.length || 3} accounts
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className=" border-[#f57708]">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomPieChart 
              data={categorySpendingData}
              colors={categorySpendingData.map((cat: { color: string; }) => cat.color)}
            />
            {!hasValidCategoryData && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Real data would display when you create your categories
              </p>
            )}
          </CardContent>
        </Card>

        <Card className=" border-[#f57708]">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomBarChart
              data={incomeExpenseData}
              xAxisKey="name"
              barKeys={[
                { key: "income", color: "#10b981", name: "Income" },
                { key: "expenses", color: "#ef4444", name: "Expenses" },
              ]}
            />
            {!hasValidIncomeExpenseData && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Real datas would display when you create real expense and income
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}