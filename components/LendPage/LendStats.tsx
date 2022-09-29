import { Divider, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { numberWithCommas } from "@utils/formatBalance";

import { Card } from "@components/Shared/Card";
import { LendStat } from "./LendStat";

export const LendStats = () => {
  const randomSupply = numberWithCommas("994382759");
  const randomBorrow = numberWithCommas("359258193");

  return (
    <Card>
      <LendStat title="Total Supply" stat="$994,382,759" />
      <LendStat title="Total Borrow" stat="$359,258,193" />
      <LendStat title="Available Liquidity" stat="$636,669,825" />
      <LendStat title="Total Treasury" stat="$4,499,959" borderRight="none" />
    </Card>
  );
};
