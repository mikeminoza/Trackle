import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header should go here if sticky */}
        {children}
      </div>
    </div>
  );
}
