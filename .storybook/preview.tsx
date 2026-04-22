import React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    // Desabilitamos o addon backgrounds padrão — o tema controla o bg via CSS vars
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "DS Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark",  icon: "circle",       title: "Dark"  },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals["theme"] === "dark";

      // Aplica .dark no <html> para que portais (Tooltip, Dialog, etc.)
      // também herdem as CSS vars — div wrapper não cobre elementos fora da árvore.
      React.useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
      }, [isDark]);

      return (
        <div className="bg-background text-foreground p-4">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
