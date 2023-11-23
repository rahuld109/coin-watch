import { cn } from '@/lib/utils';
import React from 'react';
import type { FC } from 'react';

interface TrustProgressProps {
  value: number;
}

const TrustProgress: FC<TrustProgressProps> = ({ value }) => {
  return (
    <span className="bg-slate-200 inline-block h-[10px] rounded w-2/3">
      <span
        className={cn(`bg-blue-500 block rounded h-full`)}
        style={{ width: `${value}0%` }}
      />
    </span>
  );
};

export default TrustProgress;
