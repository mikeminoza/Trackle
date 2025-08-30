"use client";

import { Wallet } from "lucide-react";

interface SidebarHeaderProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function SidebarHeader({ isCollapsed, isMobileOpen }: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center border-b border-sidebar-border px-4">
      <div className="flex items-center gap-2">
        {/* Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <Wallet className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>

        {/* Text (hidden when collapsed) */}
        <span
          className={`text-sm font-semibold text-sidebar-foreground transition-all duration-200 ${
            isCollapsed || isMobileOpen ? "hidden" : "block"
          }`}
        >
          Trackle
        </span>
      </div>
    </div>
  );
}
