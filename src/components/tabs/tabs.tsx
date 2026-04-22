import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const tabsListVariants = cva(
  "inline-flex items-center",
  {
    variants: {
      variant: {
        default: "h-9 rounded-lg bg-muted p-1 text-muted-foreground",
        line:    "gap-1 border-b border-border w-full",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "text-body-sm font-medium font-sans transition-colors select-none",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "rounded-md px-3 py-1 text-muted-foreground",
          "focus-visible:shadow-focus-ring",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        ],
        line: [
          "px-3 pb-2.5 pt-1 text-muted-foreground",
          "border-b-2 border-transparent -mb-px",
          "hover:text-foreground",
          "focus-visible:text-foreground",
          "data-[state=active]:border-primary data-[state=active]:text-foreground",
        ],
      },
    },
    defaultVariants: { variant: "default" },
  }
);

// ─── Context ──────────────────────────────────────────────────────────────────

type TabsVariant = VariantProps<typeof tabsListVariants>["variant"];
const TabsVariantContext = React.createContext<TabsVariant>("default");

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const Tabs = TabsPrimitive.Root;

// ─── TabsList ─────────────────────────────────────────────────────────────────

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  </TabsVariantContext.Provider>
));
TabsList.displayName = "TabsList";

// ─── TabsTrigger ──────────────────────────────────────────────────────────────

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => {
  const ctxVariant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant: variant ?? ctxVariant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

// ─── TabsContent ──────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 outline-none",
      "focus-visible:shadow-focus-ring focus-visible:rounded-md",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
