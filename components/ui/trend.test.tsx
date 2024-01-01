import React from 'react';
import { render } from '@testing-library/react';
import { Trend } from './trend';

describe('Trend Component', () => {
  test('renders with positive trend', () => {
    const { getByText } = render(<Trend percentage={10} variant="positive" />);

    const trendElement = getByText('10.00%');

    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveClass('text-green-500');
  });

  test('renders with negative trend', () => {
    const { getByText } = render(<Trend percentage={-5} variant="negative" />);

    const trendElement = getByText('5.00%');

    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveClass('text-red-500');
  });

  test('renders without arrow', () => {
    const { getByText, queryByTestId } = render(
      <Trend percentage={5} variant="positive" showArrow={false} />
    );

    const trendElement = getByText('5.00%');

    expect(trendElement).toBeInTheDocument();
    expect(trendElement).toHaveClass('text-green-500');
  });
});
