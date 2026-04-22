import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Layout/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Seções expansíveis verticalmente. Baseado em Radix UI Accordion.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
  name: "Single — uma aberta por vez",
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>O que é o Hubble DS?</AccordionTrigger>
        <AccordionContent>
          O Hubble é o design system da Magazord. Fornece componentes reutilizáveis com tokens de
          design consistentes para criar interfaces de qualidade.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Como instalar os componentes?</AccordionTrigger>
        <AccordionContent>
          Os componentes são distribuídos via shadcn registry. Basta adicionar o registry ao seu
          projeto e instalar os componentes desejados com o comando CLI.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Posso usar em projetos externos?</AccordionTrigger>
        <AccordionContent>
          Sim. O Hubble DS pode ser utilizado em qualquer projeto React que siga os padrões
          definidos pelo time de design da Magazord.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: { controls: { disable: true } },
};

export const Multiple: Story = {
  name: "Multiple — várias abertas simultaneamente",
  render: () => (
    <Accordion type="multiple" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Tokens de cores</AccordionTrigger>
        <AccordionContent>
          Os tokens de cores são definidos no arquivo <code>TokensDS</code> e traduzidos para
          variáveis CSS e classes Tailwind. Nunca use cores hardcoded nos componentes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Tipografia</AccordionTrigger>
        <AccordionContent>
          O DS utiliza Roboto como fonte principal e Roboto Mono para código. As variantes de
          tipografia estão disponíveis via classes semânticas como <code>text-body-sm</code>,{" "}
          <code>text-caption</code> e <code>text-heading</code>.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Ícones</AccordionTrigger>
        <AccordionContent>
          Utilizamos exclusivamente ícones do <code>@phosphor-icons/react</code> nos pesos{" "}
          <em>regular</em> e <em>fill</em>. Nunca use o componente Icon do DS dentro de outros
          componentes — use o ícone Phosphor diretamente.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: { controls: { disable: true } },
};

export const DefaultOpen: Story = {
  name: "Com item aberto por padrão",
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-2" className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Primeiro item</AccordionTrigger>
        <AccordionContent>Conteúdo do primeiro item.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Segundo item (aberto por padrão)</AccordionTrigger>
        <AccordionContent>
          Este item está aberto por padrão através da prop <code>defaultValue</code>.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Terceiro item</AccordionTrigger>
        <AccordionContent>Conteúdo do terceiro item.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: { controls: { disable: true } },
};
