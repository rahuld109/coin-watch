'use client';

import React from 'react';
import type { FC } from 'react';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import NavigationItems from './NavigationItems';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  globalStatistics: React.ReactNode;
}

const Navbar: FC<NavbarProps> = ({ globalStatistics }) => {
  return (
    <NavigationMenu>
      {globalStatistics}

      <div className="flex flex-wrap items-center px-3 border border-t-0 ">
        <div className="flex flex-wrap items-center gap-4">
          <div className="mr-4 font-mono text-xl">CoinWatch</div>
          <NavigationItems />
        </div>

        <Button variant="ghost" className="flex items-center gap-2 ml-auto">
          <Star size={16} />
          Watchlist
        </Button>
      </div>
    </NavigationMenu>
  );
};

export default Navbar;
