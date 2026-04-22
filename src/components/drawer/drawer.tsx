import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/button/button";

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

// ─── Overlay ──────────────────────────────────────────────────────────────────

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/50", className)}
    {...props}
  />
));
DrawerOverlay.displayName = "DrawerOverlay";

// ─── Content ──────────────────────────────────────────────────────────────────

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "group/drawer fixed z-50 flex flex-col bg-background border-border",
        // bottom
        "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0",
        "data-[vaul-drawer-direction=bottom]:max-h-[85vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
        // top
        "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0",
        "data-[vaul-drawer-direction=top]:max-h-[85vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
        // right
        "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0",
        "data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm data-[vaul-drawer-direction=right]:border-l",
        // left
        "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0",
        "data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=left]:border-r",
        className
      )}
      {...props}
    >
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

// ─── Header ───────────────────────────────────────────────────────────────────
// variant "default" : title left + close button right
// variant "actions" : title left + two action buttons right

interface DrawerHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: "default" | "actions";
  actions?: React.ReactNode;
}

const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, variant = "default", actions, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-4 border-b border-border-100 shrink-0",
        className
      )}
      {...props}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {variant === "actions" && actions ? (
        <div className="flex items-center gap-2 shrink-0">{actions}</div>
      ) : (
        <DrawerPrimitive.Close
          className={cn(
            buttonVariants({ variant: "ghost", size: "small", iconOnly: true }),
            "shrink-0 text-muted-foreground hover:text-foreground"
          )}
          aria-label="Fechar"
        >
          <X size={16} />
        </DrawerPrimitive.Close>
      )}
    </div>
  )
);
DrawerHeader.displayName = "DrawerHeader";

// ─── Body ─────────────────────────────────────────────────────────────────────

const DrawerBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto px-6 py-4", className)} {...props} />
  )
);
DrawerBody.displayName = "DrawerBody";

// ─── Footer ───────────────────────────────────────────────────────────────────
// bottom drawer: no footer needed
// top drawer: footer acts as header (at the top of content, no border-t)

interface DrawerFooterProps extends React.ComponentPropsWithoutRef<"div"> {
  /** "default": botões normais | "header-like": título à esquerda + botões à direita (para drawer top) */
  variant?: "default" | "header-like";
}

const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex gap-2 px-6 py-4 shrink-0 border-t border-border-100 mt-auto",
        variant === "header-like" && "items-center justify-between",
        className
      )}
      {...props}
    />
  )
);
DrawerFooter.displayName = "DrawerFooter";

// ─── Title ────────────────────────────────────────────────────────────────────

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-heading-4 font-semibold text-foreground font-sans leading-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

// ─── Description ─────────────────────────────────────────────────────────────

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-body-sm text-muted-foreground font-sans", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer, DrawerTrigger, DrawerPortal, DrawerClose,
  DrawerOverlay, DrawerContent,
  DrawerHeader, DrawerBody, DrawerFooter,
  DrawerTitle, DrawerDescription,
};
