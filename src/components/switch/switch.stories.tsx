import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { Label } from "@/components/label/label";

const meta: Meta<typeof Switch> = {
  title: "Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Switch do Hubble DS. Toggle on/off. Trilho usa primary quando ativo, input-border quando inativo.",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[120px_1fr] gap-3">
        <span />
        <div className="flex gap-8">
          {(["Off", "On"] as const).map((l) => (
            <span key={l} className="text-caption text-muted-foreground w-14 text-center">{l}</span>
          ))}
        </div>
      </div>

      {(["default", "disabled"] as const).map((state) => (
        <div key={state} className="grid grid-cols-[120px_1fr] items-center gap-3">
          <span className="text-caption text-muted-foreground">{state}</span>
          <div className="flex gap-8">
            <div className="w-14 flex justify-center">
              <Switch disabled={state === "disabled"} />
            </div>
            <div className="w-14 flex justify-center">
              <Switch checked disabled={state === "disabled"} />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Switch id="notif" />
        <Label htmlFor="notif">Ativar notificações</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="dark" defaultChecked />
        <Label htmlFor="dark">Modo escuro</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="disabled-sw" disabled />
        <Label htmlFor="disabled-sw" className="text-muted-foreground">Opção desabilitada</Label>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
