import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/app/lib/api";
import { Budget, BudgetAlert, BudgetForecast, BudgetProgress } from "@/@types/types";
import { toast } from "react-toastify";

export const useBudgets = (params: {
  period?: "weekly" | "monthly" | "yearly";
  active?: boolean;
}) => {
  return useQuery({
    queryKey: ["budgets", params],
    queryFn: async () => {
      const { data } = await api.get<Budget[]>("/api/budgets", { params });
      return data;
    },
  });
};

export const useBudgetProgress = (id: string) => {
  return useQuery({
    queryKey: ["budget-progress", id],
    queryFn: async () => {
      const { data } = await api.get<BudgetProgress>(`/api/budgets/${id}/progress`);
      return data;
    },
  });
};

export const useBudgetForecast = (params: { period: "month" | "year" }) => {
  return useQuery({
    queryKey: ["budget-forecast", params],
    queryFn: async () => {
      const { data } = await api.get<BudgetForecast[]>("/api/budgets/forecast", {
        params,
      });
      return data;
    },
  });
};

export const useBudgetAlerts = () => {
  return useQuery({
    queryKey: ["budget-alerts"],
    queryFn: async () => {
      const { data } = await api.get<BudgetAlert[]>("/api/budgets/alerts");
      return data;
    },
  });
};

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budget: Omit<Budget, "id" | "createdAt" | "updatedAt">) => {
      const { data } = await api.post<Budget>("/api/budgets", budget);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget created successfully");
    },
    onError: () => {
      toast.error("Failed to create budget");
    },
  });
};

export const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/budgets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete budget");
    },
  });
};

export const useProcessRollovers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/api/budgets/process-rollovers");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success("Budget rollovers have been processed successfully");
    },
    onError: () => {
      toast.error("Failed to process rollovers");
    },
  });
};


export const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (budget: Budget) => {
      const { data } = await api.put<Budget>(`/api/budgets/${budget.id}`, budget);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      toast.success( "Your budget has been updated successfully");
    },
    onError: () => {
      toast.error("Failed to update budget");
    },
  });
};