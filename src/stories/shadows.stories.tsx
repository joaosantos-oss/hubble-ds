import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundation/Shadows",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const SHADOWS = [
  { name: "shadow-2xs",           cls: "shadow-2xs" },
  { name: "shadow-xs",            cls: "shadow-xs" },
  { name: "shadow-sm",            cls: "shadow-sm" },
  { name: "shadow-md",            cls: "shadow-md" },
  { name: "shadow-lg",            cls: "shadow-lg" },
  { name: "shadow-xl",            cls: "shadow-xl" },
  { name: "shadow-2xl",           cls: "shadow-2xl" },
  { name: "shadow-focus-ring",       cls: "shadow-focus-ring" },
  { name: "shadow-focus-ring-error", cls: "shadow-focus-ring-error" },
] as const;

export const All: Story = {
  name: "Shadows",
  render: () => (
    <div className="flex flex-col gap-6">
      {SHADOWS.map(({ name, cls }) => (
        <div key={name} className="flex items-center gap-6">
          <span className="font-sans text-caption text-muted-foreground w-48 shrink-0">{name}</span>
          <div className={`w-24 h-12 rounded-md bg-background ${cls}`} />
        </div>
      ))}
    </div>
  ),
};
