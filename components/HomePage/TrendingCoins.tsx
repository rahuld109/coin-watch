import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import { TrendingApiResponse } from '@/types';
import React from 'react';

const TrendingCoins = async ({}) => {
  const res = await fetch(ENDPOINTS.TRENDING, {
    next: {
      revalidate: NEXT_REVALIDATE_TIME,
    },
  });

  const trends: TrendingApiResponse = await res.json();

  return <pre className="mt-5">{JSON.stringify(trends, null, 2)}</pre>;
};

export default TrendingCoins;
