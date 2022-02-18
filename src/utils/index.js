import { currency } from '../constants/currency';

export const getCurrencySymbol = (code) => {
  return currency.find((c) => c.code === code).symbol;
};
