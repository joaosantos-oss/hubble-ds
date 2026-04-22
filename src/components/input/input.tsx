import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex w-full rounded-md border bg-input-bg px-3 py-2",
          "text-body-sm text-foreground font-sans",
          "placeholder:text-muted-foreground",
          "transition-shadow",
          hasError
            ? "border-border-destructive focus-visible:outline-none focus-visible:shadow-focus-ring-error"
            : "border-input focus-visible:outline-none focus-visible:shadow-focus-ring",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-input-disabled",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
