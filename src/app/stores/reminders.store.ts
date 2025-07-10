import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"
import { Debt, DebtPayment, PayoffPlan, Reminder } from "@/@types/types"
import { toast } from "react-toastify"




export const useReminders = (params: {
    type?: 'bill' | "payments" | "custom",
    upcoming?: boolean
}) => {
    return useQuery({
        queryKey: ['reminders', params],
        queryFn: async()=> {
            const {data} = await api.get('/api/reminders', {params});
            return data;
        }
    })
}


export const useCreateReminder = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async(reminder: Omit<Reminder, "id" | "createdAt" | "updatedAt">) => {
            const {data} = await api.post<Reminder>("/api/reminders", reminder);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['reminders']});
            toast.success("reminder has been created successfully")
        },
        onError: () => {
            toast.error("Failed to create reminder")
        }
    })
}


export const useUpdateReminder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (reminder: Reminder) => {
        const { data } = await api.put<Reminder>(`/api/reminders/${reminder.id}`, reminder);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reminders"] });
        toast.success("Your reminder has been updated successfully")
      },
      onError: () => {
        toast.error("Failed to update reminder")
      },
    });
  };


  export const useDeleteReminder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (id: string) => {
        await api.delete(`/api/reminders/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reminders"] });
        toast.success("Your reminder has been deleted successfully")
      },
      onError: () => {
        toast.error("Failed to delete reminder");
      },
    });
  };
  

  // Debts
export const useDebts = () => {
    return useQuery({
      queryKey: ["debts"],
      queryFn: async () => {
        const { data } = await api.get<Debt[]>("/api/debts");
        return data;
      },
    });
  };
  
  export const useCreateDebt = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (debt: Omit<Debt, "id" | "createdAt" | "updatedAt" | "isPaid">) => {
        const { data } = await api.post<Debt>("/api/debts", debt);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["debts"] });
        toast.success("Your debt has been created successfully")
      },
      onError: () => {
        toast.error("Failed to create debt")
      },
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export const useDebtPayoffPlan = (id: string, p0: boolean) => {
    return useQuery({
      queryKey: ["debt-payoff-plan", id],
      queryFn: async () => {
        const { data } = await api.get<PayoffPlan>(`/api/debts/${id}/payoff-plan`);
        return data;
      },
    });
  };
  
  export const useRecordDebtPayment = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ debtId, payment }: { debtId: string; payment: Omit<DebtPayment, "id" | "createdAt"> }) => {
        const { data } = await api.post<DebtPayment>(`/api/debts/${debtId}/payment`, payment);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["debts"] });
        queryClient.invalidateQueries({ queryKey: ["debt-payoff-plan"] });
        toast.success("Your debt payment has been recorded successfully")
      },
      onError: () => {
        toast.error("Failed to record payment")
      },
    });
  };

  export const useUpdateDebts = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (reminder: Debt) => {
        const { data } = await api.put<Debt>(`/api/debts/${reminder.id}`, reminder);
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["debts"] });
        toast.success("Debt has been updated successfully")
      },
      onError: () => {
        toast.error("Failed to update debt")
      },
    });
  };

  export const useDeleteDebts = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (id: string) => {
        await api.delete(`/api/debts/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["debts"] });
        toast.success("Debt has been deleted successfully")
      },
      onError: () => {
        toast.error("Failed to delete debt");
      },
    });
  };


