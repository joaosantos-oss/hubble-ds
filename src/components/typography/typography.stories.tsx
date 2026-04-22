import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Typography } from "./typography";

const WEIGHT_VARIANTS = ["body", "body-sm", "caption", "caption-sm"];

type TypographyStoryArgs = React.ComponentProps<typeof Typography> & { _showWeight?: boolean };

const meta: Meta<TypographyStoryArgs> = {
  title: "Foundation/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Escala tipográfica do Hubble DS.",
          "",
          "**Regras de peso:**",
          "- `h1`–`h5` → sempre **bold**",
          "- `monospaced` → sempre **regular** (Roboto Mono)",
          "- `body`, `body-sm`, `caption`, `caption-sm` → controlado pelo prop `weight`",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "body", "body-sm", "caption", "caption-sm", "monospaced"],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "bold"],
      description: "Disponível apenas em body e caption.",
      if: { arg: "_showWeight", truthy: true },
    },
    color: {
      control: "select",
      options: ["default", "muted", "primary", "destructive", "success", "warning"],
    },
    _showWeight: { control: false, table: { disable: true } },
    children: { control: "text" },
  },
  decorators: [
    (Story) => {
      const [args, updateArgs] = useArgs<{ variant?: string; _showWeight?: boolean }>();
      const shouldShow = WEIGHT_VARIANTS.includes(args.variant ?? "body");
      React.useEffect(() => {
        if (args._showWeight !== shouldShow) updateArgs({ _showWeight: shouldShow });
      }, [args.variant]);
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "body",
    weight: "regular",
    color: "default",
    _showWeight: true,
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">h1 — 56px · Bold</Typography>
      <Typography variant="h2">h2 — 40px · Bold</Typography>
      <Typography variant="h3">h3 — 32px · Bold</Typography>
      <Typography variant="h4">h4 — 24px · Bold</Typography>
      <Typography variant="h5">h5 — 20px · Bold</Typography>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Body: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="caption" color="muted">body · 16px</Typography>
        <Typography variant="body" weight="regular">Regular — The quick brown fox</Typography>
        <Typography variant="body" weight="medium">Medium — The quick brown fox</Typography>
        <Typography variant="body" weight="bold">Bold — The quick brown fox</Typography>
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant="caption" color="muted">body-sm · 14px</Typography>
        <Typography variant="body-sm" weight="regular">Regular — The quick brown fox</Typography>
        <Typography variant="body-sm" weight="medium">Medium — The quick brown fox</Typography>
        <Typography variant="body-sm" weight="bold">Bold — The quick brown fox</Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Caption: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="caption-sm" color="muted">caption · 12px</Typography>
        <Typography variant="caption" weight="regular">Regular — The quick brown fox</Typography>
        <Typography variant="caption" weight="medium">Medium — The quick brown fox</Typography>
        <Typography variant="caption" weight="bold">Bold — The quick brown fox</Typography>
      </div>
      <div className="flex flex-col gap-1">
        <Typography variant="caption-sm" color="muted">caption-sm · 10px</Typography>
        <Typography variant="caption-sm" weight="regular">Regular — The quick brown fox</Typography>
        <Typography variant="caption-sm" weight="medium">Medium — The quick brown fox</Typography>
        <Typography variant="caption-sm" weight="bold">Bold — The quick brown fox</Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Monospaced: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography variant="caption" color="muted">monospaced · 14px · Roboto Mono · Regular</Typography>
      <Typography variant="monospaced">const value = 42;</Typography>
      <Typography variant="monospaced">SELECT * FROM users WHERE id = 1;</Typography>
      <Typography variant="monospaced">npm install @hubble/ds</Typography>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography color="default">default — foreground</Typography>
      <Typography color="muted">muted — muted-foreground</Typography>
      <Typography color="primary">primary — primary</Typography>
      <Typography color="destructive">destructive — destructive-foreground</Typography>
      <Typography color="success">success — success</Typography>
      <Typography color="warning">warning — warning</Typography>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
