import { cnm } from "@/global/utils";
import { FC, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

const Table: FC<HTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => {
  return <table className={cnm("text-sm", className)} {...props} />;
};
Table.displayName = "Table";

const TableHeader: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return <thead className={cnm("[&_tr]:border-b ", className)} {...props} />;
};
TableHeader.displayName = "TableHeader";

const TableBody: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return (
    <tbody
      className={cnm("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
};
TableBody.displayName = "TableBody";

const TableFooter: FC<HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return (
    <tfoot
      className={cnm(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
};
TableFooter.displayName = "TableFooter";

const TableRow: FC<HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => {
  return (
    <tr
      className={cnm(
        "border-b border-bkg-frg/10 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
};
TableRow.displayName = "TableRow";

const TableHead: FC<ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return (
    <th
      className={cnm(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
};
TableHead.displayName = "TableHead";

const TableCell: FC<TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return (
    <td
      className={cnm(
        "p-0 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
};
TableCell.displayName = "TableCell";

const TableCaption: FC<HTMLAttributes<HTMLTableCaptionElement>> = ({
  className,
  ...props
}) => {
  return <caption className={className} {...props} />;
};
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableHead,
  TableCaption,
};
