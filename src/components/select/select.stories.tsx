import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CaretDown, CaretUpDown } from "@phosphor-icons/react";
import {
  Select, SelectGroup, SelectValue,
  SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator,
} from "./select";
import {
  ComboboxAnchor, ComboboxTrigger, ComboboxContent,
  Command, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandSeparator,
  CommandCheckItem,
} from "./combobox";
import { Button } from "@/components/button/button";
import { Label } from "@/components/label/label";
import { Typography } from "@/components/typography/typography";

const meta: Meta = {
  title: "Inputs/Select & Combobox",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Select e Combobox do Hubble DS. Select para listas fixas; Combobox para listas com busca. Ambos seguem o mesmo padrão visual.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Select ───────────────────────────────────────────────────────────────────

export const SelectDefault: Story = {
  name: "Select — default",
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma opção" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const SelectStates: Story = {
  name: "Select — estados",
  render: () => (
    <div className="flex flex-col gap-3 w-56">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">default</Typography>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Opção A</SelectItem>
            <SelectItem value="b">Opção B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">com valor</Typography>
        <Select defaultValue="b">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Opção A</SelectItem>
            <SelectItem value="b">Opção B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">error</Typography>
        <Select>
          <SelectTrigger hasError>
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Opção A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">disabled</Typography>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Desabilitado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Opção A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const SelectGrouped: Story = {
  name: "Select — grupos e separadores",
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frontend</SelectLabel>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="angular">Angular</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Backend</SelectLabel>
            <SelectItem value="nextjs">Next.js</SelectItem>
            <SelectItem value="remix">Remix</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const SelectWithLabel: Story = {
  name: "Select — com label",
  render: () => (
    <div className="flex flex-col gap-4 w-56">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="country-select">País</Label>
        <Select>
          <SelectTrigger id="country-select">
            <SelectValue placeholder="Selecione o país" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="br">Brasil</SelectItem>
            <SelectItem value="pt">Portugal</SelectItem>
            <SelectItem value="us">Estados Unidos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="country-error">País</Label>
        <Select>
          <SelectTrigger id="country-error" hasError>
            <SelectValue placeholder="Selecione o país" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="br">Brasil</SelectItem>
          </SelectContent>
        </Select>
        <Typography variant="caption" color="destructive">Campo obrigatório.</Typography>
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Combobox ─────────────────────────────────────────────────────────────────

const FRAMEWORKS = [
  { value: "react",   label: "React" },
  { value: "vue",     label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte",  label: "Svelte" },
  { value: "nextjs",  label: "Next.js" },
  { value: "remix",   label: "Remix" },
  { value: "astro",   label: "Astro" },
  { value: "solid",   label: "Solid" },
];

function ComboboxSingle({ placeholder = "Selecione um framework..." }: { placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const selected = FRAMEWORKS.find((f) => f.value === value);

  return (
    <ComboboxAnchor open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between font-normal text-body-sm"
        >
          <span className={selected ? "text-foreground" : "text-muted-foreground"}>
            {selected ? selected.label : placeholder}
          </span>
          <CaretUpDown size={14} className="shrink-0 text-muted-foreground" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup>
              {FRAMEWORKS.map((f) => (
                <CommandCheckItem
                  key={f.value}
                  value={f.value}
                  selected={value === f.value}
                  onSelect={(v) => {
                    setValue(v === value ? "" : v);
                    setOpen(false);
                  }}
                >
                  {f.label}
                </CommandCheckItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ComboboxContent>
    </ComboboxAnchor>
  );
}

export const ComboboxDefault: Story = {
  name: "Combobox — default",
  render: () => (
    <div className="w-56">
      <ComboboxSingle />
    </div>
  ),
  parameters: { controls: { disable: true } },
};

export const ComboboxStates: Story = {
  name: "Combobox — estados",
  render: () => (
    <div className="flex flex-col gap-3 w-56">
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">sem seleção</Typography>
        <ComboboxSingle placeholder="Selecione..." />
      </div>
      <div className="flex flex-col gap-1.5">
        <Typography variant="caption" color="muted">com valor pré-selecionado</Typography>
        <ComboboxPreselected />
      </div>
    </div>
  ),
  parameters: { controls: { disable: true } },
};

function ComboboxPreselected() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("react");
  const selected = FRAMEWORKS.find((f) => f.value === value);

  return (
    <ComboboxAnchor open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-full justify-between font-normal text-body-sm">
          <span className="text-foreground">{selected?.label}</span>
          <CaretUpDown size={14} className="shrink-0 text-muted-foreground" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup>
              {FRAMEWORKS.map((f) => (
                <CommandCheckItem
                  key={f.value}
                  value={f.value}
                  selected={value === f.value}
                  onSelect={(v) => { setValue(v); setOpen(false); }}
                >
                  {f.label}
                </CommandCheckItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ComboboxContent>
    </ComboboxAnchor>
  );
}

export const ComboboxMultiple: Story = {
  name: "Combobox — seleção múltipla",
  render: () => <ComboboxMultipleExample />,
  parameters: { controls: { disable: true } },
};

function ComboboxMultipleExample() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>([]);

  const toggle = (v: string) =>
    setValues((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);

  const label = values.length === 0
    ? "Selecione frameworks..."
    : values.length === 1
    ? FRAMEWORKS.find((f) => f.value === values[0])?.label
    : `${values.length} selecionados`;

  return (
    <ComboboxAnchor open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-full justify-between font-normal text-body-sm">
          <span className={values.length ? "text-foreground" : "text-muted-foreground"}>
            {label}
          </span>
          <CaretUpDown size={14} className="shrink-0 text-muted-foreground" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            <CommandGroup>
              {FRAMEWORKS.map((f) => (
                <CommandCheckItem
                  key={f.value}
                  value={f.value}
                  selected={values.includes(f.value)}
                  onSelect={() => toggle(f.value)}
                >
                  {f.label}
                </CommandCheckItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ComboboxContent>
    </ComboboxAnchor>
  );
}

export const ComboboxGrouped: Story = {
  name: "Combobox — grupos",
  render: () => <ComboboxGroupedExample />,
  parameters: { controls: { disable: true } },
};

const ITEMS_GROUPED = {
  Frontend: ["React", "Vue", "Angular", "Svelte"],
  Backend:  ["Next.js", "Remix", "Astro"],
};

function ComboboxGroupedExample() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <ComboboxAnchor open={open} onOpenChange={setOpen}>
      <ComboboxTrigger asChild>
        <Button variant="outline" className="w-56 justify-between font-normal text-body-sm">
          <span className={value ? "text-foreground" : "text-muted-foreground"}>
            {value || "Selecione..."}
          </span>
          <CaretUpDown size={14} className="shrink-0 text-muted-foreground" />
        </Button>
      </ComboboxTrigger>
      <ComboboxContent>
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado.</CommandEmpty>
            {Object.entries(ITEMS_GROUPED).map(([group, items], i) => (
              <>
                {i > 0 && <CommandSeparator key={`sep-${group}`} />}
                <CommandGroup key={group} heading={group}>
                  {items.map((item) => (
                    <CommandCheckItem
                      key={item}
                      value={item}
                      selected={value === item}
                      onSelect={(v) => { setValue(v); setOpen(false); }}
                    >
                      {item}
                    </CommandCheckItem>
                  ))}
                </CommandGroup>
              </>
            ))}
          </CommandList>
        </Command>
      </ComboboxContent>
    </ComboboxAnchor>
  );
}
