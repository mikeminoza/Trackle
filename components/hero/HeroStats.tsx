"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInScale, staggerContainer } from "./animations";

export default function HeroStats() {
  return (
    <motion.div
      className="w-full"
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
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
  );
}
