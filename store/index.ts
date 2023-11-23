import {
  CoinsMarketsApiResponse,
  CoinsCategoriesApiResponse,
  GlobalSatisticsApiResponse,
  ExchangesApiResponse,
} from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface StoreState {
  stats?: GlobalSatisticsApiResponse['data'];
  market_cap?: CoinsMarketsApiResponse;
  categories?: CoinsCategoriesApiResponse;
  exchanges?: ExchangesApiResponse;
}

export const useAppStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        stats: undefined,
        market_cap: undefined,
        categories: undefined,
        exchanges: undefined,
      }),
      { name: 'store:persist' }
    )
  )
);
