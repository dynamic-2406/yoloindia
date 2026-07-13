import { useEffect, useState } from 'react';
import { getCachedInrToUsdRate, getFallbackInrToUsdRate, getInrToUsdRate } from '../services/exchangeRate';

export const useUsdRate = () => {
  const [rate, setRate] = useState(getCachedInrToUsdRate() || getFallbackInrToUsdRate());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getInrToUsdRate()
      .then((latestRate) => {
        if (!cancelled && latestRate) {
          setRate(latestRate);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { rate, loading };
};

