import type { Meta, StoryObj } from "@storybook/react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from "./breadcrumb";
import { Typography } from "@/components/typography/typography";
import { cn } from "@/lib/utils";

const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Breadcrumb do Hubble DS. Navegação hierárquica com separador '>' fixo. Links usam text-muted, página atual usa text-foreground.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

// Links usam asChild + button para não navegar no Storybook
const BreadcrumbBtn = ({ children }: { children: React.ReactNode }) => (
  <BreadcrumbLink asChild>
    <button type="button" className="cursor-pointer">{children}</button>
  </BreadcrumbLink>
);

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbBtn>Início</BreadcrumbBtn></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbBtn>Componentes</BreadcrumbBtn></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: { controls: { disable: true } },
};

export const LongPath: Story = {
  name: "Caminho longo",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbBtn>Início</BreadcrumbBtn></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbBtn>Configurações</BreadcrumbBtn></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbBtn>Integrações</BreadcrumbBtn></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbBtn>Marketplace</BreadcrumbBtn></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Detalhes</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: { controls: { disable: true } },
};

export const WithDropdown: Story = {
  name: "Com dropdown (colapsado)",
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="caption" color="muted">itens colapsados num dropdown</Typography>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbBtn>Início</BreadcrumbBtn></BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Mostrar itens ocultos"
                >
                  <BreadcrumbEllipsis />
                </button>
              </DropdownMenuPrimitive.Trigger>
              <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                  align="start"
                  sideOffset={6}
                  className={cn(
                    "z-50 min-w-[10rem] overflow-hidden rounded-md border border-border bg-background shadow-md",
                    "animate-in fade-in-0 zoom-in-95",
                    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
                    "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
                  )}
                >
                  {["Configurações", "Integrações", "Marketplace"].map((label) => (
                    <DropdownMenuPrimitive.Item
                      key={label}
                      className={cn(
                        "flex cursor-pointer select-none items-center px-3 py-2",
                        "text-body-sm font-sans text-foreground",
                        "outline-none hover:bg-accent focus:bg-accent",
                      )}
                    >
                      {label}
                    </DropdownMenuPrimitive.Item>
                  ))}
                </DropdownMenuPrimitive.Content>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Root>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbBtn>Detalhes</BreadcrumbBtn></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Configurar</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const SingleLevel: Story = {
  name: "Nível único",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbBtn>Início</BreadcrumbBtn></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Página atual</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  parameters: { controls: { disable: true } },
};
