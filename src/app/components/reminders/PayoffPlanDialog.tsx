import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
  import { Skeleton } from "@/components/ui/skeleton";
  import { format } from "date-fns";
import { Debt } from "@/@types/types";
import { useDebtPayoffPlan } from "@/app/stores/reminders.store";
  
  interface PayoffPlanDialogProps {
    debt: Debt | null;
    onClose: () => void;
  }
  
  export function PayoffPlanDialog({ debt, onClose }: PayoffPlanDialogProps) {
    const { data: payoffPlan, isLoading } = useDebtPayoffPlan(
      debt?._id || "",
      !!debt
    );
  
    if (!debt) return null;
  
    return (
      <Dialog open={!!debt} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Payoff Plan for {debt.name}</DialogTitle>
          </DialogHeader>
          {isLoading ? (
            <Skeleton className="w-full h-[300px]" />
          ) : payoffPlan ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-xl font-bold">
                    ${payoffPlan.monthlyPayment.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Payoff Date</p>
                  <p className="text-xl font-bold">
                    {format(new Date(payoffPlan.payoffDate), "MMM yyyy")}
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-xl font-bold">
                    ${payoffPlan.totalInterest.toFixed(2)}
                  </p>
                </div>
              </div>
  
              <h3 className="font-semibold">Payment Schedule</h3>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Remaining</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payoffPlan.schedule.map((payment) => (
                      <TableRow key={payment.date}>
                        <TableCell>
                          {format(new Date(payment.date), "MMM yyyy")}
                        </TableCell>
                        <TableCell>${payment.payment.toFixed(2)}</TableCell>
                        <TableCell>${payment.principal.toFixed(2)}</TableCell>
                        <TableCell>${payment.interest.toFixed(2)}</TableCell>
                        <TableCell>
                          ${payment.remainingBalance.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <p>No payoff plan available</p>
          )}
        </DialogContent>
      </Dialog>
    );
  }