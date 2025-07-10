"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Budget, BudgetProgress } from "@/@types/types";
import { useBudgetAlerts, useBudgetForecast, useBudgets, useCreateBudget } from "@/app/stores/budget.store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BudgetCard } from "@/app/components/budget/BudgetCard";
import { ForecastChart } from "@/app/components/charts/ForcastChart";
import { BudgetForm } from "@/app/components/budget/BudgetForm";

export default function BudgetsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const { data: budgets, isLoading: budgetsLoading } = useBudgets({
    active: true,
  });
  const { data: alerts } = useBudgetAlerts();
  const { data: forecast, isLoading: forecastLoading } = useBudgetForecast({
    period: "month",
  });
  const createBudget = useCreateBudget();

  // Transform Budget objects to BudgetProgress objects
  const budgetProgress = useMemo(() => {
    if (!budgets) return [];
    
    return budgets.map((budget): BudgetProgress => {
      const spent = calculateSpentAmount(budget);
      const remaining = Math.max(0, budget.amount - spent);
      const percentageUsed = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
      
      return {
        ...budget,
        spent,
        remaining,
        percentageUsed,
      };
    });
  }, [budgets]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    createBudget.mutate(values, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setEditingBudget(null);
      },
    });
  };

  const handleEdit = (budgetProgress: BudgetProgress) => {
    const originalBudget: Budget = {
      id: budgetProgress.id,
      name: budgetProgress.name,
      amount: budgetProgress.amount,
      category: budgetProgress.category,
      period: budgetProgress.period, 
      startDate: budgetProgress.startDate, 
      rollover: budgetProgress.rollover, 
      createdAt: budgetProgress.createdAt, 
      updatedAt: budgetProgress.updatedAt
    };
    setEditingBudget(originalBudget);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Budgets & Forecasting</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Budget
        </Button>
      </div>

      {alerts && alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.type === "overspend" ? "destructive" : "default"}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{alert.budgetName}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="budgets">
        <TabsList>
          <TabsTrigger value="budgets">My Budgets</TabsTrigger>
          <TabsTrigger value="forecast">Spending Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="budgets">
          {budgetsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[150px] w-full" />
              ))}
            </div>
          ) : budgetProgress && budgetProgress.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {budgetProgress.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                You don&apos;t have any budgets yet. Create one to get started.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="forecast">
          <div className="bg-white dark:bg-gray-900 rounded-lg border p-4">
            <h2 className="text-lg font-semibold mb-4">
              12-Month Spending Forecast
            </h2>
            <ForecastChart
              data={forecast || []}
              isLoading={forecastLoading}
            />
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingBudget ? "Edit Budget" : "Create New Budget"}
            </DialogTitle>
          </DialogHeader>
          <BudgetForm
            initialData={editingBudget || undefined}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsDialogOpen(false);
              setEditingBudget(null);
            }}
            isLoading={createBudget.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function to calculate spent amount - implement based on your data structure
function calculateSpentAmount(budget: Budget): number {
  // This is a placeholder implementation
  // Replace with your actual logic to calculate spent amount
  // You might need to:
  // 1. Query transactions for this budget
  // 2. Sum up the amounts
  // 3. Return the total
  
  // For now, returning a mock value
  return Math.random() * budget.amount;
}