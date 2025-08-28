"use client";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  TrendingUp,
  PieChart,
  Target,
  Brain,
  Wallet,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion, easeInOut } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeInOut },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Hero() {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="absolute inset-0 pointer-events-none" />

      {/* Hero Content */}
      <div className="w-full px-4 py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">
          {/* Badge Section */}
          <motion.div
            className="w-full flex justify-center mb-12"
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Personal Finance
            </Badge>
          </motion.div>

          {/* Main Heading Section */}
          <motion.div
            className="w-full text-center space-y-6 mb-16"
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Take Control of Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Financial Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Track expenses, set budgets, and achieve your savings goals with AI-powered insights.
              No bank connections required – your data stays private and secure.
            </p>
          </motion.div>

          {/* CTA Buttons Section */}
          <motion.div
            className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/auth/login">
              <Button size="lg" className="text-lg px-6 py-4 h-auto">
                Start Trackle
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Feature Cards Section */}
          <motion.div
            className="w-full my-40"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <motion.div variants={fadeInScale}>
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <Brain className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
                    <p className="text-muted-foreground">
                      Smart categorization and spending analysis with personalized financial advice
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInScale}>
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mx-auto">
                      <PieChart className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold">Visual Budgeting</h3>
                    <p className="text-muted-foreground">
                      Beautiful charts and real-time progress tracking for all your financial goals
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInScale}>
                <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mx-auto">
                      <Shield className="w-6 h-6 text-chart-3" />
                    </div>
                    <h3 className="text-xl font-semibold">Privacy First</h3>
                    <p className="text-muted-foreground">
                      No bank connections needed. Your financial data stays completely private
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Key Features List Section */}
          <motion.div
            className="w-full mb-40"
            {...fadeInUp}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
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
                  <p className="text-sm text-muted-foreground">
                    Quick entry with AI auto-categorization
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-3" variants={fadeInScale}>
                <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <h4 className="font-semibold">Budget Management</h4>
                  <p className="text-sm text-muted-foreground">
                    Set limits and track progress visually
                  </p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-3" variants={fadeInScale}>
                <div className="w-8 h-8 bg-chart-4/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-chart-4" />
                </div>
                <div>
                  <h4 className="font-semibold">Savings Goals</h4>
                  <p className="text-sm text-muted-foreground">
                    Plan and achieve your financial targets
                  </p>
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

          {/* Social Proof / Stats Section */}
          <motion.div
            className="w-full"
            {...fadeInUp}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div className="text-center" variants={fadeInScale}>
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-muted-foreground">Private & Secure</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeInScale}>
                <div className="text-3xl md:text-4xl font-bold text-destructive">AI-Powered</div>
                <div className="text-muted-foreground">Smart Insights</div>
              </motion.div>
              <motion.div className="text-center" variants={fadeInScale}>
                <div className="text-3xl md:text-4xl font-bold text-chart-3">Free</div>
                <div className="text-muted-foreground">No Hidden Costs</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
