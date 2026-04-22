import type { Meta, StoryObj } from "@storybook/react";
import { Bell, User, CreditCard, Gear, Shield } from "@phosphor-icons/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Tabs do Hubble DS. Variante default (pill) e line (underline com borda primária).",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// ─── Default (pill) ───────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="conta" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="conta">Conta</TabsTrigger>
        <TabsTrigger value="senha">Senha</TabsTrigger>
        <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
      </TabsList>
      <TabsContent value="conta">
        <Typography variant="body-sm" color="muted">Gerencie as informações da sua conta.</Typography>
      </TabsContent>
      <TabsContent value="senha">
        <Typography variant="body-sm" color="muted">Altere sua senha de acesso.</Typography>
      </TabsContent>
      <TabsContent value="notificacoes">
        <Typography variant="body-sm" color="muted">Configure suas preferências de notificação.</Typography>
      </TabsContent>
    </Tabs>
  ),
  parameters: { controls: { disable: true } },
};

export const Line: Story = {
  name: "Variante line",
  render: () => (
    <Tabs defaultValue="conta" className="w-full max-w-lg">
      <TabsList variant="line">
        <TabsTrigger value="conta">Conta</TabsTrigger>
        <TabsTrigger value="senha">Senha</TabsTrigger>
        <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
      </TabsList>
      <TabsContent value="conta">
        <Typography variant="body-sm" color="muted">Gerencie as informações da sua conta.</Typography>
      </TabsContent>
      <TabsContent value="senha">
        <Typography variant="body-sm" color="muted">Altere sua senha de acesso.</Typography>
      </TabsContent>
      <TabsContent value="notificacoes">
        <Typography variant="body-sm" color="muted">Configure suas preferências de notificação.</Typography>
      </TabsContent>
    </Tabs>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIcons: Story = {
  name: "Com ícones",
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">default</Typography>
        <Tabs defaultValue="perfil">
          <TabsList>
            <TabsTrigger value="perfil"><User size={16} />Perfil</TabsTrigger>
            <TabsTrigger value="notificacoes"><Bell size={16} />Notificações</TabsTrigger>
            <TabsTrigger value="pagamento"><CreditCard size={16} />Pagamento</TabsTrigger>
          </TabsList>
          <TabsContent value="perfil"><Typography variant="body-sm" color="muted">Informações do perfil.</Typography></TabsContent>
          <TabsContent value="notificacoes"><Typography variant="body-sm" color="muted">Preferências de notificação.</Typography></TabsContent>
          <TabsContent value="pagamento"><Typography variant="body-sm" color="muted">Métodos de pagamento.</Typography></TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">line</Typography>
        <Tabs defaultValue="perfil">
          <TabsList variant="line">
            <TabsTrigger value="perfil"><User size={16} />Perfil</TabsTrigger>
            <TabsTrigger value="notificacoes"><Bell size={16} />Notificações</TabsTrigger>
            <TabsTrigger value="pagamento"><CreditCard size={16} />Pagamento</TabsTrigger>
          </TabsList>
          <TabsContent value="perfil"><Typography variant="body-sm" color="muted">Informações do perfil.</Typography></TabsContent>
          <TabsContent value="notificacoes"><Typography variant="body-sm" color="muted">Preferências de notificação.</Typography></TabsContent>
          <TabsContent value="pagamento"><Typography variant="body-sm" color="muted">Métodos de pagamento.</Typography></TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const States: Story = {
  name: "Estados — default / active / disabled",
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">default</Typography>
        <Tabs defaultValue="ativa">
          <TabsList>
            <TabsTrigger value="inativa">Inativa</TabsTrigger>
            <TabsTrigger value="ativa">Ativa</TabsTrigger>
            <TabsTrigger value="desabilitada" disabled>Desabilitada</TabsTrigger>
          </TabsList>
          <TabsContent value="inativa"><Typography variant="body-sm" color="muted">Aba inativa.</Typography></TabsContent>
          <TabsContent value="ativa"><Typography variant="body-sm" color="muted">Aba ativa.</Typography></TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">line</Typography>
        <Tabs defaultValue="ativa">
          <TabsList variant="line">
            <TabsTrigger value="inativa">Inativa</TabsTrigger>
            <TabsTrigger value="ativa">Ativa</TabsTrigger>
            <TabsTrigger value="desabilitada" disabled>Desabilitada</TabsTrigger>
          </TabsList>
          <TabsContent value="inativa"><Typography variant="body-sm" color="muted">Aba inativa.</Typography></TabsContent>
          <TabsContent value="ativa"><Typography variant="body-sm" color="muted">Aba ativa.</Typography></TabsContent>
        </Tabs>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithContent: Story = {
  name: "Com conteúdo",
  render: () => (
    <Tabs defaultValue="geral" className="w-full max-w-lg">
      <TabsList>
        <TabsTrigger value="geral"><Gear size={16} />Geral</TabsTrigger>
        <TabsTrigger value="notificacoes"><Bell size={16} />Notificações</TabsTrigger>
        <TabsTrigger value="conta"><User size={16} />Conta</TabsTrigger>
        <TabsTrigger value="seguranca"><Shield size={16} />Segurança</TabsTrigger>
      </TabsList>
      <TabsContent value="geral">
        <div className="flex flex-col gap-3 p-1">
          <Typography variant="label">Configurações gerais</Typography>
          <div className="flex flex-col gap-1">
            <Typography variant="body-sm">Idioma: Português (BR)</Typography>
            <Typography variant="body-sm">Fuso horário: GMT-3</Typography>
            <Typography variant="body-sm">Tema: Automático</Typography>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notificacoes">
        <div className="flex flex-col gap-3 p-1">
          <Typography variant="label">Preferências de notificação</Typography>
          <div className="flex flex-col gap-1">
            <Typography variant="body-sm">E-mail: Ativado</Typography>
            <Typography variant="body-sm">Push: Desativado</Typography>
            <Typography variant="body-sm">SMS: Ativado</Typography>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="conta">
        <div className="flex flex-col gap-3 p-1">
          <Typography variant="label">Dados da conta</Typography>
          <div className="flex flex-col gap-1">
            <Typography variant="body-sm">Nome: João Santos</Typography>
            <Typography variant="body-sm">E-mail: joao@magazord.com.br</Typography>
            <Typography variant="body-sm">Plano: Pro</Typography>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="seguranca">
        <div className="flex flex-col gap-3 p-1">
          <Typography variant="label">Segurança</Typography>
          <div className="flex flex-col gap-1">
            <Typography variant="body-sm">Autenticação de dois fatores: Ativa</Typography>
            <Typography variant="body-sm">Último acesso: hoje às 14h32</Typography>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: { controls: { disable: true } },
};
