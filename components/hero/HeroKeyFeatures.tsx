"use client";

import { motion } from "framer-motion";
import { fadeInScale, staggerContainer } from "./animations";
import { Wallet, Target, TrendingUp, Brain } from "lucide-react";

const features = [
  {
    icon: Wallet,
    iconBg: "bg-primary/10 text-primary",
    title: "Dashboard & Transactions",
    desc: "Overview of balance, income vs expenses, and AI insights.",
  },
  {
    icon: Target,
    iconBg: "bg-destructive/10 text-destructive",
    title: "Budget Management",
    desc: "Set budgets, track progress, and roll over unused funds.",
  },
  {
    icon: TrendingUp,
    iconBg: "bg-chart-4/10 text-chart-4",
    title: "Spending & Savings Goals",
    desc: "Visualize spending patterns and plan financial targets.",
  },
  {
    icon: Brain,
    iconBg: "bg-chart-5/10 text-chart-5",
    title: "AI Chat Assistant",
    desc: "Get personalized guidance and answers about your finances.",
  },
];

export default function HeroKeyFeatures() {
  return (
    <motion.div
      className="w-full mb-40"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
        Everything You Need to Master Your Money
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <motion.div key={i} className="flex items-start space-x-3" variants={fadeInScale}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${f.iconBg}`}
            >
              <f.icon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-semibold">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
