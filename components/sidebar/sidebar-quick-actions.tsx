"use client";

import Link from "next/link";
import { DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    title: "Add Income",
    href: "/transactions/add?type=income",
    icon: TrendingUp,
  },
  {
    title: "Add Expense",
    href: "/transactions/add?type=expense",
    icon: DollarSign,
  },
];

interface SidebarQuickActionsProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function SidebarQuickActions({ isCollapsed, isMobileOpen }: SidebarQuickActionsProps) {
  return (
    <div className="space-y-1">
      {!isCollapsed && (
        <div className="px-3 py-2">
          <h2 className="mb-2 text-xs font-semibold tracking-tight text-sidebar-foreground/60 uppercase">
            Quick Actions
          </h2>
        </div>
      )}
      {quickActions.map((action) => {
        const Icon = action.icon;

        return (
          <Button
            key={action.href}
            variant="ghost"
            className="w-full justify-start gap-3 px-3 py-2 h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            asChild
          >
            <Link href={action.href}>
              <Icon className="h-4 w-4" />
              {(!isCollapsed || isMobileOpen) && action.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
