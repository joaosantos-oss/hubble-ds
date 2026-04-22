import * as React from "react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

type IconSize = keyof typeof iconSizes;
type IconWeight = "regular" | "fill";

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: PhosphorIcon;
  size?: IconSize;
  weight?: IconWeight;
  label?: string;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  ({ icon: PhIcon, size = "md", weight = "regular", label, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        role={label ? "img" : "presentation"}
        aria-label={label}
        aria-hidden={!label}
        className={cn("inline-flex items-center justify-center shrink-0", className)}
        {...props}
      >
        <PhIcon size={iconSizes[size]} weight={weight} />
      </span>
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconSizes };
export type { IconProps, IconSize, IconWeight };
