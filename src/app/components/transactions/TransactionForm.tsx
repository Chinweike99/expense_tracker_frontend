"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTransactionStore } from "@/app/stores/transaction.stores";
import { useAccountStore } from "@/app/stores/account.stores";
import { useCategoryStore } from "@/app/stores/category.store";

const transactionSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  date: z.date(),
  type: z.enum(["expense", "income"]),
  category: z.string(),
  account: z.string(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  isRecurring: z.boolean().optional(),
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"]).optional(),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export function TransactionForm({
  initialValues,
  onSuccess,
}: {
  initialValues?: Partial<TransactionFormData>;
  onSuccess?: () => void;
}) {
  const { createTransaction, isLoading } = useTransactionStore();
  const { accounts } = useAccountStore();
  const { categories } = useCategoryStore();
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: initialValues?.amount || 0,
      description: initialValues?.description || "",
      date: initialValues?.date || new Date(),
      type: initialValues?.type || "expense",
      category: initialValues?.category || "",
      account: initialValues?.account || "",
      tags: initialValues?.tags || [],
      notes: initialValues?.notes || "",
      isRecurring: initialValues?.isRecurring || false,
      frequency: initialValues?.frequency || "monthly",
    },
  });

  const transactionType = watch("type");
  const isRecurring = watch("isRecurring");

  const filteredCategories = categories.filter(
    (c) => c.type === transactionType
  );

  const onSubmit = async (values: TransactionFormData) => {
    try {
      await createTransaction({transaction: values});
      onSuccess?.();
    } catch (error) {
      console.error("Transaction creation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              step="0.01"
              {...field}
              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            />
          )}
        />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="account">Account</Label>
          <Controller
            name="account"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account._id} value={account._id}>
                      {account.name} ({account.currency})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.account && (
            <p className="text-sm text-red-500">{errors.account.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-sm text-red-500">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Controller
          name="isRecurring"
          control={control}
          render={({ field }) => (
            <Switch
              id="recurring"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="recurring">Recurring Transaction</Label>
      </div>

      {isRecurring && (
        <div className="space-y-2">
          <Label htmlFor="frequency">Frequency</Label>
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.frequency && (
            <p className="text-sm text-red-500">{errors.frequency.message}</p>
          )}
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Save Transaction"}
      </Button>
    </form>
  );
}