import * as React from "react";
import { cn } from "@/lib/utils";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

interface EmptyProps extends React.ComponentPropsWithoutRef<"div"> {
  icon?: PhosphorIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function Empty({ icon, title, description, action, className, ...props }: EmptyProps) {
  const Icon = icon;
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3 py-12 text-center", className)}
      {...props}
    >
      {Icon && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-2 text-muted-foreground">
          <Icon size={24} />
        </div>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-body-sm font-medium text-foreground font-sans">{title}</p>
        {description && (
          <p className="text-caption text-muted-foreground font-sans max-w-xs">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export { Empty };
export type { EmptyProps };
