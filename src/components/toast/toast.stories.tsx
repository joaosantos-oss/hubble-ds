import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "./toast";
import { Button } from "@/components/button/button";

const meta: Meta = {
  title: "Overlays/Toast",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Notificações não-intrusivas via Sonner. Inclua <Toaster /> uma vez no root da aplicação.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const WithToaster = ({ children }: { children: React.ReactNode }) => (
  <>
    <Toaster position="bottom-right" richColors={false} />
    {children}
  </>
);

export const Default: Story = {
  name: "Toast padrão",
  render: () => (
    <WithToaster>
      <Button variant="outline" onClick={() => toast("Operação realizada com sucesso.")}>
        Mostrar toast
      </Button>
    </WithToaster>
  ),
  parameters: { controls: { disable: true } },
};

export const WithDescription: Story = {
  name: "Com descrição",
  render: () => (
    <WithToaster>
      <Button
        variant="outline"
        onClick={() =>
          toast("Arquivo salvo", {
            description: "Suas alterações foram salvas automaticamente.",
          })
        }
      >
        Toast com descrição
      </Button>
    </WithToaster>
  ),
  parameters: { controls: { disable: true } },
};

export const Types: Story = {
  name: "Tipos",
  render: () => (
    <WithToaster>
      <div className="flex flex-wrap gap-2">
        <Button size="small" onClick={() => toast.success("Operação concluída com sucesso!")}>
          Sucesso
        </Button>
        <Button size="small" variant="destructive" onClick={() => toast.error("Ocorreu um erro inesperado.")}>
          Erro
        </Button>
        <Button size="small" variant="secondary" onClick={() => toast.warning("Atenção: verifique os dados.")}>
          Alerta
        </Button>
        <Button size="small" variant="outline" onClick={() => toast.info("Nova atualização disponível.")}>
          Info
        </Button>
      </div>
    </WithToaster>
  ),
  parameters: { controls: { disable: true } },
};

export const WithAction: Story = {
  name: "Com ação",
  render: () => (
    <WithToaster>
      <Button
        variant="outline"
        onClick={() =>
          toast("Item excluído", {
            description: "O item foi removido permanentemente.",
            action: { label: "Desfazer", onClick: () => {} },
          })
        }
      >
        Toast com ação
      </Button>
    </WithToaster>
  ),
  parameters: { controls: { disable: true } },
};

export const WithPromise: Story = {
  name: "Com promise",
  render: () => (
    <WithToaster>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
              loading: "Salvando...",
              success: "Dados salvos com sucesso!",
              error: "Erro ao salvar os dados.",
            }
          )
        }
      >
        Toast promise
      </Button>
    </WithToaster>
  ),
  parameters: { controls: { disable: true } },
};
