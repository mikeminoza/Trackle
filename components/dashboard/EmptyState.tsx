import { ReactNode } from "react";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "../ui/empty";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <Empty className="border border-dashed bg-muted/30 flex flex-col items-center justify-center text-center py-8 rounded-2xl">
      <EmptyHeader>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          {icon || <AlertCircle className="h-8 w-8 text-muted-foreground" />}
        </div>
        <EmptyTitle className="text-lg font-semibold">{title}</EmptyTitle>
        <EmptyDescription className="text-sm text-muted-foreground max-w-sm mx-auto">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
