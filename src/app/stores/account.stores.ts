import { Account } from '@/@types/types';
import {create} from 'zustand';
import api from '../lib/api';




interface AccountState {
    accounts: Account[];
    currentAccount: Account | null;
    isLoading: boolean;
    error: string | null;
    fetchAccounts: () => Promise<void>;
    getAccount: (id: string) => Promise<Account>;
    // createAccount: (account: Omit<Account, "id">) => Promise<void>;
    createAccount: (account: {
        name: string;
        type: "cash" | "investment" | "loan" | "other" | "credit card";
        balance: number;
        currency: string;
    }) => Promise<void>;
    updateAccount: (id: string, account: Partial<Account>) => Promise<void>;
    deleteAccount: (id: string) => Promise<void>;
    setCurrentAccount: (account: Account | null) => void;
}


export const useAccountStore = create<AccountState>((set) => ({
    accounts: [],
    currentAccount: null,
    isLoading: false,
    error: null,
    fetchAccounts: async()=>{
        set({isLoading: true});
        try {
            const {data} = await api.get('/api/accounts')
            set({accounts: data})
            console.log(data)
        } catch {
            set({error: "Failed to fetch accounts"});
        }finally{
            set({isLoading: false})
        }
    },
    getAccount: async(id) => {
        set({isLoading: true});
        try {
            const {data} = await api.get(`/accounts/${id}`);
            console.log(data)
            return data;
        } finally {
            set({isLoading: false})
        }
    },
    createAccount: async(account) => {
        set({isLoading: true});
        try{
            const {data} = await api.post('/api/accounts', account);
            set((state) => ({accounts: [...state.accounts, data]}))
        }finally{
            set({isLoading: false});
        }
    },
    updateAccount: async(id, updates)=> {
        set({isLoading: true});
        try{
            const {data} = await api.patch(`/accounts/${id}`, updates);
            set((state) => ({
                accounts: state.accounts.map((acc) => (acc._id === id ? data : acc))
            }));
        }finally{
            set({isLoading: false});
        }
    },
    deleteAccount: async(id) => {
        set({isLoading: true});
        try{
            await api.delete(`/accounts/${id}`);
            set((state) => ({
                accounts: state.accounts.filter((acc) => acc._id !== id)
            }))
        }finally{
            set({isLoading: false})
        }
    } ,
    setCurrentAccount: (account) => set({currentAccount: account})
}))





