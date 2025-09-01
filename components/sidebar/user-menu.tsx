"use client";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  isCollapsed?: boolean;
}

export function UserMenu({ isCollapsed }: UserMenuProps) {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const handleProfile = () => {
    console.log("[v0] Profile clicked");
  };

  const handleSettings = () => {
    console.log("[v0] Settings clicked");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 px-3 py-2 h-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isCollapsed && "justify-center px-2"
          )}
        >
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary">
              <span className="text-xs font-medium text-sidebar-primary-foreground">JD</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col text-left">
                <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
                <span className="text-xs text-sidebar-foreground/60">Free Plan</span>
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" side={isCollapsed ? "right" : "top"}>
        <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
