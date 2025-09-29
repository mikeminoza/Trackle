import Image from "next/image";
import Link from "next/link";

interface SidebarHeaderProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function SidebarHeader({ isCollapsed, isMobileOpen }: SidebarHeaderProps) {
  return (
    <div className="flex h-16 items-center border-b border-sidebar-border px-4">
      <Link href="/home" className="flex items-center gap-1">
        {/* Icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <Image src="/images/logo.png" alt="logo" width={32} height={32} />
        </div>

        <span
          className={`text-sm font-semibold text-sidebar-foreground transition-all duration-200`}
        >
          {(!isCollapsed || isMobileOpen) && "Trackle"}
        </span>
      </Link>
    </div>
  );
}
