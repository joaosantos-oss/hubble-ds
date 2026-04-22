import type { Meta, StoryObj } from "@storybook/react";
import {
  MagnifyingGlass, Envelope, Eye, EyeSlash, Lock,
  ArrowRight, Globe, CurrencyDollar, At,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Input } from "./input";
import { FileInput } from "./file-input";
import {
  InputGroup, InputGroupInput, InputGroupTextarea,
  InputGroupAddon, InputGroupText, InputGroupButton, InputGroupSeparator,
} from "./input-group";
import { Label } from "@/components/label/label";
import { Typography } from "@/components/typography/typography";

const meta: Meta<typeof Input> = {
  title: "Inputs/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componentes de texto do Hubble DS. Input simples ou composto via InputGroup para ícones, prefixos, botões e áreas de texto com ações.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text" },
    disabled:    { control: "boolean" },
    hasError:    { control: "boolean" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "url"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Input simples ────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { placeholder: "Placeholder", type: "text" },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">default</Typography>
        <Input placeholder="Placeholder" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">filled</Typography>
        <Input defaultValue="Valor preenchido" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">error</Typography>
        <Input placeholder="Placeholder" hasError />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">disabled</Typography>
        <Input placeholder="Placeholder" disabled />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email-field">E-mail</Label>
        <Input id="email-field" type="email" placeholder="voce@exemplo.com" />
        <Typography variant="caption" color="muted">Nunca compartilharemos seu e-mail.</Typography>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="error-field">E-mail</Label>
        <Input id="error-field" type="email" defaultValue="email-invalido" hasError />
        <Typography variant="caption" color="destructive">Formato de e-mail inválido.</Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const FileInputStory: Story = {
  name: "File input",
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">default</Typography>
        <FileInput />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">accept imagens</Typography>
        <FileInput accept="image/*" buttonLabel="Escolher imagem" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">múltiplos arquivos</Typography>
        <FileInput multiple placeholder="Nenhum arquivo selecionado" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">error</Typography>
        <FileInput hasError />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">disabled</Typography>
        <FileInput disabled />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── InputGroup ───────────────────────────────────────────────────────────────

export const GroupWithIcon: Story = {
  name: "InputGroup — ícone",
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">ícone esquerdo</Typography>
        <InputGroup>
          <InputGroupAddon><MagnifyingGlass size={16} /></InputGroupAddon>
          <InputGroupInput placeholder="Buscar..." />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">ícone direito</Typography>
        <InputGroup>
          <InputGroupInput type="email" placeholder="voce@exemplo.com" />
          <InputGroupAddon><Envelope size={16} /></InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">ícone esquerdo e direito</Typography>
        <InputGroup>
          <InputGroupAddon><Lock size={16} /></InputGroupAddon>
          <InputGroupInput type="password" placeholder="Senha" />
          <InputGroupAddon><Eye size={16} /></InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">error</Typography>
        <InputGroup hasError>
          <InputGroupAddon><Envelope size={16} /></InputGroupAddon>
          <InputGroupInput type="email" defaultValue="email-invalido" />
        </InputGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const GroupWithText: Story = {
  name: "InputGroup — prefixo / sufixo",
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">prefixo texto</Typography>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupSeparator />
          <InputGroupInput placeholder="exemplo.com" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">prefixo ícone + sufixo texto</Typography>
        <InputGroup>
          <InputGroupAddon><Globe size={16} /></InputGroupAddon>
          <InputGroupInput placeholder="exemplo.com" />
          <InputGroupSeparator />
          <InputGroupAddon>
            <InputGroupText>.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">prefixo símbolo</Typography>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText><CurrencyDollar size={16} /></InputGroupText>
          </InputGroupAddon>
          <InputGroupSeparator />
          <InputGroupInput type="number" placeholder="0,00" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">prefixo @</Typography>
        <InputGroup>
          <InputGroupAddon><At size={16} /></InputGroupAddon>
          <InputGroupInput placeholder="usuario" />
        </InputGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const GroupWithButton: Story = {
  name: "InputGroup — botão",
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">botão direito</Typography>
        <InputGroup>
          <InputGroupAddon><MagnifyingGlass size={16} /></InputGroupAddon>
          <InputGroupInput placeholder="Buscar..." />
          <InputGroupSeparator />
          <InputGroupAddon>
            <InputGroupButton><ArrowRight size={16} /></InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">botão com texto</Typography>
        <InputGroup>
          <InputGroupInput placeholder="voce@exemplo.com" />
          <InputGroupSeparator />
          <InputGroupAddon>
            <InputGroupButton>Assinar</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">toggle senha</Typography>
        <PasswordExample />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

function PasswordExample() {
  const [show, setShow] = useState(false);
  return (
    <InputGroup>
      <InputGroupAddon><Lock size={16} /></InputGroupAddon>
      <InputGroupInput type={show ? "text" : "password"} placeholder="Senha" />
      <InputGroupSeparator />
      <InputGroupAddon>
        <InputGroupButton onClick={() => setShow(!show)} type="button">
          {show ? <EyeSlash size={16} /> : <Eye size={16} />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export const GroupTextarea: Story = {
  name: "InputGroup — textarea com ações",
  render: () => (
    <div className="flex flex-col gap-3 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">textarea + ação inferior</Typography>
        <InputGroup className="flex-col">
          <InputGroupTextarea placeholder="Digite sua mensagem..." rows={3} />
          <InputGroupAddon side="bottom">
            <InputGroupButton type="button">Cancelar</InputGroupButton>
            <div className="ml-auto">
              <InputGroupButton type="button">
                Enviar <ArrowRight size={16} />
              </InputGroupButton>
            </div>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">error</Typography>
        <InputGroup hasError className="flex-col">
          <InputGroupTextarea placeholder="Digite sua mensagem..." rows={3} />
          <InputGroupAddon side="bottom">
            <InputGroupButton>Enviar</InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
