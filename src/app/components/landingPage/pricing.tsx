"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started with expense tracking",
    features: [
      "Track income & expenses",
      "Basic budgeting tools",
      "3 months of history",
      "Email support"
    ],
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    popular: true,
    description: "For serious budgeters and financial planners",
    features: [
      "Everything in Basic",
      "Unlimited history",
      "Advanced analytics",
      "Multi-account support",
      "Budget rollovers",
      "Priority support"
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Family",
    price: "$15",
    period: "/month",
    description: "Manage household finances together",
    features: [
      "Everything in Pro",
      "Up to 5 family members",
      "Shared budgets",
      "Child accounts",
      "Family financial reports"
    ],
    cta: "Start Free Trial"
  }
];

export function PricingSection() {
  return (
    <section className="py-24 bg-muted/40">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that fits your financial needs. No hidden fees.
          </p>
        </motion.div>

        <div className="grid gap-8 mt-16 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative p-8 border rounded-2xl bg-background ${
                plan.popular ? "ring-2 ring-[#e47a1d]" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute px-4 py-1 text-xs font-medium rounded-full -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="mt-2 text-muted-foreground text-lg">{plan.description}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-lg">
                    <Check className="w-4 h-4 text-[#e47a1d] font-bold" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className={`w-full mt-8  ${
                  plan.popular ? "" : "variant-outline"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}