import { UserMenu } from "./user-menu";

interface SidebarFooterProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function SidebarFooter({ isCollapsed, isMobileOpen }: SidebarFooterProps) {
  return (
    <div className="border-t border-sidebar-border">
      <div className="p-2">
        <UserMenu isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
      </div>
    </div>
  );
}
