import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/button/button";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

// ─── Overlay ──────────────────────────────────────────────────────────────────

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
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
DialogOverlay.displayName = "DialogOverlay";

// ─── Content ──────────────────────────────────────────────────────────────────

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "w-full max-w-[calc(100%-2rem)] sm:max-w-lg",
        "flex flex-col bg-background rounded-lg border border-border shadow-lg outline-none",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

// ─── Header ───────────────────────────────────────────────────────────────────

const DialogHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-4 border-b border-border-100",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      <DialogPrimitive.Close
        className={cn(
          buttonVariants({ variant: "ghost", size: "small", iconOnly: true }),
          "shrink-0 text-muted-foreground hover:text-foreground"
        )}
        aria-label="Fechar"
      >
        <X size={16} />
      </DialogPrimitive.Close>
    </div>
  )
);
DialogHeader.displayName = "DialogHeader";

// ─── Body (scrollable content area) ──────────────────────────────────────────

const DialogBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto px-6 py-4", className)} {...props} />
  )
);
DialogBody.displayName = "DialogBody";

// ─── Footer ───────────────────────────────────────────────────────────────────

type DialogFooterVariant = "right" | "full" | "single";

interface DialogFooterProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: DialogFooterVariant;
}

const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, variant = "right", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "gap-2 px-6 py-4 border-t border-border-100",
        // 2 buttons right-aligned
        variant === "right"  && "flex justify-end",
        // 2 buttons filling full width equally
        variant === "full"   && "grid grid-cols-2",
        // 1 button filling full width
        variant === "single" && "flex [&>*]:w-full",
        className
      )}
      {...props}
    />
  )
);
DialogFooter.displayName = "DialogFooter";

// ─── Title ────────────────────────────────────────────────────────────────────

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-heading-4 font-semibold text-foreground font-sans leading-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

// ─── Description ─────────────────────────────────────────────────────────────

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-body-sm text-muted-foreground font-sans", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog, DialogTrigger, DialogPortal, DialogClose,
  DialogOverlay, DialogContent,
  DialogHeader, DialogBody, DialogFooter,
  DialogTitle, DialogDescription,
};
export type { DialogFooterVariant };
