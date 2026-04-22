import type { Meta, StoryObj } from "@storybook/react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./tooltip";
import { Button } from "@/components/button/button";
import { Plus, Info, Trash } from "@phosphor-icons/react";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof TooltipContent> = {
  title: "Overlays/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex items-center justify-center p-12">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tooltip do Hubble DS. Exibe informação contextual ao passar o mouse. Usa tokens tooltip — fundo escuro no light, claro no dark.",
      },
    },
  },
  argTypes: {
    side:   { control: "select", options: ["top", "right", "bottom", "left"] },
    align:  { control: "select", options: ["start", "center", "end"] },
  },
};

export default meta;
type Story = StoryObj<typeof TooltipContent>;

export const Default: Story = {
  args: { side: "top", align: "center", children: "Texto do tooltip" },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Passe o mouse</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

export const Sides: Story = {
  name: "Posições",
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="small">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIcons: Story = {
  name: "Com ícones",
  render: () => (
    <div className="flex items-center gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" iconOnly><Plus size={16} /></Button>
        </TooltipTrigger>
        <TooltipContent>Adicionar item</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" iconOnly><Info size={16} /></Button>
        </TooltipTrigger>
        <TooltipContent>Mais informações sobre este campo</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive" iconOnly><Trash size={16} /></Button>
        </TooltipTrigger>
        <TooltipContent>Excluir permanentemente</TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Disabled: Story = {
  name: "Trigger desabilitado",
  render: () => (
    <div className="flex flex-col gap-2 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>
            <Button variant="outline" disabled>Botão desabilitado</Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>Este botão está desabilitado</TooltipContent>
      </Tooltip>
      <Typography variant="caption" color="muted">
        Wrap em span para tooltip funcionar com elementos disabled
      </Typography>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
