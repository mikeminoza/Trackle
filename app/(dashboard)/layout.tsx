import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Suspense } from "react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <Suspense fallback={null}>
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </Suspense>
    </div>
  );
}
