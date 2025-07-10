import { Currency } from '@/@types/types';
import {create} from 'zustand';
import api from '../lib/api';



interface CurrencyState {
    currencies: Currency[];
    primaryCurrency: Currency | null;
    isLoading: boolean;
    error: string | null;
    fetchCurrencies: () => Promise<void>;
    // addCurrency: (currency: Omit<Currency, "id>">) => Promise<void>;
    addCurrency: (currency: {
        symbol: string;
        code: string; 
        name: string; 
        isPrimary?: boolean | undefined;
    }) => Promise<void>;
    setPrimaryCurrency: (currencyId: string) => Promise<void>;
    updateExchangeRates: () => Promise<void>;
    deleteCurrency: (id: string) => Promise<void>;
}



export const useCurrencyStore = create<CurrencyState>((set) => ({
    currencies: [],
    primaryCurrency: null,
    isLoading: false,
    error: null,
    fetchCurrencies: async() => {
        set({isLoading: true});
        try {
            const {data} = await api.get('/api/currencies');
            console.log(data)
            set({
                currencies: data,
                primaryCurrency: data.find((c: Currency) => c.isPrimary) || null
            });
        } catch {
            set({error: "Failed to fetch currencies"})
        }finally{
            set({isLoading: false})
        }
    },
    addCurrency: async(currency) => {
        set({isLoading: true});
        try{
            const {data} = await api.post('/api/currencies', currency);
            set((state) => ({currencies: [...state.currencies, data]}))
            console.log(data)
        }finally{
            set({isLoading: false})
        }
    },
    setPrimaryCurrency: async(id) => {
        set({ isLoading: true });
        try{
            const { data } = await api.patch(`/api/currencies/${id}/set-primary`);
            set({
                currencies: data,
                primaryCurrency: data.find((c: Currency) => c.isPrimary) || null
            })
        }finally{
            set({ isLoading: false });
        }
    },
    updateExchangeRates: async() => {
        set({isLoading: true});
        try{
            const { data } = await api.patch('/api/currencies/update-rates');
            set({ currencies: data});
        } finally {
            set({isLoading: false});
        }
    },
    deleteCurrency: async(id) => {
        set({isLoading: true});
        try{
             await api.delete(`/api/currencies/${id}`);
            set((state) => ({
                currencies: state.currencies.filter((c) => c._id !== id)
            }))
        }finally{
            set({isLoading: false});
        }
    }
}))





