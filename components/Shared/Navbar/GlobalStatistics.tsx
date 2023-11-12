import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import { formatPercentage, formatToTime, formatter } from '@/lib/utils';
import { GlobalSatisticsApiResponse } from '@/types';
import Link from 'next/link';
import React from 'react';
import type { FC } from 'react';
import { Trend } from '../../ui/trend';
import { DarkModeToggle } from './DarkModeToggle';
import { Button } from '@/components/ui/button';

interface GlobalStatisticsProps {}

const GlobalStatistics: FC<GlobalStatisticsProps> = async ({}) => {
  const res = await fetch(ENDPOINTS.GLOBAL, {
    next: {
      revalidate: NEXT_REVALIDATE_TIME,
    },
  });

  const { data: stats }: GlobalSatisticsApiResponse = await res.json();

  const market_cap_percentage_keys = Object.keys(stats.market_cap_percentage);

  return (
    <div className="flex flex-wrap justify-between gap-2 px-5 py-1 border">
      <ul className="flex flex-wrap gap-3 py-2">
        <li className="flex items-center gap-1 text-xs">
          <span>Coins:</span>
          <Link href="/">
            <strong className="antialiased text-blue-500 hover:subpixel-antialiased">
              {stats.active_cryptocurrencies}
            </strong>
          </Link>
        </li>

        <li className="flex items-center gap-1 text-xs">
          <span>Exchanges:</span>
          <Link href="/exchanges">
            <strong className="antialiased text-blue-500 hover:subpixel-antialiased">
              {stats.markets}
            </strong>
          </Link>
        </li>

        <li className="flex items-center gap-1 text-xs">
          <span>Market Cap:</span>
          <span className="flex items-center gap-1">
            <Link href="/global-charts">
              <strong className="antialiased text-blue-500 hover:subpixel-antialiased">
                {formatter.format(stats.total_market_cap.usd)}
              </strong>
            </Link>
            <Trend percentage={stats.market_cap_change_percentage_24h_usd} />
          </span>
        </li>

        <li className="flex items-center gap-1 text-xs">
          <span>Dominance:</span>
          <Link href="/global-charts" className="flex gap-2">
            <strong className="antialiased text-blue-500 hover:subpixel-antialiased">
              {market_cap_percentage_keys[0].toLocaleUpperCase()}:{' '}
              {formatPercentage(
                stats.market_cap_percentage[market_cap_percentage_keys[0]]
              )}
            </strong>

            <strong className="antialiased text-blue-500 hover:subpixel-antialiased">
              {market_cap_percentage_keys[1].toLocaleUpperCase()}:{' '}
              {formatPercentage(
                stats.market_cap_percentage[market_cap_percentage_keys[1]]
              )}
            </strong>
          </Link>
        </li>

        <li className="flex items-center gap-1 text-xs">
          <span>Updated At:</span>
          <Link href="/exchanges">
            <strong className="antialiased text-blue-500 hover:subpixel-antialiased">
              {formatToTime(stats.updated_at)}
            </strong>
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        <DarkModeToggle />
        <Button variant="outline" size="sm">
          Log in
        </Button>
        <Button className="text-white bg-blue-600" size="sm">
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default GlobalStatistics;
