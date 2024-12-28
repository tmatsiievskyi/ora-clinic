import { ReactNode, useState } from "react";
import { cnm } from "@/global/utils";
import { TDataTableProps, TSortDirection, TTableColumn } from "./_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table.component";
import { Translate } from "../Translate";

export const WithTable = <T extends { _id?: string }>({
  data,
  columns,
  onSort,
  renderHeader,
  renderBody,
  tableCN,
  tableHeaderCN,
  tableHeaderRowCN,
  tableBodyCN,
  tableRowCN,
  tableCellCN,
}: TDataTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<TSortDirection>(null);

  const handleSort = (column: TTableColumn<T>) => {
    if (!column.sortable) return;

    const isAsc = sortColumn === column.key && sortDirection === "asc";
    const shouldBeNull = sortColumn === column.key && sortDirection === "desc";
    const direction = isAsc ? "desc" : "asc";

    setSortColumn(shouldBeNull ? null : column.key);
    setSortDirection(shouldBeNull ? null : direction);
    onSort?.(shouldBeNull ? null : column.key, shouldBeNull ? null : direction);
  };

  const defaultRenderHeader = () => (
    <TableRow className={cnm(tableRowCN)}>
      <>
        {columns.map((column) => (
          <TableHead
            className={cnm(tableHeaderRowCN)}
            key={column.key.toString()}
            onClick={() => handleSort(column)}
          >
            <span>
              <Translate i18nKey={column.header} />
            </span>
          </TableHead>
        ))}
      </>
    </TableRow>
  );

  const defaultRenderBody = () => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data && Array.isArray(data) && data.length > 0 ? (
        data.map((item) => (
          <TableRow className={cnm(tableRowCN)} key={item._id}>
            {columns.map((column) => (
              <TableCell
                className={cnm(tableCellCN)}
                key={column.key.toString()}
              >
                {column.render
                  ? column.render(item[column.key], item)
                  : (item[column.key] as ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow className={cnm(tableRowCN)}>
          <TableCell
            className={cnm("p-2 text-center", tableCellCN)}
            colSpan={columns.length}
          >
            No data available
          </TableCell>
        </TableRow>
      )}
    </>
  );

  return (
    <div className="overflow-x-auto">
      <Table className={cnm("w-full border-collapse", tableCN)}>
        <TableHeader className={cnm(tableHeaderCN)}>
          {renderHeader
            ? renderHeader(columns, handleSort)
            : defaultRenderHeader()}
        </TableHeader>
        <TableBody className={cnm(tableBodyCN)}>
          {renderBody ? renderBody(data, columns) : defaultRenderBody()}
        </TableBody>
      </Table>
    </div>
  );
};
