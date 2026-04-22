import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { IconContext } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const FOCUS = "focus-visible:outline-none focus-visible:shadow-focus-ring";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-medium transition-colors select-none",
    "disabled:pointer-events-none disabled:opacity-50",
    FOCUS,
  ],
  {
    variants: {
      variant: {
        ghost:
          "bg-transparent text-foreground hover:bg-hover-ghost data-[state=on]:bg-outline-active",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-hover-outline data-[state=on]:bg-outline-active",
      },
      size: {
        large:  "h-12 px-6 text-body    rounded-md",
        medium: "h-9  px-4 text-body-sm rounded-md",
        small:  "h-7  px-3 text-body-sm rounded-md",
        mini:   "h-6  px-2 text-caption  rounded-md",
      },
      iconOnly: {
        true:  "",
        false: "",
      },
    },
    compoundVariants: [
      { size: "large",  iconOnly: true, className: "w-12 px-0" },
      { size: "medium", iconOnly: true, className: "w-9  px-0" },
      { size: "small",  iconOnly: true, className: "w-7  px-0" },
      { size: "mini",   iconOnly: true, className: "w-6  px-0" },
    ],
    defaultVariants: {
      variant:  "outline",
      size:     "medium",
      iconOnly: false,
    },
  }
);

type ToggleVariants = VariantProps<typeof toggleVariants>;

// ─── Toggle ───────────────────────────────────────────────────────────────────

interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    ToggleVariants {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, iconOnly, pressed, defaultPressed, onPressedChange, children, ...props }, ref) => {
  const [isOn, setIsOn] = React.useState(pressed ?? defaultPressed ?? false);

  React.useEffect(() => {
    if (pressed !== undefined) setIsOn(pressed);
  }, [pressed]);

  return (
    <TogglePrimitive.Root
      ref={ref}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={(p) => {
        setIsOn(p);
        onPressedChange?.(p);
      }}
      className={cn(toggleVariants({ variant, size, iconOnly }), className)}
      {...props}
    >
      <IconContext.Provider value={{ weight: isOn ? "fill" : "regular" }}>
        {children}
      </IconContext.Provider>
    </TogglePrimitive.Root>
  );
});

Toggle.displayName = "Toggle";

// ─── ToggleGroup ──────────────────────────────────────────────────────────────

type ToggleGroupContextValue = ToggleVariants;
const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "outline",
  size: "medium",
  iconOnly: false,
});

type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  ToggleVariants;

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant = "outline", size = "medium", iconOnly = false, children, ...props }, ref) => (
  <ToggleGroupContext.Provider value={{ variant, size, iconOnly }}>
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center", className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  </ToggleGroupContext.Provider>
));

ToggleGroup.displayName = "ToggleGroup";

// ─── ToggleGroupItem ──────────────────────────────────────────────────────────

type ToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
  ToggleVariants;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, variant, size, iconOnly, children, ...props }, forwardedRef) => {
  const ctx = React.useContext(ToggleGroupContext);
  const v  = variant  ?? ctx.variant;
  const s  = size     ?? ctx.size;
  const io = iconOnly ?? ctx.iconOnly;

  const [isOn, setIsOn] = React.useState(false);
  const localRef = React.useRef<HTMLButtonElement>(null);

  const ref = React.useCallback(
    (node: HTMLButtonElement | null) => {
      (localRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    },
    [forwardedRef]
  );

  React.useLayoutEffect(() => {
    const el = localRef.current;
    if (!el) return;
    setIsOn(el.dataset.state === "on");
    const observer = new MutationObserver(() => setIsOn(el.dataset.state === "on"));
    observer.observe(el, { attributes: true, attributeFilter: ["data-state"] });
    return () => observer.disconnect();
  }, []);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({ variant: v, size: s, iconOnly: io }),
        "rounded-none first:rounded-l-md last:rounded-r-md",
        v === "outline" && "[&:not(:first-child)]:-ml-px data-[state=on]:z-10 hover:z-10 focus-visible:z-10",
        className
      )}
      {...props}
    >
      <IconContext.Provider value={{ weight: isOn ? "fill" : "regular" }}>
        {children}
      </IconContext.Provider>
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants };
export type { ToggleProps, ToggleGroupProps, ToggleGroupItemProps };
