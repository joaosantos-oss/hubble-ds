import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type GroupVariant = "outline" | "ghost";
type GroupSize    = "large" | "default" | "small";

const GroupContext = React.createContext<{ variant: GroupVariant; size: GroupSize }>({
  variant: "outline",
  size: "default",
});

// ─── ButtonGroup container ────────────────────────────────────────────────────

interface ButtonGroupProps {
  variant?:   GroupVariant;
  size?:      GroupSize;
  className?: string;
  children:   React.ReactNode;
}

function ButtonGroup({ variant = "outline", size = "default", className, children }: ButtonGroupProps) {
  return (
    <GroupContext.Provider value={{ variant, size }}>
      <div role="group" className={cn("inline-flex", className)}>
        {children}
      </div>
    </GroupContext.Provider>
  );
}

ButtonGroup.displayName = "ButtonGroup";

// ─── ButtonGroupItem ──────────────────────────────────────────────────────────

const itemVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-sans font-medium transition-colors select-none whitespace-nowrap",
    "rounded-none first:rounded-l-md last:rounded-r-md",
    "focus-visible:outline-none focus-visible:z-10 focus-visible:shadow-focus-ring",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        outline: [
          "border border-border bg-background text-foreground",
          "hover:bg-hover-ghost hover:z-10",
          "[&:not(:first-child)]:-ml-px",
        ],
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-hover-ghost",
        ],
      },
      size: {
        large:   "py-3 px-6 text-body",
        default: "py-2 px-4 text-body-sm",
        small:   "py-1 px-3 text-body-sm",
      },
      active: {
        true:  "",
        false: "",
      },
      iconOnly: {
        true:  "",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "outline", active: true,   className: "bg-accent z-10" },
      { variant: "ghost",   active: true,   className: "bg-accent" },
      { size: "large",   iconOnly: true, className: "px-3" },
      { size: "default", iconOnly: true, className: "px-2" },
      { size: "small",   iconOnly: true, className: "px-1" },
    ],
    defaultVariants: {
      active:   false,
      iconOnly: false,
    },
  }
);

interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?:   boolean;
  iconOnly?: boolean;
}

const ButtonGroupItem = React.forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  ({ className, active = false, iconOnly = false, children, ...props }, ref) => {
    const { variant, size } = React.useContext(GroupContext);

    return (
      <button
        ref={ref}
        className={cn(itemVariants({ variant, size, active, iconOnly }), className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ButtonGroupItem.displayName = "ButtonGroupItem";

export { ButtonGroup, ButtonGroupItem };
export type { ButtonGroupProps, ButtonGroupItemProps };
