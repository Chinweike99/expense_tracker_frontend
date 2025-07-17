"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCurrencyStore } from "@/app/stores/currency.store";

const currencySchema = z.object({
  code: z.string().length(3, "Code must be 3 letters"),
  name: z.string().min(1, "Name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  isPrimary: z.boolean().optional(),
});

type CurrencyFormValues = z.infer<typeof currencySchema>;

export default function CurrencyForm({
  initialValues,
  onSuccess,
}: {
  initialValues?: Partial<CurrencyFormValues>;
  onSuccess?: () => void;
}) {
  const { addCurrency, isLoading } = useCurrencyStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencyFormValues>({
    resolver: zodResolver(currencySchema),
    defaultValues: {
      code: initialValues?.code || "",
      name: initialValues?.name || "",
      symbol: initialValues?.symbol || "",
      isPrimary: initialValues?.isPrimary || false,
    },
  });

  const onSubmit = async (values: CurrencyFormValues) => {
    try {
      await addCurrency(values);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to add currency:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Currency Code */}
      <div className="flex flex-col gap-1">
        <label htmlFor="code" className="text-sm font-medium">
          Currency Code
        </label>
        <input
          id="code"
          type="text"
          placeholder="USD"
          className="border rounded-md p-2"
          {...register("code")}
        />
        {errors.code && (
          <p className="text-xs text-red-500">{errors.code.message}</p>
        )}
      </div>

      {/* Currency Name */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Currency Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="US Dollar"
          className="border rounded-md p-2"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Symbol */}
      <div className="flex flex-col gap-1">
        <label htmlFor="symbol" className="text-sm font-medium">
          Symbol
        </label>
        <input
          id="symbol"
          type="text"
          placeholder="$"
          className="border rounded-md p-2"
          {...register("symbol")}
        />
        {errors.symbol && (
          <p className="text-xs text-red-500">{errors.symbol.message}</p>
        )}
      </div>

      {/* Primary */}
      <div className="flex items-center gap-2">
        <input
          id="isPrimary"
          type="checkbox"
          {...register("isPrimary")}
          className="h-4 w-4"
        />
        <label htmlFor="isPrimary" className="text-sm">
          Set as primary currency
        </label>
      </div>

      <button
        type="submit"
        // disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Add Currency"}
      </button>
    </form>
  );
}
