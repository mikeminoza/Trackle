import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Suspense } from "react";
import { UserProvider } from "@/context/UserContext";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <Suspense fallback={null}>
          <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
        </Suspense>
      </div>
    </UserProvider>
  );
}
