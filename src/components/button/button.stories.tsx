import type { Meta, StoryObj } from "@storybook/react";
import {
  Plus, Trash, Download, ArrowRight, MagnifyingGlass,
  X, Check, Bell, PencilSimple, ArrowLeft,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { Button } from "./button";
import { Typography } from "@/components/typography/typography";

const ICON_OPTIONS: Record<string, PhosphorIcon | undefined> = {
  none:            undefined,
  Plus,
  Trash,
  Download,
  ArrowRight,
  ArrowLeft,
  MagnifyingGlass,
  X,
  Check,
  Bell,
  PencilSimple,
};

const ICON_OPTIONS_REQUIRED: Record<string, PhosphorIcon> = {
  Plus,
  Trash,
  Download,
  ArrowRight,
  ArrowLeft,
  MagnifyingGlass,
  X,
  Check,
  Bell,
  PencilSimple,
};

const ICON_SIZE: Record<string, number> = {
  large: 20, medium: 16, small: 16, mini: 12,
};

const meta: Meta<typeof Button> = {
  title: "Actions/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Botão de ação do Hubble DS. 5 variantes, 4 tamanhos, 4 estados (default, hover, focus, disabled). Ícones são passados como children.",
      },
    },
  },
  argTypes: {
    variant:  { control: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "link"] },
    size:     { control: "select", options: ["large", "medium", "small", "mini"] },
    iconOnly: { control: "boolean" },
    children: { control: "text", if: { arg: "iconOnly", truthy: false } },
    loading:  { control: "boolean" },
    disabled: { control: "boolean" },
    asChild:  { control: false },
    icon: {
      control: "select",
      options: Object.keys(ICON_OPTIONS_REQUIRED),
      mapping: ICON_OPTIONS_REQUIRED,
      description: "Ícone (usado quando iconOnly = true)",
      if: { arg: "iconOnly", truthy: true },
    },
    iconLeft: {
      control: "select",
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: "Ícone à esquerda",
      if: { arg: "iconOnly", truthy: false },
    },
    iconRight: {
      control: "select",
      options: Object.keys(ICON_OPTIONS),
      mapping: ICON_OPTIONS,
      description: "Ícone à direita",
      if: { arg: "iconOnly", truthy: false },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button & { icon?: PhosphorIcon; iconLeft?: PhosphorIcon; iconRight?: PhosphorIcon }>;

export const Default: Story = {
  args: { variant: "primary", size: "medium", iconOnly: false, children: "Button", icon: Plus, iconLeft: undefined, iconRight: undefined },
  render: ({ icon, iconLeft, iconRight, iconOnly, size = "medium", children, ...args }) => {
    const px    = ICON_SIZE[size] ?? 16;
    const Icon  = icon;
    const IconL = iconLeft;
    const IconR = iconRight;
    if (iconOnly && Icon) {
      return <Button size={size} iconOnly {...args}><Icon size={px} /></Button>;
    }
    return (
      <Button size={size} iconOnly={false} {...args}>
        {IconL && <IconL size={px} />}
        {children}
        {IconR && <IconR size={px} />}
      </Button>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const IconButton: Story = {
  name: "Icon Button",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">variantes</Typography>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary"     iconOnly><Plus size={16} /></Button>
          <Button variant="secondary"   iconOnly><MagnifyingGlass size={16} /></Button>
          <Button variant="outline"     iconOnly><Bell size={16} /></Button>
          <Button variant="ghost"       iconOnly><PencilSimple size={16} /></Button>
          <Button variant="destructive" iconOnly><Trash size={16} /></Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">tamanhos</Typography>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="large"  variant="outline" iconOnly><Plus size={20} /></Button>
          <Button size="medium" variant="outline" iconOnly><Plus size={16} /></Button>
          <Button size="small"  variant="outline" iconOnly><Plus size={16} /></Button>
          <Button size="mini"   variant="outline" iconOnly><Plus size={12} /></Button>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const LinkButton: Story = {
  name: "Link Button",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">tamanhos</Typography>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="link" size="large">Large</Button>
          <Button variant="link" size="medium">Medium</Button>
          <Button variant="link" size="small">Small</Button>
          <Button variant="link" size="mini">Mini</Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">com ícone</Typography>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="link"><ArrowLeft size={16} />Voltar</Button>
          <Button variant="link">Continuar<ArrowRight size={16} /></Button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">disabled</Typography>
        <Button variant="link" disabled>Link desabilitado</Button>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="large">Large</Button>
      <Button size="medium">Medium</Button>
      <Button size="small">Small</Button>
      <Button size="mini">Mini</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary"><Plus size={16} />New item</Button>
        <Button variant="secondary"><Download size={16} />Download</Button>
        <Button variant="outline">Continue<ArrowRight size={16} /></Button>
        <Button variant="ghost"><MagnifyingGlass size={16} />Search</Button>
        <Button variant="destructive"><Trash size={16} />Delete</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="large"><Plus size={20} />Large</Button>
        <Button size="medium"><Plus size={16} />Medium</Button>
        <Button size="small"><Plus size={16} />Small</Button>
        <Button size="mini"><Plus size={12} />Mini</Button>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

const HOVER_CLASS: Record<string, string> = {
  primary:     "bg-hover-primary",
  secondary:   "bg-hover-secondary",
  outline:     "bg-hover-outline",
  ghost:       "bg-hover-ghost",
  destructive: "bg-hover-destructive",
  link:        "underline",
};

export const States: Story = {
  name: "States — default / hover / focus / disabled",
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-3 mb-1">
        <span />
        {(["Default", "Hover", "Focus", "Disabled"] as const).map((label) => (
          <span key={label} className="text-caption text-muted-foreground text-center">{label}</span>
        ))}
      </div>
      {(["primary", "secondary", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
        <div key={variant} className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] items-center gap-3">
          <span className="text-caption text-muted-foreground">{variant}</span>
          <div className="flex justify-center">
            <Button variant={variant}>Button</Button>
          </div>
          <div className="flex justify-center">
            <Button variant={variant} className={HOVER_CLASS[variant]}>Button</Button>
          </div>
          <div className="flex justify-center">
            <Button variant={variant} className={variant === "destructive" ? "shadow-focus-ring-error" : "shadow-focus-ring"}>
              Button
            </Button>
          </div>
          <div className="flex justify-center">
            <Button variant={variant} disabled>Button</Button>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const AllSizesAllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      {(["primary", "secondary", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          <span className="text-caption text-muted-foreground w-24 shrink-0">{variant}</span>
          <Button variant={variant} size="large">Large</Button>
          <Button variant={variant} size="medium">Medium</Button>
          <Button variant={variant} size="small">Small</Button>
          <Button variant={variant} size="mini">Mini</Button>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button loading>Primary</Button>
      <Button variant="secondary" loading>Secondary</Button>
      <Button variant="outline" loading>Outline</Button>
      <Button variant="ghost" loading>Ghost</Button>
      <Button variant="destructive" loading>Destructive</Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
