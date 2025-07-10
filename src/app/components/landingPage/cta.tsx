"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useConfetti } from "../confetti";


export function CtaSection() {
  const fireConfetti = useConfetti();
  
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="px-8 py-16 overflow-hidden text-center rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Ready to Transform Your Finances?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground"
          >
            Join thousands of users who have taken control of their financial future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center gap-4 mt-10 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="text-base"
              onClick={fireConfetti}
            >
              <Link href="/register">
                Get Started Free <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="text-base">
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}