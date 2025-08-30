import { UserMenu } from "./user-menu";

interface SidebarFooterProps {
  isCollapsed?: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  return (
    <div className="border-t border-sidebar-border">
      <div className="p-2">
        <UserMenu isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}
