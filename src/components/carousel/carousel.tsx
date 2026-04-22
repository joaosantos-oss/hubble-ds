import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within <Carousel>");
  return ctx;
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & CarouselProps
>(({ orientation = "horizontal", opts, plugins, setApi, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => { api.off("reInit", onSelect); api.off("select", onSelect); };
  }, [api, onSelect]);

  React.useEffect(() => { if (api && setApi) setApi(api); }, [api, setApi]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); scrollPrev(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); scrollNext(); }
  }, [scrollPrev, scrollNext]);

  return (
    <CarouselContext.Provider value={{ carouselRef, api, opts, orientation, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

// ─── CarouselContent ──────────────────────────────────────────────────────────

const CarouselContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

// ─── CarouselItem ─────────────────────────────────────────────────────────────

const CarouselItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className
        )}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

// ─── CarouselPrevious ─────────────────────────────────────────────────────────

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "medium", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        iconOnly
        className={cn(
          "absolute",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Slide anterior"
        {...props}
      >
        <CaretLeft size={16} />
      </Button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

// ─── CarouselNext ─────────────────────────────────────────────────────────────

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<typeof Button>>(
  ({ className, variant = "outline", size = "medium", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        iconOnly
        className={cn(
          "absolute",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Próximo slide"
        {...props}
      >
        <CaretRight size={16} />
      </Button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi };
