import { Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { numberWithCommas } from "@utils/formatBalance";

import { Card } from "@components/Shared/Card";
import { LendStat } from "./LendStat";
import { useLendStats } from "@hooks/swrHooks";

export const LendStats = () => {
  const { lendStats, isLoadingLendStats } = useLendStats();
  console.log(lendStats);

  return (
    <Card>
      <LendStat
        title="Total Supply"
        stat={parseFloat(lendStats?.totalSupply)}
        isLoading={isLoadingLendStats}
      />
      <LendStat
        title="Total Borrow"
        stat={parseFloat(lendStats?.totalBorrowed)}
        isLoading={isLoadingLendStats}
      />
      <LendStat
        title="Available Liquidity"
        stat={parseFloat(lendStats?.totalLiquidity)}
        isLoading={isLoadingLendStats}
      />
      <LendStat
        title="Total Treasury"
        stat={parseFloat(lendStats?.totalTreasury)}
        isLoading={isLoadingLendStats}
        borderRight="none"
      />
    </Card>
  );
};
