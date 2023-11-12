import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import { CoinMarketsApiResponse } from '@/types';

export default async function Home() {
  const res = await fetch(
    ENDPOINTS.COINS.MARKET +
      '?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=true&locale=en',
    {
      next: {
        revalidate: NEXT_REVALIDATE_TIME,
      },
    }
  );

  const listOfCoinMarkets: CoinMarketsApiResponse = await res.json();

  return <pre>{JSON.stringify(listOfCoinMarkets, null, 2)}</pre>;
}
