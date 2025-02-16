'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table';

import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useReportByStaff } from '@/hooks/use-report';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
import Combobox from '@/components/skilins/combo-box';
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}
const statusComponent = [
  { name: 'pending' },
  { name: 'rejected' },
  { name: 'approved' },
];

export function DataTable<TData, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});
  const [status, setStatus] = React.useState('');

  const { prakerin, isLoading, isError, last_page } = useReportByStaff({
    page: 1,
    limit: 10,
    status,
  });

  const table = useReactTable({
    data: prakerin || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    pageCount: last_page,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Card className='flex flex-col h-full overflow-auto rounded-md lg:col-span-2 lg:aspect-auto'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <div>
          <CardTitle>PKL Reports</CardTitle>
          <CardDescription>Showing the latest PKL Reports.</CardDescription>
        </div>
        <div>
          <div className='flex gap-2 flex-wrap'>
            <Combobox
              items={statusComponent}
              placeholder='Status'
              onSelect={(val) => setStatus(val)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className='max-h-80 overflow-auto'>
        <Table className='w-full h-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
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
