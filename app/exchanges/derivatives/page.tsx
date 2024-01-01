import DerivativesTable from '@/components/DerivativesPage/DerivativesTable';
import { ENDPOINTS, NEXT_REVALIDATE_TIME } from '@/constants/Shared';
import StoreInitializer from '@/store/StoreInitializer';
import { DerivativesExchangeApiResponse } from '@/types';

const DerivativesPage = async ({}) => {
  const res = await fetch(
    ENDPOINTS.DERIVATIVES.EXCHANGES + '?per_page=250&page=1',
    {
      next: {
        revalidate: NEXT_REVALIDATE_TIME,
      },
    }
  );

  const listOfDerivativesExchanges: DerivativesExchangeApiResponse =
    await res.json();

  return (
    <>
      <StoreInitializer state={{ derivatives: listOfDerivativesExchanges }} />
      <h2 className="mt-5 text-xl">
        Top Derivative Exchanges Ranked by Open Interest & Trade Volume
      </h2>
      <p className="flex items-center text-sm text-slate-400">
        View the top cryptocurrency derivatives exchanges based on trade volume
        and open interest.
      </p>
      <DerivativesTable data={listOfDerivativesExchanges} />
    </>
  );
};

export default DerivativesPage;
