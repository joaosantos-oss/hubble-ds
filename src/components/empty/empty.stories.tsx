import type { Meta, StoryObj } from "@storybook/react";
import { FolderOpen, MagnifyingGlass, WifiSlash, Database, WarningCircle } from "@phosphor-icons/react";
import { Empty } from "./empty";
import { Button } from "@/components/button/button";

const meta: Meta<typeof Empty> = {
  title: "Feedback/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Estado vazio para listas, tabelas e resultados de busca.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Empty>;

export const Default: Story = {
  name: "Sem resultados",
  render: () => (
    <Empty
      icon={FolderOpen}
      title="Nenhum item encontrado"
      description="Não há itens para exibir no momento. Crie um novo item para começar."
      action={<Button size="small">Criar item</Button>}
    />
  ),
  parameters: { controls: { disable: true } },
};

export const SearchEmpty: Story = {
  name: "Busca sem resultado",
  render: () => (
    <Empty
      icon={MagnifyingGlass}
      title="Nenhum resultado para sua busca"
      description='Tente outros termos ou remova os filtros aplicados.'
    />
  ),
  parameters: { controls: { disable: true } },
};

export const Offline: Story = {
  name: "Sem conexão",
  render: () => (
    <Empty
      icon={WifiSlash}
      title="Sem conexão"
      description="Verifique sua conexão com a internet e tente novamente."
      action={<Button variant="outline" size="small">Tentar novamente</Button>}
    />
  ),
  parameters: { controls: { disable: true } },
};

export const NoData: Story = {
  name: "Sem dados",
  render: () => (
    <Empty
      icon={Database}
      title="Nenhum dado disponível"
      description="Os dados serão exibidos aqui assim que estiverem disponíveis."
    />
  ),
  parameters: { controls: { disable: true } },
};

export const WithoutIcon: Story = {
  name: "Sem ícone",
  render: () => (
    <Empty
      title="Lista vazia"
      description="Adicione itens para que eles apareçam aqui."
      action={<Button size="small">Adicionar</Button>}
    />
  ),
  parameters: { controls: { disable: true } },
};

export const Error: Story = {
  name: "Estado de erro",
  render: () => (
    <Empty
      icon={WarningCircle}
      title="Ocorreu um erro"
      description="Não foi possível carregar os dados. Por favor, tente novamente."
      action={
        <div className="flex gap-2">
          <Button variant="outline" size="small">Cancelar</Button>
          <Button size="small">Recarregar</Button>
        </div>
      }
    />
  ),
  parameters: { controls: { disable: true } },
};
