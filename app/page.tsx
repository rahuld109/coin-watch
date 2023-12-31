import { CoinsMarketCapTable } from '@/components/HomePage/CoinsMarketCapTable';
import { Trend } from '@/components/ui/trend';
import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import { customFormatter } from '@/lib/utils';
import { useAppStore } from '@/store';
import StoreInitializer from '@/store/StoreInitializer';
import { CoinsMarketsApiResponse } from '@/types';

export default async function HomePage() {
  const res = await fetch(
    ENDPOINTS.COINS.MARKET +
      '?vs_currency=usd&order=market_cap_desc&per_page=200&price_change_percentage=1h%2C24h%2C7d&page=1&sparkline=true&locale=en',
    {
      next: {
        revalidate: NEXT_REVALIDATE_TIME,
      },
    }
  );

  const listOfCoinMarkets: CoinsMarketsApiResponse = await res.json();
  return (
    <>
      <StoreInitializer state={{ market_cap: listOfCoinMarkets }} />
      <h2 className="mt-5 text-xl">Cryptocurrency Prices by Market Cap</h2>
      <p className="flex items-center text-sm text-slate-400">
        The global crypto market cap is{' '}
        {`${customFormatter(
          useAppStore.getState().stats?.total_market_cap.usd!,
          2
        )}`}
        , a
        <Trend
          className="mx-1"
          fixed={2}
          percentage={
            useAppStore.getState().stats
              ?.market_cap_change_percentage_24h_usd || 0
          }
        />
        change over the last day.
      </p>
      <CoinsMarketCapTable data={listOfCoinMarkets} />
    </>
  );
}
