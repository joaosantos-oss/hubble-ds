import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "@/components/label/label";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof RadioGroupItem> = {
  title: "Inputs/Radio Group",
  component: RadioGroupItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "RadioGroup do Hubble DS. Unchecked: fundo background + borda. Checked: fundo sólido (foreground) + ponto background, sem borda. Variantes: default (primary) e error.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "error"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="op2">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="op1" id="op1" />
        <Label htmlFor="op1">Opção 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="op2" id="op2" />
        <Label htmlFor="op2">Opção 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="op3" id="op3" />
        <Label htmlFor="op3">Opção 3</Label>
      </div>
    </RadioGroup>
  ),
};

export const States: Story = {
  name: "States — default / error / disabled",
  render: () => {
    const cols = ["Unchecked", "Checked", "Disabled unchecked", "Disabled checked"] as const;
    const variants = ["default", "error"] as const;

    return (
      <div className="flex flex-col gap-2">
        {/* header */}
        <div className="grid grid-cols-[120px_repeat(4,1fr)] gap-3 mb-1">
          <span />
          {cols.map((l) => (
            <span key={l} className="text-caption text-muted-foreground text-center">{l}</span>
          ))}
        </div>

        {variants.map((variant) => (
          <div key={variant} className="grid grid-cols-[120px_repeat(4,1fr)] items-center gap-3">
            <span className="text-caption text-muted-foreground">{variant}</span>

            {/* unchecked */}
            <div className="flex justify-center">
              <RadioGroup>
                <RadioGroupItem value="x" variant={variant} />
              </RadioGroup>
            </div>

            {/* checked */}
            <div className="flex justify-center">
              <RadioGroup value="x">
                <RadioGroupItem value="x" variant={variant} />
              </RadioGroup>
            </div>

            {/* disabled unchecked */}
            <div className="flex justify-center">
              <RadioGroup>
                <RadioGroupItem value="x" variant={variant} disabled />
              </RadioGroup>
            </div>

            {/* disabled checked */}
            <div className="flex justify-center">
              <RadioGroup value="x">
                <RadioGroupItem value="x" variant={variant} disabled />
              </RadioGroup>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">default</Typography>
        <RadioGroup defaultValue="plan-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="plan-1" id="plan-1" />
            <Label htmlFor="plan-1">Plano básico</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="plan-2" id="plan-2" />
            <Label htmlFor="plan-2">Plano profissional</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="plan-3" id="plan-3" disabled />
            <Label htmlFor="plan-3" className="text-muted-foreground">Plano enterprise (indisponível)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">error</Typography>
        <RadioGroup>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="e1" id="e1" variant="error" />
            <Label htmlFor="e1">Opção inválida A</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="e2" id="e2" variant="error" />
            <Label htmlFor="e2">Opção inválida B</Label>
          </div>
        </RadioGroup>
        <Typography variant="caption" color="destructive">Selecione uma opção válida.</Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
