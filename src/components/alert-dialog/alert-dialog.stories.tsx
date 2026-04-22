import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
} from "./alert-dialog";
import { Button } from "@/components/button/button";

const meta: Meta = {
  title: "Overlays/Alert Dialog",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Diálogo de confirmação de ações críticas. Bloqueia interação com o restante da página até ser respondido.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Padrão — botões à direita",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Abrir diálogo</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Os dados serão removidos permanentemente dos nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: { controls: { disable: true } },
};

export const Destructive: Story = {
  name: "Ação destrutiva",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Excluir conta</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir conta permanentemente?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar, sua conta e todos os dados associados serão excluídos e não poderão ser recuperados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: { controls: { disable: true } },
};

export const Mobile: Story = {
  name: "Mobile — centralizado, botões verticais",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Abrir diálogo mobile</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader className="items-center text-center sm:items-center sm:text-center">
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Os dados serão removidos permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col items-stretch sm:flex-col sm:items-stretch">
          <AlertDialogAction className="w-full sm:w-full">Confirmar</AlertDialogAction>
          <AlertDialogCancel className="w-full sm:w-full">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: { controls: { disable: true } },
};

export const WithCustomContent: Story = {
  name: "Com conteúdo customizado",
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Sair da sessão</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Encerrar sessão?</AlertDialogTitle>
          <AlertDialogDescription>
            Você será redirecionado para a tela de login e precisará autenticar novamente para acessar sua conta.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Permanecer</AlertDialogCancel>
          <AlertDialogAction variant="secondary">Sair</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: { controls: { disable: true } },
};
