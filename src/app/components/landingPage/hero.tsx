"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/app/stores/auth.store";
import { Header } from "./header";
// import { useAuthStore } from "@/stores/auth";

export function HeroSection() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <section className="relative overflow-hidden">
      <div className="container px-4 py-24 mx-auto md:py-32">
        {/* <Header /> */}
        <div className="flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex px-4 py-1 mb-4 font-sans text-sm font-medium rounded-full bg-green-500/20 text-accent-foreground">
              Financial Freedom Starts Here
            </div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Take <span className="text-[#f57708]">Control</span> of Your <span className="text-[#f57708]">Finances</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-2xl mx-auto mt-6 text-lg text-gray-600"
            >
              The most intuitive expense tracker to help you save money, budget effectively, 
              and achieve your financial goals.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col justify-center gap-4 mt-10 sm:flex-row"
            >
              <Button asChild size="lg" className="text-sm text-[#f57708] bg-white border-2 hover:text-white">
                <Link href={user ? "/dashboard" : "/register"}>
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="text-base">
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative mt-16 md:mt-24"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 -z-10 blur-2xl" />
            <div className="overflow-hidden  border rounded-3xl bg-background/80 border-border/50 backdrop-blur-sm">
              <img
                src="/expense.jpg"
                alt="Dashboard Preview"
                className="md:w-[1400px] object-cover max-h-[500px]"
                width={""}
                height={""}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}