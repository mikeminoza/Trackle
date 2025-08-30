"use client";
import { motion } from "framer-motion";
import { fadeInUp } from "./animations";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroCTA() {
  return (
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
  );
}
