"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Episode {
  uuid: string;
  order: number;
  title: string;
  created_at: Date;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const params = useParams<{ slug: string }>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Table of contents</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const rowData = row.original as Episode;
                const orderValue = rowData.order;
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-0"
                  >
                    <div className="w-full grid grid-cols-2">
                      {row.getVisibleCells().map((cell, index) => (
                        <Link
                          key={cell.id}
                          href={`${params.slug}/${orderValue}`}
                        >
                          <TableCell
                            className={`px-6 py-4 ${
                              index === 0 ? "text-start" : "text-end"
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        </Link>
                      ))}
                    </div>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
