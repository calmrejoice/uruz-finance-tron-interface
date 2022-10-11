import type { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { mockLendingPools } from "@constants/mockLendingPools";
import { InterestRateModelCard } from "@components/MarketDetailsPage/InterestRateModelCard";
import { MarketInfoCard } from "@components/MarketDetailsPage/MarketInfoCard";

const MarketDetailsPage: NextPage = () => {
  return (
    <Flex mx="32" flexDir="row">
      <InterestRateModelCard />
      <MarketInfoCard />
    </Flex>
  );
};

export default MarketDetailsPage;
