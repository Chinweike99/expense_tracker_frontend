"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useTransactionStore } from "@/app/stores/transaction.stores";
import { useAccountStore } from "@/app/stores/account.stores";

const transferSchema = z.object({
  fromAccount: z.string().min(1),
  toAccount: z.string().min(1),
  amount: z.number().positive(),
  fee: z.number().min(0).optional(),
  feeAccount: z.string().optional(),
  description: z.string().optional(),
});

type TransferFormData = z.infer<typeof transferSchema>;

export function TransferForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { createTransfer, isLoading } = useTransactionStore();
  const { accounts } = useAccountStore();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccount: "",
      toAccount: "",
      amount: 0,
      fee: 0,
      feeAccount: "",
      description: "",
    },
  });

  const fromAccount = watch("fromAccount");
  const feeAmount = watch("fee");
  const showFeeAccount = feeAmount && feeAmount > 0;

  const onSubmit = async (values: TransferFormData) => {
    try {
      await createTransfer(values);
      onSuccess?.();
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description (Optional)
        </label>
        <Input
          id="description"
          placeholder="Transfer description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium mb-2">
          Amount
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fromAccount" className="block text-sm font-medium mb-2">
            From Account
          </label>
          <Select {...register("fromAccount")}>
            <option value="">Select Account</option>
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.name} ({account.currency})
              </option>
            ))}
          </Select>
          {errors.fromAccount && (
            <p className="text-red-500 text-sm mt-1">{errors.fromAccount.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="toAccount" className="block text-sm font-medium mb-2">
            To Account
          </label>
          <Select {...register("toAccount")}>
            <option value="">Select Account</option>
            {accounts
              .filter((account) => account._id !== fromAccount)
              .map((account) => (
                <option key={account._id} value={account._id}>
                  {account.name} ({account.currency})
                </option>
              ))}
          </Select>
          {errors.toAccount && (
            <p className="text-red-500 text-sm mt-1">{errors.toAccount.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="fee" className="block text-sm font-medium mb-2">
          Fee (Optional)
        </label>
        <Input
          id="fee"
          type="number"
          step="0.01"
          {...register("fee", { valueAsNumber: true })}
        />
        {errors.fee && (
          <p className="text-red-500 text-sm mt-1">{errors.fee.message}</p>
        )}
      </div>

      {showFeeAccount && (
        <div>
          <label htmlFor="feeAccount" className="block text-sm font-medium mb-2">
            Fee Account
          </label>
          <Select {...register("feeAccount")}>
            <option value="">Same as From Account</option>
            {accounts
              .filter((account) => account._id !== fromAccount)
              .map((account) => (
                <option key={account._id} value={account._id}>
                  {account.name} ({account.currency})
                </option>
              ))}
          </Select>
          {errors.feeAccount && (
            <p className="text-red-500 text-sm mt-1">{errors.feeAccount.message}</p>
          )}
        </div>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : "Complete Transfer"}
      </Button>
    </form>
  );
}