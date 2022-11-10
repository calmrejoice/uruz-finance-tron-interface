import useSWR from "swr";
import axios from "axios";

import { config } from "@constants/config";
import { IMarket } from "@constants/IMarket";
import { IMarketDetails } from "@constants/IMarketDetails";
import { ILendStats } from "@constants/ILendStats";
import { IPortfolio } from "@constants/IPortfolio";
import { IStakeDetails } from "@constants/IStakeDetails";
import { IProposalDetails } from "@constants/IProposalDetails";

export const fetcher = (url: any) => axios.get(url).then((res) => res.data);

export const useTokensPrice = (tokenSymbol: string | undefined) => {
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

  let tokenPrice = "0";

  if (tokenSymbol === "TRX") {
    tokenPrice = parseFloat(priceTRX).toFixed(6);
  } else if (tokenSymbol === "URZ") {
    tokenPrice = priceBTC;
  }

  return {
    tokenPrice,
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

export const useLendStats = () => {
  const { data, error } = useSWR(`/api/lendStats`, fetcher);

  const lendStats: ILendStats = data;
  const isLoadingLendStats = !data && !error;
  const isEmptyLendStats = data?.length === 0;

  return {
    lendStats,
    isLoadingLendStats,
    isEmptyLendStats,
  };
};

export const usePortfolio = (accountAddress: string) => {
  const { data, error } = useSWR(
    accountAddress ? `/api/portfolio?accountAddress=${accountAddress}` : null,
    fetcher
  );

  const portfolio: IPortfolio = data;
  const isLoadingPortfolio = !data && !error;
  const isEmptyPortfolio = data?.length === 0;

  return {
    portfolio,
    isLoadingPortfolio,
    isEmptyPortfolio,
  };
};

export const useStakeDetails = (accountAddress: string) => {
  const { data, error } = useSWR(
    accountAddress
      ? `/api/stakeDetails?accountAddress=${accountAddress}`
      : null,
    fetcher
  );

  const stakeDetails: IStakeDetails = data;
  const isLoadingStakeDetails = !data && !error;
  const isEmptyStakeDetails = data?.length === 0;

  return {
    stakeDetails,
    isLoadingStakeDetails,
    isEmptyStakeDetails,
  };
};

export const useProposals = () => {
  const { data, error } = useSWR(`/api/proposals`, fetcher);

  const proposals: IProposalDetails[] = data;
  const isLoadingProposals = !data && !error;
  const isEmptyProposals = data?.length === 0;

  return {
    proposals,
    isLoadingProposals,
    isEmptyProposals,
  };
};

// export const useProposalDetails = (proposalId: string) => {
//   const { data, error } = useSWR(
//     proposalId ? `/api/proposalDetails?proposalId=${proposalId}` : null,
//     fetcher
//   );

//   const proposalDetails: IProposalDetails = data;
//   const isLoadingProposalDetails = !data && !error;
//   const isEmptyProposalDetails = data?.length === 0;

//   return {
//     proposalDetails,
//     isLoadingProposalDetails,
//     isEmptyProposalDetails,
//   };
// };
