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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CoinsMarketsApiResponse } from '@/types';
import Image from 'next/image';
import { Trend } from '../ui/trend';

export const columns: ColumnDef<CoinsMarketsApiResponse[0]>[] = [
  {
    accessorKey: 'ranking',
    header: '#',
    cell: ({ row }) => {
      return <div className="capitalize">{row.original.market_cap_rank}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Coin',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 capitalize">
        <Image
          src={row.original.image}
          width={20}
          height={20}
          alt={row.getValue('name')}
        />
        {row.getValue('name')}
        <span className="text-xs uppercase text-slate-400">
          {row.original.symbol}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const formatter = new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        notation: 'standard',
        compactDisplay: 'short',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return (
        <div className="lowercase">
          {formatter.format(row.original.current_price)}
        </div>
      );
    },
  },
  {
    accessorKey: '1h',
    header: '1h',
    cell: ({ row }) => {
      return (
        <Trend
          percentage={row.original.price_change_percentage_1h_in_currency}
          fixed={2}
        />
      );
    },
  },
  {
    accessorKey: '24h',
    header: '24h',
    cell: ({ row }) => {
      return (
        <Trend
          percentage={row.original.price_change_percentage_24h_in_currency}
          fixed={2}
        />
      );
    },
  },
  {
    accessorKey: '7d',
    header: '7d',
    cell: ({ row }) => {
      return (
        <Trend
          percentage={row.original.price_change_percentage_7d_in_currency}
          fixed={2}
        />
      );
    },
  },
  {
    accessorKey: 'volume',
    header: 'Volume',
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
          {formatter.format(row.original.total_volume)}
        </div>
      );
    },
  },
  {
    accessorKey: 'markte cap',
    header: 'Mkt Cap',
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
          {formatter.format(row.original.market_cap)}
        </div>
      );
    },
  },
];

export function CoinsMarketCapTable({
  data,
}: {
  data: CoinsMarketsApiResponse;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },
    },
    state: {
      sorting,
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
