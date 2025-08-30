"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarHeader } from "@/components/sidebar/sidebar-header";
import { SidebarNav } from "@/components/sidebar/sidebar-nav";
import { SidebarQuickActions } from "@/components/sidebar/sidebar-quick-actions";
import { SidebarFooter } from "@/components/sidebar/sidebar-footer";
import { SidebarToggle } from "@/components/sidebar/sidebar-toggle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <SidebarToggle
        isOpen={isMobileOpen}
        onToggle={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "flex h-full flex-col bg-background border-r border-sidebar-border transition-all duration-300 ease-in-out",
          // Desktop behavior
          "lg:flex",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          // Mobile behavior
          "fixed inset-y-0 left-0 z-50 w-64",
          "lg:relative lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        <SidebarHeader isCollapsed={isCollapsed} />

        {/* Desktop Collapse Toggle */}
        <div className="hidden lg:block absolute -right-3 top-20">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full bg-background border shadow-sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <SidebarNav isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />

          <Separator className="my-4 bg-sidebar-border" />

          <SidebarQuickActions isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
        </ScrollArea>

        <SidebarFooter isCollapsed={isCollapsed} />
      </div>
    </>
  );
}
