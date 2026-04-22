import type { Meta, StoryObj } from "@storybook/react";
import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/badge/badge";
import { Checkbox } from "@/components/checkbox/checkbox";
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "./table";
import { DataTable, SortableHeader } from "./data-table";
import { Typography } from "@/components/typography/typography";

const meta: Meta = {
  title: "Data Display/Table & Data Table",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Table simples e Data Table com ordenação, filtro e paginação via TanStack Table.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ─── Table simples ────────────────────────────────────────────────────────────

export const SimpleTable: Story = {
  name: "Table — simples",
  render: () => (
    <Table>
      <TableCaption>Faturas do último trimestre.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Fatura</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Método</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.slice(0, 5).map((inv) => (
          <TableRow key={inv.id}>
            <TableCell className="font-medium">{inv.invoice}</TableCell>
            <TableCell>
              <Badge variant={inv.status === "Pago" ? "success" : inv.status === "Pendente" ? "warning" : "destructive"}>
                {inv.status}
              </Badge>
            </TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell className="text-right">{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">R$ 2.500,00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: { controls: { disable: true } },
};

// ─── Data Table ───────────────────────────────────────────────────────────────

type Invoice = {
  id: string;
  invoice: string;
  status: "Pago" | "Pendente" | "Cancelado";
  method: string;
  amount: string;
  date: string;
};

const INVOICES: Invoice[] = Array.from({ length: 32 }, (_, i) => ({
  id: `${i + 1}`,
  invoice: `INV-${String(i + 1).padStart(4, "0")}`,
  status: (["Pago", "Pendente", "Cancelado"] as const)[i % 3],
  method: ["Cartão de crédito", "PIX", "Boleto", "Transferência"][i % 4],
  amount: `R$ ${((i + 1) * 150).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
  date: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString("pt-BR"),
}));

const columns: ColumnDef<Invoice, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() ? "indeterminate" : false)}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoice",
    header: ({ column }) => (
      <SortableHeader
        label="Fatura"
        sorted={column.getIsSorted()}
        onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <span className="font-medium">{row.getValue("invoice")}</span>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <SortableHeader
        label="Data"
        sorted={column.getIsSorted()}
        onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <SortableHeader
        label="Status"
        sorted={column.getIsSorted()}
        onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      const s = row.getValue("status") as Invoice["status"];
      return (
        <Badge variant={s === "Pago" ? "success" : s === "Pendente" ? "warning" : "destructive"}>
          {s}
        </Badge>
      );
    },
  },
  {
    accessorKey: "method",
    header: "Método",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <SortableHeader
        label="Valor"
        sorted={column.getIsSorted()}
        onSort={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => <span className="text-right block">{row.getValue("amount")}</span>,
  },
];

export const DataTableStory: Story = {
  name: "Data Table — com ordenação, seleção e paginação",
  render: () => <DataTable columns={columns} data={INVOICES} pageSize={8} />,
  parameters: { controls: { disable: true } },
};

