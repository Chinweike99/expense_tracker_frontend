import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import api from "../lib/api"
import { Debt, DebtPayment, PayoffPlan, Reminder } from "@/@types/types"
import { toast } from "react-toastify"

export const useReminders = (p0: { upcoming: boolean; }) => {
  return useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data } = await api.get('/api/reminders');
      console.log('Fetched reminders:', data);
      const reminders = data?.reminders || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return reminders.map((reminder: any) => ({
        ...reminder,
        id: reminder._id || reminder.id,
      }));
    },
    staleTime: 0,
  });
  console.log(p0)
};



export const useCreateReminder = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (reminder: Omit<Reminder, "id" | "createdAt" | "updatedAt">) => {
            const { data } = await api.post<Reminder>("/api/reminders", reminder);
            return data;
        },
        onSuccess: (data) => {
            console.log('Created reminder:', data);
            
            // Invalidate and refetch reminders
            queryClient.invalidateQueries({ queryKey: ['reminders'] });
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            queryClient.setQueryData(['reminders'], (oldData: any) => {
                if (oldData && Array.isArray(oldData)) {
                    const newReminder = {
                        ...data,
                        id: data._id
                    };
                    return [...oldData, newReminder];
                }
                return oldData;
            });
            
            toast.success("Reminder has been created successfully");
        },
        onError: (error) => {
            console.error('Failed to create reminder:', error);
            toast.error("Failed to create reminder");
        }
    })
}

export const useUpdateReminder = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
        mutationFn: async (reminder: Reminder) => {
            const { data } = await api.put<Reminder>(`/api/reminders/${reminder._id}`, reminder);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reminders"] });
            toast.success("Your reminder has been updated successfully");
        },
        onError: (error) => {
            console.error('Failed to update reminder:', error);
            toast.error("Failed to update reminder");
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
            toast.success("Your reminder has been deleted successfully");
        },
        onError: (error) => {
            console.error('Failed to delete reminder:', error);
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
            toast.success("Your debt has been created successfully");
        },
        onError: (error) => {
            console.error('Failed to create debt:', error);
            toast.error("Failed to create debt");
        },
    });
};

// Fixed the missing slash in the URL
export const useDebtPayoffPlan = (id: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["debt-payoff-plan", id],
        queryFn: async () => {
            const { data } = await api.get<PayoffPlan>(`/api/debts/${id}/payoff-plan`);
            return data;
        },
        enabled: enabled && !!id, // Only run if enabled and id exists
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
            toast.success("Your debt payment has been recorded successfully");
        },
        onError: (error) => {
            console.error('Failed to record payment:', error);
            toast.error("Failed to record payment");
        },
    });
};

export const useUpdateDebts = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (debt: Debt) => {
            const { data } = await api.put<Debt>(`/api/debts/${debt._id || debt._id}`, debt);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["debts"] });
            toast.success("Debt has been updated successfully");
        },
        onError: (error) => {
            console.error('Failed to update debt:', error);
            toast.error("Failed to update debt");
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
            toast.success("Debt has been deleted successfully");
        },
        onError: (error) => {
            console.error('Failed to delete debt:', error);
            toast.error("Failed to delete debt");
        },
    });
};