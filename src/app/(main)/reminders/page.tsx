"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Debt, Reminder } from "@/@types/types";
import { useCreateDebt, useCreateReminder, useDebts, useReminders, useUpdateDebts, useUpdateReminder } from "@/app/stores/reminders.store";
import { ReminderCard } from "@/app/components/reminders/ReminderCard";
import { DebtCard } from "@/app/components/reminders/DebtCard";
import { ReminderForm } from "@/app/components/reminders/ReminderForm";
import { DebtForm } from "@/app/components/reminders/DebtForm";
import { PaymentDialog } from "@/app/components/reminders/PaymentDialog";
import { PayoffPlanDialog } from "@/app/components/reminders/PayoffPlanDialog";


export default function RemindersPage() {
  const [activeTab, setActiveTab] = useState("reminders");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Reminder | Debt | null>(null);
  const [paymentDialogDebt, setPaymentDialogDebt] = useState<Debt | null>(null);
  const [payoffPlanDebt, setPayoffPlanDebt] = useState<Debt | null>(null);

  const { data: reminders, isLoading: remindersLoading } = useReminders({
    upcoming: true,
  });
  const { data: debts, isLoading: debtsLoading } = useDebts();
  const createReminder = useCreateReminder();
  const updateReminder = useUpdateReminder();
  const createDebt = useCreateDebt();
  const updateDebt = useUpdateDebts();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitReminder = (values: any) => {
    if (editingItem && "type" in editingItem) {
      updateReminder.mutate(
        { ...editingItem, ...values },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingItem(null);
          },
        }
      );
    } else {
      createReminder.mutate(values, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    }
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmitDebt = (values: any) => {
    if (editingItem && "initialAmount" in editingItem) {
      updateDebt.mutate(
        { ...editingItem, ...values },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingItem(null);
          },
        }
      );
    } else {
      createDebt.mutate(values, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Reminders & Alerts</h1>
          <div className="flex gap-2">
            <TabsList>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="debts">Debts</TabsTrigger>
            </TabsList>
            <Button
              onClick={() => {
                setEditingItem(null);
                setIsDialogOpen(true);
              }}
              className="bg-white text-gray-500 border border-[#f6dfcb] hover:bg-white cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {activeTab === "reminders" ? "Reminder" : "Debt"}
            </Button>
          </div>
        </div>

        <TabsContent value="reminders">
          {remindersLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[150px] w-full" />
              ))}
            </div>
          ) : reminders && reminders.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {reminders.map((reminder: any) => (
                <ReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onEdit={(r) => {
                    setEditingItem(r);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                You don&apos;t have any reminders yet. Create one to get started.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="debts">
          {debtsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[150px] w-full" />
              ))}
            </div>
          ) : debts && debts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {debts.map((debt) => (
                <DebtCard
                  key={debt._id}
                  debt={debt}
                  onEdit={(d) => {
                    setEditingItem(d);
                    setIsDialogOpen(true);
                  }}
                  onRecordPayment={(d) => setPaymentDialogDebt(d)}
                  onViewPlan={(d) => setPayoffPlanDebt(d)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                You don&apos;t have any debts tracked yet. Add one to get started.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? `Edit ${activeTab === "reminders" ? "Reminder" : "Debt"}`
                : `Create New ${activeTab === "reminders" ? "Reminder" : "Debt"}`}
            </DialogTitle>
          </DialogHeader>
          {activeTab === "reminders" ? (
            <ReminderForm
              initialData={
                editingItem && "type" in editingItem ? editingItem : undefined
              }
              onSubmit={handleSubmitReminder}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingItem(null);
              }}
              isLoading={createReminder.isPending || updateReminder.isPending}
            />
          ) : (
            <DebtForm
              initialData={
                editingItem && "initialAmount" in editingItem
                  ? editingItem
                  : undefined
              }
              onSubmit={handleSubmitDebt}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingItem(null);
              }}
              isLoading={createDebt.isPending || updateDebt.isPending}
            />
          )}
        </DialogContent>
      </Dialog>

      <PaymentDialog
        debt={paymentDialogDebt}
        onClose={() => setPaymentDialogDebt(null)}
      />

      <PayoffPlanDialog
        debt={payoffPlanDebt}
        onClose={() => setPayoffPlanDebt(null)}
      />
    </div>
  );
}