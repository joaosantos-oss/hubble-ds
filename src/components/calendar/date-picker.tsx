import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { type DateRange } from "react-day-picker";
import { CalendarBlank } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover/popover";
import { Calendar } from "./calendar";

// ─── DatePicker (single) ──────────────────────────────────────────────────────

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function DatePicker({ value, onChange, placeholder = "Selecione uma data", disabled, className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarBlank size={14} className="shrink-0" />
          {value ? format(value, "dd/MM/yyyy", { locale: ptBR }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto flex flex-col gap-2 p-2" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

// ─── DateRangePicker ──────────────────────────────────────────────────────────

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

function DateRangePicker({ value, onChange, placeholder = "Selecione um intervalo", disabled, className }: DateRangePickerProps) {
  const label = React.useMemo(() => {
    if (!value) return null;
    if (value.from && value.to)
      return `${format(value.from, "dd/MM/yyyy", { locale: ptBR })} – ${format(value.to, "dd/MM/yyyy", { locale: ptBR })}`;
    if (value.from)
      return `${format(value.from, "dd/MM/yyyy", { locale: ptBR })} – ...`;
    return null;
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !label && "text-muted-foreground",
            className
          )}
        >
          <CalendarBlank size={14} className="shrink-0" />
          {label ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto flex flex-col gap-2 p-2" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker, type DateRange };
