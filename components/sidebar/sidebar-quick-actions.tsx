"use client";

import { useEffect, useState } from "react";
import { Download, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransactionVoiceDialog from "../transactions/TransactionVoiceDialog";
import { useExportTransactions } from "@/hooks/useExportTransactions";
import { useUserContext } from "@/context/UserContext";
import { toast } from "sonner";

interface SidebarQuickActionsProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function SidebarQuickActions({ isCollapsed, isMobileOpen }: SidebarQuickActionsProps) {
  const [voiceDialogOpen, setVoiceDialogOpen] = useState(false);
  const { data: user } = useUserContext();
  const { exportTransactions, isExporting, error } = useExportTransactions();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleExport = async () => {
    if (!user?.id) {
      toast.error("User not found. Please sign in first.");
      return;
    }

    const result = await exportTransactions(user.id, "xlsx");

    if (result?.empty) {
      toast.warning("No transactions found to export.");
    } else if (result?.success) {
      toast.success("Transactions exported successfully!");
    }
  };

  const quickActions = [
    {
      title: "Add Transaction",
      icon: Mic,
      onClick: () => setVoiceDialogOpen(true),
    },
    {
      title: isExporting ? "Exporting..." : "Export Data",
      icon: Download,
      onClick: handleExport,
    },
  ];

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
              onClick={action.onClick}
              disabled={isExporting}
            >
              <Icon className="h-4 w-4" />
              {(!isCollapsed || isMobileOpen) && action.title}
            </Button>
          </div>
        );
      })}

      <TransactionVoiceDialog open={voiceDialogOpen} onOpenChange={setVoiceDialogOpen} />
    </div>
  );
}
