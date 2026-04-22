import * as React from "react";
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { CaretLeft, CaretRight, CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/button/button";


export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  locale = ptBR,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn("group/calendar bg-background p-3", className)}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("pt-BR", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root:            cn("w-fit", defaultClassNames.root),
        months:          cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month:           cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav:             cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
        button_previous: cn(buttonVariants({ variant: "outline", size: "small", iconOnly: true }), "select-none aria-disabled:opacity-50", defaultClassNames.button_previous),
        button_next:     cn(buttonVariants({ variant: "outline", size: "small", iconOnly: true }), "select-none aria-disabled:opacity-50", defaultClassNames.button_next),
        month_caption:   cn("flex h-12 w-full items-center justify-center px-12", defaultClassNames.month_caption),
        dropdowns:       cn("flex h-12 w-full items-center justify-center gap-1.5 text-body-sm font-medium", defaultClassNames.dropdowns),
        dropdown_root:   cn("relative rounded-md border border-input has-focus:border-primary has-focus:shadow-focus-ring", defaultClassNames.dropdown_root),
        dropdown:        cn("absolute inset-0 bg-background opacity-0", defaultClassNames.dropdown),
        caption_label:   cn(
          "font-medium select-none text-body-sm font-sans text-foreground",
          captionLayout !== "label" && "flex h-8 items-center gap-1 rounded-md pr-1 pl-2 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label
        ),
        table:              "w-full border-collapse",
        weekdays:           cn("flex gap-1", defaultClassNames.weekdays),
        weekday:            cn("h-12 w-12 flex items-center justify-center text-caption font-normal text-muted-foreground select-none", defaultClassNames.weekday),
        week:               cn("mt-1 flex w-full gap-1", defaultClassNames.week),
        week_number_header: cn("w-12 select-none", defaultClassNames.week_number_header),
        week_number:        cn("text-caption text-muted-foreground select-none", defaultClassNames.week_number),
        day:                cn(
          "group/day relative p-0 text-center select-none",
          "[&:last-child[data-selected=true]_button]:rounded-r-md",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start:  cn("rounded-l-md bg-primary-accent", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end:    cn("rounded-r-md bg-primary-accent", defaultClassNames.range_end),
        today:        cn("rounded-md bg-accent-2 text-foreground data-[selected=true]:rounded-none", defaultClassNames.today),
        outside:      cn("text-muted-foreground aria-selected:text-muted-foreground", defaultClassNames.outside),
        disabled:     cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden:       cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className: cls, rootRef, ...p }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(cls)} {...p} />
        ),
        Chevron: ({ className: cls, orientation, ...p }) => {
          if (orientation === "left")  return <CaretLeft  className={cn("h-4 w-4", cls)} {...p} />;
          if (orientation === "right") return <CaretRight className={cn("h-4 w-4", cls)} {...p} />;
          return <CaretDown className={cn("h-4 w-4", cls)} {...p} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...p }) => (
          <td {...p}>
            <div className="flex h-12 w-12 items-center justify-center text-center">{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // size: 48×48
        "h-12 w-12 inline-flex items-center justify-center rounded-md",
        "font-sans text-body-sm font-normal text-foreground transition-colors select-none",
        "hover:bg-accent hover:text-foreground",
        "focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        // keyboard focus
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:shadow-focus-ring",
        // selected single
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[selected-single=true]:hover:bg-hover-primary data-[selected-single=true]:rounded-md",
        // range
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-start=true]:rounded-l-md data-[range-start=true]:rounded-r-none",
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground data-[range-end=true]:rounded-r-md data-[range-end=true]:rounded-l-none",
        "data-[range-middle=true]:bg-primary-accent data-[range-middle=true]:text-foreground data-[range-middle=true]:rounded-none",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}


export { Calendar, CalendarDayButton };
