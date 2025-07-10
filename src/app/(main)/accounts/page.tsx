"use client";
import { useEffect } from "react";
// import { useAccountStore } from "@/stores/account.store";
import { Button } from "@/components/ui/button";
// import { AccountForm } from "@/components/accounts/AccountForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAccountStore } from "@/app/stores/account.stores";
import { AccountForm } from "@/app/components/accounts/AccountForm";

export default function AccountsPage() {
  const { accounts, fetchAccounts, deleteAccount } = useAccountStore();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Account</Button>
          </DialogTrigger>
          <DialogContent>
          <DialogTitle>Add New Account</DialogTitle>
            <AccountForm onSuccess={() => fetchAccounts()} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account._id}>
                <TableCell>{account.name}</TableCell>
                <TableCell className="capitalize">
                  {account.type.replace("-", " ")}
                </TableCell>
                <TableCell>
                  {account.balance.toLocaleString(undefined, {
                    style: "currency",
                    currency: account.currency,
                  })}
                </TableCell>
                <TableCell>{account.currency}</TableCell>
                <TableCell>
                  <Button variant="ghost">Edit</Button>
                  <Button
                    variant="ghost"
                    onClick={() => deleteAccount(account._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}