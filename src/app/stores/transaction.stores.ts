import { RecurringTransaction, Transaction } from "@/@types/types";
import { create } from "zustand";
import api from "../lib/api";


interface TransactionState {
    transactions: Transaction[];
    recurringTransactions: RecurringTransaction[]
    isLoading: boolean;
    error: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchTransactions: (params?: Record<string, any>) => Promise<void>;
    fetchRecurringTransactions: () => Promise<void>;
    getTransaction: (id: string) => Promise<Transaction>;
    createTransaction: (transaction: {
      transaction: {
        type: "income" | "expense";
        amount: number;
        description: string;
        date: Date;
        category: string;
        account: string;
        tags?: string[] | undefined;
        notes?: string | undefined;
        isRecurring?: boolean | undefined;
        frequency?: "daily" | "weekly" | "monthly" | "yearly";
      };
    }) => Promise<void>;
    updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
    deleteTransaction: (id: string) => Promise<void>;
    createRecurringTransaction: (
        transaction: Omit<RecurringTransaction, "id">
      ) => Promise<void>;
    updateRecurringTransaction: (
        id: string,
        updates: Partial<RecurringTransaction>
    ) => Promise<void>
    deleteRecurringTransaction: (id: string) => Promise<void>;
    createTransfer: (transferData: {
        fromAccount: string;
        toAccount: string;
        amount: number;
        fee?: number;
        feeAccount?: string;
        date?: string;
        description?: string;
      }) => Promise<void>;
}


export const useTransactionStore = create<TransactionState>((set) => ({
    transactions: [],
    recurringTransactions: [],
    isLoading: false,
    error: null,
    fetchTransactions: async (params = {}) => {
        set({ isLoading: true });
        try {
            const { data } = await api.get("/api/transactions", { params });
            set({transactions: data})
        } catch {
            set({error: "Failed to fetch transactions"})
        }finally{
            set({isLoading: false})
        }
    },
    fetchRecurringTransactions: async() => {
        set({ isLoading: true });
    try {
      const { data } = await api.get("/api/transactions/recurring");
      set({ recurringTransactions: data });
    } catch {
      set({ error: "Failed to fetch recurring transactions" });
    } finally {
      set({ isLoading: false });
    }
    },
    getTransaction: async(id) => {
        set({ isLoading: true });
        try {
          const { data } = await api.get(`/api/transactions/${id}`);
          return data;
        } finally {
          set({ isLoading: false });
        }
    },
    createTransaction: async(transaction) => {
        set({isLoading: true});
        try {
            const { data } = await api.post("/api/transactions", transaction);
            set((state) => ({transactions: [data, ...state.transactions]}))
        } finally{
            set({isLoading: false})
        }
    },
    updateTransaction: async(id, updates) => {
        set({isLoading: true});
        try{
            const {data} = await api.patch(`/api/transactions/${id}`, updates);
            set((state) => ({
                transactions: state.transactions.map((t) => (t._id === id ? data : t))
            }))
        }finally{
            set({isLoading: false})
        }
    },
    deleteTransaction: async (id) => {
        set({ isLoading: true });
        try {
          await api.delete(`/transactions/${id}`);
          set((state) => ({
            transactions: state.transactions.filter((t) => t._id !== id),
          }));
        } finally {
          set({ isLoading: false });
        }
      },
      createRecurringTransaction: async (transaction) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/transactions/recurring", transaction);
          set((state) => ({
            recurringTransactions: [...state.recurringTransactions, data],
          }));
        } finally {
          set({ isLoading: false });
        }
      },
      updateRecurringTransaction: async (id, updates) => {
        set({ isLoading: true });
        try {
          const { data } = await api.patch(`/transactions/recurring/${id}`, updates);
          set((state) => ({
            recurringTransactions: state.recurringTransactions.map((t) =>
              t.id === id ? data : t
            ),
          }));
        } finally {
          set({ isLoading: false });
        }
      },
      deleteRecurringTransaction: async (id) => {
        set({ isLoading: true });
        try {
          await api.delete(`/transactions/recurring/${id}`);
          set((state) => ({
            recurringTransactions: state.recurringTransactions.filter(
              (t) => t.id !== id
            ),
          }));
        } finally {
          set({ isLoading: false });
        }
      },
      createTransfer: async (transferData) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post("/transactions/transfer", transferData);
          set((state) => ({
            transactions: [data.withdrawal, data.deposit, ...state.transactions],
          }));
        } finally {
          set({ isLoading: false });
        }
      },
    }));