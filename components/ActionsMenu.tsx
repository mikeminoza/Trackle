"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { ReactNode } from "react";

type Action = {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
};

interface Props {
  actions: Action[];
}

export default function ActionsMenu({ actions }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full hover:bg-accent text-muted-foreground">
          <MoreVertical className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            onSelect={(e) => {
              e.preventDefault();
              action.onSelect();
            }}
          >
            {action.icon && <span className="mr-2">{action.icon}</span>}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
