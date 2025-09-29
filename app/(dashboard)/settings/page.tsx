import type { Metadata } from "next";
import SettingsClient from "@/components/dashboard/SettingsClient";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your Trackle account and profile.",
};

export default function SettingsPage() {
  return <SettingsClient />;
}
