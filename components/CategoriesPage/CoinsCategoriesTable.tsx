'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CoinsCategoriesApiResponse } from '@/types';
import Image from 'next/image';
import { isURL } from '@/lib/utils';

export const columns: ColumnDef<CoinsCategoriesApiResponse[0]>[] = [
  {
    accessorKey: 'ranking',
    header: '#',
    cell: ({ row }) => {
      return <div className="capitalize">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Coin',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'top gainers',
    header: 'Top Gainers',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {row.original.top_3_coins.map((imageUrl) => {
            if (!isURL(imageUrl)) return null;
            return (
              <Image
                key={imageUrl}
                src={imageUrl}
                width={20}
                height={20}
                alt={row.getValue('name')}
              />
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: 'markte cap',
    header: 'Market Capitalization',
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        notation: 'standard',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      return (
        <div className="lowercase">
          {row.original.market_cap
            ? formatter.format(row.original.market_cap)
            : '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'volume',
    header: '24h Volume',
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        notation: 'standard',
        compactDisplay: 'short',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      return (
        <div className="lowercase">
          {row.original.volume_24h
            ? formatter.format(row.original.volume_24h)
            : '-'}
        </div>
      );
    },
  },
];

export function CoinsCategoriesTable({
  data,
}: {
  data: CoinsCategoriesApiResponse;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },
    },
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="w-full mt-8">
      <div className="border rounded-md">
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
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
