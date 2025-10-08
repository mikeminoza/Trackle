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
        <Button
          size="lg"
          className="text-base md:text-lg px-4 md:px-6 py-3 md:py-4 h-auto flex items-center"
        >
          Start Trackle
          <ArrowRight className="w-4 md:w-5 h-4 md:h-5 ml-2" />
        </Button>
      </Link>
    </motion.div>
  );
}
