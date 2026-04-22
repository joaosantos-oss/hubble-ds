import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Progress } from "./progress";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Progress bar do Hubble DS. Indica o progresso de uma operação. Altura fixa de 8px.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
};

export const Values: Story = {
  name: "Valores",
  render: () => (
    <div className="flex flex-col gap-3 w-72">
      {[0, 25, 50, 75, 100].map((v) => (
        <div key={v} className="flex items-center gap-3">
          <Typography variant="caption" color="muted" className="w-8 text-right">{v}%</Typography>
          <Progress value={v} className="flex-1" />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Animated: Story = {
  name: "Animado",
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setValue((v) => (v >= 100 ? 0 : v + 2));
      }, 80);
      return () => clearInterval(interval);
    }, []);
    return (
      <div className="flex flex-col gap-2 w-72">
        <Progress value={value} />
        <Typography variant="caption" color="muted">{value}%</Typography>
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};
