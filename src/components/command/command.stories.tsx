import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Calendar, Smiley, Rocket, User, Gear, FileText,
  CreditCard, MagnifyingGlass,
} from "@phosphor-icons/react";
import { Button } from "@/components/button/button";
import {
  Command, CommandDialog,
  CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandSeparator,
  CommandItem, CommandShortcut,
} from "./command";

const meta: Meta = {
  title: "Overlays/Command",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Paleta de comandos com busca em tempo real. Baseado em cmdk.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: "Command — inline",
  render: () => (
    <Command className="rounded-lg border border-border shadow-md w-[380px]">
      <CommandInput placeholder="Digite um comando..." />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>
            <Calendar size={14} />
            <span>Calendário</span>
          </CommandItem>
          <CommandItem>
            <Smiley size={14} />
            <span>Emojis</span>
          </CommandItem>
          <CommandItem>
            <Rocket size={14} />
            <span>Lançar</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Configurações">
          <CommandItem>
            <User size={14} />
            <span>Perfil</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard size={14} />
            <span>Faturamento</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Gear size={14} />
            <span>Configurações</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: { controls: { disable: true } },
};

export const Dialog: Story = {
  name: "Command Dialog",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <MagnifyingGlass size={14} />
          Abrir paleta de comandos
          <CommandShortcut>⌘K</CommandShortcut>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Digite um comando ou pesquise..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup heading="Documentos">
              <CommandItem onSelect={() => setOpen(false)}>
                <FileText size={14} />
                <span>Novo documento</span>
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <MagnifyingGlass size={14} />
                <span>Pesquisar arquivos</span>
                <CommandShortcut>⌘F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Configurações">
              <CommandItem onSelect={() => setOpen(false)}>
                <User size={14} />
                <span>Perfil</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <Gear size={14} />
                <span>Preferências</span>
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    );
  },
  parameters: { controls: { disable: true } },
};
