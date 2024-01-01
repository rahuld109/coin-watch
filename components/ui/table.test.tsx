import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from './table';

describe('Table Component', () => {
  it('renders a table with header, body, and footer', () => {
    render(
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          <TableRow>
            <TableCell>Row 1, Cell 1</TableCell>
            <TableCell>Row 1, Cell 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2, Cell 1</TableCell>
            <TableCell>Row 2, Cell 2</TableCell>
          </TableRow>
        </TableBody>

        {/* Footer */}
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    // Assertions for content
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Row 1, Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2, Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Row 1, Cell 2')).toBeInTheDocument();
    expect(screen.getByText('Row 2, Cell 2')).toBeInTheDocument();
    expect(screen.getByText('Footer 1')).toBeInTheDocument();
    expect(screen.getByText('Footer 2')).toBeInTheDocument();

    // Check the number of headers, rows, and cells
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(2);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4);

    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(6);
  });

  it('renders an empty table', () => {
    render(
      <Table>
        {/* Header */}
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>

        {/* Empty Body */}
        <TableBody />

        {/* Empty Footer */}
        <TableFooter />
      </Table>
    );

    // Check if the table exists
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check if there are 2 th (header cells)
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(2);

    // Check if there is 1 tr for headers
    const rows = screen.queryAllByRole('row');
    expect(rows).toHaveLength(1);
  });
});
