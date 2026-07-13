import { getCachedInrToUsdRate, getFallbackInrToUsdRate } from '../services/exchangeRate';

export const INR_TO_USD_RATE = getCachedInrToUsdRate() || getFallbackInrToUsdRate();

export const convertInrToUsd = (amountInInr, rate = INR_TO_USD_RATE) => {
  if (amountInInr == null || Number.isNaN(Number(amountInInr))) return 0;
  return Number(amountInInr) / rate;
};

export const convertUsdToInr = (amountInUsd, rate = INR_TO_USD_RATE) => {
  if (amountInUsd == null || Number.isNaN(Number(amountInUsd))) return 0;
  return Number(amountInUsd) * rate;
};

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

export const getDiscount = (original, current) =>
  Math.round(((original - current) / original) * 100);

export const truncate = (text, length = 80) =>
  text.length > length ? text.slice(0, length) + '...' : text;

export const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: 'smooth' });

export const generateStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? 'full' : i < rating ? 'half' : 'empty');
};
