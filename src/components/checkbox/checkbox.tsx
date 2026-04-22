import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  [
    "peer w-4 h-4 shrink-0 rounded-sm border bg-input-bg",
    "transition-shadow",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input",
          "focus-visible:outline-none focus-visible:shadow-focus-ring",
          "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground",
          "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground",
        ],
        error: [
          "border-border-destructive",
          "focus-visible:outline-none focus-visible:shadow-focus-ring-error",
          "data-[state=checked]:bg-destructive-foreground data-[state=checked]:border-border-destructive data-[state=checked]:text-destructive-bg",
          "data-[state=indeterminate]:bg-destructive-foreground data-[state=indeterminate]:border-border-destructive data-[state=indeterminate]:text-destructive-bg",
        ],
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    CheckboxVariants {
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, indeterminate, checked, ...props }, ref) => {
  const resolvedChecked = indeterminate ? "indeterminate" : checked;

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={resolvedChecked}
      className={cn(checkboxVariants({ variant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center leading-[0]">
        {resolvedChecked === "indeterminate" ? (
          <Minus size={10} weight="bold" />
        ) : (
          <Check size={10} weight="bold" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
