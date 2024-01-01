import React from 'react';
import { render } from '@testing-library/react';
import TrustProgress from './trust-progress';

describe('Trust Progress Component', () => {
  test('renders the trust progress with maximum value', () => {
    const { getByTestId } = render(<TrustProgress value={10} />);

    const trustProgressElement = getByTestId('trust-progress-testId');

    // Access the computed style of the element
    const elementStyle = window.getComputedStyle(trustProgressElement);

    // Assert that the width is 100%
    expect(elementStyle.getPropertyValue('width')).toBe('100%');
  });

  test('renders the trust progress minimum value', () => {
    const { getByTestId } = render(<TrustProgress value={0} />);

    const trustProgressElement = getByTestId('trust-progress-testId');

    // Access the computed style of the element
    const elementStyle = window.getComputedStyle(trustProgressElement);

    // Assert that the width is 100%
    expect(elementStyle.getPropertyValue('width')).toBe('0%');
  });

  test('renders the trust progress custom value', () => {
    const { getByTestId } = render(<TrustProgress value={7.5} />);

    const trustProgressElement = getByTestId('trust-progress-testId');

    // Access the computed style of the element
    const elementStyle = window.getComputedStyle(trustProgressElement);

    // Assert that the width is 100%
    expect(elementStyle.getPropertyValue('width')).toBe('75%');
  });

  test('renders the trust progress custom value', () => {
    const { getByTestId } = render(<TrustProgress value={7.5} />);

    const trustProgressElement = getByTestId('trust-progress-testId');

    // Access the computed style of the element
    const elementStyle = window.getComputedStyle(trustProgressElement);

    // Assert that the width is 100%
    expect(elementStyle.getPropertyValue('width')).toBe('75%');
  });

  test('renders TrustProgress with value lower than minimum', () => {
    const { getByTestId } = render(<TrustProgress value={-1} />);
    const trustProgressElement = getByTestId('trust-progress-testId');

    // Add assertions as needed
    expect(trustProgressElement).toHaveStyle('width: 0%');
  });

  test('renders TrustProgress with value higher than maximum', () => {
    const { getByTestId } = render(<TrustProgress value={11} />);
    const trustProgressElement = getByTestId('trust-progress-testId');

    // Add assertions as needed
    expect(trustProgressElement).toHaveStyle('width: 100%');
  });
});
