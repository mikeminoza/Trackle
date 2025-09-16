"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ContentHeaderProps {
  title: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export function ContentHeader({ title, breadcrumbs = [] }: ContentHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full h-[64px] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between pl-8 lg:pl-0">
          <div className="flex flex-col gap-2">
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center">
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <h4 className="font-medium">Notifications</h4>
                </div>
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Budget Alert</p>
                    <p className="text-xs text-muted-foreground">
                      You&apos;ve spent 80% of your dining budget this month
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Bill Reminder</p>
                    <p className="text-xs text-muted-foreground">
                      Netflix subscription due in 3 days
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Goal Achievement</p>
                    <p className="text-xs text-muted-foreground">
                      You&apos;ve reached 50% of your savings goal!
                    </p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
