import type { Metadata } from "next";
import HomeClient from "@/components/dashboard/HomeClient";

export const metadata: Metadata = {
  title: "Home",
  description: "View your personal finance dashboard with income and expenses.",
};

export default function HomePage() {
  return <HomeClient />;
}
