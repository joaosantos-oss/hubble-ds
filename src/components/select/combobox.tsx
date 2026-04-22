import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, MagnifyingGlass } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ─── Popover primitives (re-exported for Combobox composition) ────────────────

const ComboboxAnchor = PopoverPrimitive.Root;
const ComboboxTrigger = PopoverPrimitive.Trigger;

// ─── ComboboxContent ──────────────────────────────────────────────────────────

const ComboboxContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-md border border-border bg-background shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
ComboboxContent.displayName = "ComboboxContent";

// ─── Command root ─────────────────────────────────────────────────────────────

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn("flex flex-col overflow-hidden bg-background text-foreground font-sans", className)}
    {...props}
  />
));
Command.displayName = "Command";

// ─── CommandInput ─────────────────────────────────────────────────────────────

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b border-border px-3 gap-2">
    <MagnifyingGlass size={14} className="shrink-0 text-muted-foreground" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-9 w-full bg-transparent py-2 outline-none",
        "text-body-sm text-foreground placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

// ─── CommandList ──────────────────────────────────────────────────────────────

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-60 overflow-y-auto overflow-x-hidden p-1", className)}
    {...props}
  />
));
CommandList.displayName = "CommandList";

// ─── CommandEmpty ─────────────────────────────────────────────────────────────

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-6 text-center text-body-sm text-muted-foreground", className)}
    {...props}
  />
));
CommandEmpty.displayName = "CommandEmpty";

// ─── CommandGroup ─────────────────────────────────────────────────────────────

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5",
      "[&_[cmdk-group-heading]]:text-caption [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

// ─── CommandSeparator ─────────────────────────────────────────────────────────

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = "CommandSeparator";

// ─── CommandItem ──────────────────────────────────────────────────────────────

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5",
      "text-body-sm font-sans text-foreground outline-none gap-2",
      "data-[selected=true]:bg-accent",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

// ─── CommandCheckItem — item with check indicator (for combobox selected state) ──

interface CommandCheckItemProps extends React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  selected?: boolean;
}

const CommandCheckItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  CommandCheckItemProps
>(({ className, selected, children, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 pr-8",
      "text-body-sm font-sans text-foreground outline-none",
      "data-[selected=true]:bg-accent",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    {selected && (
      <span className="absolute right-2 flex items-center justify-center">
        <Check size={14} />
      </span>
    )}
  </CommandPrimitive.Item>
));
CommandCheckItem.displayName = "CommandCheckItem";

export {
  ComboboxAnchor, ComboboxTrigger, ComboboxContent,
  Command, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandSeparator,
  CommandItem, CommandCheckItem,
};
