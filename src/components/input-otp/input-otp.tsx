import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type OTPSize = "large" | "medium" | "small" | "mini";

const SIZE_CLASSES: Record<OTPSize, string> = {
  large:  "h-12 w-12 text-body",
  medium: "h-10 w-10 text-body-sm",
  small:  "h-8  w-8  text-body-sm",
  mini:   "h-6  w-6  text-caption",
};

const SizeContext  = React.createContext<OTPSize>("medium");
const ErrorContext = React.createContext<boolean>(false);

// ─── InputOTP ─────────────────────────────────────────────────────────────────

interface InputOTPProps extends React.ComponentPropsWithoutRef<typeof OTPInput> {
  size?:     OTPSize;
  hasError?: boolean;
}

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
  ({ className, size = "medium", hasError = false, containerClassName, ...props }, ref) => (
    <SizeContext.Provider value={size}>
      <ErrorContext.Provider value={hasError}>
        <OTPInput
          ref={ref}
          containerClassName={cn("flex items-center gap-2", containerClassName)}
          className={cn("disabled:cursor-not-allowed", className)}
          {...props}
        />
      </ErrorContext.Provider>
    </SizeContext.Provider>
  )
);

InputOTP.displayName = "InputOTP";

// ─── InputOTPGroup ────────────────────────────────────────────────────────────

const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
);

InputOTPGroup.displayName = "InputOTPGroup";

// ─── InputOTPSlot ─────────────────────────────────────────────────────────────

interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const InputOTPSlot = React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
    const size     = React.useContext(SizeContext);
    const hasError = React.useContext(ErrorContext);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex items-center justify-center",
          "border border-input bg-input-bg",
          "font-sans font-medium text-foreground transition-all",
          "rounded-none first:rounded-l-md last:rounded-r-md",
          "[&:not(:first-child)]:-ml-px",
          SIZE_CLASSES[size],
          isActive && !hasError && "border-primary shadow-focus-ring z-10",
          isActive &&  hasError && "border-border-destructive shadow-focus-ring-error z-10",
          !isActive && hasError && "border-border-destructive",
          className
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  }
);

InputOTPSlot.displayName = "InputOTPSlot";

// ─── InputOTPSeparator ────────────────────────────────────────────────────────

const InputOTPSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn("text-muted-foreground font-sans text-body select-none", className)}
      {...props}
    >
      —
    </div>
  )
);

InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
export type { InputOTPProps };
