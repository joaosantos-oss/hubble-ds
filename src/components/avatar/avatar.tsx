import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden",
  {
    variants: {
      size: {
        lg:  "h-10 w-10 text-body-sm",
        md:  "h-8  w-8  text-caption",
        sm:  "h-6  w-6  text-caption-sm",
        xs:  "h-5  w-5  text-caption-sm",
      },
      shape: {
        circle:  "rounded-full",
        rounded: "",
      },
    },
    compoundVariants: [
      { size: "lg", shape: "rounded", className: "rounded-lg" },
      { size: "md", shape: "rounded", className: "rounded-lg" },
      { size: "sm", shape: "rounded", className: "rounded" },
      { size: "xs", shape: "rounded", className: "rounded" },
    ],
    defaultVariants: {
      size:  "lg",
      shape: "circle",
    },
  }
);

type AvatarVariants = VariantProps<typeof avatarVariants>;

// ─── Avatar ───────────────────────────────────────────────────────────────────

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    AvatarVariants {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, ...props }, ref) => (
  <AvatarPrimitive.Root
    data-slot="avatar"
    ref={ref}
    className={cn(avatarVariants({ size, shape }), className)}
    {...props}
  />
));

Avatar.displayName = "Avatar";

// ─── AvatarImage ──────────────────────────────────────────────────────────────

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("h-full w-full object-cover", className)}
    {...props}
  />
));

AvatarImage.displayName = "AvatarImage";

// ─── AvatarFallback ───────────────────────────────────────────────────────────

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center",
      "bg-muted text-muted-foreground font-sans font-medium",
      className
    )}
    {...props}
  />
));

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
export type { AvatarProps };
