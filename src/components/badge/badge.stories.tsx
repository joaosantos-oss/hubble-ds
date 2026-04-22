import type { Meta, StoryObj } from "@storybook/react";
import {
  Star, Check, Warning, X, Info, Bell, Plus,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { Badge } from "./badge";

const ICON_OPTIONS: Record<string, PhosphorIcon | undefined> = {
  none: undefined, Star, Check, Warning, X, Info, Bell, Plus,
};

const ICON_OPTIONS_REQUIRED: Record<string, PhosphorIcon> = {
  Star, Check, Warning, X, Info, Bell, Plus,
};

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Badge do Hubble DS. 7 variantes, 2 formatos (default 8px / rounded). Ícones são passados como children. Use iconOnly para o modo compacto quadrado.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "destructive", "warning", "success"],
    },
    format:   { control: "select", options: ["default", "rounded"] },
    iconOnly: { control: "boolean" },
    children: { control: "text", if: { arg: "iconOnly", truthy: false } },
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
type Story = StoryObj<typeof Badge & { icon?: PhosphorIcon; iconLeft?: PhosphorIcon; iconRight?: PhosphorIcon }>;

export const Default: Story = {
  args: { variant: "secondary", format: "default", children: "Badge", iconOnly: false, icon: Star, iconLeft: undefined, iconRight: undefined },
  render: ({ icon, iconLeft, iconRight, iconOnly, children, ...args }) => {
    const Icon  = icon;
    const IconL = iconLeft;
    const IconR = iconRight;
    if (iconOnly && Icon) {
      return <Badge iconOnly {...args}><Icon size={12} /></Badge>;
    }
    return (
      <Badge iconOnly={false} {...args}>
        {IconL && <IconL size={12} />}
        {children}
        {IconR && <IconR size={12} />}
      </Badge>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-caption text-muted-foreground">default (radius 8px)</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="success">Success</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption text-muted-foreground">rounded (radius 9999px)</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary"     format="rounded">Primary</Badge>
          <Badge variant="secondary"   format="rounded">Secondary</Badge>
          <Badge variant="outline"     format="rounded">Outline</Badge>
          <Badge variant="ghost"       format="rounded">Ghost</Badge>
          <Badge variant="destructive" format="rounded">Destructive</Badge>
          <Badge variant="warning"     format="rounded">Warning</Badge>
          <Badge variant="success"     format="rounded">Success</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-caption text-muted-foreground">ícone esquerdo</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary"><Star size={12} />Primary</Badge>
          <Badge variant="secondary"><Bell size={12} />Secondary</Badge>
          <Badge variant="destructive"><X size={12} />Destructive</Badge>
          <Badge variant="warning"><Warning size={12} />Warning</Badge>
          <Badge variant="success"><Check size={12} />Success</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption text-muted-foreground">ícone direito</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Primary<X size={12} /></Badge>
          <Badge variant="secondary">Secondary<X size={12} /></Badge>
          <Badge variant="success">Success<Check size={12} /></Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption text-muted-foreground">rounded com ícone</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary"     format="rounded"><Star size={12} />Primary</Badge>
          <Badge variant="success"     format="rounded"><Check size={12} />Success</Badge>
          <Badge variant="warning"     format="rounded"><Warning size={12} />Warning</Badge>
          <Badge variant="destructive" format="rounded"><X size={12} />Destructive</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-caption text-muted-foreground">icon-only · default (radius 8px)</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary"     iconOnly><Star size={12} /></Badge>
          <Badge variant="secondary"   iconOnly><Bell size={12} /></Badge>
          <Badge variant="outline"     iconOnly><Info size={12} /></Badge>
          <Badge variant="ghost"       iconOnly><Plus size={12} /></Badge>
          <Badge variant="destructive" iconOnly><X size={12} /></Badge>
          <Badge variant="warning"     iconOnly><Warning size={12} /></Badge>
          <Badge variant="success"     iconOnly><Check size={12} /></Badge>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-caption text-muted-foreground">icon-only · rounded (radius 9999px)</span>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary"     format="rounded" iconOnly><Star size={12} /></Badge>
          <Badge variant="secondary"   format="rounded" iconOnly><Bell size={12} /></Badge>
          <Badge variant="outline"     format="rounded" iconOnly><Info size={12} /></Badge>
          <Badge variant="ghost"       format="rounded" iconOnly><Plus size={12} /></Badge>
          <Badge variant="destructive" format="rounded" iconOnly><X size={12} /></Badge>
          <Badge variant="warning"     format="rounded" iconOnly><Warning size={12} /></Badge>
          <Badge variant="success"     format="rounded" iconOnly><Check size={12} /></Badge>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const States: Story = {
  name: "States — default / focus",
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-[120px_1fr_1fr] gap-3 mb-1">
        <span />
        {(["Default", "Focus"] as const).map((label) => (
          <span key={label} className="text-caption text-muted-foreground text-center">{label}</span>
        ))}
      </div>
      {(["primary", "secondary", "outline", "ghost", "destructive", "warning", "success"] as const).map((variant) => (
        <div key={variant} className="grid grid-cols-[120px_1fr_1fr] items-center gap-3">
          <span className="text-caption text-muted-foreground">{variant}</span>
          <div className="flex justify-center gap-2">
            <Badge variant={variant}>Badge</Badge>
            <Badge variant={variant} format="rounded">Badge</Badge>
          </div>
          <div className="flex justify-center gap-2">
            <Badge variant={variant} className="shadow-focus-ring">Badge</Badge>
            <Badge variant={variant} format="rounded" className="shadow-focus-ring">Badge</Badge>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
