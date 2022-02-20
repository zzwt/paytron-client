import { currency } from '../constants/currency';

export const getCurrencySymbol = (code) => {
  return currency.find((c) => c.code === code).symbol;
};

export const toCurrency = (num) => {
  if (num == null) {
    return null;
  }
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const currencyToNum = (c) => {
  return parseFloat(c.replace(/[,]+/g, ''));
};

export const round = (num, places) => {
  return +(Math.round(num + 'e+' + places) + 'e-' + places);
};
