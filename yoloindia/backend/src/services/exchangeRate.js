import { config } from '../config.js';

const RATE_URL = 'https://api.frankfurter.dev/v2/rate/USD/INR';

let cachedRate = config.exchangeRateFallback;
let cachedRatePromise = null;

export const getFallbackInrToUsdRate = () => config.exchangeRateFallback;

export const getCachedInrToUsdRate = () => cachedRate;

export const getInrToUsdRate = async () => {
  if (cachedRatePromise) {
    return cachedRatePromise;
  }

  cachedRatePromise = fetch(RATE_URL)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Exchange rate request failed with status ${response.status}`);
      }

      const data = await response.json();
      const rate = Number(data?.rate);

      if (!rate || Number.isNaN(rate)) {
        throw new Error('Exchange rate API returned an invalid rate');
      }

      cachedRate = rate;
      return rate;
    })
    .catch((error) => {
      console.warn('Falling back to bundled INR to USD rate:', error.message);
      return cachedRate;
    });

  return cachedRatePromise;
};

