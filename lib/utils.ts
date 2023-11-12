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
