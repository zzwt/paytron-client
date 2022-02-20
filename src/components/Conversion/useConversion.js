import { useMemo } from 'react';
import { getCurrencySymbol, toCurrency, round } from '../../utils';

export default function useConversion(fromAmount, rate, from, to) {
  // Rest API seems to be changing in terms of the data format returned, so just
  // do the conversion manually to avoid breaking changes.
  const baseRate = useMemo(() => {
    if (!rate) return 0;
    if (rate.currencyPair.startsWith(from))
      return parseFloat(rate.midMarketRate);
    return round(1 / rate.midMarketRate, 4);
  }, [rate, from]);

  const fromSymbol = useMemo(() => getCurrencySymbol(from), [from]);

  const toSymbol = useMemo(() => getCurrencySymbol(to), [to]);

  const fromAmountText = useMemo(
    () => `${fromSymbol}${toCurrency(fromAmount)} ${from}`,
    [fromSymbol, fromAmount, from]
  );

  const baseRateText = useMemo(
    () => `${fromSymbol}1 ${from} = ${toSymbol}${baseRate.toFixed(4)} ${to}`,
    [fromSymbol, from, toSymbol, to, baseRate]
  );

  const paytronFee = useMemo(
    () => round(fromAmount * baseRate * 0.005, 2),
    [fromAmount, baseRate]
  );

  const paytronFeeText = useMemo(
    () => `${toSymbol}${toCurrency(paytronFee)} ${to}`,
    [paytronFee, toSymbol, to]
  );

  const finalToAmount = useMemo(
    () => round(fromAmount * baseRate, 2) - paytronFee,
    [fromAmount, baseRate, paytronFee]
  );

  const finalToAmountText = useMemo(
    () => `${toSymbol}${toCurrency(finalToAmount)} ${to}`,
    [toSymbol, finalToAmount, to]
  );

  const paytronRate = useMemo(
    () => round(finalToAmount / fromAmount, 4),
    [finalToAmount, fromAmount]
  );

  const paytronRateText = useMemo(
    () => `${fromSymbol}1 ${from} = ${toSymbol}${paytronRate.toFixed(4)} ${to}`,
    [fromSymbol, from, toSymbol, paytronRate, to]
  );

  // Some fields may not be needed for display, but can be
  // used for other purpose
  return {
    fromSymbol,
    toSymbol,
    fromAmountText,
    baseRate,
    baseRateText,
    paytronFee,
    paytronFeeText,
    paytronRate,
    paytronRateText,
    finalToAmount,
    finalToAmountText,
  };
}
