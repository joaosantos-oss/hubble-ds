import type { Meta, StoryObj } from "@storybook/react";
import {
  List, SquaresFour, Table,
  AlignLeft, AlignRight, TextAlignCenter, TextAlignJustify,
  TextB, TextItalic, TextUnderline,
  ArrowLeft, ArrowRight,
} from "@phosphor-icons/react";
import { ButtonGroup, ButtonGroupItem } from "./button-group";
import { Typography } from "@/components/typography/typography";

const ICON_SIZE: Record<string, number> = { large: 20, default: 16, small: 16 };

const meta: Meta<typeof ButtonGroup> = {
  title: "Actions/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grupo de botões do Hubble DS. Variantes outline e ghost, tamanhos large/default/small, suporte a icon only e estado ativo. Ícones são passados como children.",
      },
    },
  },
  argTypes: {
    variant:   { control: "select", options: ["outline", "ghost"] },
    size:      { control: "select", options: ["large", "default", "small"] },
    // story-level args
    iconOnly:  { control: "boolean", description: "Modo icon-only (apenas para preview)" },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup & { iconOnly?: boolean }>;

export const Default: Story = {
  args: { variant: "outline", size: "default", iconOnly: false },
  render: ({ iconOnly, size = "default", ...args }) => {
    const px = ICON_SIZE[size] ?? 16;
    return iconOnly ? (
      <ButtonGroup size={size} {...args}>
        <ButtonGroupItem iconOnly><List size={px} /></ButtonGroupItem>
        <ButtonGroupItem iconOnly active><SquaresFour size={px} /></ButtonGroupItem>
        <ButtonGroupItem iconOnly><Table size={px} /></ButtonGroupItem>
      </ButtonGroup>
    ) : (
      <ButtonGroup size={size} {...args}>
        <ButtonGroupItem>Dia</ButtonGroupItem>
        <ButtonGroupItem>Semana</ButtonGroupItem>
        <ButtonGroupItem active>Mês</ButtonGroupItem>
        <ButtonGroupItem>Ano</ButtonGroupItem>
      </ButtonGroup>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">outline</Typography>
        <ButtonGroup variant="outline">
          <ButtonGroupItem>Dia</ButtonGroupItem>
          <ButtonGroupItem active>Semana</ButtonGroupItem>
          <ButtonGroupItem>Mês</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">ghost</Typography>
        <ButtonGroup variant="ghost">
          <ButtonGroupItem>Dia</ButtonGroupItem>
          <ButtonGroupItem active>Semana</ButtonGroupItem>
          <ButtonGroupItem>Mês</ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["large", "default", "small"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Typography variant="caption" color="muted">{size}</Typography>
          <ButtonGroup variant="outline" size={size}>
            <ButtonGroupItem>Dia</ButtonGroupItem>
            <ButtonGroupItem active>Semana</ButtonGroupItem>
            <ButtonGroupItem>Mês</ButtonGroupItem>
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["outline", "ghost"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-4">
          <Typography variant="caption" color="muted">{variant}</Typography>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <Typography variant="caption" color="muted">default</Typography>
              <ButtonGroup variant={variant}>
                <ButtonGroupItem>Opção A</ButtonGroupItem>
                <ButtonGroupItem>Opção B</ButtonGroupItem>
                <ButtonGroupItem>Opção C</ButtonGroupItem>
              </ButtonGroup>
            </div>
            <div className="flex flex-col gap-1.5">
              <Typography variant="caption" color="muted">active</Typography>
              <ButtonGroup variant={variant}>
                <ButtonGroupItem>Opção A</ButtonGroupItem>
                <ButtonGroupItem active>Opção B</ButtonGroupItem>
                <ButtonGroupItem>Opção C</ButtonGroupItem>
              </ButtonGroup>
            </div>
            <div className="flex flex-col gap-1.5">
              <Typography variant="caption" color="muted">disabled</Typography>
              <ButtonGroup variant={variant}>
                <ButtonGroupItem>Opção A</ButtonGroupItem>
                <ButtonGroupItem disabled>Opção B</ButtonGroupItem>
                <ButtonGroupItem>Opção C</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Typography variant="caption" color="muted">outline</Typography>
        <div className="flex flex-col gap-3">
          {(["large", "default", "small"] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <Typography variant="caption" color="muted" className="w-16">{size}</Typography>
              <ButtonGroup variant="outline" size={size}>
                <ButtonGroupItem iconOnly><List size={size === "large" ? 20 : 16} /></ButtonGroupItem>
                <ButtonGroupItem iconOnly active><SquaresFour size={size === "large" ? 20 : 16} /></ButtonGroupItem>
                <ButtonGroupItem iconOnly><Table size={size === "large" ? 20 : 16} /></ButtonGroupItem>
              </ButtonGroup>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Typography variant="caption" color="muted">ghost</Typography>
        <div className="flex flex-col gap-3">
          {(["large", "default", "small"] as const).map((size) => (
            <div key={size} className="flex items-center gap-4">
              <Typography variant="caption" color="muted" className="w-16">{size}</Typography>
              <ButtonGroup variant="ghost" size={size}>
                <ButtonGroupItem iconOnly><AlignLeft size={size === "large" ? 20 : 16} /></ButtonGroupItem>
                <ButtonGroupItem iconOnly active><TextAlignCenter size={size === "large" ? 20 : 16} /></ButtonGroupItem>
                <ButtonGroupItem iconOnly><AlignRight size={size === "large" ? 20 : 16} /></ButtonGroupItem>
                <ButtonGroupItem iconOnly><TextAlignJustify size={size === "large" ? 20 : 16} /></ButtonGroupItem>
              </ButtonGroup>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIconAndText: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">formatação de texto</Typography>
        <ButtonGroup variant="outline">
          <ButtonGroupItem><TextB size={16} />Negrito</ButtonGroupItem>
          <ButtonGroupItem active><TextItalic size={16} />Itálico</ButtonGroupItem>
          <ButtonGroupItem><TextUnderline size={16} />Sublinhado</ButtonGroupItem>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">navegação</Typography>
        <ButtonGroup variant="outline">
          <ButtonGroupItem><ArrowLeft size={16} />Anterior</ButtonGroupItem>
          <ButtonGroupItem>Próximo<ArrowRight size={16} /></ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
