import type { Meta, StoryObj } from "@storybook/react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { Typography } from "@/components/typography/typography";

const meta: Meta = {
  title: "Foundation/Aspect Ratio",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Aspect Ratios do Hubble DS. Proporções padronizadas para uso em imagens, vídeos e containers de mídia.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const RATIOS: { label: string; ratio: number }[] = [
  { label: "16:9",  ratio: 16 / 9  },
  { label: "4:3",   ratio: 4  / 3  },
  { label: "1:1",   ratio: 1        },
  { label: "3:4",   ratio: 3  / 4  },
  { label: "9:16",  ratio: 9  / 16 },
];

function RatioBox({ ratio, label }: { ratio: number; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="caption" color="muted">{label}</Typography>
      <AspectRatioPrimitive.Root ratio={ratio}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted border border-border">
          <Typography variant="caption" color="muted">{label}</Typography>
        </div>
      </AspectRatioPrimitive.Root>
    </div>
  );
}

export const AllRatios: Story = {
  name: "Todos os aspect ratios",
  render: () => (
    <div className="grid grid-cols-3 gap-6 max-w-2xl">
      {RATIOS.map(({ label, ratio }) => (
        <RatioBox key={label} label={label} ratio={ratio} />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Landscape: Story = {
  name: "Landscape — 16:9 e 4:3",
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      {[{ label: "16:9", ratio: 16 / 9 }, { label: "4:3", ratio: 4 / 3 }].map(({ label, ratio }) => (
        <RatioBox key={label} label={label} ratio={ratio} />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Square: Story = {
  name: "Square — 1:1",
  render: () => (
    <div className="w-48">
      <RatioBox label="1:1" ratio={1} />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Portrait: Story = {
  name: "Portrait — 3:4 e 9:16",
  render: () => (
    <div className="flex gap-6 items-start">
      {[{ label: "3:4", ratio: 3 / 4 }, { label: "9:16", ratio: 9 / 16 }].map(({ label, ratio }) => (
        <div key={label} className="w-36">
          <RatioBox label={label} ratio={ratio} />
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithImage: Story = {
  name: "Com imagem",
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-lg">
      {RATIOS.map(({ label, ratio }) => (
        <div key={label} className="flex flex-col gap-2">
          <Typography variant="caption" color="muted">{label}</Typography>
          <AspectRatioPrimitive.Root ratio={ratio}>
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
              alt={`Exemplo ${label}`}
              className="h-full w-full rounded-md object-cover"
            />
          </AspectRatioPrimitive.Root>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};
