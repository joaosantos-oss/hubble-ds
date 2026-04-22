import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Context ──────────────────────────────────────────────────────────────────

type InputGroupContextValue = { hasError: boolean };
const InputGroupContext = React.createContext<InputGroupContextValue>({ hasError: false });

// ─── InputGroup ───────────────────────────────────────────────────────────────

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  hasError?: boolean;
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ hasError = false, className, children, ...props }, ref) => (
    <InputGroupContext.Provider value={{ hasError }}>
      <div
        ref={ref}
        className={cn(
          "flex items-stretch rounded-md border bg-input-bg transition-shadow",
          "focus-within:shadow-focus-ring",
          hasError
            ? "border-border-destructive focus-within:shadow-focus-ring-error"
            : "border-input",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </InputGroupContext.Provider>
  )
);

InputGroup.displayName = "InputGroup";

// ─── InputGroupInput ──────────────────────────────────────────────────────────

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex-1 min-w-0 bg-transparent border-0 outline-none ring-0",
      "py-2 px-3 text-body-sm text-foreground font-sans",
      "placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));

InputGroupInput.displayName = "InputGroupInput";

// ─── InputGroupTextarea ───────────────────────────────────────────────────────

const InputGroupTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex-1 min-w-0 bg-transparent border-0 outline-none ring-0 resize-none",
      "py-2 px-3 text-body-sm text-foreground font-sans",
      "placeholder:text-muted-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));

InputGroupTextarea.displayName = "InputGroupTextarea";

// ─── InputGroupAddon ─────────────────────────────────────────────────────────
// Flex container for icons, text or buttons placed alongside the input.
// Use side="bottom" for a stacked action row (requires InputGroup flex-col).

interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "bottom";
}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ side, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center shrink-0 text-muted-foreground",
        side === "bottom"
          ? "gap-1.5 px-3 py-1.5 border-t border-input"
          : "px-3",
        className
      )}
      {...props}
    />
  )
);

InputGroupAddon.displayName = "InputGroupAddon";

// ─── InputGroupText ───────────────────────────────────────────────────────────
// Static text label inside an addon (e.g. "https://", "$", ".com").

const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "text-body-sm font-sans text-muted-foreground select-none whitespace-nowrap",
      className
    )}
    {...props}
  />
));

InputGroupText.displayName = "InputGroupText";

// ─── InputGroupButton ─────────────────────────────────────────────────────────
// Ghost-style button adapted for use inside an InputGroup.

const InputGroupButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center gap-1.5",
      "text-body-sm font-sans font-medium text-muted-foreground",
      "hover:text-foreground transition-colors",
      "focus-visible:outline-none focus-visible:text-foreground",
      "disabled:pointer-events-none disabled:opacity-50",
      "select-none whitespace-nowrap",
      className
    )}
    {...props}
  />
));

InputGroupButton.displayName = "InputGroupButton";

// ─── InputGroupSeparator ──────────────────────────────────────────────────────
// Thin vertical divider between sections of the group.

const InputGroupSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-px self-stretch bg-input my-1.5", className)}
    {...props}
  />
));

InputGroupSeparator.displayName = "InputGroupSeparator";

export {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupAddon,
  InputGroupText,
  InputGroupButton,
  InputGroupSeparator,
};
export type { InputGroupProps };
