import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Ensina o tailwind-merge sobre as classes de font-size customizadas do DS.
// Sem isso, `text-heading-1` seria tratado como cor e removido quando
// `text-foreground` (ou qualquer outra `text-*` de cor) estivesse presente.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Ensina o tailwind-merge sobre font-size customizadas do DS,
      // evitando conflito com classes text-* de cor.
      "font-size": [
        "text-caption-sm",
        "text-caption",
        "text-body-sm",
        "text-body",
        "text-heading-5",
        "text-heading-4",
        "text-heading-3",
        "text-heading-2",
        "text-heading-1",
      ],
      // Registra as shadows customizadas no mesmo grupo para que
      // twMerge resolva conflitos corretamente (ex: focus-ring vs focus-ring-error).
      shadow: [
        "shadow-2xs",
        "shadow-xs",
        "shadow-sm",
        "shadow-md",
        "shadow-lg",
        "shadow-xl",
        "shadow-2xl",
        "shadow-focus-ring",
        "shadow-focus-ring-error",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
