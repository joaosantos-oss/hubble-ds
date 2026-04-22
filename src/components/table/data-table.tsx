import * as React from "react";
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUp, ArrowDown, ArrowsDownUp } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";
import { Button } from "@/components/button/button";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@/components/pagination/pagination";

// ─── SortableHeader ───────────────────────────────────────────────────────────

interface SortableHeaderProps {
  label: string;
  sorted: false | "asc" | "desc";
  onSort: () => void;
  className?: string;
}

export function SortableHeader({ label, sorted, onSort, className }: SortableHeaderProps) {
  return (
    <button
      type="button"
      onClick={onSort}
      className={cn(
        "inline-flex items-center gap-1.5 text-caption font-medium text-muted-foreground",
        "hover:text-foreground transition-colors",
        "rounded focus-visible:outline-none focus-visible:shadow-focus-ring",
        className
      )}
    >
      {label}
      {sorted === "asc"  ? <ArrowUp size={12} /> :
       sorted === "desc" ? <ArrowDown size={12} /> :
       <ArrowsDownUp size={12} className="opacity-40" />}
    </button>
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  pageSize?: number;
  filterColumn?: string;
  filterPlaceholder?: string;
}

export function DataTable<TData>({
  columns,
  data,
  pageSize = 10,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: { pagination: { pageSize } },
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  // Build visible page numbers with ellipsis
  const pages = React.useMemo(() => {
    if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i);
    if (pageIndex <= 3) return [0, 1, 2, 3, 4, "...", pageCount - 1];
    if (pageIndex >= pageCount - 4) return [0, "...", pageCount - 5, pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1];
    return [0, "...", pageIndex - 1, pageIndex, pageIndex + 1, "...", pageCount - 1];
  }, [pageIndex, pageCount]);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent">
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between gap-4">
          <span className="text-caption text-muted-foreground shrink-0">
            {table.getFilteredSelectedRowModel().rows.length > 0
              ? `${table.getFilteredSelectedRowModel().rows.length} de ${table.getFilteredRowModel().rows.length} linha(s) selecionada(s)`
              : `${table.getFilteredRowModel().rows.length} resultado(s)`}
          </span>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} />
              </PaginationItem>
              {pages.map((p, i) =>
                p === "..." ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink isActive={p === pageIndex} onClick={() => table.setPageIndex(p as number)}>
                      {(p as number) + 1}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
