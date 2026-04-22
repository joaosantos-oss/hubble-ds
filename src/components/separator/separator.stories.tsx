import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof Separator> = {
  title: "Layout/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Separator do Hubble DS. Linha divisória horizontal ou vertical para separar conteúdo.",
      },
    },
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-64">
      <Separator {...args} />
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div>
        <Typography variant="label">Seção A</Typography>
        <Typography variant="body-sm" color="muted" className="mt-1">
          Conteúdo da primeira seção.
        </Typography>
      </div>
      <Separator />
      <div>
        <Typography variant="label">Seção B</Typography>
        <Typography variant="body-sm" color="muted" className="mt-1">
          Conteúdo da segunda seção.
        </Typography>
      </div>
      <Separator />
      <div>
        <Typography variant="label">Seção C</Typography>
        <Typography variant="body-sm" color="muted" className="mt-1">
          Conteúdo da terceira seção.
        </Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-8">
      <Typography variant="body-sm">Início</Typography>
      <Separator orientation="vertical" />
      <Typography variant="body-sm">Meio</Typography>
      <Separator orientation="vertical" />
      <Typography variant="body-sm">Fim</Typography>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const InCard: Story = {
  name: "Em card",
  render: () => (
    <div className="w-72 rounded-lg border border-border p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Typography variant="label">Perfil</Typography>
        <Typography variant="caption" color="muted">Editar</Typography>
      </div>
      <Separator />
      <div className="flex flex-col gap-1">
        <Typography variant="body-sm">João Santos</Typography>
        <Typography variant="caption" color="muted">joao@magazord.com.br</Typography>
      </div>
      <Separator />
      <div className="flex items-center gap-3">
        <Typography variant="caption" color="muted">Plano</Typography>
        <Separator orientation="vertical" className="h-3" />
        <Typography variant="caption">Pro</Typography>
        <Separator orientation="vertical" className="h-3" />
        <Typography variant="caption" color="muted">Ativo</Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
