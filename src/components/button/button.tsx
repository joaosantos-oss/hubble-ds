import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const FOCUS_BASE  = "focus-visible:outline-none focus-visible:shadow-focus-ring";
const FOCUS_ERROR = "focus-visible:outline-none focus-visible:shadow-focus-ring-error";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary:
          `bg-primary text-primary-foreground hover:bg-hover-primary ${FOCUS_BASE}`,
        secondary:
          `bg-secondary text-secondary-foreground border border-border hover:bg-hover-secondary ${FOCUS_BASE}`,
        outline:
          `border border-border bg-transparent text-foreground hover:bg-hover-outline ${FOCUS_BASE}`,
        ghost:
          `bg-transparent text-foreground hover:bg-hover-ghost ${FOCUS_BASE}`,
        destructive:
          `bg-destructive-bg text-destructive-foreground hover:bg-hover-destructive ${FOCUS_ERROR}`,
        link:
          `bg-transparent text-primary underline-offset-4 hover:underline ${FOCUS_BASE}`,
      },
      size: {
        large:  "py-3 px-6 text-body    rounded-md",
        medium: "py-2 px-4 text-body-sm rounded-md",
        small:  "py-1 px-3 text-body-sm rounded-md",
        mini:   "py-1 px-2 text-caption  rounded-md",
      },
      iconOnly: {
        true:  "",
        false: "",
      },
    },
    compoundVariants: [
      { size: "large",  iconOnly: true, className: "px-3" },
      { size: "medium", iconOnly: true, className: "px-2" },
      { size: "small",  iconOnly: true, className: "px-1" },
      { size: "mini",   iconOnly: true, className: "px-1" },
    ],
    defaultVariants: {
      variant:  "primary",
      size:     "medium",
      iconOnly: false,
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?:  boolean;
  loading?:  boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, iconOnly, asChild = false, loading = false, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, iconOnly }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span
            className="animate-spin rounded-full border-2 border-current border-t-transparent h-4 w-4 shrink-0"
            aria-hidden
          />
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
