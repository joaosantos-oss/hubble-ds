import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "@/components/input/input";

const meta: Meta<typeof Label> = {
  title: "Inputs/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Label de formulário do Hubble DS. Sempre body medium. Use htmlFor para associar ao campo.",
      },
    },
  },
  argTypes: {
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: { children: "Endereço de e-mail" },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 max-w-sm">
      <Label htmlFor="demo-email">Endereço de e-mail</Label>
      <Input id="demo-email" type="email" placeholder="voce@exemplo.com" />
      <span className="font-sans text-caption text-muted-foreground">
        Nunca compartilharemos seu e-mail.
      </span>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 max-w-sm">
      <Label htmlFor="demo-err">E-mail</Label>
      <Input id="demo-err" type="email" defaultValue="email-invalido" hasError />
      <span className="font-sans text-caption text-destructive-foreground">
        Formato de e-mail inválido.
      </span>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
