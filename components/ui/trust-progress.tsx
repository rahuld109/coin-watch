import { cn } from '@/lib/utils';
import React from 'react';
import type { FC } from 'react';

interface TrustProgressProps {
  value: number;
}

const convertValueIntoPercentage = (value: number): number => {
  const clampedValue = Math.max(0, Math.min(10, value));
  return clampedValue * 10;
};

const TrustProgress: FC<TrustProgressProps> = ({ value }) => {
  const percentage = convertValueIntoPercentage(value);

  if (process.env.NODE_ENV === 'development' && (value < 0 || value > 10)) {
    console.warn(
      'Warning: TrustProgress component received an out-of-range value. Expected a value between 0 and 10.'
    );
  }

  return (
    <span
      role="progressbar"
      className="bg-slate-200 inline-block h-[10px] rounded w-2/3"
    >
      <span
        data-testid="trust-progress-testId"
        className={cn(`bg-blue-500 block rounded h-full`)}
        style={{ width: `${percentage}%` }}
      />
    </span>
  );
};

export default TrustProgress;
