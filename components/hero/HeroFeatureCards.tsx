"use client";

import { motion } from "framer-motion";
import { fadeInScale, staggerContainer } from "./animations";
import { Card, CardContent } from "../ui/card";
import { Brain, PieChart, Shield } from "lucide-react";
import { MotionHighlight } from "@/components/animate-ui/effects/motion-highlight";

const FEATURES = [
  {
    id: "1",
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Smart categorization and spending analysis with personalized financial advice",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    id: "2",
    icon: PieChart,
    title: "Visual Budgeting",
    description: "Beautiful charts and real-time progress tracking for all your financial goals",
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    id: "3",
    icon: Shield,
    title: "Privacy First",
    description: "No bank connections needed. Your financial data stays completely private",
    iconBg: "bg-chart-3/10",
    iconColor: "text-chart-3",
  },
];

export default function HeroFeatureCards() {
  return (
    <motion.div
      className="w-full my-40"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* MotionHighlight wrap */}
        <MotionHighlight hover className="rounded-xl">
          {FEATURES.map((feature) => (
            <motion.div key={feature.id} variants={fadeInScale}>
              <Card className="border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center space-y-4">
                  <div
                    className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mx-auto`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </MotionHighlight>
      </div>
    </motion.div>
  );
}
