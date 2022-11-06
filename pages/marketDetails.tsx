import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";

import { InterestRateModelCard } from "@components/MarketDetailsPage/InterestRateModelCard";
import { MarketInfoCard } from "@components/MarketDetailsPage/MarketInfoCard";
import { useMarketDetails, useMarkets } from "@hooks/swrHooks";
import { useRouter } from "next/router";

const MarketDetailsPage: NextPage = () => {
  const router = useRouter();

  const { query } = router;
  const { tokenSymbol }: any = query;

  const { markets, isEmptyMarkets, isLoadingMarkets } = useMarkets();
  const market = markets?.filter(
    (market) => market.collateralSymbol === tokenSymbol
  )[0];

  const { marketDetails, isLoadingMarketDetails, mutate } =
    useMarketDetails(tokenSymbol);

  return (
    <Flex mx="32" flexDir="row">
      <InterestRateModelCard />
      <MarketInfoCard
        market={market}
        marketDetails={marketDetails}
        isLoadingMarketDetails={isLoadingMarketDetails}
        tokenSymbol={tokenSymbol}
      />
    </Flex>
  );
};

export default MarketDetailsPage;
