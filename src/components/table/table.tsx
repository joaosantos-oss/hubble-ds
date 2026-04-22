import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.ComponentPropsWithoutRef<"table">>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom font-sans", className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"thead">>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />
  )
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"tbody">>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.ComponentPropsWithoutRef<"tfoot">>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t border-border bg-accent-2 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  )
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentPropsWithoutRef<"tr">>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border transition-colors",
        // header rows
        "[thead_&]:bg-accent-2 [thead_&]:hover:bg-accent-3",
        // body rows
        "[tbody_&]:hover:bg-accent",
        "[tbody_&]:data-[state=selected]:bg-primary-accent-2",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<"th">>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-4 text-left align-middle",
        "text-caption font-medium text-muted-foreground",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.ComponentPropsWithoutRef<"td">>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "px-4 py-3 align-middle",
        "text-body-sm font-normal text-foreground",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.ComponentPropsWithoutRef<"caption">>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-body-sm text-muted-foreground", className)} {...props} />
  )
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
