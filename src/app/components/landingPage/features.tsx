"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, PieChart, Bell, Wallet, BarChart, Download } from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Real-time Analytics",
    description: "Track your spending patterns with beautiful, interactive charts and graphs."
  },
  {
    icon: <PieChart className="w-8 h-8" />,
    title: "Budget Tracking",
    description: "Set monthly budgets and get alerts when you're approaching your limits."
  },
  {
    icon: <Bell className="w-8 h-8" />,
    title: "Smart Alerts",
    description: "Receive notifications for bills, unusual spending, and financial milestones."
  },
  {
    icon: <Wallet className="w-8 h-8" />,
    title: "Multi-Account",
    description: "Manage all your accounts in one place - banks, cards, cash, and more."
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "Custom Reports",
    description: "Generate detailed reports filtered by date, category, or payment method."
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Data Export",
    description: "Export your financial data to CSV, Excel, or PDF for further analysis."
  }
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/40">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features to Simplify Your Finances
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to take control of your money in one beautiful interface.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full flex justify-center items-center border-[#e47a1d] rounded-lg transition-all hover:shadow-lg hover:border-primary/30">

                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary/10 text-[#f57708]">
                    {feature.icon}
                  </div>
                
                <CardTitle>{feature.title}</CardTitle>
                <CardContent>
                  <p className="text-muted-foreground text-center text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}