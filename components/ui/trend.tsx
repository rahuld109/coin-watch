import * as React from 'react';
import { cn, formatPercentage } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import classes from './trend.module.css';

const trendVariants = cva(
  'inline-flex items-center justify-center font-medium',
  {
    variants: {
      variant: {
        default: '',
        positive: 'text-green-500',
        negative: 'text-red-500',
      },
      size: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface TrendProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof trendVariants> {
  percentage: number;
  showArrow?: boolean;
}

const Trend = React.forwardRef<HTMLSpanElement, TrendProps>(
  ({ percentage, size, className, showArrow = true, ...props }, ref) => {
    const isNegative = percentage < 0;

    return (
      <span
        className={cn(
          trendVariants({
            variant: isNegative ? 'negative' : 'positive',
            size,
            className,
          }),
          showArrow && isNegative ? classes.caret_down : classes.caret_up
        )}
        ref={ref}
        {...props}
      >
        {formatPercentage(percentage, 2)}
      </span>
    );
  }
);

Trend.displayName = 'Trend';

export { Trend, trendVariants };
