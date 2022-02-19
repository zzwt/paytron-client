import { useMemo } from 'react';
import { getCurrencySymbol } from '../../utils';
export default function useCurrency(fromAmount, rate, from, to) {
  const baseRate = useMemo(() => {
    if (!rate) return 0;
    if (rate.currencyPair.startsWith(from))
      return parseFloat(rate.midMarketRate);
    return 1 / rate.midMarketRate;
  }, [rate, from]);

  const fromSymbol = useMemo(() => getCurrencySymbol(from), [from]);

  const toSymbol = useMemo(() => getCurrencySymbol(to), [to]);

  const fromAmountText = useMemo(
    () => `${fromSymbol}${fromAmount} ${from}`,
    [fromSymbol, fromAmount, from]
  );

  const baseRateText = useMemo(
    () => `${fromSymbol}1 ${from} = ${toSymbol}${baseRate.toFixed(4)} ${to}`,
    [fromSymbol, from, toSymbol, to, baseRate]
  );

  const paytronFee = useMemo(
    () => `${toSymbol}${(fromAmount * baseRate * 0.005).toFixed(2)} ${to}`,
    [fromAmount, baseRate, toSymbol, to]
  );

  const paytronRateText = useMemo(
    () =>
      `${fromSymbol}1 ${from} = ${toSymbol}${(baseRate * 0.995).toFixed(
        4
      )} ${to}`,
    [fromSymbol, from, toSymbol, to, baseRate]
  );

  const finalToAmountText = useMemo(
    () => `${toSymbol}${(fromAmount * baseRate * 0.995).toFixed(2)} ${to}`,
    [toSymbol, fromAmount, baseRate, to]
  );

  return {
    fromAmountText,
    baseRateText,
    paytronFee,
    paytronRateText,
    finalToAmountText,
  };
}
