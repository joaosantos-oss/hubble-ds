import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerBody, DrawerFooter,
  DrawerTitle, DrawerDescription,
} from "./drawer";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";

const meta: Meta = {
  title: "Overlays/Drawer",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Painel deslizante. Right/Left: header + body + footer. Bottom: sem footer. Top: footer com comportamento de header (título + botões) posicionado embaixo.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Right: Story = {
  name: "Right — padrão",
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Configurações</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-4">
          <DrawerDescription>Ajuste as preferências da sua conta.</DrawerDescription>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dr-name">Nome</Label>
            <Input id="dr-name" defaultValue="João Silva" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dr-email">E-mail</Label>
            <Input id="dr-email" type="email" defaultValue="joao@exemplo.com" />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" className="flex-1">Cancelar</Button>
          <Button className="flex-1">Salvar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: { controls: { disable: true } },
};

export const Bottom: Story = {
  name: "Bottom — sem footer",
  render: () => (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir drawer bottom</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Detalhes do pedido</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="flex flex-col gap-3">
          <DrawerDescription>
            Revise as informações do pedido antes de prosseguir com o pagamento.
          </DrawerDescription>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dr-obs">Observações</Label>
            <Input id="dr-obs" placeholder="Sem cebola, por favor..." />
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
  parameters: { controls: { disable: true } },
};

export const Top: Story = {
  name: "Top — footer como header (título + botões)",
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir drawer top</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerBody>
          <DrawerDescription>
            Conteúdo do drawer a partir do topo. O footer abaixo contém o título e botões de ação.
          </DrawerDescription>
        </DrawerBody>
        <DrawerFooter variant="header-like">
          <DrawerTitle>Filtros aplicados</DrawerTitle>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="small">Fechar</Button>
            <Button size="small">Salvar</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: { controls: { disable: true } },
};

export const HeaderWithActions: Story = {
  name: "Header — com 2 botões de ação",
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir drawer com ações</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader
          variant="actions"
          actions={
            <>
              <Button variant="outline" size="small">Fechar</Button>
              <Button size="small">Salvar</Button>
            </>
          }
        >
          <DrawerTitle>Detalhes do produto</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <DrawerDescription>
            Visualize e edite as informações do produto selecionado.
          </DrawerDescription>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  ),
  parameters: { controls: { disable: true } },
};

export const Left: Story = {
  name: "Left",
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">Abrir drawer esquerda</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu lateral</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <DrawerDescription>Navegação e atalhos do sistema.</DrawerDescription>
        </DrawerBody>
        <DrawerFooter>
          <Button className="flex-1">Confirmar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: { controls: { disable: true } },
};
