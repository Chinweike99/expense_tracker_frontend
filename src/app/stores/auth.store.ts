import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import { RegisterData, User } from "@/@types/types";
import api from '../lib/api';




interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>
    logout: () => void;
    verifyEmail: (token: string) => Promise<void>;
    requestPasswordReset: (email: string) => Promise<void>;
    resetPassword: (token: string, password: string) => Promise<void>
}


export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,
            login: async (email, password) => {
                set({isLoading: true});
                try{
                    const {data} = await api.post('/api/auth/login', {email, password});
                    set({user: data.user, token: data.token})
                }finally{
                    set({isLoading: false})
                }
            },
            register: async(data) => {
                set({isLoading: true});
                try{
                    await api.post('/api/auth/signup', data);
                }finally{
                    set({isLoading: false})
                }
            }, 
            logout: () => {
                api.post('/auth/logout');
                set({user: null, token: null})
            },
            verifyEmail: async(token) => {
                set({isLoading: true})
                try{
                    await api.get(`/auth/verify-email?token=${token}`)
                }finally{
                    set({ isLoading: false})
                }
            },
            requestPasswordReset: async(email) => {
                set ({ isLoading: true});
                try {
                    await api.post("/auth/forgot-password", { email })
                } finally {
                    set({ isLoading: false })
                }
            },
            resetPassword: async(token, password) => {
                set({isLoading: true});
                try{
                    await api.post("/auth/reset-password", {token, password});
                } finally{
                    set({isLoading: false});
                }
            }
        }),
        {
            name: "auth-storage",
        }
    )
)