import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Typography } from "@/components/typography/typography";
import { Separator } from "@/components/separator/separator";

const meta: Meta<typeof ScrollArea> = {
  title: "Layout/Scroll Area",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Scroll Area do Hubble DS. Área de rolagem customizada com scrollbar estilizada. Suporta orientação vertical e horizontal.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const TAGS = [
  "React", "TypeScript", "Tailwind CSS", "Storybook", "Vite", "Radix UI",
  "Shadcn", "CVA", "ESLint", "Prettier", "Phosphor Icons", "Zod", "TanStack",
  "Zustand", "React Query", "Framer Motion", "Vitest", "Playwright",
];

export const Vertical: Story = {
  name: "Vertical",
  render: () => (
    <ScrollArea className="h-64 w-56 rounded-md border border-border">
      <div className="p-4">
        <Typography variant="label" className="mb-3">Tags</Typography>
        {TAGS.map((tag, i) => (
          <div key={tag}>
            <Typography variant="body-sm">{tag}</Typography>
            {i < TAGS.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  parameters: { controls: { disable: true } },
};

export const Horizontal: Story = {
  name: "Horizontal",
  render: () => (
    <ScrollArea className="w-72 whitespace-nowrap rounded-md border border-border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-muted"
          >
            <Typography variant="caption" color="muted">Item {i + 1}</Typography>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
  parameters: { controls: { disable: true } },
};

export const Both: Story = {
  name: "Vertical + Horizontal",
  render: () => (
    <ScrollArea className="h-48 w-72 rounded-md border border-border">
      <div className="w-[500px] p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 py-1">
            <Typography variant="caption" color="muted" className="w-6">{i + 1}</Typography>
            <Typography variant="body-sm">
              Linha {i + 1} — conteúdo de exemplo com texto mais longo para forçar o scroll horizontal
            </Typography>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
  parameters: { controls: { disable: true } },
};
