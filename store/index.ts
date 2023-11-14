import {
  CoinsMarketsApiResponse,
  CoinsCategoriesApiResponse,
  GlobalSatisticsApiResponse,
} from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface StoreState {
  stats?: GlobalSatisticsApiResponse['data'];
  market_cap?: CoinsMarketsApiResponse;
  categories?: CoinsCategoriesApiResponse;
}

export const useAppStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        stats: undefined,
        market_cap: undefined,
        categories: undefined,
      }),
      { name: 'store:persist' }
    )
  )
);
