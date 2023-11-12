import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import { ExchangesApiResponse } from '@/types';

const ExcangesPage = async ({}) => {
  const res = await fetch(ENDPOINTS.EXCHANGES + '?per_page=100&page=1', {
    next: {
      revalidate: NEXT_REVALIDATE_TIME,
    },
  });

  const listOfExchanges: ExchangesApiResponse = await res.json();

  return <pre>{JSON.stringify(listOfExchanges, null, 2)}</pre>;
};

export default ExcangesPage;
