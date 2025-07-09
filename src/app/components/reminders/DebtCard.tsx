import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, AlertTriangle, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Debt } from "@/@types/types";
import { toast } from "react-toastify";
import { useDeleteDebts } from "@/app/stores/reminders.store";

interface DebtCardProps {
  debt: Debt;
  onEdit: (debt: Debt) => void;
  onRecordPayment: (debt: Debt) => void;
  onViewPlan: (debt: Debt) => void;
}

export function DebtCard({
  debt,
  onEdit,
  onRecordPayment,
  onViewPlan,
}: DebtCardProps) {
  
  const deleteDebt = useDeleteDebts();

  const handleDelete = () => {
    deleteDebt.mutate(debt.id, {
      onSuccess: () => {
        toast.success("Your debt has been deleted successfully")
      },
    });
  };

  const percentagePaid =
    ((debt.initialAmount - debt.currentAmount) / debt.initialAmount) * 100;
  const isOverdue = new Date(debt.dueDate) < new Date() && !debt.isPaid;

  return (
    <Card className={isOverdue ? "border-red-500" : ""}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          {debt.isPaid ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : isOverdue ? (
            <AlertTriangle className="h-4 w-4 text-red-500" />
          ) : null}
          <CardTitle className="text-sm font-medium">{debt.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(debt)}>
              Edit
            </DropdownMenuItem>
            {!debt.isPaid && (
              <>
                <DropdownMenuItem onClick={() => onRecordPayment(debt)}>
                  Record Payment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewPlan(debt)}>
                  View Payoff Plan
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem
              className="text-red-500"
              onClick={handleDelete}
              disabled={deleteDebt.isPending}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm">
              Due: {format(new Date(debt.dueDate), "MMM dd, yyyy")}
            </p>
            {debt.creditor && (
              <p className="text-sm text-muted-foreground">
                Creditor: {debt.creditor}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">
              ${debt.currentAmount.toFixed(2)} / ${debt.initialAmount.toFixed(2)}
            </p>
            <Badge variant="outline" className="mt-1">
              {debt.interestRate ? `${debt.interestRate}% APR` : "No interest"}
            </Badge>
          </div>
        </div>
        {!debt.isPaid && (
          <Progress
            value={percentagePaid}
            className="h-2"
            // ClassName="bg-green-500"
          />
        )}
      </CardContent>
    </Card>
  );
}