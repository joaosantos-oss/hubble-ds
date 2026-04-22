import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
RadioGroup.displayName = "RadioGroup";

// Unchecked: fundo background + borda colorida (sem preenchimento)
// Checked:   fundo sólido (foreground/destructive) + sem borda + ponto bg-background
const radioItemVariants = cva(
  [
    "peer w-4 h-4 rounded-full shrink-0 transition-shadow",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=unchecked]:bg-background",
  ],
  {
    variants: {
      variant: {
        default: [
          "data-[state=unchecked]:border data-[state=unchecked]:border-input",
          "data-[state=checked]:bg-primary",
          "focus-visible:outline-none focus-visible:shadow-focus-ring",
        ],
        error: [
          "data-[state=unchecked]:border data-[state=unchecked]:border-border-destructive",
          "data-[state=checked]:bg-destructive-foreground",
          "focus-visible:outline-none focus-visible:shadow-focus-ring-error",
        ],
      },
    },
    defaultVariants: { variant: "default" },
  }
);

type RadioItemVariants = VariantProps<typeof radioItemVariants>;

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    RadioItemVariants {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(radioItemVariants({ variant }), className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center leading-[0]">
      <span
        className={cn(
          "w-2 h-2 rounded-full block",
          variant === "error" ? "bg-destructive-bg" : "bg-primary-bg"
        )}
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
export type { RadioGroupItemProps };
