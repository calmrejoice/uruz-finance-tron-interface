import useSWR from "swr";
import axios from "axios";

import { config } from "@constants/config";
import { IMarket } from "@constants/IMarket";
import { IMarketDetails } from "@constants/IMarketDetails";

export const fetcher = (url: any) => axios.get(url).then((res) => res.data);

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

export const useMarkets = () => {
  const { data, error } = useSWR(`/api/markets`, fetcher);

  const markets: IMarket[] = data;
  const isLoadingMarkets = !data && !error;
  const isEmptyMarkets = data?.length === 0;

  return {
    markets,
    isLoadingMarkets,
    isEmptyMarkets,
  };
};

export const useMarketDetails = (tokenSymbol: string) => {
  const { data, error, mutate } = useSWR(
    tokenSymbol ? `/api/marketDetails?tokenSymbol=${tokenSymbol}` : null,
    fetcher
  );

  const marketDetails: IMarketDetails = data;
  const isLoadingMarketDetails = !data && !error;
  const isEmptyMarketDetails = data?.length === 0;

  return {
    marketDetails,
    isLoadingMarketDetails,
    isEmptyMarketDetails,
    mutate,
  };
};
