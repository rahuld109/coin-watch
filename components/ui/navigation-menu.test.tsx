import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from './navigation-menu';

describe('NavigationMenu Component', () => {
  it('renders the navigation menu with trigger, content, and items', async () => {
    const { click } = userEvent.setup();

    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu Trigger</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link 1</NavigationMenuLink>
              <NavigationMenuLink>Link 2</NavigationMenuLink>
              <NavigationMenuLink>Link 3</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );

    // Check if the trigger is present
    const menuTrigger = screen.getByText('Menu Trigger');
    expect(menuTrigger).toBeInTheDocument();

    // Check if the content is not visible initially
    const menuItemEleemnt = screen.queryByText('Link 1');
    expect(menuItemEleemnt).toBeNull();
  });
});
