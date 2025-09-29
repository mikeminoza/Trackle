"use client";

import { useState } from "react";
import { Download, PlusCircle, WalletMinimal } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransactionVoiceDialog from "../transactions/TransactionVoiceDialog";

const quickActions = [
  {
    title: "Add Transaction",
    icon: PlusCircle,
    onClick: (setDialogOpen: (open: boolean) => void) => setDialogOpen(true),
  },
  {
    title: "Add Budget",
    icon: WalletMinimal,
    onClick: () => {
      console.log("Open add budget dialog");
    },
  },
  {
    title: "Export Data",
    icon: Download,
    onClick: () => {
      console.log("Exporting data");
    },
  },
];

interface SidebarQuickActionsProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function SidebarQuickActions({ isCollapsed, isMobileOpen }: SidebarQuickActionsProps) {
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);

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
          <div key={action.title}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 h-10 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => action.onClick(setVoiceDialogOpen)}
            >
              <Icon className="h-4 w-4" />
              {(!isCollapsed || isMobileOpen) && action.title}
            </Button>
          </div>
        );
      })}

      {/* Voice transaction dialog */}
      <TransactionVoiceDialog
        open={voiceDialogOpen}
        onOpenChange={setVoiceDialogOpen}
        onSubmit={() => {}}
      />
    </div>
  );
}
