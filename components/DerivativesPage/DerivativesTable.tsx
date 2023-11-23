'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
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
import { DerivativesExchangeApiResponse } from '@/types';
import Image from 'next/image';
import { formatNumberWithCommas, isURL } from '@/lib/utils';

interface DerivativesTableProps {
  data: DerivativesExchangeApiResponse;
}

export const columns: ColumnDef<DerivativesExchangeApiResponse[0]>[] = [
  {
    accessorKey: 'ranking',
    header: '#',
    cell: ({ row }) => {
      return <div className="capitalize">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Exchange',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {!isURL(row.original.image) ? null : (
          <Image
            src={row.original.image}
            width={40}
            height={40}
            alt={row.getValue('name')}
          />
        )}

        <div className="flex flex-col capitalize">
          {row.getValue('name')}
          <span className="text-xs text-slate-400">
            {row.original.country ? 'Centralized' : 'Decentralized'}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'year_established',
    header: 'Year Established',
    cell: ({ row }) => {
      return (
        <div className="uppercase">
          {row.getValue('year_established') ? (
            <span className="bg-green-500 text-white px-2 py-[3px] rounded-sm text-xs">
              {row.getValue('year_established')}
            </span>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: '24h open interest',
    header: '24h Open Interest',
    cell: ({ row }) => {
      return (
        <div className="uppercase">
          {formatNumberWithCommas(
            Number(row.original.open_interest_btc).toFixed(2)
          )}{' '}
          btc
        </div>
      );
    },
  },
  {
    accessorKey: '24h volume',
    header: '24h Volume',
    cell: ({ row }) => {
      return (
        <div className="uppercase">
          {formatNumberWithCommas(
            Number(row.original.trade_volume_24h_btc).toFixed(2)
          )}{' '}
          btc
        </div>
      );
    },
  },
  {
    accessorKey: 'perpetuals',
    header: 'Perpetuals',
    cell: ({ row }) => {
      return row.original.number_of_perpetual_pairs;
    },
  },
  {
    accessorKey: 'futures',
    header: 'Futures',
    cell: ({ row }) => {
      return row.original.number_of_futures_pairs;
    },
  },
];

const DerivativesTable: React.FC<DerivativesTableProps> = ({ data }) => {
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
        pageSize: 100,
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
};

export default DerivativesTable;
