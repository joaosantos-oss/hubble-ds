import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";
import { cn } from "@/lib/utils";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function Toaster({ className, ...props }: ToasterProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  React.useEffect(() => {
    const observer = new MutationObserver(() =>
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light")
    );
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sonner
      theme={theme}
      className={cn("toaster group font-sans", className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-background !text-foreground !border-border !shadow-md !rounded-md !font-sans",
          title:
            "!text-body-sm !font-medium !text-foreground",
          description:
            "!text-caption !text-muted-foreground",
          actionButton:
            "!bg-primary !text-primary-foreground hover:!bg-hover-primary !rounded-md !px-3 !py-1 !text-body-sm !font-medium !font-sans !transition-colors",
          cancelButton:
            "!bg-transparent !text-foreground !border !border-border hover:!bg-hover-outline !rounded-md !px-3 !py-1 !text-body-sm !font-medium !font-sans !transition-colors",
          closeButton:
            "!rounded !border !border-border !bg-background !text-muted-foreground hover:!bg-accent hover:!text-foreground !transition-colors",
          success:
            "!border-border [&_[data-icon]]:!text-success",
          error:
            "!border-border-destructive [&_[data-icon]]:!text-destructive-foreground",
          warning:
            "!border-border [&_[data-icon]]:!text-warning",
          info:
            "!border-border [&_[data-icon]]:!text-primary",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
