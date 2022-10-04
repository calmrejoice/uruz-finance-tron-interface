import type { NextPage } from "next";
import { Flex, Text } from "@chakra-ui/react";
import { StakeCard } from "@components/StakePage.tsx/StakeCard";

const StakePage: NextPage = () => {
  return (
    <Flex flexDir="column" alignItems="center">
      <StakeCard />
    </Flex>
  );
};

export default StakePage;
