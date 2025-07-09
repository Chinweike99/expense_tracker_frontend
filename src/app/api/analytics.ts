import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

export interface DashboardStatsResponse {
    totalIncome: number;
    totalExpenses: number;
    netSavings: number;
    budgetUsage: number;
    spendingTrends: {
      date: string;
      income: number;
      expenses: number;
    }[];
  }
  
  export const useDashboardStats = (params: {
    startDate?: string;
    endDate?: string;
    accounts?: string[];
    categories?: string[];
  }) => {
    return useQuery({
      queryKey: ["dashboard-stats", params],
      queryFn: async () => {
        const { data } = await api.get<DashboardStatsResponse>("/api/dashboard", {
          params,
        });
        return data;
      },
    });
  };