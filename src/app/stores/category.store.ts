import { Category } from "@/@types/types";
import { create } from "zustand";
import api from "../lib/api";

interface CategoryState {
    categories: Category[];
    isLoading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (category: {
        name: string;
    icon: string;
    color: string;
    type: "expense" | "income";
    })=> Promise<void>;
    updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    defaultCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoading: false,
    error: null,
    fetchCategories: async() => {
        set({isLoading: true});
        try {
            const {data} = await api.get('/api/categories');
            set({categories: data})
        } catch {
            set({error: "Failed to fetch catergories"});
        }finally{
            set({isLoading: false})
        }
    },
    createCategory: async(category) => {
        set({isLoading: true})
        try{
            const {data} = await api.post('/api/categories', category);
            set((state) => ({
                categories: [...state.categories, data]
            }))
        }finally{
            set({isLoading: false})
        }
    },
    updateCategory: async(id, updates) => {
        set({isLoading: true});
        try{
            const {data} = await api.patch(`/api/categories/${id}`, updates);
            set((state)=>({
                categories: state.categories.map((c) => (c._id === id ? data : c))
            }))
        }finally{
            set({isLoading: false})
        }
    },
    deleteCategory: async(id) => {
        set({isLoading: true});
        try{
            await api.delete(`/api/categories/${id}`);
            set((notDeleted) => ({
                categories: notDeleted.categories.filter((c) => c._id !==id)
            }))
        }finally{
            set({isLoading: false})
        }
    },
    defaultCategories: async () => {
        set({ isLoading: true });
        try {
          await api.post("/api/categories/seed-defaults");
          const { data } = await api.get("/api/categories");
          set({ categories: data });
        } finally {
          set({ isLoading: false });
        }
      },
}))