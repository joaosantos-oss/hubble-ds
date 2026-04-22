import { cn } from "@/lib/utils";

function Skeleton({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-shimmer rounded-md", className)}
      style={{
        backgroundImage: "linear-gradient(90deg, var(--accent-2) 25%, var(--accent) 50%, var(--accent-2) 75%)",
        backgroundSize: "200% 100%",
        ...style,
      }}
      {...props}
    />
  );
}

export { Skeleton };
