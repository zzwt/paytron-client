import axios from 'axios';

const url =
  'https://wnvgqqihv6.execute-api.ap-southeast-2.amazonaws.com/Public/public/rates';

export const getRate = async (amount, from, to) => {
  try {
    const res = await axios.get(
      `${url}?Sell=${from}&Buy=${to}&Amount=${amount}&Fixed=sell`
    );
    const { currencyPair, midMarketRate } = res.data;

    return { currencyPair, midMarketRate };
  } catch (error) {
    console.error('Fetching rate error:', error);
    throw error;
  }
};
