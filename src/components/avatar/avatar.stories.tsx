import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Typography } from "@/components/typography/typography";
import avatarImg from "@/assets/avatar-magazord.webp";

const meta: Meta<typeof Avatar> = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Avatar do Hubble DS. Exibe imagem do usuário com fallback para iniciais. 4 tamanhos (40/32/24/20 px) e 2 formas (circle e rounded).",
      },
    },
  },
  argTypes: {
    size:  { control: "select", options: ["lg", "md", "sm", "xs"] },
    shape: { control: "select", options: ["circle", "rounded"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={avatarImg} alt="Magazord" />
      <AvatarFallback>MZ</AvatarFallback>
    </Avatar>
  ),
  args: { size: "lg", shape: "circle" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["lg", "md", "sm", "xs"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <Typography variant="caption" color="muted" className="w-8">{size}</Typography>
          <div className="flex items-center gap-3">
            <Avatar size={size}>
              <AvatarImage src={avatarImg} alt="Magazord" />
              <AvatarFallback>MZ</AvatarFallback>
            </Avatar>
            <Avatar size={size}>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["circle", "rounded"] as const).map((shape) => (
        <div key={shape} className="flex flex-col gap-2">
          <Typography variant="caption" color="muted">{shape}</Typography>
          <div className="flex items-center gap-4">
            {(["lg", "md", "sm", "xs"] as const).map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Avatar shape={shape} size={size}>
                  <AvatarImage src={avatarImg} alt="Magazord" />
                  <AvatarFallback>MZ</AvatarFallback>
                </Avatar>
                <Typography variant="caption" color="muted">{size}</Typography>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Fallback: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">com imagem</Typography>
        <div className="flex items-center gap-3">
          <Avatar><AvatarImage src={avatarImg} alt="Magazord" /><AvatarFallback>MZ</AvatarFallback></Avatar>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">sem imagem — fallback iniciais</Typography>
        <div className="flex items-center gap-3">
          <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>MR</AvatarFallback></Avatar>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">imagem inválida — fallback iniciais</Typography>
        <div className="flex items-center gap-3">
          <Avatar><AvatarImage src="/broken.png" alt="broken" /><AvatarFallback>BR</AvatarFallback></Avatar>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const Group: Story = {
  name: "Avatar Group (stacked)",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">grupo empilhado</Typography>
        <div className="flex -space-x-3 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background">
          <Avatar><AvatarImage src={avatarImg} alt="Magazord" /><AvatarFallback>MZ</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>MR</AvatarFallback></Avatar>
          <Avatar className="bg-muted">
            <AvatarFallback className="text-caption-sm">+4</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
