import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center font-sans font-medium select-none transition-shadow",
    "focus-visible:outline-none focus-visible:shadow-focus-ring",
  ],
  {
    variants: {
      variant: {
        primary:     "bg-primary text-primary-foreground",
        secondary:   "bg-secondary text-secondary-foreground",
        outline:     "border border-border bg-transparent text-foreground",
        ghost:       "bg-transparent text-foreground",
        destructive: "bg-destructive-subtle text-destructive-foreground",
        warning:     "bg-warning-bg text-warning",
        success:     "bg-success-bg text-success",
      },
      format: {
        default: "rounded-md",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      format: "default",
    },
  }
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariants {
  iconOnly?: boolean;
}

function Badge({ className, variant, format, iconOnly = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, format }),
        iconOnly
          ? "w-5 h-5 justify-center leading-[0]"
          : "gap-1 py-0.5 px-2 text-caption",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
