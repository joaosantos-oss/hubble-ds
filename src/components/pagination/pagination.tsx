import * as React from "react";
import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ─── Root ─────────────────────────────────────────────────────────────────────

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="paginação"
    className={cn("flex items-center justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

// ─── Content wrapper ──────────────────────────────────────────────────────────

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

// ─── Button base ──────────────────────────────────────────────────────────────

const FOCUS = "focus-visible:outline-none focus-visible:shadow-focus-ring";

const paginationItemClass = cn(
  "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2",
  "text-body-sm font-sans font-medium text-muted-foreground",
  "border border-transparent transition-colors select-none",
  "hover:bg-accent hover:text-foreground",
  "disabled:pointer-events-none disabled:opacity-50",
  FOCUS
);

// ─── PaginationLink ───────────────────────────────────────────────────────────

interface PaginationLinkProps extends React.ComponentPropsWithoutRef<"button"> {
  isActive?: boolean;
}

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <button
    type="button"
    aria-current={isActive ? "page" : undefined}
    className={cn(
      paginationItemClass,
      isActive && "border-border bg-background text-foreground shadow-sm pointer-events-none",
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

// ─── Previous / Next ──────────────────────────────────────────────────────────

const PaginationPrevious = ({ className, ...props }: React.ComponentPropsWithoutRef<"button">) => (
  <button type="button" aria-label="Página anterior" className={cn(paginationItemClass, "gap-1 px-3", className)} {...props}>
    <CaretLeft size={14} />
    <span>Anterior</span>
  </button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentPropsWithoutRef<"button">) => (
  <button type="button" aria-label="Próxima página" className={cn(paginationItemClass, "gap-1 px-3", className)} {...props}>
    <span>Próxima</span>
    <CaretRight size={14} />
  </button>
);
PaginationNext.displayName = "PaginationNext";

// ─── Ellipsis ─────────────────────────────────────────────────────────────────

const PaginationEllipsis = ({ className, ...props }: React.ComponentPropsWithoutRef<"span">) => (
  <span
    aria-hidden
    className={cn("inline-flex h-8 w-8 items-center justify-center text-muted-foreground", className)}
    {...props}
  >
    <DotsThree size={16} />
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
};
