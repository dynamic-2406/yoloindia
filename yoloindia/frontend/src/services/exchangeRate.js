const DEFAULT_INR_TO_USD_RATE = 95;

let cachedRate = DEFAULT_INR_TO_USD_RATE;
let cachedRatePromise = null;

export const getFallbackInrToUsdRate = () => DEFAULT_INR_TO_USD_RATE;

export const getCachedInrToUsdRate = () => cachedRate;

export const getInrToUsdRate = async () => {
  if (cachedRatePromise) {
    return cachedRatePromise;
  }

  cachedRatePromise = fetch('/api/exchange-rate')
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

