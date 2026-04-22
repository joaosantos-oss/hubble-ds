import type { Meta, StoryObj } from "@storybook/react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./carousel";

const meta: Meta = {
  title: "Data Display/Carousel",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Carrossel de slides horizontal e vertical. Baseado em Embla Carousel.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const SLIDES = Array.from({ length: 5 }, (_, i) => i + 1);

export const Default: Story = {
  name: "Horizontal",
  render: () => (
    <div className="px-12 max-w-sm mx-auto">
      <Carousel>
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n}>
              <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-accent-2">
                <span className="text-heading font-medium text-muted-foreground">{n}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const MultipleSlides: Story = {
  name: "Múltiplos itens por vez",
  render: () => (
    <div className="px-12 max-w-lg mx-auto">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n} className="basis-1/3">
              <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-accent-2">
                <span className="text-body font-medium text-muted-foreground">{n}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithLoop: Story = {
  name: "Com loop",
  render: () => (
    <div className="px-12 max-w-sm mx-auto">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n}>
              <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-primary-accent">
                <span className="text-heading font-medium text-primary">{n}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const WithAutoplay: Story = {
  name: "Com autoplay",
  render: () => (
    <div className="px-12 max-w-sm mx-auto">
      <Carousel plugins={[Autoplay({ delay: 2000 })]} opts={{ loop: true }}>
        <CarouselContent>
          {SLIDES.map((n) => (
            <CarouselItem key={n}>
              <div className="flex aspect-square items-center justify-center rounded-md border border-border bg-accent-2">
                <span className="text-heading font-medium text-muted-foreground">{n}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

