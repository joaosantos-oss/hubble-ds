import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Skeleton do Hubble DS. Placeholder animado para conteúdo em carregamento.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
  parameters: { controls: { disable: true } },
};

export const Shapes: Story = {
  name: "Formas",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-10 w-full max-w-sm" />
      <Skeleton className="h-32 w-full max-w-sm" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Card: Story = {
  name: "Card skeleton",
  render: () => (
    <div className="flex flex-col gap-3 w-64 rounded-lg border border-border p-4">
      <Skeleton className="h-36 w-full rounded-md" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Table: Story = {
  name: "Table skeleton",
  render: () => (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <div className="flex gap-4 px-2 py-1.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-32 ml-auto" />
        <Skeleton className="h-3 w-20" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-md border border-border px-4 py-3">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-7 w-7 rounded-md" />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
