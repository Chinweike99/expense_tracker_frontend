"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MoreVertical, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { useDeleteBudget } from "@/app/stores/budget.store";
import { BudgetProgress } from "@/@types/types";

interface BudgetCardProps {
  budget: BudgetProgress;
  onEdit: (budget: BudgetProgress) => void;
}

export function BudgetCard({ budget, onEdit }: BudgetCardProps) {
  const deleteBudget = useDeleteBudget();

  const handleDelete = () => {
    deleteBudget.mutate(budget._id, {
      onSuccess: () => {
        toast.success("Budget deleted successfully");
      },
    });
  };

  const isOverBudget = budget.percentageUsed >= 100;
  const isNearBudget = budget.percentageUsed >= 80;

  return (
    <Card className={isOverBudget ? "border-red-500" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {/* {budget.name} ({budget.category}) */}
          {budget.category?.icon} {budget.name} ({budget.category?.name})
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(budget)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={handleDelete}
              disabled={deleteBudget.isPending}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
          </span>
          <span
            className={`text-sm font-medium ${
              isOverBudget ? "text-red-500" : isNearBudget ? "text-yellow-500" : "text-green-500"
            }`}
          >
            {budget.percentageUsed.toFixed(0)}%
          </span>
        </div>
        <Progress
          value={budget.percentageUsed}
          className={`h-2 ${
            isOverBudget ? "bg-red-500" : isNearBudget ? "bg-yellow-500" : "bg-green-500"
          }`}
        />
        {isNearBudget && (
          <div className="flex items-center mt-2 text-yellow-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {isOverBudget ? "Over budget" : "Approaching budget limit"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}