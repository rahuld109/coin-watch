'use client';

import React from 'react';
import type { FC } from 'react';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import NavigationItems from './NavigationItems';

interface NavbarProps {
  globalStatistics: React.ReactNode;
}

const Navbar: FC<NavbarProps> = ({ globalStatistics }) => {
  return (
    <NavigationMenu>
      {globalStatistics}

      <div className="flex flex-wrap items-center px-6 border border-t-0 ">
        <div className="flex flex-wrap items-center gap-4">
          <a href="/" className="mr-4 font-mono text-xl">
            CoinWatch
          </a>
          <NavigationItems />
        </div>
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
