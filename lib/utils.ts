import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  compactDisplay: 'short',
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

export const customFormatter = (value: number, fixed?: number) => {
  const trillion = 1_000_000_000_000;
  const billion = 1_000_000_000;
  const million = 1_000_000;

  if (value >= trillion) {
    return `${formatter.format(value / trillion)} Trillion`;
  } else if (value >= billion) {
    return `${formatter.format(value / billion)} Billion`;
  } else if (value >= million) {
    return `${formatter.format(value / million)} Million`;
  } else {
    return formatter.format(value);
  }
};

export const formatPercentage = (value: number, fixed?: number) => {
  const formattedValue = Math.abs(value).toFixed(fixed);
  return `${formattedValue}%`;
};

export function formatToTime(timestamp: number): string {
  // Convert Unix timestamp to milliseconds
  const date = new Date(timestamp * 1000);

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const period = hours < 12 ? 'AM' : 'PM';
  const formattedHours = hours % 12 || 12;

  // Create a formatted date string
  const formattedDate = `${formattedHours}:${minutes} ${period}`;

  return formattedDate;
}

export function isURL(value: string) {
  try {
    // Attempt to create a URL object with the given string
    new URL(value);
    return true;
  } catch (error) {
    // If an error is thrown, the string is not a valid URL
    return false;
  }
}
