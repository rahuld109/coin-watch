import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import { CoinsCategoriesApiResponse } from '@/types';

const CategoriesPage = async ({}) => {
  const res = await fetch(ENDPOINTS.COINS.CATEGORIES, {
    next: {
      revalidate: NEXT_REVALIDATE_TIME,
    },
  });

  const listOfCategories: CoinsCategoriesApiResponse = await res.json();

  return <pre>{JSON.stringify(listOfCategories, null, 2)}</pre>;
};

export default CategoriesPage;
