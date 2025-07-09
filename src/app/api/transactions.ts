import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { Transaction } from "@/@types/types";

export const useRecentTransactions = () => {
    return useQuery({
      queryKey: ["recent-transactions"],
      queryFn: async () => {
        const { data } = await api.get<Transaction[]>("/api/transactions/recent");
        return data;
      },
    });
  };