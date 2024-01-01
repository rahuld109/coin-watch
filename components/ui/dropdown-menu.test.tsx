import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';

describe('DropdownMenu Component', () => {
  it('renders a dropdown menu trigger', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Toggle</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="dropdown-menu-content">
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('Toggle')).toBeInTheDocument();
  });

  it('opens the dropdown on trigger click and items are visible', async () => {
    const { click } = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Toggle</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    // Dropdown is closed initially
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();

    // Click on the trigger to open the dropdown
    await click(screen.getByRole('button', { name: /Toggle/i }));

    // Dropdown is open
    expect(
      screen.getByRole('menuitem', { name: 'Item 1' })
    ).toBeInTheDocument();
  });

  it('calls the onClick handler when a menu item is clicked', async () => {
    const mockSetTheme = jest.fn();
    const { click } = userEvent.setup();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Toggle</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => mockSetTheme('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => mockSetTheme('dark')}>
            Dark
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    // Click on the trigger to open the dropdown
    await click(screen.getByText('Toggle'));

    // Click on a menu item
    await click(screen.getByText('Light'));

    // Check if the onClick handler was called with the correct argument
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
