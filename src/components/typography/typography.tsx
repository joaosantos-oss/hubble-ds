import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const FIXED_WEIGHT_VARIANTS = ["h1", "h2", "h3", "h4", "h5", "monospaced"] as const;

const typographyVariants = cva("font-sans", {
  variants: {
    variant: {
      h1: "text-heading-1 font-bold",
      h2: "text-heading-2 font-bold",
      h3: "text-heading-3 font-bold",
      h4: "text-heading-4 font-bold",
      h5: "text-heading-5 font-bold",
      body: "text-body",
      "body-sm": "text-body-sm",
      caption: "text-caption",
      "caption-sm": "text-caption-sm",
      monospaced: "font-mono text-body-sm font-normal",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      destructive: "text-destructive-foreground",
      success: "text-success",
      warning: "text-warning",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
  },
});

type TypographyVariants = VariantProps<typeof typographyVariants>;

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    TypographyVariants {}

const Typography = React.forwardRef<HTMLSpanElement, TypographyProps>(
  ({ className, variant, weight, color, ...props }, ref) => {
    const isFixedWeight = FIXED_WEIGHT_VARIANTS.includes(
      variant as (typeof FIXED_WEIGHT_VARIANTS)[number]
    );

    return (
      <span
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            weight: isFixedWeight ? undefined : (weight ?? "regular"),
            color,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants, FIXED_WEIGHT_VARIANTS };
export type { TypographyProps };
