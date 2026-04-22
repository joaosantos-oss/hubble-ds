import type { Meta, StoryObj } from "@storybook/react";
import {
  TextB, TextItalic, TextUnderline,
  AlignLeft, AlignRight, TextAlignCenter,
  Star, Bell, BookmarkSimple,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { Toggle, ToggleGroup, ToggleGroupItem } from "./toggle";
import { Typography } from "@/components/typography/typography";

const ICON_OPTIONS_REQUIRED: Record<string, PhosphorIcon> = {
  Star, Bell, BookmarkSimple, TextB, AlignLeft,
};

const meta: Meta<typeof Toggle> = {
  title: "Inputs/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Toggle e ToggleGroup do Hubble DS. Toggle é um botão com estado on/off. ToggleGroup agrupa toggles com seleção única ou múltipla.",
      },
    },
  },
  argTypes: {
    variant:  { control: "select", options: ["outline", "ghost"] },
    size:     { control: "select", options: ["large", "medium", "small", "mini"] },
    iconOnly: { control: "boolean" },
    pressed:  { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text", if: { arg: "iconOnly", truthy: false } },
    icon: {
      control: "select",
      options: Object.keys(ICON_OPTIONS_REQUIRED),
      mapping: ICON_OPTIONS_REQUIRED,
      description: "Ícone (usado quando iconOnly = true)",
      if: { arg: "iconOnly", truthy: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle & { icon?: PhosphorIcon }>;

// ─── Toggle ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { variant: "outline", size: "medium", iconOnly: false, children: "Toggle", icon: Star },
  render: ({ icon, iconOnly, size = "medium", children, ...args }) => {
    const Icon = icon;
    const px = size === "large" ? 20 : size === "mini" ? 12 : 16;
    if (iconOnly && Icon) {
      return <Toggle size={size} iconOnly aria-label="toggle" {...args}><Icon size={px} /></Toggle>;
    }
    return <Toggle size={size} iconOnly={false} {...args}>{children}</Toggle>;
  },
};

export const ToggleVariants: Story = {
  name: "Toggle — variantes",
  render: () => (
    <div className="flex flex-col gap-6">
      {(["outline", "ghost"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <Typography variant="caption" color="muted">{variant}</Typography>
          <div className="flex flex-wrap items-center gap-3">
            <Toggle variant={variant}>Off</Toggle>
            <Toggle variant={variant} pressed>On</Toggle>
            <Toggle variant={variant} disabled>Disabled</Toggle>
            <Toggle variant={variant} iconOnly aria-label="star">
              <Star size={16} />
            </Toggle>
            <Toggle variant={variant} pressed iconOnly aria-label="star">
              <Star size={16} />
            </Toggle>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const ToggleSizes: Story = {
  name: "Toggle — tamanhos",
  render: () => (
    <div className="flex flex-col gap-4">
      {(["large", "medium", "small", "mini"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Typography variant="caption" color="muted">{size}</Typography>
          <div className="flex items-center gap-3">
            <Toggle size={size}><Bell size={size === "large" ? 20 : size === "mini" ? 12 : 16} />Notificações</Toggle>
            <Toggle size={size} pressed><Bell size={size === "large" ? 20 : size === "mini" ? 12 : 16} />Notificações</Toggle>
            <Toggle size={size} iconOnly aria-label="notificações">
              <Bell size={size === "large" ? 20 : size === "mini" ? 12 : 16} />
            </Toggle>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── ToggleGroup ──────────────────────────────────────────────────────────────

export const GroupSingle: Story = {
  name: "ToggleGroup — seleção única",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">outline — vista</Typography>
        <ToggleGroup type="single" defaultValue="semana">
          <ToggleGroupItem value="dia">Dia</ToggleGroupItem>
          <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
          <ToggleGroupItem value="mes">Mês</ToggleGroupItem>
          <ToggleGroupItem value="ano">Ano</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">outline — alinhamento (icon only)</Typography>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left"   iconOnly aria-label="alinhar esquerda"><AlignLeft size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="center" iconOnly aria-label="alinhar centro"><TextAlignCenter size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="right"  iconOnly aria-label="alinhar direita"><AlignRight size={16} /></ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">ghost — alinhamento</Typography>
        <ToggleGroup type="single" variant="ghost" defaultValue="center">
          <ToggleGroupItem value="left"   iconOnly aria-label="alinhar esquerda"><AlignLeft size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="center" iconOnly aria-label="alinhar centro"><TextAlignCenter size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="right"  iconOnly aria-label="alinhar direita"><AlignRight size={16} /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const GroupMultiple: Story = {
  name: "ToggleGroup — seleção múltipla",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">outline — formatação com texto</Typography>
        <ToggleGroup type="multiple" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold"><TextB size={16} />Negrito</ToggleGroupItem>
          <ToggleGroupItem value="italic"><TextItalic size={16} />Itálico</ToggleGroupItem>
          <ToggleGroupItem value="underline"><TextUnderline size={16} />Sublinhado</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">ghost — formatação (icon only)</Typography>
        <ToggleGroup type="multiple" variant="ghost" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold"      iconOnly aria-label="negrito"><TextB size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="italic"    iconOnly aria-label="itálico"><TextItalic size={16} /></ToggleGroupItem>
          <ToggleGroupItem value="underline" iconOnly aria-label="sublinhado"><TextUnderline size={16} /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const GroupSizes: Story = {
  name: "ToggleGroup — tamanhos",
  render: () => (
    <div className="flex flex-col gap-4">
      {(["large", "medium", "small", "mini"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <Typography variant="caption" color="muted" className="w-16">{size}</Typography>
          <ToggleGroup type="single" size={size} defaultValue="b">
            <ToggleGroupItem value="a">Opção A</ToggleGroupItem>
            <ToggleGroupItem value="b">Opção B</ToggleGroupItem>
            <ToggleGroupItem value="c">Opção C</ToggleGroupItem>
          </ToggleGroup>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const GroupDisabled: Story = {
  name: "ToggleGroup — disabled",
  render: () => (
    <div className="flex flex-col gap-3">
      <ToggleGroup type="single" defaultValue="b" disabled>
        <ToggleGroupItem value="a">Opção A</ToggleGroupItem>
        <ToggleGroupItem value="b">Opção B</ToggleGroupItem>
        <ToggleGroupItem value="c">Opção C</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="multiple" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold"      iconOnly aria-label="negrito"><TextB size={16} /></ToggleGroupItem>
        <ToggleGroupItem value="italic"    iconOnly disabled aria-label="itálico"><TextItalic size={16} /></ToggleGroupItem>
        <ToggleGroupItem value="underline" iconOnly aria-label="sublinhado"><TextUnderline size={16} /></ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
