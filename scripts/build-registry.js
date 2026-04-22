import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf-8"));

const outDir = join(root, "public", "r");
mkdirSync(outDir, { recursive: true });

for (const item of registry.items) {
  const files = item.files.map((f) => ({
    ...f,
    content: readFileSync(join(root, f.path), "utf-8"),
  }));

  const output = { ...item, files };

  writeFileSync(
    join(outDir, `${item.name}.json`),
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log(`built: public/r/${item.name}.json`);
}

console.log(`\ndone — ${registry.items.length} items`);
