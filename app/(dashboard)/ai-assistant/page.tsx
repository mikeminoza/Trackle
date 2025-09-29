import type { Metadata } from "next";
import AIAssistantClient from "@/components/dashboard/AIAssistantClient";

export const metadata: Metadata = {
  title: "AI Assistant",
  description: "Get AI-powered insights, financial advice, and answers to your money questions.",
};

export default function AIAssistantPage() {
  return <AIAssistantClient />;
}
