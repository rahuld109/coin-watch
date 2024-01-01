import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavigationItems from './NavigationItems';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';

describe('NavigationItems Component', () => {
  it('renders the navigation items', async () => {
    render(
      <NavigationMenu>
        <NavigationItems />
      </NavigationMenu>
    );

    // Check if the "Cryptocurrencies" menu item is present
    const cryptocurrenciesMenuItem = screen.getByText('Cryptocurrencies');
    expect(cryptocurrenciesMenuItem).toBeInTheDocument();

    const exchangesMenuItem = screen.getByText('Exchanges');
    expect(exchangesMenuItem).toBeInTheDocument();
  });

  it('renders the navigation items with submenus', async () => {
    const { click } = userEvent.setup();
    render(
      <NavigationMenu>
        <NavigationItems />
      </NavigationMenu>
    );

    // Check if the "Cryptocurrencies" menu item is present
    const cryptocurrenciesMenuItem = screen.getByText('Cryptocurrencies');
    expect(cryptocurrenciesMenuItem).toBeInTheDocument();

    // Open the submenu by clicking on the trigger
    await click(cryptocurrenciesMenuItem);

    // Check if submenu items are present
    expect(screen.getByText('Ranking')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();

    // Check if the "Exchanges" menu item is present
    const exchangesMenuItem = screen.getByText('Exchanges');
    expect(exchangesMenuItem).toBeInTheDocument();
  });
});
