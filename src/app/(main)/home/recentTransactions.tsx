import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Transaction } from "@/@types/transaction";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Transaction } from "@/@types/types";

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

export function RecentTransactions({
  transactions,
  className,
}: RecentTransactionsProps) {
  return (
    <Card className={cn("p-6", className)}>
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{transaction.type}</Badge>
                    {transaction.description}
                  </div>
                </TableCell>
                <TableCell
                  className={
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  {format(new Date(transaction.date), "MMM dd")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}