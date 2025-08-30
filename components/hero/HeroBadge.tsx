"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "./animations";
import { Badge } from "../ui/badge";
import { Sparkles } from "lucide-react";

export default function HeroBadge() {
  return (
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
  );
}
