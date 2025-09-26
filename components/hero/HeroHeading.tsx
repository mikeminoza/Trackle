"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "./animations";

export default function HeroHeading() {
  return (
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
      <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-center">
        Track expenses, set budgets, and achieve your savings goals with AI-powered insights. No
        bank connections required – your data stays private and secure.
      </p>
    </motion.div>
  );
}
