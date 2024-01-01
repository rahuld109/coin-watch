import { CoinsCategoriesTable } from '@/components/CategoriesPage/CoinsCategoriesTable';
import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';

import StoreInitializer from '@/store/StoreInitializer';
import { CoinsCategoriesApiResponse } from '@/types';

const CategoriesPage = async ({}) => {
  const res = await fetch(ENDPOINTS.COINS.CATEGORIES, {
    next: {
      revalidate: NEXT_REVALIDATE_TIME,
    },
  });

  const listOfCategories: CoinsCategoriesApiResponse = await res.json();

  return (
    <>
      <StoreInitializer state={{ categories: listOfCategories }} />
      <h2 className="mt-5 text-xl">Top Crypto Categories By Market Cap</h2>
      <p className="flex items-center text-sm text-slate-400">
        View the largest cryptocurrency categories based on market
        capitalization.
      </p>
      <p className="flex items-center text-sm text-slate-400 mt-4">
        Click on a cryptocurrency category to view cryptocurrencies listed
        within the category and their price performance. Note: Some
        cryptocurrencies may overlap across multiple categories.
      </p>
      <CoinsCategoriesTable data={listOfCategories} />
    </>
  );
};

export default CategoriesPage;
