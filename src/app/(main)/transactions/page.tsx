"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
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

  const { accounts, fetchAccounts } = useAccountStore();
  const { categories, fetchCategories } = useCategoryStore();

  const [filter] = useState({
    type: "",
    account: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchTransactions(filter);
    fetchRecurringTransactions();

    fetchAccounts();
    fetchCategories();
  }, [
    filter,
    fetchTransactions,
    fetchRecurringTransactions,
    fetchAccounts,
    fetchCategories,
  ]);

  const getAccountName = (account: any) => {
    if (account && typeof account === "object" && account.name) {
      return account.name;
    }
    if (typeof account === "string") {
      const foundAccount = accounts.find((a) => a._id === account);
      return foundAccount ? foundAccount.name : "Unknown Account";
    }
    return "Unknown Account";
  };

  const getCategoryName = (categoryId: string) => {
    if (!categoryId) return "No Category";
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.name : "Unknown Category";
  };

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
              <TableHeader className="bg-[#f0f1f1]">
                <TableRow>
                  <TableHead className="border-r">Date</TableHead>
                  <TableHead className="border-r">Description</TableHead>
                  <TableHead className="border-r">Amount</TableHead>
                  <TableHead className="border-r">Account</TableHead>
                  <TableHead className="border-r">Type</TableHead>
                  <TableHead className="border-r">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                  return (
                    <TableRow key={transaction._id}>
                      <TableCell className="border-r">
                        {format(new Date(transaction.date), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell className="border-r">
                        {transaction.description}
                      </TableCell>
                      <TableCell
                        className={`border-r
            ${
              transaction.type === "income" ? "text-green-500" : "text-red-500"
            }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {transaction.amount.toLocaleString(undefined, {
                          style: "currency",
                          currency: "USD",
                        })}
                      </TableCell>
                      <TableCell className="border-r">
                        {transaction.account.name || "Unknown Account"}
                      </TableCell>
                      <TableCell className="border-r">
                        <Badge
                          variant={
                            transaction.type === "income"
                              ? "default"
                              : "destructive"
                          }
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
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="recurring">
          <div className="border rounded-lg mt-4">
            <Table>
              <TableHeader className="bg-[#f0f1f1]">
                <TableRow>
                  <TableHead className="border-r">Description</TableHead>
                  <TableHead className="border-r">Amount</TableHead>
                  <TableHead className="border-r">Frequency</TableHead>
                  <TableHead className="border-r">Next Occurrence</TableHead>
                  <TableHead className="border-r">Account</TableHead>
                  <TableHead className="border-r">Category</TableHead>
                  <TableHead className="border-r">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recurringTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="border-r">
                      {transaction.description}
                    </TableCell>
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
                    <TableCell className="border-r">
                      {transaction.nextRecurringDate
                        ? format(
                            new Date(transaction.nextRecurringDate),
                            "MMM dd, yyyy"
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell className="border-r">
                      {getAccountName(transaction.account)}
                    </TableCell>
                    <TableCell className="border-r">
                      {getCategoryName(transaction.category)}
                    </TableCell>
                    <TableCell className="border-r">
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
