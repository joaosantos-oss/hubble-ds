import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "@/components/button/button";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

// ─── Overlay ──────────────────────────────────────────────────────────────────

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = "AlertDialogOverlay";

// ─── Content ──────────────────────────────────────────────────────────────────

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
        "flex flex-col gap-4 rounded-lg border border-border bg-background p-6 shadow-lg",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = "AlertDialogContent";

// ─── Header ───────────────────────────────────────────────────────────────────

const AlertDialogHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // mobile: centered
        "flex flex-col items-center gap-1.5 text-center",
        // desktop: left-aligned
        "sm:items-start sm:text-left",
        className
      )}
      {...props}
    />
  )
);
AlertDialogHeader.displayName = "AlertDialogHeader";

// ─── Footer ───────────────────────────────────────────────────────────────────

const AlertDialogFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // mobile: vertical, full-width, centered
        "flex flex-col-reverse items-stretch gap-2",
        // desktop: horizontal, right-aligned
        "sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
);
AlertDialogFooter.displayName = "AlertDialogFooter";

// ─── Title ────────────────────────────────────────────────────────────────────

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-heading-4 font-semibold text-foreground font-sans", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

// ─── Description ─────────────────────────────────────────────────────────────

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-body-sm text-muted-foreground font-sans", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

// ─── Action ───────────────────────────────────────────────────────────────────

type AlertDialogActionProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
  & Pick<ButtonProps, "variant" | "size">;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  AlertDialogActionProps
>(({ className, variant = "primary", size = "medium", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

// ─── Cancel ───────────────────────────────────────────────────────────────────

type AlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
  & Pick<ButtonProps, "variant" | "size">;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  AlertDialogCancelProps
>(({ className, variant = "outline", size = "medium", ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog, AlertDialogTrigger, AlertDialogPortal,
  AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
};
