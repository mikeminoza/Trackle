"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInScale, staggerContainer } from "./animations";
import { Wallet, Target, TrendingUp, Brain } from "lucide-react";

export default function HeroKeyFeatures() {
  return (
    <motion.div
      className="w-full mb-40"
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
        Everything You Need to Master Your Money
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div className="flex items-start space-x-3" variants={fadeInScale}>
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Wallet className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">Smart Expense Tracking</h4>
            <p className="text-sm text-muted-foreground">Quick entry with AI auto-categorization</p>
          </div>
        </motion.div>

        <motion.div className="flex items-start space-x-3" variants={fadeInScale}>
          <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Target className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <h4 className="font-semibold">Budget Management</h4>
            <p className="text-sm text-muted-foreground">Set limits and track progress visually</p>
          </div>
        </motion.div>

        <motion.div className="flex items-start space-x-3" variants={fadeInScale}>
          <div className="w-8 h-8 bg-chart-4/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <TrendingUp className="w-4 h-4 text-chart-4" />
          </div>
          <div>
            <h4 className="font-semibold">Savings Goals</h4>
            <p className="text-sm text-muted-foreground">Plan and achieve your financial targets</p>
          </div>
        </motion.div>

        <motion.div className="flex items-start space-x-3" variants={fadeInScale}>
          <div className="w-8 h-8 bg-chart-5/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Brain className="w-4 h-4 text-chart-5" />
          </div>
          <div>
            <h4 className="font-semibold">AI Chat Assistant</h4>
            <p className="text-sm text-muted-foreground">Ask questions about your finances</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
