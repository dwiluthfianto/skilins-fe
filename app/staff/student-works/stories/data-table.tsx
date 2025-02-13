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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useDebounce from '@/lib/debounce';
import { useStoryByStaff } from '@/hooks/use-story';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategory } from '@/hooks/use-category';
import Combobox from '@/components/skilins/combo-box';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';
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

  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [status, setStatus] = React.useState('');

  const [limit, setLimit] = React.useState('10');

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: parseInt(limit, 10),
  });
  const debouncedSearch = useDebounce(search, 1000);

  const { categories } = useCategory();
  const { stories, isLoading, isError, last_page } = useStoryByStaff({
    page: pagination.pageIndex + 1,
    limit: parseInt(limit, 10),
    search: debouncedSearch,
    category,
    status,
  });

  React.useEffect(() => {
    setPagination({ ...pagination, pageIndex: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, limit]);

  const table = useReactTable({
    data: stories || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      columnPinning: {
        left: [],
        right: ['actions'],
      },
    },

    manualPagination: true,
    pageCount: last_page,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className='bg-white dark:bg-black border rounded-md p-6 aspect-square lg:aspect-auto flex justify-between flex-col'>
      <div className='flex flex-col items-start md:items-center md:flex-row justify-between gap-4'>
        <div>
          <p className='font-bold text-4xl'>Stories</p>
          <p className='text-sm'>Where Every Page Turns a New Adventure.</p>
        </div>
      </div>
      <div className='flex flex-wrap items-center py-4 gap-2 justify-between'>
        <Input
          placeholder='Filter title...'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className='max-w-sm'
        />
        <div className='flex gap-2 flex-wrap'>
          <Combobox
            items={categories}
            placeholder='Category'
            onSelect={(val) => setCategory(val)}
          />
          <Combobox
            items={statusComponent}
            placeholder='Status'
            onSelect={(val) => setStatus(val)}
          />
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
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
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.getIsPinned()
                          ? 'sticky right-0 z-50 bg-white dark:bg-black'
                          : ''
                      }
                    >
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
      </div>
      <div className='flex items-center justify-between space-x-2 py-4'>
        <div className='flex flex-wrap md:space-x-2 items-center'>
          <p className='font-semibold text-sm'>Rows per page</p>
          <Select onValueChange={(value) => setLimit(value)} defaultValue='10'>
            <SelectTrigger className='w-fit'>
              <SelectValue defaultValue={'10'} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='25'>25</SelectItem>
                <SelectItem value='50'>40</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex items-center gap-2'>
          <span className='font-semibold text-sm mr-4'>
            Page {pagination.pageIndex + 1} of {last_page}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <div className='flex items-center gap-1'>
            {last_page > 0 &&
              [...Array(last_page)].map((_, idx) => {
                const pageNumber = idx + 1;
                const isCurrentPage = pagination.pageIndex + 1 === pageNumber;

                // Show first page, last page, current page, and pages around current page
                if (
                  pageNumber === 1 ||
                  pageNumber === last_page ||
                  (pageNumber >= pagination.pageIndex + 1 - 1 &&
                    pageNumber <= pagination.pageIndex + 1 + 1)
                ) {
                  return (
                    <Button
                      key={idx}
                      variant={isCurrentPage ? 'default' : 'outline'}
                      size='sm'
                      onClick={() =>
                        setPagination({ ...pagination, pageIndex: idx })
                      }
                      className='w-8'
                    >
                      {pageNumber}
                    </Button>
                  );
                }

                // Show dots if there's a gap
                if (pageNumber === 2 || pageNumber === last_page - 1) {
                  return <span key={idx}>...</span>;
                }

                return null;
              })}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
