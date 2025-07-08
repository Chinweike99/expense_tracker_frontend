// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useAccountStore } from "@/app/stores/account.stores";
// import { useCurrencyStore } from "@/app/stores/currency.store";

// interface Account {
//   id?: string;
//   name: string;
//   type: "cash" | "investment" | "loan" | "other" | "credit card";
//   balance: number;
//   currency: string;
// }

// const accountSchema = z.object({
//   name: z.string().min(2),
//   type: z.enum(["cash", "investment", "loan", "other", "credit card"]),
//   balance: z.number().min(0),
//   currency: z.string().min(3, "Add a currency").max(3),
// });

// export function AccountForm({
//   initialValues,
//   onSuccess,
// }: {
//   initialValues?: Partial<Account>;
//   onSuccess?: () => void;
// }) {
//   const { createAccount, updateAccount, isLoading } = useAccountStore();
//   const { currencies } = useCurrencyStore();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(accountSchema),
//     defaultValues: {
//       name: initialValues?.name || "",
//       type: initialValues?.type || "cash",
//       balance: initialValues?.balance || 0,
//       currency: initialValues?.currency || "",
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof accountSchema>) => {
//     try {
//       if (initialValues?.id) {
//         await updateAccount(initialValues.id, values);
//       } else {
//         await createAccount(values);
//       }
//       onSuccess?.();
//     } catch (error) {
//       console.error("Account operation failed:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//           Account Name
//         </label>
//         <input
//           id="name"
//           type="text"
//           placeholder="Account name"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           {...register("name")}
//         />
//         {errors.name && (
//           <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
//           Account Type
//         </label>
//         <select
//           id="type"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           {...register("type")}
//         >
//           <option value="cash">Cash</option>
//           <option value="investment">Investment</option>
//           <option value="loan">Loan</option>
//           <option value="other">Other</option>
//           <option value="credit card">Credit Card</option>
//         </select>
//         {errors.type && (
//           <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="balance" className="block text-sm font-medium text-gray-700 mb-1">
//           Initial Balance
//         </label>
//         <input
//           id="balance"
//           type="number"
//           step="0.01"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           {...register("balance", { valueAsNumber: true })}
//         />
//         {errors.balance && (
//           <p className="mt-1 text-sm text-red-600">{errors.balance.message}</p>
//         )}
//       </div>

//       <div>
//         <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
//           Currency
//         </label>
//         <select
//           id="currency"
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           {...register("currency")}
//         >
//           <option value="">Select Currency</option>
//           {currencies.map((currency) => (
//             <option key={currency.code} value={currency.code}>
//               {currency.code} - {currency.name}
//             </option>
//           ))}
//         </select>
//         {errors.currency && (
//           <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? "Processing..." : "Save Account"}
//       </button>
//     </form>
//   );
// }

"use client";
import { useEffect } from "react"; // Add this import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAccountStore } from "@/app/stores/account.stores";
import { useCurrencyStore } from "@/app/stores/currency.store";

interface Account {
  id?: string;
  name: string;
  type: "cash" | "investment" | "loan" | "other" | "credit card";
  balance: number;
  currency: string;
}

const accountSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["cash", "investment", "loan", "other", "credit card"]),
  balance: z.number().min(0),
  currency: z.string().min(3, "Add a currency").max(3),
});

export function AccountForm({
  initialValues,
  onSuccess,
}: {
  initialValues?: Partial<Account>;
  onSuccess?: () => void;
}) {
  const { createAccount, updateAccount, isLoading } = useAccountStore();
  const { currencies, fetchCurrencies } = useCurrencyStore(); // Add fetchCurrencies

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: initialValues?.name || "",
      type: initialValues?.type || "cash",
      balance: initialValues?.balance || 0,
      currency: initialValues?.currency || "",
    },
  });

  // Add this useEffect to fetch currencies when component mounts
  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

  const onSubmit = async (values: z.infer<typeof accountSchema>) => {
    try {
      if (initialValues?.id) {
        await updateAccount(initialValues.id, values);
      } else {
        await createAccount(values);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Account operation failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Account Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Account name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Account Type
        </label>
        <select
          id="type"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("type")}
        >
          <option value="cash">Cash</option>
          <option value="investment">Investment</option>
          <option value="loan">Loan</option>
          <option value="other">Other</option>
          <option value="credit card">Credit Card</option>
        </select>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="balance"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Initial Balance
        </label>
        <input
          id="balance"
          type="number"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("balance", { valueAsNumber: true })}
        />
        {errors.balance && (
          <p className="mt-1 text-sm text-red-600">{errors.balance.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="currency"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Currency
        </label>
        <select
          id="currency"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          {...register("currency")}
        >
          <option value="">Select Currency</option>
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
        {errors.currency && (
          <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Save Account"}
      </button>
    </form>
  );
}
