import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(
    <StrictMode>
      <div className="p-8">
        <h1 className="text-heading-1 font-bold text-foreground">Hubble DS</h1>
        <p className="text-body text-muted-foreground mt-2">
          Run <code className="font-mono">npm run storybook</code> to view the component library.
        </p>
      </div>
    </StrictMode>
  );
}
