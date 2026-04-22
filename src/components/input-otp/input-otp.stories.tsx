import type { Meta, StoryObj } from "@storybook/react";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp";
import { Label } from "@/components/label/label";
import { Typography } from "@/components/typography/typography";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const meta: Meta<typeof InputOTP> = {
  title: "Inputs/Input OTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Campo de código OTP do Hubble DS. 4 tamanhos (large/medium/small/mini), estado de erro e separador entre grupos.",
      },
    },
  },
  argTypes: {
    size:      { control: "select", options: ["large", "medium", "small", "mini"] },
    hasError:  { control: "boolean" },
    disabled:  { control: "boolean" },
    maxLength: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof InputOTP>;

export const Default: Story = {
  args: { maxLength: 6, size: "medium" },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(["large", "medium", "small", "mini"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <Typography variant="caption" color="muted">{size}</Typography>
          <InputOTP maxLength={6} size={size}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      ))}
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">default</Typography>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">error</Typography>
        <InputOTP maxLength={4} hasError>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="caption" color="muted">disabled</Typography>
        <InputOTP maxLength={4} disabled>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="otp-default">Código de verificação</Label>
        <InputOTP id="otp-default" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Typography variant="caption" color="muted">
          Enviamos um código de 6 dígitos para o seu e-mail.
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="otp-error">Código de verificação</Label>
        <InputOTP id="otp-error" maxLength={6} hasError pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Typography variant="caption" color="destructive">
          Código inválido. Tente novamente.
        </Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};
