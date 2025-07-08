import { create } from "zustand";
// import api from "@/lib/api";
import api from "../lib/api";

interface AnalyticsState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dashboardStats: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spendingTrends: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoryComparison: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  expenseHeatmap: any[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardStats: (params?: {
    startDate?: string;
    endDate?: string;
    accounts?: string[];
    categories?: string[];
    type?: string;
  }) => Promise<void>;
  fetchSpendingTrends: (params?: {
    period?: "day" | "week" | "month" | "year";
    startDate?: string;
    endDate?: string;
    accounts?: string[];
    categories?: string[];
  }) => Promise<void>;
  fetchCategoryComparison: (params?: {
    compareWith?: "previousPeriod" | "samePeriodLastYear";
    startDate?: string;
    endDate?: string;
    accounts?: string[];
  }) => Promise<void>;
  fetchExpenseHeatmap: (params?: {
    startDate?: string;
    endDate?: string;
    accounts?: string[];
    categories?: string[];
  }) => Promise<void>;
  exportTransactions: (params: {
    format: "csv" | "json";
    startDate?: string;
    endDate?: string;
    accounts?: string[];
    categories?: string[];
    type?: string;
  }) => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  dashboardStats: null,
  spendingTrends: [],
  categoryComparison: [],
  expenseHeatmap: [],
  isLoading: false,
  error: null,
  fetchDashboardStats: async (params = {}) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/api/dashboard", { params });
      set({ dashboardStats: data });
    } catch {
      set({ error: "Failed to fetch dashboard stats" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchSpendingTrends: async (params = {}) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/api/analytics/trends", { params });
      set({ spendingTrends: data });
    } catch {
      set({ error: "Failed to fetch spending trends" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchCategoryComparison: async (params = {}) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/api/analytics/category-comparison", {
        params,
      });
      set({ categoryComparison: data });
    } catch {
      set({ error: "Failed to fetch category comparison" });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchExpenseHeatmap: async (params = {}) => {
    set({ isLoading: true });
    try {
      const { data } = await api.get("/api/analytics/heatmap", { params });
      set({ expenseHeatmap: data });
    } catch {
      set({ error: "Failed to fetch expense heatmap" });
    } finally {
      set({ isLoading: false });
    }
  },
  exportTransactions: async (params) => {
    set({ isLoading: true });
    try {
      const response = await api.get("/api/analytics/export", {
        params,
        responseType: params.format === "csv" ? "blob" : "json",
      });
      
      if (params.format === "csv") {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      
      return response.data;
    } catch {
      set({ error: "Failed to export transactions" });
    } finally {
      set({ isLoading: false });
    }
  },
}));