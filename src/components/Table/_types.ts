import { ReactNode } from "react";

export type TSortDirection = "asc" | "desc" | null;

export type TTableColumn<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => ReactNode;
};

export type TDataTableProps<T extends { _id?: string }> = {
  data?: T[] | Record<string, T[]> | Record<string, Record<string, T[]>> | null;
  columns: TTableColumn<T>[];
  onSort?: (key: keyof T | null, direction: TSortDirection) => void;
  renderHeader?: (
    columns: TTableColumn<T>[],
    onSort: (column: TTableColumn<T>) => void,
  ) => ReactNode;
  renderBody?: (
    data:
      | T[]
      | Record<string, T[]>
      | Record<string, Record<string, T[]>>
      | null
      | undefined,
    columns: TTableColumn<T>[],
  ) => ReactNode;
  tableCN?: string;
  tableHeaderCN?: string;
  tableHeadCN?: string;
  tableHeaderRowCN?: string;
  tableBodyCN?: string;
  tableRowCN?: string;
  tableCellCN?: string;
};
