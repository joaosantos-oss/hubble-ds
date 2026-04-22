import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider } from "./slider";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof Slider> = {
  title: "Inputs/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Slider do Hubble DS. Permite selecionar um valor ou intervalo em uma faixa contínua.",
      },
    },
  },
  argTypes: {
    min:      { control: "number" },
    max:      { control: "number" },
    step:     { control: "number" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: { defaultValue: [40], min: 0, max: 100, step: 1 },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  name: "Controlled",
  render: () => {
    const [value, setValue] = useState([30]);
    return (
      <div className="flex flex-col gap-3 w-64">
        <Slider value={value} onValueChange={setValue} min={0} max={100} />
        <Typography variant="caption" color="muted">Valor: {value[0]}</Typography>
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Range: Story = {
  name: "Range (dois thumbs)",
  render: () => {
    const [value, setValue] = useState([20, 70]);
    return (
      <div className="flex flex-col gap-3 w-64">
        <Slider value={value} onValueChange={setValue} min={0} max={100} />
        <Typography variant="caption" color="muted">
          {value[0]} — {value[1]}
        </Typography>
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const Steps: Story = {
  name: "Com steps",
  render: () => (
    <div className="flex flex-col gap-6 w-64">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">step 10</Typography>
        <Slider defaultValue={[40]} min={0} max={100} step={10} />
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">step 25</Typography>
        <Slider defaultValue={[25]} min={0} max={100} step={25} />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Slider defaultValue={[60]} disabled />
    </div>
  ),
  parameters: { controls: { disable: true } },
};
