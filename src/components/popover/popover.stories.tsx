import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverClose } from "./popover";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { X } from "@phosphor-icons/react";

const meta: Meta = {
  title: "Overlays/Popover",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Flutuante não-modal ancorado a um trigger. Ideal para formulários inline e menus contextuais.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Padrão",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Abrir popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-1">
          <p className="text-body-sm font-medium text-foreground">Dimensões</p>
          <p className="text-caption text-muted-foreground">Defina as dimensões do elemento.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: { controls: { disable: true } },
};

export const WithForm: Story = {
  name: "Com formulário inline",
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-0.5">
              <p className="text-body-sm font-medium text-foreground">Editar perfil</p>
              <p className="text-caption text-muted-foreground">Altere suas informações pessoais.</p>
            </div>
            <PopoverClose asChild>
              <Button variant="ghost" size="mini" iconOnly aria-label="Fechar">
                <X size={14} />
              </Button>
            </PopoverClose>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pop-name">Nome</Label>
              <Input id="pop-name" defaultValue="João Silva" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="pop-email">E-mail</Label>
              <Input id="pop-email" type="email" defaultValue="joao@exemplo.com" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button variant="outline" size="small">Cancelar</Button>
            </PopoverClose>
            <Button size="small">Salvar</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  parameters: { controls: { disable: true } },
};

export const Positions: Story = {
  name: "Posicionamento",
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-4 py-16">
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="small">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-48">
            <p className="text-caption text-muted-foreground">Popover posicionado em <strong>{side}</strong>.</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
