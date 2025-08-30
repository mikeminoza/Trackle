"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  BarChart3,
  CreditCard,
  Home,
  MessageCircle,
  PieChart,
  Repeat,
  Target,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/home",
    icon: Home,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: PieChart,
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: Wallet,
  },
  {
    title: "Recurring Bills",
    href: "/recurring",
    icon: Repeat,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    title: "AI Assistant",
    href: "/chat",
    icon: MessageCircle,
  },
];

interface SidebarNavProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function SidebarNav({ isCollapsed, isMobileOpen }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {!isCollapsed && (
        <div className="px-3 py-2">
          <h2 className="mb-2 text-xs font-semibold tracking-tight text-sidebar-foreground/60 uppercase">
            Navigation
          </h2>
        </div>
      )}
      {sidebarNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 px-3 py-2 h-10 transition-colors",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className="h-4 w-4" />
              {(!isCollapsed || isMobileOpen) && item.title}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
