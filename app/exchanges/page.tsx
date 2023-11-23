import ExchangesTable from '@/components/Exchanges/ExchangesTable';
import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import StoreInitializer from '@/store/StoreInitializer';
import { ExchangesApiResponse } from '@/types';
import { Fragment } from 'react';

const ExcangesPage = async ({}) => {
  const res = await fetch(ENDPOINTS.EXCHANGES + '?per_page=250&page=1', {
    next: {
      revalidate: NEXT_REVALIDATE_TIME,
    },
  });

  const listOfExchanges: ExchangesApiResponse = await res.json();

  return (
    <Fragment>
      <StoreInitializer state={{ exchanges: listOfExchanges }} />
      <h2 className="mt-5 text-xl">Top Crypto Categories By Market Cap</h2>
      <p className="flex items-center text-sm text-slate-400">
        View the largest cryptocurrency categories based on market
        capitalization.
      </p>
      <ExchangesTable data={listOfExchanges} />
    </Fragment>
  );
};

export default ExcangesPage;
