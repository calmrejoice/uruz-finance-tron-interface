import {
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Card } from "@components/Shared/Card";
import { InfoTooltip } from "@components/Shared/InfoTooltip";
import { useAuth } from "@context/AuthContext";
import { usePortfolio } from "@hooks/swrHooks";
import { AccountStat } from "./AccountStat";
import { BorrowLimit } from "./BorrowLimit";

export const MyAccountCard = () => {
  const { address } = useAuth();
  const { portfolio } = usePortfolio(address);
  console.log(portfolio);

  return (
    <Card flexDir="column" width="3xl" minHeight="md">
      <Flex flexDir="row" justifyContent="space-between">
        <Heading fontWeight="bold" fontSize="lg">
          My account
        </Heading>
        <HStack fontSize="sm" fontWeight="medium" alignItems="center">
          <InfoTooltip label="Choose whether to include URZ distribution APR in calculations" />
          <Text fontWeight="medium" variant="helper">
            APY with URZ
          </Text>
          <Switch colorScheme="yellow" />
        </HStack>
      </Flex>
      <Spacer />

      <Flex alignItems="flex-start" flexDir="column">
        <Flex flexDir="row" alignItems="center">
          <Text variant="helper">Net APY</Text>
          <InfoTooltip label="Percentage of your total supply balance received as yearly interests" />
        </Flex>
        <Text fontSize="4xl" fontWeight="bold">
          {portfolio?.netApy?.toFixed(2)}%
        </Text>
      </Flex>
      <Spacer />

      <HStack spacing="9">
        <AccountStat
          title="Daily earnings"
          value={`$${portfolio?.totalDailyEarnings?.toFixed(2)}`}
        />
        <Divider orientation="vertical" height="3rem" />
        <AccountStat
          title="Supply balance"
          value={`$${portfolio?.totalSupplyBalance?.toFixed(2)}`}
        />
        <Divider orientation="vertical" height="3rem" />
        <AccountStat
          title="Borrow balance"
          value={`$${portfolio?.totalBorrowBalance?.toFixed(2)}`}
        />
      </HStack>
      <Spacer />

      <BorrowLimit
        borrowLimit={portfolio?.totalBorrowLimit}
        totalBorrowBalance={portfolio?.totalBorrowBalance}
      />
    </Card>
  );
};
