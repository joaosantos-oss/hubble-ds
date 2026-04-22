import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundation/Colors",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

// ─── Semantic token table ─────────────────────────────────────────────────────

type TokenEntry = { token: string; light: string; dark: string };
type Section = { title: string; tokens: TokenEntry[] };

function Chip({ color }: { color: string }) {
  return (
    <div
      className="w-5 h-5 rounded shrink-0 border border-black/10"
      style={{ backgroundColor: color }}
    />
  );
}

function TokenRow({ token, light, dark }: TokenEntry) {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-4 py-2 border-b border-border last:border-0">
      <code className="font-mono text-caption text-foreground">{token}</code>
      <div className="flex items-center gap-2 min-w-0">
        <Chip color={light} />
        <span className="font-mono text-caption-sm text-muted-foreground truncate">{light}</span>
      </div>
      <div className="flex items-center gap-2 min-w-0">
        <Chip color={dark} />
        <span className="font-mono text-caption-sm text-muted-foreground truncate">{dark}</span>
      </div>
    </div>
  );
}

function SectionBlock({ title, tokens }: Section) {
  return (
    <div className="flex flex-col gap-0">
      {/* section header */}
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-4 pb-1 mb-1 border-b border-border">
        <span className="font-sans text-caption font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </span>
        <span className="font-sans text-caption text-muted-foreground">Light</span>
        <span className="font-sans text-caption text-muted-foreground">Dark</span>
      </div>
      {tokens.map((t) => (
        <TokenRow key={t.token} {...t} />
      ))}
    </div>
  );
}

const SECTIONS: Section[] = [
  {
    title: "Surface",
    tokens: [
      { token: "background",       light: "#ffffff",               dark: "#09090b" },
      { token: "foreground",       light: "#09090b",               dark: "#fafafa" },
    ],
  },
  {
    title: "Primary",
    tokens: [
      { token: "primary",          light: "#0071db",               dark: "#ebfbff" },
      { token: "primary-foreground", light: "#ffffff",             dark: "#09090b" },
      { token: "primary-bg",       light: "#ebfbff",               dark: "#0071db" },
      { token: "primary-accent",   light: "#ebfbff",               dark: "#051d33" },
      { token: "primary-accent-2", light: "#d1f4ff",               dark: "#064374" },
    ],
  },
  {
    title: "Secondary / Muted",
    tokens: [
      { token: "secondary",        light: "#f4f4f5",               dark: "#18181b" },
      { token: "secondary-foreground", light: "#18181b",           dark: "#f4f4f5" },
      { token: "muted",            light: "#f4f4f5",               dark: "#18181b" },
      { token: "muted-foreground", light: "#71717a",               dark: "#a1a1aa" },
    ],
  },
  {
    title: "Destructive",
    tokens: [
      { token: "destructive",      light: "#b91c1c",               dark: "#991b1b" },
      { token: "destructive-foreground", light: "#b91c1c",         dark: "#fecaca" },
      { token: "destructive-bg",   light: "#fef2f2",               dark: "#991b1b" },
      { token: "destructive-subtle", light: "#ffe2e2",             dark: "#7f1d1d" },
      { token: "destructive-accent", light: "#fef2f2",             dark: "#450a0a" },
    ],
  },
  {
    title: "Accent",
    tokens: [
      { token: "accent",           light: "#f4f4f5",               dark: "#18181b" },
      { token: "accent-foreground", light: "#18181b",              dark: "#f4f4f5" },
      { token: "accent-0",         light: "#fafafa",               dark: "#09090b" },
      { token: "accent-2",         light: "#e4e4e7",               dark: "#27272a" },
      { token: "accent-3",         light: "#d4d4d8",               dark: "#3f3f46" },
    ],
  },
  {
    title: "Success",
    tokens: [
      { token: "success-bg",       light: "#dcfce7",               dark: "#14532d" },
      { token: "success",          light: "#166534",               dark: "#bbf7d0" },
    ],
  },
  {
    title: "Warning",
    tokens: [
      { token: "warning-bg",       light: "#fef3c7",               dark: "#78350f" },
      { token: "warning",          light: "#92400e",               dark: "#fde68a" },
    ],
  },
  {
    title: "Borders",
    tokens: [
      { token: "border",           light: "#e4e4e7",               dark: "#3f3f46" },
      { token: "border-primary",   light: "#0071db",               dark: "#ebfbff" },
      { token: "border-destructive", light: "#ef4444",             dark: "#b91c1c" },
    ],
  },
  {
    title: "Input",
    tokens: [
      { token: "input-bg",         light: "#ffffff",               dark: "#09090b" },
      { token: "input",            light: "#d4d4d8",               dark: "#52525b" },
      { token: "input-disabled",   light: "#e4e4e7",               dark: "#27272a" },
    ],
  },
  {
    title: "Focus",
    tokens: [
      { token: "ring",             light: "#70e7ff",               dark: "#00b3fa" },
      { token: "ring-error",       light: "#fca5a5",               dark: "#ef4444" },
    ],
  },
  {
    title: "Hover",
    tokens: [
      { token: "hover-primary",    light: "#008ae0",               dark: "#d1f4ff" },
      { token: "hover-secondary",  light: "#fafafa",               dark: "#18181b" },
      { token: "hover-destructive", light: "#fecaca",              dark: "#7f1d1d" },
      { token: "hover-ghost",      light: "rgba(0,0,0,0.05)",      dark: "rgba(255,255,255,0.10)" },
    ],
  },
  {
    title: "Disabled",
    tokens: [
      { token: "disabled",         light: "#e4e4e7",               dark: "#27272a" },
      { token: "disabled-foreground", light: "#a1a1aa",            dark: "#52525b" },
    ],
  },
  {
    title: "Ghost / Outline",
    tokens: [
      { token: "ghost",            light: "rgba(255,255,255,0)",   dark: "rgba(255,255,255,0)" },
      { token: "outline-bg",       light: "rgba(255,255,255,0.10)", dark: "rgba(255,255,255,0.05)" },
      { token: "outline-active",   light: "rgba(0,0,0,0.05)",      dark: "rgba(255,255,255,0.15)" },
    ],
  },
  {
    title: "Card",
    tokens: [
      { token: "card",             light: "#ffffff",               dark: "#09090b" },
      { token: "card-foreground",  light: "#09090b",               dark: "#fafafa" },
      { token: "card-border",      light: "#e4e4e7",               dark: "#3f3f46" },
    ],
  },
  {
    title: "Tooltip",
    tokens: [
      { token: "tooltip",            light: "#18181b",             dark: "#f4f4f5" },
      { token: "tooltip-foreground", light: "#f4f4f5",             dark: "#18181b" },
    ],
  },
  {
    title: "Sidebar",
    tokens: [
      { token: "sidebar",          light: "#f4f4f5",               dark: "#18181b" },
      { token: "sidebar-foreground", light: "#18181b",             dark: "#f4f4f5" },
      { token: "sidebar-accent",   light: "#f4f4f5",               dark: "#18181b" },
      { token: "sidebar-border",   light: "#e4e4e7",               dark: "#3f3f46" },
      { token: "sidebar-muted",    light: "#71717a",               dark: "#a1a1aa" },
      { token: "sidebar-ring",     light: "#70e7ff",               dark: "#00b3fa" },
    ],
  },
];

export const Semanticas: Story = {
  name: "Cores semânticas",
  render: () => (
    <div className="flex flex-col gap-8 max-w-2xl">
      {SECTIONS.map((s) => (
        <SectionBlock key={s.title} {...s} />
      ))}
    </div>
  ),
};

// ─── Brand colors ─────────────────────────────────────────────────────────────

type ShadeProps = { shade: string; hex: string; light?: boolean };
function Shade({ shade, hex, light }: ShadeProps) {
  return (
    <div
      className="flex flex-col justify-between px-3 py-2 h-16 first:rounded-l-md last:rounded-r-md"
      style={{ backgroundColor: hex }}
    >
      <span
        className="font-sans text-caption-sm font-medium"
        style={{ color: light ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)" }}
      >
        {shade}
      </span>
      <span
        className="font-mono text-caption-sm"
        style={{ color: light ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)" }}
      >
        {hex}
      </span>
    </div>
  );
}

type PaletteRowProps = { name: string; shades: ShadeProps[] };
function PaletteRow({ name, shades }: PaletteRowProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-sans text-caption font-medium text-muted-foreground uppercase tracking-wide">
        {name}
      </span>
      <div className="grid grid-cols-11">
        {shades.map((s) => (
          <Shade key={s.shade} {...s} />
        ))}
      </div>
    </div>
  );
}

const FALCON: ShadeProps[] = [
  { shade: "50",  hex: "#ebfbff" },
  { shade: "100", hex: "#d1f4ff" },
  { shade: "200", hex: "#a8eeff" },
  { shade: "300", hex: "#70e7ff" },
  { shade: "400", hex: "#2ed5ff" },
  { shade: "500", hex: "#00b3fa", light: true },
  { shade: "600", hex: "#008ae0", light: true },
  { shade: "700", hex: "#0071db", light: true },
  { shade: "800", hex: "#0057a8", light: true },
  { shade: "900", hex: "#064374", light: true },
  { shade: "950", hex: "#051d33", light: true },
];

export const Marca: Story = {
  name: "Marca — Primária (Falcon)",
  render: () => (
    <div className="flex flex-col gap-4">
      <PaletteRow name="Falcon" shades={FALCON} />
      <span className="font-sans text-caption text-muted-foreground">
        A escala Falcon é a paleta de marca do Hubble DS. O token semântico{" "}
        <code className="font-mono bg-muted px-1 rounded text-caption-sm">primary</code> usa{" "}
        <strong>700</strong> no light e <strong>50</strong> no dark.
      </span>
    </div>
  ),
};

// ─── Tailwind palettes ────────────────────────────────────────────────────────

const ZINC: ShadeProps[] = [
  { shade: "50",  hex: "#fafafa" },
  { shade: "100", hex: "#f4f4f5" },
  { shade: "200", hex: "#e4e4e7" },
  { shade: "300", hex: "#d4d4d8" },
  { shade: "400", hex: "#a1a1aa" },
  { shade: "500", hex: "#71717a", light: true },
  { shade: "600", hex: "#52525b", light: true },
  { shade: "700", hex: "#3f3f46", light: true },
  { shade: "800", hex: "#27272a", light: true },
  { shade: "900", hex: "#18181b", light: true },
  { shade: "950", hex: "#09090b", light: true },
];

const RED: ShadeProps[] = [
  { shade: "50",  hex: "#fef2f2" },
  { shade: "100", hex: "#ffe2e2" },
  { shade: "200", hex: "#fecaca" },
  { shade: "300", hex: "#fca5a5" },
  { shade: "400", hex: "#f87171" },
  { shade: "500", hex: "#ef4444", light: true },
  { shade: "600", hex: "#dc2626", light: true },
  { shade: "700", hex: "#b91c1c", light: true },
  { shade: "800", hex: "#991b1b", light: true },
  { shade: "900", hex: "#7f1d1d", light: true },
  { shade: "950", hex: "#450a0a", light: true },
];

const GREEN: ShadeProps[] = [
  { shade: "50",  hex: "#f0fdf4" },
  { shade: "100", hex: "#dcfce7" },
  { shade: "200", hex: "#bbf7d0" },
  { shade: "300", hex: "#86efac" },
  { shade: "400", hex: "#4ade80" },
  { shade: "500", hex: "#22c55e", light: true },
  { shade: "600", hex: "#16a34a", light: true },
  { shade: "700", hex: "#15803d", light: true },
  { shade: "800", hex: "#166534", light: true },
  { shade: "900", hex: "#14532d", light: true },
  { shade: "950", hex: "#052e16", light: true },
];

const AMBER: ShadeProps[] = [
  { shade: "50",  hex: "#fffbeb" },
  { shade: "100", hex: "#fef3c7" },
  { shade: "200", hex: "#fde68a" },
  { shade: "300", hex: "#fcd34d" },
  { shade: "400", hex: "#fbbf24" },
  { shade: "500", hex: "#f59e0b" },
  { shade: "600", hex: "#d97706", light: true },
  { shade: "700", hex: "#b45309", light: true },
  { shade: "800", hex: "#92400e", light: true },
  { shade: "900", hex: "#78350f", light: true },
  { shade: "950", hex: "#451a03", light: true },
];

export const PaletaTailwind: Story = {
  name: "Paleta Tailwind",
  render: () => (
    <div className="flex flex-col gap-8">
      <PaletteRow name="Zinc — secundária" shades={ZINC} />
      <PaletteRow name="Red — erro / destructive" shades={RED} />
      <PaletteRow name="Green — sucesso" shades={GREEN} />
      <PaletteRow name="Amber — alerta / warning" shades={AMBER} />
    </div>
  ),
};
