"use client";
import { useState, useEffect } from "react";
// import { useTransactionStore } from "@/app/stores/transaction.store";
// import { useAccountStore } from "@/stores/account.store";
// import { useCategoryStore } from "@/stores/category.store";
import { Button } from "@/components/ui/button";
// import { TransactionForm } from "@/components/transactions/TransactionForm";
// import { TransferForm } from "@/components/transactions/TransferForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useTransactionStore } from "@/app/stores/transaction.stores";
import { useCategoryStore } from "@/app/stores/category.store";
import { useAccountStore } from "@/app/stores/account.stores";
import { TransactionForm } from "@/app/components/transactions/TransactionForm";
import { TransferForm } from "@/app/components/transactions/TransferForm";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function TransactionsPage() {
  const {
    transactions,
    recurringTransactions,
    fetchTransactions,
    fetchRecurringTransactions,
    deleteTransaction,
    deleteRecurringTransaction,
  } = useTransactionStore();
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();

  const [filter, ] = useState({
    type: "",
    account: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTransactions(filter);
    fetchRecurringTransactions();
  }, [filter, fetchTransactions, fetchRecurringTransactions]);

  const getAccountName = (id: string) => 
    accounts.find((a) => a._id === id)?.name || id;
  
  const getCategoryName = (id: string) => 
    categories.find((c) => c._id === id)?.name || id;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Transaction</Button>
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent>
              <TransactionForm onSuccess={() => fetchTransactions(filter)} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Transfer</Button>
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent>
              <TransferForm onSuccess={() => fetchTransactions(filter)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="recurring">Recurring</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <div className="border rounded-lg mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction._id}>
                    <TableCell>
                      {format(new Date(transaction.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell
                      className={
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell>{getAccountName(transaction.accountId)}</TableCell>
                    <TableCell>{getCategoryName(transaction.categoryId)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={transaction.type === "income" ? "default" : "destructive"}
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost">Edit</Button>
                      <Button
                        variant="ghost"
                        onClick={() => deleteTransaction(transaction._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="recurring">
          <div className="border rounded-lg mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Occurrence</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recurringTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell
                      className={
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount.toLocaleString(undefined, {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell className="capitalize">
                      {transaction.frequency}
                    </TableCell>
                    <TableCell>
                      {transaction.nextRecurringDate
                        ? format(
                            new Date(transaction.nextRecurringDate),
                            "MMM dd, yyyy"
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell>{getAccountName(transaction.account)}</TableCell>
                    <TableCell>{getCategoryName(transaction.category)}</TableCell>
                    <TableCell>
                      <Button variant="ghost">Edit</Button>
                      <Button
                        variant="ghost"
                        onClick={() =>
                          deleteRecurringTransaction(transaction.id)
                        }
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}