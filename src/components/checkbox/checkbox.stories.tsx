import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Label } from "@/components/label/label";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof Checkbox> = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Checkbox do Hubble DS. 3 estados: unchecked, checked, indeterminate. Variantes: default (primary) e error.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["default", "error"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-3 mb-1">
        <span />
        {(["Unchecked", "Checked", "Indeterminate"] as const).map((l) => (
          <span key={l} className="text-caption text-muted-foreground text-center">{l}</span>
        ))}
      </div>

      {(["default", "error"] as const).map((variant) => (
        <>
          <div key={`${variant}-enabled`} className="grid grid-cols-[120px_repeat(3,1fr)] items-center gap-3">
            <span className="text-caption text-muted-foreground">{variant}</span>
            <div className="flex justify-center"><Checkbox variant={variant} /></div>
            <div className="flex justify-center"><Checkbox variant={variant} checked /></div>
            <div className="flex justify-center"><Checkbox variant={variant} indeterminate /></div>
          </div>
          <div key={`${variant}-disabled`} className="grid grid-cols-[120px_repeat(3,1fr)] items-center gap-3">
            <span className="text-caption text-muted-foreground">{variant} disabled</span>
            <div className="flex justify-center"><Checkbox variant={variant} disabled /></div>
            <div className="flex justify-center"><Checkbox variant={variant} checked disabled /></div>
            <div className="flex justify-center"><Checkbox variant={variant} indeterminate disabled /></div>
          </div>
        </>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">default</Typography>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Aceitar termos e condições</Label>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="newsletter" defaultChecked />
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="newsletter">Receber newsletter</Label>
            <Typography variant="caption" color="muted">Enviaremos novidades semanalmente.</Typography>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled-check" disabled />
          <Label htmlFor="disabled-check" className="text-muted-foreground">Opção desabilitada</Label>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">error</Typography>
        <div className="flex items-center gap-2">
          <Checkbox id="err1" variant="error" />
          <Label htmlFor="err1">Aceitar termos e condições</Label>
        </div>
        <Typography variant="caption" color="destructive">Você precisa aceitar os termos.</Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
