"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
            <Button className="bg-white text-gray-500 border border-[#f6dfcb] hover:bg-white cursor-pointer">Add Account</Button>
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
              <TableHead className="border-r text-center text-gray-500 font-semibold">Name</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Type</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Balance</TableHead>
              <TableHead className="border-r text-center text-gray-500 font-semibold">Currency</TableHead>
              <TableHead className=" text-center text-gray-500 font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account._id}>
                <TableCell className="border-r text-center text-gray-500 font-semibold">{account.name}</TableCell>
                <TableCell className="capitalize border-r text-center text-gray-500 font-semibold">
                  {account.type.replace("-", " ")}
                </TableCell>
                <TableCell className="border-r text-center text-gray-500 font-semibold">
                  {account.balance.toLocaleString(undefined, {
                    style: "currency",
                    currency: account.currency,
                  })}
                </TableCell>
                <TableCell className="border-r text-center text-gray-500 font-semibold">{account.currency}</TableCell>
                <TableCell className="border-r text-center text-gray-500 font-semibold">
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