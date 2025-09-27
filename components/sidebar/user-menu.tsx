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
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "@/context/UserContext";
import { capitalizeWords } from "@/lib/utils/capitalizeWords";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserMenuProps {
  isCollapsed?: boolean;
  isMobileOpen?: boolean;
}

export function UserMenu({ isCollapsed, isMobileOpen }: UserMenuProps) {
  const { data: user, isLoading } = useUserContext();
  const router = useRouter();
  const supabase = createClient();
  const queryClient = useQueryClient();

  const logout = async () => {
    await supabase.auth.signOut();
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    router.push("/auth/login");
  };

  if (isLoading) {
    return null;
  }

  const fullName = user?.user_metadata?.full_name ?? "Anonymous";
  const email = user?.email ?? "";
  const avatarUrl = user?.user_metadata?.avatar_url ?? null;

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
          <div
            className={cn(
              "flex items-center gap-3 w-full min-w-0",
              isCollapsed && "justify-center"
            )}
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={avatarUrl || "/images/logo.png"} />
              <AvatarFallback className="flex items-center justify-center bg-muted text-muted-foreground border">
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col text-left flex-1 min-w-0">
                <span
                  className="text-sm font-medium text-sidebar-foreground truncate"
                  title={fullName}
                >
                  {capitalizeWords(fullName)}
                </span>
                <span className="text-xs text-sidebar-foreground/60 truncate" title={email}>
                  {email}
                </span>
              </div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" side={isCollapsed ? "right" : "top"}>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
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
