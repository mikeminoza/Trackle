import { AppSidebar } from "@/components/sidebar/app-sidebar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto lg:ml-0">
        <div>{children}</div>
      </main>
    </div>
  );
}
