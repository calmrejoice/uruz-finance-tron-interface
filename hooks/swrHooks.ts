import useSWR from "swr";
import axios from "axios";

import { config } from "@constants/config";

export const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export const useHello = (query: boolean) => {
  const { data, error } = useSWR(query ? `/api/hello` : null, fetcher);

  const hello = data;
  const isLoadingHello = !data && !error;
  const isEmptyHello = data?.length === 0;

  return {
    hello,
    isLoadingHello,
    isEmptyHello,
  };
};

export const useTokensPrice = () => {
  const { data, error } = useSWR(config.tokenPriceUrl, fetcher);

  const { BTC, ETH, TRX, USDT, WIN } = data?.data || {};
  const isLoadingTokensPrice = !data && !error;
  const isEmptyTokensPrice = data?.length === 0;

  const priceBTC = BTC?.quote.USD.price;
  const priceETH = ETH?.quote.USD.price;
  const priceTRX = TRX?.quote.USD.price;
  const priceWIN = WIN?.quote.USD.price;
  const priceUSDT = USDT?.quote.USD.price;

  const tokensPrice = {
    priceBTC,
    priceETH,
    priceTRX,
    priceWIN,
    priceUSDT,
  };

  return {
    tokensPrice,
    isLoadingTokensPrice,
    isEmptyTokensPrice,
  };
};

export const useTokenDetails = (tokenSymbol: string) => {
  const { data, error } = useSWR(
    tokenSymbol ? `/api/marketDetails?tokenSymbol=${tokenSymbol}` : null,
    fetcher
  );

  const tokenDetails = data;
  const isLoadingTokenDetails = !data && !error;
  const isEmptyTokenDetails = data?.length === 0;

  return {
    tokenDetails,
    isLoadingTokenDetails,
    isEmptyTokenDetails,
  };
};
