import type { Meta, StoryObj } from "@storybook/react";
import {
  Star,
  Heart,
  MagnifyingGlass,
  Bell,
  House,
  User,
  Gear,
  Plus,
  X,
  Check,
  Warning,
  Info,
  ArrowRight,
  Download,
  Upload,
  Trash,
  PencilSimple,
  Eye,
  Lock,
} from "@phosphor-icons/react";
import { Icon } from "./icon";

const meta: Meta<typeof Icon> = {
  title: "Foundation/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Wrapper tipado para ícones Phosphor. Apenas pesos `regular` e `fill` são suportados no Hubble DS.",
      },
    },
  },
  argTypes: {
    icon: { control: false },
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    weight: { control: "select", options: ["regular", "fill"] },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Star,
    size: "md",
    weight: "regular",
    label: "Star",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={Star} size={size} />
          <span className="text-caption text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Weights: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size="lg" weight="regular" />
        <span className="text-caption text-muted-foreground">regular</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Star} size="lg" weight="fill" />
        <span className="text-caption text-muted-foreground">fill</span>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const IconLibrary: Story = {
  render: () => {
    const icons = [
      { icon: House, name: "House" },
      { icon: User, name: "User" },
      { icon: Bell, name: "Bell" },
      { icon: MagnifyingGlass, name: "MagnifyingGlass" },
      { icon: Gear, name: "Gear" },
      { icon: Plus, name: "Plus" },
      { icon: X, name: "X" },
      { icon: Check, name: "Check" },
      { icon: Warning, name: "Warning" },
      { icon: Info, name: "Info" },
      { icon: ArrowRight, name: "ArrowRight" },
      { icon: Download, name: "Download" },
      { icon: Upload, name: "Upload" },
      { icon: Trash, name: "Trash" },
      { icon: PencilSimple, name: "PencilSimple" },
      { icon: Eye, name: "Eye" },
      { icon: Lock, name: "Lock" },
      { icon: Heart, name: "Heart" },
    ];

    return (
      <div className="flex flex-col gap-8">
        {(["regular", "fill"] as const).map((weight) => (
          <div key={weight}>
            <p className="text-caption font-medium text-muted-foreground mb-4 uppercase tracking-wide">
              {weight}
            </p>
            <div className="grid grid-cols-6 gap-4">
              {icons.map(({ icon, name }) => (
                <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border">
                  <Icon icon={icon} size="lg" weight={weight} />
                  <span className="text-caption-sm text-muted-foreground text-center">{name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: { controls: { disable: true } },
};

export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-foreground">
        <Icon icon={Bell} size="md" />
        <span className="text-body">Notifications</span>
      </div>
      <div className="flex items-center gap-2 text-primary">
        <Icon icon={Info} size="md" weight="fill" />
        <span className="text-body text-primary">Information</span>
      </div>
      <div className="flex items-center gap-2 text-destructive-foreground">
        <Icon icon={Warning} size="md" weight="fill" />
        <span className="text-body text-destructive-foreground">Danger zone</span>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
