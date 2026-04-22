import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "./calendar";
import { DatePicker, DateRangePicker } from "./date-picker";

const meta: Meta = {
  title: "Data Display/Calendar & Date Picker",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Calendário e seletor de datas. Baseado em React Day Picker v9 com localização pt-BR.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Calendar inline ──────────────────────────────────────────────────────────

export const CalendarSingle: Story = {
  name: "Calendar — seleção simples",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="rounded-md border border-border w-fit">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const CalendarMultiple: Story = {
  name: "Calendar — múltiplas datas",
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([new Date()]);
    return (
      <div className="rounded-md border border-border w-fit">
        <Calendar mode="multiple" selected={dates} onSelect={setDates} />
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const CalendarRange: Story = {
  name: "Calendar — intervalo",
  render: () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 6);
    const [range, setRange] = useState<DateRange | undefined>({ from: today, to: nextWeek });
    return (
      <div className="rounded-md border border-border w-fit">
        <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const CalendarDisabled: Story = {
  name: "Calendar — com dias desabilitados",
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    return (
      <div className="rounded-md border border-border w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={[
            { before: today },
            { dayOfWeek: [0, 6] },
          ]}
        />
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

// ─── Date Picker ──────────────────────────────────────────────────────────────

export const DatePickerSingle: Story = {
  name: "Date Picker — simples",
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <DatePicker value={date} onChange={setDate} />;
  },
  parameters: { controls: { disable: true } },
};

export const DatePickerWithValue: Story = {
  name: "Date Picker — com valor inicial",
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DatePicker value={date} onChange={setDate} />;
  },
  parameters: { controls: { disable: true } },
};

export const DatePickerRange: Story = {
  name: "Date Picker — intervalo",
  render: () => {
    const [range, setRange] = useState<DateRange | undefined>();
    return <DateRangePicker value={range} onChange={setRange} />;
  },
  parameters: { controls: { disable: true } },
};

export const DatePickerDisabled: Story = {
  name: "Date Picker — desabilitado",
  render: () => <DatePicker value={new Date()} disabled />,
  parameters: { controls: { disable: true } },
};
