import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogBody, DialogFooter,
  DialogTitle, DialogDescription,
} from "./dialog";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";

const meta: Meta = {
  title: "Overlays/Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Janela modal com header (título + fechar), body e footer. Três variações de footer: botões à direita, preenchendo largura ou botão único.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const FooterRight: Story = {
  name: "Footer — 2 botões à direita",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar alterações</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Revise as informações antes de salvar. As alterações serão aplicadas imediatamente após a confirmação.
          </DialogDescription>
        </DialogBody>
        <DialogFooter variant="right">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: { controls: { disable: true } },
};

export const FooterFull: Story = {
  name: "Footer — 2 botões preenchendo largura",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir item</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Esta ação não pode ser desfeita. O item será removido permanentemente.
          </DialogDescription>
        </DialogBody>
        <DialogFooter variant="full">
          <Button variant="outline">Cancelar</Button>
          <Button variant="destructive">Excluir</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: { controls: { disable: true } },
};

export const FooterSingle: Story = {
  name: "Footer — 1 botão preenchendo largura",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informação importante</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Seu plano foi atualizado com sucesso. As novas funcionalidades já estão disponíveis na sua conta.
          </DialogDescription>
        </DialogBody>
        <DialogFooter variant="single">
          <Button>Entendido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: { controls: { disable: true } },
};

export const WithForm: Story = {
  name: "Com formulário",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="d-name">Nome</Label>
            <Input id="d-name" defaultValue="João Silva" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="d-email">E-mail</Label>
            <Input id="d-email" type="email" defaultValue="joao@exemplo.com" />
          </div>
        </DialogBody>
        <DialogFooter variant="right">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: { controls: { disable: true } },
};
