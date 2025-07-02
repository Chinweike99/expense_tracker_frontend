"use client";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { MotionConfig } from "framer-motion";
import { ToastContainer } from "react-toastify"


const queryClient = new QueryClient();

export function Providers({children}: { children: React.ReactNode}){
    return(
        <QueryClientProvider client={queryClient}>
            <MotionConfig>
                {children}
                <ToastContainer position="bottom-right"/>
            </MotionConfig>
        </QueryClientProvider>
    )
}